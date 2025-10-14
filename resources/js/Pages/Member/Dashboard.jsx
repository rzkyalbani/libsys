import { Link } from "@inertiajs/react";
import MemberLayout from "./MemberLayout";

export default function Dashboard({ auth }) {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">
                        Halo, {auth.user.name}! 👋
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Selamat datang di LibSys Member Dashboard
                    </p>
                </div>
            </div>

            {/* Quick Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <Link
                    href={route("member.profile.edit")}
                    className="block bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all border border-gray-100"
                >
                    <h2 className="text-xl font-semibold mb-2">
                        👤 Edit Profil
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Ubah nama, email, atau password akun kamu.
                    </p>
                </Link>

                <Link
                    href={route("member.books.index")}
                    className="block bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all border border-gray-100"
                >
                    <h2 className="text-xl font-semibold mb-2">
                        📚 Katalog Buku
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Lihat dan cari buku yang tersedia untuk dipinjam.
                    </p>
                </Link>

                <Link
                    href="#"
                    className="block bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all border border-gray-100"
                >
                    <h2 className="text-xl font-semibold mb-2">
                        🕓 Riwayat Peminjaman
                    </h2>
                    <p className="text-gray -600 text-sm">
                        Lihat daftar buku yang sudah dan sedang kamu pinjam.
                    </p>
                </Link>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <MemberLayout>{page}</MemberLayout>;
