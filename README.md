# LibSys - Library Management System

LibSys adalah aplikasi manajemen perpustakaan modern yang dirancang untuk mempermudah pengelolaan buku, peminjaman, reservasi, dan denda. Dengan antarmuka yang minimalis dan responsif, LibSys memberikan pengalaman pengguna yang nyaman dan efisien.

## ✨ Fitur Utama

-   **Authentication**: Sistem login dan manajemen pengguna.
-   **Catalog**: Menampilkan daftar buku dengan pencarian dan filter kategori.
-   **Borrowing**: Meminjam buku secara langsung.
-   **Reservation**: Reservasi buku yang sedang tidak tersedia.
-   **Fine Management**: Mengelola denda keterlambatan.
-   **Digital Book**: Membaca dan mengunduh e-book.
-   **Responsive Design**: Antarmuka yang optimal di berbagai perangkat.

## 🛠️ Tech Stack

-   **Backend**: Laravel 12
-   **Frontend**: React + Inertia.js
-   **Styling**: TailwindCSS
-   **Database**: MySQL
-   **Other Tools**: Vite, PestPHP

## 🚀 Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal:

1. **Clone repository**

    ```bash
    git clone https://github.com/rzkyalbani/libsys.git
    cd libsys
    ```

2. **Install dependencies**

    ```bash
    composer install
    npm install
    ```

3. **Copy konfigurasi**

    ```bash
    cp .env.example .env
    ```

4. **Generate app key**

    ```bash
    php artisan key:generate
    ```

5. **Setup database**

    - Buat database baru di MySQL.
    - Update konfigurasi database di file `.env`.

6. **Run migrations dan seeder**

    ```bash
    php artisan migrate --seed
    ```

7. **Build assets**

    ```bash
    npm run build
    ```

8. **Jalankan server**
    ```bash
    php artisan serve
    npm run dev
    ```

Akses aplikasi di [http://localhost:8000](http://localhost:8000).

## 📂 Struktur Folder

```
libsys/
├── app/                # Backend logic (Controllers, Models, etc.)
├── resources/
│   ├── js/            # Frontend (React components)
│   ├── views/         # Blade templates
│   └── css/           # TailwindCSS styles
├── database/          # Migrations dan seeders
├── public/            # Public assets
├── routes/            # API dan web routes
├── tests/             # Unit dan feature tests
└── ...
```

## 🤝 Kontribusi

Kami menyambut kontribusi dari siapa pun! Ikuti langkah berikut untuk berkontribusi:

1. Fork repository ini.
2. Buat branch baru untuk fitur atau perbaikan Anda.
3. Lakukan perubahan dan commit.
4. Kirim pull request.

## 📜 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

Dibuat dengan ❤️ oleh [rzkyalbani](https://github.com/rzkyalbani).
