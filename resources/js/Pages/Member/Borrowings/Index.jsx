import { Link, usePage } from "@inertiajs/react";
import MemberLayout from "../MemberLayout";

export default function Index({ borrowings }) {
    const { flash } = usePage().props;

    const statusBadge = (status) => {
        const map = {
            requested: "bg-amber-50 text-amber-700",
            borrowed: "bg-blue-50 text-blue-700",
            returned: "bg-emerald-50 text-emerald-700",
            cancelled: "bg-rose-50 text-rose-700",
        };
        return (
            <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    map[status] || "bg-neutral-100 text-neutral-600"
                }`}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col space-y-1">
                <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                    Riwayat Peminjaman
                </h1>
                <p className="text-neutral-500 text-sm">
                    Semua aktivitas peminjaman buku kamu.
                </p>
            </div>

            {/* Flash messages */}
            {flash.success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg shadow-sm text-sm">
                    {flash.success}
                </div>
            )}
            {flash.error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg shadow-sm text-sm">
                    {flash.error}
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-x-auto">
                <table className="min-w-full text-sm text-neutral-700">
                    <thead className="bg-neutral-50 border-b">
                        <tr>
                            <th className="px-5 py-3 text-left font-semibold">
                                Judul Buku
                            </th>
                            <th className="px-5 py-3 text-left font-semibold">
                                Tanggal Pinjam
                            </th>
                            <th className="px-5 py-3 text-left font-semibold">
                                Jatuh Tempo
                            </th>
                            <th className="px-5 py-3 text-left font-semibold">
                                Tanggal Kembali
                            </th>
                            <th className="px-5 py-3 text-left font-semibold">
                                Status
                            </th>
                            <th className="px-5 py-3 text-left font-semibold">
                                Denda
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowings.data.length > 0 ? (
                            borrowings.data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b last:border-none hover:bg-neutral-50 transition-all"
                                >
                                    <td className="px-5 py-3 font-medium text-neutral-900">
                                        {item.book?.title || "—"}
                                    </td>
                                    <td className="px-5 py-3 text-neutral-500">
                                        {item.borrow_date
                                            ? new Date(
                                                  item.borrow_date
                                              ).toLocaleDateString("id-ID")
                                            : "—"}
                                    </td>
                                    <td className="px-5 py-3 text-neutral-500">
                                        {item.due_date
                                            ? new Date(
                                                  item.due_date
                                              ).toLocaleDateString("id-ID")
                                            : "—"}
                                    </td>
                                    <td className="px-5 py-3 text-neutral-500">
                                        {item.return_date
                                            ? new Date(
                                                  item.return_date
                                              ).toLocaleDateString("id-ID")
                                            : "—"}
                                    </td>
                                    <td className="px-5 py-3">
                                        {statusBadge(item.status)}
                                    </td>
                                    <td className="px-5 py-3">
                                        {item.fine_amount > 0 ? (
                                            <div className="flex flex-col">
                                                <span className="text-rose-600 font-semibold">
                                                    Rp{" "}
                                                    {item.fine_amount.toLocaleString(
                                                        "id-ID"
                                                    )}
                                                </span>
                                                <span
                                                    className={`text-xs font-medium mt-1 ${
                                                        item.is_fine_paid
                                                            ? "text-emerald-600"
                                                            : "text-rose-600"
                                                    }`}
                                                >
                                                    {item.is_fine_paid
                                                        ? "Sudah dibayar"
                                                        : "Belum dibayar"}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-neutral-400 text-sm">
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
                                    className="text-center py-10 text-neutral-500 italic"
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
                <div className="flex justify-center gap-2 pt-4">
                    {borrowings.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || "#"}
                            className={`px-3 py-1.5 rounded text-sm transition ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-neutral-200 hover:bg-neutral-300 text-neutral-700"
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
