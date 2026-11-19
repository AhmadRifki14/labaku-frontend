// Helper membuat ilustrasi SVG placeholder bersih sesuai wireframe Figma
function buatGambarPlaceholder(label, besar = false) {
  const ukuran = besar ? "18" : "15";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
    <rect width="480" height="320" fill="#E2E5E9"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="${ukuran}" fill="#111827">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Data Awal Katalog & Aktivitas
const dataBarang = [
  {
    id: 1,
    nama: "ESP32 DevKit V1 + Kabel Jumper",
    kategori: "Perangkat Keras & IoT",
    penawaran: "HIBAH / GRATIS",
    status: "Tersedia",
    pemilik: "Mahasiswa Teknologi Informasi · Sem 5 (Terverifikasi)",
    pemilikSingkat: "Mahasiswa TI (Sem 5)",
    lokasi: "Lobi Utama Kampus / Depan Lab Komputer",
    lokasiSingkat: "Lobi Utama Kampus",
    deskripsi: "Bekas praktikum mata kuliah IoT semester lalu. Pin masih lurus semua, sudah dites upload program Blink normal. Bonus 20 pcs kabel jumper male-to-female.",
    fotoKecil: buatGambarPlaceholder("[ Foto ESP32 DevKit ]"),
    fotoBesar: buatGambarPlaceholder("[ Foto Besar: ESP32 DevKit V1 + Kabel Jumper ]", true)
  },
  {
    id: 2,
    nama: "Crimping Tool & LAN Tester",
    kategori: "Perangkat Keras & Jaringan",
    penawaran: "Rp. 35.000",
    status: "Tersedia",
    pemilik: "Mahasiswa Teknologi Informasi · Sem 3 (Terverifikasi)",
    pemilikSingkat: "Mahasiswa TI (Sem 3)",
    lokasi: "Lab Jaringan",
    lokasiSingkat: "Lab Jaringan",
    deskripsi: "Tang crimping RJ45/RJ11 beserta LAN tester 8-pin dengan baterai terpasang. Cocok untuk praktikum jaringan komputer dan instalasi kabel UTP.",
    fotoKecil: buatGambarPlaceholder("[ Foto Crimping Tool ]"),
    fotoBesar: buatGambarPlaceholder("[ Foto Besar: Crimping Tool & LAN Tester ]", true)
  },
  {
    id: 3,
    nama: "Modul Praktikum Basis Data & Jaringan",
    kategori: "Modul & Catatan",
    penawaran: "HIBAH / GRATIS",
    status: "Dibooking",
    pemilik: "Mahasiswa Teknologi Informasi · Sem 5 (Terverifikasi)",
    pemilikSingkat: "Mahasiswa TI (Sem 5)",
    lokasi: "Perpustakaan",
    lokasiSingkat: "Perpustakaan",
    deskripsi: "Kumpulan modul cetak praktikum Basis Data SQL dan Jaringan Komputer lengkap dengan catatan rangkuman ujian tengah semester.",
    fotoKecil: buatGambarPlaceholder("[ Foto Modul Praktikum ]"),
    fotoBesar: buatGambarPlaceholder("[ Foto Besar: Modul Praktikum Basis Data & Jaringan ]", true)
  }
];

const aktivitasDibooking = [
  {
    id: 101,
    nama: "ESP32 DevKit V1 + Kabel Jumper",
    statusBadge: "Menunggu Serah Terima",
    keterangan: "Pemilik: Mahasiswa TI (Sem 5) · Titik temu: Lobi Utama Kampus",
    foto: buatGambarPlaceholder("[ Foto ESP32 ]")
  }
];

const aktivitasDioper = [
  {
    id: 201,
    nama: "Kabel LAN Cat6 5 Meter + RJ45",
    statusBadge: "Tersedia di Katalog",
    keterangan: "Penawaran: HIBAH / GRATIS · Titik temu: Gedung Rektorat Lt. 1",
    foto: buatGambarPlaceholder("[ Foto Kabel LAN ]")
  },
  {
    id: 202,
    nama: "Buku Algoritma & Pemrograman Dasar",
    statusBadge: "Sedang Dipesan Peminjam",
    keterangan: "Penawaran: HIBAH / GRATIS · Titik temu: Kantin Utama Kampus",
    foto: buatGambarPlaceholder("[ Foto Buku ]")
  }
];

let kategoriAktif = "Semua";
let kataKunci = "";
let barangDipilih = dataBarang[0];
let tabAktif = "dibooking";
let idKonfirmasiAktif = null;

// Navigasi Antar 4 Halaman
const semuaHalaman = {
  katalog: document.getElementById("halaman-katalog"),
  detail: document.getElementById("halaman-detail"),
  unggah: document.getElementById("halaman-unggah"),
  aktivitas: document.getElementById("halaman-aktivitas")
};

function bukaHalaman(namaHalaman) {
  Object.entries(semuaHalaman).forEach(([kunci, elemen]) => {
    const aktif = kunci === namaHalaman;
    elemen.hidden = !aktif;
    elemen.classList.toggle("aktif", aktif);
  });

  document.querySelectorAll(".tautan-nav").forEach((tautan) => {
    tautan.classList.toggle("aktif", tautan.dataset.halaman === namaHalaman);
  });

  // Tutup menu mobile jika terbuka
  menuUtama.classList.remove("terbuka");
  tombolMenu.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", (event) => {
  const pemicu = event.target.closest("[data-halaman]");
  if (!pemicu) return;
  event.preventDefault();
  bukaHalaman(pemicu.dataset.halaman);
});

