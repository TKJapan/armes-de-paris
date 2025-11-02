<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Weapon extends Model
{
    protected $fillable = [
        'wepon_name',
        'price',
        'weight',
        'description',
        'image_url',
    ];
}
