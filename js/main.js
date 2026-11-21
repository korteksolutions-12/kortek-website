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

    // Project Filter
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

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            if (name && email) {
                // In production, this would submit to a backend
                alert('Thank you for your message! We will contact you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    blocks: 'start'
                });
            }
        });
    });

    // Add scroll animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .project-card, .value-card, .why-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // SEO Schema Markup
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

    // Set current year in footer
    const yearElement = document.querySelector('.footer__bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
    }
});