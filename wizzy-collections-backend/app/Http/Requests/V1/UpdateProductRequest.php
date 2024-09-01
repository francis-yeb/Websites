<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->isAdmin();
        // return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:255', // Allow updating title, if provided
            'description' => 'sometimes|string', // Allow updating description, if provided
            'price' => 'sometimes|numeric|min:0', // Allow updating price, if provided and must be numeric and non-negative
            'size' => 'sometimes|in:S,M,L,6,6.5,7,7.5,8,8.5,9,9.5,10', // Allow updating size, if provided and must be one of the specified values
            'gender' => 'sometimes|in:Men,Women,Unisex', // Allow updating gender, if provided and must be one of the specified values
            'brand' => 'sometimes|string|max:255', // Allow updating brand, if provided
            'image' => 'sometimes', // Allow image to be nullable and of type string
            // 'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg', // Allow updating image, if provided and must be an image file with maximum size 2MB
            'stock_quantity' => 'sometimes|integer|min:0', // Allow updating stock_quantity, if provided and must be an integer and non-negative
            'rating' => 'sometimes|array', // Allow updating rating, if provided and must be an array
            'rating.rate' => 'sometimes|numeric|min:1|max:5', // Validate the rate attribute within the rating array
            'rating.count' => 'sometimes|numeric|min:0', // Validate the count attribute within the rating array
        ];
    }
}
