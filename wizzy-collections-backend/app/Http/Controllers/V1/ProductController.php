<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Requests\V1\StoreProductRequest;
use App\Http\Requests\V1\UpdateProductRequest;
use App\Http\Resources\V1\ProductResource;
use App\Http\Resources\V1\ProductCollection;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File; 

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    

public function index(): JsonResponse
{
    $perPage = 10; // Set the number of items per page
    
    // Retrieve paginated products
    // $products = new ProductCollection(Product::paginate(16));
    $products = new ProductCollection(Product::all());
    
    // Transform the paginated products into the desired format
    // $responseData = $products->getCollection()->map(function ($product) {
        $responseData = $products->map(function ($product) {
        $imageUrl = asset('images/'. $product->image);
        return [
            'id' => $product->id,
            'title' => $product->title,
            'description' => $product->description,
            'category' => $product->category,
            'price' => $product->price,
            'size' => $product->size,
            'gender' => $product->gender,
            'brand' => $product->brand,
            'image' => $imageUrl,
            'quantity' => $product->stock_quantity,
            'rating' => $product->rating
        ];
    });

    // Create an object to hold the response data
    $responseDataObject = new \stdClass();
    
    // Assign the mapped product data to the 'data' property of the response object
    $responseDataObject = $responseData;

    return response()->json($responseDataObject);
}


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request) :jsonResponse
    {
        try {
            
            $file = null;
            $fileName = null;
            // Validate the incoming request data
            $validatedData = $request->validated();
            if ($request->hasFile('image')){
                $file = $request->file('image');
                $fileName = time().'-'.$file->getClientOriginalName();
                // $file->storeAs('images',$fileName);
                $file->move(public_path('images'),$fileName);
            }
            
            // // Create a new product instance
            $product = new Product();
            $product->fill($validatedData);
            $product->image = $fileName;

            
            // // Save the product to the database
            $product->save();

            // Return a success response with the created product resource
            return response()->json([
                'message' => 'Product add successfully',
                // 'product' =>  new ProductResource($product),
                'product' =>  $request->all(),
            ]);
        } catch (\Exception $e) {
            // Return an error response if an exception occurs
            return response()->json(['message' => 'Failed to create product', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Product $product) : JsonResponse
    {
        $responseData = new ProductResource($product);

        $imageUrl = asset('images/'.$responseData->image);
        
        return response()->json([
            'id' => $responseData->id,
            'title' => $responseData->title,
            'description' => $responseData->description,
            'category' => $responseData->category,
            'price' => $responseData->price,
            'size' => $responseData->size,
            'gender' => $responseData->gender,
            'brand' => $responseData->brand,
            'image' => $imageUrl,
            'quantity' => $responseData->stock_quantity,
            'rating' => $responseData->rating,
            
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(UpdateProductRequest $request, Product $product) : JsonResponse
{
    try {
        $validatedData = $request->validated();
        $fileName = null;
        // Handle file upload
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time().'-'.$file->getClientOriginalName();

            //check if an image with the same name exists in the database
            $existingProductImage = $product->image;
            if($existingProductImage && File::exists(public_path('images/'.$existingProductImage))){
                //delete the existing image
                File::delete(public_path('images/'.$existingProductImage));
            }

            // Move the uploaded file to the desired location
            $file->move(public_path('images'), $fileName);
            // Update the product image filename in the database
            $product->image = $fileName;
        }

        // Update other fields if needed
        $product->fill($validatedData);
        if($request->hasFile('image')){

            $product->image = $fileName;
        }
        // Update other fields as needed...

        // Save the updated product
        $product->save();

        // Return a success response with the updated product data
        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $request->all(),
            'image' => $fileName,
            'product_image'=>$product->image
        ]);
    } catch (\Exception $e) {
        // Return an error response if an exception occurs
        return response()->json(['message' => 'Failed to update product', 'error' => $e->getMessage()], 500);
    }
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product) :JsonResponse
    {
        try {
            if(!auth()->user()->isAdmin()){
                return response()->json([
                    "message" => 'Unathorized'
                ],403);
            }
            if (!$product) {
                throw new NotFoundHttpException('Product not found');
            }
                $product->delete();
                return response()->json([
                    'message' => 'Product deleted successfully'
                ],200);

        }  catch (NotFoundHttpException $exception) {
            return response()->json([
                'error' => 'Product not found in the system'
            ], 404);
        }
        catch (Exception $error){
            return response()->json([
                'Error' => 'Failed to delete product'
            ],500);
        }
    }


    // Getting the categories of the product
    public function getCategory(): JsonResponse
    {
        $categories = ["Clothings","Shoes"];
        return response()->json([
            'categories' => $categories
        ]);
    }


    // Getting all product with a specific category
    public function getProductsByCategory($category): JsonResponse
     {
        $responseData = new ProductCollection(Product::where('category',$category)->get());

        $products = $responseData->map(function($product){
            $imageUrl = asset('images/'. $product->image);
            return [
                'id' => $product->id,
                'title' => $product->title,
                'description' => $product->description,
                'category' => $product->category,
                'price' => $product->price,
                'size' => $product->size,
                'gender' => $product->gender,
                'brand' => $product->brand,
                'image' => $imageUrl,
                'quantity' => $product->stock_quantity,
                'rating' => $product->rating
            ];
        });
    

     // Return the response object as JSON
     return response()->json($products);
    }


    /**
     * Getting all genders from the database
     */
    public function gender ():JsonResponse
    {
        // $genders = Product::select('gender')->distinct()->get()->pluck('gender')->toArray();
        
        // dd($genders);
        // if ($genders->isEmpty()){
            $genders = ['Men','Women','Unisex'];
            // $genders = $defaultGenders;
        // }
        return response()->json([
            'genders' =>$genders
        ]);
    }

    /**
     * Getting the size for shoes
     */

     public function productSizes(): JsonResponse
     {
         $shoeSizes = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'];
         $clothingSizes = ['S','M','L'];
     
        //  Product::distinct()->pluck('size')
        //      ->each(function ($size) use (&$shoeSizes, &$clothingSizes) {
        //          preg_match_all('/[^\d]+/', $size, $letterMatches);
        //          preg_match_all('/\d+(\.\d+)?/', $size, $numberMatches);
     
        //          $letters = $letterMatches[0];
        //          $numbers = $numberMatches[0];
     
        //          if (!empty($letters)) {
        //              // Filter out "." values from clothing sizes
        //              $letters = array_filter($letters, function ($letter) {
        //                  return $letter !== '.';
        //              });
        //              $clothingSizes = array_merge($clothingSizes, $letters);
        //          }
     
        //          if (!empty($numbers)) {
        //              $shoeSizes = array_merge($shoeSizes, $numbers);
        //          }
        //  });
     
        //  $shoeSizes = array_unique($shoeSizes);
        //  $clothingSizes = array_unique($clothingSizes);
     
         return response()->json([
             "shoeSizes" => $shoeSizes,
             "clothingSizes" => $clothingSizes
         ]);
     }
     

}


