// Finsurf Page JavaScript
// Enhanced with matrix effects and theme management

document.addEventListener('DOMContentLoaded', function() {
    // Theme management
    initThemeToggle();
    
    // Matrix text effects
    initMatrixEffects();
    
    // Enhanced background effects
    initBackgroundEffects();
    
    // Navigation dropdown
    initNavigationDropdown();
    
    // Chat interface animations
    initChatInterface();
    
    // Scroll effects
    initScrollEffects();
    
    // Matrix rain effect
    initMatrixRain();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize Splash Cursor (desktop only)
    if (!(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        new SplashCursor();
    }
});

// Theme Toggle System
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Trigger matrix effect refresh
        refreshMatrixEffects();
        refreshBackgroundEffects();
    });
}

// Matrix Text Effects - Removed flickering for better readability
function initMatrixEffects() {
    const matrixElements = document.querySelectorAll('.matrix-text');
    
    matrixElements.forEach(element => {
        // Only add subtle hover effect, no flickering or disappearing text
        element.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 8px var(--matrix-green)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
        });
        
        // Removed random flicker effect - text should stay visible for readability
    });
}

function refreshMatrixEffects() {
    // No longer needed since we removed flickering effects
    // Text remains stable and readable at all times
}

// Enhanced Background Effects
function initBackgroundEffects() {
    createFloatingElements();
    createDataStreams();
    initParallaxEffect();
}

function refreshBackgroundEffects() {
    // Clear existing fragments
    const existingFragments = document.querySelectorAll('.code-fragment');
    existingFragments.forEach(frag => frag.remove());
    
    // Recreate with new theme
    setTimeout(() => {
        createFloatingElements();
    }, 100);
}

function createFloatingElements() {
    const container = document.querySelector('.ai-code-fragments');
    if (!container) return;
    
    // Create floating code fragments
    for (let i = 0; i < 25; i++) {
        const fragment = document.createElement('div');
        fragment.className = 'code-fragment';
        
        const isCurrentThemeLight = document.documentElement.getAttribute('data-theme') === 'light';
        const opacity = isCurrentThemeLight ? '0.4' : '0.6';
        const color = isCurrentThemeLight ? 'rgba(0, 221, 0, ' + opacity + ')' : 'rgba(0, 255, 0, ' + opacity + ')';
        
        fragment.style.cssText = `
            position: absolute;
            color: ${color};
            font-family: 'Courier New', monospace;
            font-size: ${8 + Math.random() * 6}px;
            pointer-events: none;
            animation: float-up ${15 + Math.random() * 15}s linear infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 8}s;
            z-index: -1;
        `;
        
        const codes = [
            '0x4f3c2a1b', '::1::0::1::', 'ETH', 'USDC', 'WETH', 'DAI',
            'swap()', 'yield()', 'stake()', 'bridge()', 'execute()',
            '11.4%', '10.9%', '15.2%', 'APY', 'vault', 'LP', 'DeFi',
            '0101010', '1010101', '0110110', '1001001', '0010110',
            'finsurf.ai', 'onchain', 'autopilot', 'intent', 'zap()',
            'Kinetix', 'Concrete', 'Stader', 'Base', 'Ethereum',
            '{ success: true }', 'await tx()', 'gas: optimal'
        ];
        fragment.textContent = codes[Math.floor(Math.random() * codes.length)];
        
        container.appendChild(fragment);
    }
    
    // Create matrix rain lines
    for (let i = 0; i < 8; i++) {
        const rainLine = document.createElement('div');
        rainLine.className = 'matrix-rain-line';
        
        const isCurrentThemeLight = document.documentElement.getAttribute('data-theme') === 'light';
        const color = isCurrentThemeLight ? 'rgba(0, 221, 0, 0.3)' : 'rgba(0, 255, 0, 0.3)';
        
        rainLine.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            width: 2px;
            height: 100px;
            background: linear-gradient(to bottom, transparent, ${color}, transparent);
            animation: rain-fall ${8 + Math.random() * 12}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            z-index: -1;
        `;
        
        container.appendChild(rainLine);
    }
}

function createDataStreams() {
    // Add CSS for floating and rain animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-up {
            0% { 
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { 
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes rain-fall {
            0% { 
                transform: translateY(-100px);
                opacity: 0;
            }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { 
                transform: translateY(100vh);
                opacity: 0;
            }
        }
        
        @keyframes matrix-glitch {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-2px); }
            40% { transform: translateX(2px); }
            60% { transform: translateX(-1px); }
            80% { transform: translateX(1px); }
        }
        
        @keyframes typewriter {
            0% { width: 0; }
            100% { width: 100%; }
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const background = document.querySelector('.neural-network');
        const streams = document.querySelector('.data-streams');
        
        if (background) {
            background.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        if (streams) {
            streams.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Matrix Rain Effect
function initMatrixRain() {
    const container = document.querySelector('.ai-code-fragments');
    if (!container) return;
    
    // Create binary rain
    setInterval(() => {
        if (Math.random() > 0.7) {
            const binary = document.createElement('div');
            binary.className = 'binary-rain';
            
            const isCurrentThemeLight = document.documentElement.getAttribute('data-theme') === 'light';
            const color = isCurrentThemeLight ? 'rgba(0, 221, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)';
            
            binary.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: -20px;
                color: ${color};
                font-family: 'Courier New', monospace;
                font-size: 12px;
                pointer-events: none;
                animation: rain-fall 6s linear forwards;
                z-index: -1;
            `;
            
            binary.textContent = Math.random() > 0.5 ? '1' : '0';
            container.appendChild(binary);
            
            // Remove after animation
            setTimeout(() => {
                if (binary.parentNode) {
                    binary.parentNode.removeChild(binary);
                }
            }, 6000);
        }
    }, 200);
}

