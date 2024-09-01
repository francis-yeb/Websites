<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCouponRequest extends FormRequest
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
            'code' => 'sometimes|string|unique:coupons,'. $this->route('coupon')->id . '|max:20',
            'type' => 'sometimes|string|in:fixed,percent',
            'value' => 'sometimes|numeric|nullable',
            'percent_off' => 'sometimes|numeric|nullable',
            'status' => 'sometimes|boolean',
            'start_date' => 'sometimes|date',
            'expire_date' => 'sometimes|date',
        ];
    }
}
