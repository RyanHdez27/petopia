<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Pet;
use App\Models\Service;
use App\Models\Product;
use App\Models\CommunityPost;
use App\Models\ResourceArticle;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Usuario Demo
        $user = User::create([
            'name' => 'Alex Tutor',
            'email' => 'alex@petopia.com',
            'password' => Hash::make('password123'),
            'phone' => '+57 300 123 4567',
            'role' => 'owner',
        ]);

        // 2. Mascotas
        Pet::create([
            'user_id' => $user->id,
            'name' => 'Luna',
            'species' => 'dog',
            'breed' => 'Poodle Mix',
            'age' => '2 años',
            'weight' => '6.5 kg',
            'avatar_emoji' => '🔮',
            'avatar_bg' => 'bg-[#F4CCEE] text-[#9D3C8D]',
            'medical_notes' => 'Vacunas al día (Rabia y Sextuple). Alergia leve a granos.',
        ]);

        Pet::create([
            'user_id' => $user->id,
            'name' => 'Simba',
            'species' => 'cat',
            'breed' => 'Común europeo',
            'age' => '3 años',
            'weight' => '4.2 kg',
            'avatar_emoji' => '🐱',
            'avatar_bg' => 'bg-[#FFF2EE] text-[#FD704E]',
            'medical_notes' => 'Esterilizado, microchip implantado en 2024.',
        ]);

        // 3. Servicios
        Service::create([
            'slug' => 'consulta-vet',
            'title' => 'Consulta veterinaria',
            'subtitle' => 'Salud hoy, más momentos juntos mañana.',
            'category' => 'veterinaria',
            'description' => 'Chequeo preventivo completo, revisión física de ojos, oídos, dientes y signos vitales.',
            'price' => 250.00,
            'duration' => '45 min',
            'rating' => 4.9,
            'reviews_count' => 128,
            'icon' => '🩺',
            'bg_icon' => 'bg-[#F4CCEE] text-[#9D3C8D]',
        ]);

        Service::create([
            'slug' => 'paseo-perros',
            'title' => 'Paseos diarios y ejercicio',
            'subtitle' => 'Rutas activas con paseadores certificados.',
            'category' => 'paseo',
            'description' => 'Recorridos seguros con hidratación, reporte de geolocalización y juego estimulante.',
            'price' => 180.00,
            'duration' => '60 min',
            'rating' => 4.8,
            'reviews_count' => 95,
            'icon' => '🐕',
            'bg_icon' => 'bg-[#FFF2EE] text-[#FD704E]',
        ]);

        Service::create([
            'slug' => 'spa-estetica',
            'title' => 'Baño y corte de estetica',
            'subtitle' => 'Cuidado de pelaje e higiene completa.',
            'category' => 'spa',
            'description' => 'Champú hipoalergénico, corte de uñas, limpieza de oídos y secado sin estrés.',
            'price' => 350.00,
            'duration' => '90 min',
            'rating' => 4.9,
            'reviews_count' => 64,
            'icon' => '✂️',
            'bg_icon' => 'bg-[#E8F5E9] text-emerald-800',
        ]);

        // 4. Productos
        Product::create([
            'slug' => 'tazon-essential',
            'title' => 'Tazón Essential',
            'subtitle' => 'Diseño simple. Grandes momentos.',
            'description' => 'Fabricado en cerámica grado alimenticio de alta resistencia. Base antideslizante de silicona.',
            'price' => 249.00,
            'stock' => 50,
            'rating' => 4.8,
            'reviews_count' => 96,
            'icon' => '🥣',
            'bg_color' => 'bg-[#FFFDF5] border-amber-100',
            'accent_color' => 'text-[#FD704E]',
            'color_variants' => [
                ['id' => 'orange', 'label' => 'Naranja', 'hex' => '#FD704E'],
                ['id' => 'pink', 'label' => 'Rosa', 'hex' => '#F4CCEE'],
                ['id' => 'teal', 'label' => 'Verde Guardián', 'hex' => '#174C58'],
                ['id' => 'cream', 'label' => 'Crema', 'hex' => '#FFFFE9'],
            ],
        ]);

        Product::create([
            'slug' => 'cama-cozy',
            'title' => 'Cama Soft Cloud',
            'subtitle' => 'Descanso ergonómico de máxima suavidad.',
            'description' => 'Espuma ortopédica con funda removible y lavable.',
            'price' => 699.00,
            'stock' => 20,
            'rating' => 4.9,
            'reviews_count' => 142,
            'icon' => '🛏️',
            'bg_color' => 'bg-[#F4CCEE]/30 border-[#F4CCEE]',
            'accent_color' => 'text-[#9D3C8D]',
        ]);

        Product::create([
            'slug' => 'juguete-interactivo',
            'title' => 'Pelota de Juego Activo',
            'subtitle' => 'Resistente y libre de BPA para mordidas.',
            'description' => 'Rebota en ángulos impredecibles para ejercitar el instinto de caza.',
            'price' => 149.00,
            'stock' => 85,
            'rating' => 4.7,
            'reviews_count' => 58,
            'icon' => '🎾',
            'bg_color' => 'bg-[#E8F5E9]/50 border-emerald-200',
            'accent_color' => 'text-emerald-800',
        ]);
    }
}
