import { useForm, usePage } from "@inertiajs/react";
import MemberLayout from "../MemberLayout";

export default function Edit({ user }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("member.profile.update"));
    };

    return (
        <div className="bg-gradient-to-b from-[rgb(239,246,255)] to-white py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[rgb(23,23,23)] tracking-tight">
                        Profil Anggota
                    </h1>
                    <p className="text-[rgb(115,115,115)] mt-2 max-w-2xl mx-auto">
                        Perbarui informasi profil Anda untuk pengalaman perpustakaan yang lebih baik.
                    </p>
                </div>

                {/* Flash Message */}
                {flash.success && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg shadow-sm text-sm max-w-2xl mx-auto">
                        {flash.success}
                    </div>
                )}

                {/* Form */}
                <div className="bg-white border border-[rgb(229,229,229)] rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-[rgb(31,41,55)] mb-1">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="mt-1 block w-full rounded-lg border border-[rgb(209,213,219)] focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm text-[rgb(31,41,55)] placeholder-[rgb(156,163,175)]"
                            />
                            {errors.name && (
                                <p className="text-rose-600 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[rgb(31,41,55)] mb-1">
                                Alamat Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="mt-1 block w-full rounded-lg border border-[rgb(209,213,219)] focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm text-[rgb(31,41,55)] placeholder-[rgb(156,163,175)]"
                            />
                            {errors.email && (
                                <p className="text-rose-600 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[rgb(31,41,55)] mb-1">
                                    Password Baru
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-lg border border-[rgb(209,213,219)] focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm text-[rgb(31,41,55)] placeholder-[rgb(156,163,175)]"
                                    placeholder="Kosongkan jika tidak diubah"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[rgb(31,41,55)] mb-1">
                                    Konfirmasi Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full rounded-lg border border-[rgb(209,213,219)] focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm text-[rgb(31,41,55)] placeholder-[rgb(156,163,175)]"
                                    placeholder="Ulangi password"
                                />
                                {errors.password && (
                                    <p className="text-rose-600 text-sm mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition active:scale-[0.98]"
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

Edit.layout = (page) => <MemberLayout>{page}</MemberLayout>;
