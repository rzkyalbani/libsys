<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $query = User::where('role', 'member')->latest();

        // Add filter for members with overdue books
        if (request()->has('overdue') && request('overdue') === 'true') {
            $query->whereHas('borrowings', function($q) {
                $q->where('status', 'borrowed')
                  ->where('due_date', '<', now());
            });
        }

        // Add filter for members with unpaid fines
        if (request()->has('fines') && request('fines') === 'true') {
            $query->whereHas('borrowings', function($q) {
                $q->where('fine_amount', '<', 0) // Negative fine means owes money
                  ->where('is_fine_paid', false);
            });
        }

        $members = $query->paginate(10);

        // Add virtual properties for each member
        $members->getCollection()->transform(function ($member) {
            // Count active borrowings (requested or borrowed)
            $member->active_borrowings_count = $member->borrowings()
                ->whereIn('status', ['requested', 'borrowed'])
                ->count();

            // Count overdue borrowings
            $member->overdue_borrowings_count = $member->borrowings()
                ->where('status', 'borrowed')
                ->where('due_date', '<', now())
                ->count();

            // Count unpaid fines
            $member->unpaid_fines_count = $member->borrowings()
                ->where('fine_amount', '<', 0) // Negative fine means owes money
                ->where('is_fine_paid', false)
                ->count();

            return $member;
        });

        return Inertia::render('Admin/Members/Index', [
            'members' => $members,
            'filters' => request()->only(['overdue', 'fines']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Members/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'member',
        ]);

        return redirect()->route('admin.members.index')->with('success', 'Member baru berhasil ditambahkan.');
    }

    public function edit(User $member)
    {
        if ($member->role !== 'member') {
            abort(403);
        }

        return Inertia::render('Admin/Members/Edit', [
            'member' => $member,
        ]);
    }

    public function update(Request $request, User $member)
    {
        if ($member->role !== 'member') {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email,' . $member->id,
            'password' => 'nullable|min:6',
        ]);

        $member->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password']
                ? Hash::make($validated['password'])
                : $member->password,
        ]);

        return redirect()->route('admin.members.index')->with('success', 'Data member berhasil diperbarui.');
    }

    public function destroy(User $member)
    {
        if ($member->role !== 'member') {
            return back()->with('error', 'Hanya member yang bisa dihapus.');
        }

        $member->delete();

        return back()->with('success', 'Member berhasil dihapus.');
    }
}
