import { useForm } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Edit({ categories, book }) {
    const { data, setData, put, processing, errors } = useForm({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        category_id: book.category_id,
        total_copies: book.total_copies,
        available_copies: book.available_copies,
        description: book.description,
    });

    const submit = (e) => {
        e.preventDefault();

        if (parseInt(data.available_copies) > parseInt(data.total_copies)) {
            alert(
                "Jumlah tersedia tidak boleh lebih besar dari total eksemplar!"
            );
            return;
        }

        put(route("admin.books.update", book));
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">
                    📚 Edit Buku
                </h1>
            </div>

            <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Judul
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Penulis
                        </label>
                        <input
                            type="text"
                            value={data.author}
                            onChange={(e) => setData("author", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Kategori
                        </label>
                        <select
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                        >
                            <option value="">-- Pilih Kategori --</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.category_id}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Total Eksemplar
                            </label>
                            <input
                                type="number"
                                value={data.total_copies}
                                onChange={(e) =>
                                    setData("total_copies", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                            />
                            {errors.total_copies && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.total_copies}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Tersedia
                            </label>
                            <input
                                type="number"
                                value={data.available_copies}
                                onChange={(e) =>
                                    setData("available_copies", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                            />
                            {errors.available_copies && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.available_copies}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Deskripsi
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                        >
                            Simpan
                        </button>
                        <a
                            href={route("admin.books.index")}
                            className="text-sm text-gray-500 hover:underline"
                        >
                            Batal
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

Edit.layout = (page) => <AdminLayout>{page}</AdminLayout>;
