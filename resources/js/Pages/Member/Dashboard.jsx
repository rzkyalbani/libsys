import { Link } from "@inertiajs/react";
import MemberLayout from "./MemberLayout";

export default function Dashboard({ auth }) {
    const quickLinks = [
        {
            title: "Edit Profil",
            desc: "Ubah nama, email, atau password akun kamu.",
            href: route("member.profile.edit"),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
            ),
        },
        {
            title: "Katalog Buku",
            desc: "Lihat dan cari buku yang tersedia untuk dipinjam.",
            href: route("member.books.index"),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
            ),
        },
        {
            title: "Riwayat Peminjaman",
            desc: "Lihat daftar buku yang sudah dan sedang kamu pinjam.",
            href: route("member.borrowings.index"),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
            ),
        },
        {
            title: "Reservasi Saya",
            desc: "Cek daftar buku yang kamu pesan dan tunggu ketersediaannya.",
            href: route("member.reservations.index"),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
            ),
        },
    ];

    return (
        <div className="main-container py-8">
            {/* Header */}
            <header className="page-header">
                <h1 className="page-title">
                    Halo, {auth.user.name}
                </h1>
                <p className="page-subtitle">
                    Selamat datang di dashboard member LibSys.
                </p>
            </header>

            {/* Quick Navigation */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {quickLinks.map((link, i) => (
                    <Link
                        key={i}
                        href={link.href}
                        className="card p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
                    >
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            {link.icon}
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-900 mb-1">
                                {link.title}
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {link.desc}
                            </p>
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    );
}

Dashboard.layout = (page) => <MemberLayout>{page}</MemberLayout>;
