# 🌿 Bintang Jaya Farm - Website UMKM & Backend API Tanaman Hias

Website landing page modern, asri, dan responsif untuk **Bintang Jaya Farm**, pelaku UMKM penyedia berbagai aneka tanaman hias untuk mempercantik rumah, ruangan kerja, maupun halaman. Dilengkapi dengan backend Node.js (Express & Multer) untuk manajemen katalog tanaman dan pengelolaan upload gambar produk.

---

## 📁 Struktur Direktori Proyek

Proyek ini telah disusun dengan struktur modular berstandar industri agar rapi di File Explorer dan siap di-upload ke GitHub:

```text
d:\Web/
├── .gitignore                      # Mengabaikan file sensitif & cache saat push ke GitHub
├── README.md                       # Dokumentasi proyek & panduan penggunaan
├── index.html                      # Landing page utama (Semantic HTML5, Font Awesome 6)
├── style.css                       # Desain responsif bertema botanical & glassmorphism
├── script.js                       # Logika interaktif frontend (filter, kuis, WhatsApp generator)
│
├── assets/                         # Folder aset statis frontend
│   └── images/                     # Gambar statis, logo, banner (.gitkeep)
│
└── backend/                        # Backend Service (Node.js & Express)
    ├── .env.example                # Template konfigurasi environment (PORT, URL)
    ├── package.json                # Daftar dependensi backend (Express, Multer, Cors, Dotenv)
    ├── server.js                   # Entry point Express Server & static file server
    ├── config/
    │   └── multer.js               # Konfigurasi upload gambar (validasi format & ukuran 5MB)
    ├── controllers/
    │   ├── plantController.js      # Logika CRUD tanaman & pengelolaan upload gambar
    │   └── orderController.js      # Logika pencatatan pesanan & generator pesan WhatsApp
    ├── data/
    │   └── plants.json             # Database JSON awal koleksi tanaman
    ├── middleware/
    │   └── errorHandler.js         # Penanganan error sentral (termasuk Multer error)
    ├── routes/
    │   ├── plantRoutes.js          # Endpoint API katalog tanaman & upload
    │   └── orderRoutes.js          # Endpoint API pemesanan & konsultasi
    └── uploads/
        └── plants/                 # Folder penyimpanan gambar tanaman yang diupload (.gitkeep)
```

---

## 🚀 Panduan Upload ke GitHub (Step-by-Step)

Ikuti langkah-langkah berikut di terminal (PowerShell atau Command Prompt) pada folder proyek `d:\Web`:

### 1. Buat Repositori Baru di GitHub
1. Buka [GitHub](https://github.com/) dan login ke akun Anda.
2. Klik tombol **New** (atau ikon `+` di kanan atas > **New repository**).
3. Beri nama repositori, misalnya: `bintang-jaya-farm`.
4. Pilih **Public** atau **Private**.
5. **Jangan centang** opsi *"Initialize this repository with a README, .gitignore, or license"* (karena file-file ini sudah kita sediakan).
6. Klik **Create repository**.

### 2. Jalankan Perintah Git di Komputer Anda
Buka terminal di folder `d:\Web` lalu jalankan perintah berikut secara berurutan:

```bash
# 1. Inisialisasi repositori Git lokal
git init

# 2. Tambahkan semua file proyek ke staging (file sensitif otomatis diabaikan oleh .gitignore)
git add .

# 3. Buat commit pertama
git commit -m "feat: landing page Bintang Jaya Farm lengkap dengan backend upload gambar"

# 4. Ubah nama branch utama menjadi main
git branch -M main

# 5. Hubungkan repositori lokal ke repositori GitHub Anda
# (Ganti URL di bawah dengan URL repositori GitHub Anda!)
git remote add origin https://github.com/USERNAME-ANDA/bintang-jaya-farm.git

# 6. Push seluruh file ke GitHub
git push -u origin main
```

> **Tips:** Di masa mendatang, jika Anda melakukan perubahan kode, cukup lakukan:
> ```bash
> git add .
> git commit -m "Update deskripsi atau tampilan"
> git push
> ```

---

## 💻 Cara Menjalankan Website

### 1. Menjalankan Frontend
* Cukup klik ganda (double-click) file `index.html` untuk langsung membukanya di browser favorit Anda (Google Chrome, Edge, Safari, Firefox).
* Atau gunakan ekstensi **Live Server** di VS Code / editor Anda.

### 2. Menjalankan Backend (Pengelolaan Upload Gambar & API)

#### Prasyarat
Pastikan komputer Anda sudah terpasang **Node.js** (minimal versi 18 atau LTS terbaru).  
Jika belum, download gratis di: 👉 **[https://nodejs.org/](https://nodejs.org/)**

#### Langkah Menjalankan:
1. Buka terminal di folder `backend`:
   ```bash
   cd d:\Web\backend
   ```
2. Buat file `.env` dari template yang sudah disediakan:
   ```bash
   copy .env.example .env
   ```
3. Install seluruh dependensi backend:
   ```bash
   npm install
   ```
4. Jalankan server:
   ```bash
   npm start
   ```
   *(Atau `npm run dev` jika ingin auto-reload saat mengedit kode backend).*
5. Server backend akan aktif di: **`http://localhost:5000`**

---

## 📡 Dokumentasi Endpoint REST API

Setelah backend aktif, Anda dapat mengakses atau menguji endpoint berikut menggunakan Postman, cURL, atau fetch:

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Cek status server aktif |
| `GET` | `/api/plants` | Ambil semua koleksi tanaman (dukung query `?category=indoor`, `?search=monstera`, `?budget=under50`) |
| `GET` | `/api/plants/:id` | Ambil detail satu tanaman berdasarkan ID |
| `POST` | `/api/plants/upload` | Upload file gambar tanaman saja (`multipart/form-data`, key: `image`) |
| `POST` | `/api/plants` | Tambah tanaman baru lengkap dengan upload gambar (`multipart/form-data`) |
| `DELETE` | `/api/plants/:id` | Hapus data tanaman sekaligus file gambar fisiknya |
| `POST` | `/api/orders` | Catat pesanan/konsultasi & buatkan URL pesan otomatis WhatsApp |
| `GET` | `/api/orders` | Lihat riwayat pemesanan yang masuk |

### Akses Gambar yang Telah Diupload
Semua gambar yang diunggah melalui API akan tersimpan di `backend/uploads/plants/` dan dapat diakses langsung oleh browser melalui URL:
```text
http://localhost:5000/uploads/plants/nama_file_gambar.jpg
```

---

## 🎨 Fitur Unggulan Frontend Bintang Jaya Farm
* **Font Awesome 6 Pro/Free CDN Integration:** Icon lengkap untuk semua kategori, rating, sosial media, dan fitur.
* **100% Responsif:** Menyesuaikan secara mulus dari layar HP kecil (320px) hingga layar monitor 4K.
* **Navigasi Horizontal Swipe:** Tab kategori tanaman dapat digeser dengan sentuhan di smartphone seperti aplikasi modern.
* **Kuis Rekomendasi Tanaman (*Plant Finder Wizard*):** Membantu pelanggan menentukan tanaman terbaik berdasarkan kondisi ruangan, sinar matahari, dan kesibukan menyiram.
* **Generator WhatsApp Dinamis:** Pesan otomatis tersusun rapi saat pelanggan memesan tanaman atau mengisi formulir konsultasi.

---

## 📄 Lisensi & Hak Cipta
Dibuat dengan cinta untuk memajukan UMKM Florikultura Indonesia — **Bintang Jaya Farm**.
