const defaultSourcePage = "konsultan-pajak";

const pajakKeywords = [
  "pelaporan SPT tahunan",
  "konsultan pajak SPT",
  "layanan pelaporan SPT",
  "pelaporan pajak perusahaan",
  "bantuan SPT pribadi",
  "konsultasi pelaporan SPT",
  "pengisian SPT elektronik",
  "konsultan pajak Jakarta",
  "konsultan pajak berlisensi",
  "pajak penghasilan SPT",
  "konsultan pajak berpengalaman",
  "konsultan pajak daerah",
  "pajak dan pelaporan SPT",
  "konsultan pajak profesional",
  "bantuan pelaporan pajak",
  "konsultan pajak lengkap",
  "pajak badan usaha",
  "paket layanan konsultan pajak",
  "konsultan pajak untuk UMKM",
  "konsultan pajak perusahaan besar",
  "konsultan pajak PMDN",
  "konsultan pajak PMA",
  "layanan pajak PMA",
  "pendaftaran pajak perusahaan PMDN",
  "pendaftaran pajak badan PMA",
  "pajak PMDN Indonesia",
  "pengurusan pajak PMA",
  "registrasi pajak PMA",
  "pendaftaran pajak PMDN",
  "konsultan pajak PMA terpercaya",
  "konsultan pajak PMDN Indonesia",
  "konsultan pajak internasional",
  "restorasi pajak penghasilan",
  "layanan restitusi pajak",
  "pengembalian pajak atas pembayaran berlebih",
  "konsultan restitusi pajak",
  "pelayanan restitusi pajak",
  "bantuan pengembalian pajak",
  "restitusi pajak untuk perusahaan",
  "restitusi pajak badan usaha",
  "layanan restitusi pajak pribadi",
  "pengembalian pajak yang tepat",
  "restitusi pajak untuk karyawan",
  "pelaporan pajak dan restitusi",
  "konsultan restitusi pajak internasional",
  "layanan konsultasi brevet A dan B",
  "sertifikasi brevet pajak",
  "kursus brevet pajak A dan B",
  "brevet pajak A dan B",
  "pelatihan brevet pajak",
  "brevet untuk konsultan pajak",
  "kursus brevet pajak resmi",
  "pelatihan sertifikasi brevet pajak",
  "brevet pajak untuk karir konsultan",
  "sertifikasi brevet pajak terakreditasi",
  "brevet pajak berlisensi",
  "kursus pajak dan brevet A",
  "kursus pajak dan brevet B",
  "pendaftaran brevet pajak untuk karyawan",
  "pelatihan pajak dan brevet A",
  "pelatihan pajak dan brevet B",
  "sertifikasi pajak berlisensi"
];

