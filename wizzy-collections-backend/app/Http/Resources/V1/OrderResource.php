<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'method' => $this->payment_method,
            'email' => $this->email,
            'phone' => $this->phone,
            'userId' => $this->user_id,
            'totalAmount' => $this->total_amount,
            'status' => $this->status,
            'date' => $this->created_at
        ];
        
    }
}
