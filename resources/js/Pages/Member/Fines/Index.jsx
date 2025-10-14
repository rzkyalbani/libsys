import { Link, usePage } from "@inertiajs/react";
import MemberLayout from "../MemberLayout";

export default function Index({ fines }) {
    const { flash } = usePage().props;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">
                    💰 Denda Saya
                </h1>
            </div>

            {/* Flash message */}
            {flash.success && (
                <div className="bg-green-100 text-green-700 p-3 rounded-md shadow-sm">
                    {flash.success}
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
                <table className="min-w-full text-left">
                    <thead className="bg-gray-50 border-b text-sm text-gray-600 uppercase">
                        <tr>
                            <th className="px-4 py-3">Judul Buku</th>
                            <th className="px-4 py-3">Tanggal Kembali</th>
                            <th className="px-4 py-3">Jumlah Denda</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {fines.data.length > 0 ? (
                            fines.data.map((fine) => (
                                <tr
                                    key={fine.id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {fine.book?.title || "—"}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {fine.return_date
                                            ? new Date(
                                                  fine.return_date
                                              ).toLocaleDateString("id-ID")
                                            : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-red-600 font-semibold">
                                        Rp{" "}
                                        {fine.fine_amount.toLocaleString(
                                            "id-ID"
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {fine.is_fine_paid ? (
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                                Sudah Dibayar
                                            </span>
                                        ) : (
                                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                                                Belum Dibayar
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {!fine.is_fine_paid && (
                                            <Link
                                                href={route(
                                                    "member.fines.markPaid",
                                                    fine.id
                                                )}
                                                method="post"
                                                as="button"
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm transition"
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
                                    colSpan="5"
                                    className="text-center py-6 text-gray-500"
                                >
                                    Tidak ada denda saat ini 🎉
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {fines.links && fines.links.length > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    {fines.links.map((link, i) => (
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

Index.layout = (page) => <MemberLayout>{page}</MemberLayout>;
