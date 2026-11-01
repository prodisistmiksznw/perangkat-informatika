// Data Perangkat Pembelajaran Informatika Kelas X (Fase E) - Kurikulum Merdeka (Deep Learning & KBC)
// Penyusun: Muhammad Azmi, M.Kom | Instansi: MA Mu'allimin NW Anjani
// Terhubung penuh ke Google Drive: https://drive.google.com/drive/folders/1meWNWgbjzBF8E-3-wXeyYxUy8Evsgyi-?usp=sharing

window.DEFAULT_CONFIG = {
  schoolName: "MA Mu'allimin NW Anjani",
  teacherName: "Muhammad Azmi, M.Kom",
  teacherTitle: "Guru Pengampu Mata Pelajaran Informatika",
  teacherNip: "-",
  teacherDegree: "Magister Komputer (M.Kom)",
  teacherPhoto: "./assets/foto-guru.png",
  teacherLocation: "Anjani, Lombok Timur, Nusa Tenggara Barat",
  teacherEmail: "muhammad.azmi@mamualliminnwanjani.sch.id",
  teacherMotto: "Mendidik dengan Cinta, Membekali Generasi Madrasah dengan Logika Komputasi, Kreativitas Digital, dan Akhlakul Karimah.",
  teacherBio: "Pendidik dan praktisi di bidang Informatika dan Ilmu Komputer yang berfokus pada transformasi pembelajaran digital di lingkungan madrasah. Mengintegrasikan pendekatan Deep Learning (Mindful, Meaningful, Joyful Learning) dengan nilai-nilai Kurikulum Berbasis Cinta (KBC) untuk mencetak peserta didik Fase E yang cakap berpikir komputasional, terampil berteknologi, dan beretika luhur.",
  teacherCompetencies: [
    "Berpikir Komputasional & Algoritma Pemrograman",
    "Sistem Komputer & Arsitektur Jaringan (LAN/Internet)",
    "Analisis Data & Pemrograman Python (Google Colab)",
    "Desain Kurikulum Merdeka (Deep Learning & KBC)",
    "Teknologi Informasi, Cloud Workspace & Literasi Siber"
  ],
  subjectName: "Informatika",
  gradePhase: "Kelas X / Fase E (MA/SMA)",
  curriculum: "Kurikulum Merdeka • Deep Learning & KBC (Kurikulum Berbasis Cinta)",
  academicYear: "2026/2027",
  driveFolderUrl: "https://drive.google.com/drive/folders/1meWNWgbjzBF8E-3-wXeyYxUy8Evsgyi-?usp=sharing",
  driveFolderId: "1meWNWgbjzBF8E-3-wXeyYxUy8Evsgyi-",
  subfolders: {
    main: {
      id: "1meWNWgbjzBF8E-3-wXeyYxUy8Evsgyi-",
      name: "PERANGKAT INFORMATIKA FASE E (Folder Utama)",
      url: "https://drive.google.com/drive/folders/1meWNWgbjzBF8E-3-wXeyYxUy8Evsgyi-?usp=sharing",
      embedUrl: "https://drive.google.com/embeddedfolderview?id=1meWNWgbjzBF8E-3-wXeyYxUy8Evsgyi-#list"
    },
    modul: {
      id: "1kqveQcK5QfzSRkFZsNhuAK-ZpgGgXb8t",
      name: "INFORMATIKA 10 (Administrasi, Modul Ajar & Buku)",
      url: "https://drive.google.com/drive/folders/1kqveQcK5QfzSRkFZsNhuAK-ZpgGgXb8t?usp=sharing",
      embedUrl: "https://drive.google.com/embeddedfolderview?id=1kqveQcK5QfzSRkFZsNhuAK-ZpgGgXb8t#list"
    },
    lkpd: {
      id: "1VL2t7PLOAO6zDPIoRdImSXWAEedAgHiz",
      name: "LKPD INFORMATIKA 10 (LKPD Bab 1 s/d Bab 9)",
      url: "https://drive.google.com/drive/folders/1VL2t7PLOAO6zDPIoRdImSXWAEedAgHiz?usp=sharing",
      embedUrl: "https://drive.google.com/embeddedfolderview?id=1VL2t7PLOAO6zDPIoRdImSXWAEedAgHiz#list"
    }
  }
};

