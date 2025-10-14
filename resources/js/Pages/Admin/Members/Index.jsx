import { Link, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Index({ members }) {
    const { flash } = usePage().props;

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">
                    🧑 Daftar Member
                </h1>
            </div>

            {flash.success && (
                <div className="bg-green-100 text-green-700 p-3 rounded-md shadow-sm">
                    {flash.success}
                </div>
            )}

            <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold">
                                Nama
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                Email
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                Tanggal Bergabung
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.data.length > 0 ? (
                            members.data.map((member) => (
                                <tr
                                    key={member.id}
                                    className="border-b last:border-none hover:bg-gray-50"
                                >
                                    <td className="px-4 py-2">{member.name}</td>
                                    <td className="px-4 py-2">
                                        {member.email}
                                    </td>
                                    <td className="px-4 py-2">
                                        {new Date(
                                            member.created_at
                                        ).toLocaleDateString("id-ID")}
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
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center text-gray-500 py-6 italic"
                                >
                                    Belum ada member.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
