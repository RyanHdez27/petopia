<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'subtitle',
        'description',
        'price',
        'stock',
        'rating',
        'reviews_count',
        'icon',
        'bg_color',
        'accent_color',
        'color_variants',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'rating' => 'decimal:1',
        'reviews_count' => 'integer',
        'stock' => 'integer',
        'color_variants' => 'array',
        'is_active' => 'boolean',
    ];
}
