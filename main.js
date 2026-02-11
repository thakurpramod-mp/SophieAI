// Sophie AI - Main JavaScript
// Handles mobile menu, scroll animations, and interactive features

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    function toggleMobileMenu() {
        const isOpen = !mobileNav.classList.contains('hidden');
        
        if (isOpen) {
            mobileNav.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        } else {
            mobileNav.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });

    // Scroll-based Animations with Intersection Observer
    const animatedElements = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '-100px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        // Pause animation until element is in view
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'hsla(222, 47%, 6%, 0.95)';
            navbar.style.borderBottomColor = 'hsla(217, 33%, 18%, 0.8)';
        } else {
            navbar.style.backgroundColor = 'hsla(222, 47%, 6%, 0.8)';
            navbar.style.borderBottomColor = 'hsla(217, 33%, 18%, 0.5)';
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Call on load

    // Button Hover Effects
    const heroButtons = document.querySelectorAll('.btn-hero, .btn-hero-outline');
    
    heroButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Stats Counter Animation
    const statValues = document.querySelectorAll('.stat-value');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    function animateValue(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const hasX = text.includes('x');
        
        let value = parseInt(text.replace(/[^0-9]/g, ''));
        
        if (isNaN(value)) return;
        
        const duration = 2000;
        const start = 0;
        const increment = value / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                current = value;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (hasPlus) displayValue += '+';
            if (hasPercent) displayValue += '%';
            if (hasX) displayValue += 'x';
            
            element.textContent = displayValue;
        }, 16);
    }

    statValues.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Card Hover Glow Effect
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Active Navigation Link Highlight
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    function highlightNavLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navAnchors.forEach(anchor => {
                    anchor.classList.remove('active');
                    if (anchor.getAttribute('href') === `#${sectionId}`) {
                        anchor.style.color = 'hsl(174, 72%, 50%)';
                    } else {
                        anchor.style.color = '';
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Parallax Effect for Hero Background (subtle)
    const hero = document.querySelector('.hero');
    const heroGradient = document.querySelector('.hero-gradient');

    if (hero && heroGradient) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const parallaxValue = scrolled * 0.3;
                heroGradient.style.transform = `translateY(${parallaxValue}px)`;
            }
        });
    }

    console.log('Sophie AI Platform - Loaded Successfully');
});
