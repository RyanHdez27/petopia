<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResourceArticle extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'read_time',
        'bg_color',
        'text_color',
        'icon',
        'content',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];
}
