/* Maritim Malaysia — Konsep v4: interaksi */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Header melekat apabila skrol (laman utama: lutsinar -> putih)
  const head = $('#siteHead'), bar = $('#mainbar');
  if (head && bar && head.classList.contains('site-head--overlay')) {
    const limit = 130;
    const onScroll = () => bar.classList.toggle('is-fixed', window.scrollY > limit);
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  } else if (bar) {
    const ph = document.createElement('div');
    const onScroll = () => {
      const fix = window.scrollY > 50;
      if (fix !== bar.classList.contains('is-fixed')) {
        bar.classList.toggle('is-fixed', fix);
        ph.style.height = fix ? bar.offsetHeight + 'px' : '0';
        if (!ph.parentNode) bar.after(ph);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  // Bahasa (visual sahaja)
  $$('#langSwitch button').forEach(b => b.addEventListener('click', () => {
    $$('#langSwitch button').forEach(x => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true');
    if (window.A11y) A11y.setLang(b.textContent.trim() === 'EN' ? 'en' : 'ms');
  }));

  // Hero slider
  const slides = $$('.hero .slide');
  if (slides.length) {
    const copy = [
      ['Menjaga Kedaulatan dan Keselamatan Perairan Malaysia', 'APMM melindungi perairan negara melalui penguatkuasaan undang-undang, operasi mencari dan menyelamat serta kerjasama antarabangsa.'],
      ['Bersedia 24 Jam Untuk Keselamatan di Laut', 'Pusat Operasi Maritim sentiasa bersiap siaga untuk operasi mencari dan menyelamat di seluruh perairan negara.'],
      ['Membanteras Jenayah Maritim Bersama Rakyat', 'Laporkan sebarang aktiviti mencurigakan di laut melalui talian kecemasan atau saluran eAduan APMM.']
    ];
    let i = 0, timer;
    const box = $('#heroCopy');
    const go = n => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
      box.classList.add('is-swap');
      setTimeout(() => { $('#heroTitle').textContent = copy[i][0]; $('#heroLead').textContent = copy[i][1]; box.classList.remove('is-swap'); }, 350);
    };
    const auto = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 7000); };
    $$('[data-hero]').forEach(b => b.addEventListener('click', () => { go(i + +b.dataset.hero); auto(); }));
    auto();
  }

  // Perkhidmatan: kad akordion
  const cards = $$('#svcTrack .svc-card');
  if (cards.length) {
    let active = 0;
    const set = n => {
      active = (n + cards.length) % cards.length;
      cards.forEach((c, k) => c.classList.toggle('is-active', k === active));
    };
    cards.forEach((c, k) => {
      c.addEventListener('click', () => set(k));
      c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set(k); } });
    });
    $$('[data-svc]').forEach(b => b.addEventListener('click', () => set(active + +b.dataset.svc)));
  }

  // Tab Berita / Pengumuman
  $$('[data-tab]').forEach(t => t.addEventListener('click', () => {
    $$('[data-tab]').forEach(x => { x.setAttribute('aria-selected', x === t); $('#' + x.dataset.tab).hidden = x !== t; });
  }));

  // Talian kecemasan
  const hb = $('#hotlineBtn'), hp = $('#hotlinePop');
  if (hb) {
    hb.addEventListener('click', e => { e.stopPropagation(); const o = !hp.classList.contains('open'); hp.classList.toggle('open', o); hb.setAttribute('aria-expanded', o); });
    document.addEventListener('click', e => { if (!hp.contains(e.target)) { hp.classList.remove('open'); hb.setAttribute('aria-expanded', 'false'); } });
  }

  // Laci mudah alih
  const dr = $('#drawer');
  const setDrawer = o => { dr.classList.toggle('open', o); dr.setAttribute('aria-hidden', !o); document.body.style.overflow = o ? 'hidden' : ''; };
  $$('[data-drawer]').forEach(b => b.addEventListener('click', () => setDrawer(true)));
  $$('[data-drawer-close]').forEach(b => b.addEventListener('click', () => setDrawer(false)));

  // Carian
  const sm = $('#searchModal');
  $$('[data-search]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); setDrawer(false); sm.classList.add('open'); setTimeout(() => $('input', sm).focus(), 30); }));
  sm.addEventListener('click', e => { if (e.target === sm) sm.classList.remove('open'); });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    sm.classList.remove('open'); setDrawer(false);
    if (hp) { hp.classList.remove('open'); hb.setAttribute('aria-expanded', 'false'); }
  });
})();
