/* Chop Sui Panda - Premium Gaming JavaScript */

// Add js-enabled class immediately to enable animations
document.documentElement.classList.add('js-enabled');

// Initialize page
console.log('🎮 Chop Sui Panda page loaded successfully!');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 DOM loaded, initializing features...');
    
    // Initialize icons immediately
    initializeIcons();
    
    // Initialize theme with AL1 system
    initializeTheme();
    
    // Initialize scroll animations with a small delay
    setTimeout(() => {
        initializeScrollAnimations();
    }, 100);
    
    // Initialize screenshot carousel
    initializeScreenshotCarousel();
    
    console.log('✅ All features initialized successfully!');
});

// Initialize Lucide icons
function initializeIcons() {
    try {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
            console.log('✨ Icons initialized successfully');
        } else {
            console.warn('⚠️ Lucide icons not found, retrying...');
            // Retry after a short delay
            setTimeout(() => {
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                    console.log('✨ Icons initialized on retry');
                } else {
                    console.warn('⚠️ Lucide icons failed to load after retry');
                }
            }, 1000);
        }
    } catch (error) {
        console.error('❌ Error initializing icons:', error);
    }
}

// Theme management - Using AL1 System
function initializeTheme() {
    const themeToggle = document.querySelector('#themeToggle');
    const html = document.documentElement;
    
    // Get saved theme or default to light (matching AL1 main site)
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    console.log(`🎨 Theme initialized: ${savedTheme}`);
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            console.log(`🎨 Theme switched to: ${newTheme}`);
            
            // Refresh icons after theme change
            setTimeout(() => {
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }, 100);
        });
        
        console.log('🎯 Theme toggle initialized successfully');
    } else {
        console.warn('⚠️ Theme toggle button not found');
    }
}

// Scroll animations with Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = parseInt(element.dataset.delay) || 0;
                
                setTimeout(() => {
                    element.classList.add('scroll-visible');
                    console.log('🎬 Animation triggered for:', element.className);
                }, delay);
                
                // Stop observing once animated
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe all scroll elements
    const scrollElements = document.querySelectorAll('.scroll-element');
    
    if (scrollElements.length === 0) {
        console.warn('⚠️ No scroll elements found for animation');
        return;
    }
    
    scrollElements.forEach((element, index) => {
        observer.observe(element);
        console.log(`👁️ Observing scroll element ${index + 1}:`, element.tagName);
    });
    
    console.log(`🎬 Scroll animation observer setup complete for ${scrollElements.length} elements`);
}

// Screenshot Carousel
let currentScreenshot = 0;
let screenshotInterval;
const screenshots = [
    { name: 'Slice Mode', icon: 'scissors' },
    { name: 'Knife Throw', icon: 'crosshair' },
    { name: 'Tree Chop', icon: 'axe' },
    { name: 'Wallet Connect', icon: 'wallet' },
    { name: 'Challenge Mode', icon: 'swords' },
    { name: 'Leaderboard', icon: 'trophy' }
];

function initializeScreenshotCarousel() {
    console.log('🖼️ Initializing screenshot carousel...');
    
    const carousel = document.getElementById('screenshotCarousel');
    const prevBtn = document.getElementById('screenshotPrev');
    const nextBtn = document.getElementById('screenshotNext');
    const indicatorsContainer = document.getElementById('screenshotIndicators');
    
    if (!carousel) {
        console.warn('⚠️ Screenshot carousel container not found');
        return;
    }
    
    console.log('🖼️ Found', screenshots.length, 'screenshots');
    
    // Create indicators
    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = '';
        screenshots.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToScreenshot(index));
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    // Set up control buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', previousScreenshot);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextScreenshot);
    }
    
    // Initialize carousel positions
    updateCarouselPositions();
    
    // Start auto-rotation
    startAutoRotation();
    
    // Pause on hover
    const carouselContainer = document.querySelector('.screenshot-carousel-3d-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', pauseAutoRotation);
        carouselContainer.addEventListener('mouseleave', resumeAutoRotation);
    }
    
    // Touch/swipe support
    setupTouchControls(carousel);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    console.log('🖼️ Screenshot carousel initialized successfully');
}

