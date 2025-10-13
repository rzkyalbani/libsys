import { Link, usePage } from "@inertiajs/react";

export default function AdminLayout({ children }) {
    const { auth, flash } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">📚 LibSys Admin Panel</h1>
                <div className="flex items-center gap-3">
                    <span className="text-sm">Halo, {auth.user.name}</span>
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="text-red-600 hover:underline"
                    >
                        Logout
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-6">
                {flash.success && (
                    <div className="mb-4 bg-green-100 text-green-700 p-2 rounded">
                        {flash.success}
                    </div>
                )}
                {flash.error && (
                    <div className="mb-4 bg-red-100 text-red-700 p-2 rounded">
                        {flash.error}
                    </div>
                )}

                {children}
            </main>
        </div>
    );
}
