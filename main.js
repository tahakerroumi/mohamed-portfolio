// RESPONSIVE PORTFOLIO JAVASCRIPT
document.addEventListener('DOMContentLoaded', function() {
    
    // PERFORMANCE OPTIMIZATION VARIABLES
    let isScrolling = false;
    let lastScrollTime = 0;
    let ticking = false;
    
    // DEVICE DETECTION
    const isMobile = window.innerWidth <= 768;
    const isTouch = 'ontouchstart' in window;
    
    // INTERSECTION OBSERVER FOR ANIMATIONS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
    };
    
    const elementsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                
                // Add staggered animation delays for grid items
                if (entry.target.classList.contains('project-item')) {
                    const items = document.querySelectorAll('.project-item');
                    const index = Array.from(items).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
                
                if (entry.target.classList.contains('stat-item')) {
                    const items = document.querySelectorAll('.stat-item');
                    const index = Array.from(items).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                }
                
                if (entry.target.classList.contains('social-card')) {
                    const items = document.querySelectorAll('.social-card');
                    const index = Array.from(items).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.15}s`;
                }
            }
        });
    }, observerOptions);
    
    // TYPING EFFECT FOR HERO TEXT
    function typeText(element, text, speed = 80) {
        if (!element) return;
        
        element.innerHTML = '';
        element.style.borderRight = '3px solid #4ecdc4';
        
        let i = 0;
        const typeChar = () => {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1);
                i++;
                setTimeout(typeChar, speed + Math.random() * 40);
            } else {
                // Keep cursor blinking for a while, then remove
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 2000);
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeChar, 1000);
    }
    
    // INITIALIZE TYPING EFFECT
    const roleElement = document.querySelector('.role');
    if (roleElement) {
        const originalText = roleElement.textContent;
        typeText(roleElement, originalText, 100);
    }
    
    // SMOOTH NAVIGATION
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - (isMobile ? 60 : 80);
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav state
                navLinks.forEach(nl => nl.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // OPTIMIZED SCROLL EFFECTS
    function updateOnScroll() {
        const scrolled = window.pageYOffset;
        const video = document.getElementById('video');
        const nav = document.querySelector('nav');
        
        // Parallax effect for background video
        if (video && !isMobile) {
            video.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
        }
        
        // Navigation background blur effect
        if (nav) {
            if (scrolled > 100) {
                nav.style.background = 'rgba(0, 0, 0, 0.4)';
                nav.style.backdropFilter = 'blur(25px)';
                nav.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.08)';
                nav.style.backdropFilter = 'blur(20px)';
                nav.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
        }
        
        // Update active navigation based on scroll position
        updateActiveNav(scrolled);
        
        ticking = false;
    }
    
    // ACTIVE NAVIGATION UPDATER
    function updateActiveNav(scrollPos) {
        const sections = ['home', 'projects', 'stats', 'contact'];
        let current = 'home';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop - 200;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    current = sectionId;
                }
            }
        });
        
        // Update nav active states
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // THROTTLED SCROLL LISTENER
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }, { passive: true });
    
    // MOVING STARS EFFECT FOR BACKGROUND SECTIONS
    function createMovingStars(container, count = 15) {
        if (!container || isMobile) return; // Reduce stars on mobile for performance
        
        const starsContainer = document.createElement('div');
        starsContainer.className = 'moving-stars';
        starsContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        
        const starCount = isMobile ? Math.floor(count / 2) : count;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            const size = Math.random() * 2 + 0.5;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 10 + 8;
            const delay = Math.random() * 5;
            
            star.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: #fff;
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                opacity: ${Math.random() * 0.6 + 0.2};
                animation: moveStar ${duration}s linear ${delay}s infinite;
                will-change: transform;
                box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.3);
            `;
            
            starsContainer.appendChild(star);
        }
        
        container.appendChild(starsContainer);
    }
    
    // ENHANCED HOVER EFFECTS (Desktop only)
    if (!isMobile && !isTouch) {
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });
        
        // Project items magnetic effect
        const projectItems = document.querySelectorAll('.project-item');
        projectItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.03)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Social cards magnetic effect
        const socialCards = document.querySelectorAll('.social-card');
        socialCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // LAZY LOADING FOR VIDEOS AND IMAGES
    const mediaElements = document.querySelectorAll('video, img');
    const mediaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const media = entry.target;
                
                if (media.tagName === 'VIDEO') {
                    // Ensure video plays when visible
                    media.play().catch(e => console.log('Video autoplay failed:', e));
                }
                
                mediaObserver.unobserve(media);
            }
        });
    }, { threshold: 0.25 });
    
    mediaElements.forEach(media => mediaObserver.observe(media));
    
    // INITIALIZE ELEMENT ANIMATIONS
    const animatedElements = [
        '.project-item',
        '.stat-item', 
        '.social-card',
        '.projects-description',
        '.more-projects',
        '.projects h2',
        '.contact h2',
        '.contact-description'
    ];
    
    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            // Set initial animation states
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            elementsObserver.observe(el);
        });
    });
    
    // CREATE MOVING STARS FOR BACKGROUND SECTIONS
    const projectsSection = document.getElementById('projects');
    const statsSection = document.getElementById('stats');
    const contactSection = document.getElementById('contact');
    
    if (projectsSection) createMovingStars(projectsSection, 12);
    if (statsSection) createMovingStars(statsSection, 8);
    if (contactSection) createMovingStars(contactSection, 20);
    
    // RESPONSIVE VIDEO HANDLING
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Ensure videos are optimized for mobile
        if (isMobile) {
            video.setAttribute('playsinline', '');
            video.muted = true;
        }
        
        // Handle video loading errors gracefully
        video.addEventListener('error', function() {
            console.log('Video failed to load:', this.src);
            this.style.display = 'none';
        });
    });
    
    // PERFORMANCE MONITORING
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            console.log('🚀 Responsive portfolio loaded successfully!');
            console.log(`📱 Device: ${isMobile ? 'Mobile' : 'Desktop'}`);
            console.log(`👆 Touch: ${isTouch ? 'Enabled' : 'Disabled'}`);
        });
    }
    
    // SMOOTH PAGE REVEAL
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
    
    // HANDLE RESIZE EVENTS
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate animations on resize
            location.reload(); // Simple solution for complex responsive changes
        }, 250);
    });
    
    // FORM VALIDATION AND WHATSAPP INTEGRATION (if needed)
    const whatsappLink = document.querySelector('a[href*="wa.me"]');
    if (whatsappLink) {
        whatsappLink.addEventListener('click', function() {
            if ('gtag' in window) {
                gtag('event', 'contact', {
                    'event_category': 'engagement',
                    'event_label': 'whatsapp'
                });
            }
        });
    }
    
    const instagramLink = document.querySelector('a[href*="instagram.com"]');
    if (instagramLink) {
        instagramLink.addEventListener('click', function() {
            // Track Instagram clicks for analytics
            if ('gtag' in window) {
                gtag('event', 'social', {
                    'event_category': 'engagement',
                    'event_label': 'instagram'
                });
            }
        });
    }
});