const KonsultanPajakPackagesRaw = [
  {
    type: "Pelaporan SPT Masa Tahunan Pribadi (Non Pegawai Nihil) 1 Tahun",
    price: 100000,
    priceOriginal: 156250,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Pelaporan%20SPT%20Masa%20Tahunan%20Pribadi%20(Non%20Pegawai%20Nihil)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Perencanaan Pajak", status: true },
      { feature: "Bukti Pelaporan Elektronik", status: true },
    ],
    requirements: [
      "Akun DJP Online",
      "Bukti Potong",
      "Kartu Keluarga",
      "KTP",
      "Asset",
    ],
  },
  {
    type: "Pelaporan SPT Masa Tahunan Pribadi (Non Pegawai Omzet) 1 Tahun",
    price: 200000,
    priceOriginal: 312500,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Pelaporan%20SPT%20Masa%20Tahunan%20Pribadi%20(Non%20Pegawai%20Omzet)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Perencanaan Pajak", status: true },
      { feature: "Bukti Pelaporan Elektronik", status: true },
    ],
    requirements: [
      "Akun DJP Online",
      "Bukti Potong",
      "Kartu Keluarga",
      "KTP",
      "Asset",
    ],
  },
  {
    type: "Pelaporan SPT Masa Tahunan Pribadi (Pegawai) 1 Tahun",
    price: 100000,
    priceOriginal: 156250,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Pelaporan%20SPT%20Masa%20Tahunan%20Pribadi%20(Pegawai)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Perencanaan Pajak", status: true },
      { feature: "Bukti Pelaporan Elektronik", status: true },
    ],
    requirements: [
      "Akun DJP Online",
      "Bukti Potong",
      "Kartu Keluarga",
      "KTP",
      "Asset",
    ],
  },
  {
    type: "Pelaporan SPT Masa Tahunan Badan Usaha (Nihil) 1 Tahun",
    price: 500000,
    priceOriginal: 781250,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Pelaporan%20SPT%20Masa%20Tahunan%20Badan%20Usaha%20(Nihil)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Laporan keuangan", status: true },
      { feature: "Review Laporan Keuangan", status: true },
      { feature: "Perencanaan Pajak", status: true },
      { feature: "Bukti Pelaporan Elektronik", status: true },
      { feature: "SPT Masa Tahunan Badan", status: true },
    ],
    requirements: [
      "Jurnal Keuangan",
      "Laporan Neraca",
      "Laporan Laba / Rugi",
      "Rekonsiliasi Bank",
      "Laporan SPT PPh 21 Pegawai",
      "Laporan PPh 23",
      "Laporan PPh Final",
      "Laporan PPN (Jika Sudah PKP)",
      "Laporan SPT PPh 25/29",
      "Pajak Daerah (Jika Ada)",
      "Perencanaan Pajak",
    ],
  },
  {
    type: "Pelaporan SPT Masa Tahunan Badan Usaha (Omzet) 1 Tahun",
    price: 1000000,
    priceOriginal: 1562500,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Pelaporan%20SPT%20Masa%20Tahunan%20Badan%20Usaha%20(Omzet)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Laporan keuangan", status: true },
      { feature: "Review Laporan Keuangan", status: true },
      { feature: "Perencanaan Pajak", status: true },
      { feature: "Bukti Pelaporan Elektronik", status: true },
      { feature: "SPT Masa Tahunan Badan", status: true },
    ],
    requirements: [
      "Akun DJP Online",
      "Laporan Keuangan (Jika Ada)",
      "SPT PPh 21 Pegawai (Jika Ada)",
      "SPT PPN (Jika PKP)",
      "Bukti Potong PPh (Jika Ada)",
      "Akta Perusahaan Pendirian s/d Perubahan Terakhir",
      "KTP & NPWP Direksi",
      "NPWP Perusahaan",
    ],
  },
  {
    type: "Konsultan Pajak Badan PMDN (Kontrak 1 Tahun) Omzet Kurang dari 5M",
    price: 1000000,
    priceOriginal: 1562500,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Badan%20PMDN%20(Kontrak%201%20Tahun)%20Omzet%20Kurang%20dari%205M!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan SPT PPh 21 Pegawai", status: true },
      { feature: "Laporan PPh 23", status: true },
      { feature: "Laporan PPh Final", status: true },
      { feature: "Laporan PPN (Jika Sudah PKP)", status: true },
      { feature: "Laporan SPT PPh 25/29", status: true },
      { feature: "Pajak Daerah (Jika Ada)", status: true },
      { feature: "Perencanaan Pajak", status: true },
    ],
    requirements: [
      "Akun DJP Online",
      "Akun PKP (Jika Sudah PKP)",
      "Rekap Pengeluaran",
      "Rekap Pemasukan",
      "Mutasi Rekening Bank",
      "AP (Account Payable)",
      "AR (Account Receivable)",
      "Daftar Asset Perusahaan",
      "Daftar Gaji Karyawan",
    ],
  },
  {
    type: "Konsultan Pajak Badan PMDN (Kontrak 1 Tahun) Omzet 5M s/d 15M",
    price: 1500000,
    priceOriginal: 2343750,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Badan%20PMDN%20(Kontrak%201%20Tahun)%20Omzet%205M%20s/d%2015M!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan SPT PPh 21 Pegawai", status: true },
      { feature: "Laporan PPh 23", status: true },
      { feature: "Laporan PPh Final", status: true },
      { feature: "Laporan PPN (Jika Sudah PKP)", status: true },
      { feature: "Laporan SPT PPh 25/29", status: true },
      { feature: "Pajak Daerah (Jika Ada)", status: true },
      { feature: "Perencanaan Pajak", status: true },
    ],
    requirements: [
      "Akun DJP Online",
      "Akun PKP (Jika Sudah PKP)",
      "Rekap Pengeluaran",
      "Rekap Pemasukan",
      "Mutasi Rekening Bank",
      "AP (Account Payable)",
      "AR (Account Receivable)",
      "Daftar Asset Perusahaan",
      "Daftar Gaji Karyawan",
    ],
  },
  {
    type: "Konsultan Pajak Badan PMDN (Kontrak 1 Tahun) Omzet 15M s/d 50M",
    price: 2500000,
    priceOriginal: 3906250,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Badan%20PMDN%20(Kontrak%201%20Tahun)%20Omzet%2015M%20s/d%2050M!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan SPT PPh 21 Pegawai", status: true },
      { feature: "Laporan PPh 23", status: true },
      { feature: "Laporan PPh Final", status: true },
      { feature: "Laporan PPN (Jika Sudah PKP)", status: true },
      { feature: "Laporan SPT PPh 25/29", status: true },
      { feature: "Pajak Daerah (Jika Ada)", status: true },
      { feature: "Perencanaan Pajak", status: true },
    ],
    requirements: [
      "Akun DJP Online",
      "Akun PKP (Jika Sudah PKP)",
      "Rekap Pengeluaran",
      "Rekap Pemasukan",
      "Mutasi Rekening Bank",
      "AP (Account Payable)",
      "AR (Account Receivable)",
      "Daftar Asset Perusahaan",
      "Daftar Gaji Karyawan",
    ],
  },
  {
    type: "Konsultan Pajak Badan PMDN (Kontrak 1 Tahun) Omzet Lebih dari 50M",
    price: 5000000,
    priceOriginal: 7812500,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Badan%20PMDN%20(Kontrak%201%20Tahun)%20Omzet%20Lebih%20dari%2050M!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan SPT PPh 21 Pegawai", status: true },
      { feature: "Laporan PPh 23", status: true },
      { feature: "Laporan PPh Final", status: true },
      { feature: "Laporan PPN (Jika Sudah PKP)", status: true },
      { feature: "Laporan SPT PPh 25/29", status: true },
      { feature: "Pajak Daerah (Jika Ada)", status: true },
      { feature: "Perencanaan Pajak", status: true },
    ],
    requirements: [
      "Akun DJP Online",
      "Akun PKP (Jika Sudah PKP)",
      "Rekap Pengeluaran",
      "Rekap Pemasukan",
      "Mutasi Rekening Bank",
      "AP (Account Payable)",
      "AR (Account Receivable)",
      "Daftar Asset Perusahaan",
      "Daftar Gaji Karyawan",
    ],
  },
  {
    type: "Konsultan Pajak Pribadi (Non Pegawai Nihil) 1 Tahun",
    price: 500000,
    priceOriginal: 781250,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Pribadi%20(Non%20Pegawai%20Nihil)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Perencanaan Pajak", status: true },
      { feature: "Bukti Pelaporan Elektronik", status: true },
    ],
    requirements: [
      "Akun DJP Online",
      "Bukti Potong",
      "Kartu Keluarga",
      "KTP",
      "Asset",
    ],
  },
  {
    type: "Konsultan Pajak Pribadi (Non Pegawai Omzet) 1 Tahun",
    price: 750000,
    priceOriginal: 1171875,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Pribadi%20(Non%20Pegawai%20Omzet)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Perencanaan Pajak", status: true },
      { feature: "Bukti Pelaporan Elektronik", status: true },
    ],
    requirements: [
      "Akun DJP Online",
      "Bukti Potong",
      "Kartu Keluarga",
      "KTP",
      "Asset",
    ],
  },
  {
    type: "Konsultan Pajak Pribadi (Pegawai) 1 Tahun",
    price: 500000,
    priceOriginal: 781250,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Pribadi%20(Pegawai)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Perencanaan Pajak", status: true },
      { feature: "Bukti Pelaporan Elektronik", status: true },
    ],
    requirements: [
      "Akun DJP Online",
      "Bukti Potong",
      "Kartu Keluarga",
      "KTP",
      "Asset",
    ],
  },
  {
    type: "Penyusunan Laporan Keuangan UMKM (Sederhana) 1 Tahun",
    price: 300000,
    priceOriginal: 468750,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Penyusunan%20Laporan%20Keuangan%20UMKM%20(Sederhana)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
    ],
    requirements: [
      "Rekonsiliasi Bank",
      "Laporan Neraca",
      "Laporan Laba / Rugi",
      "Jurnal Keuangan",
    ],
  },
  {
    type: "Penyusunan Laporan Keuangan UMKM (Kompleks) 1 Tahun",
    price: 600000,
    priceOriginal: 937500,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Penyusunan%20Laporan%20Keuangan%20UMKM%20(Kompleks)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan SPT", status: true },
    ],
    requirements: [
      "Rekonsiliasi Bank",
      "Laporan Neraca",
      "Laporan Laba / Rugi",
      "Jurnal Keuangan",
      "Laporan SPT",
    ],
  },
  {
    type: "Penyusunan Laporan Keuangan Badan (Sederhana) 1 Tahun",
    price: 800000,
    priceOriginal: 1250000,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Penyusunan%20Laporan%20Keuangan%20Badan%20(Sederhana)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan Pajak", status: true },
    ],
    requirements: [
      "Jurnal Keuangan",
      "Laporan Neraca",
      "Laporan Laba / Rugi",
      "Rekonsiliasi Bank",
      "Laporan Pajak",
    ],
  },
  {
    type: "Penyusunan Laporan Keuangan Badan (Kompleks) 1 Tahun",
    price: 1500000,
    priceOriginal: 2343750,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Penyusunan%20Laporan%20Keuangan%20Badan%20(Kompleks)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan Pajak", status: true },
      { feature: "Laporan SPT", status: true },
    ],
    requirements: [
      "Jurnal Keuangan",
      "Laporan Neraca",
      "Laporan Laba / Rugi",
      "Rekonsiliasi Bank",
      "Laporan Pajak",
      "Laporan SPT",
    ],
  },
  {
    type: "Konsultasi Pajak UMKM (Sederhana) 1 Tahun",
    price: 500000,
    priceOriginal: 781250,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultasi%20Pajak%20UMKM%20(Sederhana)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
    ],
    requirements: [
      "Jurnal Keuangan",
      "Laporan Neraca",
      "Laporan Laba / Rugi",
      "Rekonsiliasi Bank",
    ],
  },
  {
    type: "Konsultasi Pajak UMKM (Kompleks) 1 Tahun",
    price: 1000000,
    priceOriginal: 1562500,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultasi%20Pajak%20UMKM%20(Kompleks)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan SPT", status: true },
    ],
    requirements: [
      "Jurnal Keuangan",
      "Laporan Neraca",
      "Laporan Laba / Rugi",
      "Rekonsiliasi Bank",
      "Laporan SPT",
    ],
  },
  {
    type: "Konsultasi Pajak Badan (Sederhana) 1 Tahun",
    price: 1000000,
    priceOriginal: 1562500,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultasi%20Pajak%20Badan%20(Sederhana)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan Pajak", status: true },
    ],
    requirements: [
      "Jurnal Keuangan",
      "Laporan Neraca",
      "Laporan Laba / Rugi",
      "Rekonsiliasi Bank",
      "Laporan Pajak",
    ],
  },
  {
    type: "Konsultasi Pajak Badan (Kompleks) 1 Tahun",
    price: 2000000,
    priceOriginal: 3125000,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultasi%20Pajak%20Badan%20(Kompleks)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan Pajak", status: true },
      { feature: "Laporan SPT", status: true },
    ],
    requirements: [
      "Jurnal Keuangan",
      "Laporan Neraca",
      "Laporan Laba / Rugi",
      "Rekonsiliasi Bank",
      "Laporan Pajak",
      "Laporan SPT",
    ],
  },
  {
    type: "Penyusunan Anggaran Keuangan UMKM (Sederhana) 1 Tahun",
    price: 400000,
    priceOriginal: 625000,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Penyusunan%20Anggaran%20Keuangan%20UMKM%20(Sederhana)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Penyusunan Anggaran", status: true },
      { feature: "Analisis Anggaran", status: true },
    ],
    requirements: [
      "Data Keuangan Tahun Lalu",
      "Proyeksi Pendapatan",
      "Proyeksi Pengeluaran",
    ],
  },
  {
    type: "Penyusunan Anggaran Keuangan UMKM (Kompleks) 1 Tahun",
    price: 800000,
    priceOriginal: 1250000,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Penyusunan%20Anggaran%20Keuangan%20UMKM%20(Kompleks)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Penyusunan Anggaran", status: true },
      { feature: "Analisis Anggaran", status: true },
      { feature: "Perencanaan Pajak", status: true },
    ],
    requirements: [
      "Data Keuangan Tahun Lalu",
      "Proyeksi Pendapatan",
      "Proyeksi Pengeluaran",
      "Proyeksi Pajak",
    ],
  },
  {
    type: "Penyusunan Anggaran Keuangan Badan (Sederhana) 1 Tahun",
    price: 600000,
    priceOriginal: 937500,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Penyusunan%20Anggaran%20Keuangan%20Badan%20(Sederhana)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Penyusunan Anggaran", status: true },
      { feature: "Analisis Anggaran", status: true },
      { feature: "Perencanaan Pajak", status: true },
    ],
    requirements: [
      "Data Keuangan Tahun Lalu",
      "Proyeksi Pendapatan",
      "Proyeksi Pengeluaran",
      "Proyeksi Pajak",
    ],
  },
  {
    type: "Penyusunan Anggaran Keuangan Badan (Kompleks) 1 Tahun",
    price: 1200000,
    priceOriginal: 1875000,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Penyusunan%20Anggaran%20Keuangan%20Badan%20(Kompleks)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Penyusunan Anggaran", status: true },
      { feature: "Analisis Anggaran", status: true },
      { feature: "Perencanaan Pajak", status: true },
    ],
    requirements: [
      "Data Keuangan Tahun Lalu",
      "Proyeksi Pendapatan",
      "Proyeksi Pengeluaran",
      "Proyeksi Pajak",
    ],
  },
];

