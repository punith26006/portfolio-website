document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initSkillBars();
  initTypingEffect();
});

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    // Highlight active section
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    links.forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    }));
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  }
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.bar-fill').forEach(bar => observer.observe(bar));
}

function initTypingEffect() {
  const el = document.querySelector('.typing-text');
  if (!el) return;
  const titles = ['Java Developer', 'ML & Deep Learning Enthusiast', 'Problem Solver', 'CSE Student @ IIIT Sri City'];
  let ti = 0, ci = 0, deleting = false, pause = 0;
  function type() {
    const now = Date.now();
    if (now < pause) { requestAnimationFrame(type); return; }
    const t = titles[ti];
    if (deleting) { ci--; el.innerHTML = t.substring(0, ci) + '<span class="cursor"></span>'; if (ci === 0) { deleting = false; ti = (ti + 1) % titles.length; pause = now + 300; } }
    else { ci++; el.innerHTML = t.substring(0, ci) + '<span class="cursor"></span>'; if (ci === t.length) { deleting = true; pause = now + 2000; } }
    setTimeout(() => requestAnimationFrame(type), deleting ? 35 : 70);
  }
  type();
}

function handleContactForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  const orig = btn.innerHTML;
  btn.innerHTML = '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!';
  btn.style.background = '#059669';
  setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; e.target.reset(); }, 3000);
}
