<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
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
            'total_amount' => 'sometimes|numeric|between:0,99999999.99', // Allow updating title, if provided
            'status' => 'sometimes|string', // Allow updating description, if provided
            'email' => 'sometimes|email', // Allow updating price, if provided and must be numeric and non-negative
            'reference' => 'sometimes|string', // Allow updating gender, if provided and must be one of the specified values
            'payment_method' => 'sometimes|string|max:255', // Allow updating brand, if provided
            'phone_number' => [
            'sometimes',
            'regex:/^\d{1,3}\d{9,15}$/',
            'nullable',
            ],
        ];
    }
}
