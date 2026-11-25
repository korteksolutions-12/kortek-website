// KSwds Generated JavaScript - PREMIUM Tier
document.addEventListener('DOMContentLoaded', function() {
  // Navigation toggle
  const navToggle = document.querySelector('.nav__toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      document.querySelector('.nav__list').classList.toggle('nav__list--open');
      this.setAttribute('aria-expanded', 
        this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!this.checkValidity()) {
        e.preventDefault();
        this.reportValidity();
        return;
      }
      // Add success animation
      const button = this.querySelector('button[type="submit"]');
      if (button) button.textContent = 'Sending...';
    });
  });

  // Animation on scroll (IntersectionObserver)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-reveal');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease';
    observer.observe(section);
  });

  // Premium: GSAP animations if available
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%'
        }
      });
    });
  }

  // Premium: Three.js 3D hero
  if (typeof THREE !== 'undefined') {
    // 3D initialization would go here
    console.log('Three.js detected, 3D features enabled');
  }
});
