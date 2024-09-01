<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'price',
        'size',
        'gender',
        'brand',
        'image',
        'stock_quantity',
        'rating'
    ];

    

    protected $casts = [
        "rating" => "array"
    ];
}
