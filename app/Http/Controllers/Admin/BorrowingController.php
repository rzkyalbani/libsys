<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BorrowingController extends Controller
{
    public function index()
    {
        $borrowings = Borrowing::with(['book', 'user'])
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Admin/Borrowings/Index', [
            'borrowings' => $borrowings,
        ]);
    }

    public function update(Request $request, Borrowing $borrowing)
    {
        $action = $request->action;

        if ($action === 'approve' && $borrowing->status === 'requested') {
            $borrowing->update([
                'status' => 'borrowed',
                'borrow_date' => now(),
                'due_date' => now()->addDays(7), // misal 7 hari
            ]);

            return back()->with('success', 'Peminjaman disetujui.');
        }

        if ($action === 'return' && $borrowing->status === 'borrowed') {
            $fine = 0;
            $now = now();

            if ($now->gt($borrowing->due_date)) {
                $daysLate = $now->diffInDays($borrowing->due_date);
                $fineRate = 1000; // Rp 1000 per hari
                $fine = $daysLate * $fineRate;
            }

            $borrowing->update([
                'status' => 'returned',
                'return_date' => $now,
                'fine_amount' => $fine,
            ]);

            // Tambahkan stok kembali
            $borrowing->book->increment('available_copies', 1);

            return back()->with('success', 'Buku dikembalikan. Denda: Rp ' . number_format($fine, 0, ',', '.'));
        }

        return back()->withErrors(['error' => 'Aksi tidak valid.']);
    }
}
