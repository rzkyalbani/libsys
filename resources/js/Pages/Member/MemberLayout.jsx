import { usePage, Link } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";

export default function MemberLayout({ children }) {
    const { auth } = usePage().props;
    const current = (name) => route().current(name);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Left */}
                    <div className="flex items-center gap-8">
                        <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
                            📖 LibSys
                        </h1>
                        <nav className="hidden sm:flex gap-2">
                            <NavLink
                                href={route("member.dashboard")}
                                active={current("member.dashboard")}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                href={route("member.books.index")}
                                active={current("member.books.index")}
                            >
                                Katalog
                            </NavLink>
                            <NavLink
                                href={route("member.borrowings.index")}
                                active={current("member.borrowings.index")}
                            >
                                Riwayat
                            </NavLink>
                            <NavLink
                                href={route("member.reservations.index")}
                                active={current("member.reservations.index")}
                            >
                                Reservasi Saya
                            </NavLink>
                            <NavLink
                                href={route("member.fines.index")}
                                active={current("member.fines.index")}
                            >
                                Denda Saya
                            </NavLink>
                            <NavLink
                                href={route("member.profile.edit")}
                                active={current("member.profile.edit")}
                            >
                                Profil
                            </NavLink>
                        </nav>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 font-medium">
                            {auth.user.name}
                        </span>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-all active:scale-[0.98]"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                {children}
            </main>
        </div>
    );
}
