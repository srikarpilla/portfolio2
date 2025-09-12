// Advanced Portfolio JavaScript - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeTypingAnimation();
    initializeScrollAnimations();
    initializeProjectFilters();
    initializeCounters();
    initializeSkillsAnimation();
    initializeContactForm();
    initializeThemeToggle();
    initializeMobileMenu();
    initializeParticles();
});

// Navigation functionality - FIXED
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling for navigation links - FIXED
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove the #
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const offsetTop = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const mobileToggle = document.getElementById('mobile-menu-toggle');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    resetMobileMenuIcon();
                }
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation based on scroll position - IMPROVED
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            
            if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Helper function for mobile menu icon reset
function resetMobileMenuIcon() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const spans = mobileToggle.querySelectorAll('span');
    spans.forEach(span => {
        span.style.transform = '';
        span.style.opacity = '';
    });
}

// Typing animation for hero section
function initializeTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const titles = [
        'AI/ML Developer',
        'Data Scientist', 
        'Full Stack Developer',
        'Problem Solver'
    ];
    
    let titleIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, characterIndex - 1);
            characterIndex--;
            
            if (characterIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                setTimeout(type, 500);
                return;
            }
        } else {
            typingElement.textContent = currentTitle.substring(0, characterIndex + 1);
            characterIndex++;
            
            if (characterIndex === currentTitle.length) {
                isDeleting = true;
                setTimeout(type, 2000);
                return;
            }
        }
        
        setTimeout(type, isDeleting ? 50 : 100);
    }
    
    setTimeout(type, 1000);
}

// Scroll animations using Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for skill progress bars
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
                
                // Special handling for counters
                if (entry.target.classList.contains('stats-grid')) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(statNumber => {
                        animateCounter(statNumber);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.section-header, .about-content > *, .project-card, .skill-category, .timeline-item, .contact-item, .stats-grid'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Project filtering functionality
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hide');
                        card.classList.add('show');
                        card.style.display = 'block';
                    } else {
                        card.classList.remove('show');
                        card.classList.add('hide');
                        setTimeout(() => {
                            if (card.classList.contains('hide')) {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                }, index * 50);
            });
        });
    });
    
    // Initialize - show all projects
    projectCards.forEach(card => {
        card.classList.add('show');
        card.style.display = 'block';
    });
}

// Animated counters - FIXED
function initializeCounters() {
    // Counter animation is handled in scroll animations
}

function animateCounter(element) {
    if (element.dataset.animated) return;
    
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 95 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 95 ? '%' : '+');
        }
    }, 16);
    
    element.dataset.animated = 'true';
}

// Skills animation
function initializeSkillsAnimation() {
    // Skill bars animation is handled in scroll animations
}

function animateSkillBars(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-progress-fill');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 200);
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading state
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.classList.add('active');
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Reset button state
            if (btnText) btnText.style.display = 'inline';
            if (btnLoading) btnLoading.classList.remove('active');
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
        }, 2000);
    });
}

// Theme toggle functionality - FIXED
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    
    // Set initial theme to dark
    let currentTheme = 'dark';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Toggle theme
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-color-scheme', currentTheme);
        
        // Update icon with animation
        if (currentTheme === 'light') {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
        
        // Add animation effect
        this.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Show notification
        showNotification(`Switched to ${currentTheme} theme`, 'info');
    });
}

// Mobile menu functionality - FIXED
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!mobileMenuToggle || !navMenu) return;
    
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = this.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (this.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                resetMobileMenuIcon();
            }
        }
    });
}

// Particle animation system
function initializeParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;
    
    const particleCount = 30; // Reduced for better performance
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createParticle(heroParticles), i * 200);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Random size
    const size = Math.random() * 3 + 1;
    
    // Random animation duration
    const duration = Math.random() * 15 + 10;
    
    particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 245, 255, 0.4);
        border-radius: 50%;
        animation: floatParticle ${duration}s infinite linear;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            createParticle(container);
        }
    }, duration * 1000);
}

// Enhanced smooth scrolling for all internal links
document.addEventListener('click', function(e) {
    // Check if clicked element is a link with hash
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navbar = document.getElementById('navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const offsetTop = targetElement.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Utility function for notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const bgColor = type === 'success' ? '#10b981' : 
                   type === 'error' ? '#ef4444' : 
                   '#3b82f6';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${bgColor};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        font-size: 14px;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Initialize scroll-based animations for elements already in view
    const elementsInView = document.querySelectorAll('.section-header, .about-content > *');
    elementsInView.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            element.classList.add('animate');
        }
    });
});

// Add all necessary styles
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(26, 26, 26, 0.98);
        backdrop-filter: blur(20px);
        padding: var(--space-20);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        animation: slideDown 0.3s ease-out;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
    
    .nav-menu.active .nav-link {
        padding: 12px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .nav-menu.active .nav-link:last-child {
        border-bottom: none;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        width: 50px;
        height: 50px;
        border: 3px solid rgba(0, 245, 255, 0.3);
        border-top-color: #00f5ff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10001;
        transform: translate(-50%, -50%);
    }
    
    @keyframes spin {
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    body.loaded::before,
    body.loaded::after {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s ease-out;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .mobile-menu-toggle {
            display: flex !important;
        }
    }
`;
document.head.appendChild(additionalStyles);

// Intersection Observer polyfill for older browsers
if (!window.IntersectionObserver) {
    window.addEventListener('scroll', throttle(function() {
        const elements = document.querySelectorAll('[class*="animate"]');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.classList.add('animate');
            }
        });
    }, 100));
}

console.log('Advanced Portfolio loaded successfully! 🚀 Navigation fixed!');