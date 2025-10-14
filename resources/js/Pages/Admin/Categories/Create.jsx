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
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">
                    🏷️ Tambah Kategori
                </h1>
            </div>

            <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
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
                            href={route("admin.categories.index")}
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

Create.layout = (page) => <AdminLayout>{page}</AdminLayout>;
