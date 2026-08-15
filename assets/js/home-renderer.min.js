/**
 * home-renderer.js
 *
 * Renderer untuk halaman utama (index.html).
 * Merender daftar cabang, equipment showcase, FAQ, dan footer
 * secara otomatis dari data.js.
 *
 * TIDAK PERLU DIUBAH saat menambah cabang baru.
 */

(function () {
  'use strict';

  renderBranches();
  renderEquipmentShowcase();
  renderFaq();
  renderFooter();
  initScrollSpy();
  initFaqToggle();
  initEqTabs();

  function renderBranches() {
    const grid = document.getElementById('branchGrid');
    if (!grid) return;

    grid.innerHTML = BRANCHES.map(b => `
      <a href="cabang/${b.id}/" class="branch-card" title="Lihat ${b.name}">
        <div class="branch-img" style="background:${b.color}">
          <i class="ti ti-building-factory-2"></i>
        </div>
        <div class="branch-info">
          <h4>${b.name}</h4>
          <p>${b.area}</p>
        </div>
        <span class="branch-btn">Lihat Cabang →</span>
      </a>
    `).join('');

    // Grid otomatis menyesuaikan lebar layar (responsive) — lihat
    // .branches-grid di main.css (grid-template-columns: repeat(auto-fill, minmax(200px,1fr))).
    // Tidak lagi dipaksa ke jumlah kolom tetap agar tetap rapi di semua device.
  }

  function renderEquipmentShowcase() {
    const grid = document.getElementById('eqGrid');
    if (!grid) return;
    renderEqCards('all');

    const tabs = document.getElementById('eqTabs');
    if (tabs) {
      tabs.addEventListener('click', e => {
        const tab = e.target.closest('.eq-tab');
        if (!tab) return;
        document.querySelectorAll('.eq-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderEqCards(tab.dataset.cat);
      });
    }
  }

  function renderEqCards(cat) {
    const catLabels = { forklift:'Forklift', crane:'Crane', boom:'Boom Lift', scissor:'Scissor Lift' };
    const list = cat === 'all' ? EQUIPMENT : EQUIPMENT.filter(e => e.cat === cat);
    document.getElementById('eqGrid').innerHTML = list.map(e => {
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
            <a href="https://wa.me/${BRANCHES[0] && (Array.isArray(BRANCHES[0].wa) ? BRANCHES[0].wa[0] : BRANCHES[0].wa)}"
               target="_blank" class="eq-wa-btn">
              <i class="ti ti-brand-whatsapp"></i> Tanyakan Ketersediaan
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  function initEqTabs() {
    // Already handled inside renderEquipmentShowcase
  }

  function renderFaq() {
    const list = document.getElementById('faqList');
    if (!list) return;
    list.innerHTML = FAQS.map((f, i) => `
      <div class="faq-item" id="faq-${i}">
        <button class="faq-q" onclick="toggleFaq(${i})">
          ${f.q}
          <i class="ti ti-chevron-down"></i>
        </button>
        <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>
      </div>
    `).join('');
  }

  function renderFooter() {
    const el = document.getElementById('footerBranches');
    if (!el) return;
    el.innerHTML = BRANCHES.map(b => `
      <li><a href="cabang/${b.id}/">${b.name}</a></li>
    `).join('');

    const yr = document.getElementById('footerYear');
    if (yr) yr.textContent = new Date().getFullYear();
  }

  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
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
