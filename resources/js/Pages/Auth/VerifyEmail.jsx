import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[rgb(239,246,255)] to-white flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
            <Head title="Verifikasi Email" />

            {/* Header */}
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-[rgb(23,23,23)] tracking-tight">
                        Verifikasi Email
                    </h2>
                    <p className="mt-2 text-sm text-[rgb(115,115,115)]">
                        Terima kasih telah mendaftar! Sebelum memulai, mohon verifikasi alamat email Anda dengan mengklik tautan yang kami kirimkan.
                        Jika Anda tidak menerima email, kami dengan senang hati akan mengirimkan yang baru.
                    </p>
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                        Tautan verifikasi baru telah dikirim ke alamat email yang Anda berikan saat pendaftaran.
                    </div>
                )}

                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4 justify-between">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn btn-primary btn-lg"
                            >
                                Kirim Ulang Email Verifikasi
                            </button>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="btn btn-outline btn-lg text-[rgb(115,115,115)] hover:text-blue-600"
                            >
                                Keluar
                            </Link>
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