const pelaporanSPTRaw = [
  {
    type: "Pelaporan SPT Masa Tahunan Pribadi (Non Pegawai Nihil) 1 Tahun",
    price: 100000,
    priceOriginal: 156250, // Assuming the original price is similar to the other items
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Pelaporan%20SPT%20Masa%20Tahunan%20Pribadi%20(Non%20Pegawai%20Nihil)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Perencanaan Pajak", status: true },
      { feature: "Bukti Pelaporan Elektronik", status: true }
    ],
    requirements: [
      "Akun DJP Online",
      "Bukti Potong",
      "Kartu Keluarga",
      "KTP",
      "Asset"
    ]
  },
  {
    type: "Pelaporan SPT Masa Tahunan Pribadi (Non Pegawai Omzet) 1 Tahun",
    price: 200000,
    priceOriginal: 312500, // Assuming the original price is similar to the other items
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Pelaporan%20SPT%20Masa%20Tahunan%20Pribadi%20(Non%20Pegawai%20Omzet)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Perencanaan Pajak", status: true },
      { feature: "Bukti Pelaporan Elektronik", status: true }
    ],
    requirements: [
      "Akun DJP Online",
      "Bukti Potong",
      "Kartu Keluarga",
      "KTP",
      "Asset"
    ]
  },
  {
    type: "Pelaporan SPT Masa Tahunan Pribadi (Pegawai) 1 Tahun",
    price: 100000,
    priceOriginal: 156250, // Assuming the original price is similar to the other items
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Pelaporan%20SPT%20Masa%20Tahunan%20Pribadi%20(Pegawai)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Perencanaan Pajak", status: true },
      { feature: "Bukti Pelaporan Elektronik", status: true }
    ],
    requirements: [
      "Akun DJP Online",
      "Bukti Potong",
      "Kartu Keluarga",
      "KTP",
      "Asset"
    ]
  },
  {
    type: "Pelaporan SPT Masa Tahunan Badan Usaha (Nihil) 1 Tahun",
    price: 500000,
    priceOriginal: 781250, // Assuming the original price is similar to the other items
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Pelaporan%20SPT%20Masa%20Tahunan%20Badan%20Usaha%20(Nihil)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Laporan keuangan", status: true },
      { feature: "Review Laporan Keuangan", status: true },
      { feature: "Perencanaan Pajak", status: true },
      { feature: "Bukti Pelaporan Elektronik", status: true },
      { feature: "SPT Masa Tahunan Badan", status: true }
    ],
    requirements: [
      "Jurnal Keuangan",
      "Laporan Neraca",
      "Laporan Laba / Rugi",
      "Rekonsiliasi Bank",
      "Laporan SPT PPh 21 Pegawai",
      "Laporan PPh 23",
      "Laporan PPh Final",
      "Laporan PPN (Jika Sudah PKP)",
      "Laporan SPT PPh 25/29",
      "Pajak Daerah (Jika Ada)",
      "Perencanaan Pajak"
    ]
  },
  {
    type: "Pelaporan SPT Masa Tahunan Badan Usaha (Omzet) 1 Tahun",
    price: 1000000,
    priceOriginal: 1562500, // Assuming the original price is similar to the other items
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Pelaporan%20SPT%20Masa%20Tahunan%20Badan%20Usaha%20(Omzet)%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Laporan keuangan", status: true },
      { feature: "Review Laporan Keuangan", status: true },
      { feature: "Perencanaan Pajak", status: true },
      { feature: "Bukti Pelaporan Elektronik", status: true },
      { feature: "SPT Masa Tahunan Badan", status: true }
    ],
    requirements: [
      "Akun DJP Online",
      "Laporan Keuangan (Jika Ada)",
      "SPT PPh 21 Pegawai (Jika Ada)",
      "SPT PPN (Jika PKP)",
      "Bukti Potong PPh (Jika Ada)",
      "Akta Perusahaan Pendirian s/d Perubahan Terakhir",
      "KTP & NPWP Direksi",
      "NPWP Perusahaan"
    ]
  }
];

