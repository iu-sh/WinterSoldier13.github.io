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
            <button id="btn-immersive" class="w-full py-4 px-6 rounded-full bg-lime-400 text-neutral-900 font-bold hover:bg-lime-300 transition-all shadow-lg shadow-lime-400/20">
                UI View (Modern & Expressive)
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

    // Create Main Container
    const container = document.createElement('div');
    container.id = 'immersive-view';
    container.className = 'min-h-screen bg-[#121212] text-neutral-100 font-sans selection:bg-lime-400 selection:text-black overflow-x-hidden relative';
    document.body.appendChild(container);

    // 1. Background Elements
    const bgHtml = `
      <div class="fixed inset-0 opacity-20 pointer-events-none z-0"
           style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E&quot;)">
      </div>
      <div class="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-lime-400/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div class="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[100px] pointer-events-none"></div>
    `;
    container.insertAdjacentHTML('beforeend', bgHtml);

    // 2. Main Content Wrapper
    const mainHtml = `
      <main class="relative z-10 max-w-7xl mx-auto px-4 pb-32 pt-8 md:pt-16" id="immersive-content">
      </main>
    `;
    container.insertAdjacentHTML('beforeend', mainHtml);

    // 3. Render Sections
    renderSections();

    // 4. Render Navigation
    renderNavigation();

    // 5. Initialize Icons
    lucide.createIcons();
}

