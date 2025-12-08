import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
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
        <div className="min-h-screen bg-gradient-to-b from-[rgb(239,246,255)] to-white flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
            <Head title="Akses Akun Anggota" />

            {/* Header */}
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                            </svg>
                        </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-[rgb(23,23,23)] tracking-tight">
                        Akses Akun Anggota
                    </h2>
                    <p className="mt-2 text-sm text-[rgb(115,115,115)]">
                        Masuk untuk mengakses layanan perpustakaan Anda
                    </p>
                </div>

                <div className="mt-8">
                    {status && (
                        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <InputLabel htmlFor="email" value="Email Anggota" required />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="mt-1 block w-full py-3 px-4 rounded-lg border border-[rgb(209,213,219)] text-[rgb(23,23,23)] placeholder-[rgb(163,163,163)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                error={errors.email}
                                placeholder="alamat@email.com"
                                autoComplete="username"
                            />
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <InputLabel htmlFor="password" value="Kata Sandi" required />
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm text-blue-600 hover:text-blue-500"
                                    >
                                        Lupa sandi?
                                    </Link>
                                )}
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                className="mt-1 block w-full py-3 px-4 rounded-lg border border-[rgb(209,213,219)] text-[rgb(23,23,23)] placeholder-[rgb(163,163,163)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                error={errors.password}
                                placeholder="••••••••"
                                autoComplete="current-password"
                            />
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        <div className="flex items-center pt-2">
                            <input
                                id="remember"
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData("remember", e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-[rgb(115,115,115)]">
                                Ingat saya
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn btn-primary btn-lg w-full"
                            >
                                {processing ? 'Memproses...' : 'Masuk ke Akun'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[rgb(229,229,229)]"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-[rgb(115,115,115)]">
                                    Belum menjadi anggota?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href={route("register")}
                                className="btn btn-outline btn-lg w-full text-center"
                            >
                                Daftar Sebagai Anggota
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="text-center text-xs text-[rgb(163,163,163)] mt-12">
                    <p>© {new Date().getFullYear()} Perpustakaan Kita. Hak Cipta Dilindungi.</p>
                </div>
            </div>
        </div>
    );
}