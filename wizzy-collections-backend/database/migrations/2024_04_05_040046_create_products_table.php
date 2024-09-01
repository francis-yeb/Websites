<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('category',["Clothings","Shoes"]);
            $table->decimal('price',8,2);
            $table->enum('size',['S','M','L','6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'])->nullable();
            
            $table->enum('gender',['Men','Women','Unisex']);
            $table->string('brand')->nullable();
            $table->string('image')->nullable();
            $table->unsignedInteger('stock_quantity')->default(0);
            $table->json('rating')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
