/**
 * branch-content.js
 *
 * Menambahkan konten landing-page SEO ke cabang.html:
 *   - Breadcrumb (Home / Cabang / Nama Cabang)
 *   - Tentang Cabang + Keunggulan Cabang (Operator Bersertifikat, 24 Jam)
 *   - Area Layanan cabang
 *   - Jenis Industri yang dilayani
 *   - Proses Penyewaan
 *   - CTA WhatsApp
 *
 * Berjalan independen dari branch-renderer.js (tidak mengubah fungsi apa
 * pun di file itu). Jika cabang tidak ditemukan (branch-renderer sudah
 * menampilkan halaman 404), file ini otomatis tidak melakukan apa-apa.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', run);
  if (document.readyState !== 'loading') run();

  function run() {
    if (typeof BRANCHES === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const branch = BRANCHES.find(b => b.id === params.get('branch'));
    if (!branch) return; // branch-renderer.js sudah menampilkan 404

    renderBreadcrumb(branch);
    renderAbout(branch);
    renderServiceAreas(branch);
    renderIndustries(branch);
    renderProcess();
    renderCta(branch);
  }

  function shortName(b) { return b.name.replace(/^Cabang\s+/i, ''); }
  function firstWa(b) { return Array.isArray(b.wa) ? b.wa[0] : b.wa; }

  function renderBreadcrumb(b) {
    const el = document.getElementById('breadcrumbList');
    if (!el) return;
    el.innerHTML = `
      <li><a href="index.html">Home</a></li>
      <li><a href="index.html#branches">Cabang</a></li>
      <li aria-current="page">${b.name}</li>
    `;
  }

  function renderAbout(b) {
    const el = document.getElementById('branch-about-content');
    if (!el) return;
    const eqCount = (b.equipment.includes('all') ? EQUIPMENT : EQUIPMENT.filter(e => b.equipment.includes(e.id))).length;
    el.innerHTML = `
      <div>
        <p>${window.COMPANY_NAME_SAFE || COMPANY.name} melayani penyewaan alat berat di wilayah ${b.area} dan sekitarnya
        melalui Cabang ${shortName(b)}. Kami menyediakan ${eqCount}+ tipe unit siap sewa, mulai dari forklift diesel/electric
        hingga crane, dengan dukungan operator bersertifikat K3 dan layanan ${/24\s*Jam/i.test(b.hours) ? '24 jam setiap hari' : 'reguler setiap pekan'}.</p>
        <p>Cabang ${shortName(b)} berlokasi strategis di ${b.address}, memudahkan pengiriman cepat ke lokasi proyek,
        pabrik, maupun kawasan pergudangan di sekitar ${(b.serviceAreas || []).slice(0, 3).join(', ')}.</p>
      </div>
      <ul class="branch-usp-list">
        <li><i class="ti ti-certificate" aria-hidden="true"></i><span>Operator bersertifikat SIO Kemnaker RI</span></li>
        <li><i class="ti ti-clock-24" aria-hidden="true"></i><span>${/24\s*Jam/i.test(b.hours) ? 'Layanan siaga 24 jam' : 'Respons cepat di jam operasional'}</span></li>
        <li><i class="ti ti-truck-delivery" aria-hidden="true"></i><span>Pengiriman unit langsung ke lokasi proyek</span></li>
        <li><i class="ti ti-tools" aria-hidden="true"></i><span>Unit terawat dengan inspeksi berkala</span></li>
      </ul>
    `;
  }

  function renderServiceAreas(b) {
    const el = document.getElementById('branch-areas-grid');
    if (!el) return;
    const areas = b.serviceAreas || [b.area];
    el.innerHTML = `<div class="tag-grid">${areas.map(a => `<span class="area-tag"><i class="ti ti-map-pin" aria-hidden="true"></i>${a}</span>`).join('')}</div>`;
  }

  function renderIndustries(b) {
    const el = document.getElementById('branch-industries-grid');
    if (!el || typeof INDUSTRIES === 'undefined') return;
    el.innerHTML = INDUSTRIES.map(ind => `
      <div class="industry-card">
        <div class="why-icon"><i class="ti ${ind.icon}" aria-hidden="true"></i></div>
        <span>${ind.name}</span>
      </div>
    `).join('');
  }

  function renderProcess() {
    const el = document.getElementById('branch-process-grid');
    if (!el || typeof RENTAL_PROCESS === 'undefined') return;
    el.innerHTML = RENTAL_PROCESS.map(s => `
      <div class="process-card">
        <div class="process-num">${s.step}</div>
        <h4>${s.title}</h4>
        <p>${s.desc}</p>
      </div>
    `).join('');
  }

  function renderCta(b) {
    const el = document.getElementById('branch-cta');
    if (!el) return;
    el.innerHTML = `
      <div class="cta-band">
        <h3>Butuh Alat Berat di ${shortName(b)} Hari Ini?</h3>
        <p>Konsultasikan kebutuhan proyek Anda, tim kami balas dalam 1×24 jam.</p>
        <a href="https://wa.me/${firstWa(b)}" class="btn-primary" target="_blank" rel="noopener">
          <i class="ti ti-brand-whatsapp" aria-hidden="true"></i>
          Chat WhatsApp Sekarang
        </a>
      </div>
    `;
  }

})();
