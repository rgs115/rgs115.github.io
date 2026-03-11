/* =========================================
   Nav: sticky on scroll
   ========================================= */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 50);
}, { passive: true });

/* =========================================
   Mobile hamburger
   ========================================= */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  const [s1, s2] = hamburger.querySelectorAll('span');
  s1.style.transform = open ? 'translateY(7.5px) rotate(45deg)' : '';
  s2.style.transform = open ? 'translateY(-7.5px) rotate(-45deg)' : '';
});

navMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    const [s1, s2] = hamburger.querySelectorAll('span');
    s1.style.transform = '';
    s2.style.transform = '';
  });
});

/* =========================================
   Scroll reveal
   ========================================= */
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealIO.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => revealIO.observe(el));

/* =========================================
   Stat counter animation
   ========================================= */
function runCounter(el) {
  const isFloat  = el.dataset.float === 'true';
  const target   = parseFloat(el.dataset.target);
  const duration = 1400;
  const start    = performance.now();

  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target * eased;
    el.textContent = isFloat ? val.toFixed(2) : Math.round(val).toString();
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.snum[data-target]').forEach(runCounter);
      statIO.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const statSection = document.querySelector('.stat-row');
if (statSection) statIO.observe(statSection);

/* =========================================
   Active nav link on scroll
   ========================================= */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const activeIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => activeIO.observe(s));
