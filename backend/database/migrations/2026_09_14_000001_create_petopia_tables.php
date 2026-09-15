<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Users
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('phone')->nullable();
            $table->string('role')->default('owner'); // 'owner', 'provider', 'vet', 'admin'
            $table->string('avatar_url')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        // 2. Pets
        Schema::create('pets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('species')->default('dog'); // 'dog', 'cat', 'other'
            $table->string('breed')->nullable();
            $table->string('gender')->nullable();
            $table->string('age')->nullable();
            $table->string('weight')->nullable();
            $table->string('microchip_id')->nullable();
            $table->string('avatar_emoji')->default('🐶');
            $table->string('avatar_bg')->nullable();
            $table->text('medical_notes')->nullable();
            $table->timestamps();
        });

        // 3. Services
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->string('category')->default('general');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('duration')->nullable();
            $table->decimal('rating', 2, 1)->default(5.0);
            $table->unsignedInteger('reviews_count')->default(0);
            $table->string('icon')->default('🩺');
            $table->string('bg_icon')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 4. Bookings
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->foreignId('pet_id')->nullable()->constrained()->nullOnDelete();
            $table->date('booking_date');
            $table->string('booking_time');
            $table->string('status')->default('pending'); // 'pending', 'confirmed', 'completed', 'cancelled'
            $table->decimal('total_price', 10, 2);
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // 5. Products
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->unsignedInteger('stock')->default(100);
            $table->decimal('rating', 2, 1)->default(5.0);
            $table->unsignedInteger('reviews_count')->default(0);
            $table->string('icon')->default('🥣');
            $table->string('bg_color')->nullable();
            $table->string('accent_color')->nullable();
            $table->json('color_variants')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 6. Community Posts
        Schema::create('community_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('author_name');
            $table->string('pet_info')->nullable();
            $table->string('avatar_emoji')->default('🐾');
            $table->string('avatar_bg')->nullable();
            $table->string('title');
            $table->text('content');
            $table->string('tag')->default('General');
            $table->unsignedInteger('likes_count')->default(0);
            $table->unsignedInteger('comments_count')->default(0);
            $table->timestamps();
        });

        // 7. Resources / Articles
        Schema::create('resource_articles', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('category');
            $table->string('read_time')->default('5 min de lectura');
            $table->string('bg_color')->nullable();
            $table->string('text_color')->nullable();
            $table->string('icon')->default('📖');
            $table->longText('content')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resource_articles');
        Schema::dropIfExists('community_posts');
        Schema::dropIfExists('products');
        Schema::dropIfExists('bookings');
        Schema::dropIfExists('services');
        Schema::dropIfExists('pets');
        Schema::dropIfExists('users');
    }
};
