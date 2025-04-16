// Animated gradient background
class AnimatedGradient {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas properties
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-2';
        this.canvas.style.opacity = '0.8'; // Semi-transparent to allow particles to be seen
        
        // Append canvas to body
        document.body.appendChild(this.canvas);
        
        // Set canvas dimensions
        this.resizeCanvas();
        
        // Colors for the gradient (tech-inspired blues and purples)
        this.colors = [
            { r: 10, g: 10, b: 26 },      // Dark blue
            { r: 65, g: 88, b: 208 },      // Blue
            { r: 138, g: 43, b: 226 },     // Purple
            { r: 100, g: 255, b: 218 },    // Teal
            { r: 10, g: 10, b: 26 }        // Dark blue (repeat for smooth transition)
        ];
        
        // Gradient positions
        this.positions = [
            { x: 0, y: 0 },
            { x: this.canvas.width, y: 0 },
            { x: this.canvas.width, y: this.canvas.height },
            { x: 0, y: this.canvas.height }
        ];
        
        // Animation properties
        this.currentColorIndex = 0;
        this.nextColorIndex = 1;
        this.transitionProgress = 0;
        this.transitionSpeed = 0.002; // Lower value = slower transition
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start animation
        this.animate();
    }
    
    // Resize canvas to fit window
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    // Setup event listeners
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            // Update positions after resize
            this.positions = [
                { x: 0, y: 0 },
                { x: this.canvas.width, y: 0 },
                { x: this.canvas.width, y: this.canvas.height },
                { x: 0, y: this.canvas.height }
            ];
        });
    }
    
    // Interpolate between two colors
    interpolateColor(color1, color2, factor) {
        return {
            r: Math.round(color1.r + factor * (color2.r - color1.r)),
            g: Math.round(color1.g + factor * (color2.g - color1.g)),
            b: Math.round(color1.b + factor * (color2.b - color1.b))
        };
    }
    
    // Draw gradient
    drawGradient() {
        // Create gradient
        const gradient = this.ctx.createLinearGradient(
            this.canvas.width * 0.5, 0, 
            this.canvas.width * 0.5, this.canvas.height
        );
        
        // Get current and next color
        const currentColor = this.colors[this.currentColorIndex];
        const nextColor = this.colors[this.nextColorIndex];
        
        // Interpolate colors for smooth transition
        const interpolatedColor = this.interpolateColor(currentColor, nextColor, this.transitionProgress);
        
        // Add color stops
        gradient.addColorStop(0, `rgb(${interpolatedColor.r}, ${interpolatedColor.g}, ${interpolatedColor.b})`);
        gradient.addColorStop(1, `rgb(${Math.round(interpolatedColor.r * 0.3)}, ${Math.round(interpolatedColor.g * 0.3)}, ${Math.round(interpolatedColor.b * 0.5)})`);
        
        // Fill background
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Add subtle noise overlay for texture
        this.addNoiseOverlay();
    }
    
    // Add noise overlay for texture
    addNoiseOverlay() {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            // Add very subtle noise (adjust the 5 value to control noise intensity)
            const noise = Math.random() * 5 - 2.5;
            data[i] = Math.min(255, Math.max(0, data[i] + noise));     // R
            data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise)); // G
            data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise)); // B
        }
        
        this.ctx.putImageData(imageData, 0, 0);
    }
    
    // Update colors and transition
    update() {
        // Update transition progress
        this.transitionProgress += this.transitionSpeed;
        
        // When transition is complete, move to next color
        if (this.transitionProgress >= 1) {
            this.currentColorIndex = this.nextColorIndex;
            this.nextColorIndex = (this.nextColorIndex + 1) % this.colors.length;
            this.transitionProgress = 0;
        }
    }
    
    // Animation loop
    animate() {
        this.update();
        this.drawGradient();
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Initialize animated gradient when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimatedGradient();
});