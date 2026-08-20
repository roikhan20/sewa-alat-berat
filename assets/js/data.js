/**
 * data.js — Satu-satunya file yang perlu diubah ketika ada cabang baru.
 *
 * CARA MENAMBAH CABANG BARU:
 * 1. Salin salah satu objek branch di bawah.
 * 2. Isi semua field sesuai data cabang baru.
 * 3. Simpan file. Selesai — tidak ada file lain yang perlu diubah.
 */

const COMPANY = {
  name: 'PT Cipta Unggul Lintas Samudera',
  shortName: 'CULS Indonesia',
  tagline: 'Solusi Sewa Alat Berat Profesional',
  description: 'Solusi penyewaan alat berat profesional untuk industri, logistik, pergudangan, dan konstruksi di seluruh Indonesia sejak 2009.',
  email: 'culsindonesia@gmail.com',
  fax: '0812-1899-2550',
  social: {
    instagram: 'https://www.instagram.com/ciptaunggulsamudra/',
    facebook: 'https://www.facebook.com/sarana.c.unggul',
    tiktok: 'https://www.tiktok.com/@ciptaunggulsamudra',
    youtube: 'https://www.youtube.com/@ciptaunggulsamudra',
  }
};

/**
 * BRANCHES — tambah objek baru di sini untuk cabang baru.
 *
 * Field wajib:
 *   id          : string unik tanpa spasi, dipakai sebagai URL param (?branch=id)
 *   name        : nama tampilan cabang
 *   area        : area layanan singkat
 *   address     : alamat lengkap
 *   phone       : nomor telepon (boleh HTML <br> untuk multiple)
 *   wa          : nomor WhatsApp — hanya angka 62xxx, tanpa tanda +/spasi/strip
 *                 Boleh array jika lebih dari satu: ['628xxx', '628yyy']
 *   fax         : nomor fax
 *   email       : email cabang
 *   hours       : jam operasional
 *   color       : warna tema kartu cabang (hex)
 *   mapEmbed    : URL embed Google Maps (iframe src)
 *   mapLink     : URL Google Maps untuk tombol "Buka di Maps"
 *   equipment   : array id alat berat yang tersedia (dari EQUIPMENT di bawah)
 *                 Isi ['all'] untuk tampilkan semua alat.
 *   stats       : [{ num, label }, ...] — statistik yang tampil di halaman cabang
 */
