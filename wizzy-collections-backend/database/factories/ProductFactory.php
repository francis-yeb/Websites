<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $category = $this->faker->randomElement(['Clothings', 'Shoes']);
        $title = $this->faker->sentence(); // Generate a random sentence for the title
        $description = $this->faker->paragraph(); // Generate a random paragraph for the description
        $price = $this->faker->randomFloat(2, 10, 500); // Generate a random price between 10 and 500
        $size = $category == 'Clothings' ? $this->faker->randomElement(['S', 'M', 'L']) : $this->faker->randomElement(['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10']); 
        $gender = $category == 'Clothings' ? $this->faker->randomElement(['Men', 'Women', 'Unisex']) : $this->faker->randomElement(['Men', 'Women']);
        $brand = $this->faker->company(); // Generate a random company name for the brand
        $stock_quantity = $this->faker->numberBetween(1, 100); 
        $rating = ['rate' => $this->faker->randomFloat(1, 1, 5), 'count' => $this->faker->numberBetween(1, 100)];

        // Fetch real images from Unsplash API
        $response = Http::get('https://api.unsplash.com/photos/random', [
            'query' => $category == 'Clothings' ? 'clothing' : 'shoes', // Specify the search query
            'client_id' => 'JYxWNu3km3xx5OfGfvL-1bXFxCYtFr7xpjEy8w7EiIY', // Replace with your Unsplash access key
        ]);

        $imageData = $response->json();
        $imageUrl = $imageData['urls']['regular']; 

        // Extract the file extension from the URL
        $imageExtension = pathinfo($imageUrl, PATHINFO_EXTENSION);

        // Generate a unique file name with the original extension
        $fileName = uniqid() . '.' . $imageExtension;

        // Define the directory where the image will be stored
        $imageDirectory = 'images/';

        // Combine the directory and file name to get the full image path
        $imagePath = $imageDirectory . $fileName;

        // Download the image and store it in the public image directory
        file_put_contents(public_path($imagePath), file_get_contents($imageUrl));


        return [
            'title' => $title,
            'description' => $description,
            'category' => $category,
            'price' => $price,
            'size' => $size,
            'gender' => $gender,
            'brand' => $brand,
            'image' => $fileName,
            'stock_quantity' => $stock_quantity,
            'rating' => json_encode($rating, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE), // Convert array to JSON string
        
        ];
    }
}
