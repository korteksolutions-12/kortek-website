// Kortek Premium - Cinematic Animations with GSAP (Apple-Style Enhanced)
import { gsap } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
import { ScrollTrigger } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
import { ScrollTo } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTo.min.js';

gsap.registerPlugin(ScrollTrigger, ScrollTo);

// Hide loading spinner after page load
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
    }
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Initialize premium animations
    initPremiumAnimations();
    
    // Initialize new Apple-style animations
    initAppleStyleAnimations();
    
    // Project Filter
    initProjectFilter();
    
    // Contact Form Submission
    initContactForm();
    
    // Smooth scrolling for anchor links
    initSmoothScroll();
    
    // Add scroll animation to elements
    initScrollReveal();
    
    // Services Page Animations
    initServicesAnimations();
    
    // Scroll Progress Indicator
    initScrollProgress();
    
    // SEO Schema Markup
    addSchemaMarkup();
    
    // Set current year in footer
    setFooterYear();
});

// Scroll Progress Indicator
function initScrollProgress() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress';
    progressContainer.innerHTML = '<div class="scroll-progress__bar"></div>';
    document.body.prepend(progressContainer);
    
    const progressBar = progressContainer.querySelector('.scroll-progress__bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Premium Cinematic Animations
function initPremiumAnimations() {
    // Hero Section Entrance Animation
    const tlHero = gsap.timeline({
        scrollTrigger: {
            trigger: '.hero',
            start: 'top 95%',
            end: 'top 80%',
            scrub: 1
        }
    });
    
    tlHero
        .to('.hero__content', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0)
        .to('.hero__subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.2)
        .to('.hero__text', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.4)
        .to('.hero__actions', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.6)
        .to('.hero__visual', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.8);

    // Services Section Animation with staggered timing
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 70%',
                scrub: 0.5
            },
            stagger: 0.1,
            delay: index * 0.1
        });
    });

    // Section Titles Reveal
    gsap.utils.toArray('.section-title, .section-subtitle').forEach(title => {
        gsap.from(title, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                end: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    });

    // CTA Section Animation
    gsap.from('.cta__title', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.cta',
            start: 'top 80%',
            end: 'top 60%'
        }
    });

    gsap.from('.cta__text', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.cta',
            start: 'top 80%',
            end: 'top 60%'
        },
        delay: 0.2
    });

    // K Emblem 3D Rotation
    gsap.to('.k-emblem', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
    });

    // Orbit Animation
    gsap.timeline({ repeat: -1, repeatDelay: 2 })
        .to('.emblem__orbit', {
            rotation: 360,
            duration: 30,
            ease: 'none'
        }, 0);

    // Floating Accents
    gsap.to('.dot1', {
        y: -20,
        rotation: 10,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.dot2', {
        y: 20,
        rotation: -10,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
    });

    // Line Accents Pulse
    gsap.fromTo('.line1, .line2', {
        opacity: 0.3,
        scaleX: 0
    }, {
        opacity: 0.5,
        scaleX: 1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Scroll-based parallax
    gsap.to('.hero::before', {
        backgroundPosition: 'center 0%',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

// Apple-Style Enhanced Animations
function initAppleStyleAnimations() {
    // Trust Section Animations
    gsap.utils.toArray('.trust__title, .trust__text').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Trust Logo Fade-in with staggered timing
    gsap.utils.toArray('.trust__logo').forEach((logo, index) => {
        gsap.from(logo, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: logo,
                start: 'top 85%',
                end: 'top 70%',
                toggleActions: 'play none none none'
            },
            delay: index * 0.1
        });
    });

    // Trust Stats Staggered Reveal
    gsap.utils.toArray('.trust__stat-item').forEach((stat, index) => {
        gsap.from(stat, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                end: 'top 75%',
                toggleActions: 'play none none none'
            },
            delay: index * 0.15
        });
    });

    // How It Works Section
    gsap.utils.toArray('.how-it-works__title, .how-it-works__subtitle').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    });

    // How Steps Sequential Reveal
    gsap.utils.toArray('.how-step').forEach((step, index) => {
        gsap.from(step, {
            opacity: 0,
            x: -30,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                end: 'top 75%',
                toggleActions: 'play none none none'
            },
            delay: index * 0.2
        });
    });

    // How Step Number Circle Animation
    gsap.utils.toArray('.how-step__number').forEach(number => {
        gsap.from(number, {
            scale: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: number.parentElement,
                start: 'top 85%',
                end: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    });

    // How It Works Visual (Emblem)
    gsap.from('.how-it-works__visual .k-emblem', {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.how-it-works',
            start: 'top 85%',
            end: 'top 70%',
            toggleActions: 'play none none none'
        }
    });

    // Mid CTA Section
    gsap.utils.toArray('.mid-cta__title, .mid-cta__subtitle').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Mid CTA Features with staggered reveal
    gsap.utils.toArray('.mid-cta__feature').forEach((feature, index) => {
        gsap.from(feature, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: feature,
                start: 'top 85%',
                end: 'top 75%',
                toggleActions: 'play none none none'
            },
            delay: index * 0.1
        });
    });

    // Portfolio Gallery Section
    gsap.utils.toArray('.portfolio-gallery__title, .portfolio-gallery__subtitle').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Portfolio Items with staggered reveal and 3D tilt
    gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            y: 30,
            rotationX: 10,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 70%',
                toggleActions: 'play none none none'
            },
            delay: index * 0.1
        });
    });

    // Enhanced CTA Section Animations
    gsap.utils.toArray('.cta__title, .cta__text, .cta__subtitle').forEach((element, index) => {
        gsap.from(element, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.cta',
                start: 'top 80%',
                end: 'top 60%'
            },
            delay: index * 0.2
        });
    });

    // Service Cards Enhanced Hover Effects
    gsap.utils.toArray('.service-card').forEach(card => {
        // Add 3D tilt on hover
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) / 20;
            const rotateY = (x - rect.width / 2) / 20;
            gsap.set(this, {
                rotationX: rotateX,
                rotationY: rotateY,
                scale: 1.03
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.set(this, {
                rotationX: 0,
                rotationY: 0,
                scale: 1
            });
        });
    });

    // Service Card Staggered Animation
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 70%',
                scrub: 0.5
            },
            stagger: 0.1,
            delay: index * 0.1
        });
    });
}

