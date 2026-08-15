/**
 * seo.js
 *
 * Mesin SEO otomatis. Berjalan SETELAH data.js (dan setelah
 * home-renderer.js / branch-renderer.js) dimuat. File ini TIDAK mengubah
 * fungsi renderer yang sudah ada — hanya menambahkan / memperbarui:
 *   - <title>, meta description, canonical, robots
 *   - Open Graph & Twitter Card
 *   - JSON-LD: Organization, WebSite, LocalBusiness, Service, FAQPage,
 *     BreadcrumbList
 *
 * Tidak perlu diubah saat menambah cabang baru — semua data diambil
 * otomatis dari data.js (COMPANY, BRANCHES, EQUIPMENT, FAQS, INDUSTRIES).
 */

(function () {
  'use strict';

  const SITE_URL = (function () {
    // Deteksi origin otomatis, fallback ke domain produksi.
    if (window.location.origin && window.location.origin !== 'null') {
      return window.location.origin;
    }
    return 'https://www.ciptaunggulsamudra.co.id';
  })();

  const OG_IMAGE = SITE_URL + '/HOME.png';
  const isBranchPage = !!document.getElementById('branchInfoContent');

  document.addEventListener('DOMContentLoaded', init);
  if (document.readyState !== 'loading') init();

  function init() {
    if (typeof COMPANY === 'undefined' || typeof BRANCHES === 'undefined') return;

    injectOrganizationSchema();

    if (isBranchPage) {
      // Tunggu branch-renderer.js menentukan cabang dari URL lebih dulu.
      const params = new URLSearchParams(window.location.search);
      const branch = BRANCHES.find(b => b.id === params.get('branch'));
      if (branch) {
        setupBranchSeo(branch);
      }
    } else {
      setupHomeSeo();
    }
  }

  /* ════════════════════════════════════════════
     META TAG HELPERS
  ════════════════════════════════════════════ */

  function setMeta(attr, key, content) {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function setLink(rel, href, extra) {
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
    if (extra) Object.keys(extra).forEach(k => el.setAttribute(k, extra[k]));
  }

  function setJsonLd(id, data) {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }

  function setTitle(text) {
    document.title = text;
    setMeta('property', 'og:title', text);
    setMeta('name', 'twitter:title', text);
  }

  function setDescription(text) {
    setMeta('name', 'description', text);
    setMeta('property', 'og:description', text);
    setMeta('name', 'twitter:description', text);
  }

  function baseSocialTags(url) {
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', OG_IMAGE);
    setMeta('property', 'og:locale', 'id_ID');
    setMeta('property', 'og:site_name', COMPANY.shortName);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:image', OG_IMAGE);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large');
    setLink('canonical', url);
  }

  /* ════════════════════════════════════════════
     ORGANIZATION SCHEMA (semua halaman)
  ════════════════════════════════════════════ */

  function injectOrganizationSchema() {
    const hq = BRANCHES[0];
    setJsonLd('ld-organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': SITE_URL + '/#organization',
      name: COMPANY.name,
      alternateName: COMPANY.shortName,
      url: SITE_URL,
      logo: SITE_URL + '/HOME.png',
      description: COMPANY.description,
      email: COMPANY.email,
      telephone: hq ? '+' + firstWa(hq) : undefined,
      sameAs: Object.values(COMPANY.social || {}),
      address: hq ? {
        '@type': 'PostalAddress',
        streetAddress: hq.address,
        addressCountry: 'ID',
      } : undefined,
    });
  }

  /* ════════════════════════════════════════════
     HOMEPAGE SEO
  ════════════════════════════════════════════ */

  function setupHomeSeo() {
    const url = SITE_URL + '/';
    baseSocialTags(url);

    // WebSite schema (search action optional, omitted — no search endpoint)
    setJsonLd('ld-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': url + '#website',
      url,
      name: COMPANY.name,
      inLanguage: 'id-ID',
    });

    // ItemList — seluruh cabang sebagai LocalBusiness
    setJsonLd('ld-branches', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: BRANCHES.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: localBusinessSchema(b, SITE_URL + '/cabang/' + b.id + '/'),
      })),
    });

    setJsonLd('ld-services', serviceSchemaList());
    setJsonLd('ld-faq', faqSchema());
    setJsonLd('ld-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: url },
      ],
    });
  }

  /* ════════════════════════════════════════════
     HALAMAN CABANG — SEO PER CABANG
  ════════════════════════════════════════════ */

  function setupBranchSeo(b) {
    // Halaman statis (server-rendered, tanpa perlu JS) adalah versi utama
    // untuk mesin pencari & social share preview.
    const canonicalUrl = SITE_URL + '/cabang/' + b.id + '/';
    // URL dokumen ini sendiri (dipakai untuk og:url versi live, boleh beda dari canonical).
    const liveUrl = SITE_URL + '/cabang.html?branch=' + b.id;
    const equipNames = branchEquipmentNames(b).slice(0, 3).join(', ');

    setTitle(`Sewa Alat Berat ${shortAreaName(b)} | ${equipNames} | ${COMPANY.shortName}`);
    setDescription(
      `${COMPANY.name} melayani sewa ${branchEquipmentNames(b).join(', ')} di ${shortAreaName(b)} dan sekitarnya ` +
      `(${(b.serviceAreas || []).slice(0, 4).join(', ')}). Operator bersertifikat K3, layanan 24 jam, unit siap kirim.`
    );
    baseSocialTags(liveUrl);
    // Beri tahu Google bahwa halaman statis /cabang/<id>/ adalah versi kanonik,
    // supaya tidak dianggap konten duplikat dari halaman ini.
    setLink('canonical', canonicalUrl);
    // Minta search engine tidak mengindeks versi query-string ini (hindari duplikasi),
    // tapi tetap boleh diikuti (follow) linknya.
    setMeta('name', 'robots', 'noindex, follow');

    setJsonLd('ld-localbusiness', localBusinessSchema(b, canonicalUrl));
    setJsonLd('ld-services', serviceSchemaList(b));
    setJsonLd('ld-faq', faqSchema());
    setJsonLd('ld-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/index.html' },
        { '@type': 'ListItem', position: 2, name: 'Cabang', item: SITE_URL + '/index.html#branches' },
        { '@type': 'ListItem', position: 3, name: b.name, item: canonicalUrl },
      ],
    });
  }

  /* ════════════════════════════════════════════
     SCHEMA BUILDERS
  ════════════════════════════════════════════ */

  function localBusinessSchema(b, url) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': url + '#localbusiness',
      name: `${COMPANY.shortName} — ${b.name}`,
      parentOrganization: COMPANY.name,
      url,
      image: OG_IMAGE,
      telephone: '+' + firstWa(b),
      email: b.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: b.address,
        addressRegion: b.area,
        addressCountry: 'ID',
      },
      areaServed: (b.serviceAreas || [b.area]).map(a => ({ '@type': 'City', name: a })),
      openingHours: hoursToSchema(b.hours),
    };
    if (typeof b.lat === 'number' && typeof b.lng === 'number') {
      schema.geo = { '@type': 'GeoCoordinates', latitude: b.lat, longitude: b.lng };
    }
    if (b.mapLink) schema.hasMap = b.mapLink;
    return schema;
  }

  function serviceSchemaList(branch) {
    const list = branch
      ? EQUIPMENT.filter(e => branch.equipment.includes('all') || branch.equipment.includes(e.id))
      : EQUIPMENT;
    const catNames = { forklift: 'Sewa Forklift', crane: 'Sewa Crane', boom: 'Sewa Boom Lift', scissor: 'Sewa Scissor Lift' };
    const cats = [...new Set(list.map(e => e.cat))];

    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: cats.map((cat, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          serviceType: catNames[cat] || cat,
          provider: { '@type': 'Organization', name: COMPANY.name },
          areaServed: branch ? (branch.serviceAreas || [branch.area]) : BRANCHES.map(x => x.area),
        },
      })),
    };
  }

  function faqSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: stripHtml(f.a) },
      })),
    };
  }

  /* ════════════════════════════════════════════
     UTILITIES
  ════════════════════════════════════════════ */

  function firstWa(b) {
    return Array.isArray(b.wa) ? b.wa[0] : b.wa;
  }

  function shortAreaName(b) {
    return b.name.replace(/^Cabang\s+/i, '');
  }

  function branchEquipmentNames(b) {
    const showAll = b.equipment.includes('all');
    const list = showAll ? EQUIPMENT : EQUIPMENT.filter(e => b.equipment.includes(e.id));
    const catNames = { forklift: 'Forklift', crane: 'Crane', boom: 'Boom Lift', scissor: 'Scissor Lift' };
    return [...new Set(list.map(e => catNames[e.cat] || e.cat))];
  }

  function hoursToSchema(hoursText) {
    if (/24\s*Jam/i.test(hoursText)) {
      return 'Mo-Su 00:00-23:59';
    }
    return ['Mo-Fr 08:00-17:00', 'Sa 08:00-13:00'];
  }

  function stripHtml(str) {
    return String(str).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

})();
