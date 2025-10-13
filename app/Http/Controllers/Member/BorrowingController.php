<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrowing;
use Illuminate\Http\Request;

class BorrowingController extends Controller
{
    public function store(Request $request)
    {
        $book = Book::findOrFail($request->book_id);

        if ($book->available_copies <= 0) {
            return back()->withErrors(['error' => 'Buku tidak tersedia untuk dipinjam.']);
        }

        // Cek apakah user sudah meminjam buku yang sama dan belum dikembalikan
        $alreadyBorrowed = Borrowing::where('user_id', $request->user()->id)
            ->where('book_id', $book->id)
            ->whereIn('status', ['requested', 'borrowed'])
            ->exists();

        if ($alreadyBorrowed) {
            return back()->withErrors(['error' => 'Kamu sudah meminjam atau sedang menunggu konfirmasi untuk buku ini.']);
        }

        Borrowing::create([
            'user_id' => $request->user()->id,
            'book_id' => $book->id,
            'status' => 'requested',
        ]);

        // Kurangi stok tersedia
        $book->decrement('available_copies', 1);

        return back()->with('success', 'Permintaan peminjaman telah dikirim. Tunggu konfirmasi dari admin.');
    }
}
