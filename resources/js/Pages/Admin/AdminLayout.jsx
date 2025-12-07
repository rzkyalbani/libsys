import { Link, usePage } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const current = (name) => route().current(name);

    return (
        <div className="min-h-screen flex bg-gray-50 text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between sticky top-0 h-screen">
                <div className="p-5 space-y-8">
                    {/* Brand */}
                    <div className="pt-2">
                        <h1 className="text-lg font-bold text-gray-900 tracking-tight">
                            LibSys Admin
                        </h1>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                            Halo, {auth.user.name}
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col space-y-0.5">
                        <NavLink
                            href={route("admin.dashboard")}
                            active={current("admin.dashboard")}
                            className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-lg text-sm font-medium transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
                            </svg>
                            Dashboard
                        </NavLink>
                        <NavLink
                            href={route("admin.books.index")}
                            active={current("admin.books.*")}
                            className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-lg text-sm font-medium transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                            Buku
                        </NavLink>
                        <NavLink
                            href={route("admin.categories.index")}
                            active={current("admin.categories.*")}
                            className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-lg text-sm font-medium transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                            </svg>
                            Kategori
                        </NavLink>
                        <NavLink
                            href={route("admin.members.index")}
                            active={current("admin.members.*")}
                            className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-lg text-sm font-medium transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                            Member
                        </NavLink>
                        <NavLink
                            href={route("admin.borrowings.index")}
                            active={current("admin.borrowings.*")}
                            className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-lg text-sm font-medium transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Peminjaman
                        </NavLink>
                        <NavLink
                            href={route("admin.fines.index")}
                            active={current("admin.fines.*")}
                            className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-lg text-sm font-medium transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Denda
                        </NavLink>
                        <NavLink
                            href={route("admin.settings.index")}
                            active={current("admin.settings.*")}
                            className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-lg text-sm font-medium transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            Pengaturan
                        </NavLink>
                    </nav>
                </div>

                {/* Logout */}
                <div className="p-5 border-t border-gray-100">
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 py-8 px-6 overflow-y-auto bg-gray-50">
                <div className="main-container">
                    {children}
                </div>
            </main>
        </div>
    );
}
