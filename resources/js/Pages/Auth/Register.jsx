import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), { onFinish: () => reset("password") });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <Head title="Daftar Akun LibSys" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </div>
                </div>

                <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Buat Akun Baru
                </h2>
                <p className="mt-2 text-center text-sm text-gray-500">
                    Bergabunglah dan nikmati akses penuh ke LibSys
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 card">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Nama Lengkap" required />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="mt-1 block w-full"
                                error={errors.name}
                                placeholder="Nama kamu"
                            />
                            {errors.name && (
                                <div className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" required />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="mt-1 block w-full"
                                error={errors.email}
                                placeholder="contoh@email.com"
                            />
                            {errors.email && (
                                <div className="mt-1 text-sm text-red-600">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" required />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                className="mt-1 block w-full"
                                error={errors.password}
                                placeholder="Minimal 8 karakter"
                            />
                            {errors.password && (
                                <div className="mt-1 text-sm text-red-600">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" required />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Ulangi password"
                            />
                        </div>

                        <div>
                            <PrimaryButton className="w-full" disabled={processing}>
                                Daftar
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Sudah punya akun?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href={route("login")}
                                className="block w-full text-center py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Masuk
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <p className="mt-8 text-xs text-gray-400">
                © {new Date().getFullYear()} LibSys — Sistem Manajemen Perpustakaan
            </p>
        </div>
    );
}
