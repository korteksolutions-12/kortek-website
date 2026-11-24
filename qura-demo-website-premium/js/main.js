// KSwds Generated JavaScript - PREMIUM Tier
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav__toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      constnavList = document.querySelector('.nav__list');
      navList.classList.toggle('nav__list--open');
      this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
      }
    });
  });

  // Animation on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate-reveal');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(section => {
    section.style.cssText = 'opacity: 0; transform: translateY(20px); transition: all 0.5s ease;';
    observer.observe(section);
  });

  // Premium: Three.js & GSAP
  if (typeof THREE !== 'undefined') console.log('Three.js detected');
  if (typeof gsap !== 'undefined') gsap.registerPlugin(ScrollTrigger);
});
