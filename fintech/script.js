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

// Initialize everything
function init() {
    // Core functionality
    new MatrixTextDecoder();
    setupSmoothScrolling();
    
    // Visual enhancements
    initBackgroundEffects();
    initFeatureCarousel();
    initChatInterface();
    initNavbarScroll();
    initScrollAnimations();
    
    // Performance
    optimizePerformance();
    addDynamicStyles();
    
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