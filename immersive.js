document.addEventListener('DOMContentLoaded', () => {
    initModeSelection();
});

let activeTab = 'home';

function initModeSelection() {
    // Create Popup HTML
    const popupHtml = `
    <div id="mode-popup" class="fixed inset-0 bg-black/95 z-[9999] flex flex-col justify-center items-center font-sans">
        <div class="bg-md-sys-surface-container p-8 rounded-3xl text-center max-w-md w-[90%] border border-md-sys-outline-variant shadow-2xl">
            <h2 class="text-3xl font-display font-bold text-md-sys-on-surface mb-8">Select Interface</h2>
            <button id="btn-terminal" class="w-full py-4 px-6 mb-4 rounded-full border-2 border-md-sys-primary text-md-sys-primary font-mono hover:bg-md-sys-primary/10 transition-all font-bold">
                Terminal (Dev Mode)
            </button>
            <button id="btn-immersive" class="w-full py-4 px-6 rounded-full bg-md-sys-primary text-md-sys-on-primary font-bold hover:bg-md-sys-on-primary-container hover:text-md-sys-primary-container transition-all shadow-lg">
                UI View (Design Mode)
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

    // Hide terminal
    const terminalContainer = document.querySelector('body > div');
    // The structure in index.html is <body> <h1..> <div> (this div contains terminal) </div> ...
    // But index.html structure is a bit flat. The terminal is inside the first major div after h1.
    // Let's rely on CSS class 'immersive-mode' to hide everything if needed,
    // but the immersive container is appended to body.
    // In resume.css we might need to add logic to hide terminal when .immersive-mode is present,
    // OR we just overlay the immersive view on top with z-index.
    // The previous implementation created a new container.

    // Create Main Container
    const container = document.createElement('div');
    container.id = 'immersive-view';
    container.className = 'min-h-screen bg-md-sys-surface text-md-sys-on-surface font-sans overflow-x-hidden relative selection:bg-md-sys-primary selection:text-md-sys-on-primary';
    document.body.appendChild(container);

    // 1. Navigation Rail (Floating Bottom)
    renderNavigation(container);

    // 2. Main Content Wrapper
    const mainHtml = `
      <main id="immersive-content" class="pb-32">
        <!-- Sections will be injected here -->
      </main>
    `;
    container.insertAdjacentHTML('beforeend', mainHtml);

    // 3. Render Sections
    renderSections();

    // 4. Initialize Icons
    lucide.createIcons();

    // 5. Smooth Scroll Behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function renderNavigation(container) {
    const navHtml = `
    <nav class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-md-sys-surface-container-high/90 backdrop-blur-md border border-md-sys-outline-variant px-2 py-2 rounded-full shadow-2xl flex gap-1 items-center">
        <a href="#home" class="p-3 rounded-full hover:bg-md-sys-surface-container transition-colors text-md-sys-on-surface-variant hover:text-md-sys-primary">
            <i data-lucide="home" class="w-6 h-6"></i>
        </a>
        <a href="#about" class="p-3 rounded-full hover:bg-md-sys-surface-container transition-colors text-md-sys-on-surface-variant hover:text-md-sys-primary">
            <i data-lucide="user" class="w-6 h-6"></i>
        </a>
        <a href="#experience" class="p-3 rounded-full hover:bg-md-sys-surface-container transition-colors text-md-sys-on-surface-variant hover:text-md-sys-primary">
             <i data-lucide="briefcase" class="w-6 h-6"></i>
        </a>
        <a href="#projects" class="p-3 rounded-full hover:bg-md-sys-surface-container transition-colors text-md-sys-on-surface-variant hover:text-md-sys-primary">
            <i data-lucide="code-2" class="w-6 h-6"></i>
        </a>
        <a href="#contact" class="p-3 rounded-full bg-md-sys-primary text-md-sys-on-primary hover:opacity-90 transition-opacity shadow-lg">
            <i data-lucide="mail" class="w-6 h-6"></i>
        </a>
    </nav>
    `;
    container.insertAdjacentHTML('beforeend', navHtml);
}

function renderSections() {
    const main = document.getElementById('immersive-content');
    const data = parseData();

    // --- HOME SECTION ---
    const homeSection = document.createElement('section');
    homeSection.id = 'home';
    homeSection.className = 'min-h-screen flex flex-col justify-center px-6 lg:px-24 pt-20 relative overflow-hidden';

    homeSection.innerHTML = `
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
            </p>

            <div class="flex flex-wrap gap-4">
                <a href="#projects" class="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-md-sys-primary px-8 font-medium text-md-sys-on-primary transition-all duration-300 hover:bg-white hover:text-black hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-md-sys-surface">
                    <span class="mr-2">See my work</span>
                    <i data-lucide="arrow-down-right" class="w-5 h-5 transition-transform group-hover:rotate-45"></i>
                </a>
                <a href="${data.contact.github}" target="_blank" class="inline-flex h-14 items-center justify-center rounded-full border border-md-sys-outline bg-transparent px-8 font-medium text-md-sys-on-surface transition-colors hover:bg-md-sys-surface-container hover:border-md-sys-primary">
                    <i data-lucide="github" class="w-5 h-5 mr-2"></i>
                    GitHub
                </a>
                 <a href="${data.contact.bookATime}" target="_blank" class="inline-flex h-14 items-center justify-center rounded-full border border-md-sys-outline bg-md-sys-surface-container px-8 font-medium text-md-sys-on-surface transition-colors hover:bg-md-sys-tertiary-container hover:border-md-sys-tertiary">
                    <i data-lucide="calendar" class="w-5 h-5 mr-2"></i>
                    Book a time
                </a>
            </div>
        </div>
    `;
    main.appendChild(homeSection);

    // --- SKILLS MARQUEE ---
    const marqueeContainer = document.createElement('div');
    marqueeContainer.className = "w-full bg-md-sys-surface-container py-12 rotate-[-2deg] scale-105 transform origin-left border-y border-md-sys-outline-variant mb-20 overflow-hidden";

    // Construct marquee text from skills
    // We'll create a repeating pattern
    const topSkills = data.skills.slice(0, 5); // Take top 5
    const marqueeContent = topSkills.map((skill, i) => {
        const colorClass = i % 3 === 0 ? 'text-md-sys-primary' : (i % 3 === 1 ? 'text-md-sys-tertiary' : 'text-md-sys-secondary');
        return `
            <span class="text-4xl md:text-6xl font-display font-bold text-md-sys-on-surface-variant/20 mx-8 uppercase">SOFTWARE ENGINEER</span>
            <span class="text-4xl md:text-6xl font-display font-bold ${colorClass} mx-8">*</span>
            <span class="text-4xl md:text-6xl font-display font-bold text-md-sys-on-surface-variant/20 mx-8 uppercase">${skill}</span>
            <span class="text-4xl md:text-6xl font-display font-bold ${colorClass} mx-8">*</span>
        `;
    }).join('');

    marqueeContainer.innerHTML = `
        <div class="flex overflow-hidden group">
            <div class="flex animate-loop-scroll whitespace-nowrap group-hover:paused">
                ${marqueeContent}
                ${marqueeContent} <!-- Duplicated for seamless loop -->
            </div>
        </div>
    `;
    main.appendChild(marqueeContainer);

    // --- ABOUT SECTION ---
    const aboutSection = document.createElement('section');
    aboutSection.id = 'about';
    aboutSection.className = 'px-6 lg:px-24 py-20 max-w-7xl mx-auto';

    aboutSection.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1">
                <h2 class="font-display text-4xl md:text-5xl font-bold mb-6 text-md-sys-on-surface">The Homie Logic.</h2>
                <div class="space-y-6 text-lg text-md-sys-on-surface-variant font-light">
                    <p>
                        ${data.about.fullBio || "I'm not just a coder; I'm a builder."}
                    </p>

                    <!-- Tech Pills -->
                    <div class="flex flex-wrap gap-3 mt-8">
                        ${data.skills.map(skill => `
                            <span class="px-4 py-2 rounded-lg bg-md-sys-surface-container-high border border-md-sys-outline-variant text-sm font-medium hover:border-md-sys-primary transition-colors cursor-default">${skill}</span>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Terminal Visual -->
            <div class="order-1 md:order-2 relative">
                <div class="aspect-square bg-gradient-to-br from-md-sys-surface-container to-md-sys-surface-container-high rounded-[3rem] border border-md-sys-outline-variant flex items-center justify-center relative overflow-hidden group">
                    <div class="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    <!-- Terminal Window Mockup -->
                    <div class="w-3/4 h-3/4 bg-[#1a1b26] rounded-xl shadow-2xl p-4 font-mono text-sm overflow-hidden border border-md-sys-outline-variant group-hover:scale-105 transition-transform duration-500">
                        <div class="flex gap-2 mb-4">
                            <div class="w-3 h-3 rounded-full bg-red-500"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div class="text-green-400">$ whoami</div>
                        <div class="text-gray-300 mb-2">Ayush / WinterSoldier13</div>
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
    `;
    main.appendChild(aboutSection);

    // --- EXPERIENCE SECTION ---
    const experienceSection = document.createElement('section');
    experienceSection.id = 'experience';
    experienceSection.className = 'px-6 lg:px-24 py-20 bg-md-sys-surface-container rounded-[3rem] my-20 mx-4 md:mx-10';

    experienceSection.innerHTML = `
        <h2 class="font-display text-4xl md:text-6xl font-bold text-md-sys-on-surface mb-12 text-center">Experience</h2>
        <div class="max-w-4xl mx-auto space-y-8">
            ${data.experience.map((job, idx) => `
                <div class="group relative bg-md-sys-surface p-8 rounded-[2rem] border border-md-sys-outline-variant hover:border-md-sys-primary transition-all duration-300">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                        <h3 class="text-2xl font-display font-bold text-md-sys-on-surface">${job.role}</h3>
                        <span class="px-4 py-1 rounded-full bg-md-sys-secondary-container text-md-sys-on-secondary-container text-sm font-medium whitespace-nowrap">${job.duration}</span>
                    </div>
                    <div class="text-md-sys-primary font-medium mb-4">${job.tech}</div>
                    <ul class="list-disc list-inside space-y-2 text-md-sys-on-surface-variant">
                         ${job.details.map(d => `<li class="leading-relaxed">${d}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    `;
    main.appendChild(experienceSection);


    // --- PROJECTS SECTION ---
    const projectsSection = document.createElement('section');
    projectsSection.id = 'projects';
    projectsSection.className = 'px-6 lg:px-24 py-20 bg-md-sys-surface-container-high rounded-t-[3rem] md:rounded-t-[5rem]';

    projectsSection.innerHTML = `
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

            <!-- Bento Grid / Masonry Layout -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 ${data.projects.map((project, idx) => {
                    // Determine card style based on index to create variety
                    const isLarge = idx === 0 || idx === 3;
                    const isTall = idx === 1;

                    let colSpan = "";
                    let aspect = "aspect-square";

                    if (isLarge) {
                        colSpan = "md:col-span-2";
                        aspect = "aspect-video md:aspect-[2/1]";
                    } else if (isTall) {
                        aspect = "aspect-square md:aspect-auto"; // tall card logic usually handled by row span but grid-auto-flow helps
                    }

                    // Background color rotation
                    const bgColors = [
                        'bg-md-sys-surface-container-high',
                        'bg-md-sys-secondary-container',
                        'bg-md-sys-tertiary-container'
                    ];
                    const bgClass = isLarge ? 'bg-md-sys-surface-container-high' : bgColors[idx % 3];
                    const textClass = isLarge ? 'text-white' : 'text-md-sys-on-surface';

                    // Simplified logic for card content
                    if (isLarge) {
                        return `
                        <div class="group relative ${colSpan} ${aspect} bg-md-sys-surface-container-high rounded-[2rem] overflow-hidden border border-md-sys-outline-variant hover:border-md-sys-primary transition-colors cursor-pointer" onclick="window.open('${project.link}', '_blank')">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                            <img src="https://placehold.co/800x400/1a1a1a/FFF?text=${encodeURIComponent(project.title)}" alt="${project.title}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">

                            <div class="absolute bottom-0 left-0 p-8 z-20">
                                <span class="px-3 py-1 bg-md-sys-primary text-md-sys-on-primary text-xs font-bold rounded-full mb-3 inline-block">PROJECT</span>
                                <h3 class="text-3xl font-display font-bold text-white mb-2">${project.title}</h3>
                                <p class="text-gray-300 max-w-lg line-clamp-2">${project.details[0] || ''}</p>
                            </div>
                            <div class="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black p-3 rounded-full">
                                <i data-lucide="arrow-up-right" class="w-6 h-6"></i>
                            </div>
                        </div>
                        `;
                    } else {
                        // Smaller cards
                         return `
                        <div class="group relative ${aspect} ${bgClass} rounded-[2rem] overflow-hidden p-8 flex flex-col justify-between border border-transparent hover:border-md-sys-outline transition-colors cursor-pointer" onclick="window.open('${project.link}', '_blank')">
                             <div class="space-y-4">
                                <div class="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center">
                                    <i data-lucide="code" class="w-6 h-6"></i>
                                </div>
                                <h3 class="text-2xl font-display font-bold text-md-sys-on-surface">${project.title}</h3>
                                <p class="text-md-sys-on-surface/80 line-clamp-3 text-sm">${project.details[0] || ''}</p>
                            </div>
                             <div class="flex gap-2 mt-4 flex-wrap">
                                ${project.tags.slice(0,3).map(t => `<span class="text-xs font-mono px-2 py-1 rounded bg-black/10 text-md-sys-on-surface">${t}</span>`).join('')}
                            </div>
                        </div>
                        `;
                    }
                 }).join('')}
            </div>
        </div>
    `;
    main.appendChild(projectsSection);

    // --- FOOTER / CONTACT ---
    const footerSection = document.createElement('footer');
    footerSection.id = 'contact';
    footerSection.className = 'px-6 lg:px-24 py-20 relative';

    footerSection.innerHTML = `
        <div class="max-w-4xl mx-auto text-center">
            <h2 class="font-display text-5xl md:text-7xl font-bold mb-8 text-md-sys-on-surface">Let's build something crazy.</h2>
            <p class="text-xl text-md-sys-on-surface-variant mb-10">Have a project or just want to talk tech? Hit me up.</p>

            <a href="${data.contact.email}" class="inline-flex items-center gap-3 px-8 py-4 bg-md-sys-primary text-md-sys-on-primary rounded-full text-lg font-bold hover:bg-md-sys-on-primary hover:text-md-sys-primary transition-colors shadow-xl hover:shadow-2xl transform hover:-translate-y-1 duration-200">
                <i data-lucide="mail"></i>
                Send Email
            </a>

             <a href="${data.contact.bookATime}" target="_blank" class="block mt-6 text-md-sys-tertiary hover:underline">
                Or Book a time directly
            </a>

            <div class="mt-20 flex justify-center gap-8">
                <a href="${data.contact.github}" class="text-md-sys-on-surface-variant hover:text-md-sys-primary transition-colors">
                    <i data-lucide="github" class="w-8 h-8"></i>
                </a>
                <a href="${data.contact.linkedin}" class="text-md-sys-on-surface-variant hover:text-md-sys-secondary transition-colors">
                    <i data-lucide="linkedin" class="w-8 h-8"></i>
                </a>
            </div>

            <div class="mt-20 text-md-sys-outline text-sm">
                <p>&copy; 2026 Ayush / WinterSoldier13. Built with <span class="text-md-sys-tertiary">♥</span> and Tailwind.</p>
            </div>
        </div>
    `;
    main.appendChild(footerSection);
}

function parseData() {
    // 1. SKILLS
    const skillsUl = document.querySelector('#skills ul');
    let skills = [];
    if (skillsUl) {
        // Text based parsing: "Languages - TypeScript, ..."
        const listItems = skillsUl.querySelectorAll('li');
        listItems.forEach(li => {
            const text = li.innerText;
            // Extract everything after the dash if present
            const parts = text.split('-');
            if(parts.length > 1) {
                const items = parts[1].split(',').map(s => s.trim().replace('.', ''));
                skills = [...skills, ...items];
            } else {
                skills.push(text.trim());
            }
        });
    }
    // Fallback or defaults
    if(skills.length === 0) skills = ["Software Engineering", "System Design", "IoT", "Embedded Systems", "React", "Python"];


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
                // remove pipes
                const raw = span.innerText.replace(/\|/g, '');
                tags = raw.split(' ').map(s => s.trim()).filter(s => s !== "");
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
    let status = "ONLINE / BUILDING";
    let fullBio = "";
    if (aboutDiv) {
        // Very basic text extraction
        const paragraphs = aboutDiv.querySelectorAll('p');
        if (paragraphs.length > 0) {
            // Full content
            fullBio = Array.from(paragraphs).map(p => p.innerText).join('\n\n');

            // Try to extract status
            const statusMatch = fullBio.match(/CURRENT STATUS:\s*(.*?)(\n|$)/);
            if (statusMatch) status = statusMatch[1].replace('SWE-III at', '').trim(); // Clean it up a bit

            // Short intro (first part)
            const firstP = paragraphs[0].innerText;
            const tldrMatch = firstP.match(/TLDR:(.*?);/);
            if (tldrMatch) intro = tldrMatch[1].trim();
            else intro = firstP.split('\n')[0];
        }
    }

    // 4. EXPERIENCE
    const experience = [];
    const expDiv = document.querySelector('#experience > div');
    if (expDiv) {
        const expUls = expDiv.querySelectorAll('ul');
        // Structure is weird in index.html: <ul><li><strong>Role</strong></li><ul><li>date</li><li>tech</li><li>details...</li></ul></ul>
        // The outer UL contains the Role LI and an inner UL.
        // Wait, looking at index.html:
        // <ul>
        //    <li><strong>...Role...</strong></li>
        //    <ul> ... details ... </ul>
        // </ul>
        // Actually, the structure in index.html for experience is:
        /*
        <ul>
            <li><strong ...>Google...</strong></li>
            <ul>
                <li ...>Date</li>
                <li ...>TechStack</li>
                <li>Detail 1</li>
            </ul>
        </ul>
        */
       // So we select top level ULs inside #experience > div
       // But wait, `document.querySelector('#experience > div').querySelectorAll('ul')` will return all ULs including nested ones.
       // We should iterate over children of #experience > div that are ULs.

       const topLevelUls = Array.from(expDiv.children).filter(child => child.tagName === 'UL');
       topLevelUls.forEach(ul => {
           const roleLi = ul.querySelector('li strong');
           const innerUl = ul.querySelector('ul');

           if (roleLi && innerUl) {
               const role = roleLi.innerText;
               const innerLis = innerUl.querySelectorAll('li');
               let duration = "";
               let tech = "";
               let details = [];

               innerLis.forEach((li, idx) => {
                   if (idx === 0) duration = li.innerText;
                   else if (idx === 1) tech = li.innerText;
                   else details.push(li.innerText);
               });

               experience.push({ role, duration, tech, details });
           }
       });
    }

    // 5. CONTACT & BOOK A TIME
    const contactDiv = document.querySelector('#contact p');
    let email = "mailto:ayushsingh1315@gmail.com";
    let linkedin = "https://www.linkedin.com/in/winter-soldier/";
    let github = "https://github.com/WinterSoldier13";

    if (contactDiv) {
        const links = contactDiv.querySelectorAll('a');
        links.forEach(a => {
            if(a.href.includes('mailto')) email = a.href;
            if(a.innerText.toLowerCase().includes('linkedin')) linkedin = a.href;
            if(a.innerText.toLowerCase().includes('github')) github = a.href;
        });
    }

    let bookATime = "#";
    const bookDiv = document.querySelector('#book-a-time');
    if(bookDiv) {
        const link = bookDiv.querySelector('a');
        if(link) bookATime = link.href;
    }

    return { skills, projects, about: { intro, status, fullBio }, experience, contact: { email, linkedin, github, bookATime } };
}
