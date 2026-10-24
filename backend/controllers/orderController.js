const path = require('path');
const fs = require('fs');

const ordersFilePath = path.join(__dirname, '../data/orders.json');
const STORE_PHONE = "6281234567890";

const readOrdersData = () => {
  try {
    if (!fs.existsSync(ordersFilePath)) {
      return [];
    }
    const data = fs.readFileSync(ordersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveOrdersData = (data) => {
  try {
    fs.writeFileSync(ordersFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Gagal menulis data pesanan:', error);
    return false;
  }
};

/**
 * @desc    Simpan pesanan / konsultasi baru & buatkan link WhatsApp
 * @route   POST /api/orders
 */
const createOrder = (req, res) => {
  try {
    const { name, city, budget, interest, notes } = req.body;

    if (!name || !city) {
      return res.status(400).json({
        success: false,
        message: 'Nama dan kota wajib diisi!'
      });
    }

    const orders = readOrdersData();
    const newOrder = {
      id: Date.now(),
      name,
      city,
      budget: budget || 'Menyesuaikan Rekomendasi',
      interest: interest || 'Konsultasi Umum',
      notes: notes || '',
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    saveOrdersData(orders);

    // Format pesan WhatsApp
    const waText = 
`*PESANAN & KONSULTASI - BINTANG JAYA FARM*
----------------------------------------
🌿 *Nama:* ${newOrder.name}
📍 *Kota/Lokasi:* ${newOrder.city}
🌱 *Minat Tanaman/Layanan:* ${newOrder.interest}
💰 *Perkiraan Budget:* ${newOrder.budget}
📝 *Catatan/Kebutuhan Ruang:* ${newOrder.notes || "-"}
----------------------------------------
Halo tim Bintang Jaya Farm, mohon informasi ketersediaan, foto real tanaman, dan total ongkirnya. Terima kasih!`;

    const waUrl = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(waText)}`;

    res.status(201).json({
      success: true,
      message: 'Pemesanan / permintaan konsultasi berhasil dicatat.',
      data: newOrder,
      whatsappUrl: waUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal memproses pesanan.',
      error: error.message
    });
  }
};

/**
 * @desc    Lihat daftar pesanan yang masuk
 * @route   GET /api/orders
 */
const getOrders = (req, res) => {
  try {
    const orders = readOrdersData();
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal memuat data pesanan.',
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getOrders
};
