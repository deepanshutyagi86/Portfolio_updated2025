// Particle system for background
class Particle {
    constructor(canvas, ctx, options = {}) {
        this.canvas = canvas;
        this.ctx = ctx;
        
        // Set particle properties
        this.x = options.x || Math.random() * canvas.width;
        this.y = options.y || Math.random() * canvas.height;
        this.size = options.size || Math.random() * 3 + 1;
        this.speedX = options.speedX || (Math.random() - 0.5) * 0.5;
        this.speedY = options.speedY || (Math.random() - 0.5) * 0.5;
        
        // Colors that represent your skills
        this.colors = [
            '#64ffda', // Teal - Python
            '#4158D0', // Blue - React
            '#8A2BE2', // Purple - ML
            '#FF7849', // Orange - Flutter
            '#FF4B91'  // Pink - Video Editing
        ];
        
        this.color = options.color || this.colors[Math.floor(Math.random() * this.colors.length)];
        
        // Connection properties
        this.connections = [];
        this.connectionDistance = 150;
    }
    
    // Update particle position
    update(mouseX, mouseY) {
        // Move particle
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Mouse influence: particles are attracted to the mouse
        if (mouseX && mouseY) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                this.speedX += dx * 0.001;
                this.speedY += dy * 0.001;
            }
        }
        
        // Boundary checking
        if (this.x > this.canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        
        if (this.y > this.canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
        
        // Apply some friction to prevent infinite acceleration
        this.speedX *= 0.99;
        this.speedY *= 0.99;
    }
    
    // Draw the particle
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    
    // Connect particles that are close to each other
    connectParticles(particles) {
        this.connections = [];
        
        for (const particle of particles) {
            if (this === particle) continue;
            
            const dx = this.x - particle.x;
            const dy = this.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.connectionDistance) {
                this.connections.push({
                    particle,
                    distance
                });
            }
        }
    }
    
    // Draw connections
    drawConnections() {
        for (const connection of this.connections) {
            const opacity = 1 - (connection.distance / this.connectionDistance);
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(${this.color.replace(/^#/, '').match(/.{2}/g).map(x => parseInt(x, 16)).join(',')}, ${opacity})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.moveTo(this.x, this.y);
            this.ctx.lineTo(connection.particle.x, connection.particle.y);
            this.ctx.stroke();
        }
    }
}

// Initialize the particle system
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = null;
        this.mouseY = null;
        this.numParticles = Math.floor((window.innerWidth * window.innerHeight) / 15000); // Adjust based on screen size
        
        this.resizeCanvas();
        this.setupEventListeners();
        this.init();
    }
    
    // Resize canvas to fit the window
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    // Setup event listeners
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.init(); // Reinitialize particles on resize
        });
        
        // Track mouse movement
        window.addEventListener('mousemove', (event) => {
            this.mouseX = event.x;
            this.mouseY = event.y;
        });
        
        // Reset mouse position when mouse leaves the window
        window.addEventListener('mouseout', () => {
            this.mouseX = null;
            this.mouseY = null;
        });
    }
    
    // Initialize particles
    init() {
        this.particles = [];
        
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push(new Particle(this.canvas, this.ctx));
        }
    }
    
    // Animation loop
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (const particle of this.particles) {
            particle.update(this.mouseX, this.mouseY);
            particle.connectParticles(this.particles);
        }
        
        // First draw all connections
        for (const particle of this.particles) {
            particle.drawConnections();
        }
        
        // Then draw particles on top
        for (const particle of this.particles) {
            particle.draw();
        }
        
        requestAnimationFrame(this.animate.bind(this));
    }
    
    // Start the animation
    start() {
        this.animate();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const particleSystem = new ParticleSystem('background-canvas');
    particleSystem.start();
});