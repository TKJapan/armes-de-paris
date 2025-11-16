<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Weapon extends Model
{
    use HasFactory;
    protected $fillable = [
        'wepon_name',
        'price',
        'weight',
        'description',
        'image_url',
    ];
}
