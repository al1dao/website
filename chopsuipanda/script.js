// Chop Sui Panda Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initThemeToggle();
    initPageBlur();
    initSmoothScroll();
    
    console.log('🥢🐼 Chop Sui Panda page loaded successfully!');
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: [0, 0.1, 0.3, 0.5],
        rootMargin: '-5% 0px -5% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            const delay = parseInt(element.dataset.delay) || 0;

            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                setTimeout(() => {
                    element.classList.add('animate-in');
                    element.classList.remove('animate-out');
                    console.log('🎬 Animating in:', element.className);
                }, delay);
            } else if (!entry.isIntersecting) {
                element.classList.add('animate-out');
                element.classList.remove('animate-in');
                console.log('🎬 Animating out:', element.className);
            }
        });
    }, observerOptions);

    // Observe all scroll elements
    const scrollElements = document.querySelectorAll('.scroll-element');
    scrollElements.forEach(element => {
        observer.observe(element);
        
        // Check if element is already in viewport on load
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        
        if (!isVisible) {
            element.classList.add('animate-out');
            console.log('🎬 Initially hidden:', element.className);
        } else {
            const delay = parseInt(element.dataset.delay) || 0;
            setTimeout(() => {
                element.classList.add('animate-in');
                console.log('🎬 Initially visible:', element.className);
            }, delay + 100);
        }
    });

    console.log('📱 Scroll animations initialized for', scrollElements.length, 'elements');
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        htmlElement.classList.add('dark');
    } else {
        htmlElement.removeAttribute('data-theme');
        htmlElement.classList.remove('dark');
    }
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                htmlElement.removeAttribute('data-theme');
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                console.log('☀️ Switched to light mode');
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                console.log('🌙 Switched to dark mode');
            }
        });
    }
}

// Page Blur for Navigation Dropdown
function initPageBlur() {
    const dropdown = document.querySelector('.nav-dropdown');
    const menu = document.querySelector('.nav-dropdown-menu');
    let timeout;

    if (dropdown && menu) {
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            document.body.classList.add('page-blur-active');
        });

        dropdown.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                document.body.classList.remove('page-blur-active');
            }, 200);
        });

        menu.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
        });

        menu.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                document.body.classList.remove('page-blur-active');
            }, 200);
        });
    }
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax Effect for Hero Section
function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Image Loading with Fade In
function initImageLoading() {
    const images = document.querySelectorAll('img[src*="assets/images"]');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            img.addEventListener('error', () => {
                img.style.opacity = '0.5';
                img.alt = 'Image coming soon';
                console.warn('Failed to load image:', img.src);
            });
        }
    });
}

