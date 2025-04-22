// Main JavaScript file to coordinate all effects and handle general site functionality

document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize scroll animations for content sections
    initScrollAnimations();
    
    // Initialize projects section with interactive elements
    initProjectsSection();
    
    // Initialize typing effect for hero section
    initTypingEffect();


    // Initialize video showcase section
    initVideoShowcaseSection();
    
    // Initialize cursor effects
    initCustomCursor();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize theme switcher
    initThemeSwitcher();
    
    // Initialize page loading animation
    initPageLoadingAnimation();

    optimizeForMobile();

    optimizeForTouchDevices();
});



function optimizeForTouchDevices() {
    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0 || 
                         navigator.msMaxTouchPoints > 0;
    
    if (isTouchDevice) {
        // Add a class to the body for CSS targeting
        document.body.classList.add('touch-device');
        
        // Disable custom cursor on touch devices
        const customCursor = document.querySelector('.custom-cursor');
        const cursorDot = document.querySelector('.cursor-dot');
        
        if (customCursor) customCursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
        
        // Optimize heavy animations
        const backgroundCanvas = document.getElementById('background-canvas');
        if (backgroundCanvas) {
            backgroundCanvas.style.opacity = '0.2';
        }
        
        // Add proper touch event listeners to all interactive elements
        document.querySelectorAll('a, button, .project-card, .timeline-item').forEach(el => {
            el.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, {passive: true});
            
            el.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            }, {passive: true});
        });
        
        // Fix project cards for touch
        document.querySelectorAll('.project-card').forEach(card => {
            const overlay = card.querySelector('.project-overlay');
            if (overlay) {
                // Make overlay visible by default on touch with lower opacity
                overlay.style.opacity = '0.7';
            }
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
                
                // Scroll to target with smooth animation
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations for content sections
function initScrollAnimations() {
    // Define sections to animate
    const sections = document.querySelectorAll('section');
    
    // Create IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate children elements with staggered delay
                const animatedElements = entry.target.querySelectorAll('.animate-on-scroll');
                animatedElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, index * 150); // 150ms delay between each element
                });
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is in view
    });
    
    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add scroll-triggered animations to elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Initialize projects section with interactive elements
function initProjectsSection() {
    // This will be expanded as you add actual project content
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;
    
    // Create project cards for each of your projects
    const projects = [
        {
            title: 'Tweet Sentiment Analyzer',
            description: 'An X Sentiment Analyzer using Python and machine learning to classify posts as positive or negative.',
            technologies: ['Python', 'NLP', 'Logistic Regression', 'Web App'],
            image: 'assets/images/project-images/sentiment.jpg',
            githubLink: 'https://github.com/deepanshutyagi86/sentiment_api.git',
            demoLink: 'https://sentiment-api-v6wr.onrender.com'
        },
        {
            title: 'MeetAssist',
            description: 'A universal AI assistant for video conferencing using Flutter and NLP libraries.',
            technologies: ['Flutter', 'NLP', 'Trello Integration'],
            image: 'assets/images/project-images/meetassist.jpg',
            githubLink: 'https://github.com/deepanshutyagi86/MeetAssistant.git'
        },
        {
            title: 'Smart Grocery',
            description: 'A recipe prediction app using Flutter that suggests dishes based on expiring food ingredients.',
            technologies: ['Flutter', 'Firebase', 'ML'],
            image: 'assets/images/project-images/grocery.jpg',
            githubLink: 'https://github.com/deepanshutyagi86/smart_grocery-app.git'
        },
        {
            title: 'Handwritten Digit Recognition',
            description: 'A custom neural network with TensorFlow to classify MNIST digits, achieving 92% accuracy.',
            technologies: ['TensorFlow', 'Neural Networks', 'Python'],
            image: 'assets/images/project-images/digits.jpg',
            githubLink: 'https://github.com/deepanshutyagi86/digit_recognition.git'
        },
        {
            title: 'College Election Platform',
            description: 'A two-panel platform for college elections using React and Firestore.',
            technologies: ['React', 'Firestore', 'OTP Authentication'],
            image: 'assets/images/project-images/election.jpg',
            githubLink: 'https://github.com/deepanshutyagi86/college_election_platform.git'
        },
        {
            title: 'User Conversion indentification',
            description: 'Conversion Rate Model predicting user behavior & boosting conversions. Built with logistic regression',
            technologies: ['Python', 'Logistic Regression', 'Web App', ],
            image: 'assets/images/project-images/user_conversion.jpg',
            githubLink: 'https://github.com/deepanshutyagi86/user_conversion.git',
            demoLink: 'https://user-conversion-1.onrender.com'
        }
    ];
    
    // Create projects container
    const projectsContainer = document.createElement('div');
    projectsContainer.className = 'projects-container';
    
    // Add projects
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card animate-on-scroll';
        
        // Project content
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image || 'assets/images/placeholder.jpg'}" alt="${project.title}">
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i> View Code
                        </a>
                        ${project.demoLink ? `
                        <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                        ` : ''}
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
    
    // Add projects container to projects section
    projectsSection.appendChild(projectsContainer);
    
    // Add hover effect for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-overlay').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-overlay').style.opacity = '0';
        });
    });
}


