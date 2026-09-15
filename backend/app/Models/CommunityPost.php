<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommunityPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'author_name',
        'pet_info',
        'avatar_emoji',
        'avatar_bg',
        'title',
        'content',
        'tag',
        'likes_count',
        'comments_count',
    ];

    protected $casts = [
        'likes_count' => 'integer',
        'comments_count' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