const BRANCHES = [
  {
    id: 'bogor',
    name: 'Cabang Bogor',
    area: 'Bogor Kota, Cibinong, Citeureup',
    address: 'Jl. Raya Pemda No.5, RT.03/RW.06, Kedunghalang, Kec. Bogor Utara, Kota Bogor, Jawa Barat 16158',
    phone: '0812-4611-1160 (Forklift)<br>0812-8242-8686 (Crane)',
    wa: ['6281246111160', '6281282428686'],
    fax: '0812-1899-2550',
    email: 'culsindonesia@gmail.com',
    hours: 'Senin–Minggu, 24 Jam',
    color: '#1a3060',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.7207166594076!2d106.8097371743036!3d-6.556897564096675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c543b7fc2ca5%3A0x15cbfd78026b8ad7!2sJasa%20Sewa%20Crane%20%26%20Sewa%20Forklift%20%7C%20PT%20Cipta%20Unggul%20Lintas%20Samudra!5e0!3m2!1sid!2sid!4v1781843267602!5m2!1sid!2sid"',
    mapLink: 'https://maps.app.goo.gl/4NyAorkzSnXYGUqQ6',
    equipment: ['all'],
    stats: [
      { num: '8', label: 'Tahun Beroperasi' },
      { num: '200+', label: 'Unit Armada' },
      { num: '24/7', label: 'Layanan' },
    ],
    /* ── Ditambahkan untuk Local SEO — tidak mengubah field lain ── */
    lat: -6.556897564096675,
    lng: 106.8097371743036,
    serviceAreas: ['Bogor Kota', 'Cibinong', 'Citeureup', 'Gunung Putri', 'Sentul'],
  },
  {
    id: 'tangerang',
    name: 'Cabang Tangerang',
    area: 'Tangerang, BSD, Serpong',
    address: 'Jl. Raya Puspitek Simpang Victor No.37 Tangerang Selatan',
    phone: '0811-1804-218',
    wa: '628111804218',
    fax: '0812-1899-2550',
    email: 'culsindonesia@gmail.com',
    hours: 'Senin–Jumat 08.00–17.00, Sabtu 08.00–13.00',
    color: '#2a1a08',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3!2d106.64!3d-6.34!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjAnMjQuMCJTIDEwNsKwMzgnMjQuMCJF!5e0!3m2!1sid!2sid!4v1234567890',
    mapLink: 'https://maps.google.com/?q=Jl.+Raya+Puspitek+Tangerang+Selatan',
    equipment: ['forklift-diesel-3t', 'forklift-diesel-5t', 'forklift-electric-2-5t', 'truck-crane-25t', 'scissor-lift-12m'],
    stats: [
      { num: '8', label: 'Tahun Beroperasi' },
      { num: '80+', label: 'Unit Armada' },
      { num: '24/7', label: 'Layanan' },
    ],
    lat: -6.3350,
    lng: 106.6533,
    serviceAreas: ['BSD', 'Serpong', 'Gading Serpong', 'Cikupa', 'Balaraja'],
  },
  {
    id: 'jakarta-timur',
    name: 'Cabang Jakarta Timur',
    area: 'Cakung, Pulogadung, Jatinegara',
    address: 'Jl. Raya Bekasi km 23.5 RT.1/RW.2, Cakung Tim., Kec. Cakung, Kota Jakarta Timur',
    phone: '0856-9777-7085',
    wa: '6285697777085',
    fax: '0812-1899-2550',
    email: 'culsindonesia@gmail.com',
    hours: 'Senin–Jumat 08.00–17.00, Sabtu 08.00–13.00',
    color: '#1a3060',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d126931.01078371084!2d106.8020054!3d-6.185042!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b4f1453ff63%3A0x9d814bde9b6d96fc!2sRental%20Crane%20Forklift%20Jabodetabek%20-%20Cipta%20Unggul%20Lintas%20Samudra!5e0!3m2!1sid!2sid!4v1781843826766!5m2!1sid!2sid',
    mapLink: 'https://maps.app.goo.gl/7ufJw5cECri4bSfh8',
    equipment: ['forklift-diesel-3t', 'forklift-diesel-5t', 'truck-crane-25t', 'mobile-crane-50t', 'boom-lift-16m'],
    stats: [
      { num: '8', label: 'Tahun Beroperasi' },
      { num: '120+', label: 'Unit Armada' },
      { num: '24/7', label: 'Layanan' },
    ],
    lat: -6.185042,
    lng: 106.8020054,
    serviceAreas: ['Cakung', 'Pulogadung', 'Klender', 'Duren Sawit'],
  },
  
  {
    id: 'jakarta-selatan',
    name: 'Cabang Jakarta Selatan',
    area: 'Ragunan, Kebayoran Lama, Cipete',
    address: 'Jl. Saco Ragunan Blok C No. 23–24 Kav. Polri, Jakarta Selatan, DKI Jakarta',
    phone: '0811-1998-522',
    wa: '6281119985220',
    fax: '0812-1899-2550',
    email: 'culsindonesia@gmail.com',
    hours: 'Senin–Jumat 08.00–17.00, Sabtu 08.00–13.00',
    color: '#1a3060',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.82!3d-6.30!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTgnMDAuMCJTIDEwNsKwNDknMTIuMCJF!5e0!3m2!1sid!2sid!4v1234567890',
    mapLink: 'https://maps.google.com/?q=Jl.+Saco+Ragunan+Jakarta+Selatan',
    equipment: ['forklift-diesel-3t', 'forklift-electric-2-5t', 'scissor-lift-12m', 'boom-lift-16m'],
    stats: [
      { num: '8', label: 'Tahun Beroperasi' },
      { num: '60+', label: 'Unit Armada' },
      { num: '24/7', label: 'Layanan' },
    ],
    lat: -6.3006,
    lng: 106.8203,
    serviceAreas: ['Ragunan', 'Cipete', 'Pasar Minggu', 'Kebayoran'],
  },
  
  {
    id: 'jakarta-barat',
    name: 'Cabang Jakarta Barat',
    area: 'Kapuk, Kebon Jeruk, Taman Sari',
    address: 'Jl. Kapuk Kamal Raya No.54, RT.12/RW.11, Kapuk, Kec. Cengkareng, Kota Jakarta Barat 11720',
    phone: '0811-1804-219',
    wa: '6281118042190',
    fax: '0812-1899-2550',
    email: 'culsindonesia@gmail.com',
    hours: 'Senin–Jumat 08.00–17.00, Sabtu 08.00–13.00',
    color: '#1a3060',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.72!3d-6.11!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDYnMzYuMCJTIDEwNsKwNDMnMTIuMCJF!5e0!3m2!1sid!2sid!4v1234567890',
    mapLink: 'https://maps.google.com/?q=Jl.+Kapuk+Kamal+Raya+Jakarta+Barat',
    equipment: ['forklift-diesel-3t', 'forklift-diesel-5t', 'truck-crane-25t', 'scissor-lift-12m'],
    stats: [
      { num: '8', label: 'Tahun Beroperasi' },
      { num: '50+', label: 'Unit Armada' },
      { num: '24/7', label: 'Layanan' },
    ],
    lat: -6.1195,
    lng: 106.7295,
    serviceAreas: ['Cengkareng', 'Kapuk', 'Kebon Jeruk', 'Taman Sari'],
  },
  {
    id: 'bandung',
    name: 'Cabang Bandung',
    area: 'Bandung, Cimahi, Padalarang',
    address: 'Jl. Raya Soekarno Hatta No. 502, Bandung, Jawa Barat',
    phone: '0811-8741-411',
    wa: '6281187414110',
    fax: '0812-1899-2550',
    email: 'culsindonesia@gmail.com',
    hours: 'Senin–Jumat 08.00–17.00, Sabtu 08.00–13.00',
    color: '#2a1040',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9!2d107.63!3d-6.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTUnNDguMCJTIDEwN8KwMzcnNDguMCJF!5e0!3m2!1sid!2sid!4v1234567890',
    mapLink: 'https://maps.google.com/?q=Jl.+Soekarno+Hatta+502+Bandung',
    equipment: ['all'],
    stats: [
      { num: '8', label: 'Tahun Beroperasi' },
      { num: '100+', label: 'Unit Armada' },
      { num: '24/7', label: 'Layanan' },
    ],
    lat: -6.9505,
    lng: 107.6098,
    serviceAreas: ['Cimahi', 'Padalarang', 'Soreang', 'Rancaekek'],
  },
  {
    id: 'bekasi',
    name: 'Cabang Bekasi',
    area: 'Bekasi, Cikarang, Cibitung',
    address: 'Jl. Cipendawa Baru No. 83A, Bojong Menteng, Rawa Lumbu, Bekasi',
    phone: '0812-2501-5000 (Crane)<br>0877-1700-0098 (Forklift)',
    wa: ['6281225015000', '6287717000098'],
    fax: '0812-1899-2550',
    email: 'culsindonesia@gmail.com',
    hours: 'Senin–Jumat 08.00–17.00, Sabtu 08.00–13.00',
    color: '#0f3520',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7!2d107.01!3d-6.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTYnMTIuMCJTIDEwN8KwMDAnMzYuMCJF!5e0!3m2!1sid!2sid!4v1234567890',
    mapLink: 'https://maps.google.com/?q=Jl.+Cipendawa+Baru+Bekasi',
    equipment: ['all'],
    stats: [
      { num: '8', label: 'Tahun Beroperasi' },
      { num: '150+', label: 'Unit Armada' },
      { num: '24/7', label: 'Layanan' },
    ],
    lat: -6.2607,
    lng: 107.0079,
    serviceAreas: ['Bekasi Timur', 'Bekasi Barat', 'Tambun', 'Cikarang', 'MM2100', 'Jababeka'],
  },
];

