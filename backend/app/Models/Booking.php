<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'service_id',
        'pet_id',
        'booking_date',
        'booking_time',
        'status', // 'pending', 'confirmed', 'completed', 'cancelled'
        'total_price',
        'notes',
    ];

    protected $casts = [
        'booking_date' => 'date',
        'total_price' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }
}
