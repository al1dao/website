// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        // Load saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);

        // Add event listener
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});

// DOM Elements
const buttons = document.querySelectorAll('.btn');
const featureCards = document.querySelectorAll('.feature-card');
const typingText = document.querySelector('.typing-text');
const particleField = document.querySelector('.particle-field');

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
            size: 8 + Math.random() * 4,
            opacity: 0.6
        });
        
        // Limit trail length
        if (this.trails.length > 15) {
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
        
        // Render main cursor as tech plus sign
        const cursor = document.createElement('div');
        cursor.className = 'splash-cursor';
        cursor.style.cssText = `
            position: fixed;
            left: ${this.mouse.x}px;
            top: ${this.mouse.y}px;
            width: 24px;
            height: 24px;
            pointer-events: none;
            z-index: 10000;
            transform: translate(-50%, -50%);
        `;
        
        // Create plus sign using pseudo elements
        cursor.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 16px;
                height: 2px;
                background: rgba(0, 255, 150, 0.9);
                transform: translate(-50%, -50%);
                box-shadow: 0 0 8px rgba(0, 255, 150, 0.6),
                           0 0 16px rgba(0, 255, 150, 0.3);
            "></div>
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 2px;
                height: 16px;
                background: rgba(0, 255, 150, 0.9);
                transform: translate(-50%, -50%);
                box-shadow: 0 0 8px rgba(0, 255, 150, 0.6),
                           0 0 16px rgba(0, 255, 150, 0.3);
            "></div>
        `;
        document.body.appendChild(cursor);
        
        // Render trails as small tech squares
        this.trails.forEach((trail, index) => {
            const trailEl = document.createElement('div');
            trailEl.className = 'splash-cursor';
            trailEl.style.cssText = `
                position: fixed;
                left: ${trail.x}px;
                top: ${trail.y}px;
                width: ${trail.size}px;
                height: ${trail.size}px;
                background: rgba(0, 255, 150, ${trail.life * trail.opacity * 0.3});
                border: 1px solid rgba(0, 255, 150, ${trail.life * trail.opacity * 0.2});
                border-radius: 2px;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%) rotate(45deg);
                filter: blur(${1 - trail.life * 0.5}px);
                box-shadow: 0 0 ${trail.size * 0.5}px rgba(0, 255, 150, ${trail.life * trail.opacity * 0.2});
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
                border-radius: 8px;
                pointer-events: none;
                z-index: 9998;
                transform: translate(-50%, -50%) scale(${scale}) rotate(45deg);
                background: ${color}${opacity * 0.05});
                box-shadow: inset 0 0 15px ${color}${opacity * 0.2}),
                           0 0 25px ${color}${opacity * 0.15});
            `;
            document.body.appendChild(rippleEl);
        });
    }
}

// Particle System
function createParticleSystem() {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.setProperty('--random-x', (Math.random() - 0.5) * 200 + 'px');
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animation = `particleFloat ${particle.style.animationDuration} ${particle.style.animationDelay} linear infinite`;
        
        particleField.appendChild(particle);
    }
}

// Futuristic hover effects
const hoverElements = document.querySelectorAll('button, a, .feature-card, .work-step');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        // Add holographic effect
        element.style.filter = 'brightness(1.1) contrast(1.1)';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.filter = 'none';
    });
});

// Button glow effects
buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--mouse-x', x + 'px');
        button.style.setProperty('--mouse-y', y + 'px');
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and work steps for animation
featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

const workSteps = document.querySelectorAll('.work-step');
workSteps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(50px)';
    step.style.transition = 'all 0.6s ease';
    observer.observe(step);
});

// Smooth scrolling for scroll indicator and learn more button
const scrollIndicator = document.querySelector('.scroll-indicator');
const learnMoreBtn = document.querySelector('a[href="#about"]');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        aboutSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Enhanced Learn More button functionality
if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const aboutSection = document.querySelector('#about');
        
        // Add visual feedback
        learnMoreBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            learnMoreBtn.style.transform = '';
        }, 100);
        
        // Smooth scroll with offset
        aboutSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add glow effect to about section header
        setTimeout(() => {
            const aboutHeader = document.querySelector('#about h2');
            if (aboutHeader) {
                aboutHeader.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.8)';
                setTimeout(() => {
                    aboutHeader.style.textShadow = '';
                }, 2000);
            }
        }, 800);
    });
}



// Enhanced matrix decode animation for hero tagline
function typeWriter() {
    const text = "Where Crypto Meets AI";
    
    if (typingText) {
        // Set the text directly - matrix effect handled by new MatrixTextDecoder
        typingText.textContent = text;
        typingText.setAttribute('data-text', text);
        typingText.classList.add('matrix-text');
    }
}

// Parallax effect for hero section
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const splineContainer = document.querySelector('.spline-container');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (splineContainer) {
        splineContainer.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}

// Throttle function for performance
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

// Add scroll event listeners
window.addEventListener('scroll', throttle(parallaxEffect, 16));

// Advanced AI logo interactions
function advancedLogoEffects() {
    const logoContainer = document.querySelector('.logo-effects-container');
    const mainLogo = document.querySelector('.main-logo');
    const neuralNodes = document.querySelectorAll('.neural-node');
    const neuralConnections = document.querySelectorAll('.neural-connection');
    const circuitLines = document.querySelectorAll('.circuit-line');
    const dataParticles = document.querySelectorAll('.data-particles .particle');
    
    if (logoContainer && mainLogo) {
        // Enhanced hover effects for AI theme
        logoContainer.addEventListener('mouseenter', () => {
            // Speed up neural network
            neuralNodes.forEach(node => {
                node.style.animationDuration = '1s';
                node.style.transform = 'scale(1.5)';
                node.style.boxShadow = '0 0 30px rgba(255, 255, 255, 1)';
            });
            
            neuralConnections.forEach(connection => {
                connection.style.animationDuration = '2s';
                connection.style.background = 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 1), transparent)';
            });
            
            // Activate circuit board
            circuitLines.forEach(line => {
                line.style.animationDuration = '3s';
                line.style.background = 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)';
            });
            
            // Energize data particles
            dataParticles.forEach(particle => {
                particle.style.animationDuration = '4s';
                particle.style.boxShadow = '0 0 20px rgba(255, 255, 255, 1)';
            });
            
            // Create AI particle burst
            createAIParticleBurst(logoContainer);
        });
        
        logoContainer.addEventListener('mouseleave', () => {
            // Return to normal state
            neuralNodes.forEach(node => {
                node.style.animationDuration = '';
                node.style.transform = '';
                node.style.boxShadow = '';
            });
            
            neuralConnections.forEach(connection => {
                connection.style.animationDuration = '';
                connection.style.background = '';
            });
            
            circuitLines.forEach(line => {
                line.style.animationDuration = '';
                line.style.background = '';
            });
            
            dataParticles.forEach(particle => {
                particle.style.animationDuration = '';
                particle.style.boxShadow = '';
            });
        });
        
        // Random AI processing effects
        setInterval(() => {
            if (Math.random() > 0.92) {
                // Neural network flash
                neuralNodes.forEach(node => {
                    node.style.background = 'rgba(255, 255, 255, 1)';
                    node.style.boxShadow = '0 0 25px rgba(255, 255, 255, 1)';
                });
                
                setTimeout(() => {
                    neuralNodes.forEach(node => {
                        node.style.background = '';
                        node.style.boxShadow = '';
                    });
                }, 200);
            }
        }, 3000);
        
        // Random logo glitch effects
        setInterval(() => {
            if (Math.random() > 0.95) {
                mainLogo.style.filter = 'brightness(0) invert(1) drop-shadow(0 0 40px rgba(255, 255, 255, 1)) hue-rotate(180deg)';
                
                setTimeout(() => {
                    mainLogo.style.filter = '';
                }, 150);
            }
        }, 5000);
    }
}

// Create AI particle burst effect
function createAIParticleBurst(container) {
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            pointer-events: none;
            z-index: 15;
        `;
        
        const angle = (i / 12) * Math.PI * 2;
        const distance = 80;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        container.appendChild(particle);
        
        particle.animate([
            {
                transform: 'translate(-50%, -50%) translate(0, 0)',
                opacity: 1
            },
            {
                transform: `translate(-50%, -50%) translate(${endX}px, ${endY}px)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }
}

// Mobile touch handling
function handleTouchDevice() {
    if ('ontouchstart' in window) {
        // Reduce particle count on mobile for better performance
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index % 2 === 0) {
                particle.remove();
            }
        });
        
        // Add touch feedback for buttons
        buttons.forEach(button => {
            button.addEventListener('touchstart', () => {
                button.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', () => {
                button.style.transform = 'scale(1)';
            });
        });
    }
}



// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    advancedLogoEffects();
    createParticleSystem();
    handleTouchDevice();
    
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Add futuristic loading effect with matrix-style reveal
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', throttle(() => {
    // Recreate particle system on resize
    particleField.innerHTML = '';
    createParticleSystem();
}, 250));

// Preload Spline scene
window.addEventListener('load', () => {
    const splineViewer = document.querySelector('spline-viewer');
    if (splineViewer) {
        splineViewer.addEventListener('load', () => {
            console.log('Spline scene loaded successfully');
        });
        
        splineViewer.addEventListener('error', (e) => {
            console.warn('Spline scene failed to load:', e);
            // Fallback: Add a CSS-only 3D effect
            createFallbackAnimation();
        });
    }
});

// Fallback animation if Spline fails
function createFallbackAnimation() {
    const splineContainer = document.querySelector('.spline-container');
    if (splineContainer) {
        splineContainer.innerHTML = `
            <div class="fallback-animation">
                <div class="minimal-shape"></div>
                <div class="minimal-shape"></div>
                <div class="minimal-shape"></div>
            </div>
        `;
        
        const fallbackStyle = document.createElement('style');
        fallbackStyle.textContent = `
            .fallback-animation {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 400px;
                height: 400px;
            }
            
            .minimal-shape {
                position: absolute;
                width: 2px;
                height: 60px;
                background: var(--primary-color);
                opacity: 0.4;
                animation: minimalRotate 8s linear infinite;
            }
            
            .minimal-shape:nth-child(2) {
                animation-delay: -2.67s;
                height: 80px;
            }
            
            .minimal-shape:nth-child(3) {
                animation-delay: -5.33s;
                height: 40px;
            }
            
            @keyframes minimalRotate {
                0% {
                    transform: rotate(0deg) translateX(120px) rotate(0deg);
                }
                100% {
                    transform: rotate(360deg) translateX(120px) rotate(-360deg);
                }
            }
        `;
        document.head.appendChild(fallbackStyle);
    }
}

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--reduced-animation', '1');
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

// Initialize Matrix Text Decoder
new MatrixTextDecoder();

// Initialize Splash Cursor (desktop only)
const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (isDesktop) {
    new SplashCursor();
}