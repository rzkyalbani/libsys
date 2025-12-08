import { Link, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";
import { useState } from "react";

export default function Index({ members, filters }) {
    const { flash } = usePage().props;
    const [currentFilters, setCurrentFilters] = useState({
        overdue: filters?.overdue || '',
        fines: filters?.fines || ''
    });

    // Function to update filters
    const updateFilter = (filterName, value) => {
        const newFilters = { ...currentFilters, [filterName]: value };
        setCurrentFilters(newFilters);

        // Update URL without page reload
        const query = new URLSearchParams(newFilters).toString();
        window.location.href = `${window.location.pathname}?${query}`;
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                        Daftar Member
                    </h1>
                    <p className="text-sm text-gray-500">
                        Kelola data anggota perpustakaan
                    </p>
                </div>

                <Link
                    href={route("admin.members.create")}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                    + Tambah Member
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => updateFilter('overdue', currentFilters.overdue === 'true' ? '' : 'true')}
                    className={`px-3 py-1.5 text-sm rounded-full ${
                        currentFilters.overdue === 'true'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Member Terlambat
                </button>
                <button
                    onClick={() => updateFilter('fines', currentFilters.fines === 'true' ? '' : 'true')}
                    className={`px-3 py-1.5 text-sm rounded-full ${
                        currentFilters.fines === 'true'
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Member Denda Belum Bayar
                </button>
                {(currentFilters.overdue === 'true' || currentFilters.fines === 'true') && (
                    <button
                        onClick={() => {
                            setCurrentFilters({ overdue: '', fines: '' });
                            window.location.href = window.location.pathname;
                        }}
                        className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                    >
                        Reset Filter
                    </button>
                )}
            </div>

            {/* Flash Message */}
            {flash.success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg shadow-sm text-sm">
                    {flash.success}
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Nama
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Email
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Peminjaman Aktif
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Terlambat
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Denda Belum Bayar
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Tanggal Bergabung
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.data.length > 0 ? (
                            members.data.map((member) => (
                                <tr
                                    key={member.id}
                                    className={`border-b last:border-none hover:bg-gray-50 transition-all ${
                                        (member.overdue_borrowings_count > 0 || member.unpaid_fines_count > 0)
                                            ? "bg-red-50 border-l-4 border-l-red-500"
                                            : ""
                                    }`}
                                >
                                    <td className="px-5 py-3 font-medium text-gray-900">
                                        {member.name}
                                    </td>
                                    <td className="px-5 py-3">
                                        {member.email}
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className="font-medium">
                                            {member.active_borrowings_count}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        {member.overdue_borrowings_count > 0 ? (
                                            <span className="font-medium text-amber-600">
                                                {member.overdue_borrowings_count}
                                            </span>
                                        ) : (
                                            <span className="text-gray-500">0</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3">
                                        {member.unpaid_fines_count > 0 ? (
                                            <span className="font-medium text-red-600">
                                                {member.unpaid_fines_count}
                                            </span>
                                        ) : (
                                            <span className="text-gray-500">0</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3 text-gray-600">
                                        {new Date(
                                            member.created_at
                                        ).toLocaleDateString("id-ID")}
                                    </td>
                                    <td className="px-5 py-3 space-x-3">
                                        <Link
                                            href={route(
                                                "admin.members.edit",
                                                member.id
                                            )}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                        >
                                            Edit
                                        </Link>

                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route(
                                                "admin.members.destroy",
                                                member
                                            )}
                                            onClick={(e) => {
                                                if (
                                                    !confirm(
                                                        `Hapus member "${member.name}"?`
                                                    )
                                                )
                                                    e.preventDefault();
                                            }}
                                            className="text-rose-600 hover:text-rose-800 font-medium text-sm"
                                        >
                                            Hapus
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center text-gray-500 py-10 italic"
                                >
                                    Belum ada member.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
