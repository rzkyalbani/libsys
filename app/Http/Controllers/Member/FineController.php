<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FineController extends Controller
{
    public function index()
    {
        $fines = Borrowing::with('book')
            ->where('user_id', Auth::id())
            ->where('fine_amount', '>', 0)
            ->orderByDesc('created_at')
            ->paginate(10);

        return Inertia::render('Member/Fines/Index', [
            'fines' => $fines,
        ]);
    }

    public function markAsPaid(Borrowing $borrowing)
    {
        if ($borrowing->user_id !== Auth::id()) {
            abort(403);
        }

        if ($borrowing->fine_amount > 0) {
            $borrowing->update(['is_fine_paid' => true]);
        }

        return back()->with('success', 'Denda telah ditandai sebagai sudah dibayar.');
    }
}

