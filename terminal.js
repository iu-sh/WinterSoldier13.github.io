// ============================================================
// Uses CONFIG, INTRO_ASCII, and ERROR_ASCII from config.js
// ============================================================

// Build available commands list from config (including custom commands)
const available_cmd = [
    ...CONFIG.commands.map(cmd => cmd.name),
    ...(CONFIG.customCommands || []).map(cmd => cmd.name),
    "help",
    "ls"
];

let cmd_list = [];
let cmd_index = 0;
const cmdInput = document.getElementById("command");
const suggestionInput = document.getElementById("suggestion");
const executedCommands = document.getElementById("executed_commands");
const terminalBody = document.querySelector(".terminal-body");

// Initialize the application
function init() {
    // Apply configuration
    applyMetaTags();
    applyTerminalSettings();
    renderContentSections();

    // Focus input
    if (cmdInput) cmdInput.focus();
}

// Apply meta tags from configuration
function applyMetaTags() {
    document.title = CONFIG.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = CONFIG.meta.description;

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.content = CONFIG.meta.keywords;

    const metaAuthor = document.querySelector('meta[name="author"]');
    if (metaAuthor) metaAuthor.content = CONFIG.meta.author;

    const metaOgTitle = document.querySelector('meta[property="og:title"]');
    if (metaOgTitle) metaOgTitle.content = CONFIG.meta.ogTitle;

    const metaOgDesc = document.querySelector('meta[property="og:description"]');
    if (metaOgDesc) metaOgDesc.content = CONFIG.meta.ogDescription;

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.content = CONFIG.meta.themeColor;
}

// Apply terminal settings
function applyTerminalSettings() {
    const titleEl = document.getElementById("terminal-title");
    if (titleEl) titleEl.textContent = CONFIG.terminal.title;

    const promptSymbol = document.getElementById("prompt-symbol");
    if (promptSymbol) promptSymbol.textContent = CONFIG.terminal.prompt.symbol;

    const promptDir = document.getElementById("prompt-directory");
    if (promptDir) promptDir.textContent = CONFIG.terminal.prompt.directory;

    const introAscii = document.getElementById("intro-ascii");
    if (introAscii) introAscii.textContent = INTRO_ASCII;

    const welcomeMsg = document.getElementById("welcome-message");
    if (welcomeMsg) welcomeMsg.innerHTML = CONFIG.terminal.welcomeMessage;
}

// Render all content sections
function renderContentSections() {
    renderAbout();
    renderEducation();
    renderProjects();
    renderExperience();
    renderSkills();
    renderAchievements();
    renderContact();
    renderBookATime();
    renderError();
    renderCustomCommands(); // Render custom commands
    renderHelp();
    renderLs();
}

// Render About section
function renderAbout() {
    const about = CONFIG.about;
    let recentWorkHtml = about.recentWork.map(work =>
        `[${work.status}] ${work.description} at <span class="text-blue">${work.location}</span>`
    ).join('<br>');

    const aboutEl = document.getElementById("about");
    if (aboutEl) {
        aboutEl.innerHTML = `
            <p>
                Hey there! I am <span class="text-green">${about.name}</span> (${about.alias}),
                ${about.role} at <span class="bold text-blue">${about.team}</span>.<br><br>
                ${about.tagline}<br>
                External work: <a href="${about.externalPortfolio.url}" target="_blank">${about.externalPortfolio.label}</a><br><br>
                <strong class="text-yellow">CURRENT STATUS</strong>: ${about.currentStatus.role} at <span class="text-blue">${about.currentStatus.location}</span><br>
                <strong class="text-yellow">Recent</strong>:<br>
                ${recentWorkHtml}
            </p>
            <p>${about.bio}</p>
        `;
    }
}

// Render Education section
function renderEducation() {
    const educationHtml = CONFIG.education.map(edu => `
        <li><strong class="text-green">${edu.institution}</strong></li>
        <p style="margin: 0; padding-left: 20px;">${edu.degree} | ${edu.year} | ${edu.grade}</p>
    `).join('');

    const eduEl = document.getElementById("education");
    if (eduEl) eduEl.innerHTML = `<ul>${educationHtml}</ul>`;
}