const dynamicStyles = `
/* MOVING STARS ANIMATION */
@keyframes moveStar {
    0% {
        transform: translateY(100vh) translateX(0px) rotate(0deg) scale(0);
        opacity: 0;
    }
    10% {
        opacity: 1;
        transform: translateY(90vh) translateX(10px) rotate(36deg) scale(1);
    }
    90% {
        opacity: 1;
        transform: translateY(-10vh) translateX(60px) rotate(324deg) scale(1);
    }
    100% {
        transform: translateY(-20vh) translateX(80px) rotate(360deg) scale(0);
        opacity: 0;
    }
}

/* ELEMENT ANIMATION STATES */
.animated {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

/* ACTIVE NAVIGATION STATE */
nav a.active {
    color: #4ecdc4;
    text-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
}

nav a.active::before {
    opacity: 1;
    transform: translateY(-50%) scale(1.3);
    background: #4ecdc4;
    box-shadow: 0 0 15px rgba(78, 205, 196, 0.6);
}

/* ENHANCED PROJECT HOVER EFFECTS */
.project-item:hover {
    transform: translateY(-15px) scale(1.03) !important;
    box-shadow: 0 30px 60px rgba(138, 43, 226, 0.3) !important;
    border-color: rgba(78, 205, 196, 0.5) !important;
}

/* ENHANCED STAT HOVER EFFECTS */
.stat-item:hover .stat-number {
    transform: scale(1.1);
    text-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
}

/* RESPONSIVE IMPROVEMENTS */
@media (max-width: 768px) {
    .moving-stars {
        display: none; /* Disable moving stars on mobile for performance */
    }
    
    .project-item:hover {
        transform: translateY(-5px) scale(1.01) !important;
    }
    
    nav a::before {
        display: none; /* Simplify navigation on mobile */
    }
    
    /* Enhanced mobile navigation */
    nav {
        backdrop-filter: blur(15px) !important;
        background: rgba(0, 0, 0, 0.3) !important;
    }
}

/* Small mobile navigation stacked */
@media (max-width: 480px) {
    nav .header {
        flex-direction: column !important;
        gap: 0.5rem !important;
        padding: 0.5rem 0 !important;
    }
    
    nav {
        padding: 0.8rem 1rem !important;
        border-radius: 20px !important;
    }
    
    nav a {
        padding: 0.4rem 0.8rem !important;
        border-radius: 15px !important;
        background: rgba(255, 255, 255, 0.1);
        margin: 0.2rem 0;
        min-width: 120px;
        text-align: center;
    }
}

/* PERFORMANCE OPTIMIZATIONS */
.project-item,
.stat-item,
.social-card {
    backface-visibility: hidden;
    perspective: 1000px;
    will-change: transform;
}

/* ACCESSIBILITY IMPROVEMENTS */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.2s !important;
    }
    
    .moving-stars {
        display: none !important;
    }
}

/* FOCUS STYLES FOR ACCESSIBILITY */
nav a:focus,
.social-card:focus,
.more-projects a:focus {
    outline: 2px solid #4ecdc4;
    outline-offset: 2px;
    border-radius: 8px;
}

/* HIGH CONTRAST MODE SUPPORT */
@media (prefers-contrast: high) {
    .projects-description,
    .more-projects,
    .stat-item,
    .social-card {
        border: 2px solid #fff;
        background: rgba(0, 0, 0, 0.8);
    }
}
`;

if (!document.getElementById('dynamic-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'dynamic-styles';
    styleSheet.textContent = dynamicStyles;
    document.head.appendChild(styleSheet);
}