import { Link } from "@inertiajs/react";

export default function PublicLanding({ canLogin, canRegister }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[rgb(239,246,255)] to-white text-[rgb(23,23,23)] flex flex-col">
            {/* Navbar */}
            <header className="w-full border-b border-[rgb(229,229,229)] bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                            </svg>
                        </div>
                        <h1 className="text-lg font-semibold tracking-tight">
                            Perpustakaan<span className="text-blue-600"> Kita</span>
                        </h1>
                    </div>
                    <nav className="hidden md:flex gap-6 text-sm font-medium text-[rgb(115,115,115)]">
                        <a href="#about" className="hover:text-blue-600 transition">Tentang Kami</a>
                        <a href="#services" className="hover:text-blue-600 transition">Layanan</a>
                        <a href="#community" className="hover:text-blue-600 transition">Komunitas</a>
                        <a href="#contact" className="hover:text-blue-600 transition">Kontak</a>
                    </nav>
                    <div className="flex items-center space-x-3">
                        {canLogin && (
                            <Link
                                href={route("login")}
                                className="text-sm font-medium text-[rgb(115,115,115)] hover:text-blue-600 transition"
                            >
                                Masuk
                            </Link>
                        )}
                        {canRegister && (
                            <Link
                                href={route("register")}
                                className="btn btn-primary btn-sm"
                            >
                                Daftar
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 sm:py-24">
                <div className="max-w-4xl space-y-8">
                    <div className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mb-4">
                        Selamat Datang di Perpustakaan Kita
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[rgb(23,23,23)] tracking-tight leading-tight">
                        Ruang Belajar untuk <span className="text-blue-600">Seluruh Komunitas</span>
                    </h1>
                    <p className="text-[rgb(115,115,115)] text-base sm:text-lg max-w-2xl mx-auto">
                        Tempat yang menghargai literasi, pendidikan, dan pertumbuhan intelektual.
                        Temukan ribuan buku, sumber daya digital, dan ruang belajar yang mendukung
                        perjalanan pembelajaran Anda.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                        <Link
                            href="#services"
                            className="btn btn-primary"
                        >
                            Jelajahi Layanan Kami
                        </Link>
                        <Link
                            href="#visit"
                            className="btn btn-outline"
                        >
                            Kunjungi Kami
                        </Link>
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section id="about" className="py-16 sm:py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-[rgb(23,23,23)] mb-4">
                            Tentang Perpustakaan Kita
                        </h2>
                        <p className="text-[rgb(115,115,115)]">
                            Sebagai pusat sumber daya pendidikan dan budaya, kami berkomitmen
                            untuk menyediakan akses terbuka ke pengetahuan bagi semua kalangan.
                            Perpustakaan kami adalah ruang publik yang ramah, inklusif, dan
                            mendukung berbagai kebutuhan pembelajaran.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg text-[rgb(23,23,23)] mb-2">Koleksi Luas</h3>
                            <p className="text-[rgb(115,115,115)] text-sm">
                                Ribuan buku cetak dan digital di berbagai bidang ilmu pengetahuan,
                                seni, dan teknologi untuk semua usia.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg text-[rgb(23,23,23)] mb-2">Ruang Komunitas</h3>
                            <p className="text-[rgb(115,115,115)] text-sm">
                                Ruang baca yang nyaman, area belajar kelompok, dan tempat untuk
                                berbagai kegiatan literasi dan budaya.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg text-[rgb(23,23,23)] mb-2">Digital Access</h3>
                            <p className="text-[rgb(115,115,115)] text-sm">
                                Akses online ke katalog buku, sumber daya digital, dan layanan
                                perpustakaan dari mana saja.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-16 sm:py-24 bg-[rgb(250,250,250)]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-[rgb(23,23,23)] mb-4">
                            Layanan Kami
                        </h2>
                        <p className="text-[rgb(115,115,115)]">
                            Kami menawarkan berbagai layanan untuk mendukung kebutuhan belajar,
                            penelitian, dan pertumbuhan intelektual komunitas kami.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="card p-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg text-[rgb(23,23,23)] mb-2">Koleksi Buku</h3>
                            <p className="text-[rgb(115,115,115)] text-sm">
                                Akses ke ribuan buku cetak dan digital di berbagai bidang ilmu,
                                fiksi, dan non-fiksi untuk semua usia.
                            </p>
                        </div>

                        <div className="card p-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg text-[rgb(23,23,23)] mb-2">Peminjaman</h3>
                            <p className="text-[rgb(115,115,115)] text-sm">
                                Layanan peminjaman buku dengan proses yang mudah dan cepat.
                                Pinjam hingga 14 hari untuk membaca di rumah.
                            </p>
                        </div>

                        <div className="card p-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg text-[rgb(23,23,23)] mb-2">Ruang Baca</h3>
                            <p className="text-[rgb(115,115,115)] text-sm">
                                Ruang baca yang nyaman dengan penerangan dan sirkulasi udara
                                yang baik, mendukung konsentrasi dan produktivitas.
                            </p>
                        </div>

                        <div className="card p-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg text-[rgb(23,23,23)] mb-2">Program Edukasi</h3>
                            <p className="text-[rgb(115,115,115)] text-sm">
                                Workshop, seminar, dan acara literasi untuk mendukung
                                pengembangan keterampilan dan minat baca.
                            </p>
                        </div>

                        <div className="card p-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg text-[rgb(23,23,23)] mb-2">Akses Digital</h3>
                            <p className="text-[rgb(115,115,115)] text-sm">
                                Akses online ke katalog buku, e-book, dan sumber daya digital
                                dari rumah atau perangkat pribadi Anda.
                            </p>
                        </div>

                        <div className="card p-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg text-[rgb(23,23,23)] mb-2">Keanggotaan</h3>
                            <p className="text-[rgb(115,115,115)] text-sm">
                                Gratis untuk semua warga. Dapatkan akses penuh ke semua
                                layanan perpustakaan dengan keanggotaan sederhana.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Support Section */}
            <section id="community" className="py-16 sm:py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold text-[rgb(23,23,23)] mb-6">
                                Dukungan untuk Pembelajaran & Komunitas
                            </h2>
                            <p className="text-[rgb(115,115,115)] mb-4">
                                Perpustakaan kami berfungsi sebagai pusat pembelajaran dan
                                pertemuan intelektual bagi berbagai latar belakang dan usia.
                                Kami percaya bahwa akses terbuka ke pengetahuan adalah hak dasar.
                            </p>
                            <p className="text-[rgb(115,115,115)] mb-6">
                                Dengan sumber daya yang luas, ruang belajar yang mendukung,
                                dan program yang dirancang untuk memupuk minat baca serta
                                penelitian, kami hadir sebagai mitra dalam perjalanan
                                pendidikan Anda.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-[rgb(115,115,115)]">Ruang belajar tenang dan mendukung konsentrasi</p>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-[rgb(115,115,115)]">Program literasi untuk anak-anak dan dewasa</p>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-[rgb(115,115,115)]">Akses ke basis data akademik dan digital</p>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-[rgb(115,115,115)]">Komunitas pembaca dan forum diskusi</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 flex justify-center">
                            <div className="relative">
                                <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                                    <div className="bg-white p-8 rounded-2xl shadow-lg w-64 h-64 flex flex-col items-center justify-center text-center">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-bold text-lg text-[rgb(23,23,23)] mb-2">Berbagi Pengetahuan</h3>
                                        <p className="text-[rgb(115,115,115)] text-sm">
                                            Tempat di mana pengetahuan dibagi, ide berkembang,
                                            dan komunitas tumbuh bersama.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="visit" className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Jadilah Bagian dari Komunitas Pembaca Kami
                    </h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                        Bergabunglah dengan ribuan anggota kami yang menemukan pengetahuan,
                        inspirasi, dan koneksi melalui perpustakaan kami. Akses buku,
                        sumber daya digital, dan ruang belajar yang mendukung perjalanan
                        pembelajaran Anda.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={canRegister ? route("register") : "#"}
                            className="btn btn-sm"
                        >
                            Daftar Sebagai Anggota
                        </Link>
                        <Link
                            href="#"
                            className="btn btn-outline btn-sm text-white border-white hover:bg-white/10"
                        >
                            Jelajahi Koleksi
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="border-t border-[rgb(229,229,229)] bg-white text-[rgb(115,115,115)] text-sm py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-[rgb(23,23,23)]">Perpustakaan Kita</h3>
                            </div>
                            <p className="text-[rgb(115,115,115)] text-sm">
                                Pusat sumber daya pendidikan dan budaya yang menyediakan
                                akses terbuka ke pengetahuan untuk seluruh komunitas.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-[rgb(23,23,23)] mb-4">Layanan</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-blue-600 transition">Koleksi Buku</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition">Peminjaman</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition">Ruang Baca</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition">Program Edukasi</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-[rgb(23,23,23)] mb-4">Tentang Kami</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-blue-600 transition">Sejarah</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition">Visi & Misi</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition">Tim Kami</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition">Karier</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-[rgb(23,23,23)] mb-4">Kontak</h4>
                            <address className="not-italic text-[rgb(115,115,115)] text-sm space-y-2">
                                <p>Alamat: Jl. Pendidikan No. 123</p>
                                <p>Kota: Jakarta</p>
                                <p>Telepon: (021) 1234-5678</p>
                                <p>Email: info@perpustakaankita.org</p>
                            </address>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-[rgb(229,229,229)] text-center">
                        <p>© {new Date().getFullYear()} Perpustakaan Kita. Hak Cipta Dilindungi.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}