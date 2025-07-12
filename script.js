// DOM Elements
const buttons = document.querySelectorAll('.btn');
const featureCards = document.querySelectorAll('.feature-card');
const typingText = document.querySelector('.typing-text');
const particleField = document.querySelector('.particle-field');

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

// Matrix-style binary to text conversion
function matrixTextDecode(element, finalText, options = {}) {
    if (!element) return;
    
    const {
        duration = 3000,
        binaryDuration = 1000,
        decodeSpeed = 50,
        glitchChance = 0.1
    } = options;
    
    // Store original classes and text
    const originalClasses = element.className;
    const originalText = finalText;
    
    // Function to convert character to binary representation
    function charToBinary(char) {
        if (char === ' ') return ' '; // Preserve spaces
        if (char.match(/\s/)) return char; // Preserve other whitespace
        return Math.random() > 0.5 ? '1' : '0'; // Convert letters to binary
    }
    
    // Generate initial binary text that matches the structure
    let binaryText = originalText.split('').map(charToBinary).join('');
    
    // Phase 1: Immediately show binary rain with matrix styling
    element.textContent = binaryText;
    element.className = originalClasses + ' matrix-decoding';
    
    // Phase 2: Binary flickering with occasional glitches
    const binaryInterval = setInterval(() => {
        let flickerText = '';
        for (let i = 0; i < originalText.length; i++) {
            const char = originalText[i];
            if (char === ' ' || char.match(/\s/)) {
                flickerText += char; // Keep whitespace
            } else {
                flickerText += Math.random() > 0.8 ? 
                    (Math.random() > 0.5 ? '1' : '0') : 
                    binaryText[i];
            }
        }
        element.textContent = flickerText;
        
        // Reduced matrix glitch effect
        if (Math.random() > 0.97) {
            element.classList.add('matrix-glitch');
            setTimeout(() => {
                element.classList.remove('matrix-glitch');
            }, 100);
        }
    }, 120);
    
    // Phase 3: Start decoding to real text
    setTimeout(() => {
        clearInterval(binaryInterval);
        
        // Initialize decode tracking
        let decodedChars = new Array(originalText.length).fill('');
        let decodedPositions = new Array(originalText.length).fill(false);
        
        // Fill with initial binary
        for (let i = 0; i < originalText.length; i++) {
            if (originalText[i] === ' ' || originalText[i].match(/\s/)) {
                decodedChars[i] = originalText[i];
                decodedPositions[i] = true;
            } else {
                decodedChars[i] = Math.random() > 0.5 ? '1' : '0';
            }
        }
        
        const decodeInterval = setInterval(() => {
            let allDecoded = true;
            
            // Randomly pick positions to decode
            for (let i = 0; i < originalText.length; i++) {
                const char = originalText[i];
                
                // Skip whitespace
                if (char === ' ' || char.match(/\s/)) {
                    continue;
                }
                
                if (!decodedPositions[i] && Math.random() > 0.88) {
                    // Reduced glitch effect before revealing
                    if (Math.random() < glitchChance * 0.3) {
                        // Show random binary characters as glitch
                        decodedChars[i] = Math.random() > 0.5 ? '1' : '0';
                        
                        // Very brief glitch effect
                        element.classList.add('matrix-glitch');
                        setTimeout(() => {
                            element.classList.remove('matrix-glitch');
                        }, 75);
                    } else {
                        decodedChars[i] = char;
                        decodedPositions[i] = true;
                    }
                }
                
                // Check if all are decoded
                if (!decodedPositions[i]) {
                    allDecoded = false;
                }
            }
            
            // Update the display
            element.textContent = decodedChars.join('');
            
            // Clean up when done
            if (allDecoded) {
                clearInterval(decodeInterval);
                element.textContent = originalText;
                
                // Smooth transition out of matrix effect
                element.className = originalClasses + ' matrix-decoded';
                
                // Remove matrix classes after smooth transition
                setTimeout(() => {
                    element.className = originalClasses;
                }, 300);
            }
        }, decodeSpeed);
        
    }, binaryDuration);
}

