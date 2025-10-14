import { useForm } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Edit({ member }) {
    const { data, setData, put, processing, errors } = useForm({
        name: member.name || "",
        email: member.email || "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("admin.members.update", member.id));
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">
                    🧑 Edit Member
                </h1>
            </div>

            <div className="bg-white rounded-xl shadow border border-gray-100 p-6 max-w-lg">
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
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password (kosongkan jika tidak ingin mengubah)
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
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
                            href={route("admin.members.index")}
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