const konsultanPajakPMDNRaw = [
  {
    type: "Konsultan Pajak Badan PMDN (Kontrak 1 Tahun) Omzet Kurang dari 5M",
    price: 1000000,
    priceOriginal: 1562500,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Badan%20PMDN%20(Kontrak%201%20Tahun)%20Omzet%20Kurang%20dari%205M!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan SPT PPh 21 Pegawai", status: true },
      { feature: "Laporan PPh 23", status: true },
      { feature: "Laporan PPh Final", status: true },
      { feature: "Laporan PPN (Jika Sudah PKP)", status: true },
      { feature: "Laporan SPT PPh 25/29", status: true },
      { feature: "Pajak Daerah (Jika Ada)", status: true },
      { feature: "Perencanaan Pajak", status: true }
    ],
    requirements: [
      "Akun DJP Online",
      "Akun PKP (Jika Sudah PKP)",
      "Rekap Pengeluaran",
      "Rekap Pemasukan",
      "Mutasi Rekening Bank",
      "AP (Account Payable)",
      "AR (Account Receivable)",
      "Daftar Asset Perusahaan",
      "Daftar Gaji Karyawan"
    ]
  },
  {
    type: "Konsultan Pajak Badan PMDN (Kontrak 1 Tahun) Omzet 5M s/d 15M",
    price: 1500000,
    priceOriginal: 2343750,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Badan%20PMDN%20(Kontrak%201%20Tahun)%20Omzet%205M%20s/d%2015M!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan SPT PPh 21 Pegawai", status: true },
      { feature: "Laporan PPh 23", status: true },
      { feature: "Laporan PPh Final", status: true },
      { feature: "Laporan PPN (Jika Sudah PKP)", status: true },
      { feature: "Laporan SPT PPh 25/29", status: true },
      { feature: "Pajak Daerah (Jika Ada)", status: true },
      { feature: "Perencanaan Pajak", status: true }
    ],
    requirements: [
      "Akun DJP Online",
      "Akun PKP (Jika Sudah PKP)",
      "Rekap Pengeluaran",
      "Rekap Pemasukan",
      "Mutasi Rekening Bank",
      "AP (Account Payable)",
      "AR (Account Receivable)",
      "Daftar Asset Perusahaan",
      "Daftar Gaji Karyawan"
    ]
  },
  {
    type: "Konsultan Pajak Badan PMDN (Kontrak 1 Tahun) Omzet 15M s/d 25M",
    price: 2000000,
    priceOriginal: 3125000,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Badan%20PMDN%20(Kontrak%201%20Tahun)%20Omzet%2015M%20s/d%2025M!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan SPT PPh 21 Pegawai", status: true },
      { feature: "Laporan PPh 23", status: true },
      { feature: "Laporan PPh Final", status: true },
      { feature: "Laporan PPN (Jika Sudah PKP)", status: true },
      { feature: "Laporan SPT PPh 25/29", status: true },
      { feature: "Pajak Daerah (Jika Ada)", status: true },
      { feature: "Perencanaan Pajak", status: true }
    ],
    requirements: [
      "Akun DJP Online",
      "Akun PKP (Jika Sudah PKP)",
      "Rekap Pengeluaran",
      "Rekap Pemasukan",
      "Mutasi Rekening Bank",
      "AP (Account Payable)",
      "AR (Account Receivable)",
      "Daftar Asset Perusahaan",
      "Daftar Gaji Karyawan"
    ]
  },
  {
    type: "Konsultan Pajak Badan PMDN (Kontrak 1 Tahun) Omzet 25M s/d 35M",
    price: 2500000,
    priceOriginal: 3906250,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Badan%20PMDN%20(Kontrak%201%20Tahun)%20Omzet%2025M%20s/d%2035M!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan SPT PPh 21 Pegawai", status: true },
      { feature: "Laporan PPh 23", status: true },
      { feature: "Laporan PPh Final", status: true },
      { feature: "Laporan PPN (Jika Sudah PKP)", status: true },
      { feature: "Laporan SPT PPh 25/29", status: true },
      { feature: "Pajak Daerah (Jika Ada)", status: true },
      { feature: "Perencanaan Pajak", status: true }
    ],
    requirements: [
      "Akun DJP Online",
      "Akun PKP (Jika Sudah PKP)",
      "Rekap Pengeluaran",
      "Rekap Pemasukan",
      "Mutasi Rekening Bank",
      "AP (Account Payable)",
      "AR (Account Receivable)",
      "Daftar Asset Perusahaan",
      "Daftar Gaji Karyawan"
    ]
  },
  {
    type: "Konsultan Pajak Badan PMDN (Kontrak 1 Tahun) Omzet 35M s/d 50M",
    price: 3000000,
    priceOriginal: 4687500,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Badan%20PMDN%20(Kontrak%201%20Tahun)%20Omzet%2035M%20s/d%2050M!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan SPT PPh 21 Pegawai", status: true },
      { feature: "Laporan PPh 23", status: true },
      { feature: "Laporan PPh Final", status: true },
      { feature: "Laporan PPN (Jika Sudah PKP)", status: true },
      { feature: "Laporan SPT PPh 25/29", status: true },
      { feature: "Pajak Daerah (Jika Ada)", status: true },
      { feature: "Perencanaan Pajak", status: true }
    ],
    requirements: [
      "Akun DJP Online",
      "Akun PKP (Jika Sudah PKP)",
      "Rekap Pengeluaran",
      "Rekap Pemasukan",
      "Mutasi Rekening Bank",
      "AP (Account Payable)",
      "AR (Account Receivable)",
      "Daftar Asset Perusahaan",
      "Daftar Gaji Karyawan"
    ]
  }
];

