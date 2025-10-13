import { Link, usePage } from "@inertiajs/react";

export default function Index({ categories }) {
    const { flash } = usePage().props;
    console.log(usePage().props);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Kategori Buku</h1>

            {flash.success && <p className="text-green-600">{flash.success}</p>}

            <Link
                href={route("admin.categories.create")}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Tambah Kategori
            </Link>

            <table className="min-w-full mt-4 border">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2">Nama</th>
                        <th className="px-4 py-2">Deskripsi</th>
                        <th className="px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.data.map((cat) => (
                        <tr key={cat.id} className="border-t">
                            <td className="px-4 py-2">{cat.name}</td>
                            <td className="px-4 py-2">{cat.description}</td>
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
                    ))}
                </tbody>
            </table>
        </div>
    );
}
