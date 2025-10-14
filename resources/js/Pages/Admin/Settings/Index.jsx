import { useForm, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Index({ settings }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        fine_rate_per_day: settings.fine_rate_per_day || 1000,
        max_borrow_days: settings.max_borrow_days || 7,
        auto_cancel_hours: settings.auto_cancel_hours || 24,
        max_active_borrows_per_member:
            settings.max_active_borrows_per_member || 3,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.settings.update"));
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">⚙️ Pengaturan Sistem</h1>
            </div>

            {flash.success && (
                <div className="bg-green-100 text-green-700 p-3 rounded-md shadow-sm">
                    {flash.success}
                </div>
            )}

            <div className="bg-white rounded-xl shadow border border-gray-100 p-6 max-w-lg">
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Denda per Hari (Rp)</label>
                        <input
                            type="number"
                            value={data.fine_rate_per_day}
                            onChange={(e) =>
                                setData("fine_rate_per_day", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Lama Peminjaman Maksimal (hari)</label>
                        <input
                            type="number"
                            value={data.max_borrow_days}
                            onChange={(e) =>
                                setData("max_borrow_days", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Auto Cancel (jam)</label>
                        <input
                            type="number"
                            value={data.auto_cancel_hours}
                            onChange={(e) =>
                                setData("auto_cancel_hours", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Batas Pinjaman Aktif per Member</label>
                        <input
                            type="number"
                            value={data.max_active_borrows_per_member}
                            onChange={(e) =>
                                setData(
                                    "max_active_borrows_per_member",
                                    e.target.value
                                )
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
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