const konsultanPajakPMARaw = [
  {
    type: "Konsultan Pajak Badan PMA (Kontrak 1 Tahun) Omzet Kurang dari 5M",
    price: 1250000,
    priceOriginal: 1953125,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Badan%20PMA%20(Kontrak%201%20Tahun)%20Omzet%20Kurang%20dari%205M!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan SPT PPh 21 Pegawai", status: true },
      { feature: "Laporan PPh 23", status: true },
      { feature: "Laporan PPh Final", status: true },
      { feature: "Laporan PPN (Jika Sudah PKP)", status: true },
      { feature: "Laporan SPT PPh 25/29", status: true },
      { feature: "Pajak Daerah (Jika Ada)", status: true },
      { feature: "Perencanaan Pajak", status: true }
    ],
    requirements: [
      "Akun DJP Online",
      "Akun PKP (Jika Sudah PKP)",
      "Rekap Pengeluaran",
      "Rekap Pemasukan",
      "Mutasi Rekening Bank",
      "AP (Account Payable)",
      "AR (Account Receivable)",
      "Daftar Asset Perusahaan",
      "Daftar Gaji Karyawan"
    ]
  },
  {
    type: "Konsultan Pajak Badan PMA (Kontrak 1 Tahun) Omzet 5M s/d 15M",
    price: 1750000,
    priceOriginal: 2734375,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Badan%20PMA%20(Kontrak%201%20Tahun)%20Omzet%205M%20s/d%2015M!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan SPT PPh 21 Pegawai", status: true },
      { feature: "Laporan PPh 23", status: true },
      { feature: "Laporan PPh Final", status: true },
      { feature: "Laporan PPN (Jika Sudah PKP)", status: true },
      { feature: "Laporan SPT PPh 25/29", status: true },
      { feature: "Pajak Daerah (Jika Ada)", status: true },
      { feature: "Perencanaan Pajak", status: true }
    ],
    requirements: [
      "Akun DJP Online",
      "Akun PKP (Jika Sudah PKP)",
      "Rekap Pengeluaran",
      "Rekap Pemasukan",
      "Mutasi Rekening Bank",
      "AP (Account Payable)",
      "AR (Account Receivable)",
      "Daftar Asset Perusahaan",
      "Daftar Gaji Karyawan"
    ]
  },
  {
    type: "Konsultan Pajak Badan PMA (Kontrak 1 Tahun) Omzet 15M s/d 25M",
    price: 2250000,
    priceOriginal: 3515625,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Badan%20PMA%20(Kontrak%201%20Tahun)%20Omzet%2015M%20s/d%2025M!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan SPT PPh 21 Pegawai", status: true },
      { feature: "Laporan PPh 23", status: true },
      { feature: "Laporan PPh Final", status: true },
      { feature: "Laporan PPN (Jika Sudah PKP)", status: true },
      { feature: "Laporan SPT PPh 25/29", status: true },
      { feature: "Pajak Daerah (Jika Ada)", status: true },
      { feature: "Perencanaan Pajak", status: true }
    ],
    requirements: [
      "Akun DJP Online",
      "Akun PKP (Jika Sudah PKP)",
      "Rekap Pengeluaran",
      "Rekap Pemasukan",
      "Mutasi Rekening Bank",
      "AP (Account Payable)",
      "AR (Account Receivable)",
      "Daftar Asset Perusahaan",
      "Daftar Gaji Karyawan"
    ]
  },
  {
    type: "Konsultan Pajak Badan PMA (Kontrak 1 Tahun) Omzet 25M s/d 35M",
    price: 2750000,
    priceOriginal: 4296875,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Badan%20PMA%20(Kontrak%201%20Tahun)%20Omzet%2025M%20s/d%2035M!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan SPT PPh 21 Pegawai", status: true },
      { feature: "Laporan PPh 23", status: true },
      { feature: "Laporan PPh Final", status: true },
      { feature: "Laporan PPN (Jika Sudah PKP)", status: true },
      { feature: "Laporan SPT PPh 25/29", status: true },
      { feature: "Pajak Daerah (Jika Ada)", status: true },
      { feature: "Perencanaan Pajak", status: true }
    ],
    requirements: [
      "Akun DJP Online",
      "Akun PKP (Jika Sudah PKP)",
      "Rekap Pengeluaran",
      "Rekap Pemasukan",
      "Mutasi Rekening Bank",
      "AP (Account Payable)",
      "AR (Account Receivable)",
      "Daftar Asset Perusahaan",
      "Daftar Gaji Karyawan"
    ]
  },
  {
    type: "Konsultan Pajak Badan PMA (Kontrak 1 Tahun) Omzet 35M s/d 50M",
    price: 3250000,
    priceOriginal: 5078125,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Konsultan%20Pajak%20Badan%20PMA%20(Kontrak%201%20Tahun)%20Omzet%2035M%20s/d%2050M!",
    discount: 36,
    features: [
      { feature: "Jurnal Keuangan", status: true },
      { feature: "Laporan Neraca", status: true },
      { feature: "Laporan Laba / Rugi", status: true },
      { feature: "Rekonsiliasi Bank", status: true },
      { feature: "Laporan SPT PPh 21 Pegawai", status: true },
      { feature: "Laporan PPh 23", status: true },
      { feature: "Laporan PPh Final", status: true },
      { feature: "Laporan PPN (Jika Sudah PKP)", status: true },
      { feature: "Laporan SPT PPh 25/29", status: true },
      { feature: "Pajak Daerah (Jika Ada)", status: true },
      { feature: "Perencanaan Pajak", status: true }
    ],
    requirements: [
      "Akun DJP Online",
      "Akun PKP (Jika Sudah PKP)",
      "Rekap Pengeluaran",
      "Rekap Pemasukan",
      "Mutasi Rekening Bank",
      "AP (Account Payable)",
      "AR (Account Receivable)",
      "Daftar Asset Perusahaan",
      "Daftar Gaji Karyawan"
    ]
  }
];

