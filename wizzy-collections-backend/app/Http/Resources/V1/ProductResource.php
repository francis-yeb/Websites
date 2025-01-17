<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'category' => $this->category,
            'price' => $this->price,
            'size' => $this->size,
            'gender' => $this->gender,
            'brand' => $this->brand,
            'image' => $this->image,
            'quantity' => $this->stock_quantity,
            'rating' => $this->rating,
        ];
    }
}
