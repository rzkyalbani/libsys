import { Link, router, usePage } from "@inertiajs/react";
import MemberLayout from "../MemberLayout";
import { useEffect, useState } from "react";

export default function Index({ books, categories, filters }) {
    const { flash } = usePage().props;

    // Local state buat search dan kategori
    const [search, setSearch] = useState(filters.search || "");
    const [category, setCategory] = useState(filters.category || "");

    // Function buat trigger query otomatis
    const handleFilterChange = (newSearch, newCategory) => {
        router.get(
            route("member.books.index"),
            { search: newSearch, category: newCategory },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            handleFilterChange(search, category);
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [search, category]);

    return (
        <div className="bg-gradient-to-b from-[rgb(239,246,255)] to-white py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[rgb(23,23,23)] tracking-tight">
                        Katalog Buku
                    </h1>
                    <p className="text-[rgb(115,115,115)] mt-2 max-w-2xl mx-auto">
                        Jelajahi koleksi buku yang tersedia di perpustakaan kami.
                        Temukan pengetahuan dan inspirasi melalui ribuan judul yang kami sediakan.
                    </p>
                </div>

                {/* Flash Messages */}
                {flash.success && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg shadow-sm text-sm max-w-6xl mx-auto">
                        {flash.success}
                    </div>
                )}
                {flash.error && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg shadow-sm text-sm max-w-6xl mx-auto">
                        {flash.error}
                    </div>
                )}

                {/* Search & Filter */}
                <div className="bg-white border border-[rgb(229,229,229)] rounded-xl p-6 max-w-6xl mx-auto space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
                    <input
                        type="text"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari judul atau penulis buku..."
                        className="flex-1 px-4 py-2.5 border border-[rgb(209,213,219)] rounded-lg text-sm text-[rgb(23,23,23)] placeholder-[rgb(163,163,163)] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <select
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="sm:w-56 px-4 py-2.5 border border-[rgb(209,213,219)] rounded-lg text-sm text-[rgb(23,23,23)] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="">Semua Kategori</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Book Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {books.data.length > 0 ? (
                        books.data.map((book, i) => (
                            <div
                                key={book.id}
                                className="bg-white border border-[rgb(229,229,229)] rounded-xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-[2px] flex flex-col h-full"
                                style={{
                                    animation: `fadeIn 0.4s ease-out ${
                                        i * 0.05
                                    }s both`,
                                }}
                            >
                                <div className="flex flex-col h-full justify-between space-y-3">
                                    {/* Cover Image */}
                                    <div className="flex justify-center">
                                        {book.cover_image ? (
                                            <img
                                                src={book.cover_image}
                                                alt={book.title}
                                                className="w-full h-40 object-cover rounded-lg border border-[rgb(229,229,229)] bg-white"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "/images/default-book-cover.png";
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-40 flex items-center justify-center bg-[rgb(249,250,251)] rounded-lg border border-[rgb(229,229,229)]">
                                                <div className="text-center p-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-[rgb(156,163,175)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                    </svg>
                                                    <span className="text-xs text-[rgb(156,163,175)] mt-1 block">Cover tidak tersedia</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="space-y-2">
                                        <h2 className="text-base font-semibold text-[rgb(23,23,23)] line-clamp-2">
                                            {book.title}
                                        </h2>
                                        <p className="text-sm text-[rgb(115,115,115)]">
                                            {book.author ||
                                                "Penulis tidak diketahui"}
                                        </p>
                                        {book.category && (
                                            <span className="inline-block bg-[rgb(249,250,251)] text-[rgb(55,65,81)] text-xs px-2 py-0.5 rounded-md border border-[rgb(229,229,229)]">
                                                {book.category.name}
                                            </span>
                                        )}
                                        <p className="text-sm text-[rgb(115,115,115)] mt-2">
                                            {book.available_copies > 0 ? (
                                                <span className="flex items-center gap-1.5">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                                    {book.available_copies}{" "}
                                                    eksemplar tersedia
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5">
                                                    <span className="w-2 h-2 rounded-full bg-[rgb(156,163,175)]"></span>
                                                    Sedang tidak tersedia
                                                </span>
                                            )}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="space-y-2 mt-auto">
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
                                            className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition active:scale-[0.98] ${
                                                book.available_copies > 0
                                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                    : "bg-amber-500 hover:bg-amber-600 text-white"
                                            } ${
                                                book.is_reserved ||
                                                book.is_borrowing
                                                    ? "opacity-50 cursor-not-allowed"
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
                                            <div className="flex gap-2">
                                                <a
                                                    href={`/storage/${book.file_path}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition active:scale-[0.98] text-center"
                                                >
                                                    Baca E-book
                                                </a>
                                                <a
                                                    href={`/storage/${book.file_path}`}
                                                    download
                                                    className="flex-1 px-4 py-2 bg-[rgb(55,65,81)] hover:bg-[rgb(31,41,55)] text-white text-sm font-medium rounded-lg transition active:scale-[0.98] text-center"
                                                >
                                                    Unduh
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center max-w-6xl mx-auto">
                            <p className="text-[rgb(156,163,175)] text-5xl mb-3">📚</p>
                            <h3 className="text-lg font-semibold text-[rgb(31,41,55)] mb-2">
                                Tidak ada buku ditemukan
                            </h3>
                            <p className="text-sm text-[rgb(107,114,128)] mb-4 max-w-sm">
                                Coba ubah kategori atau kata kunci pencarian Anda.
                            </p>
                            <Link
                                href={route("member.books.index")}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                Lihat semua buku
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {books.links && books.data.length > 0 && (
                    <div className="flex justify-center gap-2 pt-6 max-w-6xl mx-auto">
                        {books.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || "#"}
                                className={`px-3 py-1.5 rounded text-sm font-medium transition ${
                                    link.active
                                        ? "bg-blue-600 text-white"
                                        : link.url
                                        ? "bg-white border border-[rgb(229,229,229)] text-[rgb(31,41,55)] hover:bg-[rgb(249,250,251)]"
                                        : "bg-[rgb(249,250,251)] text-[rgb(156,163,175)] cursor-not-allowed"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}

                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(6px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        </div>
    );
}

Index.layout = (page) => <MemberLayout>{page}</MemberLayout>;
