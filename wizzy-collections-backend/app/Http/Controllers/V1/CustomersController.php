<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\V1\UserResource;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\V1\UserCollection;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\UpdateUserRequest;
use Illuminate\Support\Facades\Hash;

class CustomersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {

        $users = $user->where('role','user')
                    ->get();
        return new UserCollection($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RegisterRequest $request) 
    {
        $customer = Customer::create($request->validated());
        
        return new UserResource($customer);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request) : JsonResponse
    {
        $userId = $request->route('customers'); // Assuming the route parameter is named 'customer'
        return response()->json($userId);
        // Find the customer by ID
        $customer = Customer::find($userId);

        // Check if the customer exists
        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        // Return the customer data
        return response()->json(new UserResource($customer));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $customer)
    {
        try {
            $validatedData = $request->validated();
            $fileName = null;
            // Handle file upload
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $fileName = time().'-'.$file->getClientOriginalName();
    
                //check if an image with the same name exists in the database
                $existingProductImage = $customer->image;
                if($existingProductImage && File::exists(public_path('images/'.$existingProductImage))){
                    //delete the existing image
                    File::delete(public_path('images/'.$existingProductImage));
                }
    
                // Move the uploaded file to the desired location
                $file->move(public_path('images'), $fileName);
                // Update the cu$customer image filename in the database
                $customer->image = $fileName;
            }
    
            // Update other fields if needed
            $customer->fill($validatedData);
            if($request->hasFile('image')){
    
                $customer->image = $fileName;
            }
            // Update other fields as needed...
    
            // Save the updated cu$customer
            $customer->save();
    
            // Return a success response with the updated cu$customer data
            return response()->json([
                'message' => 'Customer have been updated successfully',
                'customer' => new UserResource($customer->fill($validatedData)),
            ]);
        } catch (\Exception $e) {
            // Return an error response if an exception occurs
            return response()->json(['message' => 'Failed to update cu$customer', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $customer)
    {
        try {
            if(!auth()->user()->isAdmin()){
                return response()->json([
                    "message" => 'Unathorized'
                ],403);
            }
            if (!$customer) {
                throw new NotFoundHttpException('Customer not found');
            }
                $customer->delete();
            return response()->json([
                'message' => 'Customer deleted successfully'
            ],200);

        }  catch (NotFoundHttpException $exception) {
            return response()->json([
                'error' => 'Customer not found in the system',
            ], 404);
        }
        catch (\Exception $error){
            return response()->json([
                'Error' => 'Failed to delete customer'
            ],500);
        }
    }
}
