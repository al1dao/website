

// Professional Splash Cursor Effect
class SplashCursor {
    constructor() {
        this.ripples = [];
        this.trails = [];
        this.mouse = { x: 0, y: 0, prevX: 0, prevY: 0 };
        this.velocity = { x: 0, y: 0 };
        this.lastRippleTime = 0;
        this.init();
    }
    
    init() {
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.velocity.x = e.clientX - this.mouse.x;
            this.velocity.y = e.clientY - this.mouse.y;
            
            this.mouse.prevX = this.mouse.x;
            this.mouse.prevY = this.mouse.y;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            this.addTrail(e.clientX, e.clientY);
            
            // Add ripples on fast movement
            const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
            if (speed > 10 && Date.now() - this.lastRippleTime > 50) {
                this.addRipple(e.clientX, e.clientY, 'move');
                this.lastRippleTime = Date.now();
            }
        });
        
        // Add splash on click
        document.addEventListener('click', (e) => {
            this.addRipple(e.clientX, e.clientY, 'click');
        });
        
        // Add ripples on hover over interactive elements
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('button, a, .btn, .feature-card, .nav-cta')) {
                this.addRipple(e.clientX, e.clientY, 'hover');
            }
        });
        
        // Start animation loop
        this.animate();
    }
    
    addTrail(x, y) {
        // Smooth cursor trail
        this.trails.push({
            x: x,
            y: y,
            life: 1.0,
            size: 12 + Math.random() * 6,
            opacity: 0.8
        });
        
        // Limit trail length
        if (this.trails.length > 20) {
            this.trails.shift();
        }
    }
    
    addRipple(x, y, type) {
        const config = {
            click: { size: 80, duration: 0.6, intensity: 1.2 },
            move: { size: 40, duration: 0.4, intensity: 0.8 },
            hover: { size: 60, duration: 0.5, intensity: 1.0 }
        };
        
        const cfg = config[type] || config.move;
        
        this.ripples.push({
            x: x,
            y: y,
            size: 0,
            maxSize: cfg.size + Math.random() * 20,
            life: 1.0,
            duration: cfg.duration,
            intensity: cfg.intensity,
            type: type
        });
    }
    
    animate() {
        // Update trails
        this.trails.forEach((trail, index) => {
            trail.life -= 0.06;
            trail.size *= 0.98;
            trail.opacity *= 0.95;
            
            if (trail.life <= 0 || trail.opacity < 0.1) {
                this.trails.splice(index, 1);
            }
        });
        
        // Update ripples
        this.ripples.forEach((ripple, index) => {
            const progress = 1 - ripple.life;
            ripple.size = ripple.maxSize * progress;
            ripple.life -= 0.016 / ripple.duration;
            
            if (ripple.life <= 0) {
                this.ripples.splice(index, 1);
            }
        });
        
        this.render();
        requestAnimationFrame(() => this.animate());
    }
    
    render() {
        // Remove old elements
        document.querySelectorAll('.splash-cursor, .splash-ripple').forEach(el => el.remove());
        
        // Render main cursor
        const cursor = document.createElement('div');
        cursor.className = 'splash-cursor';
        cursor.style.cssText = `
            position: fixed;
            left: ${this.mouse.x}px;
            top: ${this.mouse.y}px;
            width: 20px;
            height: 20px;
            background: rgba(0, 255, 150, 0.9);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 20px rgba(0, 255, 150, 0.6),
                       0 0 40px rgba(0, 255, 150, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.3);
        `;
        document.body.appendChild(cursor);
        
        // Render trails
        this.trails.forEach((trail, index) => {
            const trailEl = document.createElement('div');
            trailEl.className = 'splash-cursor';
            trailEl.style.cssText = `
                position: fixed;
                left: ${trail.x}px;
                top: ${trail.y}px;
                width: ${trail.size}px;
                height: ${trail.size}px;
                background: rgba(0, 255, 150, ${trail.life * trail.opacity * 0.4});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                filter: blur(${2 - trail.life}px);
            `;
            document.body.appendChild(trailEl);
        });
        
        // Render ripples
        this.ripples.forEach((ripple) => {
            const rippleEl = document.createElement('div');
            rippleEl.className = 'splash-ripple';
            
            const progress = 1 - ripple.life;
            const opacity = ripple.life * ripple.intensity;
            const scale = progress;
            
            // Different colors for different types
            const colors = {
                click: 'rgba(0, 255, 150, ',
                move: 'rgba(0, 200, 255, ',
                hover: 'rgba(255, 100, 0, '
            };
            const color = colors[ripple.type] || colors.move;
            
            rippleEl.style.cssText = `
                position: fixed;
                left: ${ripple.x}px;
                top: ${ripple.y}px;
                width: ${ripple.size}px;
                height: ${ripple.size}px;
                border: 2px solid ${color}${opacity * 0.8});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                transform: translate(-50%, -50%) scale(${scale});
                background: ${color}${opacity * 0.1});
                box-shadow: inset 0 0 20px ${color}${opacity * 0.3}),
                           0 0 30px ${color}${opacity * 0.2});
            `;
            document.body.appendChild(rippleEl);
        });
    }
}

