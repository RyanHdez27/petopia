<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $userId = $request->user()?->id ?? 1;
        $bookings = Booking::with(['service', 'pet'])
            ->where('user_id', $userId)
            ->orderBy('booking_date', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $bookings
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'pet_id' => 'nullable|exists:pets,id',
            'booking_date' => 'required|date',
            'booking_time' => 'required|string',
            'notes' => 'nullable|string|max:500',
        ]);

        $service = Service::findOrFail($validated['service_id']);

        $booking = Booking::create([
            'user_id' => $request->user()?->id ?? 1,
            'service_id' => $service->id,
            'pet_id' => $validated['pet_id'] ?? null,
            'booking_date' => $validated['booking_date'],
            'booking_time' => $validated['booking_time'],
            'status' => 'pending',
            'total_price' => $service->price,
            'notes' => $validated['notes'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Cita reservada con éxito',
            'data' => $booking->load(['service', 'pet'])
        ], 201);
    }
}
