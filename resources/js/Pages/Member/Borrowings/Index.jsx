import { Link, usePage } from "@inertiajs/react";
import MemberLayout from "../MemberLayout";

export default function Index({ borrowings }) {
    const { flash } = usePage().props;

    // Warna status biar konsisten dan enak dibaca
    const statusBadge = (status) => {
        const colorMap = {
            requested: "bg-yellow-100 text-yellow-700",
            borrowed: "bg-blue-100 text-blue-700",
            returned: "bg-green-100 text-green-700",
            cancelled: "bg-red-100 text-red-700",
        };
        return (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                    colorMap[status] || "bg-gray-100 text-gray-600"
                }`}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">
                    🔄 Riwayat Peminjaman
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

            {/* Table */}
            <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
                <table className="min-w-full text-left">
                    <thead className="bg-gray-50 border-b text-sm text-gray-600 uppercase">
                        <tr>
                            <th className="px-4 py-3">Judul Buku</th>
                            <th className="px-4 py-3">Tanggal Pinjam</th>
                            <th className="px-4 py-3">Jatuh Tempo</th>
                            <th className="px-4 py-3">Tanggal Kembali</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Denda</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {borrowings.data.length > 0 ? (
                            borrowings.data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {item.book?.title || "—"}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {item.borrow_date
                                            ? new Date(
                                                  item.borrow_date
                                              ).toLocaleDateString("id-ID")
                                            : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {item.due_date
                                            ? new Date(
                                                  item.due_date
                                              ).toLocaleDateString("id-ID")
                                            : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {item.return_date
                                            ? new Date(
                                                  item.return_date
                                              ).toLocaleDateString("id-ID")
                                            : "—"}
                                    </td>
                                    <td className="px-4 py-3">
                                        {statusBadge(item.status)}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        {item.fine_amount > 0 ? (
                                            <div className="flex flex-col">
                                                <span className="text-red-600 font-semibold">
                                                    Rp{" "}
                                                    {item.fine_amount.toLocaleString(
                                                        "id-ID"
                                                    )}
                                                </span>
                                                <span
                                                    className={`text-xs font-medium mt-1 ${
                                                        item.is_fine_paid
                                                            ? "text-green-600"
                                                            : "text-red-500"
                                                    }`}
                                                >
                                                    {item.is_fine_paid
                                                        ? "Sudah dibayar"
                                                        : "Belum dibayar"}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-gray-500 text-sm">
                                                Tidak ada denda
                                            </span>
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
                                    Tidak ada riwayat peminjaman.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
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

Index.layout = (page) => <MemberLayout>{page}</MemberLayout>;
