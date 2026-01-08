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
    cmdInput.focus();
}

// Apply meta tags from configuration
function applyMetaTags() {
    document.title = CONFIG.meta.title;
    document.querySelector('meta[name="description"]').content = CONFIG.meta.description;
    document.querySelector('meta[name="keywords"]').content = CONFIG.meta.keywords;
    document.querySelector('meta[name="author"]').content = CONFIG.meta.author;
    document.querySelector('meta[property="og:title"]').content = CONFIG.meta.ogTitle;
    document.querySelector('meta[property="og:description"]').content = CONFIG.meta.ogDescription;
    document.querySelector('meta[name="theme-color"]').content = CONFIG.meta.themeColor;
}

// Apply terminal settings
function applyTerminalSettings() {
    document.getElementById("terminal-title").textContent = CONFIG.terminal.title;
    document.getElementById("prompt-symbol").textContent = CONFIG.terminal.prompt.symbol;
    document.getElementById("prompt-directory").textContent = CONFIG.terminal.prompt.directory;
    document.getElementById("intro-ascii").textContent = INTRO_ASCII;
    document.getElementById("welcome-message").innerHTML = CONFIG.terminal.welcomeMessage;
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

    document.getElementById("about").innerHTML = `
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

// Render Education section
function renderEducation() {
    const educationHtml = CONFIG.education.map(edu => `
        <li><strong class="text-green">${edu.institution}</strong></li>
        <p style="margin: 0; padding-left: 20px;">${edu.degree} | ${edu.year} |
${edu.grade}</p>
    `).join('');

    document.getElementById("education").innerHTML = `<ul>${educationHtml}</ul>`
;
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

    document.getElementById("projects").innerHTML = `<br><ul>${projectsHtml}</ul>`;
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

    document.getElementById("experience").innerHTML = `<ul>${experienceHtml}</ul>`;
}

// Render Skills section
function renderSkills() {
    const skillsHtml = CONFIG.skills.map(skill =>
        `<li><strong class="text-green">${skill.category}:</strong> ${skill.items}</li>`
    ).join('');

    document.getElementById("skills").innerHTML = `<ul>${skillsHtml}</ul>`;
}

// Render Achievements section
function renderAchievements() {
    document.getElementById("achievements").innerHTML = `
        <pre class="ascii-art">${CONFIG.achievements.asciiArt}</pre>
    `;
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

    document.getElementById("contact").innerHTML = `<p>${contactHtml}</p>`;
}

// Render Book a Time section
function renderBookATime() {
    if (CONFIG.bookATime && CONFIG.bookATime.url) {
        document.getElementById("book-a-time").innerHTML = `
            <p>${CONFIG.bookATime.message} <a href="${CONFIG.bookATime.url}" target="_blank">${CONFIG.bookATime.label}</a></p>
        `;
    } else {
        document.getElementById("book-a-time").innerHTML = `<p>Booking not available.</p>`;
    }
}

// Render Error section
function renderError() {
    document.getElementById("error").innerHTML = `
        <p class="text-red"><strong>${CONFIG.error.title}</strong>: ${CONFIG.error.message}</p>
        <p>${CONFIG.error.helpHint}</p>
        <pre class="ascii-art">${ERROR_ASCII}</pre>
    `;
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
        templateDiv.appendChild(cmdDiv);
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

    document.getElementById("help").innerHTML = `
        <table style="width: 100%; border-collapse: collapse;">
            ${helpRows}
        </table>
    `;
}

// Render ls section
function renderLs() {
    // Combine regular commands with custom commands
    const allCommands = [
        ...CONFIG.commands,
        ...(CONFIG.customCommands || [])
    ];
    const cmdNames = allCommands.map(cmd => cmd.name).join(', ');
    document.getElementById("ls").innerHTML = `
        <div>
            <strong class="text-green">Available Commands:</strong>
            <p>${cmdNames}</p>
        </div>
    `;
}

// Focus input on click anywhere
document.addEventListener("click", () => {
    // Don't focus if selecting text
    if (!window.getSelection().toString()) {
        cmdInput.focus();
    }
});

// Input Event Listeners
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

function runCommand() {
    const rawCmd = cmdInput.value.trim();
    const cmdVal = rawCmd.toLowerCase();

    // Clear inputs
    cmdInput.value = "";
    suggestionInput.value = "";

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
    executedCommands.appendChild(outputDiv);

    if (cmdVal !== "") {
        cmd_list.push(rawCmd);
        cmd_index = cmd_list.length;

        // Process command
        let responseContent = "";

        // Special commands
        if (cmdVal === "clear") {
            executedCommands.innerHTML = "";
            return;
        } else if (cmdVal === "download") {
            window.open(CONFIG.resumeDownloadUrl, "_blank");
            responseContent = "<p class='text-yellow'>Opening resume...</p>";
        } else if (available_cmd.includes(cmdVal)) {
            const contentElement = document.getElementById(cmdVal);
            if (contentElement) {
                responseContent = contentElement.innerHTML;
            }
        } else {
            responseContent = document.getElementById("error").innerHTML;
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
    terminalBody.scrollTop = terminalBody.scrollHeight;
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
        suggestionInput.value = "";
        return;
    }

    const match = available_cmd.find(cmd => cmd.startsWith(input));
    if (match) {
        suggestionInput.value = match;
    } else {
        suggestionInput.value = "";
    }
}

function completeCommand() {
    if (suggestionInput.value !== "") {
        cmdInput.value = suggestionInput.value;
    }
}

// Initialize when DOM is ready
window.addEventListener('load', init);