// Toggle Menu Mobile & Escape
const tombolMenu = document.getElementById("tombol-menu");
const menuUtama = document.getElementById("menu-utama");

tombolMenu.addEventListener("click", () => {
  const terbuka = tombolMenu.getAttribute("aria-expanded") === "true";
  menuUtama.classList.toggle("terbuka", !terbuka);
  tombolMenu.setAttribute("aria-expanded", String(!terbuka));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && tombolMenu.getAttribute("aria-expanded") === "true") {
    menuUtama.classList.remove("terbuka");
    tombolMenu.setAttribute("aria-expanded", "false");
    tombolMenu.focus();
  }
});

// Render Halaman 1: Katalog Barang
const daftarKatalog = document.getElementById("daftar-katalog");

function renderKatalog() {
  daftarKatalog.textContent = "";

  const hasilFilter = dataBarang.filter((item) => {
    const cocokKategori = kategoriAktif === "Semua" || item.kategori === kategoriAktif;
    const cocokCari = item.nama.toLowerCase().includes(kataKunci.toLowerCase());
    return cocokKategori && cocokCari;
  });

  if (hasilFilter.length === 0) {
    const kosong = document.createElement("p");
    kosong.textContent = "Tidak ada barang yang sesuai dengan pencarianmu.";
    daftarKatalog.appendChild(kosong);
    return;
  }

  hasilFilter.forEach((item) => {
    const artikel = document.createElement("article");
    artikel.className = "kartu";
    artikel.tabIndex = 0;
    artikel.setAttribute("role", "button");
    artikel.setAttribute("aria-label", `Lihat detail ${item.nama}`);

    const kotakFoto = document.createElement("div");
    kotakFoto.className = "kartu-gambar";
    const img = document.createElement("img");
    img.src = item.fotoKecil;
    img.alt = `Foto ${item.nama}`;
    kotakFoto.appendChild(img);

    const barisLencana = document.createElement("div");
    barisLencana.className = "baris-lencana";

    const badgeHarga = document.createElement("span");
    badgeHarga.className = "lencana";
    badgeHarga.textContent = item.penawaran;

    const badgeStatus = document.createElement("span");
    badgeStatus.className = "lencana";
    badgeStatus.textContent = `Status: ${item.status}`;

    barisLencana.append(badgeHarga, badgeStatus);

    const judul = document.createElement("h2");
    judul.textContent = item.nama;

    const metaPemilik = document.createElement("p");
    metaPemilik.className = "kartu-meta";
    metaPemilik.textContent = `Oleh: ${item.pemilikSingkat}`;

    const metaLokasi = document.createElement("p");
    metaLokasi.className = "kartu-meta";
    metaLokasi.textContent = `Titik temu: ${item.lokasiSingkat}`;

    artikel.append(kotakFoto, barisLencana, judul, metaPemilik, metaLokasi);

    const bukaDetailItem = () => {
      tampilkanDetailBarang(item);
      bukaHalaman("detail");
    };

    artikel.addEventListener("click", bukaDetailItem);
    artikel.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        bukaDetailItem();
      }
    });

    daftarKatalog.appendChild(artikel);
  });
}

// Pencarian & Chip Kategori
document.getElementById("form-cari").addEventListener("submit", (e) => {
  e.preventDefault();
  kataKunci = document.getElementById("input-cari").value.trim();
  renderKatalog();
});

document.getElementById("input-cari").addEventListener("input", (e) => {
  kataKunci = e.target.value.trim();
  renderKatalog();
});

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("aktif"));
    chip.classList.add("aktif");
    kategoriAktif = chip.dataset.kategori;
    renderKatalog();
  });
});

// Halaman 2: Detail Barang & Booking
const statusBooking = document.getElementById("status-booking");

