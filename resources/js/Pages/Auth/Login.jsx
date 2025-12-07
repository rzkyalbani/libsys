import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), { onFinish: () => reset("password") });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <Head title="Masuk ke LibSys" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                    </div>
                </div>

                <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Masuk ke LibSys
                </h2>
                <p className="mt-2 text-center text-sm text-gray-500">
                    Akses dashboard dan mulai eksplorasi buku
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 card">
                    {status && (
                        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
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
                                autoComplete="username"
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
                                placeholder="••••••••"
                                autoComplete="current-password"
                            />
                            {errors.password && (
                                <div className="mt-1 text-sm text-red-600">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData("remember", e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                    Ingat saya
                                </label>
                            </div>

                            {canResetPassword && (
                                <div className="text-sm">
                                    <Link
                                        href={route("password.request")}
                                        className="font-medium text-blue-600 hover:text-blue-500"
                                    >
                                        Lupa password?
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div>
                            <PrimaryButton className="w-full" disabled={processing}>
                                Masuk
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
                                    Belum punya akun?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href={route("register")}
                                className="block w-full text-center py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Daftar sekarang
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
