<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\V1\UserResource;
use App\Http\Requests\Auth\UpdateUserRequest;
use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request) : JsonResponse
    {
        $request->authenticate();

        // $request->session()->regenerate();
        $user = $request->user();
        $user->tokens()->delete();

        $token = $user->createToken('api-token')->plainTextToken;
        $cookie = cookie('token',$token, 60*24);


        return response()->json([
            "user" => new UserResource($user),
            'token' => $token
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();
        // $cookie = Cookie::forget('token');

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function user(Request $request) {
        $user = $request->user();
        return $user;

    } 

    public function updateUser(UpdateUserRequest $request, User $user) : JsonResponse {
        // if ($request->email !== $user->email) {
            $user->update($request->only([
                'name',
                'email',
                'phone_number',
                'address',
            ]));
        // }

        return response()->json([
            'message' => 'User have been updated successfully',
            'data' => new UserResource($request)
        ]);
    }

    //Getting all users
    public function allUsers () {
        
    }

    public function changePassword(ChangePasswordRequest $request) : JsonResponse
    {
        $user = auth()->user();
        if(!Hash::check($request->old_password, $user->password)){
            return response()->json([
                "message" => 'Incorrect old Password',
            ]);
        };

        $user->update([
            "password" => Hash::make($request->new_password)
        ]);

        return response()->json([
            "message" => "Password updated successfully",

        ]);
    }


}
