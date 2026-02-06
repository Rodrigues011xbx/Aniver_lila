// ========================================
// SMOOTH SCROLL & INTERSECTION OBSERVER
// ========================================

// Intersection Observer for scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => {
    observer.observe(element);
});

// ========================================
// CONFETTI ANIMATION
// ========================================

class Confetti {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = 150;
        const colors = ['#FFE5EC', '#E0BBE4', '#FFD89B', '#FFF8F0', '#A57BB3', '#7B4B8A'];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - this.canvas.height,
                r: Math.random() * 6 + 4,
                d: Math.random() * particleCount,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.random() * 10 - 10,
                tiltAngleIncremental: Math.random() * 0.07 + 0.05,
                tiltAngle: 0
            });
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((p, index) => {
            this.ctx.beginPath();
            this.ctx.lineWidth = p.r / 2;
            this.ctx.strokeStyle = p.color;
            this.ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
            this.ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
            this.ctx.stroke();
            
            // Update particle position
            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
            p.tilt = Math.sin(p.tiltAngle - index / 3) * 15;
            
            // Remove particles that have fallen off screen
            if (p.y > this.canvas.height) {
                this.particles.splice(index, 1);
            }
        });
        
        if (this.particles.length > 0) {
            this.animationId = requestAnimationFrame(() => this.draw());
        } else {
            this.stop();
        }
    }
    
    start() {
        this.particles = [];
        this.createParticles();
        this.draw();
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Initialize confetti
const confettiCanvas = document.getElementById('confetti-canvas');
const confetti = new Confetti(confettiCanvas);

// ========================================
// SURPRISE BUTTON FUNCTIONALITY
// ========================================

const surpriseBtn = document.getElementById('surpriseBtn');
const hiddenMessage = document.getElementById('hiddenMessage');
let hasClickedSurprise = false;

surpriseBtn.addEventListener('click', () => {
    if (!hasClickedSurprise) {
        // Show hidden message
        hiddenMessage.classList.add('show');
        
        // Start confetti animation
        confetti.start();
        
        // Change button text
        surpriseBtn.querySelector('.button-text').textContent = 'Thank you! 💖';
        
        // Mark as clicked
        hasClickedSurprise = true;
        
        // Stop confetti after 5 seconds
        setTimeout(() => {
            confetti.stop();
        }, 5000);
    } else {
        // Trigger confetti again on subsequent clicks
        confetti.start();
        setTimeout(() => {
            confetti.stop();
        }, 3000);
    }
});

// ========================================
// GALLERY IMAGE INTERACTION (OPTIONAL)
// ========================================

// Add click interaction for gallery items
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Add a subtle scale animation on click
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = '';
        }, 200);
        
        // You can add more functionality here, such as:
        // - Opening a modal with the full image
        // - Adding a lightbox effect
        // - Showing image details
    });
});

// ========================================
// SCROLL TO TOP FUNCTIONALITY (OPTIONAL)
// ========================================

// Smooth scroll to hero section when clicking logo or title
document.addEventListener('DOMContentLoaded', () => {
    console.log('Birthday website loaded successfully! 🎉');
    
    // Initial animation trigger for hero section
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroTitle) heroTitle.style.opacity = '1';
        if (heroSubtitle) heroSubtitle.style.opacity = '1';
    }, 100);
});

// ========================================
// CUSTOMIZATION NOTES
// ========================================

/*
HOW TO CUSTOMIZE THIS WEBSITE:

1. CHANGE TEXT CONTENT:
   - Open index.html
   - Look for comments marked with "CUSTOMIZE:"
   - Replace placeholder text with your personal messages

2. ADD YOUR PHOTOS:
   - Replace the placeholder gallery items in index.html
   - Change the style="background: ..." to:
     style="background-image: url('your-photo.jpg'); background-size: cover;"
   - Or upload photos to a folder and link them

3. MODIFY COLORS:
   - Open style.css
   - Search for color values like #FFE5EC, #E0BBE4, #FFD89B
   - Replace with your preferred color palette

4. ADJUST TIMELINE:
   - In index.html, find the timeline section
   - Add, remove, or modify timeline items
   - Each item has an icon, title, and description

5. CHANGE ANIMATIONS:
   - Modify transition durations in style.css
   - Adjust animation timing in script.js
   - Change confetti colors in the confetti class

6. ADD MORE SECTIONS:
   - Copy an existing section structure from index.html
   - Add corresponding styles in style.css
   - Don't forget to add the fade-in class for scroll animations

ENJOY CUSTOMIZING! 💖
*/

