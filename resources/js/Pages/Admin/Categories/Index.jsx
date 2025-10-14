import { Link, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Index({ categories }) {
    const { flash } = usePage().props;

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">
                    🏷️ Kategori Buku
                </h1>
                <Link
                    href={route("admin.categories.create")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                    + Tambah Kategori
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
                                Nama
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                Deskripsi
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.data.length > 0 ? (
                            categories.data.map((cat) => (
                                <tr
                                    key={cat.id}
                                    className="border-b last:border-none hover:bg-gray-50"
                                >
                                    <td className="px-4 py-2">{cat.name}</td>
                                    <td className="px-4 py-2">
                                        {cat.description}
                                    </td>
                                    <td className="px-4 py-2 space-x-2">
                                        <Link
                                            href={route(
                                                "admin.categories.edit",
                                                cat.id
                                            )}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route(
                                                "admin.categories.destroy",
                                                cat.id
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
                                    colSpan="3"
                                    className="text-center text-gray-500 py-6 italic"
                                >
                                    Belum ada kategori.
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