// Services Page Specific Animations
function initServicesAnimations() {
    // Service Category Titles Reveal
    gsap.utils.toArray('.service-category__title').forEach(title => {
        gsap.from(title, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                end: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Service Category Description Reveal
    gsap.utils.toArray('.service-category__description').forEach(desc => {
        gsap.from(desc, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: desc,
                start: 'top 85%',
                end: 'top 75%',
                toggleActions: 'play none none none'
            },
            delay: 0.1
        });
    });

    // Service Features with Staggered Reveal
    gsap.utils.toArray('.service-category__features li').forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            x: -20,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 75%',
                toggleActions: 'play none none none'
            },
            delay: (index % 4) * 0.05
        });
    });

    // Package Cards
    gsap.utils.toArray('.package-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 70%',
                scrub: 0.3
            },
            delay: index * 0.15
        });
    });

    // Package Price Highlight
    gsap.utils.toArray('.package-price').forEach(price => {
        gsap.from(price, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: price,
                start: 'top 85%',
                end: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Package Feature Items
    gsap.utils.toArray('.package-features li').forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            x: -20,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 75%',
                toggleActions: 'play none none none'
            },
            delay: (index % 5) * 0.03
        });
    });

    // CTA Features
    gsap.utils.toArray('.cta-feature').forEach((feature, index) => {
        gsap.from(feature, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: feature,
                start: 'top 85%',
                end: 'top 75%',
                toggleActions: 'play none none none'
            },
            delay: index * 0.1
        });
    });

    // Service Visual Elements Animation
    gsap.utils.toArray('.service-visual').forEach(visual => {
        gsap.from(visual, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: visual.parentElement,
                start: 'top 80%',
                end: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// Project Filter
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.getElementById('projectsGrid');
    const projectsEmpty = document.getElementById('projectsEmpty');

    if (filterButtons.length > 0 && projectsGrid) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');
                const projectCards = document.querySelectorAll('.project-card');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        gsap.from(card, {
                            opacity: 0,
                            y: 30,
                            duration: 0.5,
                            ease: 'power3.out'
                        });
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Show empty message if no projects match
                const visibleProjects = document.querySelectorAll('.project-card:not([style*="display: none"])');
                if (visibleProjects.length === 0) {
                    projectsGrid.style.display = 'none';
                    if (projectsEmpty) {
                        projectsEmpty.style.display = 'block';
                    }
                } else {
                    projectsGrid.style.display = 'grid';
                    if (projectsEmpty) {
                        projectsEmpty.style.display = 'none';
                    }
                }
            });
        });
    }
}

// Contact Form Submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            if (name && email) {
                // Show success message with animation
                gsap.fromTo('.form-success', {
                    opacity: 0,
                    y: 20
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power3.out'
                });
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                }, 2000);
            } else {
                // Shake animation for error
                gsap.to(this, {
                    shake: 5,
                    duration: 0.5
                });
            }
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                gsap.to(window, {
                    scrollTo: target,
                    duration: 0.8,
                    ease: 'power3.inOut'
                });
            }
        });
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.from(entry.target, {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    ease: 'power3.out'
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .project-card, .value-card, .why-card, .feature').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
}

// SEO Schema Markup
function addSchemaMarkup() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Kortek Solutions",
        "image": "https://kortek.co.ke/images/logo.png",
        "url": "https://kortek.co.ke",
        "license": "https://kortek.co.ke/license",
        "contactPoint": {
            "@type": "ContactPoint",
            "name": "Customer Service",
            "email": "info@kortek.co.ke",
            "telephone": "+254-700-000-000"
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Tech Park, 4th Floor",
            "addressLocality": "Westlands",
            "addressRegion": "Nairobi",
            "postalCode": "00100",
            "addressCountry": "KE"
        },
        "sameAs": [
            "https://facebook.com/kortek",
            "https://twitter.com/kortek",
            "https://linkedin.com/company/kortek"
        ]
    });
    document.head.appendChild(script);
}

// Set current year in footer
function setFooterYear() {
    const yearElement = document.querySelector('.footer__bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
    }
}

// Performance: Preload critical images
const preloadImages = () => {
    const images = [
        '/favicon.ico'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

preloadImages();