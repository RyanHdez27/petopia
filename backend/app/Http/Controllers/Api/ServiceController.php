<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Service::where('is_active', true);

        if ($request->has('category')) {
            $query->where('category', $request->query('category'));
        }

        if ($request->has('search')) {
            $search = $request->query('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('subtitle', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        return response()->json([
            'success' => true,
            'data' => $query->get()
        ]);
    }

    public function show(string $identifier): JsonResponse
    {
        $service = Service::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }
}
