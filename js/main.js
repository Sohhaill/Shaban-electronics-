// ========== THEME TOGGLE ==========
const themeKey = 'shaban-theme';
const savedTheme = localStorage.getItem(themeKey) || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

function updateThemeIcons(theme) {
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('title', theme === 'dark' ? 'Switch to Light' : 'Switch to Dark');
  });
}
updateThemeIcons(savedTheme);

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(themeKey, next);
  updateThemeIcons(next);
}

document.addEventListener('DOMContentLoaded', () => {
  // ========== NAVBAR SCROLL ==========
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ========== HAMBURGER MENU ==========
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileMenu?.classList.remove('open');
    });
  });

  // ========== ACTIVE NAV LINK ==========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ========== SCROLL FADE IN ==========
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ========== FAQ ACCORDION ==========
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      const msg = document.getElementById('successMsg');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        if (msg) { msg.style.display = 'block'; contactForm.reset(); }
        setTimeout(() => { if (msg) msg.style.display = 'none'; }, 5000);
      }, 1500);
    });
  }

  // ========== GALLERY FILTER ==========
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-cat');
        const show = filter === 'all' || cat === filter;
        item.style.opacity = show ? '1' : '0';
        item.style.transform = show ? 'scale(1)' : 'scale(0.85)';
        item.style.pointerEvents = show ? 'auto' : 'none';
      });
    });
  });

  // ========== COUNTDOWN TIMER ==========
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    const end = new Date();
    end.setHours(end.getHours() + 48);
    function updateCountdown() {
      const now = new Date();
      const diff = end - now;
      if (diff <= 0) return;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const pad = n => String(n).padStart(2, '0');
      const hEl = document.getElementById('ch');
      const mEl = document.getElementById('cm');
      const sEl = document.getElementById('cs');
      if (hEl) hEl.textContent = pad(h > 23 ? h % 24 : h);
      if (mEl) mEl.textContent = pad(m);
      if (sEl) sEl.textContent = pad(s);
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
});
