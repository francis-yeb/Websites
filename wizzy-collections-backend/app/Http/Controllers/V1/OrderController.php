<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use App\Http\Requests\V1\StoreCustomerOrderRequest;
use App\Http\Requests\V1\UpdateOrderRequest;
use App\Http\Resources\V1\OrderResource;
use App\Http\Resources\V1\OrderCollection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();
        // return "Hello index order";
        return new OrderCollection($orders);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerOrderRequest $request) : JsonResponse
    {
        // return response()->json(["message" => "You are in the order"]);
        $validatedData = $request->validated();
        $order = Order::create($validatedData);

        return response()->json([
            'status' => 'sucess',
            'order' => $order,
        ]);
        // return response()->json($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order) : JsonResponse
    {
        $user = Auth::user();
        // $user = Auth::user();

        if ($order->user_id !== $user->id){
            return response()->json([
                'error' => 'This order does not belong to the authenticated user'
            ]);
        }
        $responseData = new OrderResource($order);
        return response()->json($responseData);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order) : JsonResponse
    {
        $validatedData = $request->validated();
        $order->fill($validatedData);
        $order->save();
        
        return response()->json([
            "message" => "Order updated successfully",
            "order" => $order,
        ]);
        // return response()->json($validatedData);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        try {
            if(!auth()->user()->isAdmin()){
                return response()->json([
                    "message" => 'Unathorized'
                ],403);
            }
            if (!$order) {
                throw new NotFoundHttpException('Product not found');
            }
                $order->delete();
                return response()->json([
                    'message' => 'Product deleted successfully'
                ],200);

        }  catch (NotFoundHttpException $exception) {
            return response()->json([
                'error' => 'Product not found in the system'
            ], 404);
        }
        catch (Exception $error){
            return response()->json([
                'Error' => 'Failed to delete order'
            ],500);
        }
    }

    /**
     * Getting all the the orders of a user
     */
    public function userOrders () : JsonResponse
    {
        $user = Auth::user();
       
        //Fetching orders for the authenticated user
        $orders = Order::where('user_id',$user->id)->get();

        $responseData = new OrderCollection($orders);

        return response()->json($responseData);
    }

    public function status () : JsonResponse
    {
        $status = ["pending","processing","delivered"];
        return response()->json([
            'orderStatus' => $status,
        ]);
    }

    public function showOrdersByStatus ($status) : JsonResponse
    {
        $response = new OrderCollection(
            Order::whereRaw('TRIM(status) like ?',['%'.$status . '%'])->get());

        $orders = $response->map(function($order){
            return [
                'id' => $order->id,
                'reference' => $order->reference,
                'method' => $order->payment_method,
                'email' => $order->email,
                'phone' => $order->phone,
                'userId' => $order->user->name,
                'totalAmount' => $order->total_amount,
                'status' => $order->status,
                'date' => $order->created_at,
            ];
        });

        return response()->json([
            'orders' => $orders
        ]);
    }

    
}
