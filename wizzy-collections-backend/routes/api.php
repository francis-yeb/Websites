<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\ProductController;
use App\Http\Controllers\V1\PaymentController;
use App\Http\Controllers\V1\PaymentDataController;
use App\Http\Controllers\V1\CustomersController;
use App\Http\Controllers\V1\OrderController;
use App\Http\Controllers\V1\CouponController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// ['auth:sanctum','verified']

Route::middleware(['auth:sanctum',])->group(function(){
    Route::get('/user', [AuthenticatedSessionController::class,'user']);
    Route::patch('/user/{user}', [AuthenticatedSessionController::class,'updateUser']);
    Route::post('/change-password', [AuthenticatedSessionController::class,'changePassword']);

    // Route::post('/products',[ProductController::class, 'store']);
    Route::apiResource('products', ProductController::class);

    //Getting use information
    // Route::apiResource('customers', CustomersController::class);
});
Route::apiResource('customers', CustomersController::class);

//all orders route
// Route::apiResource('orders', OrderController::class);
Route::get('/orders',[OrderController::class, 'index'])->name('orders.index');
Route::post('/orders',[OrderController::class, 'store'])->name('orders.store');
Route::patch('/orders/{order}',[OrderController::class, 'update'])->name('orders.update');
Route::delete('/orders/{order}',[OrderController::class, 'destroy'])->name('orders.destroy');
Route::get('/orders/status',[OrderController::class, 'status'])->name('orders.status');
Route::get('/orders/bystatus/{status}',[OrderController::class,'showOrdersByStatus'])->name('orders.showbystatus');
Route::get('/orders/userorders',[OrderController::class,'userOrders']);

//Payment after successful order 
Route::get('paymantData/{paymentData}', [PaymentDataController::class, 'show']);

//Coupons route
Route::apiResource('coupons', CouponController::class);
Route::post('/coupons/apply',[CouponController::class, 'apply'])->name('coupons.apply');

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/productCategory', [ProductController::class, 'getCategory']);
Route::get('/products/category/{category}',[ProductController::class, 'getProductsByCategory']);

Route::get('/genders', [ProductController::class,'gender']);
Route::get('/productSizes', [ProductController::class,'productSizes']);

//Checkout routes
Route::post('/pay',[PaymentController::class, 'make_payment']);
Route::get('/payment/callback', [PaymentController::class, 'payment_callback']);


