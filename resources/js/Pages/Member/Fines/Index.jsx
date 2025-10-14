import { Link, usePage } from "@inertiajs/react";
import MemberLayout from "../MemberLayout";

export default function Index({ fines }) {
    const { flash } = usePage().props;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col space-y-1">
                <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                    Denda Buku
                </h1>
                <p className="text-neutral-500 text-sm">
                    Lihat daftar denda dari peminjaman buku kamu.
                </p>
            </div>

            {/* Flash Messages */}
            {flash.success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg shadow-sm text-sm">
                    {flash.success}
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
                                Tanggal Kembali
                            </th>
                            <th className="px-5 py-3 text-left font-semibold">
                                Jumlah Denda
                            </th>
                            <th className="px-5 py-3 text-left font-semibold">
                                Status
                            </th>
                            <th className="px-5 py-3 text-left font-semibold">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fines.data.length > 0 ? (
                            fines.data.map((fine) => (
                                <tr
                                    key={fine.id}
                                    className="border-b last:border-none hover:bg-neutral-50 transition-all"
                                >
                                    <td className="px-5 py-3 font-medium text-neutral-900">
                                        {fine.book?.title || "—"}
                                    </td>
                                    <td className="px-5 py-3 text-neutral-500">
                                        {fine.return_date
                                            ? new Date(
                                                  fine.return_date
                                              ).toLocaleDateString("id-ID")
                                            : "—"}
                                    </td>
                                    <td className="px-5 py-3 font-semibold text-rose-600">
                                        Rp{" "}
                                        {fine.fine_amount.toLocaleString(
                                            "id-ID"
                                        )}
                                    </td>
                                    <td className="px-5 py-3">
                                        {fine.is_fine_paid ? (
                                            <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-medium">
                                                Sudah Dibayar
                                            </span>
                                        ) : (
                                            <span className="bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full text-xs font-medium">
                                                Belum Dibayar
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3">
                                        {!fine.is_fine_paid && (
                                            <Link
                                                href={route(
                                                    "member.fines.markPaid",
                                                    fine.id
                                                )}
                                                method="post"
                                                as="button"
                                                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md shadow-sm transition active:scale-[0.98]"
                                            >
                                                Tandai Dibayar
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-10 text-neutral-500 italic"
                                >
                                    Tidak ada denda saat ini.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {fines.links && fines.links.length > 1 && (
                <div className="flex justify-center gap-2 pt-4">
                    {fines.links.map((link, i) => (
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
