<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;

class FineController extends Controller
{
    public function index()
    {
        $query = Borrowing::with('user', 'book')
            ->where('fine_amount', '<', 0) // negative fine_amount indicates owed fines (debts)
            ->orderByDesc('created_at');

        // Add filters if present
        if (request()->has('paid') && request('paid') === 'true') {
            $query->where('is_fine_paid', true);
        } elseif (request()->has('paid') && request('paid') === 'false') {
            $query->where('is_fine_paid', false);
        }

        $borrowings = $query->paginate(10);

        return inertia('Admin/Fines/Index', [
            'borrowings' => $borrowings,
            'filters' => request()->only(['paid']),
        ]);
    }

    public function markPaid(Borrowing $borrowing)
    {
        if ($borrowing->fine_amount <= 0) {
            return back()->with('error', 'Pinjaman ini tidak memiliki denda.');
        }

        $borrowing->update([
            'is_fine_paid' => true,
            'fine_paid_at' => now(),
        ]);

        return back()->with('success', 'Denda ditandai sudah dibayar.');
    }
}
