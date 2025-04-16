// Matrix-style code rain effect using your actual code snippets
class CodeRain {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas properties
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.15'; // Very transparent to not distract from content
        
        // Append canvas to body
        document.body.appendChild(this.canvas);
        
        // Set canvas dimensions
        this.resizeCanvas();
        
        // Code snippets from your projects
        this.codeSnippets = [
            // Python (from ML projects)
            "import numpy as np",
            "import pandas as pd",
            "from sklearn.model_selection import train_test_split",
            "X_train, X_test, y_train, y_test = train_test_split(X, y)",
            "model.fit(X_train, y_train)",
            "predictions = model.predict(X_test)",
            "from tensorflow import keras",
            "model = keras.Sequential()",
            "model.add(keras.layers.Dense(128, activation='relu'))",
            "model.compile(optimizer='adam', loss='mse')",
            
            // Flutter (from your mobile apps)
            "class MyApp extends StatelessWidget {",
            "  Widget build(BuildContext context) {",
            "return MaterialApp(",
            "    home: Scaffold(",
            "      appBar: AppBar(",
            "      body: Center(",
            "final FirebaseFirestore firestore = FirebaseFirestore.instance;",
            "await firestore.collection('users').add(data);",
            
            // JavaScript & React (from web projects)
            "function handleSubmit(event) {",
            "  event.preventDefault();",
            "const [data, setData] = useState([]);",
            "useEffect(() => {",
            "  fetchData();",
            "}, []);",
            "return (",
            "  <div className='container'>",
            "    <h1>{title}</h1>",
            
            // Machine Learning concepts
            "def sigmoid(x):",
            "  return 1 / (1 + np.exp(-x))",
            "class NeuralNetwork:",
            "  def __init__(self, input_size, hidden_size, output_size):",
            "def backward_propagation(self):",
            "  self.weights -= learning_rate * gradients"
        ];
        
        // Characters for the effect
        this.chars = '01';
        for (const snippet of this.codeSnippets) {
            this.chars += snippet;
        }
        
        // Font properties
        this.fontSize = 14;
        this.font = `${this.fontSize}px 'Courier New', monospace`;
        
        // Columns for code rain
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        
        // Initialize drops
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = {
                y: Math.random() * -100, // Start above the screen at random positions
                speed: Math.random() * 0.5 + 0.5, // Random speed
                snippetIndex: Math.floor(Math.random() * this.codeSnippets.length),
                charIndex: 0,
                length: Math.floor(Math.random() * 20) + 10 // Random length of drop
            };
        }
        
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
            // Recalculate columns after resize
            this.columns = Math.floor(this.canvas.width / this.fontSize);
            
            // Add or remove drops as needed
            while (this.drops.length < this.columns) {
                this.drops.push({
                    y: Math.random() * -100,
                    speed: Math.random() * 0.5 + 0.5,
                    snippetIndex: Math.floor(Math.random() * this.codeSnippets.length),
                    charIndex: 0,
                    length: Math.floor(Math.random() * 20) + 10
                });
            }
            
            // Trim if needed
            this.drops = this.drops.slice(0, this.columns);
        });
    }
    
    // Draw characters
    draw() {
        // Set background with slight opacity to create trail effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set font
        this.ctx.font = this.font;
        
        // Draw each drop
        for (let i = 0; i < this.columns; i++) {
            const drop = this.drops[i];
            const snippet = this.codeSnippets[drop.snippetIndex];
            
            // Get current character
            let char = snippet[drop.charIndex];
            
            // If we've reached the end of the snippet, get a random character
            if (drop.charIndex >= snippet.length) {
                char = this.chars[Math.floor(Math.random() * this.chars.length)];
            }
            
            // Calculate x position
            const x = i * this.fontSize;
            
            // Draw character with gradient color (head of the drop is brighter)
            const gradient = this.ctx.createLinearGradient(x, drop.y - this.fontSize * drop.length, x, drop.y);
            gradient.addColorStop(0, 'rgba(100, 255, 218, 0)'); // Transparent at the tail
            gradient.addColorStop(0.8, 'rgba(100, 255, 218, 0.5)'); // Medium at the middle
            gradient.addColorStop(1, 'rgba(100, 255, 218, 1)'); // Bright at the head
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillText(char, x, drop.y);
            
            // Move to next character in snippet
            drop.charIndex = (drop.charIndex + 1) % (snippet.length + 10); // Adding 10 random chars at the end
            
            // Move the drop down
            drop.y += drop.speed * this.fontSize;
            
            // If the drop goes off screen, reset it
            if (drop.y > this.canvas.height + this.fontSize * drop.length) {
                drop.y = Math.random() * -100;
                drop.speed = Math.random() * 0.5 + 0.5;
                drop.snippetIndex = Math.floor(Math.random() * this.codeSnippets.length);
                drop.charIndex = 0;
                drop.length = Math.floor(Math.random() * 20) + 10;
            }
        }
    }
    
    // Animation loop
    animate() {
        this.draw();
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Initialize code rain when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new CodeRain();
    }, 200); // Small delay to ensure other elements are loaded
});