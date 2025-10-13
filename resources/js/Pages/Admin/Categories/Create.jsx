import { useForm } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.categories.store"));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Tambah Kategori</h1>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label>Nama</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="border rounded w-full p-2"
                    />
                    {errors.name && (
                        <p className="text-red-500">{errors.name}</p>
                    )}
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

Create.layout = (page) => <AdminLayout>{page}</AdminLayout>;
