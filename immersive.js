document.addEventListener('DOMContentLoaded', () => {
    initModeSelection();
});

let activeTab = 'home';

function initModeSelection() {
    // Create Popup HTML
    const popupHtml = `
    <div id="mode-popup" class="fixed inset-0 bg-black/95 z-[9999] flex flex-col justify-center items-center font-sans">
        <div class="bg-neutral-900 p-8 rounded-3xl text-center max-w-md w-[90%] border border-white/10 shadow-[0_0_40px_rgba(163,230,53,0.1)]">
            <h2 class="text-3xl font-bold text-white mb-8">Select Interface</h2>
            <button id="btn-terminal" class="w-full py-4 px-6 mb-4 rounded-full border-2 border-[#3ffb57] text-[#3ffb57] font-mono hover:bg-[#3ffb57]/10 transition-all font-bold">
                Terminal (Recommended for Developers)
            </button>
            <button id="btn-immersive" class="w-full py-4 px-6 rounded-full bg-[#d0bcff] text-[#381e72] font-bold hover:bg-[#eaddff] transition-all shadow-lg shadow-[#d0bcff]/20">
                Immersive UI (Modern & Expressive)
            </button>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHtml);

    // Event Listeners
    document.getElementById('btn-terminal').addEventListener('click', () => {
        document.getElementById('mode-popup').remove();
        // Focus on terminal input
        const cmdInput = document.getElementById('command');
        if (cmdInput) cmdInput.focus();
    });

    document.getElementById('btn-immersive').addEventListener('click', () => {
        document.getElementById('mode-popup').remove();
        switchToImmersive();
    });
}

function switchToImmersive() {
    document.body.classList.add('immersive-mode');

    // 1. Inject Fonts and Tailwind Config
    injectDependencies();

    // 2. Parse Data
    const data = parseData();

    // 3. Create Main Container (overlaying everything)
    const container = document.createElement('div');
    container.id = 'immersive-view';
    // Use the class list from the prompt
    container.className = 'antialiased selection:bg-md-sys-primary selection:text-md-sys-on-primary overflow-x-hidden bg-[#0f0f0f] text-[#e3e3e3] font-sans min-h-screen relative';

    // Add animated background
    const bgContainer = document.createElement('div');
    bgContainer.className = 'fixed inset-0 z-0 overflow-hidden pointer-events-none';
    bgContainer.innerHTML = `
        <div class="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-r from-[#2c003e] to-[#000000] blur-[100px] opacity-40 animate-float"></div>
        <div class="absolute top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-gradient-to-l from-[#1a0b2e] to-[#000000] blur-[120px] opacity-30 animate-float" style="animation-delay: -3s"></div>
        <div class="absolute -bottom-[20%] left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-t from-[#0f172a] to-[#000000] blur-[100px] opacity-40 animate-float" style="animation-delay: -5s"></div>
    `;
    container.appendChild(bgContainer);

    // Clear body content (hide terminal) but keep scripts
    // Actually, safer to just append and let it cover with high z-index or hide the other elements
    // But to prevent scroll interactions with terminal, let's hide the terminal container
    const terminalContainer = document.querySelector('#resume-container')?.parentElement; // div wrapping resume-container
    if (terminalContainer) {
        // We can't easily remove it because we need the data.
        // We extracted data already.
        // We'll just style the container to hide the old stuff.
        const style = document.createElement('style');
        style.textContent = `
            body > div:not(#immersive-view):not(#mode-popup):not(#booking-popup) { display: none !important; }
            body { background-color: #0f0f0f !important; overflow: auto !important; }
            /* Custom scrollbar hiding */
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `;
        document.head.appendChild(style);
    }
    document.body.appendChild(container);

    // 4. Render Content
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'relative z-10';
    contentWrapper.innerHTML = `
        ${renderNavRail()}
        ${renderHero(data)}
        ${renderMarquee(data)}
        ${renderAbout(data)}
        ${renderExperience(data)}
        ${renderProjects(data)}
        ${renderFooter(data)}
    `;

    container.appendChild(contentWrapper);

    // 5. Initialize Interactions
    initInteractions();
    lucide.createIcons();
    initScrollSpy();
}

function injectDependencies() {
    // Fonts
    const fontLink = document.createElement('link');
    fontLink.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    // Tailwind Config
    // We update the global config. The CDN script observes this.
    window.tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                fontFamily: {
                    sans: ['Outfit', 'sans-serif'],
                    display: ['Space Grotesk', 'monospace'],
                },
                colors: {
                    // Material 3 Dark Theme "Funky" Palette
                    md: {
                        sys: {
                            surface: '#0f0f0f',
                            'surface-container': '#1f1f1f',
                            'surface-container-high': '#2b2b2b',
                            'on-surface': '#e3e3e3',
                            'on-surface-variant': '#c4c7c5',
                            primary: '#d0bcff', // Light Purple
                            'on-primary': '#381e72',
                            'primary-container': '#4f378b',
                            'on-primary-container': '#eaddff',
                            secondary: '#b6c4ff', // Light Blue/Indigo
                            'on-secondary': '#1c2d60',
                            'secondary-container': '#334479',
                            'on-secondary-container': '#dbe1ff',
                            tertiary: '#ffb7cd', // Funky Pink
                            'on-tertiary': '#491d2e',
                            'tertiary-container': '#633344',
                            'on-tertiary-container': '#ffd9e3',
                            error: '#ffb4ab',
                            'outline': '#8e918f',
                            'outline-variant': '#444746'
                        }
                    }
                },
                borderRadius: {
                    'xs': '4px',
                    'sm': '8px',
                    'md': '12px',
                    'lg': '16px',
                    'xl': '24px',
                    '2xl': '32px',
                    '3xl': '48px',
                    'full': '9999px',
                },
                animation: {
                    'float': 'float 6s ease-in-out infinite',
                    'spin-slow': 'spin 12s linear infinite',
                    'loop-scroll': 'loop-scroll 20s linear infinite',
                },
                keyframes: {
                    float: {
                        '0%, 100%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(-10px)' },
                    },
                    'loop-scroll': {
                        from: { transform: 'translateX(0)' },
                        to: { transform: 'translateX(-50%)' },
                    }
                }
            }
        }
    };
}

function renderNavRail() {
    return `
    <nav class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-md-sys-surface-container-high/90 backdrop-blur-md border border-md-sys-outline-variant px-2 py-2 rounded-full shadow-2xl flex gap-1 items-center">
        <a href="#immersive-home" class="p-3 rounded-full hover:bg-md-sys-surface-container transition-colors text-md-sys-on-surface-variant hover:text-md-sys-primary">
            <i data-lucide="home" class="w-6 h-6"></i>
        </a>
        <a href="#immersive-about" class="p-3 rounded-full hover:bg-md-sys-surface-container transition-colors text-md-sys-on-surface-variant hover:text-md-sys-primary">
            <i data-lucide="user" class="w-6 h-6"></i>
        </a>
        <a href="#immersive-experience" class="p-3 rounded-full hover:bg-md-sys-surface-container transition-colors text-md-sys-on-surface-variant hover:text-md-sys-primary">
            <i data-lucide="briefcase" class="w-6 h-6"></i>
        </a>
        <a href="#immersive-projects" class="p-3 rounded-full hover:bg-md-sys-surface-container transition-colors text-md-sys-on-surface-variant hover:text-md-sys-primary">
            <i data-lucide="code-2" class="w-6 h-6"></i>
        </a>
        <a href="#immersive-contact" class="p-3 rounded-full hover:bg-md-sys-surface-container transition-colors text-md-sys-on-surface-variant hover:text-md-sys-primary">
            <i data-lucide="mail" class="w-6 h-6"></i>
        </a>
    </nav>
    `;
}

function renderHero(data) {
    return `
    <section id="immersive-home" class="min-h-screen flex flex-col justify-center px-6 lg:px-24 pt-20 relative overflow-hidden">
        <!-- Abstract Background Shapes -->
        <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-md-sys-primary/10 rounded-full blur-[100px] animate-float"></div>
        <div class="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-md-sys-secondary/10 rounded-full blur-[80px] animate-float" style="animation-delay: 2s;"></div>

        <div class="z-10 max-w-4xl">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-md-sys-outline-variant bg-md-sys-surface-container mb-6">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span class="text-sm font-medium tracking-wide text-md-sys-on-surface-variant">${data.about.status || "ONLINE / BUILDING"}</span>
            </div>

            <h1 class="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-8 text-md-sys-on-surface">
                Yo, I'm <br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-md-sys-primary via-md-sys-tertiary to-md-sys-secondary">Ayush.</span>
            </h1>

            <p class="font-sans text-xl md:text-2xl text-md-sys-on-surface-variant max-w-2xl leading-relaxed mb-10">
                ${data.about.intro || "Software Engineer & Electronics Tinkerer. I break things until they work."}
                <span class="block mt-2 text-md-sys-outline">@iu-sh on GitHub</span>
            </p>

            <div class="flex flex-wrap gap-4">
                <a href="#immersive-projects" class="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-md-sys-primary px-8 font-medium text-md-sys-on-primary transition-all duration-300 hover:bg-white hover:text-black hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-md-sys-surface">
                    <span class="mr-2">See my work</span>
                    <i data-lucide="arrow-down-right" class="w-5 h-5 transition-transform group-hover:rotate-45"></i>
                </a>
                <a href="${data.contact.github}" target="_blank" class="inline-flex h-14 items-center justify-center rounded-full border border-md-sys-outline bg-transparent px-8 font-medium text-md-sys-on-surface transition-colors hover:bg-md-sys-surface-container hover:border-md-sys-primary">
                    <i data-lucide="github" class="w-5 h-5 mr-2"></i>
                    GitHub
                </a>
            </div>
        </div>
    </section>
    `;
}

function renderMarquee(data) {
    const skillsList = data.skills.join(' <span class="text-md-sys-primary mx-8">*</span> ');
    // Repeat the list a few times for the loop
    const fullContent = `${skillsList} <span class="text-md-sys-primary mx-8">*</span> ${skillsList} <span class="text-md-sys-primary mx-8">*</span> ${skillsList}`;

    return `
    <div class="w-full bg-md-sys-surface-container py-12 rotate-[-2deg] scale-105 transform origin-left border-y border-md-sys-outline-variant mb-20">
        <div class="flex overflow-hidden group">
            <div class="flex animate-loop-scroll whitespace-nowrap group-hover:paused text-4xl md:text-6xl font-display font-bold text-md-sys-on-surface-variant/20">
                <span class="mx-8">${fullContent}</span>
            </div>
        </div>
    </div>
    `;
}

function renderAbout(data) {
    return `
    <section id="immersive-about" class="px-6 lg:px-24 py-20 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1">
                <h2 class="font-display text-4xl md:text-5xl font-bold mb-6 text-md-sys-on-surface">Who am I?</h2>
                <div class="space-y-6 text-lg text-md-sys-on-surface-variant font-light">
                    <p>
                        ${data.about.fullBio || "I'm not just a coder; I'm a builder."}
                    </p>
                    <p>
                        Currently focused on <strong class="text-md-sys-tertiary">Distributed Systems</strong> and <strong class="text-md-sys-secondary">Backend Engineering</strong>.
                    </p>

                    <!-- Tech Pills -->
                    <div class="flex flex-wrap gap-3 mt-8">
                        ${data.skills.slice(0, 10).map(s => `
                            <span class="px-4 py-2 rounded-lg bg-md-sys-surface-container-high border border-md-sys-outline-variant text-sm font-medium hover:border-md-sys-primary transition-colors cursor-default">${s}</span>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Funky visual element -->
            <div class="order-1 md:order-2 relative">
                <div class="aspect-square bg-gradient-to-br from-md-sys-surface-container to-md-sys-surface-container-high rounded-[3rem] border border-md-sys-outline-variant flex items-center justify-center relative overflow-hidden group">
                    <div class="absolute inset-0 bg-md-sys-primary/5 opacity-20"></div>
                    <!-- Terminal Window Mockup -->
                    <div class="w-3/4 h-3/4 bg-[#1a1b26] rounded-xl shadow-2xl p-4 font-mono text-sm overflow-hidden border border-md-sys-outline-variant group-hover:scale-105 transition-transform duration-500">
                        <div class="flex gap-2 mb-4">
                            <div class="w-3 h-3 rounded-full bg-red-500"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div class="text-green-400">$ whoami</div>
                        <div class="text-gray-300 mb-2">Ayush / iu-sh</div>
                        <div class="text-green-400">$ cat bio.txt</div>
                        <div class="text-gray-300">
                            > Engineer.<br>
                            > Tinkerer.<br>
                            > Problem Solver.<br>
                            > Loading more caffeine...<span class="animate-pulse">_</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

function renderExperience(data) {
    return `
    <section id="immersive-experience" class="px-6 lg:px-24 py-20 max-w-7xl mx-auto">
        <h2 class="font-display text-4xl md:text-5xl font-bold mb-16 text-md-sys-on-surface">Experience Logs</h2>
        <div class="relative border-l-2 border-md-sys-outline-variant ml-4 md:ml-12 space-y-16">
            ${data.experience.map(job => `
            <div class="relative pl-8 md:pl-12 group">
                 <!-- Dot on line -->
                 <div class="absolute -left-[9px] top-0 w-4 h-4 bg-md-sys-surface border-2 border-md-sys-primary rounded-full group-hover:bg-md-sys-primary transition-colors"></div>

                 <div class="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                    <h3 class="text-2xl font-display font-bold text-md-sys-on-surface">${job.role}</h3>
                    <span class="hidden sm:inline text-md-sys-outline-variant">•</span>
                    <span class="text-lg font-medium text-md-sys-secondary">${job.company}</span>
                 </div>

                 <span class="inline-block px-3 py-1 rounded bg-md-sys-surface-container-high text-xs font-mono text-md-sys-primary mb-4 border border-md-sys-outline-variant">
                    ${job.duration}
                 </span>

                 <div class="bg-md-sys-surface-container p-6 rounded-2xl border border-md-sys-outline-variant hover:border-md-sys-primary transition-colors group-hover:shadow-lg shadow-md-sys-primary/5">
                      <div class="text-md-sys-tertiary text-sm font-mono mb-4 border-b border-md-sys-outline-variant/30 pb-2">
                        <i data-lucide="cpu" class="w-4 h-4 inline mr-1"></i> ${job.tech}
                      </div>
                      <ul class="space-y-2 text-md-sys-on-surface-variant">
                          ${job.details.map(d => `<li class="flex items-start"><span class="mr-2 mt-1.5 w-1.5 h-1.5 bg-md-sys-secondary rounded-full flex-shrink-0"></span><span>${d}</span></li>`).join('')}
                      </ul>
                 </div>
            </div>
            `).join('')}
        </div>
    </section>
    `;
}

function renderProjects(data) {
    return `
    <section id="immersive-projects" class="px-6 lg:px-24 py-20 bg-md-sys-surface-container rounded-t-[3rem] md:rounded-t-[5rem] mt-20">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                <div>
                    <h2 class="font-display text-4xl md:text-6xl font-bold text-md-sys-on-surface">Selected Works</h2>
                    <p class="text-md-sys-on-surface-variant mt-2 text-xl">What I've been cooking.</p>
                </div>
                <a href="${data.contact.github}" target="_blank" class="px-6 py-3 rounded-full bg-md-sys-tertiary-container text-md-sys-on-tertiary-container font-medium hover:bg-md-sys-tertiary hover:text-md-sys-on-tertiary transition-colors">
                    View GitHub Profile
                </a>
            </div>

            <!-- Bento Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${data.projects.map((project, idx) => {
                    // Pattern: Large (2col), Tall (row-span), Standard, Wide
                    // Simplification:
                    // idx 0: Large (col-span-2)
                    // idx 1: Standard
                    // idx 2: Standard
                    // idx 3: Large
                    const isLarge = idx % 4 === 0 || idx % 4 === 3;
                    const colClass = isLarge ? 'md:col-span-2 aspect-[2/1]' : 'aspect-square';
                    const bgClass = idx % 2 === 0 ? 'bg-md-sys-surface-container-high' : 'bg-md-sys-secondary-container';
                    const textClass = idx % 2 === 0 ? 'text-white' : 'text-md-sys-on-secondary-container';

                    return `
                    <div class="group relative ${colClass} ${bgClass} rounded-[2rem] overflow-hidden border border-md-sys-outline-variant hover:border-md-sys-primary transition-colors cursor-pointer p-8 flex flex-col justify-between">

                        <div class="relative z-20">
                            <div class="flex flex-wrap gap-2 mb-4">
                                ${project.tags.slice(0,3).map(tag => `
                                    <span class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-black/20 backdrop-blur-sm ${textClass}">${tag}</span>
                                `).join('')}
                            </div>
                            <h3 class="text-3xl font-display font-bold ${textClass} mb-2">${project.title}</h3>
                            <p class="${textClass} opacity-80 line-clamp-3 text-sm">${project.details[0] || ''}</p>
                        </div>

                        <div class="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black p-3 rounded-full">
                            <i data-lucide="arrow-up-right" class="w-6 h-6"></i>
                        </div>

                        <div class="mt-4 z-20">
                             <a href="${project.link}" target="_blank" class="inline-flex items-center gap-2 text-sm font-bold ${textClass} hover:underline">
                                View Project <i data-lucide="external-link" class="w-4 h-4"></i>
                             </a>
                        </div>

                        <!-- Gradient Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
                    </div>
                    `;
                }).join('')}
            </div>
        </div>
    </section>
    `;
}

function renderFooter(data) {
    const resumeLink = "https://drive.google.com/file/d/18WSvCUixoKOrkHoTGbKKNCbnNQ75WrQk/view?usp=sharing";
    return `
    <footer id="immersive-contact" class="px-6 lg:px-24 py-20 relative bg-md-sys-surface">
        <div class="max-w-4xl mx-auto text-center">
            <h2 class="font-display text-5xl md:text-7xl font-bold mb-8 text-md-sys-on-surface">Let's build something crazy.</h2>
            <p class="text-xl text-md-sys-on-surface-variant mb-10">Have a project or just want to talk tech? Hit me up.</p>

            <div class="flex flex-wrap justify-center gap-4">
                <a href="${data.contact.email}" class="inline-flex items-center gap-3 px-8 py-4 bg-md-sys-primary text-md-sys-on-primary rounded-full text-lg font-bold hover:bg-md-sys-on-primary hover:text-md-sys-primary transition-colors shadow-xl hover:shadow-2xl transform hover:-translate-y-1 duration-200">
                    <i data-lucide="mail"></i>
                    Send Email
                </a>
                <button id="btn-book-time" data-link="${data.bookTime}" class="inline-flex items-center gap-3 px-8 py-4 border border-md-sys-outline-variant bg-md-sys-surface-container text-md-sys-on-surface rounded-full text-lg font-bold hover:bg-md-sys-tertiary hover:text-md-sys-on-tertiary transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200">
                    <i data-lucide="calendar"></i>
                    Book a Time
                </button>
                <a href="${resumeLink}" target="_blank" class="inline-flex items-center gap-3 px-8 py-4 border border-md-sys-outline-variant bg-md-sys-surface-container text-md-sys-on-surface rounded-full text-lg font-bold hover:bg-md-sys-secondary hover:text-md-sys-on-secondary transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200">
                    <i data-lucide="file-text"></i>
                    Resume
                </a>
            </div>

            <div class="mt-20 flex justify-center gap-8">
                <a href="${data.contact.github}" target="_blank" class="text-md-sys-on-surface-variant hover:text-md-sys-primary transition-colors">
                    <i data-lucide="github" class="w-8 h-8"></i>
                </a>
                <a href="${data.contact.linkedin}" target="_blank" class="text-md-sys-on-surface-variant hover:text-md-sys-secondary transition-colors">
                    <i data-lucide="linkedin" class="w-8 h-8"></i>
                </a>
            </div>

            <div class="mt-20 text-md-sys-outline text-sm">
                <p>&copy; 2026 Ayush / iu-sh. Built with <span class="text-md-sys-tertiary">♥</span> and Tailwind.</p>
            </div>
        </div>
    </footer>
    `;
}

function initInteractions() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Support both old and new IDs for smoother transition if mixed
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Book a time Popup
    const bookBtn = document.getElementById('btn-book-time');
    if (bookBtn) {
        bookBtn.addEventListener('click', () => {
            const link = bookBtn.getAttribute('data-link');
            const popupHtml = `
            <div id="booking-popup" class="fixed inset-0 bg-black/80 z-[10000] flex flex-col justify-center items-center font-sans">
                <div class="bg-md-sys-surface-container p-8 rounded-3xl text-center max-w-md w-[90%] border border-md-sys-outline-variant shadow-2xl animate-[float_0.5s_ease-out]">
                    <div class="w-16 h-16 bg-md-sys-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-md-sys-primary">
                        <i data-lucide="alert-circle" class="w-8 h-8"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-md-sys-on-surface mb-4">Before you proceed</h3>
                    <p class="text-md-sys-on-surface-variant mb-8 leading-relaxed">
                        Please make sure you have notified me at least <strong>48h in advance</strong> through email before booking a time slot.
                    </p>
                    <div class="flex gap-4">
                        <button id="btn-cancel-booking" class="flex-1 py-3 rounded-full border border-md-sys-outline-variant text-md-sys-on-surface hover:bg-md-sys-surface-container-high transition-colors font-medium">
                            Cancel
                        </button>
                        <a href="${link}" target="_blank" id="btn-confirm-booking" class="flex-1 py-3 rounded-full bg-md-sys-primary text-md-sys-on-primary hover:opacity-90 transition-opacity font-bold flex items-center justify-center">
                            Continue
                        </a>
                    </div>
                </div>
            </div>
            `;
            document.body.insertAdjacentHTML('beforeend', popupHtml);
            lucide.createIcons();

            document.getElementById('btn-cancel-booking').addEventListener('click', () => {
                document.getElementById('booking-popup').remove();
            });
            document.getElementById('btn-confirm-booking').addEventListener('click', () => {
                document.getElementById('booking-popup').remove();
            });
        });
    }
}

function initScrollSpy() {
    const sections = ['immersive-home', 'immersive-about', 'immersive-experience', 'immersive-projects', 'immersive-contact'];
    const navLinks = document.querySelectorAll('nav a');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all
                navLinks.forEach(link => {
                    link.classList.remove('bg-md-sys-primary', 'text-md-sys-on-primary', 'shadow-lg');
                    link.classList.add('text-md-sys-on-surface-variant', 'hover:bg-md-sys-surface-container');
                    if (link.getAttribute('href') === '#immersive-contact') {
                         // Keep special styling for contact but reset if needed
                         // actually the original code had contact always highlighted?
                         // The original code was:
                         // <a href="#immersive-contact" class="p-3 rounded-full bg-md-sys-primary text-md-sys-on-primary hover:opacity-90 transition-opacity shadow-lg">
                         // We should treat contact same as others for scroll spy or keep it special?
                         // Request: "The pill shaped menu list that lives on the website does not highlight the section that the user is currently viewing."
                         // So we should probably standardize them.
                    }
                });

                // Add active class to current
                const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.remove('text-md-sys-on-surface-variant', 'hover:bg-md-sys-surface-container');
                    activeLink.classList.add('bg-md-sys-primary', 'text-md-sys-on-primary', 'shadow-lg');
                }
            }
        });
    }, observerOptions);

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
}

function parseData() {
    // 1. SKILLS
    const skillsUl = document.querySelector('#skills ul');
    let skills = [];
    if (skillsUl) {
        const listItems = skillsUl.querySelectorAll('li');
        listItems.forEach(li => {
            const text = li.innerText;
            const parts = text.split('-');
            if(parts.length > 1) {
                const items = parts[1].split(',').map(s => s.trim().replace('.', ''));
                skills = [...skills, ...items];
            } else {
                skills.push(text.trim());
            }
        });
    }

    // 2. PROJECTS
    const projects = [];
    const projContainer = document.querySelector('#projects > div > ul');
    if (projContainer) {
        const projLis = projContainer.querySelectorAll('li.proj_name');
        projLis.forEach(li => {
            const anchor = li.querySelector('a');
            const span = li.querySelector('span');
            const detailsUl = li.querySelector('ul');

            const title = anchor ? anchor.innerText : "Project";
            const link = anchor ? anchor.href : "#";

            let tags = [];
            if (span) {
                tags = span.innerText.split('|').map(s => s.trim()).filter(s => s !== "");
            }

            let details = [];
            if (detailsUl) {
                detailsUl.querySelectorAll('li').forEach(d => details.push(d.innerText));
            }

            projects.push({ title, link, tags, details });
        });
    }

    // 3. ABOUT
    const aboutDiv = document.querySelector('#about > div');
    let intro = "";
    let status = "";
    let fullBio = "";
    if (aboutDiv) {
        intro = "I am a Software Engineer, currently trading code for money at Google.";
        status = "SWE-III @ Google, Munich";
        fullBio = "TL;DR : Swiss Army Knife. Currently diving deep into Distributed Systems and building scalable solutions. Always down to chat about Physics, Algorithms, or high-throughput architecture. ";
    }

    // 4. EXPERIENCE
    const experience = [];
    const expDiv = document.querySelector('#experience > div');
    if (expDiv) {
        const expUls = expDiv.querySelectorAll('ul');
        expUls.forEach(ul => {
            if (ul.parentElement === expDiv) { // Direct children ULs
                const roleLi = ul.querySelector('li strong');
                const innerUl = ul.querySelector('ul');

                let roleStr = roleLi ? roleLi.innerText : "";
                let company = "";
                let role = roleStr;

                // Try to split Role - Company
                if (roleStr.includes('-')) {
                    const parts = roleStr.split('-');
                    // Heuristic: "Google, Munich - Software Engineer"
                    if (parts.length >= 2) {
                        company = parts[0].trim();
                        role = parts.slice(1).join('-').trim();
                    }
                }

                let duration = "";
                let tech = "";
                let details = [];

                if (innerUl) {
                    const listItems = innerUl.querySelectorAll('li');
                    listItems.forEach((li, idx) => {
                        if (idx === 0) duration = li.innerText;
                        else if (idx === 1 && li.innerText.includes('TechStack')) tech = li.innerText.replace('TechStack:', '').trim();
                        else details.push(li.innerText);
                    });
                }

                experience.push({ role, company, duration, tech, details });
            }
        });
    }

    // 5. CONTACT
    const contactDiv = document.querySelector('#contact p');
    let email = "mailto:ayushsingh1315@gmail.com";
    let linkedin = "#";
    let github = "#";

    if (contactDiv) {
        const links = contactDiv.querySelectorAll('a');
        links.forEach(a => {
            if(a.href.includes('mailto')) email = a.href;
            if(a.innerText.includes('LinkedIn')) linkedin = a.href;
            if(a.innerText.includes('Github')) github = a.href;
        });
    }

    // 6. BOOK A TIME
    const bookDiv = document.querySelector('#book-a-time');
    let bookTime = "#";
    if (bookDiv) {
        const a = bookDiv.querySelector('a');
        if(a) bookTime = a.href;
    }

    return { skills, projects, about: { intro, status, fullBio }, experience, contact: { email, linkedin, github }, bookTime };
}