window.CURRICULUM_ELEMENTS = [
  {
    code: "IKG",
    bab: "Bab 1",
    name: "Informatika & Keterampilan Generik",
    semester: "Ganjil",
    jp: "12 JP (4 Pertemuan)",
    icon: "users",
    color: "indigo",
    description: "Membangun fondasi kolaborasi tim, komunikasi efektif, infografis, presentasi ilmiah, dan pengenalan peta jalan Informatika Fase E.",
    topics: ["Kolaborasi dalam Tim Digital", "Komunikasi & Visualisasi Ide", "Rencana Kerja & Pembagian Peran", "Presentasi & Infografis"]
  },
  {
    code: "BK",
    bab: "Bab 2",
    name: "Berpikir Komputasional",
    semester: "Ganjil",
    jp: "12 JP (4 Pertemuan)",
    icon: "cpu",
    color: "violet",
    description: "Melatih pola pikir logis dan sistematis melalui empat pilar berpikir komputasional serta algoritma pencarian, pengurutan, stack, dan queue.",
    topics: ["Dekomposisi, Pengenalan Pola, Abstraksi, Algoritma", "Searching (Linear & Binary Search)", "Sorting (Bubble, Insertion, Selection Sort)", "Struktur Data Stack (LIFO) & Queue (FIFO)"]
  },
  {
    code: "TIK",
    bab: "Bab 3",
    name: "Teknologi Informasi & Komunikasi",
    semester: "Ganjil",
    jp: "12 JP (4 Pertemuan)",
    icon: "file-spreadsheet",
    color: "sky",
    description: "Integrasi aplikasi perkantoran (Word, Excel, PowerPoint, dan Google Workspace) secara efisien untuk otomatisasi dokumen dan kolaborasi cloud.",
    topics: ["Integrasi Antar Aplikasi Perkantoran (OLE & Chart)", "Fitur Lanjut Mail Merge & Daftar Isi Otomatis", "Olah Data & Visualisasi di Spreadsheet", "Kolaborasi Cloud di Google Workspace"]
  },
  {
    code: "JKI",
    bab: "Bab 4",
    name: "Jaringan Komputer & Internet",
    semester: "Ganjil",
    jp: "12 JP (4 Pertemuan)",
    icon: "globe",
    color: "cyan",
    description: "Memahami arsitektur jaringan lokal (LAN) dan internet, konektivitas kabel/nirkabel, komunikasi data ponsel, serta enkripsi keamanan jaringan.",
    topics: ["Jaringan Lokal (LAN) vs Internet (WAN)", "Konektivitas Kabel (UTP/Fiber) & Nirkabel (Wi-Fi/Bluetooth)", "Komunikasi Data pada Ponsel (BTS & Sinyal)", "Proteksi Data, SSL/HTTPS & Keamanan Jaringan"]
  },
  {
    code: "SK",
    bab: "Bab 5",
    name: "Sistem Komputer",
    semester: "Ganjil",
    jp: "12 JP (4 Pertemuan)",
    icon: "hard-drive",
    color: "emerald",
    description: "Mengupas tuntas interaksi antara perangkat keras (CPU, Memori, I/O), perangkat lunak (Sistem Operasi & Aplikasi), dan pengguna (Brainware).",
    topics: ["Komponen Hardware (ALU, CU, Register, Memory, I/O)", "Interaksi Hardware, Software & Brainware", "Fungsi Sistem Operasi & Multitasking", "Siklus Pemrosesan Data (Fetch-Decode-Execute)"]
  },
  {
    code: "AD",
    bab: "Bab 6",
    name: "Analisis Data",
    semester: "Genap",
    jp: "12 JP (4 Pertemuan)",
    icon: "bar-chart-3",
    color: "amber",
    description: "Mengenal siklus pengolahan data mulai dari pengumpulan data (web scraping/survei), pembersihan (data cleaning), hingga visualisasi menggunakan Python/Google Colab.",
    topics: ["Privasi, Keamanan & Etika Pengumpulan Data", "Pengenalan Google Colab & Dasar Python untuk Data", "Koleksi Data & Pra-pemrosesan (Data Cleaning)", "Visualisasi Data (Grafik Batang, Garis, Pie Chart)"]
  },
  {
    code: "AP",
    bab: "Bab 7",
    name: "Algoritma & Pemrograman",
    semester: "Genap",
    jp: "12 JP (4 Pertemuan)",
    icon: "code-2",
    color: "rose",
    description: "Menerjemahkan algoritma (Flowchart & Pseudocode) menjadi kode program terstruktur menggunakan bahasa pemrograman prosedural (C / Python).",
    topics: ["Notasi Algoritma: Diagram Alir (Flowchart) & Pseudocode", "Tipe Data, Variabel, Konstanta & Operator", "Struktur Kontrol Percabangan (If-Else, Switch)", "Struktur Kontrol Perulangan (For, While, Do-While)"]
  },
  {
    code: "DSI",
    bab: "Bab 8",
    name: "Dampak Sosial Informatika",
    semester: "Genap",
    jp: "12 JP (4 Pertemuan)",
    icon: "shield-check",
    color: "teal",
    description: "Mengkaji sejarah perkembangan komputer, aspek ekonomi & hukum produk digital, lisensi perangkat lunak, etika kewargaan digital, serta studi lanjut karier TI.",
    topics: ["Sejarah Perkembangan Komputer & Tokoh Informatika", "Aspek Ekonomi, HAKI & Lisensi Software (Open Source/Proprietary)", "Informatika untuk Masa Depan (AI, IoT, Big Data)", "Karier & Studi Lanjut di Bidang Informatika"]
  },
  {
    code: "PLB",
    bab: "Bab 9",
    name: "Praktika Lintas Bidang",
    semester: "Genap",
    jp: "12 JP (4 Pertemuan)",
    icon: "rocket",
    color: "fuchsia",
    description: "Proyek akhir (Capstone Project) lintas disiplin ilmu yang mengintegrasikan seluruh elemen informatika untuk memecahkan masalah nyata di lingkungan sekitar.",
    topics: ["Observasi & Identifikasi Masalah Lingkungan Sekitar", "Manajemen Proyek & Pembagian Peran Tim", "Perancangan & Pengembangan Artefak Komputasional", "Uji Coba, Dokumentasi, dan Pameran Karya (Showcase)"]
  }
];

