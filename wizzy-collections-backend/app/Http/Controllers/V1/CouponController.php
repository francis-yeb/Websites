<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Http\Requests\V1\StoreCouponRequest;
use App\Http\Requests\V1\UpdateCouponRequest;
use App\Http\Resources\V1\CouponResource;
use App\Http\Resources\V1\CouponCollection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $coupons = Coupon::all();
        return new CouponCollection($coupons);
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
    public function store(StoreCouponRequest $request) : JsonResponse
    {
        try {
            $data = $request->validated();
            Coupon::create([
                'code' => $data['code'],
                'type' => $data['type'],
                'value' => $data['value'],
                'percent_off' => $data['percent_off'],
                'start_date' => $data['start_date'],
                'expire_date' => $data['expire_date'],
            ]);
            return response()->json([
                'success' => 'Coupon has been created successfully!',
            ]);
        } catch (Exception $errors) {
            return response()->json([
                'errors' => $errors
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Coupon $coupon)
    {

        return new CouponResource($coupon);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Coupon $coupon)
    {
        //
    }

    /**
     * Applying the coupon
     */
    public function apply(Request $request) : JsonResponse
    {
        try{
            $validated = $request->validate([
            'code' => 'required|string',
            'amount' => 'sometimes|nullable'
            ]);
            $coupon = Coupon::where('code',$validated['code'])->first();

            if(!$coupon) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Coupon not found'
                ],404);
            }

            // if($coupon->status === 1){
            //     return response()->json([
            //         'status' => 'error',
            //         'message' => 'Coupon has been expire!'
            //     ],406);
            // }

            // if ($coupon->status === 0) {

                $subtotal = $coupon->discount($validated['amount']);
                $data = [];
                $data = [
                    ['subtotal' => $subtotal],
                    ['code' => $coupon['code']],
                    ['type' => $coupon['type']],
                    ['value' => $coupon['value']],
                    ['percentOff' => $coupon['percent_off']]
                ];
        
                return response()->json([
                    'status' => 'success',
                    'data' => $data
                ],200);
                // }else {
                //     return response()->json([
                //         'status' => 'error',
                //         'message' => 'expire'
                //     ],406);
                // }

        } catch (Exception $error){
            return response()->json([
                'status' => 'error',
                'message' => $error
            ],422);
        }   
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCouponRequest $request, Coupon $coupon)
    {
        return $request;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Coupon $coupon) : JsonResponse
    {
        try {
            // if(!auth()->user()->isAdmin){
            //     return response()->json([
            //         "message" => 'Unathorized',
            //     ],403);
            // }
            if (!$coupon) {
                throw new NotFoundHttpException('Coupon not found');
            }

            $coupon->delete();
            return response()->json([
                "success" => 'Coupon deleted successfully',
            ], 200);

        } catch (NotFoundHttpException $error) {
            return response()->json([
                'error' => 'Coupon not found in the system'
            ],404);
        }
        catch (Exception $error) {
            return response()->json([
                'error' => 'Failed to delete coupon'
            ],500);
        }
    }
}

