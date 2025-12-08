import { Link, usePage } from "@inertiajs/react";
import MemberLayout from "../MemberLayout";
import axios from "axios";

export default function Index({ borrowings }) {
    const { flash } = usePage().props;

    const statusBadge = (status) => {
        const statusMap = {
            requested: {
                text: "Menunggu",
                color: "bg-blue-100 text-blue-800"
            },
            borrowed: {
                text: "Dipinjam",
                color: "bg-blue-100 text-blue-800"
            },
            returned: {
                text: "Dikembalikan",
                color: "bg-emerald-100 text-emerald-800"
            },
            cancelled: {
                text: "Dibatalkan",
                color: "bg-rose-100 text-rose-800"
            }
        };
        const statusInfo = statusMap[status] || { text: status.charAt(0).toUpperCase() + status.slice(1), color: "bg-neutral-100 text-neutral-800" };
        return (
            <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
            >
                {statusInfo.text}
            </span>
        );
    };

    const handlePayment = async (borrowingId) => {
        try {
            const response = await axios.post(
                route("member.payments.pay", borrowingId)
            );

            if (response.data && response.data.redirect_url) {
                window.location.href = response.data.redirect_url;
            } else {
                alert("URL pembayaran tidak ditemukan di respons server.");
            }
        } catch (error) {
            console.error(
                "Gagal membuat invoice Xendit:",
                error.response || error
            );
            alert("Gagal memproses pembayaran. Silakan coba lagi.");
        }
    };

    return (
        <div className="bg-gradient-to-b from-[rgb(239,246,255)] to-white py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[rgb(23,23,23)] tracking-tight">
                        Aktivitas Peminjaman
                    </h1>
                    <p className="text-[rgb(115,115,115)] mt-2 max-w-2xl mx-auto">
                        Lacak buku yang sedang atau pernah Anda pinjam dari perpustakaan kami.
                        Kelola peminjaman Anda dengan mudah dan tetap teratur.
                    </p>
                </div>

                {/* Flash Success/Error */}
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

                {/* VA Info (Xendit) */}
                {flash.va && (
                    <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-4 rounded-lg shadow-sm text-sm space-y-1 max-w-6xl mx-auto">
                        <p className="font-semibold mb-1">
                            Detail Pembayaran:
                        </p>
                        <p>
                            <strong>Bank:</strong> {flash.va.bank}
                        </p>
                        <p>
                            <strong>No VA:</strong> {flash.va.account_number}
                        </p>
                        <p>
                            <strong>Jumlah:</strong> Rp{" "}
                            {Number(flash.va.amount).toLocaleString("id-ID")}
                        </p>
                        {flash.va.expiry_date && (
                            <p>
                                <strong>Berlaku hingga:</strong>{" "}
                                {new Date(flash.va.expiry_date).toLocaleString(
                                    "id-ID"
                                )}
                            </p>
                        )}
                        <p className="text-xs italic mt-1">
                            Silakan transfer sesuai nominal agar pembayaran otomatis
                            terverifikasi.
                        </p>
                    </div>
                )}

                {/* Table */}
                <div className="bg-white border border-[rgb(229,229,229)] rounded-xl shadow-sm overflow-x-auto max-w-6xl mx-auto">
                    <table className="min-w-full text-sm text-[rgb(31,41,55)]">
                        <thead className="bg-[rgb(249,250,251)] border-b">
                            <tr>
                                <th className="px-5 py-3 text-left font-semibold text-[rgb(31,41,55)]">
                                    Judul Buku
                                </th>
                                <th className="px-5 py-3 text-left font-semibold text-[rgb(31,41,55)]">
                                    Tanggal Pinjam
                                </th>
                                <th className="px-5 py-3 text-left font-semibold text-[rgb(31,41,55)]">
                                    Jatuh Tempo
                                </th>
                                <th className="px-5 py-3 text-left font-semibold text-[rgb(31,41,55)]">
                                    Tanggal Kembali
                                </th>
                                <th className="px-5 py-3 text-left font-semibold text-[rgb(31,41,55)]">
                                    Status
                                </th>
                                <th className="px-5 py-3 text-left font-semibold text-[rgb(31,41,55)]">
                                    Denda
                                </th>
                                <th className="px-5 py-3 text-left font-semibold text-[rgb(31,41,55)]">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrowings.data.length > 0 ? (
                                borrowings.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b last:border-none hover:bg-[rgb(249,250,251)] transition-all"
                                    >
                                        <td className="px-5 py-3 font-medium text-[rgb(17,24,39)]">
                                            {item.book?.title || "—"}
                                        </td>
                                        <td className="px-5 py-3 text-[rgb(107,114,128)]">
                                            {item.borrow_date
                                                ? new Date(
                                                      item.borrow_date
                                                  ).toLocaleDateString("id-ID")
                                                : "—"}
                                        </td>
                                        <td className="px-5 py-3 text-[rgb(107,114,128)]">
                                            {item.due_date
                                                ? new Date(
                                                      item.due_date
                                                  ).toLocaleDateString("id-ID")
                                                : "—"}
                                        </td>
                                        <td className="px-5 py-3 text-[rgb(107,114,128)]">
                                            {item.return_date
                                                ? new Date(
                                                      item.return_date
                                                  ).toLocaleDateString("id-ID")
                                                : "—"}
                                        </td>
                                        <td className="px-5 py-3">
                                            {statusBadge(item.status)}
                                        </td>

                                        {/* Denda */}
                                        <td className="px-5 py-3">
                                            {item.fine_amount > 0 ? (
                                                <div className="flex flex-col space-y-1">
                                                    <span className="text-rose-600 font-semibold">
                                                        Rp{" "}
                                                        {item.fine_amount.toLocaleString(
                                                            "id-ID"
                                                        )}
                                                    </span>
                                                    <span
                                                        className={`text-xs font-medium ${
                                                            item.is_fine_paid
                                                                ? "text-emerald-600"
                                                                : "text-rose-600"
                                                        }`}
                                                    >
                                                        {item.is_fine_paid
                                                            ? "Sudah dibayar"
                                                            : "Belum dibayar"}
                                                    </span>

                                                    {/* Tombol Bayar Denda */}
                                                    {!item.is_fine_paid &&
                                                        item.status ===
                                                            "returned" && (
                                                            <button
                                                                onClick={() =>
                                                                    handlePayment(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md mt-1 transition active:scale-[0.98]"
                                                            >
                                                                Bayar Denda
                                                            </button>
                                                        )}
                                                </div>
                                            ) : (
                                                <span className="text-[rgb(156,163,175)] text-sm">
                                                    Tidak ada denda
                                                </span>
                                            )}
                                        </td>

                                        {/* Aksi Umum */}
                                        <td className="px-5 py-3">
                                            {item.status === "requested" ? (
                                                <Link
                                                    as="button"
                                                    method="delete"
                                                    href={route(
                                                        "member.borrowings.cancel",
                                                        item.id
                                                    )}
                                                    onClick={(e) => {
                                                        if (
                                                            !confirm(
                                                                `Batalkan permintaan peminjaman untuk "${item.book.title}"?`
                                                            )
                                                        )
                                                            e.preventDefault();
                                                    }}
                                                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium rounded-lg transition active:scale-[0.97]"
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
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center py-10 text-[rgb(107,114,128)] italic"
                                    >
                                        <div className="flex flex-col items-center">
                                            <p className="text-5xl mb-3 text-[rgb(156,163,175)]">📋</p>
                                            <p className="text-lg font-medium text-[rgb(55,65,81)] mb-1">Belum ada riwayat peminjaman</p>
                                            <p className="text-sm">
                                                Mulailah perjalanan membaca Anda dengan meminjam buku dari katalog kami.
                                            </p>
                                            <Link
                                                href={route("member.books.index")}
                                                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition active:scale-[0.98]"
                                            >
                                                Jelajahi Katalog Buku
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {borrowings.links && borrowings.links.length > 1 && (
                    <div className="flex justify-center gap-2 pt-4 max-w-6xl mx-auto">
                        {borrowings.links.map((link, i) => (
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
