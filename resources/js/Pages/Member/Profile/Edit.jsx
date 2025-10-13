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
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Profil</h1>

            {flash.success && (
                <p className="text-green-600 mb-3">{flash.success}</p>
            )}

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
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="border rounded w-full p-2"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label>Password Baru (Opsional)</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="border rounded w-full p-2"
                    />
                </div>

                <div>
                    <label>Konfirmasi Password</label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        className="border rounded w-full p-2"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password}
                        </p>
                    )}
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

Edit.layout = (page) => <MemberLayout>{page}</MemberLayout>;
