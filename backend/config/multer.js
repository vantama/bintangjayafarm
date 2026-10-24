const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Direktori penyimpanan gambar tanaman
const uploadDir = path.join(__dirname, '../uploads/plants');

// Buat direktori otomatis jika belum ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi Disk Storage Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Sanitasi nama file dan tambahkan timestamp unik
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${uniqueSuffix}-${sanitizedName}`);
  }
});

// Filter tipe file yang diperbolehkan (hanya gambar)
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp/;
  const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedExtensions.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Format file tidak didukung! Hanya diperbolehkan upload gambar JPG, JPEG, PNG, atau WEBP.'));
  }
};

// Batas ukuran file: maksimal 5MB per gambar
const limits = {
  fileSize: 5 * 1024 * 1024 // 5 MB
};

// Instance Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
});

module.exports = upload;
