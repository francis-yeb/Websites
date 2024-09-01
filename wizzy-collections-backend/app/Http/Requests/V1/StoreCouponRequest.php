<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreCouponRequest extends FormRequest
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
            'code' => 'required|string|unique:coupons|max:20',
            'type' => 'required|string',
            'value' => 'nullable',
            'percent_off' => 'nullable',
            'status' => 'sometimes|boolean',
            'start_date' => 'required|date',
            'expire_date' => 'required|date',
        ];
    }
}
