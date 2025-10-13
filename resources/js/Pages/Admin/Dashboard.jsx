import { Link } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">
                        Selamat Datang, {auth.user.name}! 👋
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Anda masuk sebagai{" "}
                        <span className="font-semibold text-blue-600">
                            {auth.user.role}
                        </span>
                    </p>
                </div>

                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
                >
                    Logout
                </Link>
            </div>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                <Link
                    href={route("admin.books.index")}
                    className="block bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all border border-gray-100"
                >
                    <h2 className="text-xl font-semibold mb-2">
                        📚 Kelola Buku
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Tambah, ubah, dan hapus data buku di perpustakaan.
                    </p>
                </Link>

                <Link
                    href={route("admin.categories.index")}
                    className="block bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all border border-gray-100"
                >
                    <h2 className="text-xl font-semibold mb-2">
                        🏷️ Kelola Kategori
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Atur kategori buku agar lebih mudah dikelompokkan.
                    </p>
                </Link>

                {/* <Link
                    href={route("admin.settings.index")}
                    className="block bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all border border-gray-100"
                >
                    <h2 className="text-xl font-semibold mb-2">
                        ⚙️ Pengaturan Sistem
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Ubah konfigurasi seperti tarif denda dan batas pinjam.
                    </p>
                </Link> */}
            </div>
        </div>
    );
}
