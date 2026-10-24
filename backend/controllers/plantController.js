const path = require('path');
const fs = require('fs');

const dataFilePath = path.join(__dirname, '../data/plants.json');

// Helper untuk membaca data tanaman
const readPlantsData = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Gagal membaca data tanaman:', error);
    return [];
  }
};

// Helper untuk menyimpan data tanaman
const savePlantsData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Gagal menulis data tanaman:', error);
    return false;
  }
};

/**
 * @desc    Ambil semua tanaman (dengan opsi filter & pencarian)
 * @route   GET /api/plants
 */
const getPlants = (req, res) => {
  try {
    let plants = readPlantsData();
    const { category, search, budget } = req.query;

    // Filter Kategori
    if (category && category !== 'all') {
      plants = plants.filter(p => p.category && p.category.includes(category));
    }

    // Filter Budget
    if (budget) {
      if (budget === 'under50') {
        plants = plants.filter(p => p.price < 50000);
      } else if (budget === '50to150') {
        plants = plants.filter(p => p.price >= 50000 && p.price <= 150000);
      } else if (budget === 'above150') {
        plants = plants.filter(p => p.price > 150000);
      }
    }

    // Filter Pencarian Keyword
    if (search) {
      const q = search.trim().toLowerCase();
      plants = plants.filter(p => 
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.scientific && p.scientific.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    res.status(200).json({
      success: true,
      count: plants.length,
      data: plants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal memuat data katalog tanaman.',
      error: error.message
    });
  }
};

/**
 * @desc    Ambil detail 1 tanaman berdasarkan ID
 * @route   GET /api/plants/:id
 */
const getPlantById = (req, res) => {
  try {
    const plants = readPlantsData();
    const plantId = parseInt(req.params.id);
    const plant = plants.find(p => p.id === plantId);

    if (!plant) {
      return res.status(404).json({
        success: false,
        message: `Tanaman dengan ID ${req.params.id} tidak ditemukan.`
      });
    }

    res.status(200).json({
      success: true,
      data: plant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil detail tanaman.',
      error: error.message
    });
  }
};

/**
 * @desc    Upload gambar saja (Standalone Image Upload)
 * @route   POST /api/plants/upload
 */
const uploadPlantImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Tidak ada file gambar yang diunggah. Mohon pilih file gambar.'
      });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/plants/${req.file.filename}`;

    res.status(201).json({
      success: true,
      message: 'Gambar berhasil diupload.',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: fileUrl
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengupload gambar.',
      error: error.message
    });
  }
};

/**
 * @desc    Tambah tanaman baru (bisa dengan upload gambar langsung atau image URL)
 * @route   POST /api/plants
 */
const createPlant = (req, res) => {
  try {
    const plants = readPlantsData();
    const {
      name,
      scientific,
      category,
      price,
      badge,
      badgeClass,
      sunlight,
      water,
      difficulty,
      size,
      description,
      imageUrl
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Nama tanaman dan harga wajib diisi!'
      });
    }

    // Tentukan URL gambar: dari file upload atau link manual
    let finalImageUrl = imageUrl || '';
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      finalImageUrl = `${baseUrl}/uploads/plants/${req.file.filename}`;
    }

    // Format kategori menjadi array
    let categories = [];
    if (Array.isArray(category)) {
      categories = category;
    } else if (typeof category === 'string') {
      categories = category.split(',').map(c => c.trim().toLowerCase());
    }

    const newId = plants.length > 0 ? Math.max(...plants.map(p => p.id)) + 1 : 1;

    const newPlant = {
      id: newId,
      name,
      scientific: scientific || '',
      category: categories.length > 0 ? categories : ['indoor'],
      price: parseInt(price) || 0,
      badge: badge || 'Pilihan Baru',
      badgeClass: badgeClass || 'badge-pemula',
      image: finalImageUrl || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80',
      sunlight: sunlight || 'Cahaya Sedang',
      water: water || '2-3 Hari Sekali',
      difficulty: difficulty || 'Mudah',
      size: size || 'Tinggi 30 - 50 cm',
      description: description || ''
    };

    plants.push(newPlant);
    savePlantsData(plants);

    res.status(201).json({
      success: true,
      message: 'Tanaman baru berhasil ditambahkan ke katalog!',
      data: newPlant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menambahkan tanaman baru.',
      error: error.message
    });
  }
};

/**
 * @desc    Hapus tanaman berdasarkan ID
 * @route   DELETE /api/plants/:id
 */
const deletePlant = (req, res) => {
  try {
    let plants = readPlantsData();
    const plantId = parseInt(req.params.id);
    const plantIndex = plants.findIndex(p => p.id === plantId);

    if (plantIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Tanaman dengan ID ${req.params.id} tidak ditemukan.`
      });
    }

    const deletedPlant = plants[plantIndex];

    // Hapus file fisik gambar jika tersimpan di folder uploads lokal
    if (deletedPlant.image && deletedPlant.image.includes('/uploads/plants/')) {
      const filename = path.basename(deletedPlant.image);
      const filePath = path.join(__dirname, '../uploads/plants', filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.warn('Gagal menghapus file gambar lokal:', err.message);
        }
      }
    }

    plants.splice(plantIndex, 1);
    savePlantsData(plants);

    res.status(200).json({
      success: true,
      message: `Tanaman "${deletedPlant.name}" berhasil dihapus dari katalog.`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus tanaman.',
      error: error.message
    });
  }
};

module.exports = {
  getPlants,
  getPlantById,
  uploadPlantImage,
  createPlant,
  deletePlant
};
