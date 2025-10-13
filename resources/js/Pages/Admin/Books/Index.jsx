import { Link, usePage } from "@inertiajs/react";

export default function Index({ books }) {
    const { flash } = usePage().props;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Daftar Buku</h1>

            {flash.success && (
                <p className="text-green-600 mb-4">{flash.success}</p>
            )}

            <Link
                href={route("admin.books.create")}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Tambah Buku
            </Link>

            <table className="min-w-full mt-4 border">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2">Judul</th>
                        <th className="px-4 py-2">Penulis</th>
                        <th className="px-4 py-2">Kategori</th>
                        <th className="px-4 py-2">Stok</th>
                        <th className="px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {books.data.map((book) => (
                        <tr key={book.id} className="border-t">
                            <td className="px-4 py-2">{book.title}</td>
                            <td className="px-4 py-2">{book.author || "-"}</td>
                            <td className="px-4 py-2">
                                {book.category?.name || "-"}
                            </td>
                            <td className="px-4 py-2">
                                {book.available_copies}/{book.total_copies}
                            </td>
                            <td className="px-4 py-2 space-x-2">
                                <Link
                                    href={route("admin.books.edit", book.id)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>
                                <Link
                                    as="button"
                                    method="delete"
                                    href={route("admin.books.destroy", book.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Hapus
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
