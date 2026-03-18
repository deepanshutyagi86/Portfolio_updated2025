/* ═══════════════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════════════ */
const ring = document.getElementById('curRing');
const dot  = document.getElementById('curDot');
let rix = 0, riy = 0;

document.addEventListener('mousemove', e => {
  const x = e.clientX, y = e.clientY;
  // Dot follows instantly
  dot.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
  // Ring follows with lerp in RAF loop
  requestAnimationFrame(() => {
    rix += (x - rix) * 0.18;
    riy += (y - riy) * 0.18;
    ring.style.transform = `translate(${rix}px,${riy}px) translate(-50%,-50%)`;
  });
});

// Smooth ring lerp loop
function loopCursor() {
  ring.style.transform = `translate(${rix}px,${riy}px) translate(-50%,-50%)`;
  requestAnimationFrame(loopCursor);
}
loopCursor();

/* ═══════════════════════════════════════════════════
   NAV — scroll state
   ═══════════════════════════════════════════════════ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ═══════════════════════════════════════════════════
   MOBILE MENU
   ═══════════════════════════════════════════════════ */
const hamburger  = document.getElementById('hamburger');
const mobDrawer  = document.getElementById('mobDrawer');
const mobOverlay = document.getElementById('mobOverlay');

function toggleMenu(open) {
  hamburger.classList.toggle('open', open);
  mobDrawer.classList.toggle('open', open);
  mobOverlay.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleMenu(!hamburger.classList.contains('open')));
mobOverlay.addEventListener('click', () => toggleMenu(false));
document.querySelectorAll('[data-close]').forEach(el =>
  el.addEventListener('click', () => toggleMenu(false))
);

/* ═══════════════════════════════════════════════════
   SPOTLIGHT GLOW EFFECT (cards)
   ═══════════════════════════════════════════════════ */
function glow(e) {
  const el = e.currentTarget;
  const r  = el.getBoundingClientRect();
  el.style.setProperty('--gx', `${e.clientX - r.left}px`);
  el.style.setProperty('--gy', `${e.clientY - r.top}px`);
}

/* ═══════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
   ═══════════════════════════════════════════════════ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

/* ═══════════════════════════════════════════════════
   SMOOTH ANCHOR SCROLL
   ═══════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});