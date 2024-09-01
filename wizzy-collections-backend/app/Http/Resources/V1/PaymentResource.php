<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'reference' => $this->reference,
            'status' => $this->status,
            'receiptNumber' => $this->receipt_number,
            'amount' => $this->amount,
            'customerPhone' => $this->phone,
            'currency' => $this->currency,
            'message' => $this->message,

        ];
    }
}
