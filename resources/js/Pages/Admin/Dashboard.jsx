import { Link } from "@inertiajs/react";
import AdminLayout from "./AdminLayout";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function Dashboard({ auth, stats, actionableStats, chartData }) {
    const summary = [
        {
            title: "Total Buku",
            value: stats.books,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
            ),
            color: "text-blue-600 bg-blue-50",
        },
        {
            title: "Total Member",
            value: stats.members,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
            ),
            color: "text-emerald-600 bg-emerald-50",
        },
        {
            title: "Peminjaman Aktif",
            value: stats.borrowings,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
            ),
            color: "text-amber-600 bg-amber-50",
        },
        {
            title: "Total Denda",
            value: `Rp ${Number(stats.fines).toLocaleString("id-ID")}`,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            ),
            color: "text-rose-600 bg-rose-50",
        },
    ];

    const menus = [
        {
            title: "Kelola Buku",
            desc: "Tambah, ubah, dan hapus data buku.",
            href: route("admin.books.index"),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
            ),
        },
        {
            title: "Kelola Kategori",
            desc: "Atur kategori buku agar rapi.",
            href: route("admin.categories.index"),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
            ),
        },
        {
            title: "Kelola Member",
            desc: "Manajemen member perpustakaan.",
            href: route("admin.members.index"),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
            ),
        },
        {
            title: "Pengaturan Sistem",
            desc: "Ubah konfigurasi sistem & limit.",
            href: route("admin.settings.index"),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
            ),
        },
    ];

    return (
        <div className="main-container py-8">
            {/* Header */}
            <header className="page-header">
                <h1 className="page-title">
                    Selamat Datang, {auth.user.name}
                </h1>
                <p className="page-subtitle">
                    Anda masuk sebagai{" "}
                    <span className="font-medium text-blue-600">
                        {auth.user.role}
                    </span>
                </p>
            </header>

            {/* Actionable Items Section - Things that need attention */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Perlu Ditindaklanjuti Hari Ini</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        href={route('admin.borrowings.index')}
                        className={`card p-4 flex flex-col items-center text-center ${
                            actionableStats.pendingBorrowings > 0
                                ? 'border-red-200 bg-red-50 border-2'
                                : 'border-gray-200'
                        }`}
                    >
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <h3 className="font-medium text-gray-900">Peminjaman Menunggu</h3>
                        <p className={`text-2xl font-bold ${actionableStats.pendingBorrowings > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                            {actionableStats.pendingBorrowings}
                        </p>
                    </Link>

                    <Link
                        href={route('admin.borrowings.index')}
                        className={`card p-4 flex flex-col items-center text-center ${
                            actionableStats.overdueBorrowings > 0
                                ? 'border-amber-200 bg-amber-50 border-2'
                                : 'border-gray-200'
                        }`}
                    >
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="font-medium text-gray-900">Peminjaman Terlambat</h3>
                        <p className={`text-2xl font-bold ${actionableStats.overdueBorrowings > 0 ? 'text-amber-600' : 'text-gray-600'}`}>
                            {actionableStats.overdueBorrowings}
                        </p>
                    </Link>

                    <Link
                        href={route('admin.fines.index')}
                        className={`card p-4 flex flex-col items-center text-center ${
                            actionableStats.unpaidFines > 0
                                ? 'border-rose-200 bg-rose-50 border-2'
                                : 'border-gray-200'
                        }`}
                    >
                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center mb-2">
                            <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="font-medium text-gray-900">Denda Belum Dibayar</h3>
                        <p className={`text-2xl font-bold ${actionableStats.unpaidFines > 0 ? 'text-rose-600' : 'text-gray-600'}`}>
                            {actionableStats.unpaidFines}
                        </p>
                    </Link>

                    <Link
                        href={route('admin.books.index')}
                        className={`card p-4 flex flex-col items-center text-center ${
                            actionableStats.criticalStockBooks > 0
                                ? 'border-blue-200 bg-blue-50 border-2'
                                : 'border-gray-200'
                        }`}
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                        </div>
                        <h3 className="font-medium text-gray-900">Buku Stok Kritis</h3>
                        <p className={`text-2xl font-bold ${actionableStats.criticalStockBooks > 0 ? 'text-blue-600' : 'text-gray-600'}`}>
                            {actionableStats.criticalStockBooks}
                        </p>
                    </Link>
                </div>
            </section>

            {/* General Stats Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {summary.map((item, i) => (
                    <div
                        key={i}
                        className="card p-5 flex items-center gap-4"
                    >
                        <div className={`p-3 rounded-lg ${item.color}`}>
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">
                                {item.title}
                            </h3>
                            <p className="text-2xl font-bold text-gray-900">
                                {item.value}
                            </p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Grafik Aktivitas Bulanan */}
            <section className="card p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Aktivitas Peminjaman per Bulan
                </h2>

                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e5e7eb"
                            />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis allowDecimals={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    border: "1px solid #e5e7eb",
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#2563eb"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                        <div className="text-5xl mb-3">📊</div>
                        <p className="text-sm">
                            Belum ada data peminjaman untuk ditampilkan.
                        </p>
                    </div>
                )}
            </section>

            {/* Navigation Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {menus.map((item, i) => (
                    <Link
                        key={i}
                        href={item.href}
                        className="card p-5 flex flex-col items-start gap-4 hover:shadow-md transition-shadow"
                    >
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            {item.icon}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-1">
                                {item.title}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {item.desc}
                            </p>
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    );
}

Dashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;
    