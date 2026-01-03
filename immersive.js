document.addEventListener('DOMContentLoaded', () => {
    initModeSelection();
});

function initModeSelection() {
    // Create Popup HTML
    const popupHtml = `
    <div id="mode-popup">
        <div class="mode-content">
            <h2>Select Interface</h2>
            <button id="btn-terminal" class="mode-btn btn-terminal">Terminal (Recommended for Developers)</button>
            <button id="btn-immersive" class="mode-btn btn-immersive">UI View (Modern & Expressive)</button>
        </div>
    </div>
    `;

    // Append to body
    document.body.insertAdjacentHTML('beforeend', popupHtml);

    // Create Immersive View Container
    const immersiveContainer = document.createElement('div');
    immersiveContainer.id = 'immersive-view';
    document.body.appendChild(immersiveContainer);

    // Event Listeners
    document.getElementById('btn-terminal').addEventListener('click', () => {
        document.getElementById('mode-popup').style.display = 'none';
        // Focus on terminal input
        const cmdInput = document.getElementById('command');
        if (cmdInput) cmdInput.focus();
    });

    document.getElementById('btn-immersive').addEventListener('click', () => {
        document.getElementById('mode-popup').style.display = 'none';
        switchToImmersive();
    });
}

function switchToImmersive() {
    document.body.classList.add('immersive-mode');
    buildImmersiveUI();
}

function buildImmersiveUI() {
    const container = document.getElementById('immersive-view');
    if (container.innerHTML.trim() !== '') return; // Already built

    // Navigation
    const nav = `
    <nav class="immersive-nav">
        <div class="logo">WinterSoldier13</div>
        <ul>
            <li><a href="#imm-about">About</a></li>
            <li><a href="#imm-experience">Experience</a></li>
            <li><a href="#imm-projects">Projects</a></li>
            <li><a href="#imm-skills">Skills</a></li>
            <li><a href="#imm-contact">Contact</a></li>
        </ul>
    </nav>
    `;
    container.insertAdjacentHTML('beforeend', nav);

    // Helper to create sections
    const createSection = (id, title, contentFunc) => {
        const section = document.createElement('section');
        section.id = `imm-${id}`;
        section.className = 'immersive-section';
        section.innerHTML = `<h2>${title}</h2>`;
        const content = contentFunc();
        section.appendChild(content);
        return section;
    };

    // About Section
    container.appendChild(createSection('about', 'About Me', () => {
        const div = document.createElement('div');
        div.className = 'md-card';
        const src = document.querySelector('#about > div');
        if (src) {
            div.innerHTML = src.innerHTML;
        }
        return div;
    }));

    // Experience Section
    container.appendChild(createSection('experience', 'Experience', () => {
        const wrapper = document.createElement('div');
        // Parse experience structure
        const src = document.querySelector('#experience > div');
        if (src) {
            // The structure seems to be multiple ULs, each representing a job
            const jobs = src.querySelectorAll('ul');
            jobs.forEach(jobUl => {
                // Check if it's a top-level job UL (direct children of #experience > div are usually ULs)
                if (jobUl.parentElement === src) {
                     const card = document.createElement('div');
                     card.className = 'md-card';
                     card.innerHTML = jobUl.innerHTML;
                     wrapper.appendChild(card);
                }
            });
        }
        return wrapper;
    }));

    // Projects Section
    container.appendChild(createSection('projects', 'Projects', () => {
        const wrapper = document.createElement('div');
        const src = document.querySelector('#projects > div > ul'); // The main UL
        if (src) {
            const projects = src.querySelectorAll('li.proj_name');
            projects.forEach(projLi => {
                const card = document.createElement('div');
                card.className = 'md-card';

                // The structure inside li.proj_name is specific
                // It contains text, links, and then a nested UL for details
                // We need to carefully clone it or restructure it.
                // Cloning the LI content directly might retain the nested list structure which is fine.
                card.innerHTML = projLi.innerHTML;
                wrapper.appendChild(card);
            });
        }
        return wrapper;
    }));

     // Education Section
     container.appendChild(createSection('education', 'Education', () => {
        const div = document.createElement('div');
        div.className = 'md-card';
        const src = document.querySelector('#education > div');
        if (src) {
            div.innerHTML = src.innerHTML;
        }
        return div;
    }));

    // Skills Section
    container.appendChild(createSection('skills', 'Skills', () => {
        const div = document.createElement('div');
        div.className = 'md-card';
        const src = document.querySelector('#skills > div');
        if (src) {
            // Maybe try to make chips?
            // The current HTML is UL > LI with bold text.
            div.innerHTML = src.innerHTML;
        }
        return div;
    }));

    // Achievements Section
     container.appendChild(createSection('achievements', 'Achievements', () => {
        const div = document.createElement('div');
        div.className = 'md-card';
        const src = document.querySelector('#achievements');
        if (src) {
            // It's a pre tag in the original
             div.innerHTML = src.innerHTML;
        }
        return div;
    }));


    // Contact Section
    container.appendChild(createSection('contact', 'Contact', () => {
        const div = document.createElement('div');
        div.className = 'md-card';
        const src = document.querySelector('#contact');
        if (src) {
            div.innerHTML = src.innerHTML;
        }
        return div;
    }));
}
