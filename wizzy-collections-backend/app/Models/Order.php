<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    
    //Specify the table asociated with the mode
    protected $table = 'product_orders';

    protected $fillable = [
        'user_id',
        'total_amount',
        'status',
        'email',
        'phone',
        'reference',
        'payment_method'
    ];

    public function user () {
        return $this->belongsTo(User::class);
    }
}