// Matrix Text Decoding Effect
class MatrixTextDecoder {
    constructor() {
        this.chars = '01';
        this.observers = new Map();
        this.init();
    }

    init() {
        // Wait for DOM to be loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupMatrixText());
        } else {
            this.setupMatrixText();
        }
    }

    setupMatrixText() {
        const matrixElements = document.querySelectorAll('.matrix-text');
        
        matrixElements.forEach((element) => {
            this.setupElement(element);
        });
    }

    setupElement(element) {
        const originalText = element.getAttribute('data-text') || element.textContent;
        element.setAttribute('data-text', originalText);
        
        // Create observer for this element
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.decodeText(element);
                } else {
                    this.encodeText(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        observer.observe(element);
        this.observers.set(element, observer);

        // Initially show as binary
        this.showBinary(element, originalText);
    }

    showBinary(element, text) {
        const binaryText = this.generateBinary(text);
        element.textContent = binaryText;
        element.classList.add('binary');
    }

    generateBinary(text) {
        // Preserve structure (spaces, newlines, etc.)
        return text.split('').map(char => {
            if (char === ' ') return ' ';
            if (char === '\n') return '\n';
            if (char === '\t') return '\t';
            // Generate random binary digit
            return Math.random() > 0.5 ? '1' : '0';
        }).join('');
    }

    async decodeText(element) {
        const finalText = element.getAttribute('data-text');
        if (!finalText) return;

        element.classList.add('decoding');
        
        const steps = 8; // Number of decoding steps
        const delay = 50; // Delay between steps in ms
        
        for (let step = 0; step < steps; step++) {
            await new Promise(resolve => setTimeout(resolve, delay));
            
            const decodedText = finalText.split('').map((char, index) => {
                if (char === ' ' || char === '\n' || char === '\t') return char;
                
                // Gradually reveal characters
                const progress = (step + 1) / steps;
                const shouldReveal = Math.random() < progress * progress; // Exponential reveal
                
                if (shouldReveal) {
                    return char;
                } else {
                    return Math.random() > 0.5 ? '1' : '0';
                }
            }).join('');
            
            element.textContent = decodedText;
        }
        
        // Ensure final text is correct
        element.textContent = finalText;
        element.classList.remove('binary', 'decoding');
    }

    async encodeText(element) {
        const finalText = element.getAttribute('data-text');
        if (!finalText) return;

        element.classList.add('decoding');
        
        const steps = 6; // Number of encoding steps
        const delay = 30; // Delay between steps in ms
        
        for (let step = 0; step < steps; step++) {
            await new Promise(resolve => setTimeout(resolve, delay));
            
            const encodedText = finalText.split('').map((char, index) => {
                if (char === ' ' || char === '\n' || char === '\t') return char;
                
                // Gradually convert to binary
                const progress = (step + 1) / steps;
                const shouldEncode = Math.random() < progress;
                
                if (shouldEncode) {
                    return Math.random() > 0.5 ? '1' : '0';
                } else {
                    return char;
                }
            }).join('');
            
            element.textContent = encodedText;
        }
        
        // Final binary state
        this.showBinary(element, finalText);
        element.classList.remove('decoding');
    }

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }
}

