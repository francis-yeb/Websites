<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\PaymentData;
use App\Http\Requests\StorePaymentDataRequest;
use App\Http\Requests\UpdatePaymentDataRequest;
use App\Http\Resources\V1\PaymentResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PaymentDataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return "Payment Data index";
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
    public function store(StorePaymentDataRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentData $paymentData) : JsonResponse
    {
        // $reference = $paymentData->query('reference');
        // $data = PaymentData::find($reference);

        return response()->json([
            "data" => $paymentData->all(),
        ]);
        // return $paymentData->all();
        // return "Hello dataaa";
    }

    /**
     * Show the form for editing the sp ecified resource.
     */
    public function edit(PaymentData $paymentData)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentDataRequest $request, PaymentData $paymentData)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentData $paymentData)
    {
        //
    }
}
