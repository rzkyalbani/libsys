import { Link, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Index({ members }) {
    const { flash } = usePage().props;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Daftar Member</h1>

            {flash.success && (
                <p className="text-green-600 mb-3">{flash.success}</p>
            )}

            <table className="min-w-full border">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2">Nama</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Tanggal Bergabung</th>
                        <th className="px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {members.data.map((member) => (
                        <tr key={member.id} className="border-t">
                            <td className="px-4 py-2">{member.name}</td>
                            <td className="px-4 py-2">{member.email}</td>
                            <td className="px-4 py-2">
                                {new Date(member.created_at).toLocaleDateString(
                                    "id-ID"
                                )}
                            </td>
                            <td className="px-4 py-2">
                                <Link
                                    as="button"
                                    method="delete"
                                    href={route(
                                        "admin.members.destroy",
                                        member
                                    )}
                                    className="text-red-600 hover:underline"
                                >
                                    Hapus
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
