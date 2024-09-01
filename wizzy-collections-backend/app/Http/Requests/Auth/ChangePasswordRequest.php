<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class ChangePasswordRequest extends FormRequest
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
            'old_password' => ['required', 'string'],
            'new_password' => ['required', 'string', 'confirmed', Rules\Password::defaults()],
        ];
    }


     /**
     * Customize error messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'old_password.required' => 'The old password is required.',
            'new_password.required' => 'The new password is required.',
            'new_password.confirmed' => 'The new password confirmation does not match.',
        ];
    }


    /**
     * Validate the old password against the user's current password.
     *
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (!Hash::check($this->input('old_password'), $this->user()->password)) {
                $validator->errors()->add('old_password', 'The old password is incorrect.');
            }
        });
    }
}