/* Catatan: koordinat (lat/lng) di atas adalah titik area cabang untuk
   kebutuhan Local SEO (schema geo). Silakan sesuaikan dengan titik lokasi
   presisi dari Google Maps masing-masing cabang bila diperlukan. */

/**
 * EQUIPMENT — daftar semua alat berat.
 * Field `id` dipakai sebagai referensi dari BRANCHES[n].equipment.
 * Isi equipment: ['all'] di cabang untuk tampilkan semua unit.
 * Field `photo` bersifat opsional; isi dengan path/URL gambar jika ingin
 * menampilkan foto di card alat berat (contoh: 'assets/img/equipment/forklift.webp').
 */
const EQUIPMENT = [
  {
    id: 'mobile-crane-7t',
    name: 'Mobile Crane 7 Ton',
    cat: 'crane',
    capacity: '7.000 kg',
    icon: 'ti-crane',
    photo: 'assets/img/equipment/mobile-crane-7t.webp',
    specs: ['Reach: 12 m', 'Engine: Kubota Diesel', 'Boom Length: 15 m', 'Tahun: 2020–2023'],
    desc: 'Crane ringan untuk area terbatas dan akses sulit.',
  },
  {
    id: 'mobile-crane-25t',
    name: 'Mobile Crane 25 Ton',
    cat: 'crane',
    capacity: '25.000 kg',
    icon: 'ti-crane',
    photo: 'assets/img/equipment/mobile-crane-25t.webp',
    specs: ['Reach: 18 m', 'Engine: Mitsubishi Diesel', 'Boom Length: 22 m', 'Tahun: 2020–2023'],
    desc: 'Crane standar untuk gudang, pabrik, dan konstruksi.',
  },
  {
    id: 'mobile-crane-45t',
    name: 'Mobile Crane 45 Ton',
    cat: 'crane',
    capacity: '45.000 kg',
    icon: 'ti-crane',
    photo: 'assets/img/equipment/mobile-crane-45t.webp',
    specs: ['Reach: 25 m', 'Engine: Cummins Diesel', 'Boom Length: 32 m', 'Tahun: 2020–2023'],
    desc: 'Crane besar untuk proyek infrastruktur dan konstruksi bertingkat.'
  },
  {
    id: 'mobile-crane-50t',
    name: 'Mobile Crane 50 Ton',
    cat: 'crane',
    capacity: '50.000 kg',
    icon: 'ti-crane',
    photo: 'assets/img/equipment/mobile-crane-50t.webp',
    specs: ['Reach: 28 m', 'Engine: Cummins Diesel', 'Boom Length: 36 m', 'Tahun: 2020–2023'],
    desc: 'Crane ultra berat untuk konstruksi gedung dan jembatan besar.'
  },
  {
    id: 'mobile-crane-55t',
    name: 'Mobile Crane 55 Ton',
    cat: 'crane',
    capacity: '55.000 kg',
    icon: 'ti-crane',
    photo: 'assets/img/equipment/mobile-crane-55ton.webp',
    specs: ['Reach: 30 m', 'Engine: Cummins Diesel Turbo', 'Boom Length: 40 m', 'Tahun: 2020–2023'],
    desc: 'Crane kelas tertinggi untuk megaproject infrastruktur premium.'
  },

  {
    id: 'truck-crane-3t',
    name: 'Truck Crane 3 Ton',
    cat: 'crane',
    capacity: '3.000 kg',
    icon: 'ti-crane',
    photo: 'assets/img/equipment/truck-crane-3t.webp',
    specs: ['Jib Length: 8 m', 'Engine: Hino Diesel', 'Boom Angle: 0–72°', 'Tahun: 2020–2023'],
    desc: 'Truck crane kompak untuk pengiriman cepat dan lokasi sulit.'
  },
  {
    id: 'truck-crane-5t',
    name: 'Truck Crane 5 Ton',
    cat: 'crane',
    capacity: '5.000 kg',
    icon: 'ti-crane',
    photo: 'assets/img/equipment/truck-crane-5t.webp',
    specs: ['Jib Length: 10 m', 'Engine: Isuzu Diesel', 'Boom Angle: 0–75°', 'Tahun: 2020–2023'],
    desc: 'Truck crane untuk pengiriman dan instalasi equipment.'
  },
  {
    id: 'forklift-diesel-3t',
    name: 'Forklift Diesel 3 Ton',
    cat: 'forklift',
    capacity: '3.000 kg',
    icon: 'ti-forklift',
    photo: 'assets/img/equipment/forklift-diesel-3t.webp',
    specs: ['Max Lift Height: 3.0 m', 'Engine: Kubota Diesel 2-Cylinder', 'Tires: Pneumatic 6.50-10', 'Tahun: 2020–2023'],
    desc: 'Forklift entry-level untuk pergudangan ringan dan distribusi.'
  },
  {
    id: 'forklift-diesel-5t',
    name: 'Forklift Diesel 5 Ton',
    cat: 'forklift',
    capacity: '5.000 kg',
    icon: 'ti-forklift',
    photo: 'assets/img/equipment/forklift-diesel-5t.webp',
    specs: ['Max Lift Height: 3.3 m', 'Engine: Mitsubishi Diesel 4-Cylinder', 'Tires: Pneumatic 28×9-15', 'Tahun: 2021–2023'],
    desc: 'Forklift industri untuk pabrik dan logistik menengah.'
  },
  {
    id: 'forklift-diesel-7t',
    name: 'Forklift Diesel 7 Ton',
    cat: 'forklift',
    capacity: '7.000 kg',
    icon: 'ti-forklift',
    photo: 'assets/img/equipment/forklift-diesel-7t.webp',
    specs: ['Max Lift Height: 3.0 m', 'Engine: Kubota Diesel 4-Cylinder', 'Tires: Pneumatic 28×9-15', 'Tahun: 2020–2023'],
    desc: 'Forklift heavy-duty untuk warehouse ekstrem dan yard outdoor.'
  },
   {
    id: 'forklift-diesel-10t',
    name: 'Forklift Diesel 10 Ton',
    cat: 'forklift',
    capacity: '10.000 kg',
    icon: 'ti-forklift',
    photo: 'assets/img/equipment/forklift-diesel-10t.webp',
    specs: ['Max Lift Height: 3.0 m', 'Engine: Kubota Diesel 4-Cylinder Turbo', 'Tires: Pneumatic 28×9-15', 'Tahun: 2020–2023'],
    desc: 'Forklift ultra berat untuk pelabuhan dan logistik volume tinggi.'
  },
  {
    id: 'forklift-diesel-15t',
    name: 'Forklift Diesel 15 Ton',
    cat: 'forklift',
    capacity: '15.000 kg',
    icon: 'ti-forklift',
    photo: 'assets/img/equipment/forklift-diesel-15t.webp',
    specs: ['Max Lift Height: 3.0 m', 'Engine: Kubota Diesel 4-Cylinder Turbo-Intercooler', 'Tires: Pneumatic 28×9-15 Double', 'Tahun: 2020–2023'],
    desc: 'Forklift kapasitas tertinggi untuk handling material premium.'
  },
  {
    id: 'forklift-electric-2-5t',
    name: 'Forklift Electric 2.5 Ton',
    cat: 'forklift',
    capacity: '2.500 kg',
    icon: 'ti-forklift',
    photo: 'assets/img/equipment/forklift-elektrik-2.5t.webp',
    specs: ['Max Lift Height: 3.0 m', 'Battery: 48V Lithium-Ion', 'Operating Hours: 8 jam/charge', 'Tahun: 2022–2024'],
    desc: 'Forklift ramah lingkungan untuk indoor tanpa emisi.'
  },
];