// Navigation Dropdown
function initNavigationDropdown() {
    const dropdown = document.querySelector('.nav-dropdown');
    const menu = document.querySelector('.nav-dropdown-menu');
    
    if (!dropdown || !menu) return;
    
    let timeout;
    
    dropdown.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        menu.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    dropdown.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateX(-50%) translateY(-10px)';
        }, 200);
    });
}

// Chat Interface Animations
function initChatInterface() {
    const chatMessages = document.querySelectorAll('.message');
    const txButtons = document.querySelectorAll('.tx-btn');
    const sendBtn = document.querySelector('.send-btn');
    const chatInput = document.querySelector('.chat-input input');
    
    // Animate messages on load with typewriter effect
    chatMessages.forEach((message, index) => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            message.style.transition = 'all 0.5s ease';
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
            
            // Add typewriter effect to text
            const text = message.querySelector('.matrix-text');
            if (text) {
                const originalText = text.textContent;
                text.textContent = '';
                let i = 0;
                const typeInterval = setInterval(() => {
                    text.textContent += originalText[i];
                    i++;
                    if (i >= originalText.length) {
                        clearInterval(typeInterval);
                    }
                }, 30);
            }
        }, index * 400 + 1200);
    });
    
    // Button hover effects
    txButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('simulate')) {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.4)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('simulate')) {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            }
        });
    });
    
    // Chat input effects
    if (chatInput) {
        chatInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.3)';
            this.parentElement.style.borderColor = 'var(--accent-color)';
        });
        
        chatInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
            this.parentElement.style.borderColor = 'var(--border-color)';
        });
        
        // Simulate typing effect
        chatInput.addEventListener('input', function() {
            if (sendBtn) {
                sendBtn.style.animation = 'pulse 0.3s ease-in-out';
                sendBtn.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    sendBtn.style.animation = '';
                    sendBtn.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special effect for feature cards
                if (entry.target.classList.contains('feature-card')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.style.boxShadow = 'var(--shadow-medium)';
                    }, delay);
                }
                
                // Special effect for intent examples
                if (entry.target.classList.contains('intent-example')) {
                    setTimeout(() => {
                        entry.target.style.borderColor = 'var(--accent-color)';
                        entry.target.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.2)';
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .intent-example, .cta-content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// Utility function for random matrix characters
function getRandomMatrixChar() {
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    return chars[Math.floor(Math.random() * chars.length)];
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add custom cursor effect for interactive elements
document.addEventListener('mousemove', debounce((e) => {
    const interactiveElements = document.querySelectorAll('.btn, .tx-btn, .theme-toggle');
    interactiveElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            element.style.setProperty('--mouse-x', x + 'px');
            element.style.setProperty('--mouse-y', y + 'px');
        }
    });
}, 10));

// Add loading screen effect
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
}); 

