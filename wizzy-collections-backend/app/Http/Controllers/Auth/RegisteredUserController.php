<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use App\Http\Resources\V1\UserResource;
use Illuminate\Support\Facades\Cookie;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone_number' => $data['phone_number'],
            'role' => 'user',
            'password' => Hash::make($data['password']),
            // 'email_verify_at' => now()
        ]);

        $user->sendEmailVerificationNotification();

        event(new Registered($user));

        Auth::login($user);
        
        $token = $user->createToken('api-token')->plainTextToken; 
        // $cookie = cookie('token',$token, 60*24);

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token
        ]);

    }
}
