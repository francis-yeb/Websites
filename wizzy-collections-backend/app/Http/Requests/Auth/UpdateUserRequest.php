<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Validation\Rule;


class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (auth()->user()->isAdmin()) {
            // Admin users can update all users
            return true;
        }

        // Regular users can only update their own information
        $user = $this->route('user'); // Assuming you're passing the user model in the route
        return $user->id === Auth::id();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
{
    // if (auth()->user()->isAdmin){
    //     return true;
    // }
    $userId = $this->route('user')->id;
    

    return [
        'name' => 'sometimes|string|max:255', 
        'address' => 'sometimes|nullable|string|max:255',
        'city' => 'sometimes|string|max:255',
        'email' => [
            'sometimes',
            // 'string',
            // 'lowercase',
            'nullable',
            'email',
            'max:255',
            // 'unique:users',
            Rule::unique('users')->ignore($userId),
            // !auth()->user()->isAdmin() ? Rule::unique('users')->ignore($userId): true,
            // Rule::unique('users')->where(function ($query) {
            //     return $this->input('email') !== ''; // Apply uniqueness rule only if email field is not empty
            // }),
        ], 
        'phone_number' => [
            'sometimes',
            'regex:/^\d{1,3}\d{9,15}$/',
            'nullable',
            Rule::unique('users')->ignore($userId),
            // Rule::unique('users')->where(function ($query) {
            //     return $this->input('phone_number') !== ''; // Apply uniqueness rule only if email field is not empty
            // }),
            // 'unique:users',
            // !auth()->user()->isAdmin() ? Rule::unique('users')->ignore($userId): true,
        ],
        
    ];

    
}

}
