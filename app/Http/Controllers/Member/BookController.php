<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $query = Book::with('category');

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        $books = $query->orderBy('title')->paginate(12)->withQueryString();
        $categories = Category::all(['id', 'name']);

        return Inertia::render('Member/Books/Index', [
            'books' => $books,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
        ]);
    }
}
