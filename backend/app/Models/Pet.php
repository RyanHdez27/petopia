<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'species', // 'dog', 'cat', 'other'
        'breed',
        'gender',
        'age',
        'weight',
        'microchip_id',
        'avatar_emoji',
        'avatar_bg',
        'medical_notes',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
