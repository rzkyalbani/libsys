import { Link, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Index({ borrowings }) {
    const { flash } = usePage().props;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">📦 Manajemen Peminjaman</h1>

            {flash.success && (
                <div className="bg-green-100 text-green-700 p-2 rounded">
                    {flash.success}
                </div>
            )}

            <table className="min-w-full border text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Member</th>
                        <th className="p-2 border">Buku</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Tanggal Pinjam</th>
                        <th className="p-2 border">Jatuh Tempo</th>
                        <th className="p-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowings.map((b) => (
                        <tr key={b.id} className="border-t">
                            <td className="p-2 border">{b.user.name}</td>
                            <td className="p-2 border">{b.book.title}</td>
                            <td className="p-2 border">{b.status}</td>
                            <td className="p-2 border">
                                {b.borrow_date ?? "-"}
                            </td>
                            <td className="p-2 border">{b.due_date ?? "-"}</td>
                            <td className="p-2 border space-x-2">
                                {b.status === "requested" && (
                                    <Link
                                        method="patch"
                                        as="button"
                                        href={route(
                                            "admin.borrowings.update",
                                            b.id
                                        )}
                                        data={{ action: "approve" }}
                                        className="bg-blue-600 text-white px-3 py-1 rounded"
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
                                        className="bg-green-600 text-white px-3 py-1 rounded"
                                    >
                                        Return
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
