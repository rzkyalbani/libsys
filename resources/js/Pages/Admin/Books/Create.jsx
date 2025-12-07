import { useForm } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        author: "",
        isbn: "",
        category_id: "",
        total_copies: 1,
        available_copies: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (parseInt(data.available_copies) > parseInt(data.total_copies)) {
            alert(
                "Jumlah tersedia tidak boleh lebih besar dari total eksemplar!"
            );
            return;
        }

        post(route("admin.books.store"));
    };

    return (
        <div className="main-container py-8">
            <div className="page-header">
                <h1 className="page-title">Tambah Buku</h1>
                <p className="page-subtitle">
                    Isi detail buku baru di bawah ini
                </p>
            </div>

            <form onSubmit={submit} className="form-section">
                <div className="form-row">
                    <div className="form-group">
                        <InputLabel htmlFor="title" value="Judul Buku" required />
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="mt-1 block w-full"
                            error={errors.title}
                        />
                        {errors.title && (
                            <div className="mt-1 text-sm text-red-600">
                                {errors.title}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <InputLabel htmlFor="category_id" value="Kategori" required />
                        <select
                            id="category_id"
                            value={data.category_id}
                            onChange={(e) => setData("category_id", e.target.value)}
                            className="input-field mt-1 block w-full"
                        >
                            <option value="">Pilih kategori...</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <div className="mt-1 text-sm text-red-600">
                                {errors.category_id}
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <InputLabel htmlFor="author" value="Penulis" required />
                        <TextInput
                            id="author"
                            type="text"
                            name="author"
                            value={data.author}
                            onChange={(e) => setData("author", e.target.value)}
                            className="mt-1 block w-full"
                            error={errors.author}
                        />
                        {errors.author && (
                            <div className="mt-1 text-sm text-red-600">
                                {errors.author}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <InputLabel htmlFor="isbn" value="ISBN" />
                        <TextInput
                            id="isbn"
                            type="text"
                            name="isbn"
                            value={data.isbn}
                            onChange={(e) => setData("isbn", e.target.value)}
                            className="mt-1 block w-full"
                            error={errors.isbn}
                        />
                        {errors.isbn && (
                            <div className="mt-1 text-sm text-red-600">
                                {errors.isbn}
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <InputLabel htmlFor="total_copies" value="Total Eksemplar" required />
                        <TextInput
                            id="total_copies"
                            type="number"
                            name="total_copies"
                            value={data.total_copies}
                            onChange={(e) => setData("total_copies", e.target.value)}
                            className="mt-1 block w-full"
                            error={errors.total_copies}
                        />
                        {errors.total_copies && (
                            <div className="mt-1 text-sm text-red-600">
                                {errors.total_copies}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <InputLabel htmlFor="available_copies" value="Tersedia" required />
                        <TextInput
                            id="available_copies"
                            type="number"
                            name="available_copies"
                            value={data.available_copies}
                            onChange={(e) => setData("available_copies", e.target.value)}
                            className="mt-1 block w-full"
                            error={errors.available_copies}
                        />
                        {errors.available_copies && (
                            <div className="mt-1 text-sm text-red-600">
                                {errors.available_copies}
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <InputLabel htmlFor="description" value="Deskripsi" />
                    <textarea
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="input-field mt-1 block w-full"
                        rows="4"
                    />
                    {errors.description && (
                        <div className="mt-1 text-sm text-red-600">
                            {errors.description}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <InputLabel htmlFor="file" value="File E-book (PDF)" />
                    <input
                        id="file"
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setData("file", e.target.files[0])}
                        className="input-field mt-1 block w-full"
                    />
                    {errors.file && (
                        <div className="mt-1 text-sm text-red-600">
                            {errors.file}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 pt-4">
                    <PrimaryButton disabled={processing}>
                        Simpan
                    </PrimaryButton>
                    <SecondaryButton as="a" href={route("admin.books.index")}>
                        Batal
                    </SecondaryButton>
                </div>
            </form>
        </div>
    );
}

Create.layout = (page) => <AdminLayout>{page}</AdminLayout>;
