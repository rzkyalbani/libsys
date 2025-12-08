<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\User;
use App\Models\Borrowing;
use Illuminate\Support\Facades\DB;  
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalBooks = Book::count();
        $totalMembers = User::where('role', 'member')->count();
        $activeBorrowings = Borrowing::whereIn('status', ['requested', 'borrowed'])->count();
        $totalFine = Borrowing::sum('fine_amount');

        // Data for actionable items
        $pendingBorrowings = Borrowing::where('status', 'requested')->count();
        $overdueBorrowings = Borrowing::where('status', 'borrowed')
            ->where('due_date', '<', now())
            ->count();
        $unpaidFines = Borrowing::where('fine_amount', '<', 0) // Negative indicates owed
            ->where(function($query) {
                $query->whereNull('fine_paid_at')
                      ->orWhere('fine_paid_at', '<', now()->subDays(30)); // Or not marked as paid recently
            })
            ->count();
        $criticalStockBooks = Book::whereColumn('available_copies', '<', DB::raw('LEAST(3, total_copies * 0.1)')) // Less than 3 or 10% of total
            ->count();

        // Statistik peminjaman per bulan (12 bulan terakhir)
        $borrowingsPerMonth = Borrowing::select(
            DB::raw("DATE_FORMAT(borrow_date, '%Y-%m') as month"),
            DB::raw('COUNT(*) as total')
        )
        ->whereNotNull('borrow_date')
        ->groupBy('month')
        ->orderBy('month')
        ->get()
        ->map(function ($item) {
            return [
                'month' => date('M Y', strtotime($item->month . '-01')),
                'total' => $item->total,
            ];
        });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'books' => $totalBooks,
                'members' => $totalMembers,
                'borrowings' => $activeBorrowings,
                'fines' => $totalFine,
            ],
            'actionableStats' => [
                'pendingBorrowings' => $pendingBorrowings,
                'overdueBorrowings' => $overdueBorrowings,
                'unpaidFines' => $unpaidFines,
                'criticalStockBooks' => $criticalStockBooks,
            ],
            'chartData' => $borrowingsPerMonth,
        ]);
    }
}
