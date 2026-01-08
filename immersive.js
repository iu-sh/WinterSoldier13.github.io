document.addEventListener('DOMContentLoaded', () => {
    // Mode selection is now handled by index.html (landing page)
    // and we are already in the immersive/normal page here.
    switchToImmersive();
});

let activeTab = 'home';

function switchToImmersive() {
    document.body.classList.add('immersive-mode');

    // 1. (Skip) Dependencies injected in HTML head now.
    // injectDependencies();

    // 2. Parse Data from CONFIG
    const data = parseDataFromConfig();

    // 3. Create Main Container
    const container = document.createElement('div');
    container.id = 'immersive-view';
    // Use the class list from the prompt
    // Removed redundant bg color since body handles it, but kept for safety/specificity
    container.className = 'antialiased selection:bg-md-sys-primary selection:text-md-sys-on-primary overflow-x-hidden bg-[#282a36] text-[#f8f8f2] font-sans min-h-screen relative';

    // Add animated background
    const bgContainer = document.createElement('div');
    bgContainer.className = 'fixed inset-0 z-0 overflow-hidden pointer-events-none';
    bgContainer.innerHTML = `
        <div class="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-r from-[#4d3e6b] to-[#282a36] blur-[100px] opacity-40 animate-float"></div>
        <div class="absolute top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-gradient-to-l from-[#365c69] to-[#282a36] blur-[120px] opacity-30 animate-float" style="animation-delay: -3s"></div>
        <div class="absolute -bottom-[20%] left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-t from-[#6b3352] to-[#282a36] blur-[100px] opacity-40 animate-float" style="animation-delay: -5s"></div>
    `;
    container.appendChild(bgContainer);

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
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    initScrollSpy();
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
                    <div class="group relative ${colClass} ${bgClass} rounded-[2rem] overflow-hidden border border-md-sys-outline-variant hover:border-md-sys-primary transition-colors cursor-pointer p-8 flex flex-col justify-between" onclick="window.open('${project.link}', '_blank')">

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
    const resumeLink = data.resume || "#";
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
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

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

function parseDataFromConfig() {
    // This function maps the structure from CONFIG to what Immersive UI expects

    // 1. SKILLS
    // CONFIG.skills is [{category, items}, ...]
    let skills = [];
    if (CONFIG.skills) {
        CONFIG.skills.forEach(s => {
            if (s.items) {
                // items is a string "TypeScript, C++, ..."
                const items = s.items.split(',').map(item => item.trim());
                skills = skills.concat(items);
            }
        });
    }

    // 2. PROJECTS
    // CONFIG.projects is [{name, url, tags, description: []}, ...]
    let projects = [];
    if (CONFIG.projects) {
        projects = CONFIG.projects.map(p => ({
            title: p.name,
            link: p.url || "#",
            tags: p.tags,
            details: p.description // array of strings
        }));
    }

    // 3. ABOUT
    // CONFIG.about has name, role, team, tagline, bio, currentStatus
    let about = {
        intro: CONFIG.about.tagline,
        status: `${CONFIG.about.currentStatus.role} @ ${CONFIG.about.currentStatus.location}`,
        fullBio: CONFIG.about.bio
    };

    // 4. EXPERIENCE
    // CONFIG.experience is [{title, period, department, highlights: [{detail}, ...]}, ...]
    let experience = [];
    if (CONFIG.experience) {
        experience = CONFIG.experience.map(exp => {
            // title: "Google, Munich - Software Engineer"
            let role = exp.title;
            let company = "";
            if (exp.title.includes('-')) {
                const parts = exp.title.split('-');
                if (parts.length >= 2) {
                     // Heuristic: "Company, Location - Role"
                     company = parts[0].trim();
                     role = parts.slice(1).join('-').trim();
                }
            }

            // Tech stack is not explicitly separate in CONFIG, usually in highlights or just implied.
            // But we can try to find a highlight that says "TechStack" or leave it blank
            let tech = "";
            // We can also check if any highlight starts with TechStack
            const details = [];
            if (exp.highlights) {
                exp.highlights.forEach(h => {
                    if (h.detail.startsWith('TechStack:')) {
                        tech = h.detail.replace('TechStack:', '').trim();
                    } else {
                        details.push(h.detail);
                    }
                });
            }

            return {
                role,
                company,
                duration: exp.period,
                tech,
                details
            };
        });
    }

    // 5. CONTACT
    let contact = {
        email: CONFIG.contact.email ? `mailto:${CONFIG.contact.email.address}` : "#",
        linkedin: CONFIG.contact.social && CONFIG.contact.social.linkedin ? CONFIG.contact.social.linkedin.url : "#",
        github: CONFIG.contact.social && CONFIG.contact.social.github ? CONFIG.contact.social.github.url : "#"
    };

    // 6. BOOK TIME
    let bookTime = CONFIG.bookATime ? CONFIG.bookATime.url : "#";

    // 7. RESUME
    let resume = CONFIG.resumeDownloadUrl;

    return { skills, projects, about, experience, contact, bookTime, resume };
}
