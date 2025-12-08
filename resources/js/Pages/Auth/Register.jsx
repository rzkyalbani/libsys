import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
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
        <div className="min-h-screen bg-gradient-to-b from-[rgb(239,246,255)] to-white flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
            <Head title="Daftar Anggota Perpustakaan" />

            {/* Header */}
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-[rgb(23,23,23)] tracking-tight">
                        Daftar Sebagai Anggota
                    </h2>
                    <p className="mt-2 text-sm text-[rgb(115,115,115)]">
                        Bergabung dengan komunitas pembaca dan akses layanan perpustakaan
                    </p>
                </div>

                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <InputLabel htmlFor="name" value="Nama Lengkap" required />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="mt-1 block w-full py-3 px-4 rounded-lg border border-[rgb(209,213,219)] text-[rgb(23,23,23)] placeholder-[rgb(163,163,163)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                error={errors.name}
                                placeholder="Nama lengkap Anda"
                            />
                            <InputError message={errors.name} className="mt-1" />
                        </div>

                        <div className="space-y-2">
                            <InputLabel htmlFor="email" value="Alamat Email" required />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="mt-1 block w-full py-3 px-4 rounded-lg border border-[rgb(209,213,219)] text-[rgb(23,23,23)] placeholder-[rgb(163,163,163)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                error={errors.email}
                                placeholder="alamat@email.com"
                            />
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        <div className="space-y-2">
                            <InputLabel htmlFor="password" value="Buat Kata Sandi" required />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                className="mt-1 block w-full py-3 px-4 rounded-lg border border-[rgb(209,213,219)] text-[rgb(23,23,23)] placeholder-[rgb(163,163,163)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                error={errors.password}
                                placeholder="Minimal 8 karakter"
                            />
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        <div className="space-y-2">
                            <InputLabel htmlFor="password_confirmation" value="Konfirmasi Kata Sandi" required />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                className="mt-1 block w-full py-3 px-4 rounded-lg border border-[rgb(209,213,219)] text-[rgb(23,23,23)] placeholder-[rgb(163,163,163)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ulangi kata sandi Anda"
                            />
                        </div>

                        <div className="text-sm text-[rgb(115,115,115)]">
                            Dengan mendaftar, Anda menyetujui{' '}
                            <Link href="#" className="text-blue-600 hover:text-blue-500">
                                Syarat dan Ketentuan
                            </Link>{' '}
                            serta{' '}
                            <Link href="#" className="text-blue-600 hover:text-blue-500">
                                Kebijakan Privasi
                            </Link>{' '}
                            kami.
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn btn-primary btn-lg w-full"
                            >
                                {processing ? 'Memproses...' : 'Daftar Sebagai Anggota'}
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
                                    Sudah menjadi anggota?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href={route("login")}
                                className="btn btn-outline btn-lg w-full text-center"
                            >
                                Masuk ke Akun Anda
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