function tampilkanDetailBarang(item) {
  barangDipilih = item;
  statusBooking.textContent = "";
  const imgDetail = document.getElementById("detail-foto");
  imgDetail.src = item.fotoBesar;
  imgDetail.alt = `Foto detail ${item.nama}`;

  document.getElementById("detail-harga").textContent = item.penawaran;
  document.getElementById("detail-status").textContent = `Status: ${item.status}`;
  document.getElementById("detail-nama").textContent = item.nama;
  document.getElementById("detail-pemilik").textContent = `Pemilik: ${item.pemilik}`;
  document.getElementById("detail-lokasi").textContent = `Titik Temu Disarankan: ${item.lokasi}`;
  document.getElementById("detail-deskripsi").textContent = item.deskripsi;
}

document.getElementById("tombol-booking").addEventListener("click", () => {
  if (!barangDipilih) return;
  barangDipilih.status = "Dibooking";
  document.getElementById("detail-status").textContent = "Status: Dibooking";

  aktivitasDibooking.unshift({
    id: Date.now(),
    nama: barangDipilih.nama,
    statusBadge: "Menunggu Serah Terima",
    keterangan: `Pemilik: ${barangDipilih.pemilikSingkat} · Titik temu: ${barangDipilih.lokasiSingkat}`,
    foto: barangDipilih.fotoKecil
  });

  renderKatalog();
  renderAktivitas();
  statusBooking.textContent = "Berhasil dibooking! Barang ditambahkan ke halaman Aktivitas Saya.";
});

// Halaman 3: Unggah Barang Baru
const inputFoto = document.getElementById("unggah-foto");
const teksFileFoto = document.getElementById("teks-file-foto");

inputFoto.addEventListener("change", () => {
  if (inputFoto.files && inputFoto.files[0]) {
    teksFileFoto.textContent = `Berkas dipilih: ${inputFoto.files[0].name}`;
  }
});

document.getElementById("form-unggah").addEventListener("submit", (e) => {
  e.preventDefault();

  const nama = document.getElementById("unggah-nama");
  const kategori = document.getElementById("unggah-kategori");
  const penawaran = document.getElementById("unggah-penawaran");
  const kondisi = document.getElementById("unggah-kondisi");
  const lokasi = document.getElementById("unggah-lokasi");
  const statusUnggah = document.getElementById("status-unggah");

  ["galat-nama", "galat-kategori", "galat-kondisi", "galat-lokasi"].forEach((id) => {
    document.getElementById(id).textContent = "";
  });
  [nama, kategori, kondisi, lokasi].forEach((el) => el.removeAttribute("aria-invalid"));
  statusUnggah.textContent = "";

  let fokusPertama = null;

  if (nama.value.trim() === "") {
    document.getElementById("galat-nama").textContent = "Nama barang wajib diisi.";
    nama.setAttribute("aria-invalid", "true");
    fokusPertama = nama;
  }

  if (kategori.value === "") {
    document.getElementById("galat-kategori").textContent = "Pilih kategori barang terlebih dahulu.";
    kategori.setAttribute("aria-invalid", "true");
    if (!fokusPertama) fokusPertama = kategori;
  }

  if (kondisi.value.trim() === "") {
    document.getElementById("galat-kondisi").textContent = "Jelaskan kondisi & kelengkapan barang.";
    kondisi.setAttribute("aria-invalid", "true");
    if (!fokusPertama) fokusPertama = kondisi;
  }

  if (lokasi.value.trim() === "") {
    document.getElementById("galat-lokasi").textContent = "Rekomendasi titik temu wajib diisi.";
    lokasi.setAttribute("aria-invalid", "true");
    if (!fokusPertama) fokusPertama = lokasi;
  }

  if (fokusPertama) {
    fokusPertama.focus();
    return;
  }

  const barangBaru = {
    id: Date.now(),
    nama: nama.value.trim(),
    kategori: kategori.value,
    penawaran: penawaran.value,
    status: "Tersedia",
    pemilik: "Mahasiswa Teknologi Informasi · Saya (Terverifikasi)",
    pemilikSingkat: "Mahasiswa TI (Saya)",
    lokasi: lokasi.value.trim(),
    lokasiSingkat: lokasi.value.trim(),
    deskripsi: kondisi.value.trim(),
    fotoKecil: buatGambarPlaceholder(`[ Foto ${nama.value.trim()} ]`),
    fotoBesar: buatGambarPlaceholder(`[ Foto Besar: ${nama.value.trim()} ]`, true)
  };

  dataBarang.unshift(barangBaru);
  aktivitasDioper.unshift({
    id: barangBaru.id,
    nama: barangBaru.nama,
    statusBadge: "Tersedia di Katalog",
    keterangan: `Penawaran: ${barangBaru.penawaran} · Titik temu: ${barangBaru.lokasiSingkat}`,
    foto: barangBaru.fotoKecil
  });

  e.target.reset();
  teksFileFoto.textContent = "+ Klik atau seret foto asli barang ke sini";
  renderKatalog();
  renderAktivitas();
  statusUnggah.textContent = "Barang berhasil diterbitkan ke katalog!";
});

