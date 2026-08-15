/**
 * branch-renderer.js
 *
 * Engine utama halaman cabang.
 * Membaca ?branch=xxx dari URL, menemukan data cabang, lalu me-render
 * seluruh konten halaman secara dinamis dari data.js.
 *
 * TIDAK PERLU DIUBAH saat menambah cabang baru.
 */

(function () {
  'use strict';

  /* ── 1. Baca parameter URL ── */
  const params  = new URLSearchParams(window.location.search);
  const branchId = params.get('branch');

  /* ── 2. Cari data cabang ── */
  const branch = BRANCHES.find(b => b.id === branchId);

  /* ── 3. Jika tidak ditemukan → tampilkan halaman 404 ── */
  if (!branch) {
    renderNotFound(branchId);
    return;
  }

  /* ── 4. Render semua bagian ── */
  document.title = `${branch.name} — ${COMPANY.shortName}`;
  renderNav(branch);
  renderHero(branch);
  renderBranchInfo(branch);
  renderEquipment(branch);
  renderContact(branch);
  renderFooter();
  renderFaq();
  initScrollSpy();
  initFaqToggle();

  /* ════════════════════════════════════════════
     RENDER FUNCTIONS
  ════════════════════════════════════════════ */

  function renderNav(b) {
    const firstWa = Array.isArray(b.wa) ? b.wa[0] : b.wa;
    const navWaBtn = document.getElementById('navWaBtn');
    if (navWaBtn) {
      navWaBtn.href = `https://wa.me/${firstWa}`;
    }
  }

  function renderHero(b) {
    document.getElementById('heroBadge').textContent  = b.area;
    document.getElementById('heroTitle').innerHTML    =
      `Sewa Alat Berat <span>${b.name}</span>`;
    document.getElementById('heroSubtitle').textContent =
      `Layanan profesional penyewaan forklift dan crane di wilayah ${b.area}. Armada lengkap, operator bersertifikat K3, siap melayani kebutuhan industri Anda.`;

    const firstWa = Array.isArray(b.wa) ? b.wa[0] : b.wa;
    document.getElementById('heroWaBtn').href  = `https://wa.me/${firstWa}`;
    document.getElementById('heroMapBtn').href = b.mapLink;

    // Stats
    document.getElementById('heroStats').innerHTML = b.stats.map(s => `
      <div class="hero-stat">
        <div class="hero-stat-num">${s.num}</div>
        <div class="hero-stat-label">${s.label}</div>
      </div>
    `).join('');
  }

  function renderBranchInfo(b) {
    // Nomor WA untuk tombol (bisa multiple)
    const waButtons = (Array.isArray(b.wa) ? b.wa : [b.wa]).map(num => `
      <a href="https://wa.me/${num}" class="wa-btn" target="_blank" rel="noopener">
        <i class="ti ti-brand-whatsapp"></i>
        WhatsApp ${num.replace('62','0').replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')}
      </a>
    `).join('');

    document.getElementById('branchInfoContent').innerHTML = `
      <div class="info-card">
        <div class="info-header" style="background:${b.color}">
          <i class="ti ti-building-factory-2"></i>
          <div>
            <h3>${b.name}</h3>
            <span class="area-pill">${b.area}</span>
          </div>
        </div>
        <div class="info-body">
          ${infoRow('ti-map-pin',   'Alamat',             b.address)}
          ${infoRow('ti-phone',     'Telepon',            b.phone)}
          ${infoRow('ti-printer',   'Fax',                b.fax)}
          ${infoRow('ti-mail',      'Email',              b.email)}
          ${infoRow('ti-clock',     'Jam Operasional',    b.hours)}
          <div class="wa-buttons">${waButtons}</div>
        </div>
      </div>
    `;

    // Google Maps iframe
    document.getElementById('branchMap').innerHTML = `
      <iframe
        src="${b.mapEmbed}"
        width="100%" height="100%" style="border:0;min-height:420px"
        allowfullscreen loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Peta lokasi ${b.name}">
      </iframe>
      <a href="${b.mapLink}" target="_blank" rel="noopener" class="map-open-btn">
        <i class="ti ti-external-link"></i> Buka di Google Maps
      </a>
    `;
  }

  function infoRow(icon, label, value) {
    return `
      <div class="info-row">
        <i class="ti ${icon}"></i>
        <div>
          <label>${label}</label>
          <p>${value}</p>
        </div>
      </div>
    `;
  }

  function renderEquipment(b) {
    // Tentukan daftar alat yang tampil
    const showAll  = b.equipment.includes('all');
    const filtered = showAll
      ? EQUIPMENT
      : EQUIPMENT.filter(e => b.equipment.includes(e.id));

    // Ambil kategori unik
    const cats = ['all', ...new Set(filtered.map(e => e.cat))];
    const catLabels = { all:'Semua', forklift:'Forklift', crane:'Crane', boom:'Boom Lift', scissor:'Scissor Lift' };

    document.getElementById('eqTabs').innerHTML = cats.map(c => `
      <button class="eq-tab ${c==='all'?'active':''}" data-cat="${c}">
        ${catLabels[c] || c}
      </button>
    `).join('');

    renderEqCards(filtered, 'all');

    document.getElementById('eqTabs').addEventListener('click', e => {
      const tab = e.target.closest('.eq-tab');
      if (!tab) return;
      document.querySelectorAll('.eq-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderEqCards(filtered, tab.dataset.cat);
    });
  }

  function renderEqCards(list, cat) {
    const visible = cat === 'all' ? list : list.filter(e => e.cat === cat);
    const catLabels = { forklift:'Forklift', crane:'Crane', boom:'Boom Lift', scissor:'Scissor Lift' };

    document.getElementById('eqGrid').innerHTML = visible.map(e => {
      const photoHtml = e.photo
        ? `<img class="eq-photo" src="${e.photo}" alt="${e.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.querySelector('i').style.display='block';">`
        : '';

      return `
        <div class="eq-card">
          <div class="eq-img eq-bg-${e.cat}">
            <span class="eq-badge">${catLabels[e.cat] || e.cat}</span>
            ${photoHtml}
            <i class="ti ${e.icon}"></i>
          </div>
          <div class="eq-body">
            <h4>${e.name}</h4>
            <div class="eq-capacity"><i class="ti ti-weight"></i>${e.capacity}</div>
            <ul class="eq-specs">
              ${e.specs.map(s => `<li><i class="ti ti-point"></i>${s}</li>`).join('')}
            </ul>
            <p class="eq-desc">${e.desc}</p>
            <a href="https://wa.me/${getFirstWa(branch)}" target="_blank" class="eq-wa-btn">
              <i class="ti ti-brand-whatsapp"></i> Tanyakan Ketersediaan
            </a>
          </div>
        </div>
      `;
    }).join('');

    if (visible.length === 0) {
      document.getElementById('eqGrid').innerHTML = `
        <div class="eq-empty"><i class="ti ti-mood-empty"></i><p>Tidak ada unit untuk kategori ini.</p></div>
      `;
    }
  }

  function renderContact(b) {
    const firstWa = getFirstWa(b);
    const waList = (Array.isArray(b.wa) ? b.wa : [b.wa])
      .map(num => num.replace(/^62/, '0'))
      .join('<br>');

    document.getElementById('contactPhone').innerHTML  = b.phone;
    document.getElementById('contactWa').innerHTML     = waList || b.phone;
    document.getElementById('contactEmail').textContent = b.email;
    document.getElementById('contactHours').innerHTML  = b.hours;
    document.getElementById('contactAddress').textContent = b.address;

    const contactWaLink = document.getElementById('contactWaLink');
    if (contactWaLink) {
      contactWaLink.href = `https://wa.me/${firstWa}`;
    }
  }

  function renderFooter() {
    // Render daftar semua cabang di footer secara otomatis
    document.getElementById('footerBranches').innerHTML = BRANCHES.map(b => `
      <li><a href="cabang/${b.id}/">${b.name}</a></li>
    `).join('');

    document.getElementById('footerYear').textContent = new Date().getFullYear();
  }

  function renderFaq() {
    document.getElementById('faqList').innerHTML = FAQS.map((f, i) => `
      <div class="faq-item" id="faq-${i}">
        <button class="faq-q" onclick="toggleFaq(${i})">
          ${f.q}
          <i class="ti ti-chevron-down"></i>
        </button>
        <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>
      </div>
    `).join('');
  }

  function renderNotFound(attemptedId) {
    document.title = 'Cabang Tidak Ditemukan — ' + COMPANY.shortName;
    document.body.innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif;background:#0a1628;color:#fff;text-align:center;padding:2rem">
        <div>
          <div style="font-size:80px;margin-bottom:1rem">🏗️</div>
          <h1 style="font-size:48px;font-weight:800;color:#f5a623;margin-bottom:0.5rem">404</h1>
          <h2 style="font-size:22px;font-weight:700;margin-bottom:1rem">Cabang Tidak Ditemukan</h2>
          <p style="color:rgba(255,255,255,0.6);margin-bottom:0.5rem">
            ${attemptedId ? `ID cabang "<strong style="color:#fff">${attemptedId}</strong>" tidak ada dalam data.` : 'Parameter branch tidak ditemukan di URL.'}
          </p>
          <p style="color:rgba(255,255,255,0.5);font-size:14px;margin-bottom:2rem">
            Pastikan URL menggunakan format: <code style="background:rgba(255,255,255,0.1);padding:2px 8px;border-radius:4px">cabang.html?branch=bogor</code>
          </p>
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
            ${BRANCHES.map(b => `
              <a href="cabang.html?branch=${b.id}"
                 style="background:rgba(255,255,255,0.08);color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-size:14px;border:1px solid rgba(255,255,255,0.15);transition:all 0.2s"
                 onmouseover="this.style.background='rgba(245,166,35,0.2)';this.style.borderColor='#f5a623'"
                 onmouseout="this.style.background='rgba(255,255,255,0.08)';this.style.borderColor='rgba(255,255,255,0.15)'">
                ${b.name}
              </a>
            `).join('')}
          </div>
          <a href="index.html" style="display:inline-block;margin-top:2rem;color:rgba(255,255,255,0.5);font-size:13px;text-decoration:none">
            ← Kembali ke halaman utama
          </a>
        </div>
      </div>
    `;
  }

  /* ════════════════════════════════════════════
     HELPERS
  ════════════════════════════════════════════ */

  function getFirstWa(b) {
    return Array.isArray(b.wa) ? b.wa[0] : b.wa;
  }

  function initScrollSpy() {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
      });
    }, { passive: true });
  }

  function initFaqToggle() {
    window.toggleFaq = function (i) {
      const item    = document.getElementById('faq-' + i);
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(x => x.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    };
  }

})();
