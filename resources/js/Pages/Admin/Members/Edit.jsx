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
        <div className="p-6">
            <h1 className="text-2xl mb-4 font-bold">Edit Buku</h1>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label>Judul</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="border rounded w-full p-2"
                    />
                    {errors.title && (
                        <p className="text-red-500">{errors.title}</p>
                    )}
                </div>

                <div>
                    <label>Penulis</label>
                    <input
                        type="text"
                        value={data.author}
                        onChange={(e) => setData("author", e.target.value)}
                        className="border rounded w-full p-2"
                    />
                </div>

                <div>
                    <label>Kategori</label>
                    <select
                        value={data.category_id}
                        onChange={(e) => setData("category_id", e.target.value)}
                        className="border rounded w-full p-2"
                    >
                        <option value="">-- Pilih Kategori --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && (
                        <p className="text-red-500">{errors.category_id}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Total Eksemplar</label>
                        <input
                            type="number"
                            value={data.total_copies}
                            onChange={(e) =>
                                setData("total_copies", e.target.value)
                            }
                            className="border rounded w-full p-2"
                        />
                        {errors.total_copies && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.total_copies}
                            </p>
                        )}
                    </div>

                    <div>
                        <label>Tersedia</label>
                        <input
                            type="number"
                            value={data.available_copies}
                            onChange={(e) =>
                                setData("available_copies", e.target.value)
                            }
                            className="border rounded w-full p-2"
                        />
                        {errors.available_copies && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.available_copies}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label>Deskripsi</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="border rounded w-full p-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Simpan
                </button>
            </form>
        </div>
    );
}

Edit.layout = (page) => <AdminLayout>{page}</AdminLayout>;
