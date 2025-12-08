import { Link, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";
import { useState } from "react";

// Function to format date
const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export default function Index({ borrowings, filters }) {
    const { flash } = usePage().props;
    const [currentFilters, setCurrentFilters] = useState({
        overdue: filters?.overdue || '',
        pending: filters?.pending || ''
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
                        Manajemen Peminjaman
                    </h1>
                    <p className="text-sm text-gray-500">
                        Kelola peminjaman dan pengembalian buku
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => updateFilter('pending', currentFilters.pending === 'true' ? '' : 'true')}
                        className={`px-3 py-1.5 text-sm rounded-full ${
                            currentFilters.pending === 'true'
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Menunggu Approval
                    </button>
                    <button
                        onClick={() => updateFilter('overdue', currentFilters.overdue === 'true' ? '' : 'true')}
                        className={`px-3 py-1.5 text-sm rounded-full ${
                            currentFilters.overdue === 'true'
                                ? 'bg-red-100 text-red-800 border border-red-200'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Terlambat
                    </button>
                    {(currentFilters.pending === 'true' || currentFilters.overdue === 'true') && (
                        <button
                            onClick={() => {
                                setCurrentFilters({ overdue: '', pending: '' });
                                window.location.href = window.location.pathname;
                            }}
                            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                        >
                            Reset Filter
                        </button>
                    )}
                </div>
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
                                Member
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Buku
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Status
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Tanggal Pinjam
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Jatuh Tempo
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {borrowings.data.length > 0 ? (
                            borrowings.data.map((b) => {
                                // Calculate overdue days if status is borrowed and due date is in the past
                                const isOverdue = b.status === "borrowed" && new Date(b.due_date) < new Date();
                                const overdueDays = isOverdue
                                    ? Math.floor((new Date() - new Date(b.due_date)) / (1000 * 60 * 60 * 24))
                                    : 0;

                                return (
                                    <tr
                                        key={b.id}
                                        className={`border-b last:border-none hover:bg-gray-50 transition-all ${
                                            isOverdue ? 'bg-red-50 border-l-4 border-l-red-500' : ''
                                        }`}
                                    >
                                        <td className="px-5 py-3 font-medium text-gray-900">
                                            {b.user.name}
                                        </td>
                                        <td className="px-5 py-3">
                                            {b.book.title}
                                        </td>
                                        <td className="px-5 py-3 capitalize">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                                                    b.status === "borrowed"
                                                        ? isOverdue
                                                            ? "bg-red-50 border-red-200 text-red-700"
                                                            : "bg-blue-50 border-blue-200 text-blue-700"
                                                        : b.status === "requested"
                                                        ? "bg-amber-50 border-amber-200 text-amber-700"
                                                        : "bg-emerald-50 border-emerald-200 text-emerald-700"
                                                }`}
                                            >
                                                {b.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-gray-600">
                                            {formatDate(b.borrow_date)}
                                        </td>
                                        <td className="px-5 py-3 text-gray-600">
                                            {formatDate(b.due_date)}
                                            {isOverdue && (
                                                <div className="text-xs text-red-600 mt-1">
                                                    +{overdueDays} hari terlambat
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-5 py-3 space-x-2">
                                            {b.status === "requested" && (
                                                <Link
                                                    method="patch"
                                                    as="button"
                                                    href={route(
                                                        "admin.borrowings.update",
                                                        b.id
                                                    )}
                                                    data={{ action: "approve" }}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all shadow-sm hover:shadow-md"
                                                >
                                                    Approve
                                                </Link>
                                            )}
                                            {b.status === "borrowed" && (
                                                <Link
                                                    method="patch"
                                                    as="button"
                                                    href={route(
                                                        "admin.borrowings.update",
                                                        b.id
                                                    )}
                                                    data={{ action: "return" }}
                                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all shadow-sm hover:shadow-md"
                                                >
                                                    Return
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center text-gray-500 py-10 italic"
                                >
                                    Belum ada data peminjaman.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {borrowings.links && borrowings.data.length > 0 && (
                <div className="flex justify-center gap-2 pt-6">
                    {borrowings.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || "#"}
                            className={`px-3 py-1.5 rounded text-sm font-medium transition ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : link.url
                                    ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
