import { Link } from "@inertiajs/react";
import AdminLayout from "./AdminLayout";

export default function Dashboard({ auth }) {
    const menus = [
        {
            title: "📚 Kelola Buku",
            desc: "Tambah, ubah, dan hapus data buku di perpustakaan.",
            href: route("admin.books.index"),
            color: "from-blue-500 to-indigo-500",
        },
        {
            title: "🏷️ Kelola Kategori",
            desc: "Atur kategori buku agar lebih mudah dikelompokkan.",
            href: route("admin.categories.index"),
            color: "from-emerald-500 to-green-500",
        },
        {
            title: "🧑 Kelola Member",
            desc: "Manajemen member perpustakaan.",
            href: route("admin.members.index"),
            color: "from-pink-500 to-rose-500",
        },
        {
            title: "⚙️ Pengaturan Sistem",
            desc: "Ubah konfigurasi seperti tarif denda dan batas pinjam.",
            href: route("admin.settings.index"),
            color: "from-amber-500 to-orange-500",
        },
    ];

    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <header>
                <h1 className="text-3xl font-bold text-gray-800">
                    Selamat Datang, {auth.user.name}! 👋
                </h1>
                <p className="text-gray-500 mt-1">
                    Anda masuk sebagai{" "}
                    <span className="font-semibold text-blue-600">
                        {auth.user.role}
                    </span>
                </p>
            </header>

            {/* Cards */}
            <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {menus.map((item, i) => (
                    <Link
                        key={i}
                        href={item.href}
                        className={`block bg-gradient-to-br ${item.color} text-white p-6 rounded-2xl shadow-lg hover:scale-[1.02] hover:shadow-xl transition-transform duration-200`}
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            {item.title}
                        </h2>
                        <p className="text-sm opacity-90">{item.desc}</p>
                    </Link>
                ))}
            </section>
        </div>
    );
}

Dashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;