const pendaftaranPajakDaerahRaw = [
  {
    type: "Pendaftaran Pajak Restoran (PB1) Badan/Perorangan",
    price: 500000,
    priceOriginal: 781250,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Pendaftaran%20Pajak%20Restoran%20(PB1)%20Badan%2FPerorangan!",
    discount: 36,
    features: [
      { feature: "Semua Pengurusan Pendaftaran", status: true },
      { feature: "Pendampingan Survey", status: true },
      { feature: "NPWPD", status: true },
      { feature: "NOPD", status: true }
    ],
    requirements: [
      "Akta Perusahaan Pendirian s/d Perubahan Terakhir",
      "KTP & NPWP Direksi",
      "NIB Perusahaan",
      "Email Perusahaan",
      "Nomor HP/WA Perusahaan",
      "NPWP Perusahaan",
      "Foto-foto Reklame",
      "Luas Reklame",
      "Tinggi Reklame",
      "Lokasi Reklame",
      "Posisi Reklame"
    ]
  },
  {
    type: "Pendaftaran Pajak Hiburan",
    price: 500000,
    priceOriginal: 781250,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Pendaftaran%20Pajak%20Hiburan!",
    discount: 36,
    features: [
      { feature: "Semua Pengurusan Pendaftaran", status: true },
      { feature: "Pendampingan Survey", status: true },
      { feature: "NPWPD", status: true },
      { feature: "NOPD", status: true }
    ],
    requirements: [
      "Akta Perusahaan Pendirian s/d Perubahan Terakhir",
      "KTP & NPWP Direksi",
      "NIB Perusahaan",
      "Email Perusahaan",
      "Nomor HP/WA Perusahaan",
      "NPWP Perusahaan",
      "Foto-foto Reklame",
      "Luas Reklame",
      "Tinggi Reklame",
      "Lokasi Reklame",
      "Posisi Reklame"
    ],
    processingTime: "5 Hari Kerja Setelah Persyaratan Lengkap"
  },
  {
    type: "Pendaftaran Pajak Reklame",
    price: 500000,
    priceOriginal: 781250,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Pendaftaran%20Pajak%20Reklame!",
    discount: 36,
    features: [
      { feature: "Semua Pengurusan Pendaftaran", status: true },
      { feature: "Pendampingan Survey", status: true },
      { feature: "NPWPD", status: true },
      { feature: "NOPD", status: true }
    ],
    requirements: [
      "Akta Perusahaan Pendirian s/d Perubahan Terakhir",
      "KTP & NPWP Direksi",
      "NIB Perusahaan",
      "Email Perusahaan",
      "Nomor HP/WA Perusahaan",
      "NPWP Perusahaan",
      "Foto-foto Reklame",
      "Luas Reklame",
      "Tinggi Reklame",
      "Lokasi Reklame",
      "Posisi Reklame"
    ],
    processingTime: "5 Hari Kerja Setelah Persyaratan Lengkap"
  }
];

