<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class PaymentData extends Model
{
    use HasFactory;

    protected $primaryKey = 'reference';

    public $incrementing = false;

    protected $fillable = [
        "reference",
        "status",
        "receipt_number",
        "amount",
        "phone",
        "currency",
        "message",
    ];
}