// Smooth Scrolling
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced Background Effects
function initBackgroundEffects() {
    const neuralNetwork = document.querySelector('.neural-network');
    const dataStreams = document.querySelector('.data-streams');
    
    if (neuralNetwork) {
        // Add dynamic neural network nodes
        for (let i = 0; i < 5; i++) {
            const node = document.createElement('div');
            node.className = 'neural-node';
            node.style.position = 'absolute';
            node.style.width = '4px';
            node.style.height = '4px';
            node.style.background = 'rgba(255, 255, 255, 0.3)';
            node.style.borderRadius = '50%';
            node.style.left = Math.random() * 100 + '%';
            node.style.top = Math.random() * 100 + '%';
            node.style.animation = `neuralFloat ${8 + Math.random() * 4}s ease-in-out infinite`;
            neuralNetwork.appendChild(node);
        }
    }
}

// Feature Carousel Auto-scroll
function initFeatureCarousel() {
    const carousel = document.querySelector('.features-carousel');
    if (!carousel) return;

    let isHovered = false;
    carousel.addEventListener('mouseenter', () => isHovered = true);
    carousel.addEventListener('mouseleave', () => isHovered = false);

    // Add subtle hover effects to feature cards
    const cards = carousel.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Chat Interface Animation
function initChatInterface() {
    const chatInterface = document.querySelector('.chat-interface-mockup');
    if (!chatInterface) return;

    const messages = chatInterface.querySelectorAll('.message');
    const input = chatInterface.querySelector('.chat-input input');
    const sendBtn = chatInterface.querySelector('.send-btn');

    // Animate messages on load
    messages.forEach((message, index) => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            message.style.transition = 'all 0.5s ease';
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, (index + 1) * 800);
    });

    // Interactive input
    if (input) {
        input.addEventListener('focus', () => {
            input.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.borderColor = '';
        });
    }

    // Send button animation
    if (sendBtn) {
        sendBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sendBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                sendBtn.style.transform = '';
            }, 150);
        });
    }
}

// Navbar scroll effect
function initNavbarScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.9)';
            nav.style.borderBottomColor = 'var(--border-color)';
        }
        
        lastScroll = currentScroll;
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.work-panel, .use-case-item, .feature-card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

// Performance optimization for matrix effect
function optimizePerformance() {
    // Reduce animations when user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
        return;
    }

    // Pause heavy animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        const animations = document.querySelectorAll('.neural-network, .data-streams, .ai-code-fragments');
        animations.forEach(element => {
            if (document.hidden) {
                element.style.animationPlayState = 'paused';
            } else {
                element.style.animationPlayState = 'running';
            }
        });
    });
}

