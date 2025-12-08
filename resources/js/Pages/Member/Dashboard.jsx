import { Link } from "@inertiajs/react";
import MemberLayout from "./MemberLayout";

export default function Dashboard({ auth }) {
    const quickLinks = [
        {
            title: "Profil Anggota",
            desc: "Kelola informasi akun dan preferensi Anda.",
            href: route("member.profile.edit"),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
            ),
        },
        {
            title: "Katalog Buku",
            desc: "Jelajahi koleksi buku yang tersedia untuk Anda.",
            href: route("member.books.index"),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
            ),
        },
        {
            title: "Aktivitas Saya",
            desc: "Lihat buku yang sedang dan pernah Anda pinjam.",
            href: route("member.borrowings.index"),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
            ),
        },
        {
            title: "Daftar Tunggu",
            desc: "Lihat buku yang Anda pesan dan ketersediaannya.",
            href: route("member.reservations.index"),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
            ),
        },
    ];

    return (
        <div className="bg-gradient-to-b from-[rgb(239,246,255)] to-white py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-[rgb(23,23,23)] tracking-tight">
                        Selamat Datang, {auth.user.name}
                    </h1>
                    <p className="text-[rgb(115,115,115)] mt-2 max-w-2xl mx-auto">
                        Temukan pengetahuan, inspirasi, dan koneksi melalui koleksi perpustakaan kami.
                        Akses buku, sumber daya digital, dan layanan yang mendukung perjalanan pembelajaran Anda.
                    </p>
                </header>

                {/* Quick Navigation */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {quickLinks.map((link, i) => (
                        <Link
                            key={i}
                            href={link.href}
                            className="bg-white border border-[rgb(229,229,229)] rounded-xl p-6 hover:shadow-md transition-all duration-200 flex items-start gap-4"
                        >
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                                {link.icon}
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-[rgb(23,23,23)] mb-1">
                                    {link.title}
                                </h2>
                                <p className="text-[rgb(115,115,115)] text-sm leading-relaxed">
                                    {link.desc}
                                </p>
                            </div>
                        </Link>
                    ))}
                </section>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <MemberLayout>{page}</MemberLayout>;