// Scroll Animation System
function initScrollAnimations() {
    console.log('Initializing scroll animations...');
    
    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // If reduced motion is preferred, just show all elements
        const scrollElements = document.querySelectorAll('.scroll-element, .scroll-slide-left, .scroll-slide-right, .scroll-scale, .scroll-rotate');
        scrollElements.forEach(el => {
            el.classList.add('animate-in');
        });
        return;
    }

    // Intersection Observer options - more aggressive triggering
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -20% 0px', // Trigger when element is 20% visible
        threshold: 0.1
    };

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            console.log('Element observed:', element.className, 'intersecting:', entry.isIntersecting);
            
            if (entry.isIntersecting) {
                // Element is entering viewport
                element.classList.add('animate-in');
                element.classList.remove('animate-out');
                console.log('Added animate-in to:', element.className);
            } else {
                // Element is leaving viewport - reset for re-entry
                element.classList.remove('animate-in');
                element.classList.add('animate-out');
            }
        });
    }, observerOptions);

    // Find and observe all scroll elements
    const scrollElements = document.querySelectorAll(
        '.scroll-element, .scroll-slide-left, .scroll-slide-right, .scroll-scale, .scroll-rotate'
    );
    
    console.log('Found scroll elements:', scrollElements.length);
    
    scrollElements.forEach((element, index) => {
        console.log(`Observing element ${index}:`, element.className);
        observer.observe(element);
        
        // Add stagger delays
        if (element.classList.contains('feature-card')) {
            element.style.transitionDelay = `${index * 150}ms`;
        }
        if (element.classList.contains('intent-example')) {
            element.style.transitionDelay = `${index * 200}ms`;
        }
    });

    // Special animation for chat interface messages
    const chatInterface = document.querySelector('.chat-interface-mockup.scroll-element');
    if (chatInterface) {
        const chatObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger typing animation for chat messages
                    setTimeout(() => {
                        const messages = chatInterface.querySelectorAll('.message');
                        messages.forEach((message, index) => {
                            setTimeout(() => {
                                message.style.opacity = '1';
                                message.style.transform = 'translateY(0)';
                            }, index * 500);
                        });
                    }, 800);
                }
            });
        }, { threshold: 0.3 });
        
        chatObserver.observe(chatInterface);
    }
}

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
            if (e.target.matches('button, a, .btn, .feature-card, .nav-dropdown-trigger, .tx-btn, .send-btn')) {
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
        
        // Get current theme for cursor color
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        const cursorColor = theme === 'dark' ? 'rgba(0, 255, 0, 0.9)' : 'rgba(22, 163, 74, 0.9)';
        const shadowColor = theme === 'dark' ? 'rgba(0, 255, 0, 0.6)' : 'rgba(22, 163, 74, 0.6)';
        
        // Create plus sign using pseudo elements
        cursor.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 16px;
                height: 2px;
                background: ${cursorColor};
                transform: translate(-50%, -50%);
                box-shadow: 0 0 8px ${shadowColor},
                           0 0 16px ${shadowColor.replace('0.6', '0.3')};
            "></div>
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 2px;
                height: 16px;
                background: ${cursorColor};
                transform: translate(-50%, -50%);
                box-shadow: 0 0 8px ${shadowColor},
                           0 0 16px ${shadowColor.replace('0.6', '0.3')};
            "></div>
        `;
        document.body.appendChild(cursor);
        
        // Render trails as small tech squares
        this.trails.forEach((trail, index) => {
            const trailEl = document.createElement('div');
            trailEl.className = 'splash-cursor';
            
            const trailColor = theme === 'dark' ? 'rgba(0, 255, 0' : 'rgba(22, 163, 74';
            
            trailEl.style.cssText = `
                position: fixed;
                left: ${trail.x}px;
                top: ${trail.y}px;
                width: ${trail.size}px;
                height: ${trail.size}px;
                background: ${trailColor}, ${trail.life * trail.opacity * 0.3});
                border: 1px solid ${trailColor}, ${trail.life * trail.opacity * 0.2});
                border-radius: 2px;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%) rotate(45deg);
                filter: blur(${1 - trail.life * 0.5}px);
                box-shadow: 0 0 ${trail.size * 0.5}px ${trailColor}, ${trail.life * trail.opacity * 0.2});
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
            
            // Different colors for different types - theme aware
            const colors = theme === 'dark' ? {
                click: 'rgba(0, 255, 0, ',
                move: 'rgba(0, 200, 255, ',
                hover: 'rgba(255, 100, 0, '
            } : {
                click: 'rgba(22, 163, 74, ',
                move: 'rgba(34, 197, 94, ',
                hover: 'rgba(245, 158, 11, '
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