// Render Projects section
function renderProjects() {
    const projectsHtml = CONFIG.projects.map(project => {
        const tagsStr = project.tags.join(' | ');
        const descriptionHtml = project.description.map(d => `<li>${d}</li>`).join('');

        let nameHtml = project.name;
        if (project.url) {
            nameHtml = `<a href="${project.url}" target="_blank">${project.name}</a>`;
            if (project.secondaryUrl) {
                const names = project.name.split(' / ');
                if (names.length === 2) {
                    nameHtml = `<a href="${project.url}" target="_blank">${names[0]}</a> / <a href="${project.secondaryUrl}" target="_blank">${names[1]}</a>`;
                }
            }
        }

        return `
            <li class="proj_name">
                <strong>${nameHtml}</strong>
                <span class="text-dim"> | ${tagsStr} |</span>
                <ul>${descriptionHtml}</ul>
            </li>
            <br>
        `;
    }).join('');

    const projEl = document.getElementById("projects");
    if (projEl) projEl.innerHTML = `<br><ul>${projectsHtml}</ul>`;
}

// Render Experience section
function renderExperience() {
    const experienceHtml = CONFIG.experience.map(exp => {
        const highlightsHtml = exp.highlights.map(h => {
            if (h.label) {
                return `<li><strong>${h.label}:</strong> ${h.detail}</li>`;
            }
            return `<li>${h.detail}</li>`;
        }).join('');

        return `
            <li>
                <strong class="text-green">${exp.title}</strong>
                <div style="padding-left: 20px;">
                    <span class="text-blue italic">${exp.period}</span> | <span class="text-yellow">${exp.department}</span>
                    <ul>${highlightsHtml}</ul>
                </div>
            </li>
            <br>
        `;
    }).join('');

    const expEl = document.getElementById("experience");
    if (expEl) expEl.innerHTML = `<ul>${experienceHtml}</ul>`;
}

// Render Skills section
function renderSkills() {
    const skillsHtml = CONFIG.skills.map(skill =>
        `<li><strong class="text-green">${skill.category}:</strong> ${skill.items}</li>`
    ).join('');

    const skillsEl = document.getElementById("skills");
    if (skillsEl) skillsEl.innerHTML = `<ul>${skillsHtml}</ul>`;
}

// Render Achievements section
function renderAchievements() {
    const achEl = document.getElementById("achievements");
    if (achEl) {
        achEl.innerHTML = `
            <pre class="ascii-art">${CONFIG.achievements.asciiArt}</pre>
        `;
    }
}

// Render Contact section
function renderContact() {
    let contactHtml = `Email: <a href="mailto:${CONFIG.contact.email.address}">${CONFIG.contact.email.label}</a>`;

    // Support for internal links (Google internal)
    if (CONFIG.contact.internal && CONFIG.contact.internal.url) {
        contactHtml += `<br>Internal: <a href="${CONFIG.contact.internal.url}" target="_blank">${CONFIG.contact.internal.label}</a>`;
    }

    // Support for social links (public)
    if (CONFIG.contact.social) {
        if (CONFIG.contact.social.linkedin && CONFIG.contact.social.linkedin.url) {
            contactHtml += `<br><a href="${CONFIG.contact.social.linkedin.url}" target="_blank">${CONFIG.contact.social.linkedin.label}</a>`;
        }
        if (CONFIG.contact.social.github && CONFIG.contact.social.github.url) {
            contactHtml += ` | <a href="${CONFIG.contact.social.github.url}" target="_blank">${CONFIG.contact.social.github.label}</a>`;
        }
    }

    const contactEl = document.getElementById("contact");
    if (contactEl) contactEl.innerHTML = `<p>${contactHtml}</p>`;
}

// Render Book a Time section
function renderBookATime() {
    const bookEl = document.getElementById("book-a-time");
    if (bookEl) {
        if (CONFIG.bookATime && CONFIG.bookATime.url) {
            bookEl.innerHTML = `
                <p>${CONFIG.bookATime.message} <a href="${CONFIG.bookATime.url}" target="_blank">${CONFIG.bookATime.label}</a></p>
            `;
        } else {
            bookEl.innerHTML = `<p>Booking not available.</p>`;
        }
    }
}

// Render Error section
function renderError() {
    const errorEl = document.getElementById("error");
    if (errorEl) {
        errorEl.innerHTML = `
            <p class="text-red"><strong>${CONFIG.error.title}</strong>: ${CONFIG.error.message}</p>
            <p>${CONFIG.error.helpHint}</p>
            <pre class="ascii-art">${ERROR_ASCII}</pre>
        `;
    }
}

// Render Custom Commands - creates DOM elements for each custom command
function renderCustomCommands() {
    const customCommands = CONFIG.customCommands || [];
    const templateDiv = document.querySelector('.template');

    customCommands.forEach(cmd => {
        // Create a new div for this custom command
        const cmdDiv = document.createElement('div');
        cmdDiv.id = cmd.name;
        cmdDiv.innerHTML = cmd.content;
        if (templateDiv) templateDiv.appendChild(cmdDiv);
    });
}

