import { usePage, Link } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";

export default function MemberLayout({ children }) {
    const { auth, flash } = usePage().props;
    const current = (name) => route().current(name);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <h1 className="text-lg font-bold">📖 LibSys</h1>
                        <nav className="hidden sm:flex gap-2">
                            <NavLink
                                href={route("member.dashboard")}
                                active={current("member.dashboard")}
                            >
                                🏠 Dashboard
                            </NavLink>
                            <NavLink
                                href={route("member.books.index")}
                                active={current("member.books.index")}
                            >
                                📚 Katalog
                            </NavLink>
                            <NavLink
                                href={route("member.profile.edit")}
                                active={current("member.profile.edit")}
                            >
                                👤 Profil
                            </NavLink>
                        </nav>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">
                            {auth.user.name}
                        </span>
                        <form method="post" action={route("logout")}>
                            <button className="text-red-600 hover:underline text-sm">
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        </div>
    );
}
