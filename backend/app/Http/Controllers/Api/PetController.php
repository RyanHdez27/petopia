<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pet;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PetController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $userId = $request->user()?->id ?? 1; // Fallback para dev local
        $pets = Pet::where('user_id', $userId)->get();

        return response()->json([
            'success' => true,
            'data' => $pets
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'species' => 'required|string|in:dog,cat,other',
            'breed' => 'nullable|string|max:100',
            'gender' => 'nullable|string|max:20',
            'age' => 'nullable|string|max:50',
            'weight' => 'nullable|string|max:50',
            'microchip_id' => 'nullable|string|max:100',
            'avatar_emoji' => 'nullable|string|max:10',
            'avatar_bg' => 'nullable|string|max:50',
            'medical_notes' => 'nullable|string',
        ]);

        $validated['user_id'] = $request->user()?->id ?? 1;
        $pet = Pet::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Mascota registrada exitosamente',
            'data' => $pet
        ], 201);
    }

    public function show(Pet $pet): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $pet
        ]);
    }

    public function update(Request $request, Pet $pet): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:100',
            'species' => 'sometimes|required|string|in:dog,cat,other',
            'breed' => 'nullable|string|max:100',
            'gender' => 'nullable|string|max:20',
            'age' => 'nullable|string|max:50',
            'weight' => 'nullable|string|max:50',
            'microchip_id' => 'nullable|string|max:100',
            'avatar_emoji' => 'nullable|string|max:10',
            'avatar_bg' => 'nullable|string|max:50',
            'medical_notes' => 'nullable|string',
        ]);

        $pet->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Ficha de mascota actualizada',
            'data' => $pet
        ]);
    }

    public function destroy(Pet $pet): JsonResponse
    {
        $pet->delete();

        return response()->json([
            'success' => true,
            'message' => 'Mascota eliminada correctamente'
        ]);
    }
}