window.DOCUMENTS_DATA = [
  // ================= ADMINISTRASI & PERENCANAAN KURIKULUM =================
  {
    id: "adm-cp",
    title: "Capaian Pembelajaran (CP) Informatika Fase E",
    code: "CP",
    category: "administrasi",
    categoryLabel: "Administrasi & Kurikulum",
    semester: "Tahunan",
    format: "DOCX",
    fileSize: "145.5 KB",
    pages: "14 Halaman",
    jp: "108 JP / Tahun",
    localPath: "../INFORMATIKA 10/CP_OK.docx",
    driveUrl: "https://drive.google.com/file/d/15QGL65LOcyf5m8i1WyHc7L1Ai5Ce7nC9/view?usp=sharing",
    badgeColor: "indigo",
    summary: "Dokumen resmi Capaian Pembelajaran (CP) Mata Pelajaran Informatika Fase E (Kelas X SMA/MA) sesuai Keputusan Kepala BSKAP terbaru, terintegrasi nilai Kurikulum Berbasis Cinta (KBC).",
    objectives: [
      "Merumuskan rasional, tujuan, dan karakteristik mata pelajaran Informatika Fase E.",
      "Memetakan capaian pembelajaran per elemen: BK, TIK, SK, JKI, AD, AP, DSI, dan PLB.",
      "Menyelaraskan dimensi Profil Pelajar Pancasila & Profil Pelajar Rahmatan Lil 'Alamin."
    ],
    outline: [
      "A. Rasional Mata Pelajaran Informatika",
      "B. Tujuan Mata Pelajaran Informatika",
      "C. Karakteristik & Elemen Mata Pelajaran Informatika",
      "D. Capaian Pembelajaran Fase E (Kelas X) Per Elemen"
    ]
  },
  {
    id: "adm-atp",
    title: "Alur Tujuan Pembelajaran (ATP) Informatika Kelas X",
    code: "ATP",
    category: "administrasi",
    categoryLabel: "Administrasi & Kurikulum",
    semester: "Tahunan",
    format: "DOCX",
    fileSize: "45.9 KB",
    pages: "10 Halaman",
    jp: "108 JP / Tahun",
    localPath: "../INFORMATIKA 10/ATP_OK.docx",
    driveUrl: "https://drive.google.com/file/d/1AqyaiVkdaPSw2TBftvCKQyWXtGFFEmMc/view?usp=sharing",
    badgeColor: "indigo",
    summary: "Susunan sistematis dan logis dari Tujuan Pembelajaran (TP) selama satu tahun ajaran (Semester Ganjil & Genap) lengkap dengan indikator, materi esensial, dan alokasi jam pelajaran.",
    objectives: [
      "Menurunkan Capaian Pembelajaran (CP) menjadi Tujuan Pembelajaran (TP) yang terukur.",
      "Menyusun urutan pembelajaran dari Bab 1 hingga Bab 9 secara berjenjang.",
      "Menentukan alokasi waktu 12 JP untuk masing-masing bab."
    ],
    outline: [
      "1. Identitas & Pemetaan Elemen Fase E",
      "2. Alur Tujuan Pembelajaran Semester Ganjil (Bab 1 - Bab 5)",
      "3. Alur Tujuan Pembelajaran Semester Genap (Bab 6 - Bab 9)",
      "4. Profil Pelajar Pancasila, Kata Kunci, dan Glosarium"
    ]
  },
  {
    id: "adm-ame",
    title: "Analisis Minggu Efektif (RPE) TP 2026/2027",
    code: "MINGGU EFEKTIF",
    category: "administrasi",
    categoryLabel: "Administrasi & Kurikulum",
    semester: "Tahunan",
    format: "DOCX",
    fileSize: "38.5 KB",
    pages: "4 Halaman",
    jp: "36 Pekan Efektif",
    localPath: "https://drive.google.com/uc?export=download&id=1GxQ5RZ9VmHUXSMNsr1flcaA_W585VxAO",
    driveUrl: "https://drive.google.com/file/d/1GxQ5RZ9VmHUXSMNsr1flcaA_W585VxAO/view?usp=sharing",
    badgeColor: "indigo",
    summary: "Dokumen Analisis Hari dan Minggu Efektif (Rincian Pekan Efektif / RPE) Tahun Pelajaran 2026/2027 untuk Semester Ganjil dan Semester Genap sebagai dasar distribusi jam pelajaran PROTA dan PROMES.",
    objectives: [
      "Menghitung jumlah minggu kalender, minggu efektif, dan minggu tidak efektif pada Semester Ganjil & Genap TP 2026/2027.",
      "Memetakan distribusi alokasi jam pelajaran efektif terhadap kegiatan pembelajaran, asesmen sumatif, dan libur kalender pendidikan.",
      "Menjadi acuan validasi penyusunan Program Tahunan (PROTA) dan Program Semester (PROMES)."
    ],
    outline: [
      "1. Perhitungan Minggu Efektif & Tidak Efektif Semester Ganjil (TP 2026/2027)",
      "2. Perhitungan Minggu Efektif & Tidak Efektif Semester Genap (TP 2026/2027)",
      "3. Distribusi Alokasi Jam Pelajaran Efektif per Bab / Materi",
      "4. Pengesahan Guru Mata Pelajaran & Kepala Madrasah"
    ]
  },
  {
    id: "adm-prota",
    title: "Program Tahunan (PROTA) Informatika Kelas X",
    code: "PROTA",
    category: "administrasi",
    categoryLabel: "Administrasi & Kurikulum",
    semester: "Tahunan",
    format: "DOCX",
    fileSize: "44.9 KB",
    pages: "4 Halaman",
    jp: "108 JP / Tahun",
    localPath: "../INFORMATIKA 10/PROTA_OK.docx",
    driveUrl: "https://drive.google.com/file/d/1hIm3833mPZRxIijGjKtbW8Z1XSaGsVT4/view?usp=sharing",
    badgeColor: "indigo",
    summary: "Rencana penetapan alokasi waktu satu tahun pelajaran untuk mencapai seluruh Tujuan Pembelajaran pada Semester Ganjil dan Semester Genap.",
    objectives: [
      "Mendistribusikan total jam pelajaran efektif dalam satu tahun ajaran.",
      "Merencanakan jadwal asesmen formatif, sumatif, dan cadangan waktu pembelajaran.",
      "Menjadi acuan penyusunan Program Semester (PROMES) dan Modul Ajar."
    ],
    outline: [
      "1. Identitas Satuan Pendidikan (MA Mu'allimin NW Anjani)",
      "2. Distribusi Alokasi Waktu Semester I (Ganjil) — Bab 1 s/d Bab 5",
      "3. Distribusi Alokasi Waktu Semester II (Genap) — Bab 6 s/d Bab 9",
      "4. Rekapitulasi Jam Pelajaran & Pengesahan Kepala Madrasah"
    ]
  },
  {
    id: "adm-promes",
    title: "Program Semester (PROMES) Ganjil & Genap",
    code: "PROMES",
    category: "administrasi",
    categoryLabel: "Administrasi & Kurikulum",
    semester: "Tahunan",
    format: "DOCX",
    fileSize: "77.4 KB",
    pages: "8 Halaman",
    jp: "54 JP / Semester",
    localPath: "../INFORMATIKA 10/PROMES_OK.docx",
    driveUrl: "https://drive.google.com/file/d/1XhOSSxC2Ee_Ke_GTF9hiecSAzeJhJPGu/view?usp=sharing",
    badgeColor: "indigo",
    summary: "Penjabaran matriks mingguan dari Program Tahunan untuk Semester Ganjil dan Semester Genap lengkap dengan pemetaan pekan efektif dan asesmen.",
    objectives: [
      "Memetakan pelaksanaan setiap pertemuan per minggu efektif dari bulan Juli–Desember dan Januari–Juni.",
      "Menjadwalkan waktu pelaksanaan sumatif akhir bab dan sumatif akhir semester.",
      "Memastikan ketercapaian seluruh TP tepat waktu."
    ],
    outline: [
      "1. Perhitungan Pekan Efektif & Tidak Efektif",
      "2. Matriks Program Semester Ganjil (Juli - Desember)",
      "3. Matriks Program Semester Genap (Januari - Juni)",
      "4. Lembar Pengesahan Penyusun & Kepala Madrasah"
    ]
  },
  {
    id: "adm-kktp",
    title: "Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)",
    code: "KKTP",
    category: "administrasi",
    categoryLabel: "Administrasi & Kurikulum",
    semester: "Tahunan",
    format: "DOCX",
    fileSize: "46.8 KB",
    pages: "9 Halaman",
    jp: "Bab 1 - Bab 9",
    localPath: "../INFORMATIKA 10/KKTP_OK.docx",
    driveUrl: "https://drive.google.com/file/d/1tE-Xwf4SFJZ_gSX0UWl9Mpjl-vKZ-xdL/view?usp=sharing",
    badgeColor: "indigo",
    summary: "Rubrik dan interval nilai Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) sebagai acuan penilaian formatif dan sumatif serta tindak lanjut remedial/pengayaan.",
    objectives: [
      "Menetapkan deskripsi kriteria dan interval ketercapaian setiap Tujuan Pembelajaran.",
      "Menyediakan rubrik penilaian kinerja, proyek, dan tes tertulis.",
      "Menentukan pedoman intervensi bagi peserta didik (remedial atau pengayaan)."
    ],
    outline: [
      "1. Skala Interval Nilai & Tindak Lanjut Intervensi",
      "2. Rubrik KKTP Semester Ganjil (Bab 1 - Bab 5)",
      "3. Rubrik KKTP Semester Genap (Bab 6 - Bab 9)",
      "4. Rekapitulasi Ketercapaian Kompetensi Peserta Didik"
    ]
  },
  {
    id: "adm-jurnal",
    title: "Jurnal Mengajar Harian Guru Informatika",
    code: "JURNAL",
    category: "administrasi",
    categoryLabel: "Administrasi & Kurikulum",
    semester: "Tahunan",
    format: "DOCX",
    fileSize: "44.8 KB",
    pages: "6 Halaman",
    jp: "36 Pertemuan",
    localPath: "../INFORMATIKA 10/JURNAL_OK.docx",
    driveUrl: "https://drive.google.com/file/d/1VQTojvz3AEz5GNVjefjYNNZmEywNRb-1/view?usp=sharing",
    badgeColor: "indigo",
    summary: "Instrumen pencatatan agenda harian pelaksanaan pembelajaran di kelas, refleksi keterlaksanaan materi, dan presensi kehadiran peserta didik.",
    objectives: [
      "Mencatat realisasi tanggal, jam ke-, bab/materi pokok, dan aktivitas pembelajaran setiap pertemuan.",
      "Mendokumentasikan ketidakhadiran siswa (Sakit, Izin, Alfa) dan catatan khusus kelas.",
      "Bahan evaluasi dan refleksi guru secara berkala."
    ],
    outline: [
      "1. Format Jurnal Mengajar Semester Ganjil",
      "2. Format Jurnal Mengajar Semester Genap",
      "3. Kolom Catatan Refleksi & Tindak Lanjut Pertemuan",
      "4. Pengesahan Wakil Kurikulum & Kepala Madrasah"
    ]
  },
  {
    id: "adm-buku",
    title: "Buku Teks Utama Informatika Kelas X (Kemendikbudristek)",
    code: "BUKU",
    category: "administrasi",
    categoryLabel: "Buku Pegangan",
    semester: "Tahunan",
    format: "PDF",
    fileSize: "5.33 MB",
    pages: "272 Halaman",
    jp: "Referensi Utama",
    localPath: "../INFORMATIKA 10/BUKU.pdf",
    driveUrl: "https://drive.google.com/file/d/1OFDKi4--dt0vHChh0OzSmRozgt0lsxQq/view?usp=sharing",
    badgeColor: "emerald",
    summary: "Buku Paket Resmi Mata Pelajaran Informatika Kelas X SMA/MA/SMK Kurikulum Merdeka sebagai bahan bacaan utama guru dan peserta didik.",
    objectives: [
      "Menyediakan materi bacaan komprehensif, ilustrasi konsep, dan latihan soal untuk 9 bab.",
      "Menjadi referensi kegiatan unplugged maupun plugged (praktik komputer).",
      "Mendukung literasi digital mandiri peserta didik di sekolah maupun di rumah."
    ],
    outline: [
      "Bab 1: Informatika dan Keterampilan Generik",
      "Bab 2 - 5: BK, TIK, Sistem Komputer, Jaringan Komputer & Internet",
      "Bab 6 - 9: Analisis Data, Algoritma Pemrograman, DSI, dan PLB",
      "Glosarium, Daftar Pustaka & Indeks"
    ]
  },

  // ================= MODUL AJAR DEEP LEARNING (KBC) =================
  {
    id: "modul-bab1",
    title: "Modul Ajar Bab 1: Informatika dan Keterampilan Generik (IKG)",
    code: "MODUL BAB 1",
    category: "modul",
    categoryLabel: "Modul Ajar (KBC)",
    semester: "Ganjil",
    format: "DOCX",
    fileSize: "39.1 KB",
    pages: "12 Halaman",
    jp: "12 JP (4 Pertemuan)",
    localPath: "../INFORMATIKA 10/BAB 1.docx",
    driveUrl: "https://drive.google.com/file/d/188opFf7mtl8GunCDhuJoC0njpBulxCil/view?usp=sharing",
    badgeColor: "violet",
    summary: "Modul Ajar Deep Learning terintegrasi Kurikulum Berbasis Cinta (KBC) yang memfokuskan pada kolaborasi tim, komunikasi efektif, pembuatan infografis, dan presentasi.",
    objectives: [
      "Memahami peran dan manfaat belajar Informatika di Fase E.",
      "Bekerja sama dalam kelompok secara harmonis (nilai cinta sesama & tanggung jawab) dengan pembagian peran yang jelas.",
      "Mengomunikasikan hasil kerja dalam bentuk infografis visual dan presentasi yang menarik."
    ],
    outline: [
      "A. Identitas Modul & Kesiapan Peserta Didik",
      "B. Desain Pembelajaran Deep Learning (Mindful, Meaningful, Joyful) & Nilai KBC",
      "C. Langkah Pembelajaran Pertemuan 1 s/d 4 (Pengenalan, Kolaborasi, Infografis, Presentasi)",
      "D. Asesmen Diagnostik, Formatif, Sumatif & Lembar Refleksi"
    ]
  },
  {
    id: "modul-bab2",
    title: "Modul Ajar Bab 2: Berpikir Komputasional (BK)",
    code: "MODUL BAB 2",
    category: "modul",
    categoryLabel: "Modul Ajar (KBC)",
    semester: "Ganjil",
    format: "DOCX",
    fileSize: "30.8 KB",
    pages: "11 Halaman",
    jp: "12 JP (4 Pertemuan)",
    localPath: "../INFORMATIKA 10/BAB 2.docx",
    driveUrl: "https://drive.google.com/file/d/1UzJZB97MkcOI_TspPlS1cqEhcWKpaNui/view?usp=sharing",
    badgeColor: "violet",
    summary: "Modul Ajar Deep Learning (KBC) untuk melatih logika pemecahan masalah melalui algoritma Pencarian (Searching), Pengurutan (Sorting), Tumpukan (Stack), dan Antrean (Queue).",
    objectives: [
      "Menerapkan strategi algoritma standar untuk pencarian data (Linear & Binary Search).",
      "Membandingkan dan mempraktikkan metode pengurutan (Bubble, Insertion, Selection Sort) melalui simulasi kartu/unplugged.",
      "Menganalisis pemanfaatan struktur data Stack (LIFO) dan Queue (FIFO) dalam kehidupan nyata."
    ],
    outline: [
      "Pertemuan 1: Konsep Dasar Berpikir Komputasional & Algoritma Searching",
      "Pertemuan 2: Eksplorasi & Simulasi Algoritma Sorting",
      "Pertemuan 3: Struktur Data Tumpukan (Stack) & Antrean (Queue)",
      "Pertemuan 4: Studi Kasus Terpadu & Asesmen Sumatif Bab 2"
    ]
  },
  {
    id: "modul-bab3",
    title: "Modul Ajar Bab 3: Teknologi Informasi dan Komunikasi (TIK)",
    code: "MODUL BAB 3",
    category: "modul",
    categoryLabel: "Modul Ajar (KBC)",
    semester: "Ganjil",
    format: "DOCX",
    fileSize: "30.6 KB",
    pages: "11 Halaman",
    jp: "12 JP (4 Pertemuan)",
    localPath: "../INFORMATIKA 10/BAB 3.docx",
    driveUrl: "https://drive.google.com/file/d/1cvn_FAiFLr038W7LYTeVeAcs7_i0B7_A/view?usp=sharing",
    badgeColor: "violet",
    summary: "Modul Ajar Deep Learning (KBC) tentang integrasi konten antar aplikasi perkantoran (pengolah kata, angka, dan presentasi) serta fitur otomatisasi lanjut.",
    objectives: [
      "Melakukan integrasi data dan objek (Cut/Copy-Paste, Object Linking & Embedding) antar aplikasi perkantoran.",
      "Membuat surat massal otomatis menggunakan fitur Mail Merge.",
      "Menyusun daftar isi otomatis (Table of Contents) dan kolaborasi dokumen di Google Workspace."
    ],
    outline: [
      "Pertemuan 1: Integrasi Pengolah Kata dan Pengolah Angka (OLE & Grafik)",
      "Pertemuan 2: Otomatisasi Dokumen dengan Mail Merge",
      "Pertemuan 3: Pemformatan Gaya (Heading Styles) & Daftar Isi Otomatis",
      "Pertemuan 4: Kolaborasi Cloud (Google Docs/Sheets/Slides) & Proyek Mini"
    ]
  },
  {
    id: "modul-bab4",
    title: "Modul Ajar Bab 4: Jaringan Komputer dan Internet (JKI)",
    code: "MODUL BAB 4",
    category: "modul",
    categoryLabel: "Modul Ajar (KBC)",
    semester: "Ganjil",
    format: "DOCX",
    fileSize: "30.1 KB",
    pages: "10 Halaman",
    jp: "12 JP (4 Pertemuan)",
    localPath: "../INFORMATIKA 10/BAB 4.docx",
    driveUrl: "https://drive.google.com/file/d/1ruYvj41sHLqg-cNo0lhO14y_gPHSz_zR/view?usp=sharing",
    badgeColor: "violet",
    summary: "Modul Ajar Deep Learning (KBC) yang membahas jaringan lokal dan internet, jenis konektivitas kabel/nirkabel, komunikasi data via ponsel, dan keamanan enkripsi.",
    objectives: [
      "Membedakan karakteristik jaringan lokal (LAN) dan jaringan internet (WAN/MAN).",
      "Menganalisis media transmisi kabel (UTP, Coaxial, Fiber Optic) dan nirkabel (Wi-Fi, Bluetooth, Seluler).",
      "Menerapkan praktik proteksi data dan koneksi aman (HTTPS/Enkripsi) saat berinternet."
    ],
    outline: [
      "Pertemuan 1: Arsitektur Jaringan Lokal (LAN) dan Internet",
      "Pertemuan 2: Konektivitas Internet Berkabel dan Nirkabel",
      "Pertemuan 3: Komunikasi Data pada Perangkat Seluler (BTS & Generasi Jaringan)",
      "Pertemuan 4: Proteksi Data, Enkripsi & Praktik Keamanan Jaringan"
    ]
  },
  {
    id: "modul-bab5",
    title: "Modul Ajar Bab 5: Sistem Komputer (SK)",
    code: "MODUL BAB 5",
    category: "modul",
    categoryLabel: "Modul Ajar (KBC)",
    semester: "Ganjil",
    format: "DOCX",
    fileSize: "30.0 KB",
    pages: "10 Halaman",
    jp: "12 JP (4 Pertemuan)",
    localPath: "../INFORMATIKA 10/BAB 5.docx",
    driveUrl: "https://drive.google.com/file/d/1yoSs5Rpn7wSEBGmC1hIQ5cTntgJ-7fg8/view?usp=sharing",
    badgeColor: "violet",
    summary: "Modul Ajar Deep Learning (KBC) yang mengupas komponen penyusun sistem komputer, mekanisme kerja CPU, interaksi perangkat keras-lunak, dan fungsi sistem operasi.",
    objectives: [
      "Mengidentifikasi komponen perangkat keras (Input, Process/CPU, Memory, Output) beserta fungsinya.",
      "Menjelaskan mekanisme interaksi antara Hardware, Software, dan Brainware.",
      "Mensimulasikan cara kerja Sistem Operasi dalam manajemen proses dan memori."
    ],
    outline: [
      "Pertemuan 1: Komponen Sistem Komputer (Hardware, Software, Brainware)",
      "Pertemuan 2: Arsitektur Internal Komputer & Siklus Kerja CPU (ALU, CU, Register)",
      "Pertemuan 3: Interaksi Manusia dan Komputer serta Peran Sistem Operasi",
      "Pertemuan 4: Simulasi Sistem Komputer & Evaluasi Bab 5"
    ]
  },
  {
    id: "modul-bab6",
    title: "Modul Ajar Bab 6: Analisis Data (AD)",
    code: "MODUL BAB 6",
    category: "modul",
    categoryLabel: "Modul Ajar (KBC)",
    semester: "Genap",
    format: "DOCX",
    fileSize: "40.1 KB",
    pages: "12 Halaman",
    jp: "12 JP (4 Pertemuan)",
    localPath: "../INFORMATIKA 10/BAB 6.docx",
    driveUrl: "https://drive.google.com/file/d/1LQhFZoHDDJ-IMhBmt_na24A8sfSL-T4d/view?usp=sharing",
    badgeColor: "violet",
    summary: "Modul Ajar Deep Learning (KBC) tentang literasi data, privasi digital, pengumpulan data, pengolahan dengan Google Colab/Python, serta visualisasi informasi.",
    objectives: [
      "Memahami pentingnya informasi digital, privasi data pribadi, dan etika penggunaan data.",
      "Menggunakan lingkungan Google Colaboratory dan instruksi dasar Python untuk membaca data.",
      "Melakukan koleksi data, pembersihan data (data cleaning), dan menyajikan visualisasi grafik yang informatif."
    ],
    outline: [
      "Pertemuan 1: Konsep Informasi Digital, Privasi & Keamanan Data",
      "Pertemuan 2: Pengenalan Google Colab & Dasar Python untuk Analisis Data",
      "Pertemuan 3: Pengumpulan & Pra-pemrosesan Data (Data Cleaning)",
      "Pertemuan 4: Visualisasi Data & Interpretasi Grafik"
    ]
  },
  {
    id: "modul-bab7",
    title: "Modul Ajar Bab 7: Algoritma dan Pemrograman (AP)",
    code: "MODUL BAB 7",
    category: "modul",
    categoryLabel: "Modul Ajar (KBC)",
    semester: "Genap",
    format: "DOCX",
    fileSize: "32.6 KB",
    pages: "11 Halaman",
    jp: "12 JP (4 Pertemuan)",
    localPath: "../INFORMATIKA 10/BAB 7.docx",
    driveUrl: "https://drive.google.com/file/d/1LAONkBro0w4IgysOjK7g1Yq8SG7hnYq0/view?usp=sharing",
    badgeColor: "violet",
    summary: "Modul Ajar Deep Learning (KBC) yang memandu siswa merancang diagram alir (flowchart), menulis pseudocode, hingga membuat program komputer prosedural.",
    objectives: [
      "Membaca dan menulis algoritma dalam bentuk Flowchart dan Pseudocode dengan benar.",
      "Menggunakan variabel, tipe data, konstanta, operator aritmatika/logika, serta instruksi Input/Output.",
      "Mengimplementasikan struktur kontrol percabangan (If-Else) dan perulangan (Looping) dalam bahasa pemrograman."
    ],
    outline: [
      "Pertemuan 1: Dari Algoritma ke Bahasa Pemrograman (Flowchart & Pseudocode)",
      "Pertemuan 2: Struktur Program, Tipe Data, Variabel, dan Input/Output",
      "Pertemuan 3: Struktur Kontrol Keputusan / Percabangan (If-Else, Switch)",
      "Pertemuan 4: Struktur Kontrol Perulangan (For, While) & Mini Coding Project"
    ]
  },
  {
    id: "modul-bab8",
    title: "Modul Ajar Bab 8: Dampak Sosial Informatika (DSI)",
    code: "MODUL BAB 8",
    category: "modul",
    categoryLabel: "Modul Ajar (KBC)",
    semester: "Genap",
    format: "DOCX",
    fileSize: "32.3 KB",
    pages: "11 Halaman",
    jp: "12 JP (4 Pertemuan)",
    localPath: "../INFORMATIKA 10/BAB 8.docx",
    driveUrl: "https://drive.google.com/file/d/1UR6opp72cqvUvzEIVPTicwGjD1AEPtbS/view?usp=sharing",
    badgeColor: "violet",
    summary: "Modul Ajar Deep Learning (KBC) yang menumbuhkan kesadaran etis, sejarah komputasi, aspek hukum/lisensi HAKI, dan kesiapan karier masa depan di bidang TI.",
    objectives: [
      "Menelusuri sejarah perkembangan komputer dan keteladanan tokoh-tokoh pelopor informatika.",
      "Menganalisis dampak ekonomi, hukum, Hak Kekayaan Intelektual (HAKI), dan jenis lisensi perangkat lunak.",
      "Merancang peta cita-cita studi lanjut, sertifikasi, dan profesi di bidang Informatika dengan berlandaskan etika & cinta kemanusiaan."
    ],
    outline: [
      "Pertemuan 1: Sejarah Perkembangan Komputer & Tokoh Inspiratif",
      "Pertemuan 2: Aspek Ekonomi & Hukum Produk Informatika (HAKI & Lisensi)",
      "Pertemuan 3: Informatika untuk Masa Depan (AI, Smart Society, SDGs)",
      "Pertemuan 4: Eksplorasi Karier, Profesi & Studi Lanjut Bidang Informatika"
    ]
  },
  {
    id: "modul-bab9",
    title: "Modul Ajar Bab 9: Praktika Lintas Bidang (PLB)",
    code: "MODUL BAB 9",
    category: "modul",
    categoryLabel: "Modul Ajar (KBC)",
    semester: "Genap",
    format: "DOCX",
    fileSize: "32.5 KB",
    pages: "11 Halaman",
    jp: "12 JP (4 Pertemuan)",
    localPath: "../INFORMATIKA 10/BAB 9.docx",
    driveUrl: "https://drive.google.com/file/d/1kZNku8quIrX_KDt-ii5JJa5TxlJYhEdl/view?usp=sharing",
    badgeColor: "violet",
    summary: "Modul Ajar Proyek Capstone (KBC) di mana peserta didik berkolaborasi dalam tim untuk merancang solusi digital atas permasalahan nyata di lingkungan madrasah/masyarakat.",
    objectives: [
      "Melakukan observasi lapangan untuk mengidentifikasi permasalahan nyata di sekitar sekolah/madrasah.",
      "Menyusun rencana manajemen proyek dan membagi peran tim (Project Manager, System Analyst, Programmer, Tester).",
      "Mengembangkan artefak komputasional, menyusun laporan dokumentasi, dan mempresentasikan solusi."
    ],
    outline: [
      "Pertemuan 1: Pembentukan Tim, Pengarahan Proyek & Observasi Lapangan",
      "Pertemuan 2: Definisi Masalah, Perancangan Solusi & Rencana Kerja",
      "Pertemuan 3: Pengembangan Artefak Komputasional & Pengujian (Testing)",
      "Pertemuan 4: Gelar Karya (Showcase), Presentasi Proyek & Refleksi Akhir"
    ]
  },

  // ================= LEMBAR KERJA PESERTA DIDIK (LKPD) =================
  {
    id: "lkpd-bab1",
    title: "LKPD Bab 1: Informatika dan Keterampilan Generik",
    code: "LKPD 1",
    category: "lkpd",
    categoryLabel: "LKPD Siswa",
    semester: "Ganjil",
    format: "DOCX",
    fileSize: "26.5 KB",
    pages: "6 Halaman",
    jp: "Aktivitas Kelompok",
    localPath: "../LKPD INFORMATIKA 10/LKPD 1.docx",
    driveUrl: "https://drive.google.com/file/d/13HKnKDHfSo6U-OJlFQse_3OUi552bubG/view?usp=sharing",
    badgeColor: "amber",
    summary: "Lembar Kerja Peserta Didik untuk melatih kolaborasi kelompok (3-4 orang), manajemen pembagian tugas, perancangan infografis, dan penilaian rekan sejawat.",
    objectives: [
      "Merencanakan proyek kegiatan bersama dengan pembagian peran tim yang adil.",
      "Mendesain infografis informatif yang merangkum konsep utama materi.",
      "Mempresentasikan karya kelompok dengan bahasa yang santun dan sistematis."
    ],
    outline: [
      "A. Petunjuk Belajar & Identitas Kelompok",
      "B. Aktivitas 1: Perencanaan Kerja Kelompok & Pembagian Peran",
      "C. Aktivitas 2: Pembuatan Infografis & Bahan Presentasi",
      "D. Rubrik Penilaian & Refleksi Diri"
    ]
  },
  {
    id: "lkpd-bab2",
    title: "LKPD Bab 2: Berpikir Komputasional",
    code: "LKPD 2",
    category: "lkpd",
    categoryLabel: "LKPD Siswa",
    semester: "Ganjil",
    format: "DOCX",
    fileSize: "27.0 KB",
    pages: "7 Halaman",
    jp: "Praktik & Simulasi",
    localPath: "../LKPD INFORMATIKA 10/LKPD 2.docx",
    driveUrl: "https://drive.google.com/file/d/1f84jptWKEKQWn0YIMTrI3__rxuYuSWRM/view?usp=sharing",
    badgeColor: "amber",
    summary: "Lembar Kerja Peserta Didik berisi tantangan logika dan simulasi praktis algoritma pencarian (Searching), pengurutan (Sorting), Stack, dan Queue.",
    objectives: [
      "Menyelesaikan studi kasus penelusuran data dengan algoritma pencarian.",
      "Melakukan simulasi langkah demi langkah pengurutan angka (Sorting).",
      "Memecahkan teka-teki operasi Push/Pop pada Stack dan Enqueue/Dequeue pada Queue."
    ],
    outline: [
      "A. Petunjuk Belajar & Ringkasan Konsep BK",
      "B. Aktivitas 1: Tantangan Tebak Angka & Pencarian (Searching)",
      "C. Aktivitas 2: Eksperimen Pengurutan Kartu (Sorting)",
      "D. Aktivitas 3: Simulasi Tumpukan (Stack) & Antrean (Queue)"
    ]
  },
  {
    id: "lkpd-bab3",
    title: "LKPD Bab 3: Teknologi Informasi dan Komunikasi",
    code: "LKPD 3",
    category: "lkpd",
    categoryLabel: "LKPD Siswa",
    semester: "Ganjil",
    format: "DOCX",
    fileSize: "26.7 KB",
    pages: "6 Halaman",
    jp: "Praktikum Lab",
    localPath: "../LKPD INFORMATIKA 10/LKPD 3.docx",
    driveUrl: "https://drive.google.com/file/d/1TZxFVblZdKp7HZ7R5_MQyT4tXo7jtrgt/view?usp=sharing",
    badgeColor: "amber",
    summary: "Panduan praktikum langkah demi langkah integrasi Microsoft Office / Google Workspace, pembuatan laporan ber-grafik, Mail Merge, dan Daftar Isi otomatis.",
    objectives: [
      "Mengintegrasikan tabel dan grafik dari Excel/Sheets ke dalam dokumen Word/Docs secara dinamis.",
      "Membuat sertifikat atau surat undangan massal menggunakan Mail Merge.",
      "Menyusun struktur dokumen laporan dengan Heading Styles dan Daftar Isi otomatis."
    ],
    outline: [
      "A. Persiapan Alat & Aplikasi Perkantoran",
      "B. Praktikum 1: Integrasi Tabel & Grafik (OLE)",
      "C. Praktikum 2: Pembuatan Surat Massal dengan Mail Merge",
      "D. Praktikum 3: Pembuatan Daftar Isi Otomatis"
    ]
  },
  {
    id: "lkpd-bab4",
    title: "LKPD Bab 4: Sistem Komputer",
    code: "LKPD 4",
    category: "lkpd",
    categoryLabel: "LKPD Siswa",
    semester: "Ganjil",
    format: "DOCX",
    fileSize: "27.2 KB",
    pages: "6 Halaman",
    jp: "Analisis & Observasi",
    localPath: "../LKPD INFORMATIKA 10/LKPD 4.docx",
    driveUrl: "https://drive.google.com/file/d/1gRw0wirI387lrloG0EWVFNEjgZADJ-fI/view?usp=sharing",
    badgeColor: "amber",
    summary: "Lembar Kerja Peserta Didik untuk menganalisis diagram blok arsitektur komputer, spesifikasi perangkat keras, serta simulasi interaksi perangkat keras dan sistem operasi.",
    objectives: [
      "Melengkapi dan menganalisis diagram blok konseptual komputer (Input, CPU, Memory, Output).",
      "Mengidentifikasi spesifikasi perangkat keras komputer/laptop untuk kebutuhan tertentu.",
      "Menjelaskan alur eksekusi instruksi di dalam CPU dan peran sistem operasi."
    ],
    outline: [
      "A. Petunjuk Belajar & Diagram Blok Komputer",
      "B. Aktivitas 1: Identifikasi Komponen CPU, Memori, dan I/O",
      "C. Aktivitas 2: Analisis Interaksi Hardware, Software & Brainware",
      "D. Studi Kasus: Merakit Spesifikasi Komputer Sesuai Kebutuhan"
    ]
  },
  {
    id: "lkpd-bab5",
    title: "LKPD Bab 5: Jaringan Komputer dan Internet",
    code: "LKPD 5",
    category: "lkpd",
    categoryLabel: "LKPD Siswa",
    semester: "Ganjil",
    format: "DOCX",
    fileSize: "26.4 KB",
    pages: "6 Halaman",
    jp: "Praktik & Perancangan",
    localPath: "../LKPD INFORMATIKA 10/LKPD 5.docx",
    driveUrl: "https://drive.google.com/file/d/1TApF-LqQS3hHkUdSI1utvE-KPvm5-StX/view?usp=sharing",
    badgeColor: "amber",
    summary: "Lembar Kerja Peserta Didik untuk merancang topologi jaringan lokal (LAN), menguji konektivitas jaringan, serta mempraktikkan enkripsi pesan sederhana.",
    objectives: [
      "Membandingkan topologi dan karakteristik jaringan lokal (LAN) dengan internet.",
      "Merancang denah jaringan komputer untuk laboratorium sekolah/madrasah.",
      "Menguji keamanan situs web (HTTPS/SSL) dan melakukan simulasi enkripsi teks (Caesar Cipher)."
    ],
    outline: [
      "A. Petunjuk Belajar & Konsep Dasar Jaringan",
      "B. Aktivitas 1: Perancangan Jaringan Lokal (LAN) Lab Komputer",
      "C. Aktivitas 2: Analisis Konektivitas Kabel & Nirkabel",
      "D. Aktivitas 3: Simulasi Enkripsi & Keamanan Berinternet"
    ]
  },
  {
    id: "lkpd-bab6",
    title: "LKPD Bab 6: Analisis Data",
    code: "LKPD 6",
    category: "lkpd",
    categoryLabel: "LKPD Siswa",
    semester: "Genap",
    format: "DOCX",
    fileSize: "27.4 KB",
    pages: "7 Halaman",
    jp: "Praktikum Google Colab",
    localPath: "../LKPD INFORMATIKA 10/LKPD 6.docx",
    driveUrl: "https://drive.google.com/file/d/1_fef1CGnx80p5weWuUAPkfSx0S2UD7IJ/view?usp=sharing",
    badgeColor: "amber",
    summary: "Panduan praktikum analisis data menggunakan Google Colab (Python) mulai dari koleksi data, pembersihan data (data cleaning), hingga pembuatan grafik visualisasi.",
    objectives: [
      "Menjalankan notebook Python dasar di lingkungan Google Colaboratory.",
      "Mengumpulkan dan membersihkan dataset sederhana dari nilai kosong/duplikat.",
      "Menampilkan visualisasi data dalam bentuk diagram batang/garis dan menarik kesimpulan."
    ],
    outline: [
      "A. Petunjuk Penggunaan Google Colab",
      "B. Praktikum 1: Eksplorasi Sintaks Dasar Python untuk Data",
      "C. Praktikum 2: Koleksi & Pra-pemrosesan Data (Data Cleaning)",
      "D. Praktikum 3: Visualisasi Data & Interpretasi Hasil"
    ]
  },
  {
    id: "lkpd-bab7",
    title: "LKPD Bab 7: Algoritma dan Pemrograman",
    code: "LKPD 7",
    category: "lkpd",
    categoryLabel: "LKPD Siswa",
    semester: "Genap",
    format: "DOCX",
    fileSize: "26.2 KB",
    pages: "7 Halaman",
    jp: "Praktikum Coding",
    localPath: "../LKPD INFORMATIKA 10/LKPD 7.docx",
    driveUrl: "https://drive.google.com/file/d/1QCCLuMTaecG93cFEdfpVRdXbmP8rDnYw/view?usp=sharing",
    badgeColor: "amber",
    summary: "Lembar Kerja Peserta Didik untuk menggambar diagram alir (Flowchart), menulis Pseudocode, dan mengimplementasikan kode program percabangan serta perulangan.",
    objectives: [
      "Mengonversi masalah sehari-hari menjadi Flowchart dan Pseudocode yang terstruktur.",
      "Menulis program sederhana yang menerima input, memproses perhitungan, dan menampilkan output.",
      "Menyelesaikan tantangan pemrograman dengan struktur percabangan (If-Else) dan perulangan (Loop)."
    ],
    outline: [
      "A. Petunjuk Belajar & Simbol Standar Flowchart",
      "B. Aktivitas 1: Perancangan Flowchart & Pseudocode",
      "C. Aktivitas 2: Praktikum Variabel, Tipe Data & Operator",
      "D. Aktivitas 3: Tantangan Coding Percabangan & Perulangan"
    ]
  },
  {
    id: "lkpd-bab8",
    title: "LKPD Bab 8: Dampak Sosial Informatika",
    code: "LKPD 8",
    category: "lkpd",
    categoryLabel: "LKPD Siswa",
    semester: "Genap",
    format: "DOCX",
    fileSize: "27.5 KB",
    pages: "6 Halaman",
    jp: "Diskusi & Studi Kasus",
    localPath: "../LKPD INFORMATIKA 10/LKPD 8.docx",
    driveUrl: "https://drive.google.com/file/d/19G5bQLad4ShhEz7BmFGmJEK54yL3OGTk/view?usp=sharing",
    badgeColor: "amber",
    summary: "Lembar Kerja Peserta Didik berbasis diskusi kritis mengenai dampak positif/negatif teknologi, analisis kasus pelanggaran HAKI/etika siber, dan pemetaan karier TI.",
    objectives: [
      "Mengkaji studi kasus nyata terkait jejak digital, hoax, cyberbullying, dan Undang-Undang ITE.",
      "Membedakan lisensi perangkat lunak komersial, freeware, shareware, dan open source.",
      "Menyusun rencana pengembangan diri dan eksplorasi profesi di bidang Informatika."
    ],
    outline: [
      "A. Petunjuk Diskusi Kelompok",
      "B. Aktivitas 1: Analisis Sejarah & Dampak Teknologi di Masyarakat",
      "C. Aktivitas 2: Studi Kasus Hukum, HAKI & Lisensi Software",
      "D. Aktivitas 3: Peta Karier & Masa Depan Informatika"
    ]
  },
  {
    id: "lkpd-bab9",
    title: "LKPD Bab 9: Praktika Lintas Bidang Informatika",
    code: "LKPD 9",
    category: "lkpd",
    categoryLabel: "LKPD Siswa",
    semester: "Genap",
    format: "DOCX",
    fileSize: "28.5 KB",
    pages: "8 Halaman",
    jp: "Proyek Akhir (Capstone)",
    localPath: "../LKPD INFORMATIKA 10/LKPD 9.docx",
    driveUrl: "https://drive.google.com/file/d/1AcqlKhVphoOMzZcy6nv0sZG9Qdg8PBws/view?usp=sharing",
    badgeColor: "amber",
    summary: "Buku kerja proyek akhir (Capstone Project) yang memandu tim siswa mulai dari observasi masalah di lingkungan sekolah, perancangan solusi, hingga laporan akhir.",
    objectives: [
      "Mendokumentasikan hasil observasi masalah di lingkungan sekitar yang dapat dibantu dengan solusi informatika.",
      "Menyusun jadwal kerja proyek, pembagian peran, dan rancangan prototipe solusi.",
      "Mengevaluasi hasil uji coba solusi dan menyusun laporan akhir proyek kelompok."
    ],
    outline: [
      "A. Panduan Proyek Akhir Lintas Bidang & Pembagian Peran Tim",
      "B. Tahap 1: Lembar Observasi & Rumusan Masalah Lingkungan",
      "C. Tahap 2: Perancangan Solusi & Pengembangan Artefak Digital",
      "D. Tahap 3: Pengujian, Laporan Akhir & Evaluasi Proyek"
    ]
  }
];