// Add CSS for neural nodes animation
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes neuralFloat {
            0%, 100% {
                transform: translateY(0px);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-20px);
                opacity: 0.8;
            }
        }
        
        .neural-node {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        
        @media (max-width: 768px) {
            .neural-node {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Removed orbital display - using clean HTML grid instead

// True 3D Carousel Functionality
function init3DCarousel() {
    console.log('Initializing True 3D Carousel...');
    
    const carousel = document.getElementById('carouselCards');
    const cards = document.querySelectorAll('.use-case-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!carousel || cards.length === 0) {
        console.error('Carousel elements not found!');
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = cards.length;
    const rotationAngle = 360 / totalSlides; // 72 degrees per slide
    let autoRotateInterval;
    let isUserInteracting = false;
    
    // Update carousel rotation
    function updateCarousel() {
        const rotation = -(currentSlide * rotationAngle);
        console.log(`Rotating carousel to ${rotation} degrees (slide ${currentSlide})`);
        
        carousel.style.transform = `rotateY(${rotation}deg)`;
        
        // Update active card
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentSlide);
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }
    
    // Auto-rotation
    function startAutoRotation() {
        if (autoRotateInterval) clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(() => {
            if (!isUserInteracting) {
                nextSlide();
            }
        }, 4000);
    }
    
    function stopAutoRotation() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
            autoRotateInterval = null;
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        isUserInteracting = true;
        nextSlide();
        stopAutoRotation();
        setTimeout(() => {
            isUserInteracting = false;
            startAutoRotation();
        }, 8000);
    });
    
    prevBtn.addEventListener('click', () => {
        isUserInteracting = true;
        prevSlide();
        stopAutoRotation();
        setTimeout(() => {
            isUserInteracting = false;
            startAutoRotation();
        }, 8000);
    });
    
    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            isUserInteracting = true;
            goToSlide(index);
            stopAutoRotation();
            setTimeout(() => {
                isUserInteracting = false;
                startAutoRotation();
            }, 8000);
        });
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        isUserInteracting = true;
        stopAutoRotation();
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Check if horizontal swipe is more significant than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                prevSlide(); // Swipe right = previous slide
            } else {
                nextSlide(); // Swipe left = next slide
            }
        }
        
        isDragging = false;
        setTimeout(() => {
            isUserInteracting = false;
            startAutoRotation();
        }, 8000);
    });
    
    // Mouse drag support for desktop
    let mouseStartX = 0;
    let isMouseDragging = false;
    
    carousel.addEventListener('mousedown', (e) => {
        mouseStartX = e.clientX;
        isMouseDragging = true;
        isUserInteracting = true;
        stopAutoRotation();
        carousel.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isMouseDragging) return;
        e.preventDefault();
    });
    
    document.addEventListener('mouseup', (e) => {
        if (!isMouseDragging) return;
        
        const deltaX = e.clientX - mouseStartX;
        
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        
        isMouseDragging = false;
        carousel.style.cursor = 'grab';
        setTimeout(() => {
            isUserInteracting = false;
            startAutoRotation();
        }, 8000);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (carousel.closest('section').getBoundingClientRect().top < window.innerHeight && 
            carousel.closest('section').getBoundingClientRect().bottom > 0) {
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                isUserInteracting = true;
                prevSlide();
                stopAutoRotation();
                setTimeout(() => {
                    isUserInteracting = false;
                    startAutoRotation();
                }, 8000);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                isUserInteracting = true;
                nextSlide();
                stopAutoRotation();
                setTimeout(() => {
                    isUserInteracting = false;
                    startAutoRotation();
                }, 8000);
            }
        }
    });
    
    // Pause auto-rotation when carousel is not visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoRotation();
            } else {
                stopAutoRotation();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(carousel);
    
    // Initialize
    updateCarousel();
    startAutoRotation();
    
    console.log('🎠 3D Carousel initialized with touch, mouse, and keyboard support');
}

// Initialize everything
function init() {
    // Initialize fluid cursor
    new SplashCursor();
    
    // Core functionality that actually exists
    new MatrixTextDecoder();
    setupSmoothScrolling();
    initBackgroundEffects();
    initFeatureCarousel();
    initChatInterface();
    initNavbarScroll();
    initScrollAnimations();
    init3DCarousel();
    
    // Features data removed - using static HTML grid instead
    
    // Features section is now handled by static HTML - no JS needed
    
    console.log('🤖 Finsurf: AI-powered DeFi interface loaded');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Cleanup function for SPA navigation
window.finsurfCleanup = () => {
    if (window.matrixDecoder) {
        window.matrixDecoder.destroy();
    }
}; 