const perpajakanLainnyaRaw = [
  {
    type: "Restitusi Pajak Periode 1 Tahun",
    price: 30000000,
    priceOriginal: 46875000,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Restitusi%20Pajak%20Periode%201%20Tahun!",
    discount: 36,
    features: [
      { feature: "Review Kebenaran Pelaporan Pajak", status: true },
      { feature: "Review Kebenaran Laporan Keuangan Pajak", status: true },
      { feature: "Semua Pengurusan Permohonan", status: true },
      { feature: "Pendampingan Sidang Restitusi", status: true },
      { feature: "Pencairan Restitusi Pajak", status: true }
    ],
    requirements: [
      "Akun DJP Online",
      "Akun PKP",
      "Laporan Keuangan",
      "Buku Besar",
      "Mutasi Rekening Bank",
      "Bukti Dokumen Asli",
      "Akta Perusahaan Pendirian s/d Perubahan Terakhir",
      "SPT Tahunan Badan Usaha",
      "SPT PPh 21 Pegawai",
      "Bukti Potong PPh",
      "KTP & NPWP Direksi"
    ]
  },
  {
    type: "Pendampingan Pajak SP2DK",
    price: 1000000,
    priceOriginal: 1562500,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Pendampingan%20Pajak%20SP2DK!",
    discount: 36,
    features: [
      { feature: "Pendampingan Pajak", status: true },
      { feature: "Review SPT Tahunan Badan Usaha", status: true },
      { feature: "Review Laporan Keuangan Pajak", status: true },
      { feature: "Perencanaan Pajak", status: true },
      { feature: "Pembetulan Pajak", status: true }
    ],
    requirements: [
      "Surat Pajak SP2DK",
      "SPT Tahunan Badan Usaha",
      "Laporan Keuangan Pajak",
      "Bukti Pendukung Lainnya Menyesuaikan Temuan Pajak"
    ]
  },
  {
    type: "Brevet B & C (Kurang lebih 2.5 Bulan)",
    price: 3000000,
    priceOriginal: 4687500,
    link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo!%20Saya%20mau%20konsultasi%20terkait%20Brevet%20B%20%26%20C!",
    discount: 36,
    features: [
      { feature: "Materi KUP Tentang PPh 21", status: true },
      { feature: "Materi KUP Tentang PPh 23", status: true },
      { feature: "Materi KUP Tentang PPh Final", status: true },
      { feature: "Materi KUP Tentang PPN", status: true },
      { feature: "Materi KUP Tentang PPh Badan Usaha", status: true }
    ],
    requirements: [
      "KTP",
      "NPWP",
      "Nomor HP",
      "Email"
    ],
    duration: "Kurang lebih 2.5 Bulan",
    meetings: 10
  }
];

