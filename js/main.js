/* ================================================
   LA TRIBUNA 90 — main.js
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* AOS */
  AOS.init({ duration: 700, once: true, offset: 70, easing: 'ease-out-cubic' });

  /* ── Navbar scroll ──────────────────────────── */
  const navbar  = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 70;
    navbar.classList.toggle('scrolled', scrolled);
    backTop.classList.toggle('visible', scrolled);
  }, { passive: true });

  backTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* ── Mobile menu ────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('active');
    navLinks.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── Menu tabs ──────────────────────────────── */
  const tabs  = document.querySelectorAll('.menu-tab');
  const grids = document.querySelectorAll('.menu-grid');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t  => t.classList.remove('active'));
      grids.forEach(g => g.classList.remove('active'));
      tab.classList.add('active');
      const grid = document.getElementById(`tab-${target}`);
      if (grid) {
        grid.classList.add('active');
        /* Re-trigger AOS for newly visible cards */
        AOS.refresh();
      }
    });
  });

  /* ── Live clock ─────────────────────────────── */
  const timeEl = document.getElementById('liveTime');
  function tick() {
    if (!timeEl) return;
    const n = new Date();
    const h = String(n.getHours()).padStart(2, '0');
    const m = String(n.getMinutes()).padStart(2, '0');
    timeEl.textContent = `${h}:${m}`;
  }
  tick();
  setInterval(tick, 30000);

  /* ── Active nav link on scroll ──────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a');

  const secObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAs.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.38 });

  sections.forEach(s => secObserver.observe(s));

  /* ── Contact form ───────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;

      btn.innerHTML  = '<i class="fas fa-check"></i>&nbsp; ¡Reserva Enviada!';
      btn.style.background = '#314B36';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML  = original;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3500);
    });
  }

  /* ── Smooth scroll for anchor links ────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Lazy-load images (native) fallback ─────── */
  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
  });

});