// Performance Optimization
function initPerformanceOptimizations() {
    // Throttle scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 16); // ~60fps
    };
    
    // Preload critical images
    const criticalImages = [
        '/assets/images/chop-hero.png',
        '/assets/images/chi-chest.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay for better UX
    setTimeout(() => {
        initImageLoading();
        initPerformanceOptimizations();
        
        // Only init parallax on desktop
        if (window.innerWidth > 768) {
            initParallax();
        }
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Reinitialize parallax based on screen size
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        if (window.innerWidth <= 768) {
            heroSection.style.transform = 'none';
        }
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.warn('Chop Sui Panda: Error caught:', e.error);
});

// Export functions for external use
window.ChopSuiPanda = {
    initScrollAnimations,
    initThemeToggle,
    initPageBlur,
    initSmoothScroll,
    initScreenshotCarousel
};

// Global carousel variables and functions
window.currentScreenshot = currentScreenshot;
window.updateScreenshotPositions = updateScreenshotPositions;
window.nextScreenshot = nextScreenshot;
window.prevScreenshot = prevScreenshot;
window.goToScreenshot = goToScreenshot;

// 3D Screenshot Carousel
let currentScreenshot = 0;
let screenshotAutoRotate;
let screenshotPaused = false;

function initScreenshotCarousel() {
    console.log('🖼️ Initializing screenshot carousel...');
    
    const screenshots = document.querySelectorAll('.screenshot-card');
    const indicators = document.querySelectorAll('.indicator');
    
    console.log('🖼️ Found', screenshots.length, 'screenshots');
    
    if (screenshots.length === 0) return;
    
    // Set initial positions
    updateScreenshotPositions();
    
    // Auto-rotation
    startScreenshotAutoRotate();
    
    // Pause on hover
    const container = document.querySelector('.screenshot-carousel-3d-container');
    if (container) {
        container.addEventListener('mouseenter', () => {
            pauseScreenshotAutoRotate();
        });
        
        container.addEventListener('mouseleave', () => {
            resumeScreenshotAutoRotate();
        });
    }
    
    // Touch/swipe support
    initScreenshotTouchSupport();
    
    console.log('🖼️ Screenshot carousel initialized successfully');
}

function updateScreenshotPositions() {
    const screenshots = document.querySelectorAll('.screenshot-card');
    const indicators = document.querySelectorAll('.indicator');
    const total = screenshots.length;
    
    screenshots.forEach((screenshot, index) => {
        // Remove all position classes
        screenshot.classList.remove('active', 'left-1', 'left-2', 'right-1', 'right-2', 'hidden');
        
        const position = (index - currentScreenshot + total) % total;
        
        switch (position) {
            case 0:
                screenshot.classList.add('active');
                break;
            case 1:
                screenshot.classList.add('right-1');
                break;
            case 2:
                screenshot.classList.add('right-2');
                break;
            case total - 1:
                screenshot.classList.add('left-1');
                break;
            case total - 2:
                screenshot.classList.add('left-2');
                break;
            default:
                screenshot.classList.add('hidden');
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentScreenshot);
    });
    
    console.log('🖼️ Updated positions, current:', currentScreenshot);
}

function nextScreenshot() {
    const screenshots = document.querySelectorAll('.screenshot-card');
    currentScreenshot = (currentScreenshot + 1) % screenshots.length;
    updateScreenshotPositions();
    console.log('➡️ Next screenshot:', currentScreenshot);
}

function prevScreenshot() {
    const screenshots = document.querySelectorAll('.screenshot-card');
    currentScreenshot = (currentScreenshot - 1 + screenshots.length) % screenshots.length;
    updateScreenshotPositions();
    console.log('⬅️ Previous screenshot:', currentScreenshot);
}

function goToScreenshot(index) {
    currentScreenshot = index;
    updateScreenshotPositions();
    console.log('🎯 Go to screenshot:', currentScreenshot);
}

function startScreenshotAutoRotate() {
    if (screenshotAutoRotate) clearInterval(screenshotAutoRotate);
    
    screenshotAutoRotate = setInterval(() => {
        if (!screenshotPaused) {
            nextScreenshot();
        }
    }, 4000); // 4 seconds per screenshot
    
    console.log('🔄 Screenshot auto-rotation started');
}

function pauseScreenshotAutoRotate() {
    screenshotPaused = true;
    console.log('⏸️ Screenshot auto-rotation paused');
}

function resumeScreenshotAutoRotate() {
    screenshotPaused = false;
    console.log('▶️ Screenshot auto-rotation resumed');
}

function initScreenshotTouchSupport() {
    const carousel = document.querySelector('.screenshot-carousel-3d');
    if (!carousel) return;
    
    let startX = 0;
    let isDragging = false;
    
    // Touch events
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        pauseScreenshotAutoRotate();
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) {
                nextScreenshot();
            } else {
                prevScreenshot();
            }
        }
        
        isDragging = false;
        setTimeout(resumeScreenshotAutoRotate, 1000);
    });
    
    // Mouse events for desktop
    carousel.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        pauseScreenshotAutoRotate();
        e.preventDefault();
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    carousel.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        
        const endX = e.clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextScreenshot();
            } else {
                prevScreenshot();
            }
        }
        
        isDragging = false;
        setTimeout(resumeScreenshotAutoRotate, 1000);
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDragging = false;
        resumeScreenshotAutoRotate();
    });
    
    console.log('👆 Screenshot touch/swipe support initialized');
} 