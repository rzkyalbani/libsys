import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[rgb(239,246,255)] to-white flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
            <Head title="Konfirmasi Kata Sandi" />

            {/* Header */}
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-[rgb(23,23,23)] tracking-tight">
                        Konfirmasi Kata Sandi
                    </h2>
                    <p className="mt-2 text-sm text-[rgb(115,115,115)]">
                        Ini adalah area aman dari layanan perpustakaan. Silakan konfirmasi kata sandi Anda sebelum melanjutkan.
                    </p>
                </div>

                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <InputLabel htmlFor="password" value="Kata Sandi" required />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full py-3 px-4 rounded-lg border border-[rgb(209,213,219)] text-[rgb(23,23,23)] placeholder-[rgb(163,163,163)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn btn-primary btn-lg w-full"
                            >
                                Konfirmasi Kata Sandi
                            </button>
                        </div>
                    </form>
                </div>

                <div className="text-center text-xs text-[rgb(163,163,163)] mt-12">
                    <p>© {new Date().getFullYear()} Perpustakaan Kita. Hak Cipta Dilindungi.</p>
                </div>
            </div>
        </div>
    );
}
