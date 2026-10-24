/**
 * Bintang Jaya Farm - Interactive Landing Page Logic
 * Features: Catalog filtering, live search, budget sorting, interactive quiz wizard,
 * WhatsApp message generator, detail modal, mobile drawer, toast feedback.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ----------------- 1. PLANT CATALOG DATA -----------------
  const plantsData = [
    {
      id: 1,
      name: "Monstera Deliciosa King",
      scientific: "Monstera deliciosa",
      category: ["indoor", "air-purifier"],
      price: 85000,
      badge: "Best Seller",
      badgeClass: "badge-populer",
      image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80",
      sunlight: "Terang Tak Langsung",
      water: "2-3 Hari Sekali",
      difficulty: "Mudah",
      size: "Tinggi 45 - 60 cm",
      description: "Tanaman hias tropis ikonik berdaun sobek artistik. Sangat digemari untuk dekorasi ruang tamu, kamar tidur bernuansa Skandinavia, serta sudut kantor modern. Efektif membantu sirkulasi udara bersih."
    },
    {
      id: 2,
      name: "Sansevieria Trifasciata (Lidah Mertua)",
      scientific: "Dracaena trifasciata",
      category: ["indoor", "outdoor", "air-purifier", "low-maintenance"],
      price: 45000,
      badge: "Paling Tangguh",
      badgeClass: "badge-purifier",
      image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80",
      sunlight: "Teduh hingga Terik",
      water: "1 Minggu Sekali",
      difficulty: "Sangat Mudah",
      size: "Tinggi 40 - 70 cm",
      description: "Pembersih udara nomor satu rekomendasi NASA yang mampu menyerap racun formaldehyde, benzena, dan karbon monoksida. Sangat bandel, tidak gampang mati meski jarang disiram."
    },
    {
      id: 3,
      name: "Aglaonema Suksom Jaipong",
      scientific: "Aglaonema sp.",
      category: ["indoor", "koleksi"],
      price: 135000,
      badge: "Warna Mewah",
      badgeClass: "badge-rare",
      image: "https://images.unsplash.com/photo-1599685315640-9ceab2f58944?auto=format&fit=crop&w=700&q=80",
      sunlight: "Cahaya Sedang",
      water: "2 Hari Sekali",
      difficulty: "Sedang",
      size: "Tinggi 25 - 35 cm",
      description: "Dikenal sebagai 'Ratu Tanaman Hias Daun' dengan warna merah menyala yang sangat solid dan kontras. Memberikan sentuhan elegan dan kemewahan alami di atas meja kerja atau credenza ruang tamu."
    },
    {
      id: 4,
      name: "Philodendron Birkin",
      scientific: "Philodendron 'Birkin'",
      category: ["indoor", "koleksi"],
      price: 95000,
      badge: "Variegata Populer",
      badgeClass: "badge-populer",
      image: "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=700&q=80",
      sunlight: "Terang Teduh",
      water: "3 Hari Sekali",
      difficulty: "Mudah",
      size: "Tinggi 30 - 40 cm",
      description: "Pesona garis-garis putih krem yang tegas di atas daun hijau gelap mengkilap. Pertumbuhannya kompak dan rapi, menjadikannya pilihan favorit untuk diletakkan di coffee table atau meja rias."
    },
    {
      id: 5,
      name: "Sirih Gading (Golden Pothos)",
      scientific: "Epipremnum aureum",
      category: ["indoor", "air-purifier", "low-maintenance"],
      price: 35000,
      badge: "Ramah Pemula",
      badgeClass: "badge-pemula",
      image: "https://images.unsplash.com/photo-1596724803693-e4d0d17d5913?auto=format&fit=crop&w=700&q=80",
      sunlight: "Bebas / Fleksibel",
      water: "2-3 Hari Sekali",
      difficulty: "Sangat Mudah",
      size: "Menjuntai 50 - 100 cm",
      description: "Tanaman gantung dan rambat paling adaptif. Dapat ditanam di pot gantung atau vas air tanpa tanah (water propagation). Menjadikan rak dinding atau partisi ruangan tampak asri dan segar."
    },
    {
      id: 6,
      name: "Calathea Orbifolia",
      scientific: "Goeppertia orbifolia",
      category: ["indoor", "koleksi"],
      price: 125000,
      badge: "Artistika Daun",
      badgeClass: "badge-rare",
      image: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=700&q=80",
      sunlight: "Teduh Lembap",
      water: "2 Hari Sekali",
      difficulty: "Sedang",
      size: "Tinggi 35 - 50 cm",
      description: "Memiliki daun bulat besar seperti kipas dengan motif garis perak-hijau yang memukau. Dikenal sebagai tanaman doa (prayer plant) yang bergerak lembut mengikuti rotasi siang dan malam."
    },
    {
      id: 7,
      name: "Bonsai Beringin Dolar Korea",
      scientific: "Ficus microcarpa 'Kimeng'",
      category: ["outdoor", "koleksi"],
      price: 275000,
      badge: "Koleksi Eksklusif",
      badgeClass: "badge-rare",
      image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=700&q=80",
      sunlight: "Matahari Penuh",
      water: "Setiap Hari",
      difficulty: "Sedang",
      size: "Tinggi 50 - 80 cm",
      description: "Bonsai berkarakter kokoh dengan perakaran artistik dan daun bulat mengkilap tebal. Sangat cocok diletakkan di teras utama, taman depan rumah, atau lobi untuk memberikan aura kewibawaan dan kemakmuran."
    },
    {
      id: 8,
      name: "Pachira Aquatica (Pohon Uang)",
      scientific: "Pachira aquatica",
      category: ["indoor", "outdoor", "low-maintenance"],
      price: 110000,
      badge: "Simbol Rezeki",
      badgeClass: "badge-populer",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80",
      sunlight: "Terang Tak Langsung",
      water: "3-4 Hari Sekali",
      difficulty: "Mudah",
      size: "Tinggi 40 - 65 cm",
      description: "Tanaman dengan batang berkepang artistik yang melambangkan kemakmuran dan energi positif (Feng Shui). Tahan dalam ruangan berpendingin udara dan perawatannya sangat praktis."
    }
  ];

  // Store WhatsApp Phone Number
  const STORE_PHONE = "6281234567890";

  // ----------------- 2. DOM ELEMENTS -----------------
  const plantGrid = document.getElementById('plantGrid');
  const plantSearchInput = document.getElementById('plantSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const categoryTabs = document.querySelectorAll('.cat-tab');
  const budgetFilter = document.getElementById('budgetFilter');
  const emptyCatalogState = document.getElementById('emptyCatalogState');
  const resetCatalogFilterBtn = document.getElementById('resetCatalogFilterBtn');

  // Plant Detail Modal Elements
  const plantModal = document.getElementById('plantModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBodyContent = document.getElementById('modalBodyContent');

  // Order & WhatsApp Form
  const orderForm = document.getElementById('orderForm');
  const plantInterestSelect = document.getElementById('plantInterest');

  // Mobile Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  // Sticky Navbar & Scroll Top
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const topBar = document.getElementById('topBar');
  const closeTopBarBtn = document.getElementById('closeTopBarBtn');

  // Plant Finder Wizard
  const plantFinderForm = document.getElementById('plantFinderForm');
  const resultCardContent = document.getElementById('resultCardContent');

  // Current year in footer
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Active filter state
  let currentCategory = 'all';
  let currentBudget = 'all';
  let searchQuery = '';

  // ----------------- 3. CATALOG RENDERING -----------------
  function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number);
  }

  function renderPlantCard(plant) {
    return `
      <article class="plant-card" data-id="${plant.id}">
        <div class="plant-card-media">
          <img src="${plant.image}" alt="${plant.name}" class="plant-card-img" loading="lazy">
          <span class="card-badge ${plant.badgeClass}">${plant.badge}</span>
          <button class="quick-view-overlay-btn btn-quick-view" data-id="${plant.id}" title="Lihat Detail Cepat" aria-label="Lihat detail ${plant.name}">
            <i class="fa-solid fa-expand"></i>
          </button>
        </div>
        <div class="plant-card-body">
          <span class="plant-card-category">${plant.category.join(' • ')}</span>
          <h3 class="plant-card-title">${plant.name}</h3>
          <p class="plant-card-scientific">${plant.scientific}</p>
          
          <div class="care-specs-row">
            <span class="care-spec-tag" title="Kebutuhan Cahaya">
              <i class="fa-solid fa-sun"></i> ${plant.sunlight}
            </span>
            <span class="care-spec-tag" title="Frekuensi Penyiraman">
              <i class="fa-solid fa-droplet"></i> ${plant.water}
            </span>
          </div>

          <div class="plant-card-foot">
            <div class="card-price-amount">${formatRupiah(plant.price)}</div>
            <div class="card-actions-group">
              <button class="btn btn-outline-sm btn-quick-view" data-id="${plant.id}" aria-label="Detail ${plant.name}">
                Detail
              </button>
              <a href="https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(`Halo Bintang Jaya Farm, saya tertarik memesan ${plant.name} (${formatRupiah(plant.price)}). Apakah stok masih tersedia?`)}" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 class="btn-whatsapp-card"
                 title="Pesan via WhatsApp">
                <i class="fa-brands fa-whatsapp"></i> Pesan
              </a>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function filterAndDisplayPlants() {
    const filtered = plantsData.filter(plant => {
      // Category match
      const matchesCategory = (currentCategory === 'all') || plant.category.includes(currentCategory);

      // Budget match
      let matchesBudget = true;
      if (currentBudget === 'under50') {
        matchesBudget = plant.price < 50000;
      } else if (currentBudget === '50to150') {
        matchesBudget = plant.price >= 50000 && plant.price <= 150000;
      } else if (currentBudget === 'above150') {
        matchesBudget = plant.price > 150000;
      }

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        plant.name.toLowerCase().includes(query) || 
        plant.scientific.toLowerCase().includes(query) ||
        plant.description.toLowerCase().includes(query);

      return matchesCategory && matchesBudget && matchesSearch;
    });

    if (filtered.length > 0) {
      plantGrid.innerHTML = filtered.map(renderPlantCard).join('');
      emptyCatalogState.classList.add('hidden');
      attachCardEventListeners();
    } else {
      plantGrid.innerHTML = '';
      emptyCatalogState.classList.remove('hidden');
    }
  }

  // ----------------- 4. CATALOG FILTER LISTENERS -----------------
  // Category tabs
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      // Smoothly scroll active tab into view horizontally on mobile
      tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      filterAndDisplayPlants();
    });
  });

  // Footer category links
  document.querySelectorAll('.cat-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const cat = link.dataset.cat;
      if (cat) {
        currentCategory = cat;
        categoryTabs.forEach(tab => {
          if (tab.dataset.category === cat) {
            tab.classList.add('active');
          } else {
            tab.classList.remove('active');
          }
        });
        filterAndDisplayPlants();
      }
    });
  });

  // Budget select
  if (budgetFilter) {
    budgetFilter.addEventListener('change', (e) => {
      currentBudget = e.target.value;
      filterAndDisplayPlants();
    });
  }

  // Search input
  if (plantSearchInput) {
    plantSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchQuery.trim().length > 0) {
        clearSearchBtn.classList.add('active');
      } else {
        clearSearchBtn.classList.remove('active');
      }
      filterAndDisplayPlants();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      plantSearchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.remove('active');
      filterAndDisplayPlants();
      plantSearchInput.focus();
    });
  }

  if (resetCatalogFilterBtn) {
    resetCatalogFilterBtn.addEventListener('click', () => {
      currentCategory = 'all';
      currentBudget = 'all';
      searchQuery = '';
      if (plantSearchInput) plantSearchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.classList.remove('active');
      if (budgetFilter) budgetFilter.value = 'all';
      categoryTabs.forEach(t => t.classList.toggle('active', t.dataset.category === 'all'));
      filterAndDisplayPlants();
    });
  }

  // ----------------- 5. PLANT DETAIL MODAL -----------------
  function openPlantModal(plantId) {
    const plant = plantsData.find(p => p.id === parseInt(plantId));
    if (!plant) return;

    modalBodyContent.innerHTML = `
      <div class="modal-grid">
        <div class="modal-media">
          <img src="${plant.image}" alt="${plant.name}" class="modal-img">
        </div>
        <div class="modal-details">
          <span class="modal-cat">${plant.category.join(' • ')}</span>
          <h2 class="modal-title">${plant.name}</h2>
          <div class="modal-scientific">${plant.scientific}</div>
          <p class="modal-desc">${plant.description}</p>

          <div class="specs-grid">
            <div class="spec-cell">
              <i class="fa-solid fa-sun"></i>
              <div>
                <span>Cahaya</span>
                <strong>${plant.sunlight}</strong>
              </div>
            </div>
            <div class="spec-cell">
              <i class="fa-solid fa-droplet"></i>
              <div>
                <span>Penyiraman</span>
                <strong>${plant.water}</strong>
              </div>
            </div>
            <div class="spec-cell">
              <i class="fa-solid fa-gauge-simple-high"></i>
              <div>
                <span>Tingkat Rawat</span>
                <strong>${plant.difficulty}</strong>
              </div>
            </div>
            <div class="spec-cell">
              <i class="fa-solid fa-ruler-vertical"></i>
              <div>
                <span>Ukuran Rata-rata</span>
                <strong>${plant.size}</strong>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="price-box">
              <span class="price-label">Harga Satuan</span>
              <span class="price-val">${formatRupiah(plant.price)}</span>
            </div>
            <a href="https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(`Halo Bintang Jaya Farm, saya ingin memesan tanaman ${plant.name} (${formatRupiah(plant.price)}). Mohon petunjuk pemesanan dan pengirimannya.`)}" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="btn btn-whatsapp-inquiry">
              <i class="fa-brands fa-whatsapp"></i> Pesan Tanaman Ini
            </a>
          </div>
        </div>
      </div>
    `;

    plantModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePlantModal() {
    plantModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function attachCardEventListeners() {
    const quickViewBtns = document.querySelectorAll('.btn-quick-view');
    quickViewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        openPlantModal(id);
      });
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closePlantModal);
  }

  if (plantModal) {
    plantModal.addEventListener('click', (e) => {
      if (e.target === plantModal) {
        closePlantModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && plantModal.classList.contains('active')) {
      closePlantModal();
    }
  });

  // ----------------- 6. PLANT FINDER QUIZ LOGIC -----------------
  const recommendations = [
    {
      location: 'indoor',
      light: 'low',
      care: 'easy',
      name: 'Sansevieria Trifasciata (Lidah Mertua)',
      price: 'Rp 45.000',
      reason: 'Sangat toleran cahaya redup, pembersih udara nomor 1, dan tahan berminggu-minggu tanpa air.',
      image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80',
      badge: 'Solusi Anti Ribet'
    },
    {
      location: 'meja',
      light: 'medium',
      care: 'easy',
      name: 'Sirih Gading (Golden Pothos)',
      price: 'Rp 35.000',
      reason: 'Bentuk juntaian daun segar yang menenangkan pandangan saat bekerja di depan layar komputer.',
      image: 'https://images.unsplash.com/photo-1596724803693-e4d0d17d5913?auto=format&fit=crop&w=600&q=80',
      badge: 'Penyegar Meja Kerja'
    },
    {
      location: 'indoor',
      light: 'medium',
      care: 'regular',
      name: 'Monstera Deliciosa King',
      price: 'Rp 85.000',
      reason: 'Menciptakan nuansa urban jungle berkelas di sudut ruang tamu atau kamar tidur Anda.',
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80',
      badge: 'Favorit Desain Interior'
    },
    {
      location: 'indoor',
      light: 'medium',
      care: 'hobby',
      name: 'Aglaonema Suksom Jaipong',
      price: 'Rp 135.000',
      reason: 'Daun merah merona yang eksotis, cocok untuk Anda yang menikmati seni merawat daun hias bernilai tinggi.',
      image: 'https://images.unsplash.com/photo-1599685315640-9ceab2f58944?auto=format&fit=crop&w=600&q=80',
      badge: 'Koleksi Estetik'
    },
    {
      location: 'outdoor',
      light: 'high',
      care: 'regular',
      name: 'Bonsai Beringin Dolar Korea',
      price: 'Rp 275.000',
      reason: 'Sangat menyukai sinar matahari terik, memberi kesan megah dan keteduhan di halaman depan rumah.',
      image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=600&q=80',
      badge: 'Halaman & Teras Megah'
    }
  ];

  function updateFinderRecommendation() {
    const loc = plantFinderForm.querySelector('input[name="location"]:checked')?.value || 'indoor';
    const light = plantFinderForm.querySelector('input[name="light"]:checked')?.value || 'low';
    const care = plantFinderForm.querySelector('input[name="care"]:checked')?.value || 'easy';

    // Find best match or fallback
    let match = recommendations.find(r => r.location === loc && r.light === light && r.care === care);
    if (!match) {
      match = recommendations.find(r => r.location === loc) || recommendations[0];
    }

    resultCardContent.innerHTML = `
      <div class="result-image-box">
        <img src="${match.image}" alt="${match.name}" loading="lazy">
      </div>
      <div class="result-details">
        <span class="result-badge"><i class="fa-solid fa-sparkles"></i> ${match.badge}</span>
        <h3 class="result-title">${match.name}</h3>
        <p class="result-desc">${match.reason}</p>
        <div class="result-perks">
          <span class="result-perk-item"><i class="fa-solid fa-tag"></i> Estimasi: ${match.price}</span>
          <span class="result-perk-item"><i class="fa-solid fa-shield-check"></i> Siap Kirim Hari Ini</span>
        </div>
        <div class="result-actions">
          <a href="https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(`Halo Bintang Jaya Farm, dari kuis rekomendasi di website, tanaman yang cocok untuk ruangan saya adalah: ${match.name}. Apakah stoknya tersedia?`)}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn btn-whatsapp-inquiry">
            <i class="fa-brands fa-whatsapp"></i> Tanya Tanaman Ini di WhatsApp
          </a>
        </div>
      </div>
    `;
  }

  if (plantFinderForm) {
    plantFinderForm.addEventListener('change', updateFinderRecommendation);
    updateFinderRecommendation(); // initial render
  }

  // ----------------- 7. FAQ ACCORDION -----------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other accordions
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ----------------- 8. DIRECT ORDER FORM & WHATSAPP GENERATOR -----------------
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('userName').value.trim();
      const city = document.getElementById('userCity').value.trim();
      const budget = document.getElementById('userBudget').value;
      const interest = document.getElementById('plantInterest').value;
      const notes = document.getElementById('userNotes').value.trim();

      if (!name || !city) {
        showToast("Mohon lengkapi nama dan kota Anda!", "warning");
        return;
      }

      // Compose WhatsApp formatted text
      const waMessage = 
`*PESANAN & KONSULTASI - BINTANG JAYA FARM*
----------------------------------------
🌿 *Nama:* ${name}
📍 *Kota/Lokasi:* ${city}
🌱 *Minat Tanaman/Layanan:* ${interest}
💰 *Perkiraan Budget:* ${budget}
📝 *Catatan/Kebutuhan Ruang:* ${notes || "-"}
----------------------------------------
Halo tim Bintang Jaya Farm, mohon informasi ketersediaan, foto real tanaman, dan total ongkirnya. Terima kasih!`;

      const targetUrl = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(waMessage)}`;

      showToast("Membuka WhatsApp untuk mengirim pesan...", "success");

      setTimeout(() => {
        window.open(targetUrl, '_blank');
      }, 500);
    });
  }

  // ----------------- 9. MOBILE DRAWER NAVIGATION -----------------
  function openMobileMenu() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileMenu);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Auto-close drawer on viewport resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && mobileDrawer.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // ----------------- 10. SCROLL EFFECTS & NAVBAR -----------------
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Sticky navbar shadow
    if (scrollPos > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll to top button visibility
    if (scrollPos > 350) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Announcement Bar Close
  if (closeTopBarBtn && topBar) {
    closeTopBarBtn.addEventListener('click', () => {
      topBar.style.display = 'none';
    });
  }

  // ----------------- 11. TOAST NOTIFICATION UTILITY -----------------
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let icon = 'fa-circle-check';
    if (type === 'warning') icon = 'fa-triangle-exclamation';
    if (type === 'error') icon = 'fa-circle-xmark';

    toast.innerHTML = `
      <i class="fa-solid ${icon}" style="color: var(--primary-main); font-size: 1.1rem;"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Initialize catalog
  filterAndDisplayPlants();
});
