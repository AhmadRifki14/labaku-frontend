// 1. Komponen Navigasi Utama Responsif (Toggle Menu & Escape)
const tombolMenu = document.getElementById("tombol-menu");
const menuUtama = document.getElementById("menu-utama");

tombolMenu.addEventListener("click", () => {
  const sedangTerbuka = tombolMenu.getAttribute("aria-expanded") === "true";
  menuUtama.hidden = sedangTerbuka;
  tombolMenu.setAttribute("aria-expanded", String(!sedangTerbuka));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && tombolMenu.getAttribute("aria-expanded") === "true") {
    menuUtama.hidden = true;
    tombolMenu.setAttribute("aria-expanded", "false");
    tombolMenu.focus();
  }
});

// 2. Komponen Katalog & Penghitung Daftar Barang
let totalBarang = 0;
const outKeranjang = document.getElementById("jumlah-keranjang");
const tombolTambahKatalog = document.querySelectorAll(".tambah");

tombolTambahKatalog.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    totalBarang += 1;
    outKeranjang.textContent = String(totalBarang);
  });
});

// 3. Komponen Penghitung Durasi Pinjam (Pola State -> Render)
let jumlahHari = 0;
const outJumlah = document.getElementById("jumlah");
const btnKurang = document.getElementById("kurang");
const btnTambah = document.getElementById("tambah");
const btnReset = document.getElementById("reset");

function perbaruiPenghitung() {
  outJumlah.textContent = String(jumlahHari);
  btnKurang.disabled = jumlahHari === 0;
}

btnTambah.addEventListener("click", () => {
  jumlahHari += 1;
  perbaruiPenghitung();
});

btnKurang.addEventListener("click", () => {
  if (jumlahHari > 0) {
    jumlahHari -= 1;
    perbaruiPenghitung();
  }
});

btnReset.addEventListener("click", () => {
  jumlahHari = 0;
  perbaruiPenghitung();
});

// 4. Komponen Dialog Modal Konfirmasi Pembatalan
const btnBatalkan = document.getElementById("batalkan-pesanan");
const dialogKonfirmasi = document.getElementById("konfirmasi");
const btnTidak = document.getElementById("tidak");
const btnYa = document.getElementById("ya");
const teksHasil = document.getElementById("hasil");

btnBatalkan.addEventListener("click", () => {
  dialogKonfirmasi.showModal();
});

btnTidak.addEventListener("click", () => {
  dialogKonfirmasi.close();
});

btnYa.addEventListener("click", () => {
  totalBarang = 0;
  jumlahHari = 0;
  outKeranjang.textContent = "0";
  perbaruiPenghitung();
  dialogKonfirmasi.close();
  teksHasil.textContent = "Pengajuan dibatalkan.";
});

// 5. Komponen Validasi Form Masuk Akun Mahasiswa
const formMasuk = document.getElementById("masuk");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const galatEmail = document.getElementById("galat-email");
const galatPassword = document.getElementById("galat-password");
const pesanStatus = document.getElementById("pesan");

formMasuk.addEventListener("submit", (event) => {
  event.preventDefault();

  galatEmail.textContent = "";
  galatPassword.textContent = "";
  pesanStatus.textContent = "";
  inputEmail.removeAttribute("aria-invalid");
  inputPassword.removeAttribute("aria-invalid");

  let fokusPertama = null;

  if (inputEmail.value.trim() === "") {
    galatEmail.textContent = "Email wajib diisi.";
    inputEmail.setAttribute("aria-invalid", "true");
    fokusPertama = inputEmail;
  } else if (!inputEmail.checkValidity()) {
    galatEmail.textContent = "Format email belum benar.";
    inputEmail.setAttribute("aria-invalid", "true");
    fokusPertama = inputEmail;
  }

  if (inputPassword.value.length < 8) {
    galatPassword.textContent = "Password minimal 8 karakter.";
    inputPassword.setAttribute("aria-invalid", "true");
    if (!fokusPertama) {
      fokusPertama = inputPassword;
    }
  }

  if (fokusPertama) {
    fokusPertama.focus();
    return;
  }

  pesanStatus.textContent = "Berhasil masuk.";
});