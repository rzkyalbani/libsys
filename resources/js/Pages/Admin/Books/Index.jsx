import { Link, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Index({ books }) {
    const { flash } = usePage().props;

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">
                    📚 Daftar Buku
                </h1>

                <Link
                    href={route("admin.books.create")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                    + Tambah Buku
                </Link>
            </div>

            {flash.success && (
                <div className="bg-green-100 text-green-700 p-3 rounded-md shadow-sm">
                    {flash.success}
                </div>
            )}

            <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold">
                                Judul
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                Penulis
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                Kategori
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                Stok
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.data.length > 0 ? (
                            books.data.map((book) => (
                                <tr
                                    key={book.id}
                                    className="border-b last:border-none hover:bg-gray-50"
                                >
                                    <td className="px-4 py-2">{book.title}</td>
                                    <td className="px-4 py-2">
                                        {book.author || "-"}
                                    </td>
                                    <td className="px-4 py-2">
                                        {book.category?.name || "-"}
                                    </td>
                                    <td className="px-4 py-2">
                                        {book.available_copies > 0 ? (
                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                                {book.available_copies}/
                                                {book.total_copies} tersedia
                                            </span>
                                        ) : (
                                            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                                                Stok habis
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 space-x-2">
                                        <Link
                                            href={route(
                                                "admin.books.edit",
                                                book.id
                                            )}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route(
                                                "admin.books.destroy",
                                                book.id
                                            )}
                                            className="text-red-600 hover:underline"
                                        >
                                            Hapus
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center text-gray-500 py-6 italic"
                                >
                                    Belum ada data buku.
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