const INDUSTRIES = [
  { icon: 'ti-building-warehouse', name: 'Pergudangan & Logistik' },
  { icon: 'ti-building-factory-2', name: 'Manufaktur & Pabrik' },
  { icon: 'ti-building-bridge-2',  name: 'Konstruksi & Infrastruktur' },
  { icon: 'ti-ship',               name: 'Pelabuhan & Kepelabuhanan' },
  { icon: 'ti-plane',              name: 'Kawasan Industri & Bandara' },
  { icon: 'ti-building-store',     name: 'Ritel & Distribusi' },
];

/**
 * RENTAL_PROCESS — alur sewa generik, dipakai di homepage & halaman cabang
 * pada section "Proses Penyewaan".
 */
const RENTAL_PROCESS = [
  { step: '1', title: 'Hubungi Kami',        desc: 'Chat WhatsApp atau isi form dengan kebutuhan alat, lokasi, dan durasi sewa.' },
  { step: '2', title: 'Konsultasi & Penawaran', desc: 'Tim sales memberikan rekomendasi unit dan penawaran harga dalam 1×24 jam.' },
  { step: '3', title: 'Konfirmasi & Jadwal',  desc: 'Setelah deal, kami jadwalkan pengiriman unit dan operator ke lokasi Anda.' },
  { step: '4', title: 'Unit Siap Operasi',    desc: 'Alat berat & operator bersertifikat K3 siap bekerja sesuai jadwal proyek.' },
];