// Halaman 4: Aktivitas & Transaksi Saya
const daftarAktivitas = document.getElementById("daftar-aktivitas");
const tabDibooking = document.getElementById("tab-dibooking");
const tabDioper = document.getElementById("tab-dioper");
const dialogKonfirmasi = document.getElementById("konfirmasi");
const statusAktivitas = document.getElementById("status-aktivitas");

function renderAktivitas() {
  document.getElementById("hitung-dibooking").textContent = String(aktivitasDibooking.length);
  document.getElementById("hitung-dioper").textContent = String(aktivitasDioper.length);

  daftarAktivitas.textContent = "";
  const sumber = tabAktif === "dibooking" ? aktivitasDibooking : aktivitasDioper;

  sumber.forEach((trx) => {
    const kartu = document.createElement("article");
    kartu.className = "kartu-transaksi";

    const kiri = document.createElement("div");
    kiri.className = "transaksi-kiri";

    const fotoMini = document.createElement("div");
    fotoMini.className = "foto-mini";
    const img = document.createElement("img");
    img.src = trx.foto;
    img.alt = `Foto ${trx.nama}`;
    fotoMini.appendChild(img);

    const info = document.createElement("div");
    info.className = "transaksi-info";

    const badge = document.createElement("span");
    badge.className = "badge-transaksi";
    badge.textContent = trx.statusBadge;

    const judul = document.createElement("h2");
    judul.textContent = trx.nama;

    const ket = document.createElement("p");
    ket.textContent = trx.keterangan;

    info.append(badge, judul, ket);
    kiri.append(fotoMini, info);

    const aksi = document.createElement("div");
    aksi.className = "transaksi-aksi";

    if (tabAktif === "dibooking") {
      const btnChat = document.createElement("button");
      btnChat.type = "button";
      btnChat.className = "tombol-sekunder";
      btnChat.textContent = "Chat Pemilik";
      btnChat.addEventListener("click", () => {
        statusAktivitas.textContent = `Membuka obrolan dengan pemilik untuk barang "${trx.nama}"...`;
      });

      const btnTerima = document.createElement("button");
      btnTerima.type = "button";
      btnTerima.className = "tombol-gelap";
      btnTerima.textContent = "Konfirmasi Barang Diterima";
      btnTerima.disabled = trx.statusBadge === "Selesai Diterima";
      btnTerima.addEventListener("click", () => {
        idKonfirmasiAktif = trx.id;
        dialogKonfirmasi.showModal();
      });

      aksi.append(btnChat, btnTerima);
    } else {
      const btnLihat = document.createElement("button");
      btnLihat.type = "button";
      btnLihat.className = "tombol-sekunder";
      btnLihat.textContent = "Lihat di Katalog";
      btnLihat.addEventListener("click", () => bukaHalaman("katalog"));
      aksi.appendChild(btnLihat);
    }

    kartu.append(kiri, aksi);
    daftarAktivitas.appendChild(kartu);
  });
}

tabDibooking.addEventListener("click", () => {
  tabAktif = "dibooking";
  tabDibooking.classList.add("aktif");
  tabDibooking.setAttribute("aria-selected", "true");
  tabDioper.classList.remove("aktif");
  tabDioper.setAttribute("aria-selected", "false");
  statusAktivitas.textContent = "";
  renderAktivitas();
});

tabDioper.addEventListener("click", () => {
  tabAktif = "dioper";
  tabDioper.classList.add("aktif");
  tabDioper.setAttribute("aria-selected", "true");
  tabDibooking.classList.remove("aktif");
  tabDibooking.setAttribute("aria-selected", "false");
  statusAktivitas.textContent = "";
  renderAktivitas();
});

document.getElementById("tidak").addEventListener("click", () => {
  dialogKonfirmasi.close();
});

document.getElementById("ya").addEventListener("click", () => {
  const item = aktivitasDibooking.find((x) => x.id === idKonfirmasiAktif);
  if (item) {
    item.statusBadge = "Selesai Diterima";
  }
  dialogKonfirmasi.close();
  renderAktivitas();
  statusAktivitas.textContent = "Terima kasih! Serah terima barang telah dikonfirmasi.";
});

// Inisialisasi Awal
renderKatalog();
renderAktivitas();