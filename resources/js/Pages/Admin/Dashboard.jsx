import { Link } from "@inertiajs/react";
import AdminLayout from "./AdminLayout";

export default function Dashboard({ auth, stats }) {
    const summary = [
        {
            title: "Total Buku",
            value: stats.books,
            color: "bg-blue-100 text-blue-700",
            icon: "📚",
        },
        {
            title: "Total Member",
            value: stats.members,
            color: "bg-green-100 text-green-700",
            icon: "👥",
        },
        {
            title: "Peminjaman Aktif",
            value: stats.borrowings,
            color: "bg-amber-100 text-amber-700",
            icon: "📦",
        },
        {
            title: "Total Denda",
            value: `Rp ${Number(stats.fines).toLocaleString("id-ID")}`,
            color: "bg-rose-100 text-rose-700",
            icon: "💰",
        },
    ];

    const menus = [
        {
            title: "📚 Kelola Buku",
            desc: "Tambah, ubah, dan hapus data buku.",
            href: route("admin.books.index"),
            color: "from-blue-500 to-indigo-500",
        },
        {
            title: "🏷️ Kelola Kategori",
            desc: "Atur kategori buku agar rapi.",
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
            desc: "Ubah konfigurasi sistem & limit.",
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

            {/* Statistik Cards */}
            <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {summary.map((item, i) => (
                    <div
                        key={i}
                        className={`p-6 rounded-2xl shadow-sm ${item.color} border border-white/40`}
                    >
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-2xl font-bold">{item.value}</p>
                    </div>
                ))}
            </section>

            {/* Navigation Cards */}
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
