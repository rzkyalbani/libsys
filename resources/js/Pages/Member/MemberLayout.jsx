import { usePage, Link } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";

export default function MemberLayout({ children }) {
    const { auth } = usePage().props;
    const current = (name) => route().current(name);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="main-container py-4">
                    <div className="flex items-center justify-between">
                        {/* Left */}
                        <div className="flex items-center gap-10">
                            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                                LibSys
                            </h1>
                            <nav className="hidden sm:flex gap-6">
                                <NavLink
                                    href={route("member.dashboard")}
                                    active={current("member.dashboard")}
                                    className="text-sm font-medium py-2.5 transition-colors"
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route("member.books.index")}
                                    active={current("member.books.index")}
                                    className="text-sm font-medium py-2.5 transition-colors"
                                >
                                    Katalog
                                </NavLink>
                                <NavLink
                                    href={route("member.borrowings.index")}
                                    active={current("member.borrowings.index")}
                                    className="text-sm font-medium py-2.5 transition-colors"
                                >
                                    Riwayat
                                </NavLink>
                                <NavLink
                                    href={route("member.reservations.index")}
                                    active={current("member.reservations.index")}
                                    className="text-sm font-medium py-2.5 transition-colors"
                                >
                                    Reservasi
                                </NavLink>
                                <NavLink
                                    href={route("member.profile.edit")}
                                    active={current("member.profile.edit")}
                                    className="text-sm font-medium py-2.5 transition-colors"
                                >
                                    Profil
                                </NavLink>
                            </nav>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 font-medium">
                                {auth.user.name}
                            </span>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="main-container py-8">
                {children}
            </main>
        </div>
    );
}