// Enhanced matrix decode animation for hero tagline
function typeWriter() {
    const text = "Where Crypto Meets AI";
    
    if (typingText) {
        // Start with matrix decode effect - smooth and polished
        matrixTextDecode(typingText, text, {
            duration: 3000,
            binaryDuration: 1200,
            decodeSpeed: 40,
            glitchChance: 0.05
        });
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

// Matrix effects for ALL text elements with smooth coordinated flow
function initializeMatrixEffects() {
    // Function to convert text to binary
    function textToBinary(text) {
        return text.split('').map(char => {
            if (char === ' ' || char.match(/\s/)) return char;
            return Math.random() > 0.5 ? '1' : '0';
        }).join('');
    }
    
    // Function to apply matrix effect to any element
    function applyMatrixEffect(element, options = {}) {
        const originalText = element.textContent;
        if (!originalText.trim()) return; // Skip empty elements
        
        // Skip the hero subtitle as it has its own typewriter effect
        if (element.classList.contains('typing-text') || element.closest('.typing-text')) {
            return;
        }
        
        let isDecoding = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isDecoding) {
                    // Element is on screen - start decoding with coordinated timing
                    isDecoding = true;
                    setTimeout(() => {
                        matrixTextDecode(element, originalText, {
                            binaryDuration: options.binaryDuration || 600,
                            decodeSpeed: options.decodeSpeed || 25,
                            glitchChance: options.glitchChance || 0.08
                        });
                        
                        // Allow re-decoding after animation completes
                        setTimeout(() => {
                            isDecoding = false;
                        }, options.totalDuration || 1000);
                    }, options.delay || 0);
                } else if (!entry.isIntersecting && !isDecoding) {
                    // Element is off screen - revert to binary
                    element.textContent = textToBinary(originalText);
                    element.className = element.className.replace(' matrix-decoding', '').replace(' matrix-decoded', '');
                }
            });
        }, { threshold: options.threshold || 0.4 });
        
        observer.observe(element);
    }
    
    // Get all text elements and sort by vertical position for smooth top-to-bottom flow
    const allTextElements = [];
    
    // Collect all text elements with their positions
    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const paragraphs = document.querySelectorAll('p');
    const buttonElements = document.querySelectorAll('button, .btn, a');
    const stepNumbers = document.querySelectorAll('.step-number');
    const otherElements = document.querySelectorAll('span, div, li, td, th');
    
    // Add headers
    headers.forEach(element => {
        if (element.textContent.trim() && !element.classList.contains('typing-text')) {
            allTextElements.push({
                element,
                y: element.getBoundingClientRect().top + window.scrollY,
                type: 'header'
            });
        }
    });
    
    // Add paragraphs
    paragraphs.forEach(element => {
        if (element.textContent.trim() && !element.closest('.typing-text')) {
            allTextElements.push({
                element,
                y: element.getBoundingClientRect().top + window.scrollY,
                type: 'paragraph'
            });
        }
    });
    
    // Add buttons (only spans inside them or the button itself if no span)
    buttonElements.forEach(button => {
        const span = button.querySelector('span');
        const targetElement = span || button;
        if (targetElement.textContent.trim() && !targetElement.closest('.typing-text')) {
            allTextElements.push({
                element: targetElement,
                y: button.getBoundingClientRect().top + window.scrollY,
                type: 'button'
            });
        }
    });
    
    // Add step numbers
    stepNumbers.forEach(element => {
        if (element.textContent.trim()) {
            allTextElements.push({
                element,
                y: element.getBoundingClientRect().top + window.scrollY,
                type: 'step'
            });
        }
    });
    
    // Add other elements with direct text content
    otherElements.forEach(element => {
        if (element.textContent.trim() && element.children.length === 0 && !element.closest('.typing-text')) {
            allTextElements.push({
                element,
                y: element.getBoundingClientRect().top + window.scrollY,
                type: 'other'
            });
        }
    });
    
    // Sort by vertical position for smooth top-to-bottom animation
    allTextElements.sort((a, b) => a.y - b.y);
    
    // Apply matrix effects with coordinated delays for smooth wave effect
    allTextElements.forEach((item, index) => {
        const baseDelay = index * 80; // Smooth cascade delay
        
        const options = {
            delay: baseDelay,
            threshold: 0.5
        };
        
        // Customize options based on element type
        switch (item.type) {
            case 'header':
                options.binaryDuration = 500;
                options.decodeSpeed = 20;
                options.glitchChance = 0.06;
                options.totalDuration = 900;
                break;
            case 'paragraph':
                options.binaryDuration = 600;
                options.decodeSpeed = 25;
                options.glitchChance = 0.08;
                options.totalDuration = 1000;
                break;
            case 'button':
                options.binaryDuration = 400;
                options.decodeSpeed = 18;
                options.glitchChance = 0.12;
                options.totalDuration = 700;
                break;
            case 'step':
                options.binaryDuration = 350;
                options.decodeSpeed = 15;
                options.glitchChance = 0.15;
                options.totalDuration = 600;
                break;
            default:
                options.binaryDuration = 550;
                options.decodeSpeed = 22;
                options.glitchChance = 0.08;
                options.totalDuration = 850;
        }
        
        applyMatrixEffect(item.element, options);
    });
    
    // Button text matrix effect on hover
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        const originalText = button.querySelector('span').textContent;
        let isDecoding = false;
        
        button.addEventListener('mouseenter', () => {
            if (!isDecoding) {
                isDecoding = true;
                const span = button.querySelector('span');
                matrixTextDecode(span, originalText, {
                    binaryDuration: 300,
                    decodeSpeed: 30,
                    glitchChance: 0.2
                });
                
                setTimeout(() => {
                    isDecoding = false;
                }, 1000);
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    advancedLogoEffects();
    createParticleSystem();
    handleTouchDevice();
    initializeMatrixEffects();
    
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