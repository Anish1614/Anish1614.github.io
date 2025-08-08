// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const particlesContainer = document.getElementById('particles');

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeTypingAnimation();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeExternalLinks();
});

// Particle Animation
function initializeParticles() {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay and duration
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    
    particlesContainer.appendChild(particle);
}

// Typing Animation
function initializeTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const text = 'Anish Kumar';
    const speed = 150;
    let i = 0;
    
    typingText.textContent = '';
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start typing animation after a brief delay
    setTimeout(typeWriter, 1000);
}

// Scroll Effects
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Update navbar appearance
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveNavLink();
        
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Initial call
    updateScrollEffects();
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section's nav link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Mobile Menu
function initializeMobileMenu() {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbar.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// External Links Handler
function initializeExternalLinks() {
    // Handle all external links (social media, project links, etc.)
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"], a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't preventDefault for external links - let them open normally
            const href = this.getAttribute('href');
            if (href && (href.startsWith('http') || href.startsWith('https'))) {
                // For external links, ensure they open in a new tab
                this.setAttribute('target', '_blank');
                this.setAttribute('rel', 'noopener noreferrer');
                
                // Let the browser handle the navigation
                return true;
            }
        });
    });
    
    // Specifically handle social media links
    const socialLinks = document.querySelectorAll('.social-link, .project-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && (href.startsWith('http') || href.startsWith('https'))) {
                // Force open in new window/tab
                window.open(href, '_blank', 'noopener,noreferrer');
                e.preventDefault(); // Prevent default to avoid any conflicts
            }
        });
    });
}

// Smooth Scrolling (only for internal anchor links)
function initializeSmoothScrolling() {
    // Handle navigation links (internal only)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Handle hero buttons (only internal links)
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // For external links (like download resume), let them work normally
        });
    });
}

// Contact Form

function initializeContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Submit to Web3Forms
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }
             else {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'error');
            }
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        })
        .catch(error => {
            console.error(error);
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'error');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });
}
// function initializeContactForm() {
//     const form = document.getElementById("contact-form");

//     form.addEventListener("submit", function (e) {
//         e.preventDefault();

//         fetch(form.action, {
//             method: form.method,
//             body: new FormData(form)
//         })
//         .then((response) => {
//             if (response.ok) {
//                 document.getElementById("form-alert").innerHTML = `
//                     <div class="alert alert-success" role="alert">
//                         ✅ Your message has been sent successfully!
//                     </div>
//                 `;
//                 form.reset();
//             } else {
//                 document.getElementById("form-alert").innerHTML = `
//                     <div class="alert alert-danger" role="alert">
//                         ❌ Something went wrong. Please try again later.
//                     </div>
//                 `;
//             }
//         })
//         .catch((error) => {
//             console.error(error);
//             document.getElementById("form-alert").innerHTML = `
//                 <div class="alert alert-danger" role="alert">
//                     ❌ Error sending message: ${error}
//                 </div>
//             `;
//         });
//     });
// }




// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 90px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-card-border);
            border-radius: var(--radius-lg);
            padding: var(--space-16);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform var(--duration-normal) var(--ease-standard);
        }
        
        .notification--success {
            border-left: 4px solid var(--color-success);
        }
        
        .notification--error {
            border-left: 4px solid var(--color-error);
        }
        
        .notification--info {
            border-left: 4px solid var(--color-info);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-12);
        }
        
        .notification-message {
            color: var(--color-text);
            font-size: var(--font-size-sm);
            line-height: 1.4;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--color-text-secondary);
            font-size: var(--font-size-lg);
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background var(--duration-fast) var(--ease-standard);
        }
        
        .notification-close:hover {
            background: var(--color-secondary);
        }
    `;
    
    // Add styles to head if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Intersection Observer for animations
function initializeAnimationObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .experience-item, .education-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize animation observer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimationObserver();
});

// Utility function to debounce events
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    // Close mobile menu on desktop
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}, 250);

window.addEventListener('resize', handleResize);

// Preload critical resources
function preloadResources() {
    // Preload fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://r2cdn.perplexity.ai/fonts/FKGroteskNeue.woff2';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);
}

// Initialize preloading
preloadResources();

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove any loading indicators
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }
});

// Handle theme switching (if needed in future)
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-color-scheme', savedTheme);
    }
}

// Performance optimization: Lazy load images if any are added
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Add smooth reveal animations
const revealElements = document.querySelectorAll('.card, .skill-category, .project-card');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Error handling
window.addEventListener('error', function(event) {
    console.error('Application error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

console.log('Portfolio application initialized successfully!');