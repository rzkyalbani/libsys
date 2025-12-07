import { Link, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Badge } from "@/Components/Badge";

export default function Index({ books }) {
    const { flash } = usePage().props;

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
                <div className="flex justify-between items-center mb-6 pt-6 px-6">
                    <h2 className="text-lg font-semibold text-gray-900">Daftar Buku</h2>
                    <Link href={route("admin.books.create")}>
                        <PrimaryButton>Tambah Buku</PrimaryButton>
                    </Link>
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
                                    <tr key={book.id}>
                                        <td className="font-medium">{book.title}</td>
                                        <td>{book.author || "-"}</td>
                                        <td>{book.category?.name || "-"}</td>
                                        <td>
                                            {book.available_copies > 0 ? (
                                                <Badge variant="success">
                                                    {book.available_copies}/{book.total_copies} tersedia
                                                </Badge>
                                            ) : (
                                                <Badge variant="danger">
                                                    Stok habis
                                                </Badge>
                                            )}
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
        </div>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
