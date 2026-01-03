
// Immersive Mode Logic

(function() {
    let currentMode = null; // 'terminal' or 'immersive'
    let isZoomed = false;
    let currentRotationY = 0;
    let currentRotationX = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    // Config
    const SENSITIVITY = 0.2;
    const DAMPING = 0.1;
    const SCREEN_RADIUS = 800; // Match CSS
    const MOBILE_SCREEN_RADIUS = 500;

    document.addEventListener("DOMContentLoaded", () => {
        // Check if preference exists (optional, user didn't ask for persistence but it's good UX)
        // For now, always show popup as requested "popup first as soon as the site loads"

        showPopup();

        setupInteractions();
        animate();
    });

    function showPopup() {
        const popup = document.getElementById('mode-popup');
        if (popup) popup.style.display = 'flex';
    }

    window.selectMode = function(mode) {
        currentMode = mode;
        const popup = document.getElementById('mode-popup');
        const terminalView = document.getElementById('terminal-view');
        const immersiveView = document.getElementById('immersive-view');

        popup.style.opacity = '0';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);

        if (mode === 'terminal') {
            terminalView.style.display = 'block';
            immersiveView.style.display = 'none';
            // Resume.js logic is already running, just ensuring focus
            $("#command").focus();
        } else {
            terminalView.style.display = 'none';
            immersiveView.style.display = 'block';

            // Initialize Immersive Mode
            initImmersiveMode();
        }
    };

    function initImmersiveMode() {
        populateScreens();

        // Setup initial view
        updateCamera();
    }

    function populateScreens() {
        // Map of screen IDs to source content IDs
        const mapping = {
            'screen-about': 'about',
            'screen-education': 'education',
            'screen-projects': 'projects',
            'screen-experience': 'experience',
            'screen-skills': 'skills',
            'screen-achievements': 'achievements',
            'screen-contact': 'contact'
            // tutorial is hardcoded or custom
        };

        for (const [screenId, sourceId] of Object.entries(mapping)) {
            const screenContent = document.querySelector(`#${screenId} .screen-content`);
            const source = document.getElementById(sourceId);

            if (screenContent && source) {
                // We clone the source content
                // Note: The source has a wrapper div usually
                screenContent.innerHTML = source.innerHTML;
            }
        }
    }

    function setupInteractions() {
        const immersiveView = document.getElementById('immersive-view');

        // Mouse / Touch Rotation
        immersiveView.addEventListener('mousedown', startDrag);
        immersiveView.addEventListener('touchstart', startDrag);

        window.addEventListener('mousemove', drag);
        window.addEventListener('touchmove', drag);

        window.addEventListener('mouseup', endDrag);
        window.addEventListener('touchend', endDrag);

        // Right click to back
        immersiveView.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (isZoomed) {
                zoomOut();
            }
        });

        // Screen Clicks
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.addEventListener('click', (e) => {
                if (!isDragging && !isZoomed) {
                    zoomIn(screen);
                }
            });
        });
    }

    function startDrag(e) {
        if (isZoomed) return;
        if (e.target.closest('.screen-content')) return; // Allow scrolling text

        isDragging = true;
        startX = e.pageX || e.touches[0].pageX;
        startY = e.pageY || e.touches[0].pageY;
    }

    function drag(e) {
        if (!isDragging || isZoomed) return;

        const x = e.pageX || e.touches[0].pageX;
        const y = e.pageY || e.touches[0].pageY;

        const deltaX = x - startX;
        const deltaY = y - startY;

        targetRotationY += deltaX * SENSITIVITY;
        targetRotationX -= deltaY * SENSITIVITY;

        // Clamp X rotation (vertical look)
        targetRotationX = Math.max(-30, Math.min(30, targetRotationX));

        startX = x;
        startY = y;
    }

    function endDrag() {
        isDragging = false;
    }

    function zoomIn(screen) {
        isZoomed = true;
        document.body.classList.add('zoomed');
        screen.classList.add('active');

        // Calculate rotation needed to face this screen
        // We parse the transform from CSS or calculate based on ID
        // Simplified: use data attributes or known angles

        let angle = 0;
        const id = screen.id;

        switch(id) {
            case 'screen-tutorial': angle = 0; break;
            case 'screen-projects': angle = -45; break;
            case 'screen-skills': angle = -90; break;
            case 'screen-contact': angle = -135; break;
            case 'screen-achievements': angle = -180; break;
            case 'screen-education': angle = 135; break;
            case 'screen-experience': angle = 90; break;
            case 'screen-about': angle = 45; break;
        }

        // Animate World to center this screen
        // We rotate the world opposite to the screen's position
        const world = document.getElementById('world');
        const radius = window.innerWidth < 768 ? MOBILE_SCREEN_RADIUS : SCREEN_RADIUS;

        // Reset X rotation to look straight
        targetRotationX = 0;
        currentRotationX = 0;

        // Set Y rotation to face screen
        targetRotationY = angle;
        currentRotationY = angle;

        // Translate world forward to bring screen close
        // The screen is at Z = radius. We want it at Z = 0 (camera).
        // So we move world Z = -radius + offset (e.g., 200px from camera)

        world.style.transform = `translateZ(${radius - 150}px) rotateX(0deg) rotateY(${angle}deg)`;

        // Hide overlay
        const overlay = screen.querySelector('.screen-overlay');
        if(overlay) overlay.style.opacity = '0';
    }

    function zoomOut() {
        isZoomed = false;
        document.body.classList.remove('zoomed');

        const activeScreen = document.querySelector('.screen.active');
        if (activeScreen) {
            activeScreen.classList.remove('active');
            const overlay = activeScreen.querySelector('.screen-overlay');
            if(overlay) overlay.style.opacity = '1';
        }

        // Reset World Transform (keep current rotation but remove translation)
        const world = document.getElementById('world');
        world.style.transform = `translateZ(0px) rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
    }

    function animate() {
        if (!isZoomed && currentMode === 'immersive') {
            // Smooth interpolation
            currentRotationY += (targetRotationY - currentRotationY) * DAMPING;
            currentRotationX += (targetRotationX - currentRotationX) * DAMPING;

            updateCamera();
        }

        requestAnimationFrame(animate);
    }

    function updateCamera() {
        const world = document.getElementById('world');
        if (world) {
            world.style.transform = `translateZ(0px) rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
        }
    }

})();
