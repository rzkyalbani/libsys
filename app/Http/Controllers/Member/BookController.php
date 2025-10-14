<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use App\Models\Reservation;
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

    public function reserve(Book $book)
    {
        if ($book->available_copies > 0) {
            return back()->with('error', 'Buku masih tersedia, silakan pinjam langsung.');
        }

        $alreadyReserved = Reservation::where('book_id', $book->id)
            ->where('user_id', auth()->id())
            ->where('status', 'waiting')
            ->exists();

        if ($alreadyReserved) {
            return back()->with('error', 'Kamu sudah memesan buku ini.');
        }

        Reservation::create([
            'user_id' => auth()->id(),
            'book_id' => $book->id,
        ]);

        return back()->with('success', 'Buku berhasil dipesan. Kamu akan diberi tahu jika sudah tersedia.');
    }
}