export const KonsultanPajakPackages = KonsultanPajakPackagesRaw.map((pkg) => ({
  ...pkg,
  sourcePage: pkg.sourcePage || defaultSourcePage,
  keywords: pkg.keywords?.length ? pkg.keywords : pajakKeywords,
}));

export const pelaporanSPT = pelaporanSPTRaw.map((pkg) => ({
  ...pkg,
  sourcePage: pkg.sourcePage || defaultSourcePage,
  keywords: pkg.keywords?.length ? pkg.keywords : pajakKeywords,
}));

export const konsultanPajakPMDN = konsultanPajakPMDNRaw.map((pkg) => ({
  ...pkg,
  sourcePage: pkg.sourcePage || defaultSourcePage,
  keywords: pkg.keywords?.length ? pkg.keywords : pajakKeywords,
}));

export const konsultanPajakPMA = konsultanPajakPMARaw.map((pkg) => ({
  ...pkg,
  sourcePage: pkg.sourcePage || defaultSourcePage,
  keywords: pkg.keywords?.length ? pkg.keywords : pajakKeywords,
}));

export const pendaftaranPajakDaerah = pendaftaranPajakDaerahRaw.map((pkg) => ({
  ...pkg,
  sourcePage: pkg.sourcePage || defaultSourcePage,
  keywords: pkg.keywords?.length ? pkg.keywords : pajakKeywords,
}));

export const perpajakanLainnya = perpajakanLainnyaRaw.map((pkg) => ({
  ...pkg,
  sourcePage: pkg.sourcePage || defaultSourcePage,
  keywords: pkg.keywords?.length ? pkg.keywords : pajakKeywords,
}));

