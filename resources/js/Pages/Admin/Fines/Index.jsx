import { Link, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Index({ borrowings }) {
    const { flash } = usePage().props;

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">
                    Manajemen Denda
                </h1>
            </div>

            {/* Flash messages */}
            {flash.success && (
                <div className="bg-green-100 text-green-700 p-3 rounded-md shadow-sm">
                    {flash.success}
                </div>
            )}
            {flash.error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md shadow-sm">
                    {flash.error}
                </div>
            )}

            <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3">Member</th>
                            <th className="px-4 py-3">Judul Buku</th>
                            <th className="px-4 py-3">Denda</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Tanggal Pembayaran</th>
                            <th className="px-4 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {borrowings.data.length > 0 ? (
                            borrowings.data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">
                                        {item.user?.name || "—"}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.book?.title || "—"}
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-red-600">
                                        Rp{" "}
                                        {item.fine_amount.toLocaleString(
                                            "id-ID"
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.is_fine_paid ? (
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                                Sudah Dibayar
                                            </span>
                                        ) : (
                                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                                                Belum Dibayar
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                        {item.fine_paid_at
                                            ? new Date(
                                                  item.fine_paid_at
                                              ).toLocaleDateString("id-ID", {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                              })
                                            : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {!item.is_fine_paid && (
                                            <Link
                                                href={route(
                                                    "admin.fines.markPaid",
                                                    item.id
                                                )}
                                                method="post"
                                                as="button"
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm transition"
                                            >
                                                Tandai Sudah Dibayar
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-6 text-gray-500"
                                >
                                    Tidak ada denda ditemukan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {borrowings.links && borrowings.links.length > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    {borrowings.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || "#"}
                            className={`px-3 py-1 rounded text-sm ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
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
