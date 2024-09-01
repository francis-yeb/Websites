<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // return auth()->user()->isAdmin();
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:1000',
            'description' => 'required|string',
            'category' => 'required|string',
            'price' => 'required|numeric|between:0,99999999.99', // Example: Allow up to 8 digits before decimal and 2 after
            'size' => '',
            'brand' => 'required|string',
            'stock_quantity' => 'required|numeric',
            'image' => 'required', // Allow image to be nullable and of type string
            // 'image' => 'required|image| ', // Allow image to be nullable and of type string
            'gender' => 'nullable|string', // Allow gender to be nullable and of type string
            'rating' => 'nullable|array', // Allow rating to be nullable and of type array
            'rating.rate' => 'nullable|integer', // Nested rule for rating rate field
            'rating.count' => 'nullable|integer',
            
        ];
    }
}
