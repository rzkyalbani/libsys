import { Link, usePage } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";

export default function AdminLayout({ children }) {
    const { auth, flash } = usePage().props;

    const current = (name) => route().current(name);

    return (
        <div className="min-h-screen flex bg-gray-50 text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r p-4 space-y-2 sticky top-0 h-screen">
                <div className="mb-4">
                    <h1 className="text-lg font-bold">📚 LibSys Admin</h1>
                    <p className="text-xs text-gray-500">
                        Hi, {auth.user.name}
                    </p>
                </div>
                <nav className="space-y-1">
                    <NavLink
                        href={route("admin.dashboard")}
                        active={current("admin.dashboard")}
                    >
                        🏠 Dashboard
                    </NavLink>
                    <NavLink
                        href={route("admin.books.index")}
                        active={current("admin.books.*")}
                    >
                        📚 Buku
                    </NavLink>
                    <NavLink
                        href={route("admin.categories.index")}
                        active={current("admin.categories.*")}
                    >
                        🏷️ Kategori
                    </NavLink>
                    <NavLink
                        href={route("admin.members.index")}
                        active={current("admin.members.*")}
                    >
                        👥 Member
                    </NavLink>
                    <NavLink
                        href={route("admin.borrowings.index")}
                        active={current("admin.borrowings.*")}
                    >
                        📦 Peminjaman
                    </NavLink>
                    <NavLink
                        href={route("admin.settings.index")}
                        active={current("admin.settings.*")}
                    >
                        ⚙️ Pengaturan
                    </NavLink>
                </nav>

                <Link
                    href={route("logout")}
                    method="post"
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
                >
                    Logout
                </Link>
            </aside>

            {/* Main */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