function renderSections() {
    const main = document.getElementById('immersive-content');
    const data = parseData();

    // --- HOME SECTION ---
    const homeSection = document.createElement('section');
    homeSection.id = 'section-home';
    homeSection.className = `transition-opacity duration-500 ${activeTab === 'home' ? 'opacity-100 block' : 'opacity-0 hidden'}`;

    homeSection.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Hero Card -->
        <div class="lg:col-span-8 bg-neutral-900/80 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-between min-h-[400px] hover:border-lime-400/50 transition-colors duration-300 group">
          <div>
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400/10 text-lime-400 font-medium mb-6 border border-lime-400/20">
              <i data-lucide="terminal" width="16" height="16"></i>
              <span>System Online</span>
            </div>
            <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Hi, I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-400">Ayush</span>.
            </h1>
            <p class="text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed">
              ${data.about.intro || "A Software Engineer who loves to tinker with electronics. I build bridges between code and circuits."}
            </p>
          </div>
          <div class="flex flex-wrap gap-4 mt-8">
            <button onclick="changeTab('projects')" class="px-8 py-4 bg-lime-400 text-neutral-900 rounded-full font-bold hover:bg-lime-300 transition-transform active:scale-95 flex items-center gap-2">
              View My Work <i data-lucide="code" width="20" height="20"></i>
            </button>
            <button onclick="changeTab('contact')" class="px-8 py-4 bg-neutral-800 text-white rounded-full font-bold hover:bg-neutral-700 transition-transform active:scale-95 border border-white/10">
              Contact Me
            </button>
          </div>
        </div>

        <!-- Profile Image Card -->
        <div class="lg:col-span-4 bg-violet-200 rounded-[2.5rem] overflow-hidden relative group min-h-[400px]">
          <img
            src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1000&auto=format&fit=crop"
            alt="Ayush"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-violet-900/80 to-transparent flex flex-col justify-end p-8">
            <div class="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20">
              <div class="flex items-center gap-3 text-white">
                <div class="p-2 bg-lime-400 rounded-full text-black">
                  <i data-lucide="cpu" width="20" height="20"></i>
                </div>
                <div>
                  <p class="text-xs font-bold uppercase tracking-wider opacity-80">Current Status</p>
                  <p class="font-semibold text-sm">${data.about.status || "Building Cool Stuff"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tech Stack -->
        <div class="lg:col-span-12 bg-neutral-800/50 border border-white/5 p-8 rounded-[2rem]">
           <h3 class="text-xl font-bold mb-6 flex items-center gap-2">
             <i data-lucide="zap" class="text-yellow-400"></i> Technical Arsenal
           </h3>
           <div class="flex flex-wrap gap-3">
             ${data.skills.map(skill => `
               <span class="px-5 py-3 bg-neutral-900 rounded-2xl border border-white/10 hover:border-lime-400/50 hover:text-lime-400 transition-colors cursor-default">
                 ${skill}
               </span>
             `).join('')}
           </div>
        </div>
      </div>
    `;
    main.appendChild(homeSection);

    // --- PROJECTS SECTION ---
    const projectsSection = document.createElement('section');
    projectsSection.id = 'section-projects';
    projectsSection.className = `transition-opacity duration-500 ${activeTab === 'projects' ? 'opacity-100 block' : 'opacity-0 hidden'}`;

    projectsSection.innerHTML = `
       <h2 class="text-6xl font-bold mb-12 text-center md:text-left">Selected <span class="text-lime-400">Works</span></h2>
       <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${data.projects.map((project, idx) => {
            // Generate deterministic colors based on index
            const colors = ['bg-lime-200', 'bg-violet-200', 'bg-orange-200', 'bg-cyan-200'];
            const color = colors[idx % colors.length];
            return `
            <div class="group relative bg-neutral-900 rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-lime-400/30 transition-all duration-300">
              <div class="h-64 ${color} overflow-hidden relative flex items-center justify-center">
                 <!-- Placeholder image generator -->
                 <img
                   src="https://placehold.co/600x400/202020/FFF?text=${encodeURIComponent(project.title)}"
                   alt="${project.title}"
                   class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rotate-0 group-hover:rotate-1"
                 />
                 <div class="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono border border-white/20">
                   v1.0.0
                 </div>
              </div>
              <div class="p-8">
                <div class="flex flex-wrap gap-2 mb-4">
                  ${project.tags.map(tag => `
                    <span class="text-xs font-bold uppercase tracking-wider text-lime-400 bg-lime-400/10 px-3 py-1 rounded-lg">
                      ${tag}
                    </span>
                  `).join('')}
                </div>
                <h3 class="text-3xl font-bold mb-3"><a href="${project.link}" target="_blank" class="hover:underline">${project.title}</a></h3>
                <div class="text-neutral-400 mb-6 text-sm line-clamp-3">
                    <ul>
                    ${project.details.map(d => `<li>• ${d}</li>`).join('')}
                    </ul>
                </div>
                <a href="${project.link}" target="_blank" class="flex items-center gap-2 text-white font-semibold group-hover:translate-x-2 transition-transform">
                  View Source <i data-lucide="external-link" width="16" height="16"></i>
                </a>
              </div>
            </div>
            `;
          }).join('')}
       </div>
    `;
    main.appendChild(projectsSection);

    // --- ABOUT SECTION ---
    const aboutSection = document.createElement('section');
    aboutSection.id = 'section-about';
    aboutSection.className = `transition-opacity duration-500 ${activeTab === 'about' ? 'opacity-100 block' : 'opacity-0 hidden'}`;

    aboutSection.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-lime-400 p-8 md:p-12 rounded-[2.5rem] text-black flex flex-col justify-center">
          <h2 class="text-5xl font-bold mb-6">About Me</h2>
          <p class="text-xl leading-relaxed font-medium opacity-90">
             ${data.about.fullBio || "I'm a developer who doesn't just write code, I understand the hardware it runs on."}
          </p>
        </div>
        <div class="space-y-6">
           <div class="bg-neutral-800 p-8 rounded-[2.5rem] border border-white/10 hover:bg-neutral-800/80 transition-colors">
              <h3 class="text-2xl font-bold mb-4 flex items-center gap-3">
                <i data-lucide="terminal" class="text-violet-400"></i> Experience
              </h3>
              <ul class="space-y-4 text-neutral-300">
                ${data.experience.map(job => `
                <li class="border-l-2 border-violet-400 pl-4">
                  <strong class="text-white block">${job.role}</strong>
                  <span class="text-sm opacity-60">${job.duration}</span>
                  <div class="text-xs text-lime-400 mt-1">${job.tech}</div>
                </li>
                `).join('')}
              </ul>
           </div>
           <div onclick="document.querySelector('#download a').click()" class="bg-neutral-900 p-8 rounded-[2.5rem] border border-white/10 flex items-center justify-between group cursor-pointer hover:border-lime-400 transition-colors">
              <div>
                <h3 class="text-2xl font-bold">Resume</h3>
                <p class="text-neutral-400">Download my full CV</p>
              </div>
              <div class="bg-lime-400 p-4 rounded-full text-black group-hover:scale-110 transition-transform">
                <i data-lucide="download" width="24" height="24"></i>
              </div>
           </div>
        </div>
      </div>
    `;
    main.appendChild(aboutSection);

    // --- CONTACT SECTION ---
    const contactSection = document.createElement('section');
    contactSection.id = 'section-contact';
    contactSection.className = `transition-opacity duration-500 ${activeTab === 'contact' ? 'opacity-100 block' : 'opacity-0 hidden'}`;

    contactSection.innerHTML = `
      <div class="bg-gradient-to-br from-violet-900 to-fuchsia-900 p-8 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
         <div class="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div class="relative z-10">
           <h2 class="text-5xl md:text-7xl font-bold mb-8">Let's Build Something</h2>
           <p class="text-xl md:text-2xl opacity-90 mb-12 max-w-2xl mx-auto">
             Got a project involving React, embedded systems, or just want to discuss the latest tech? Hit me up.
           </p>
           <div class="flex flex-wrap justify-center gap-4">
             <a href="${data.contact.email}" class="bg-white text-violet-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-lime-400 hover:text-black transition-colors flex items-center gap-2">
               <i data-lucide="mail" width="20"></i> Email Me
             </a>
             <a href="${data.contact.linkedin}" target="_blank" class="bg-black/30 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-black/50 transition-colors flex items-center gap-2">
               <i data-lucide="linkedin" width="20"></i> LinkedIn
             </a>
             <a href="${data.contact.github}" target="_blank" class="bg-black/30 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-black/50 transition-colors flex items-center gap-2">
               <i data-lucide="github" width="20"></i> GitHub
             </a>
           </div>
         </div>
      </div>
    `;
    main.appendChild(contactSection);
}

function renderNavigation() {
    const navItems = [
        { id: 'home', icon: 'layout-grid', label: 'Home' },
        { id: 'projects', icon: 'code', label: 'Work' },
        { id: 'about', icon: 'user', label: 'About' },
        { id: 'contact', icon: 'send', label: 'Contact' },
    ];

    const nav = document.createElement('div');
    nav.className = 'fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50';

    let navHtml = `
      <nav class="bg-neutral-900/90 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-2xl shadow-black/50 flex items-center gap-2">
    `;

    navItems.forEach(item => {
        navHtml += `
          <button
            onclick="changeTab('${item.id}')"
            id="nav-btn-${item.id}"
            class="relative px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${activeTab === item.id ? 'bg-lime-400 text-black font-bold shadow-lg shadow-lime-400/20' : 'text-neutral-400 hover:text-white hover:bg-white/5'}"
          >
            <i data-lucide="${item.icon}" width="20" height="20"></i>
            <span class="${activeTab === item.id ? 'block' : 'hidden md:block'} text-sm">${item.label}</span>
          </button>
        `;
    });

    navHtml += `</nav>`;
    nav.innerHTML = navHtml;
    document.getElementById('immersive-view').appendChild(nav);
}

// Global function to be called from onclick
window.changeTab = function(tabId) {
    activeTab = tabId;

    // Update Sections
    ['home', 'projects', 'about', 'contact'].forEach(id => {
        const el = document.getElementById(`section-${id}`);
        if (id === tabId) {
            el.classList.remove('hidden', 'opacity-0');
            el.classList.add('block', 'opacity-100');
        } else {
            el.classList.add('hidden', 'opacity-0');
            el.classList.remove('block', 'opacity-100');
        }
    });

    // Update Nav Buttons
    ['home', 'projects', 'about', 'contact'].forEach(id => {
        const btn = document.getElementById(`nav-btn-${id}`);
        const span = btn.querySelector('span');

        if (id === tabId) {
            btn.className = "relative px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 bg-lime-400 text-black font-bold shadow-lg shadow-lime-400/20";
            span.classList.remove('hidden');
            span.classList.add('block');
        } else {
            btn.className = "relative px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 text-neutral-400 hover:text-white hover:bg-white/5";
            span.classList.remove('block');
            span.classList.add('hidden', 'md:block');
        }
    });

    // Refresh icons just in case
    lucide.createIcons();

    // Scroll to top
    window.scrollTo(0, 0);
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
    // Limit to some distinct ones for display
    skills = skills.length ? skills : ["JavaScript", "React", "Node.js", "Python", "C++", "Electronics"];

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
        // Very basic text extraction
        const paragraphs = aboutDiv.querySelectorAll('p');
        if (paragraphs.length > 0) {
            fullBio = paragraphs[0].innerText;
            // Try to extract status
            const statusMatch = fullBio.match(/CURRENT STATUS: (.*?)(\n|$)/);
            if (statusMatch) status = statusMatch[1];

            // Short intro
            intro = paragraphs[0].innerText.split('\n')[1] || "Software Engineer";
        }
    }

    // 4. EXPERIENCE
    const experience = [];
    const expDiv = document.querySelector('#experience > div');
    if (expDiv) {
        const expUls = expDiv.querySelectorAll('ul');
        expUls.forEach(ul => {
            if (ul.parentElement === expDiv) {
                const roleLi = ul.querySelector('li strong');
                const detailLis = ul.querySelectorAll('ul li');

                let role = roleLi ? roleLi.innerText : "Engineer";
                let duration = "";
                let tech = "";

                if (detailLis.length > 0) duration = detailLis[0].innerText;
                if (detailLis.length > 1) tech = detailLis[1].innerText;

                experience.push({ role, duration, tech });
            }
        });
    }

    // 5. CONTACT
    const contactDiv = document.querySelector('#contact p');
    let email = "mailto:ayushsingh1315@gmail.com";
    let linkedin = "https://www.linkedin.com/in/winter-soldier/";
    let github = "https://github.com/WinterSoldier13";

    if (contactDiv) {
        const links = contactDiv.querySelectorAll('a');
        links.forEach(a => {
            if(a.href.includes('mailto')) email = a.href;
            if(a.innerText.includes('LinkedIn')) linkedin = a.href;
            if(a.innerText.includes('Github')) github = a.href;
        });
    }

    return { skills, projects, about: { intro, status, fullBio }, experience, contact: { email, linkedin, github } };
}