// Render Help section
function renderHelp() {
    // Combine regular commands with custom commands
    const allCommands = [
        ...CONFIG.commands,
        ...(CONFIG.customCommands || [])
    ];

    const helpRows = allCommands.map(cmd =>
        `<tr><td class="text-green" style="width: 150px;">${cmd.name}</td><td>${cmd.description}</td></tr>`
    ).join('');

    const helpEl = document.getElementById("help");
    if (helpEl) {
        helpEl.innerHTML = `
            <table style="width: 100%; border-collapse: collapse;">
                ${helpRows}
            </table>
        `;
    }
}

// Render ls section
function renderLs() {
    // Combine regular commands with custom commands
    const allCommands = [
        ...CONFIG.commands,
        ...(CONFIG.customCommands || [])
    ];
    const cmdNames = allCommands.map(cmd => cmd.name).join(', ');
    const lsEl = document.getElementById("ls");
    if (lsEl) {
        lsEl.innerHTML = `
            <div>
                <strong class="text-green">Available Commands:</strong>
                <p>${cmdNames}</p>
            </div>
        `;
    }
}

// Focus input on click anywhere
document.addEventListener("click", () => {
    // Don't focus if selecting text
    if (!window.getSelection().toString() && cmdInput) {
        cmdInput.focus();
    }
});

// Input Event Listeners
if (cmdInput) {
    cmdInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            runCommand();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            navigateHistory("up");
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            navigateHistory("down");
        } else if (e.key === "Tab") {
            e.preventDefault();
            completeCommand();
        }
    });

    cmdInput.addEventListener("input", suggestCommand);
}

function runCommand() {
    const rawCmd = cmdInput.value.trim();
    const cmdVal = rawCmd.toLowerCase();

    // Clear inputs
    cmdInput.value = "";
    if (suggestionInput) suggestionInput.value = "";

    // Get prompt settings
    const promptSymbol = CONFIG.terminal.prompt.symbol;
    const promptDir = CONFIG.terminal.prompt.directory;

    // Echo command
    const outputDiv = document.createElement("div");
    outputDiv.className = "output-block";
    outputDiv.innerHTML = `
        <div class="input-line">
            <span class="prompt text-green">${promptSymbol}</span>
            <span class="prompt text-blue">${promptDir}</span>
            <span class="cmd-text">${rawCmd}</span>
        </div>
    `;
    if (executedCommands) executedCommands.appendChild(outputDiv);

    if (cmdVal !== "") {
        cmd_list.push(rawCmd);
        cmd_index = cmd_list.length;

        // Process command
        let responseContent = "";

        // Special commands
        if (cmdVal === "clear") {
            if (executedCommands) executedCommands.innerHTML = "";
            return;
        } else if (cmdVal === "download") {
            window.open(CONFIG.resumeDownloadUrl, "_blank");
            responseContent = "<p class='text-yellow'>Opening resume...</p>";
        } else if (cmdVal === "listen") {
            window.open(CONFIG.audioOverview.url, "_blank");
            responseContent = `<p class='text-yellow'>Playing audio: ${CONFIG.audioOverview.label}...</p>`;
        } else if (available_cmd.includes(cmdVal)) {
            const contentElement = document.getElementById(cmdVal);
            if (contentElement) {
                responseContent = contentElement.innerHTML;
            }
        } else {
            const errorEl = document.getElementById("error");
            if (errorEl) responseContent = errorEl.innerHTML;
        }

        // Display response
        if (responseContent) {
            const responseDiv = document.createElement("div");
            responseDiv.innerHTML = responseContent;
            outputDiv.appendChild(responseDiv);
        }
    }

    // Auto scroll
    scrollToBottom();
}

function scrollToBottom() {
    if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
}

function navigateHistory(direction) {
    if (direction === "up") {
        if (cmd_index > 0) cmd_index--;
    } else if (direction === "down") {
        if (cmd_index < cmd_list.length) cmd_index++;
    }

    if (cmd_list[cmd_index] !== undefined) {
        cmdInput.value = cmd_list[cmd_index];
    } else {
        cmdInput.value = "";
    }
    // Update suggestion when traversing history
    suggestCommand();
}

function suggestCommand() {
    const input = cmdInput.value.toLowerCase();

    if (input === "") {
        if (suggestionInput) suggestionInput.value = "";
        return;
    }

    const match = available_cmd.find(cmd => cmd.startsWith(input));
    if (match && suggestionInput) {
        suggestionInput.value = match;
    } else if (suggestionInput) {
        suggestionInput.value = "";
    }
}

function completeCommand() {
    if (suggestionInput && suggestionInput.value !== "") {
        cmdInput.value = suggestionInput.value;
    }
}

// Initialize when DOM is ready
window.addEventListener('load', init);