const FAQS = [
  { q: 'Apakah tersedia layanan operator?', a: 'Ya, kami menyediakan operator bersertifikat K3 untuk semua unit alat berat. Operator kami berpengalaman lebih dari 5 tahun dan memiliki SIO (Surat Izin Operator) resmi dari Kementerian Ketenagakerjaan RI.' },
  { q: 'Apakah tersedia sewa harian (daily rental)?', a: 'Tentu. Kami menawarkan paket sewa harian, mingguan, dan bulanan. Untuk proyek jangka panjang (lebih dari 1 bulan), kami memiliki harga khusus yang lebih kompetitif.' },
  { q: 'Apakah alat berat bisa dikirim ke luar kota?', a: 'Ya, kami melayani pengiriman alat berat ke seluruh Pulau Jawa dan beberapa wilayah Sumatera. Biaya mobilisasi disesuaikan berdasarkan jarak dan jenis alat berat.' },
  { q: 'Bagaimana cara meminta penawaran harga (quotation)?', a: 'Anda dapat menghubungi kami melalui WhatsApp, telepon, atau mengisi form kontak di website ini. Sebutkan jenis alat, kapasitas, lokasi proyek, dan durasi sewa. Tim sales kami akan mengirimkan penawaran dalam 1×24 jam.' },
];
