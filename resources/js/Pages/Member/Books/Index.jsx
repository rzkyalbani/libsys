import { Link, usePage } from "@inertiajs/react";
import MemberLayout from "../MemberLayout";

export default function Index({ books, categories, filters }) {
    const { flash } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                {/* Header Section */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
                        Katalog Buku
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Jelajahi koleksi buku perpustakaan kami
                    </p>
                </div>

                {/* Flash Messages */}
                {flash.success && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-3.5 rounded-xl flex items-start gap-3 shadow-sm">
                        <svg
                            className="w-5 h-5 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>{flash.success}</span>
                    </div>
                )}

                {flash.error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-5 py-3.5 rounded-xl flex items-start gap-3 shadow-sm">
                        <svg
                            className="w-5 h-5 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>{flash.error}</span>
                    </div>
                )}

                {/* Search & Filter */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
                    <form
                        method="get"
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <div className="flex-1">
                            <input
                                type="text"
                                name="search"
                                defaultValue={filters.search}
                                placeholder="Cari judul buku..."
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="sm:w-56">
                            <select
                                name="category"
                                defaultValue={filters.category || ""}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                                <option value="">Semua Kategori</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
                        >
                            Cari
                        </button>
                    </form>
                </div>

                {/* Book List */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.data.length > 0 ? (
                        books.data.map((book, index) => (
                            <div
                                key={book.id}
                                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col"
                                style={{
                                    animation: `fadeIn 0.5s ease-out ${
                                        index * 0.05
                                    }s both`,
                                }}
                            >
                                <div className="flex-1 space-y-3">
                                    <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                        {book.title}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {book.author ||
                                            "Penulis tidak diketahui"}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                                            {book.category?.name}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {book.available_copies > 0 ? (
                                            <span className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                                {book.available_copies}{" "}
                                                eksemplar tersedia
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                                Sedang tidak tersedia
                                            </span>
                                        )}
                                    </p>
                                </div>

                                <div className="mt-6 space-y-2">
                                    <Link
                                        href={
                                            book.available_copies > 0
                                                ? route("member.borrow.store")
                                                : route(
                                                      "member.books.reserve",
                                                      book.id
                                                  )
                                        }
                                        data={{ book_id: book.id }}
                                        method="post"
                                        as="button"
                                        disabled={
                                            book.is_reserved ||
                                            book.is_borrowing
                                        }
                                        className={`w-full px-4 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm hover:shadow-md active:scale-[0.98] ${
                                            book.available_copies > 0
                                                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                                                : "bg-amber-500 hover:bg-amber-600 text-white"
                                        } ${
                                            book.is_reserved ||
                                            book.is_borrowing
                                                ? "opacity-50 cursor-not-allowed hover:shadow-sm active:scale-100"
                                                : ""
                                        }`}
                                    >
                                        {book.is_borrowing
                                            ? "Sedang Dipinjam"
                                            : book.is_reserved
                                            ? "Sudah Dipesan"
                                            : book.available_copies > 0
                                            ? "Pinjam Buku"
                                            : "Reservasi"}
                                    </Link>

                                    {book.file_path && (
                                        <div className="flex gap-2 pt-1">
                                            <a
                                                href={`/storage/${book.file_path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md active:scale-[0.98] text-center"
                                            >
                                                Baca E-book
                                            </a>
                                            <a
                                                href={`/storage/${book.file_path}`}
                                                download
                                                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md active:scale-[0.98] text-center"
                                            >
                                                Unduh
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                Belum ada buku ditemukan
                            </h3>
                            <p className="text-sm text-gray-500 text-center max-w-sm">
                                Coba ubah filter pencarian atau kata kunci yang
                                Anda gunakan
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {books.links && books.data.length > 0 && (
                    <div className="flex justify-center items-center gap-2 pt-4">
                        {books.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || "#"}
                                className={`min-w-[2.5rem] px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                    link.active
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : link.url
                                        ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Fade-in Animation */}
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}

Index.layout = (page) => <MemberLayout>{page}</MemberLayout>;
