import { Link, usePage } from "@inertiajs/react";
import MemberLayout from "../MemberLayout";

export default function Index({ books, categories, filters }) {
    const { flash } = usePage().props;

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">
                    📚 Katalog Buku
                </h1>
            </div>

            {flash.success && (
                <div className="bg-green-100 text-green-700 p-3 rounded-md shadow-sm">
                    {flash.success}
                </div>
            )}

            {flash.error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md shadow-sm">
                    {flash.error}
                </div>
            )}

            {/* Search & Filter */}
            <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                <form method="get" className="flex gap-4 items-center">
                    <input
                        type="text"
                        name="search"
                        defaultValue={filters.search}
                        placeholder="Cari judul buku..."
                        className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                    <select
                        name="category"
                        defaultValue={filters.category || ""}
                        className="mt-1 block rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    >
                        <option value="">Semua Kategori</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                    >
                        Cari
                    </button>
                </form>
            </div>

            {/* Book List */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {books.data.length > 0 ? (
                    books.data.map((book) => (
                        <div
                            key={book.id}
                            className="bg-white p-4 rounded-xl shadow border border-gray-100"
                        >
                            <h2 className="text-xl font-semibold">
                                {book.title}
                            </h2>
                            <p className="text-sm text-gray-600 mb-2">
                                {book.author || "Penulis tidak diketahui"}
                            </p>
                            <p className="text-gray-700 text-sm mb-2">
                                <strong>Kategori:</strong> {book.category?.name}
                            </p>
                            <p className="text-gray-700 text-sm mb-4">
                                {book.available_copies > 0
                                    ? `${book.available_copies} eksemplar tersedia`
                                    : "Sedang tidak tersedia"}
                            </p>
                            {/* <Link
                                as="button"
                                method="post"
                                href={route("member.borrow.store")}
                                data={{ book_id: book.id }}
                                disabled={book.available_copies <= 0}
                                className={`${
                                    book.available_copies > 0
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-gray-400 cursor-not-allowed"
                                } text-white px-4 py-2 rounded-md transition-all`}
                            >
                                Pinjam
                            </Link> */}
                            <Link
                                href={
                                    book.available_copies > 0
                                        ? route("member.borrow.store")
                                        : route("member.books.reserve", book.id)
                                }
                                data={{ book_id: book.id }}
                                method="post"
                                as="button"
                                disabled={
                                    book.available_copies <= 0 &&
                                    book.is_reserved
                                }
                                className={`${
                                    book.available_copies > 0
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-yellow-600 hover:bg-yellow-700"
                                } text-white px-4 py-2 rounded transition-all`}
                            >
                                {book.available_copies > 0
                                    ? "Pinjam"
                                    : "Reservasi"}
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">Tidak ada buku ditemukan.</p>
                )}
            </div>

            {/* Pagination (simple placeholder dulu) */}
            {books.links && (
                <div className="flex justify-center mt-6 gap-2">
                    {books.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || "#"}
                            className={`px-3 py-1 rounded ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => <MemberLayout>{page}</MemberLayout>;
