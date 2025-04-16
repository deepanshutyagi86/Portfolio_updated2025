// AR element for portfolio
class ARElement {
    constructor() {
        // AR viewer elements
        this.arViewer = document.getElementById('ar-viewer');
        this.arContainer = document.getElementById('ar-container');
        this.closeButton = document.getElementById('close-ar');
        
        // AR projects data
        this.arProjects = [
            {
                name: "AR Holiday Magic",
                description: "Snapchat lens project",
                modelType: "3d-cube" // Placeholder for actual AR model
            },
            {
                name: "AR Tech Concept",
                description: "Runner-up in DROID 7.0 entrepreneurship competition",
                modelType: "3d-sphere" // Placeholder for actual AR model
            }
        ];
        
        // Create AR entry point in the UI
        this.createAREntryPoints();
        
        // Setup event listeners
        this.setupEventListeners();
    }
    
    // Create AR entry points in the UI
    createAREntryPoints() {
        // Create AR section in the projects area
        const projectsSection = document.getElementById('projects');
        if (!projectsSection) return;
        
        // Create AR section title
        const arSectionTitle = document.createElement('h2');
        arSectionTitle.textContent = 'AR Experiences';
        arSectionTitle.className = 'section-title';
        
        // Create AR projects container
        const arProjectsContainer = document.createElement('div');
        arProjectsContainer.className = 'ar-projects-container';
        
        // Add AR projects
        this.arProjects.forEach((project, index) => {
            const arProjectCard = document.createElement('div');
            arProjectCard.className = 'ar-project-card';
            arProjectCard.dataset.projectIndex = index;
            
            // Project content
            arProjectCard.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <button class="ar-launch-btn">Experience in AR</button>
            `;
            
            arProjectsContainer.appendChild(arProjectCard);
        });
        
        // Append to projects section
        projectsSection.appendChild(arSectionTitle);
        projectsSection.appendChild(arProjectsContainer);
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Event delegation for AR launch buttons
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('ar-launch-btn')) {
                const projectCard = event.target.closest('.ar-project-card');
                if (projectCard) {
                    const projectIndex = parseInt(projectCard.dataset.projectIndex);
                    this.launchARExperience(projectIndex);
                }
            }
        });
        
        // Close AR viewer
        this.closeButton.addEventListener('click', () => {
            this.closeARViewer();
        });
        
        // Escape key to close AR viewer
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !this.arViewer.classList.contains('hidden')) {
                this.closeARViewer();
            }
        });
    }
    
    // Launch AR experience
    launchARExperience(projectIndex) {
        const project = this.arProjects[projectIndex];
        if (!project) return;
        
        // Show AR viewer
        this.arViewer.classList.remove('hidden');
        
        // Create AR content based on project type
        this.createARContent(project);
        
        // Prevent page scrolling when AR viewer is open
        document.body.style.overflow = 'hidden';
    }
    
    // Create AR content
    createARContent(project) {
        // Clear previous content
        this.arContainer.innerHTML = '';
        
        // Project title
        const title = document.createElement('h2');
        title.textContent = project.name;
        title.className = 'ar-title';
        this.arContainer.appendChild(title);
        
        // Create AR scene using Three.js as a placeholder
        // In a real implementation, you would use AR.js, 8th Wall, or other AR libraries
        this.createPlaceholderARScene(project.modelType);
        
        // Add instructions
        const instructions = document.createElement('div');
        instructions.className = 'ar-instructions';
        instructions.innerHTML = `
            <p>This is a simplified AR demonstration.</p>
            <p>In a real implementation, you would use your Snapchat AR experience or a WebAR framework.</p>
            <p>Interact with the 3D object below as a placeholder for AR content.</p>
        `;
        this.arContainer.appendChild(instructions);
    }
    
    // Create placeholder AR scene with Three.js
    createPlaceholderARScene(modelType) {
        // Create scene container
        const sceneContainer = document.createElement('div');
        sceneContainer.className = 'ar-scene-container';
        sceneContainer.style.width = '100%';
        sceneContainer.style.height = '60vh';
        this.arContainer.appendChild(sceneContainer);
        
        // Create Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
        renderer.setClearColor(0x000000, 0);
        sceneContainer.appendChild(renderer.domElement);
        
        // Create geometry based on model type
        let geometry, material, mesh;
        
        if (modelType === '3d-cube') {
            geometry = new THREE.BoxGeometry(1, 1, 1);
            material = new THREE.MeshPhongMaterial({ 
                color: 0x64ffda,
                specular: 0x050505,
                shininess: 100
            });
        } else if (modelType === '3d-sphere') {
            geometry = new THREE.SphereGeometry(0.7, 32, 32);
            material = new THREE.MeshPhongMaterial({ 
                color: 0x4158D0,
                specular: 0x050505,
                shininess: 100
            });
        } else {
            // Default to torus
            geometry = new THREE.TorusGeometry(0.7, 0.3, 16, 100);
            material = new THREE.MeshPhongMaterial({ 
                color: 0xFF7849,
                specular: 0x050505,
                shininess: 100
            });
        }
        
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);
        
        camera.position.z = 2.5;
        
        // Handle mouse interaction
        let isDragging = false;
        let previousMousePosition = {
            x: 0,
            y: 0
        };
        
        renderer.domElement.addEventListener('mousedown', (event) => {
            isDragging = true;
        });
        
        renderer.domElement.addEventListener('mousemove', (event) => {
            const deltaMove = {
                x: event.offsetX - previousMousePosition.x,
                y: event.offsetY - previousMousePosition.y
            };
            
            if (isDragging) {
                mesh.rotation.y += deltaMove.x * 0.01;
                mesh.rotation.x += deltaMove.y * 0.01;
            }
            
            previousMousePosition = {
                x: event.offsetX,
                y: event.offsetY
            };
        });
        
        renderer.domElement.addEventListener('mouseup', (event) => {
            isDragging = false;
        });
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            if (!isDragging) {
                mesh.rotation.y += 0.005;
            }
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (this.arViewer.classList.contains('hidden')) return;
            
            camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
        });
    }
    
    // Close AR viewer
    closeARViewer() {
        this.arViewer.classList.add('hidden');
        this.arContainer.innerHTML = '';
        document.body.style.overflow = 'auto';
    }
}

// Initialize AR element when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new ARElement();
    }, 300); // Small delay to ensure other elements are loaded
});