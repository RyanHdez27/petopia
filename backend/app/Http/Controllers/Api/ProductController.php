<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::where('is_active', true);

        if ($request->has('search')) {
            $search = $request->query('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('subtitle', 'like', "%{$search}%");
            });
        }

        return response()->json([
            'success' => true,
            'data' => $query->get()
        ]);
    }

    public function show(string $identifier): JsonResponse
    {
        $product = Product::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }
}
