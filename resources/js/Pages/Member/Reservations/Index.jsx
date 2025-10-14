import { Link, usePage } from "@inertiajs/react";
import MemberLayout from "../MemberLayout";

export default function Index({ reservations }) {
    const { flash } = usePage().props;

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">
                    📑 Reservasi Saya
                </h1>
            </div>

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

            {reservations.length === 0 ? (
                <p className="text-gray-600">Belum ada reservasi aktif.</p>
            ) : (
                <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold">
                                    Judul Buku
                                </th>
                                <th className="px-4 py-3 text-left font-semibold">
                                    Tanggal Reservasi
                                </th>
                                <th className="px-4 py-3 text-left font-semibold">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left font-semibold">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((r) => (
                                <tr
                                    key={r.id}
                                    className="border-b last:border-none hover:bg-gray-50"
                                >
                                    <td className="px-4 py-2">
                                        {r.book.title}
                                    </td>
                                    <td className="px-4 py-2 text-gray-600">
                                        {new Date(
                                            r.created_at
                                        ).toLocaleDateString("id-ID")}
                                    </td>
                                    <td className="px-4 py-2">
                                        {r.status === "waiting" ? (
                                            <span className="text-yellow-600 font-medium">
                                                Menunggu
                                            </span>
                                        ) : (
                                            <span className="text-green-600 font-medium">
                                                Tersedia
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {r.status === "waiting" && (
                                            <Link
                                                as="button"
                                                method="delete"
                                                href={route(
                                                    "member.reservations.destroy",
                                                    r.id
                                                )}
                                                className="text-red-600 hover:underline"
                                            >
                                                Batalkan
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => <MemberLayout>{page}</MemberLayout>;
