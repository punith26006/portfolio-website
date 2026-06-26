document.addEventListener('DOMContentLoaded', () => {

  /* ===== CURSOR GLOW ===== */
  const glow = document.getElementById('cursorGlow');
  if (glow && window.innerWidth > 768) {
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  /* ===== NAVBAR SCROLL ===== */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Navbar background
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Active link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });

  /* ===== MOBILE MENU ===== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  /* ===== TYPING EFFECT ===== */
  const typedEl = document.getElementById('typedText');
  const words = ['Web Developer.', 'ML Enthusiast.', 'Problem Solver.', 'Open Source Contributor.'];
  let wordIndex = 0, charIndex = 0, isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 500;
    }

    setTimeout(typeEffect, delay);
  }
  typeEffect();

  /* ===== SCROLL REVEAL ===== */
  const revealElements = document.querySelectorAll(
    '.glass-card, .section-tag, .section-heading, .skills-showcase, .contact-text'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal', 'active');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ===== CONTACT FORM ===== */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const original = btn.innerHTML;

      btn.innerHTML = '<span>Sent Successfully!</span> <i class="fas fa-check"></i>';
      btn.style.background = '#22c55e';

      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  /* ===== COUNTER ANIMATION ===== */
  const counterEl = document.querySelector('[data-count]');
  if (counterEl) {
    const target = parseFloat(counterEl.dataset.count);
    let current = 0;
    const step = target / 40;
    const counter = setInterval(() => {
      current += step;
      if (current >= target) {
        counterEl.textContent = target;
        clearInterval(counter);
      } else {
        counterEl.textContent = current.toFixed(2);
      }
    }, 40);
  }

});
