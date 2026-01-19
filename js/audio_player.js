(function() {
    // Ensure CONFIG is available
    if (typeof CONFIG === 'undefined' || !CONFIG.audioOverview || !CONFIG.audioOverview.url) {
        console.warn('Audio configuration not found');
        return;
    }

    const audioUrl = CONFIG.audioOverview.url;

    // Create audio element
    const audio = document.createElement('audio');
    audio.id = 'bg-music';
    audio.src = audioUrl;
    audio.preload = 'auto';
    document.body.appendChild(audio);

    // Create UI Container
    const container = document.createElement('div');
    container.id = 'audio-controls';

    // Inline styles for the container
    Object.assign(container.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '10000',
        backgroundColor: 'rgba(40, 42, 54, 0.9)', // Dracula bg with transparency
        border: '1px solid #6272a4', // Dracula comment
        borderRadius: '25px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
        color: '#f8f8f2', // Dracula fg
        fontFamily: "'Fira Code', 'Space Grotesk', monospace, sans-serif",
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        userSelect: 'none',
        backdropFilter: 'blur(5px)'
    });

    // Hover effect
    container.addEventListener('mouseenter', () => {
        container.style.backgroundColor = 'rgba(68, 71, 90, 0.95)'; // Dracula current line
        container.style.transform = 'translateY(-2px)';
        container.style.boxShadow = '0 6px 8px rgba(0,0,0,0.4)';
    });

    container.addEventListener('mouseleave', () => {
        container.style.backgroundColor = 'rgba(40, 42, 54, 0.9)';
        container.style.transform = 'translateY(0)';
        container.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
    });

    // Icon
    const icon = document.createElement('span');
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>'; // Play icon
    icon.style.display = 'flex';
    icon.style.alignItems = 'center';

    // Text
    const text = document.createElement('span');
    text.innerText = 'Play Overview';

    container.appendChild(icon);
    container.appendChild(text);
    document.body.appendChild(container);

    let isPlaying = false;

    function setPlayingState(playing) {
        isPlaying = playing;
        if (playing) {
            // Pause icon
            icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
            text.innerText = 'Pause Overview';
            container.style.borderColor = '#50fa7b'; // Dracula Green
            icon.style.color = '#50fa7b';
        } else {
            // Play icon
            icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
            text.innerText = 'Play Overview';
            container.style.borderColor = '#6272a4';
            icon.style.color = '#f8f8f2';
        }
    }

    function togglePlay(e) {
        e.stopPropagation(); // Prevent event bubbling if necessary
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(e => {
                console.error("Audio play failed:", e);
                // Optionally show a tooltip or toast?
            });
        }
    }

    container.addEventListener('click', togglePlay);

    // Sync state with audio events (in case controlled externally or finished)
    audio.addEventListener('play', () => setPlayingState(true));
    audio.addEventListener('pause', () => setPlayingState(false));
    audio.addEventListener('ended', () => setPlayingState(false));

    // Attempt Autoplay
    // Note: Most browsers will block this without user interaction.
    // However, we make a best effort.
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            console.log("Autoplay started successfully");
        }).catch(error => {
            console.log("Autoplay prevented by browser policy");
            // UI is already in "Play" state, which is correct.
        });
    }

})();
