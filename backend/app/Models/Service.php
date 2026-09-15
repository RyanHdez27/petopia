<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'provider_id',
        'slug',
        'title',
        'subtitle',
        'category',
        'description',
        'price',
        'duration',
        'rating',
        'reviews_count',
        'icon',
        'bg_icon',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'rating' => 'decimal:1',
        'reviews_count' => 'integer',
        'is_active' => 'boolean',
    ];

    public function provider()
    {
        return $this->belongsTo(User::class, 'provider_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