// Initialize video showcase section
function initVideoShowcaseSection() {
    const videoSection = document.getElementById('video-showcase');
    if (!videoSection) return;
    
    // Create video items container
    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) return;
    
    // Add video items
    const videos = [
        {
            title: 'Arena Promo',
            description: 'A promotional video with dynamic transitions and professional effects.',
            embedUrl: 'https://drive.google.com/file/d/1DaqEvvu5LuBWBxp4mF6Xvn3Az7RF8osb/preview',
            technologies: ['Adobe Premiere Pro', 'After Effects', 'Color Grading']
        },
        {
            title: 'Cinematic Shoot',
            description: 'A vibrant cinematic shoot with smooth transitions and dynamic lighting.',
            embedUrl: 'https://drive.google.com/file/d/1MUm5l5ms2zmdV_QS1A2AIFkeiGzbt7d6/preview',
            technologies: ['Adobe Premiere Pro', 'Color Correction', 'Sound Design']
        },
        {
            title: 'Reveal Merchandising',
            description: 'College event merch reveal highlights featuring dynamic cuts and engaging motion graphics.',
            embedUrl: 'https://drive.google.com/file/d/1KtK22I-DB117RJHEySx1-yd1bcB_n-Yj/preview',
            technologies: ['Adobe Premiere Pro', 'Motion Graphics', 'Audio Mixing']
        },
        {
            title: 'Rise of the Dragon',
            description: 'A promotional video with dynamic transitions and professional effects',
            embedUrl: 'https://drive.google.com/file/d/1mLnoM6TxhCUNu2j0mAQD2SMtcAOa0B8S/preview',
            technologies: ['Adobe Premiere Pro', 'Motion Graphics', 'Adobe Photoshop']
        }
    ];
    
    // Add video items to container
    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item animate-on-scroll';
        
        videoItem.innerHTML = `
            <div class="video-wrapper">
                <iframe src="${video.embedUrl}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
            </div>
            <div class="video-content">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
                <div class="video-technologies">
                    ${video.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        `;
        
        videoContainer.appendChild(videoItem);
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const typedElement = document.querySelector('.hero h2');
    if (!typedElement) return;
    
    const texts = [
        'ML Enthusiast',
        'Video Editor',
        'C++ & Python Programmer',
        'AI Enthusiast'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typedElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            typedElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal speed when typing
        }
        
        // Move to next text when current is fully typed and then deleted
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at the end of typing
            isDeleting = true;
            typingSpeed = 1000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // Move to next text
            typingSpeed = 500; // Pause before typing next text
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}

