<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\User;
use App\Models\Borrowing;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalBooks = Book::count();
        $totalMembers = User::where('role', 'member')->count();
        $activeBorrowings = Borrowing::whereIn('status', ['requested', 'borrowed'])->count();
        $totalFine = Borrowing::sum('fine_amount');

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'books' => $totalBooks,
                'members' => $totalMembers,
                'borrowings' => $activeBorrowings,
                'fines' => $totalFine,
            ],
        ]);
    }
}
