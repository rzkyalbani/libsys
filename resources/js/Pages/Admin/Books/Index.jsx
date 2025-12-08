import { Link, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Badge } from "@/Components/Badge";
import { useState } from "react";

export default function Index({ books, filters }) {
    const { flash } = usePage().props;
    const [currentFilters, setCurrentFilters] = useState({
        stock: filters?.stock || ''
    });

    // Function to update filters
    const updateFilter = (value) => {
        const newFilters = { stock: value };
        setCurrentFilters(newFilters);

        // Update URL without page reload
        const query = new URLSearchParams(newFilters).toString();
        window.location.href = `${window.location.pathname}?${query}`;
    };

    return (
        <div className="main-container py-8">
            {/* Header */}
            <div className="page-header">
                <h1 className="page-title">Daftar Buku</h1>
                <p className="page-subtitle">
                    Kelola koleksi buku perpustakaan
                </p>
            </div>

            {/* Flash Message */}
            {flash.success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                    {flash.success}
                </div>
            )}

            <div className="card">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pt-6 px-6">
                    <h2 className="text-lg font-semibold text-gray-900">Daftar Buku</h2>
                    <div className="flex flex-wrap gap-2">
                        <Link href={route("admin.books.create")}>
                            <PrimaryButton>Tambah Buku</PrimaryButton>
                        </Link>
                        <button
                            onClick={() => updateFilter(currentFilters.stock === 'critical' ? '' : 'critical')}
                            className={`px-3 py-1.5 text-sm rounded-full ${
                                currentFilters.stock === 'critical'
                                    ? 'bg-red-100 text-red-800 border border-red-200'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Stok Kritis
                        </button>
                        {currentFilters.stock === 'critical' && (
                            <button
                                onClick={() => {
                                    setCurrentFilters({ stock: '' });
                                    window.location.href = window.location.pathname;
                                }}
                                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                            >
                                Reset Filter
                            </button>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-left">Judul</th>
                                <th className="text-left">Penulis</th>
                                <th className="text-left">Kategori</th>
                                <th className="text-left">Stok</th>
                                <th className="text-left">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {books.data.length > 0 ? (
                                books.data.map((book) => (
                                    <tr
                                        key={book.id}
                                        className={book.stock_status === 'critical' || book.stock_status === 'empty'
                                            ? 'bg-red-50 border-l-4 border-l-red-500'
                                            : book.stock_status === 'low'
                                                ? 'bg-yellow-50 border-l-4 border-l-amber-500'
                                                : ''}
                                    >
                                        <td className="font-medium">{book.title}</td>
                                        <td>{book.author || "-"}</td>
                                        <td>{book.category?.name || "-"}</td>
                                        <td>
                                            <div className="flex flex-col">
                                                {book.available_copies > 0 ? (
                                                    <div className="flex items-center gap-2">
                                                        <Badge
                                                            variant={
                                                                book.stock_status === 'critical' ? 'destructive' :
                                                                book.stock_status === 'low' ? 'warning' :
                                                                'success'
                                                            }
                                                        >
                                                            {book.available_copies}/{book.total_copies} tersedia
                                                        </Badge>
                                                        {book.stock_status === 'critical' && (
                                                            <span className="text-xs text-red-600">Kritis!</span>
                                                        )}
                                                        {book.stock_status === 'low' && (
                                                            <span className="text-xs text-amber-600">Rendah</span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="destructive">
                                                            Stok habis
                                                        </Badge>
                                                        <span className="text-xs text-red-600">Kosong</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={route("admin.books.edit", book.id)}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    Edit
                                                </Link>
                                                <span className="text-gray-300">|</span>
                                                <Link
                                                    as="button"
                                                    method="delete"
                                                    href={route("admin.books.destroy", book.id)}
                                                    onClick={(e) => {
                                                        if(!confirm(`Apakah kamu yakin ingin menghapus buku "${book.title}"?`)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    className="text-red-600 hover:text-red-800 font-medium"
                                                >
                                                    Hapus
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center text-gray-500 py-10 italic"
                                    >
                                        Belum ada data buku.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {books.links && books.data.length > 0 && (
                <div className="flex justify-center gap-2 pt-6">
                    {books.links.map((link, i) => (
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
