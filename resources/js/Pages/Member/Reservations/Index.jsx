import { Link, usePage } from "@inertiajs/react";
import MemberLayout from "../MemberLayout";

export default function Index({ reservations }) {
    const { flash } = usePage().props;

    return (
        <div className="bg-gradient-to-b from-[rgb(239,246,255)] to-white py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[rgb(23,23,23)] tracking-tight">
                        Daftar Tunggu Buku
                    </h1>
                    <p className="text-[rgb(115,115,115)] mt-2 max-w-2xl mx-auto">
                        Lacak buku-buku yang Anda pesan dan ketersediaannya.
                        Kami akan memberi tahu Anda saat buku yang Anda tunggu siap untuk dipinjam.
                    </p>
                </div>

                {/* Flash Messages */}
                {flash.success && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg shadow-sm text-sm max-w-6xl mx-auto">
                        {flash.success}
                    </div>
                )}
                {flash.error && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg shadow-sm text-sm max-w-6xl mx-auto">
                        {flash.error}
                    </div>
                )}

                {/* Empty State */}
                {reservations.data.length === 0 ? (
                    <div className="text-[rgb(107,114,128)] italic py-20 text-center max-w-6xl mx-auto">
                        <div className="flex flex-col items-center">
                            <p className="text-5xl mb-3 text-[rgb(156,163,175)]">🔍</p>
                            <p className="text-lg font-medium text-[rgb(55,65,81)] mb-1">Belum ada daftar tunggu</p>
                            <p className="text-sm mb-4">
                                Mulailah dengan memesan buku yang sedang Anda cari.
                            </p>
                            <Link
                                href={route("member.books.index")}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition active:scale-[0.98]"
                            >
                                Jelajahi Katalog Buku
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white border border-[rgb(229,229,229)] rounded-xl shadow-sm overflow-x-auto max-w-6xl mx-auto">
                        <table className="min-w-full text-sm text-[rgb(31,41,55)]">
                            <thead className="bg-[rgb(249,250,251)] border-b">
                                <tr>
                                    <th className="px-5 py-3 text-left font-semibold text-[rgb(31,41,55)]">
                                        Judul Buku
                                    </th>
                                    <th className="px-5 py-3 text-left font-semibold text-[rgb(31,41,55)]">
                                        Tanggal Pemesanan
                                    </th>
                                    <th className="px-5 py-3 text-left font-semibold text-[rgb(31,41,55)]">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 text-left font-semibold text-[rgb(31,41,55)]">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.data.map((r) => (
                                    <tr
                                        key={r.id}
                                        className="border-b last:border-none hover:bg-[rgb(249,250,251)] transition-all"
                                    >
                                        <td className="px-5 py-3 font-medium text-[rgb(17,24,39)]">
                                            {r.book.title}
                                        </td>
                                        <td className="px-5 py-3 text-[rgb(107,114,128)]">
                                            {new Date(
                                                r.created_at
                                            ).toLocaleDateString("id-ID")}
                                        </td>
                                        <td className="px-5 py-3">
                                            {r.status === "waiting" ? (
                                                <span className="text-blue-700 font-medium bg-blue-50 px-2 py-1 rounded-full text-xs">
                                                    Menunggu
                                                </span>
                                            ) : r.status === "notified" ? (
                                                <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-1 rounded-full text-xs">
                                                    Siap Dipinjam
                                                </span>
                                            ) : r.status === "cancelled" ? (
                                                <span className="text-rose-600 font-medium bg-rose-50 px-2 py-1 rounded-full text-xs">
                                                    Dibatalkan
                                                </span>
                                            ) : (
                                                <span className="text-[rgb(55,65,81)] bg-[rgb(249,250,251)] px-2 py-1 rounded-full text-xs font-medium">
                                                    Diproses
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-5 py-3">
                                            {["waiting", "notified"].includes(
                                                r.status
                                            ) ? (
                                                <Link
                                                    as="button"
                                                    method="delete"
                                                    href={route(
                                                        "member.reservations.destroy",
                                                        r.id
                                                    )}
                                                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium rounded-lg transition active:scale-[0.97]"
                                                    onClick={(e) => {
                                                        if (
                                                            !confirm(
                                                                `Batalkan pemesanan untuk "${r.book.title}"?`
                                                            )
                                                        )
                                                            e.preventDefault();
                                                    }}
                                                >
                                                    Batalkan
                                                </Link>
                                            ) : (
                                                <span className="text-[rgb(156,163,175)] text-xs italic">
                                                    Tidak dapat dibatalkan
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {reservations.links && reservations.data.length > 0 && (
                    <div className="flex justify-center gap-2 pt-6 max-w-6xl mx-auto">
                        {reservations.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || "#"}
                                className={`px-3 py-1.5 rounded text-sm transition ${
                                    link.active
                                        ? "bg-blue-600 text-white"
                                        : link.url
                                        ? "bg-white border border-[rgb(229,229,229)] text-[rgb(31,41,55)] hover:bg-[rgb(249,250,251)]"
                                        : "bg-[rgb(249,250,251)] text-[rgb(156,163,175)] cursor-not-allowed"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

Index.layout = (page) => <MemberLayout>{page}</MemberLayout>;
