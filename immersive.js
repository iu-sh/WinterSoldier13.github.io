
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

    // HTML Template for the Immersive Interface
    const IMPRESSIVE_HTML = `
    <!-- Mode Selection Popup -->
    <div id="mode-popup">
        <div class="popup-content">
            <h2>Select Interface Mode</h2>
            <div class="mode-buttons">
                <button class="mode-btn" onclick="selectMode('terminal')">Terminal Mode</button>
                <button class="mode-btn" onclick="selectMode('immersive')">Immersive Mode (3D)</button>
            </div>
        </div>
    </div>

    <!-- Immersive 3D View -->
    <div id="immersive-view">
        <div id="scene-container">
            <div class="bg-grid"></div>
            <div class="bg-grid ceiling"></div>
            <div id="world">

                <!-- Main Tutorial Screen -->
                <div id="screen-tutorial" class="screen">
                    <div class="screen-header">
                        <span>SYSTEM // MAIN_MENU</span>
                        <span>STATUS: ONLINE</span>
                    </div>
                    <div class="screen-content">
                        <h3>WELCOME TO THE MAINFRAME</h3>
                        <p>You have accessed the immersive interface.</p>
                        <br>
                        <h4>NAVIGATION INSTRUCTIONS:</h4>
                        <ul>
                            <li><strong>LOOK AROUND:</strong> Click and drag your mouse (or touch and drag) to rotate the view.</li>
                            <li><strong>SELECT SECTION:</strong> Click on any screen to ZOOM IN and access its data.</li>
                            <li><strong>RETURN:</strong> Right-click anywhere (or use on-screen back button) to ZOOM OUT.</li>
                        </ul>
                        <br>
                        <p style="color: yellow; text-align: center;">-- SELECT A SCREEN TO BEGIN --</p>
                    </div>
                </div>

                <!-- About Screen -->
                <div id="screen-about" class="screen">
                    <div class="screen-overlay">
                        <div class="screen-title-big">ABOUT</div>
                    </div>
                    <div class="screen-header">
                        <span>FILE // ABOUT_ME</span>
                        <span>[ENCRYPTED]</span>
                    </div>
                    <div class="screen-content">
                        <!-- Content will be injected from #about -->
                    </div>
                </div>

                <!-- Projects Screen -->
                <div id="screen-projects" class="screen">
                    <div class="screen-overlay">
                        <div class="screen-title-big">PROJECTS</div>
                    </div>
                    <div class="screen-header">
                        <span>FILE // PROJECTS</span>
                        <span>[CLASSIFIED]</span>
                    </div>
                    <div class="screen-content">
                        <!-- Content will be injected from #projects -->
                    </div>
                </div>

                <!-- Experience Screen -->
                <div id="screen-experience" class="screen">
                    <div class="screen-overlay">
                        <div class="screen-title-big">EXPERIENCE</div>
                    </div>
                    <div class="screen-header">
                        <span>FILE // WORK_LOG</span>
                        <span>[RESTRICTED]</span>
                    </div>
                    <div class="screen-content">
                        <!-- Content will be injected from #experience -->
                    </div>
                </div>

                <!-- Skills Screen -->
                <div id="screen-skills" class="screen">
                    <div class="screen-overlay">
                        <div class="screen-title-big">SKILLS</div>
                    </div>
                    <div class="screen-header">
                        <span>FILE // ABILITIES</span>
                        <span>[LOADING...]</span>
                    </div>
                    <div class="screen-content">
                        <!-- Content will be injected from #skills -->
                    </div>
                </div>

                <!-- Education Screen -->
                <div id="screen-education" class="screen">
                    <div class="screen-overlay">
                        <div class="screen-title-big">EDUCATION</div>
                    </div>
                    <div class="screen-header">
                        <span>FILE // ACADEMICS</span>
                        <span>[VERIFIED]</span>
                    </div>
                    <div class="screen-content">
                        <!-- Content will be injected from #education -->
                    </div>
                </div>

                <!-- Contact Screen -->
                <div id="screen-contact" class="screen">
                    <div class="screen-overlay">
                        <div class="screen-title-big">CONTACT</div>
                    </div>
                    <div class="screen-header">
                        <span>FILE // COMMS</span>
                        <span>[OPEN]</span>
                    </div>
                    <div class="screen-content">
                        <!-- Content will be injected from #contact -->
                    </div>
                </div>

                 <!-- Achievements Screen -->
                 <div id="screen-achievements" class="screen">
                    <div class="screen-overlay">
                        <div class="screen-title-big">AWARDS</div>
                    </div>
                    <div class="screen-header">
                        <span>FILE // MEDALS</span>
                        <span>[HONORS]</span>
                    </div>
                    <div class="screen-content">
                        <!-- Content will be injected from #achievements -->
                    </div>
                </div>

            </div>
        </div>
    </div>
    `;

    document.addEventListener("DOMContentLoaded", () => {
        injectInterface();

        // Show popup
        showPopup();

        setupInteractions();
        animate();
    });

    function injectInterface() {
        const container = document.createElement('div');
        container.innerHTML = IMPRESSIVE_HTML;
        document.body.prepend(container);
    }

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
            if (terminalView) terminalView.style.display = 'block';
            if (immersiveView) immersiveView.style.display = 'none';

            // Resume.js logic is already running, just ensuring focus
            if (window.jQuery && window.jQuery("#command")) {
                window.jQuery("#command").focus();
            }
        } else {
            if (terminalView) terminalView.style.display = 'none';
            if (immersiveView) immersiveView.style.display = 'block';

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
        // Need to wait for injection
        setTimeout(() => {
            const immersiveView = document.getElementById('immersive-view');
            if (!immersiveView) return;

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
        }, 100);
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
        const world = document.getElementById('world');
        const radius = window.innerWidth < 768 ? MOBILE_SCREEN_RADIUS : SCREEN_RADIUS;

        // Reset X rotation to look straight
        targetRotationX = 0;
        currentRotationX = 0;

        // Set Y rotation to face screen
        targetRotationY = angle;
        currentRotationY = angle;

        // Translate world forward to bring screen close
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

        // Reset World Transform
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
