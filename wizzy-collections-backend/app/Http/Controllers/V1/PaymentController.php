<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StorePaymentRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Redirect;
use App\Models\PaymentData;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function make_payment (StorePaymentRequest $request) {
        $validatedData = $request->validated();
        $payload = [
            'id' => '2024',
            'amount' => $validatedData['total_amount'].'00',
            'title' => request('title'),
            'description' => request('description'),
            'email' => $validatedData['email'],
            "logo" => asset('logo.png'),
        ];
        // return $payload;
       
        
        // echo($validatedData['amount']);

        // return response()->json(['data' => $validatedData]);

        try {
            $pay = $this->initiate_payment($payload);
            // return $pay;
            $decodePay = json_decode($pay);
            // return $decodePay;
            if($decodePay){
                if($decodePay->status){
                    $reference = $decodePay->data->reference;
                    // dd("Authorization URL: ".$authorizationUrl);

                    //stored data to the order table 
                    $orderData = [
                        'reference' => $reference,
                        'total_amount' => $validatedData['total_amount'],
                        'user_id' => $validatedData['user_id'],
                        'status' => 'pending authorization',
                        'email' => $validatedData['email'],  // Ensure email is included
                    ];
                    
                    Order::create($orderData);
            

                    $authorizationUrl = $decodePay->data->authorization_url;
                    // Redirect to Paystack's payment page
                    // return redirect()->to($authorization_url);
                    return $decodePay;
                }
                else {
                    return response()->json(['message' => $decodePay->message], 400);
                }
               
            }else {
                return "Something went wrong";
            }
           
        }
        catch (Exception $e) {
            return response()->json([
                'error message' => $e->getMessage(),
            ]);
        }
    }

   
    // PayStack implementation
    public function initiate_payment($payload) {
        $url = "https://api.paystack.co/transaction/initialize";
        $field_string = http_build_query($payload);
        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL, $url);
        curl_setopt($ch,CURLOPT_POST, true);
        curl_setopt($ch,CURLOPT_POSTFIELDS, $field_string);
        curl_setopt($ch,CURLOPT_HTTPHEADER, array(
            // "Authorization: Bearer ".env("PAYSTACK_SECRET_KEY"),
            // "Authorization: Bearer sk_live_7f605813e0749d2f73d44c39e4773b73142c9438",
            "Authorization: Bearer sk_test_3b10df5dd6782cd2f0b2deefd9204a9978ec4cbf",
            "Cache-Control: no-cache"
        ));

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $request = curl_exec($ch);
        curl_close($ch);
        return $request;

    }
    
    public function payment_callback (Request $request) {
        $reference = $request->query('reference');

        if(!$reference){
            return response()->json([
                "error" => "Reference is required"
            ],400);
        }
        $url = "https://api.paystack.co/transaction/verify/$reference";
        // return $url;
        $crl_initial = curl_init();
        curl_setopt($crl_initial, CURLOPT_URL, $url);
        curl_setopt($crl_initial, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($crl_initial, CURLOPT_ENCODING, "");
        curl_setopt($crl_initial, CURLOPT_MAXREDIRS, 10);
        curl_setopt($crl_initial, CURLOPT_TIMEOUT, 30);
        curl_setopt($crl_initial, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($crl_initial, CURLOPT_CUSTOMREQUEST, "GET");
        curl_setopt($crl_initial,CURLOPT_HTTPHEADER, array(
            // "Authorization: Bearer ".env("PAYSTACK_SECRET_KEY"),
            "Authorization: Bearer sk_test_3b10df5dd6782cd2f0b2deefd9204a9978ec4cbf",
            "Cache-Control: no-cache"
        ));

        $response = curl_exec($crl_initial);
        $error = curl_error($crl_initial);
        curl_close($crl_initial);

        if ($error) {
            return response()->json(['error' => $error], 500);
        } 
        
        else {
            $decodedResponse = json_decode($response, true);
            if($decodedResponse["status"] === false){
                return response()->json($decodedResponse['message']);
            }
            // return response()->json($decodedResponse);
            $data = [
                "status" => $decodedResponse['status'],
                "data" => [
                    "message" => $decodedResponse['message'],
                    // "id" => $decodedResponse['data']['id'],
                    "status" => $decodedResponse['data']['status'],
                    "reference" => $decodedResponse['data']['reference'],
                    "receipt_number" => $decodedResponse['data']['receipt_number'],
                    "amount" => $decodedResponse['data']['amount'],
                    // "gateway_response" => $decodedResponse['data']['gateway_response'],
                    // "channel" => $decodedResponse['data']['channel'],
                    "currency" => $decodedResponse['data']['currency'],
                    "phone" => $decodedResponse['data']['customer']['phone'],
                ]
            ];
            
            $reference = $decodedResponse['data']['reference'];
            $paymentMethod = $decodedResponse['data']['channel'];
            $email = $decodedResponse['data']['customer']['email'];
            $orderUpdate = [
                "reference" => $reference,
                "phone" => $decodedResponse['data']['authorization']['mobile_money_number'],
                "payment_method" => $paymentMethod,
                "status" => "pending",
            ];

            $order = Order::where('email',$email)->orderBy('created_at', 'desc')->first();

            //updating the order table
            if($order){
                $order->update($orderUpdate);
            }
            
            // DB::transaction(function () use ($data){
            //     try {
            //         //Saving the payment data in the database
            //         PaymentData::create($data['data']);
                 
            //     }catch (\Exception $e){
            //         throw $e;
            //     }
            // });


            // Redirect to the frontend URL with the encoded JSON data
            $frontendUrl = "http://localhost:3000/customer/orders?reference=$reference";
            return Redirect::away($frontendUrl);
            // return response()->json($decodedResponse);
        }
    }

    //Hubtel implementation
    // public function initiate_payment($payload) {
    //     $query = [
    //         "clientid" => "tmlpsxkg",
    //         "clientsecret" => "llvtgmzy",
    //         "from" => "string",
    //         "to" => "string",
    //         "content" => "string"
    //     ];
    //     $mobileNumber = "0553632881";
    //     $url = "https://devp-reqsendmoney-230622-api.hubtel.com/send-money/" . $mobileNumber;
    //     $field_string = http_build_query($payload);
    //     $ch = curl_init();
    //     curl_setopt_array($ch, [
    //         CURLOPT_HTTPHEADER => [
    //             "Authorization: Basic ". base64_encode("tmlpsxkg:llvtgmzy"),
    //             "Content-Type: application/json"
    //         ],
    //         CURLOPT_POSTFIELDS => json_encode($payload),
    //         CURLOPT_URL => $url,
    //         CURLOPT_RETURNTRANSFER => true,
    //         CURLOPT_CUSTOMREQUEST => "POST",
    //     ]);

    //     $request = curl_exec($ch);
    //     curl_close($ch);
    //     return $request;

    // }

}
