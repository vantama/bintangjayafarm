const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const plantRoutes = require('./routes/plantRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Pastikan folder uploads/plants tersedia saat server start
const uploadsDir = path.join(__dirname, 'uploads/plants');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ----------------- Middlewares -----------------
// 1. Izinkan CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin: process.env.CLIENT_URL === '*' ? '*' : (process.env.CLIENT_URL || '*'),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Parser JSON dan URL-encoded Form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Static File Server untuk Folder Uploads (Akses gambar langsung via URL)
// Contoh akses: http://localhost:5000/uploads/plants/1712345678-monstera.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ----------------- API Routes -----------------
// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Backend Bintang Jaya Farm berjalan dengan baik.',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/plants', plantRoutes);
app.use('/api/orders', orderRoutes);

// Root Fallback Info
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; text-align: center; padding: 40px;">
      <h1 style="color: #175e46;">🌿 Bintang Jaya Farm Backend API</h1>
      <p>Server Express & Manajemen Upload Gambar aktif di Port <strong>${PORT}</strong>.</p>
      <p>Akses endpoint katalog: <a href="/api/plants">/api/plants</a></p>
      <p>Health check: <a href="/api/health">/api/health</a></p>
    </div>
  `);
});

// ----------------- Error Handling -----------------
app.use(errorHandler);

// Jalankan Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🌿 Bintang Jaya Farm Backend Server Aktif`);
  console.log(`📍 URL Server      : http://localhost:${PORT}`);
  console.log(`📁 Uploads Folder  : ${uploadsDir}`);
  console.log(`📡 Health Check    : http://localhost:${PORT}/api/health`);
  console.log(`📦 API Plants      : http://localhost:${PORT}/api/plants`);
  console.log(`=======================================================`);
});
