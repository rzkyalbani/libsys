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
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">⚙️ Pengaturan Sistem</h1>

            {flash.success && (
                <div className="bg-green-100 text-green-700 p-2 rounded">
                    {flash.success}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4 max-w-lg">
                <div>
                    <label>Denda per Hari (Rp)</label>
                    <input
                        type="number"
                        value={data.fine_rate_per_day}
                        onChange={(e) =>
                            setData("fine_rate_per_day", e.target.value)
                        }
                        className="border rounded w-full p-2"
                    />
                </div>

                <div>
                    <label>Lama Peminjaman Maksimal (hari)</label>
                    <input
                        type="number"
                        value={data.max_borrow_days}
                        onChange={(e) =>
                            setData("max_borrow_days", e.target.value)
                        }
                        className="border rounded w-full p-2"
                    />
                </div>

                <div>
                    <label>Auto Cancel (jam)</label>
                    <input
                        type="number"
                        value={data.auto_cancel_hours}
                        onChange={(e) =>
                            setData("auto_cancel_hours", e.target.value)
                        }
                        className="border rounded w-full p-2"
                    />
                </div>

                <div>
                    <label>Batas Pinjaman Aktif per Member</label>
                    <input
                        type="number"
                        value={data.max_active_borrows_per_member}
                        onChange={(e) =>
                            setData(
                                "max_active_borrows_per_member",
                                e.target.value
                            )
                        }
                        className="border rounded w-full p-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Simpan Perubahan
                </button>
            </form>
        </div>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