// Custom cursor effect
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', (e) => {
        // Large cursor follows with delay
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5
        });
        
        // Small dot follows cursor exactly
        gsap.to(cursorDot, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });
    
    // Grow cursor on hoverable elements
    document.querySelectorAll('a, button, .project-card, .ar-launch-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-grow');
            cursorDot.classList.add('cursor-grow');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-grow');
            cursorDot.classList.remove('cursor-grow');
        });
    });
}

// Mobile menu functionality
// Replace the initMobileMenu function in main.js with this improved version
// Replace your current initMobileMenu function with this one
function initMobileMenu() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    // Create mobile menu button
    let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (!mobileMenuBtn) {
        mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
        nav.appendChild(mobileMenuBtn);
    }
    
    // Create mobile menu
    let mobileMenu = document.querySelector('.mobile-menu');
    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        // Clone nav links
        const navLinks = nav.querySelector('ul').cloneNode(true);
        mobileMenu.appendChild(navLinks);
        
        // Append to body
        document.body.appendChild(mobileMenu);
    }
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}


function optimizeForMobile() {
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768 || 
                    ('ontouchstart' in window) ||
                    (navigator.maxTouchPoints > 0) || 
                    (navigator.msMaxTouchPoints > 0);
    
    if (isMobile) {
        // Disable heavy animations
        
        // 1. Reduce particles count or disable
        const bgCanvas = document.getElementById('background-canvas');
        if (bgCanvas) {
            // Either make it transparent or reduce the number of particles
            bgCanvas.style.opacity = '0.3';
        }
        
        // 2. Disable 3D elements for mobile
        const threejsCanvas = document.querySelector('canvas:not(#background-canvas)');
        if (threejsCanvas) {
            threejsCanvas.style.display = 'none';
        }
        
        // 3. Simplify code rain effect or disable it
        const codeRainCanvas = document.querySelector('canvas[style*="opacity: 0.15"]');
        if (codeRainCanvas) {
            codeRainCanvas.style.display = 'none';
        }
        
        // 4. Simplify gradient effect
        const gradientCanvas = document.querySelector('canvas[style*="z-index: -2"]');
        if (gradientCanvas) {
            gradientCanvas.style.opacity = '0.5';
        }
        
        // 5. Disable custom cursor completely
        const cursor = document.querySelector('.custom-cursor');
        const cursorDot = document.querySelector('.cursor-dot');
        
        if (cursor) cursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
        
        // 6. Reduce animation complexity
        document.documentElement.style.setProperty('--transition-duration', '0.3s');
        
        // 7. Reduce or disable scroll animations for performance
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => {
            el.classList.add('visible');
            el.style.transform = 'none';
            el.style.opacity = '1';
        });
    }
}

// Theme switcher (light/dark mode)
function initThemeSwitcher() {
    // Create theme switcher
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switcher';
    themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
    
    // Append to body
    document.body.appendChild(themeSwitcher);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle theme
    themeSwitcher.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
            themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'dark');
            themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Page loading animation
// Replace or update your initPageLoadingAnimation function in main.js

function initPageLoadingAnimation() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <h2>Deepanshu Tyagi</h2>
            <div class="section-line"></div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    `;
    
    // Append to body
    document.body.appendChild(loadingOverlay);
    
    // Ensure the loading bar is perfectly centered
    const loadingBar = loadingOverlay.querySelector('.loading-bar');
    if (loadingBar) {
        loadingBar.style.margin = '20px auto 0';
        loadingBar.style.left = '0';
        loadingBar.style.right = '0';
    }
    
    // Ensure the section line is centered
    const sectionLine = loadingOverlay.querySelector('.section-line');
    if (sectionLine) {
        sectionLine.style.margin = '0 auto';
        sectionLine.style.left = '0';
        sectionLine.style.right = '0';
    }
    
    // Animate loading progress
    const loadingProgress = loadingOverlay.querySelector('.loading-progress');
    
    gsap.to(loadingProgress, {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut'
    });
    
    // Hide loading overlay when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            gsap.to(loadingOverlay, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loadingOverlay.remove();
                }
            });
        }, 2000);
    });
}