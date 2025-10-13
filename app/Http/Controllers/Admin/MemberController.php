<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $members = User::where('role', 'member')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Members/Index', [
            'members' => $members,
        ]);
    }

    public function destroy(User $member)
    {
        if ($member->role !== 'member') {
            return back()->withErrors(['error' => 'Hanya member yang bisa dihapus.']);
        }

        $member->delete();

        return back()->with('success', 'Member berhasil dihapus.');
    }
}
