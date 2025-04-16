// Three.js setup for 3D elements
class ThreeDElements {
    constructor() {
        // Setup scene, camera, and renderer
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        
        // Set renderer properties
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 0);
        
        // Append the renderer to the DOM
        document.body.appendChild(this.renderer.domElement);
        this.renderer.domElement.style.position = 'fixed';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.zIndex = '0';
        
        // Set camera position
        this.camera.position.z = 5;
        
        // Create objects
        this.objects = [];
        this.createObjects();
        
        // Add lights
        this.addLights();
        
        // Setup scroll and resize event listeners
        this.setupEventListeners();
        
        // Start animation
        this.animate();
    }
    
    // Create 3D objects representing your projects
    createObjects() {
        // Project 1: Tweet Sentiment Analyzer (Sphere)
        const sentimentGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const sentimentMaterial = new THREE.MeshPhongMaterial({
            color: 0x64ffda,
            emissive: 0x0a2e38,
            specular: 0x111111,
            shininess: 30,
            transparent: true,
            opacity: 0.9
        });
        const sentimentSphere = new THREE.Mesh(sentimentGeometry, sentimentMaterial);
        sentimentSphere.position.set(-2, 2, 0);
        sentimentSphere.userData = { name: 'Tweet Sentiment Analyzer' };
        this.scene.add(sentimentSphere);
        this.objects.push(sentimentSphere);
        
        // Project 2: MeetAssist (Torus)
        const meetAssistGeometry = new THREE.TorusGeometry(0.4, 0.2, 16, 100);
        const meetAssistMaterial = new THREE.MeshPhongMaterial({
            color: 0x4158D0,
            emissive: 0x11142b,
            specular: 0x111111,
            shininess: 30,
            transparent: true,
            opacity: 0.9
        });
        const meetAssistTorus = new THREE.Mesh(meetAssistGeometry, meetAssistMaterial);
        meetAssistTorus.position.set(2, 1, 0);
        meetAssistTorus.userData = { name: 'MeetAssist' };
        this.scene.add(meetAssistTorus);
        this.objects.push(meetAssistTorus);
        
        // Project 3: Smart Grocery (Icosahedron)
        const groceryGeometry = new THREE.IcosahedronGeometry(0.5, 0);
        const groceryMaterial = new THREE.MeshPhongMaterial({
            color: 0xFF7849,
            emissive: 0x2a1100,
            specular: 0x111111,
            shininess: 30,
            transparent: true,
            opacity: 0.9
        });
        const groceryIcosahedron = new THREE.Mesh(groceryGeometry, groceryMaterial);
        groceryIcosahedron.position.set(-1.5, -1.5, 0);
        groceryIcosahedron.userData = { name: 'Smart Grocery' };
        this.scene.add(groceryIcosahedron);
        this.objects.push(groceryIcosahedron);
        
        // Project 4: Handwritten Digit Recognition (Octahedron)
        const digitGeometry = new THREE.OctahedronGeometry(0.5, 0);
        const digitMaterial = new THREE.MeshPhongMaterial({
            color: 0x8A2BE2,
            emissive: 0x190a2a,
            specular: 0x111111,
            shininess: 30,
            transparent: true,
            opacity: 0.9
        });
        const digitOctahedron = new THREE.Mesh(digitGeometry, digitMaterial);
        digitOctahedron.position.set(1.5, -1, 0);
        digitOctahedron.userData = { name: 'Digit Recognition' };
        this.scene.add(digitOctahedron);
        this.objects.push(digitOctahedron);
        
        // Project 5: College Election Platform (Dodecahedron)
        const electionGeometry = new THREE.DodecahedronGeometry(0.5, 0);
        const electionMaterial = new THREE.MeshPhongMaterial({
            color: 0xFF4B91,
            emissive: 0x2a0a1a,
            specular: 0x111111,
            shininess: 30,
            transparent: true,
            opacity: 0.9
        });
        const electionDodecahedron = new THREE.Mesh(electionGeometry, electionMaterial);
        electionDodecahedron.position.set(0, 0, -1);
        electionDodecahedron.userData = { name: 'College Election Platform' };
        this.scene.add(electionDodecahedron);
        this.objects.push(electionDodecahedron);
    }
    
    // Add lights to the scene
    addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
        
        // Point lights with different colors
        const pointLight1 = new THREE.PointLight(0x4158D0, 2, 10);
        pointLight1.position.set(2, 2, 2);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x64ffda, 2, 10);
        pointLight2.position.set(-2, -2, -2);
        this.scene.add(pointLight2);
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Handle scroll to adjust object positions
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const scrollFactor = scrollY / 500; // Adjust this value to control scroll sensitivity
            
            // Move objects based on scroll position
            this.objects.forEach((obj, index) => {
                obj.rotation.x = scrollFactor + (index * 0.1);
                obj.rotation.y = scrollFactor + (index * 0.2);
                
                // Add slight position change based on scroll
                obj.position.y = obj.position.y - (scrollFactor * 0.01);
                
                // Reset position if objects go too far out of view
                if (Math.abs(obj.position.y) > 5) {
                    obj.position.y = (obj.position.y > 0) ? 3 : -3;
                }
            });
        });
        
        // Handle mouse movement for interactive rotation
        window.addEventListener('mousemove', (event) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            // Slightly rotate all objects based on mouse position
            this.objects.forEach((obj) => {
                gsap.to(obj.rotation, {
                    x: obj.rotation.x + (mouseY * 0.05),
                    y: obj.rotation.y + (mouseX * 0.05),
                    duration: 0.5
                });
            });
        });
    }
    
    // Animation loop
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Rotate all objects slightly
        this.objects.forEach((obj) => {
            obj.rotation.x += 0.002;
            obj.rotation.y += 0.003;
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize Three.js elements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new ThreeDElements();
    }, 100); // Small delay to ensure canvas is properly set up
});