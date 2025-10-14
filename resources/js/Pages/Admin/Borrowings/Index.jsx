import { Link, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Index({ borrowings }) {
    const { flash } = usePage().props;

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">
                    📦 Manajemen Peminjaman
                </h1>
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
                                Member
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                Buku
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                Tanggal Pinjam
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                Jatuh Tempo
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowings.length > 0 ? (
                            borrowings.map((b) => (
                                <tr
                                    key={b.id}
                                    className="border-b last:border-none hover:bg-gray-50"
                                >
                                    <td className="px-4 py-2">{b.user.name}</td>
                                    <td className="px-4 py-2">
                                        {b.book.title}
                                    </td>
                                    <td className="px-4 py-2">{b.status}</td>
                                    <td className="px-4 py-2">
                                        {b.borrow_date ?? "-"}
                                    </td>
                                    <td className="px-4 py-2">
                                        {b.due_date ?? "-"}
                                    </td>
                                    <td className="px-4 py-2 space-x-2">
                                        {b.status === "requested" && (
                                            <Link
                                                method="patch"
                                                as="button"
                                                href={route(
                                                    "admin.borrowings.update",
                                                    b.id
                                                )}
                                                data={{ action: "approve" }}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition"
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
                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition"
                                            >
                                                Return
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center text-gray-500 py-6 italic"
                                >
                                    Belum ada data peminjaman.
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
