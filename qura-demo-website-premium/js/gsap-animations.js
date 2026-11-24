// GSAP animations for Premium experience
// Uses global gsap from CDN

(function(){'use strict';
let gsapInitialized = false;

function initGSAPAnimations() {
  if (gsapInitialized) return;

  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded');
    return;
  }

  const ScrollTrigger = gsap.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  // Hero section animations
  if (document.querySelector('.hero')) {
    gsap.from('.hero__title', {
      duration: 1.5,
      opacity: 0,
      y: 50,
      ease: 'power3.out'
    });

    gsap.from('.hero__subtitle', {
      duration: 1.5,
      opacity: 0,
      y: 30,
      delay: 0.3,
      ease: 'power3.out'
    });

    gsap.from('.threejs-container', {
      duration: 1.5,
      opacity: 0,
      scale: 0.8,
      delay: 0.5,
      ease: 'power3.out'
    });
  }

  // Scroll-triggered fade-ins
  gsap.utils.toArray('.animate-on-scroll').forEach(function(el) {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  // Staggered section reveals
  gsap.utils.toArray('.feature, .service-card, .project-card').forEach(function(card, i) {
    if (!card) return;
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power2.out'
    });
  });

  // Parallax background effect
  ScrollTrigger.create({
    start: 'top bottom',
    end: 'bottom bottom',
    onUpdate: function(self) {
      const progress = self.progress;
      document.querySelectorAll('.parallax-layer').forEach(function(layer) {
        const speed = layer.dataset.speed || 0.5;
        gsap.set(layer, { y: -progress * 100 * speed });
      });
    }
  });

  // Smooth scroll for anchored links
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          gsap.to(window, {
            duration: 0.8,
            scrollTo: { y: target, autoKill: false },
            ease: 'power2.inOut'
          });
        }
      }
    });
  });

  // Footer animations
  gsap.from('.footer__brand, .footer__column', {
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 90%'
    },
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out'
  });

  gsapInitialized = true;
  console.log('GSAP animations initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGSAPAnimations);
} else {
  initGSAPAnimations();
}

window.initGSAPAnimations = initGSAPAnimations;

})();