function updateCarouselPositions() {
    const items = document.querySelectorAll('.screenshot-item');
    const indicators = document.querySelectorAll('.indicator');
    
    items.forEach((item, index) => {
        item.classList.remove('active');
        
        const angle = ((index - currentScreenshot) * 60) % 360;
        const distance = index === currentScreenshot ? 0 : 200;
        const scale = index === currentScreenshot ? 1.1 : 0.8;
        const opacity = index === currentScreenshot ? 1 : 0.6;
        const zIndex = index === currentScreenshot ? 10 : 1;
        
        item.style.transform = `
            translate(-50%, -50%) 
            rotateY(${angle}deg) 
            translateZ(${distance}px) 
            scale(${scale})
        `;
        item.style.opacity = opacity;
        item.style.zIndex = zIndex;
        
        if (index === currentScreenshot) {
            item.classList.add('active');
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentScreenshot);
    });
    
    console.log('🖼️ Updated positions, current:', currentScreenshot);
}

function nextScreenshot() {
    currentScreenshot = (currentScreenshot + 1) % screenshots.length;
    updateCarouselPositions();
    console.log('➡️ Next screenshot:', currentScreenshot);
}

function previousScreenshot() {
    currentScreenshot = (currentScreenshot - 1 + screenshots.length) % screenshots.length;
    updateCarouselPositions();
    console.log('⬅️ Previous screenshot:', currentScreenshot);
}

function goToScreenshot(index) {
    currentScreenshot = index;
    updateCarouselPositions();
    console.log('🎯 Go to screenshot:', currentScreenshot);
}

function startAutoRotation() {
    screenshotInterval = setInterval(() => {
        nextScreenshot();
    }, 4000); // Change every 4 seconds
}

function pauseAutoRotation() {
    if (screenshotInterval) {
        clearInterval(screenshotInterval);
        screenshotInterval = null;
        console.log('⏸️ Screenshot auto-rotation paused');
    }
}

function resumeAutoRotation() {
    if (!screenshotInterval) {
        startAutoRotation();
        console.log('▶️ Screenshot auto-rotation resumed');
    }
}

function setupTouchControls(carousel) {
    let startX = 0;
    let startY = 0;
    let threshold = 50;
    
    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    carousel.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const deltaX = startX - endX;
        const deltaY = startY - endY;
        
        // Only handle horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                nextScreenshot();
            } else {
                previousScreenshot();
            }
        }
        
        startX = 0;
        startY = 0;
    }, { passive: true });
}

function handleKeyboardNavigation(e) {
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousScreenshot();
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextScreenshot();
    } else if (e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        const index = parseInt(e.key) - 1;
        if (index < screenshots.length) {
            goToScreenshot(index);
        }
    }
}

// Navigation dropdown functionality (if not handled by global script)
function initializeNavigation() {
    const dropdown = document.querySelector('.nav-dropdown');
    const dropdownMenu = document.querySelector('.nav-dropdown-menu');
    
    if (dropdown && dropdownMenu) {
        let hoverTimeout;
        
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(-10px)';
            }, 300);
        });
    }
}

// Initialize navigation if global script isn't loaded
if (!window.globalScriptLoaded) {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Performance optimization: Debounced scroll handler
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(function() {
        // Any scroll-based functionality can go here
        // Currently handled by Intersection Observer
    }, 16); // ~60fps
}, { passive: true });

// Error handling
window.addEventListener('error', function(e) {
    console.error('❌ JavaScript error:', e.error);
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (screenshotInterval) {
        clearInterval(screenshotInterval);
    }
});

console.log('🎮 Chop Sui Panda JavaScript loaded successfully!'); 