<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::with('category')->latest()->paginate(10);

        return Inertia::render('Admin/Books/Index', [
            'books' => $books,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Books/Create', [
            'categories' => Category::all(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'isbn' => 'nullable|string|max:50',
            'category_id' => 'required|exists:categories,id',
            'total_copies' => 'required|integer|min:1',
            'available_copies' => 'nullable|integer|min:0',
            'description' => 'nullable|string',
        ]);

        // otomatis isi available_copies jika kosong
        if (!isset($validated['available_copies'])) {
            $validated['available_copies'] = $validated['total_copies'];
        }

        Book::create($validated);

        return redirect()->route('admin.books.index')->with('success', 'Buku berhasil ditambahkan!');
    }

    public function edit(Book $book)
    {
        return Inertia::render('Admin/Books/Edit', [
            'book' => $book->load('category'),
            'categories' => Category::all(['id', 'name']),
        ]);
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'isbn' => 'nullable|string|max:50',
            'category_id' => 'required|exists:categories,id',
            'total_copies' => 'required|integer|min:1',
            'available_copies' => 'nullable|integer|min:0',
            'description' => 'nullable|string',
        ]);

        $book->update($validated);

        return redirect()->route('admin.books.index')->with('success', 'Buku berhasil diperbarui!');
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->back()->with('success', 'Buku dihapus.');
    }
}
