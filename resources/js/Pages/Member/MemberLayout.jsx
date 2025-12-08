import { usePage, Link } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";

export default function MemberLayout({ children }) {
    const { auth } = usePage().props;
    const current = (name) => route().current(name);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[rgb(239,246,255)] to-white text-[rgb(23,23,23)]">
            {/* Header */}
            <header className="bg-white/90 backdrop-blur-sm border-b border-[rgb(229,229,229)] sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Left */}
                        <div className="flex items-center gap-10">
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
                            <nav className="hidden sm:flex gap-8">
                                <NavLink
                                    href={route("member.dashboard")}
                                    active={current("member.dashboard")}
                                    className="text-sm font-medium text-[rgb(115,115,115)] hover:text-blue-600 py-2.5 transition-colors"
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route("member.books.index")}
                                    active={current("member.books.index")}
                                    className="text-sm font-medium text-[rgb(115,115,115)] hover:text-blue-600 py-2.5 transition-colors"
                                >
                                    Katalog
                                </NavLink>
                                <NavLink
                                    href={route("member.borrowings.index")}
                                    active={current("member.borrowings.index")}
                                    className="text-sm font-medium text-[rgb(115,115,115)] hover:text-blue-600 py-2.5 transition-colors"
                                >
                                    Aktivitas
                                </NavLink>
                                <NavLink
                                    href={route("member.reservations.index")}
                                    active={current("member.reservations.index")}
                                    className="text-sm font-medium text-[rgb(115,115,115)] hover:text-blue-600 py-2.5 transition-colors"
                                >
                                    Daftar Tunggu
                                </NavLink>
                                <NavLink
                                    href={route("member.profile.edit")}
                                    active={current("member.profile.edit")}
                                    className="text-sm font-medium text-[rgb(115,115,115)] hover:text-blue-600 py-2.5 transition-colors"
                                >
                                    Profil
                                </NavLink>
                            </nav>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-6">
                            <span className="text-sm font-medium text-[rgb(115,115,115)] hidden sm:block">
                                {auth.user.name}
                            </span>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                Keluar
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="py-8">
                {children}
            </main>
        </div>
    );
}
