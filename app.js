/* ==========================================================================
   Ayush Singh — Interactive Google Search Portfolio & Resume Engine (app.js)
   ========================================================================== */

const PORTFOLIO_DATA = {
  profile: {
    name: "Ayush Singh",
    alias: "iu-sh",
    title: "Software Engineer III (L4) · Distributed Systems & Core Infrastructure",
    company: "Google",
    location: "Munich, Germany 🇩🇪",
    email: "apparently.ayush@gmail.com",
    altEmail: "apparently.ayush@gmail.com",
    phone: "+49 1735 34 8915",
    portfolioUrl: "https://ayushsingh.is-a.dev",
    githubUrl: "https://github.com/iu-sh",
    linkedinUrl: "https://www.linkedin.com/in/iu-sh/",
    calendarUrl: "https://calendar.app.google/kgawrPecMeeKW68P8",
    driveResumeUrl: "https://drive.google.com/file/d/1BzaW9LoAIPa2qqFkLLwmWN2A_2eejs80/view?usp=sharing",
    atsDriveResumeUrl: "https://drive.google.com/file/d/18WSvCUixoKOrkHoTGbKKNCbnNQ75WrQk/view?usp=sharing",
    localResumePdfUrl: "Ayush_Singh_Distributed_Systems_Resume.pdf",
    googleDocUrl: "https://docs.google.com/document/d/18QXfAEK2MknT8VAtaSQgQZC8v5S36Nyr-UvcPY-zf2I/edit?usp=sharing",
    audioOverviewUrl: "ayush_resume.mp3",
    photoSrc: "assets/doggo.gif"
  },

  suggestions: [
    { query: "Ayush Singh - distributed systems engineer", badge: "All Results", action: "reset" },
    { query: "work experience google komprise accenture tookitaki", badge: "Experience", action: "tab:experience" },
    { query: "ytm ai host & open source systems", badge: "Projects", action: "tab:projects" },
    { query: "distributed systems c++ java go grpc", badge: "Tech Stack", action: "tab:skills" },
    { query: "Why should we hire Ayush for Distributed Systems?", badge: "✦ AI Mode", action: "tab:ai" },
    { query: "do a barrel roll", badge: "Easter Egg 🎡", action: "easter:barrel" },
    { query: "askew", badge: "Easter Egg 📐", action: "easter:askew" },
    { query: "sudo hire ayush", badge: "Terminal 💻", action: "easter:terminal" }
  ],

  experiences: [
    {
      id: "google-munich",
      company: "Google",
      companyColor: "#4285F4",
      companyInitial: "G",
      role: "Software Engineer III (L4), Distributed Systems & Core Infrastructure",
      breadcrumb: "google.com › about › careers › munich › distributed-systems-l4",
      location: "Munich, Germany",
      period: "Nov 2024 – Present",
      tags: ["C++", "Java", "Kotlin", "gRPC", "Distributed Microservices", "Edge Routing", "Batch Compute"],
      bullets: [
        "<strong>Core C++ & Java Request Frameworks:</strong> Architected high-throughput, low-latency request processors in <strong>Google's core Java backend framework</strong> and <strong>C++ Search engine</strong>, sustaining <strong>7 billion+ daily requests</strong> across Search, YouTube, and Maps.",
        "<strong>SignedOut Architecture Across 5,200+ Nodes:</strong> Standardized the Google wide SignedOut request-processing architecture defaulted across <strong>5,200+ server nodes</strong> and <strong>210+ production modules</strong>, cutting signal-processing complexity by <strong>8%</strong> and retiring <strong>1,300+ lines of code</strong>.",
        "<strong>Parallel Stream Shadow-Diffing:</strong> Implemented a parallel stream shadow-diffing and replay validation pipeline across <strong>YouTube, Play, Search, and Payments</strong>, verifying <strong>100% live migration parity</strong> across <strong>10 billion+ daily RPCs</strong> with zero regressions.",
        "<strong>Distributed Batch Compute Migration:</strong> Migrated <strong>7 critical identity and policy evaluation pipelines</strong> from synchronous request paths to distributed batch compute, reducing p99 serving tail latency by <strong>12%</strong> and reclaiming GCUs.",
        "<strong>High-Velocity Regulatory Rollouts:</strong> Spearheaded distributed backend launches for <strong>European Online Safety</strong> and <strong>US App Store regulatory compliance</strong> across Web, Android, and iOS in <strong>4 weeks</strong> across <strong>5 engineering teams</strong> (<span class='badge-inline'>★ VP of Engineering Spot Bonus</span>).",
        "<strong>Multi-Agent Triage & 3× Readability:</strong> Built an autonomous <strong>multi-agent Python diagnostic system</strong> fanning out parallel queries across rollout logs, code changes, and metrics to email root-cause reports before on-call triage; <strong>3x Google Readability</strong> (<strong>1,040+ code reviews</strong>)."
      ],
      deepDive: {
        title: "Architecture Deep-Dive: Global Request-Path Middleware & Shadow Diffing",
        content: "Designed zero-overhead request interceptors running on the critical serving path of Search, YouTube, and Maps. Built deterministic dual-path shadow evaluation pipelines comparing legacy vs. next-gen consent and privacy state machines across billions of daily RPCs with zero tail-latency regression."
      }
    },
    {
      id: "google-india",
      company: "Google",
      companyColor: "#34A853",
      companyInitial: "G",
      role: "Software Engineer II → III (L4), Distributed Storage & Observability",
      breadcrumb: "google.com › cloud-storage › distributed-file-systems › observability",
      location: "Hyderabad, India",
      period: "Jul 2022 – Nov 2024",
      tags: ["C++", "Go", "FUSE", "Distributed File Systems", "Paxos Consensus", "OpenTelemetry", "gRPC-Web"],
      bullets: [
        "<strong>Distributed File System (100K+ Services):</strong> Engineered fault-tolerant storage and replication components for <strong>Google's internal HDFS-like distributed file system</strong>, accelerating binary delivery across <strong>100,000+ production services</strong>.",
        "<strong>Overload Protection & Consensus Locks:</strong> Deployed server-side admission control, bounded semaphore RPC concurrency limits in the <strong>FUSE client daemon</strong> to prevent cascading OOMs, and decentralized <strong>Paxos snapshot locks</strong>, cutting lock contention by <strong>65%</strong>.",
        "<strong>$2.5M+ Quarterly Savings via SLA/SLO Platform:</strong> Designed an automated <strong>SLA/SLO compliance and observability platform</strong> correlating distributed traces and metrics across <strong>40+ product teams</strong>, eliminating manual audits and generating <strong>$2.5M+ in quarterly savings</strong>.",
        "<strong>OpenTelemetry Collector & Go Gateway:</strong> Co-developed a real-time <strong>OpenTelemetry</strong> trace collector over gRPC and an encrypted <strong>Go asset gateway</strong> sustaining <strong>50,000+ requests per second</strong> with zero-downtime key rotation.",
        "<strong>Chrome 3P Cookie Deprecation & Fast-Track L4:</strong> Led technical readiness and dependency analysis for Chrome third-party cookie deprecation across <strong>120+ enterprise services</strong> (<strong>approved by Google CEO</strong>) and earned a <span class='badge-inline'>Fast-Track Promotion to L4 in 15 Months</span>."
      ],
      deepDive: {
        title: "Architecture Deep-Dive: FUSE Concurrency Limiting & Lock-Free Snapshot Metadata",
        content: "Prevented cascading thundering-herd overload on storage metadata servers by introducing adaptive token-bucket admission control and bounded semaphore RPC queues in the POSIX/FUSE client daemon, while decoupling snapshot metadata synchronization from centralized Paxos lock servers."
      }
    },
    {
      id: "komprise",
      company: "Komprise",
      companyColor: "#FBBC05",
      companyInitial: "K",
      role: "Software Engineer Intern (Distributed Storage Infrastructure)",
      breadcrumb: "komprise.com › engineering › distributed-data-management",
      location: "Bengaluru, India",
      period: "Jan 2022 – Jun 2022",
      tags: ["Python", "Multi-Threading", "Distributed Systems Testing", "CI/CD", "NAS/Object Storage"],
      bullets: [
        "<strong>Parallel Distributed Test Execution:</strong> Built a multi-threaded automation framework executing in parallel across distributed storage nodes, cutting build-verification runtime by <strong>87.5%</strong> and increasing critical bug detection coverage by <strong>60%</strong>."
      ],
      deepDive: null
    },
    {
      id: "accenture",
      company: "Accenture",
      companyColor: "#A100FF",
      companyInitial: "A",
      role: "Data Engineer Intern (Cloud Data Infrastructure)",
      breadcrumb: "accenture.com › cloud-data › aws-s3-snowflake-etl",
      location: "India",
      period: "May 2021 – Jul 2021",
      tags: ["AWS S3", "Snowflake", "Distributed ETL", "Python", "SQL", "Rasa NLP"],
      bullets: [
        "<strong>10TB+ High-Volume Cloud ETL:</strong> Designed optimized distributed ETL pipelines transferring <strong>10TB+ datasets from AWS S3 to Snowflake</strong> with real-time BI analytics and NLP automation cutting manual reporting time by <strong>70%</strong>."
      ],
      deepDive: null
    },
    {
      id: "tookitaki",
      company: "Tookitaki",
      companyColor: "#EA4335",
      companyInitial: "T",
      role: "Software Engineer Intern (Real-Time Distributed Streaming)",
      breadcrumb: "tookitaki.com › streaming-infra › apache-spark-activemq",
      location: "Singapore",
      period: "Oct 2020 – Jan 2021",
      tags: ["Apache Spark Structured-Streaming", "Scala", "ActiveMQ", "JMS", "Exactly-Once Semantics"],
      bullets: [
        "<strong>94% Streaming Latency Reduction (850ms → <50ms):</strong> Built a real-time <strong>Apache Spark Structured-Streaming + ActiveMQ</strong> pipeline with custom connection-pooled JMS clients and fault-tolerant <strong>exactly-once recovery</strong>."
      ],
      deepDive: null
    },
    {
      id: "excain",
      company: "Excain LLP",
      companyColor: "#50FA7B",
      companyInitial: "E",
      role: "Machine Learning Engineer Intern (Computer Vision & OCR)",
      breadcrumb: "excain.com › ml-engineering › medical-ocr-pipeline",
      location: "India",
      period: "Jul 2020 – Sep 2020",
      tags: ["Python", "TensorFlow", "OpenCV", "Deep Learning", "OCR"],
      bullets: [
        "<strong>End-to-End Handwritten Medical OCR:</strong> Engineered a deep learning computer-vision pipeline transforming complex handwritten medical prescriptions into structured digital text."
      ],
      deepDive: null
    }
  ],

  projects: [
    {
      id: "ytm-ai-host",
      rank: "#1 Featured Open-Source",
      name: "1. YTM AI Host — Real-Time (<100ms) AI Radio Jockey & Audio Streaming Engine",
      url: "https://github.com/iu-sh/ytm_ai_host",
      breadcrumb: "github.com › iu-sh › ytm_ai_host",
      tags: ["TypeScript", "Python", "Gemini API", "WebLLM / WebGPU", "On-Device Inference", "Kokoro JS / XTTS v2", "Real-Time Audio Pre-Fetching"],
      bullets: [
        "<strong>Sub-100ms Streaming AI Architecture:</strong> Built a modular local streaming server and Chrome extension for <strong>YouTube Music & Spotify</strong>, combining <strong>on-device WebGPU/WebLLM inference</strong>, multi-engine neural TTS (Kokoro JS, XTTS v2, Chrome TTS), and intelligent lookahead pre-fetching/caching for <strong><100ms real-time audio transitions</strong>.",
        "<strong>Privacy-First Local Server Mode:</strong> Designed a pluggable Python + WebSocket local inference bridge enabling 100% local LLM + voice synthesis without external API latency."
      ]
    },
    {
      id: "linkinjms",
      rank: "High-Throughput Streaming",
      name: "2. LinkinJMS — High-Performance Apache Spark & ActiveMQ Streaming Connector",
      url: "https://github.com/iu-sh/linkinJMS",
      breadcrumb: "github.com › iu-sh › linkinJMS",
      tags: ["Scala", "Apache Spark", "ActiveMQ", "JMS", "AMQP / TLS", "Exactly-Once Delivery"],
      bullets: [
        "<strong>Sub-50ms Bidirectional Streaming:</strong> Engineered an open-source Apache Spark Structured-Streaming connector for ActiveMQ brokers achieving <strong><50ms message latency</strong> with <strong>exactly-once delivery guarantees</strong>, AMQP/TLS encryption, connection pooling, and automatic failover."
      ]
    },
    {
      id: "multi-agent-triage",
      rank: "Production AI Infra",
      name: "3. Autonomous Multi-Agent Incident & Oncall Triage System (Google)",
      url: "https://docs.google.com/document/d/18QXfAEK2MknT8VAtaSQgQZC8v5S36Nyr-UvcPY-zf2I/edit",
      breadcrumb: "google.com › internal-infra › autonomous-oncall-triage",
      tags: ["Python", "Multi-Agent Systems", "Distributed Tracing", "Time-Series Diagnostics", "Automated RCA"],
      bullets: [
        "<strong>Zero-Touch Root Cause Analysis:</strong> Architected a production Python multi-agent diagnostic system that fans out parallel queries across recent code changes, rollout logs, and time-series metrics to email high-precision root-cause reports before oncallers even open the alert."
      ]
    },
    {
      id: "pika-robot",
      rank: "Robotics & Edge AI",
      name: "4. PIKA — Autonomous Computer-Vision Navigation Robot",
      url: "https://www.youtube.com/watch?v=0Fff2ncdbPo",
      breadcrumb: "youtube.com › watch › pika-autonomous-robot",
      tags: ["TensorFlow", "OpenCV", "Keras", "Raspberry Pi", "Embedded Systems", "Sensor Fusion"],
      bullets: [
        "<strong>Onboard Edge Vision & Control:</strong> Built a physical autonomous rover powered by a Raspberry Pi that fuses live camera feeds and ultrasonic sensor telemetry through an onboard CNN to navigate unstructured environments in real time."
      ]
    },
    {
      id: "gtav-self-driving",
      rank: "Computer Vision",
      name: "5. Autonomous Self-Driving Agent for Grand Theft Auto V",
      url: "https://github.com/iu-sh",
      breadcrumb: "github.com › iu-sh › gta5-self-driving-agent",
      tags: ["Python", "TensorFlow", "InceptionResNetV2", "OpenCV", "Transfer Learning"],
      bullets: [
        "<strong>Real-Time Lane & Obstacle Perception:</strong> Trained a transfer-learning driving policy on InceptionResNetV2 using screen-captured frame buffers to autonomously steer, accelerate, and brake in GTA-V traffic."
      ]
    },
    {
      id: "professor-mirror",
      rank: "Full-Stack Backend",
      name: "6. Professor-Mirror & ANARC Robotics Club Platform",
      url: "https://github.com/iu-sh/professorMirror",
      breadcrumb: "github.com › iu-sh › professorMirror",
      tags: ["Node.js", "Kotlin", "MongoDB", "Firebase", "REST APIs", "Android"],
      bullets: [
        "<strong>Scalable Campus Platforms:</strong> Built the Node.js + MongoDB backend for Professor-Mirror (academic review platform) and the native Kotlin/Java Android app for NIT Agartala's ASIMOV Robotics Club (ANARC) with real-time messaging and inventory management."
      ]
    }
  ],

  paa: [
    {
      q: "What scale of distributed systems does Ayush build at Google?",
      a: "His C++ and Java middleware runs on the critical request path of Google Search, YouTube, and Maps (~5,200 production microservice nodes across 210+ modules), and his distributed storage systems (HDFS-like binary file system & FUSE clients) serve 100,000+ internal Google services."
    },
    {
      q: "How fast was Ayush promoted at Google and what is his code review authority?",
      a: "Ayush was promoted from L3 (SWE II) to L4 (SWE III) in just 15 months (~1.2 years) with top-performer recognition, a VP of Engineering Spot Bonus, and 7× peer bonuses. He holds 3× Google Readability certifications (C++, TypeScript, and API Design) and has reviewed 1,040+ production CLs/PRs."
    },
    {
      q: "What measurable systems ROI and latency wins has Ayush delivered?",
      a: "• $2.5M+ per quarter saved via an automated SLA/SLO observability & compliance enforcement platform.\n• 94% streaming latency reduction (850ms → <50ms) in Apache Spark + ActiveMQ pipelines.\n• 40% reduction in RPC signal-processing complexity across ~5,200 microservice nodes.\n• 87.5% faster distributed storage build-verification runtime via multi-threaded parallel test execution."
    },
    {
      q: "Where did Ayush study and what are his algorithmic & leadership credentials?",
      a: "He graduated from the National Institute of Technology (NIT) Agartala with a B.Tech in Electrical Engineering (CGPA: 9.32 / 10). He ranked #1 in his Institute and #72 Worldwide on GeeksForGeeks (top 0.07% among 100,000+ developers), was 1 of 11 students across India selected for the Indian Academy of Sciences (IASc) FASTSF Fellowship, 1 of 50 for Google ExploreML, and founded NIT Agartala's Google Developer Student Club (DSC)."
    },
    {
      q: "How can recruiters or engineering managers schedule a conversation with Ayush?",
      a: "You can click 'Book 1:1 Call' in the top bar or Knowledge Panel (https://calendar.app.google/kgawrPecMeeKW68P8), open his resume on Google Drive, or email apparently.ayush@gmail.com directly."
    }
  ],

  skills: {
    languages: ["C++", "Java", "Go", "TypeScript", "Python", "Scala", "Kotlin", "SQL"],
    distributed: [
      "gRPC",
      "Protobuf",
      "Distributed FS (HDFS / FUSE)",
      "Spanner",
      "Paxos / Raft Consensus",
      "Apache Spark",
      "Kafka",
      "ActiveMQ",
      "Snowflake",
      "Redis"
    ],
    cloudAi: [
      "Kubernetes",
      "Docker",
      "OpenTelemetry",
      "GCP",
      "AWS",
      "Terraform",
      "CI/CD",
      "WebGPU / LLM Agents"
    ]
  },

  aiKnowledgeBase: {
    "scale": "Ayush operates at true planet scale at Google: his C++ and Java request-path processors power Google's core Java backend framework and C++ Search serving engine (serving billions of users across ~5,200 production microservice nodes), and his work on Google's internal HDFS-like distributed file system serves 100,000+ internal services.",
    "hire": "3 reasons to hire Ayush for a Distributed Systems role:\n1. Proven Production Scale: Shipped C++/Java/Go infrastructure across 100K+ services and ~5,200 microservice nodes at Google.\n2. Extreme Velocity & Code Quality: Promoted L3 → L4 in 15 months, VP Spot Bonus recipient, 3× Google Readability (C++, TS, API), and 1,040+ reviews.\n3. Measurable Bottom-Line Impact: $2.5M+/quarter saved via SLA/SLO observability automation and 94% streaming latency reduction (850ms → <50ms).",
    "ytm": "YTM AI Host (github.com/iu-sh/ytm_ai_host) is Ayush's #1 featured open-source project: a real-time (<100ms) AI Radio Jockey & audio streaming engine for YouTube Music and Spotify. It combines on-device WebGPU/WebLLM inference, Gemini API, multi-engine neural TTS (Kokoro JS, XTTS v2), and lookahead pre-fetching for seamless <100ms transitions.",
    "storage": "At Google (2022–2024) and Komprise (2022), Ayush specialized in Distributed Storage Infrastructure: he built replication, FUSE client semaphore RPC concurrency limiting, server-side admission control, and lock-free snapshot migrations off Paxos lock services for a distributed file system backing 100,000+ services.",
    "contact": "You can reach Ayush directly at apparently.ayush@gmail.com, connect on LinkedIn (linkedin.com/in/iu-sh), check his code on GitHub (github.com/iu-sh), or schedule a 1:1 call via https://calendar.app.google/kgawrPecMeeKW68P8."
  }
};

// ============================================================================
// DOM Initialization & Interactive Controllers
// ============================================================================

let currentPhotoIndex = 0;
let activeTab = "all";
let activeSkillFilter = null;

document.addEventListener("DOMContentLoaded", () => {
  renderExperience();
  renderProjects();
  renderPAA();
  renderSkills();
  setupSearchBar();
  setupTabs();
  setupAudioPlayer();
  setupTerminal();
  setupRecruiterModal();
  setupPopovers();
  setupAIChat();
  setupKeyboardShortcuts();
  setupScrollHeader();
  animateCounters();
});

// 1. Render Work Experience Cards
function renderExperience(filterText = "") {
  const container = document.getElementById("experience-list");
  if (!container) return;

  const q = filterText.trim().toLowerCase();
  const filtered = PORTFOLIO_DATA.experiences.filter(exp => {
    if (!q) return true;
    const hay = `${exp.company} ${exp.role} ${exp.location} ${exp.tags.join(" ")} ${exp.bullets.join(" ")}`.toLowerCase();
    return hay.includes(q);
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="padding:18px; color:var(--text-muted); font-size:13.5px;">No work experience entries matched "<strong>${filterText}</strong>". <button onclick="resetAllFilters()" style="background:none;border:none;color:var(--google-blue);cursor:pointer;text-decoration:underline;">Reset filter</button></div>`;
    return;
  }

  container.innerHTML = filtered.map((exp) => `
    <article class="serp-result-card" id="${exp.id}" data-exp-id="${exp.id}">
      <div class="result-cite-row">
        <div class="company-favicon" style="color: ${exp.companyColor}; border-color: ${exp.companyColor}44;">
          ${exp.companyInitial}
        </div>
        <div class="cite-meta">
          <span class="cite-company">${exp.company}</span>
          <span class="cite-url">${exp.breadcrumb}</span>
        </div>
      </div>

      <a href="#${exp.id}" class="result-title" onclick="event.preventDefault(); ${exp.deepDive ? `toggleDeepDive('${exp.id}')` : `scrollToElement('${exp.id}')`}">
        ${exp.company} — ${exp.role}
      </a>

      <div class="result-meta-bar">
        <span class="meta-location">${exp.location} · ${exp.period}</span>
        <span class="meta-tech">· ${exp.tags.join(" · ")}</span>
      </div>

      <ul class="result-bullets">
        ${exp.bullets.map(b => `<li>${b}</li>`).join("")}
      </ul>

      ${exp.deepDive ? `
        <button class="deep-dive-toggle" onclick="toggleDeepDive('${exp.id}')">
          <span>⚡</span>
          <span id="dd-btn-${exp.id}">View Systems Architecture Note</span>
        </button>
        <div class="deep-dive-box" id="dd-box-${exp.id}">
          <strong style="color: var(--google-blue); display:block; margin-bottom:4px;">${exp.deepDive.title}</strong>
          ${exp.deepDive.content}
        </div>
      ` : ""}
    </article>
  `).join("");
}

window.toggleDeepDive = function(expId) {
  const box = document.getElementById(`dd-box-${expId}`);
  const btn = document.getElementById(`dd-btn-${expId}`);
  if (!box) return;
  const isOpen = box.classList.toggle("open");
  if (btn) {
    btn.textContent = isOpen ? "Hide Systems Architecture Note" : "View Systems Architecture Note";
  }
};

window.scrollToElement = function(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
};

// 2. Render Selected Open-Source & Agentic Systems
function renderProjects(filterText = "") {
  const container = document.getElementById("projects-list");
  if (!container) return;

  const q = filterText.trim().toLowerCase();
  const filtered = PORTFOLIO_DATA.projects.filter(proj => {
    if (!q) return true;
    const hay = `${proj.name} ${proj.tags.join(" ")} ${proj.bullets.join(" ")}`.toLowerCase();
    return hay.includes(q);
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="padding:18px; color:var(--text-muted); font-size:13.5px;">No projects matched "<strong>${filterText}</strong>". <button onclick="resetAllFilters()" style="background:none;border:none;color:var(--google-blue);cursor:pointer;text-decoration:underline;">Reset filter</button></div>`;
    return;
  }

  container.innerHTML = filtered.map(proj => `
    <article class="serp-result-card" id="${proj.id}">
      <div class="result-cite-row">
        <div class="company-favicon" style="color: #8ab4f8;">✦</div>
        <div class="cite-meta">
          <span class="cite-company">${proj.rank}</span>
          <span class="cite-url">${proj.breadcrumb}</span>
        </div>
      </div>

      <a href="${proj.url}" target="_blank" rel="noopener noreferrer" class="result-title">
        ${proj.name} <span style="font-size: 13px; color: #34a853; font-weight: 500; margin-left: 6px;">↗ Open Link</span>
      </a>

      <div class="result-meta-bar">
        <span class="meta-tech">${proj.tags.join(" · ")}</span>
      </div>

      <ul class="result-bullets">
        ${proj.bullets.map(b => `<li>${b}</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

// 3. Render People Also Ask Accordion
function renderPAA() {
  const container = document.getElementById("paa-list");
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.paa.map((item, idx) => `
    <div class="paa-item ${idx === 0 ? 'open' : ''}" id="paa-item-${idx}">
      <button class="paa-question" onclick="togglePAA(${idx})">
        <span>${item.q}</span>
        <span class="paa-chevron">⌄</span>
      </button>
      <div class="paa-answer">
        ${item.a.replace(/\n/g, "<br>")}
      </div>
    </div>
  `).join("");
}

window.togglePAA = function(idx) {
  const item = document.getElementById(`paa-item-${idx}`);
  if (item) {
    item.classList.toggle("open");
  }
};

// 4. Render Technical Skills in Knowledge Panel
function renderSkills() {
  const kpLang = document.getElementById("kp-skills-languages");
  const kpDist = document.getElementById("kp-skills-distributed");
  const kpCloud = document.getElementById("kp-skills-cloud");

  const makeChips = (arr) => arr.map(skill => `
    <span class="skill-chip ${activeSkillFilter === skill ? 'active' : ''}" onclick="filterBySkill('${skill.replace(/'/g, "\\'")}')">${skill}</span>
  `).join("");

  if (kpLang) kpLang.innerHTML = makeChips(PORTFOLIO_DATA.skills.languages);
  if (kpDist) kpDist.innerHTML = makeChips(PORTFOLIO_DATA.skills.distributed);
  if (kpCloud) kpCloud.innerHTML = makeChips(PORTFOLIO_DATA.skills.cloudAi);
}

window.filterBySkill = function(skill) {
  const input = document.getElementById("search-input");
  switchTab("all", false);
  if (activeSkillFilter === skill) {
    activeSkillFilter = null;
    if (input) input.value = "Ayush Singh - distributed systems engineer";
    renderExperience("");
    renderProjects("");
    showToast("Cleared skill filter — showing all results");
  } else {
    activeSkillFilter = skill;
    const keywordMap = {
      "Distributed FS (HDFS / FUSE)": "FUSE",
      "Paxos / Raft Consensus": "Paxos",
      "WebGPU / LLM Agents": "WebGPU",
      "High-Throughput gRPC": "gRPC",
      "Apache Spark Streaming": "Spark",
      "Paxos & Consensus": "Paxos",
      "Protobuf": "gRPC",
      "Spanner": "Google",
      "Kafka": "Streaming",
      "Redis": "Google",
      "Kubernetes": "Google",
      "Docker": "Google",
      "GCP": "Google",
      "AWS": "AWS S3",
      "Terraform": "Google"
    };
    const keyword = keywordMap[skill] || skill;
    if (input) input.value = `Ayush Singh - ${skill}`;
    renderExperience(keyword);
    renderProjects(keyword);
    showToast(`🔍 Filtered results by skill: ${skill}`);
  }
  renderSkills();
};

window.resetAllFilters = function() {
  activeSkillFilter = null;
  const input = document.getElementById("search-input");
  if (input) input.value = "Ayush Singh - distributed systems engineer";
  switchTab("all", false);
  renderExperience("");
  renderProjects("");
  renderSkills();
};

// 5. Search Bar & Autocomplete Engine
function setupSearchBar() {
  const input = document.getElementById("search-input");
  const clearBtn = document.getElementById("search-clear-btn");
  const dropdown = document.getElementById("search-dropdown");
  const searchBar = document.getElementById("search-bar-box");

  if (!input || !dropdown) return;

  function renderSuggestions(filter = "") {
    const q = filter.trim().toLowerCase();
    const list = PORTFOLIO_DATA.suggestions.filter(s =>
      !q || q === "ayush singh - distributed systems engineer" || s.query.toLowerCase().includes(q)
    );

    dropdown.innerHTML = list.map((s) => `
      <div class="suggestion-item" onmousedown="executeSuggestion('${s.action}', '${s.query.replace(/'/g, "\\'")}')">
        <div class="suggestion-left">
          <span style="color: var(--text-muted);">🔍</span>
          <span>${s.query}</span>
        </div>
        <span class="suggestion-badge">${s.badge}</span>
      </div>
    `).join("");
  }

  input.addEventListener("focus", () => {
    renderSuggestions(input.value);
    dropdown.classList.add("active");
    searchBar.classList.add("dropdown-open");
  });

  input.addEventListener("blur", () => {
    setTimeout(() => {
      dropdown.classList.remove("active");
      searchBar.classList.remove("dropdown-open");
    }, 180);
  });

  input.addEventListener("input", (e) => {
    const val = e.target.value;
    renderSuggestions(val);
    handleLiveSearch(val);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      dropdown.classList.remove("active");
      searchBar.classList.remove("dropdown-open");
      handleLiveSearch(input.value, true);
    } else if (e.key === "Escape") {
      dropdown.classList.remove("active");
      searchBar.classList.remove("dropdown-open");
      input.blur();
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      input.value = "";
      activeSkillFilter = null;
      renderSkills();
      renderExperience("");
      renderProjects("");
      input.focus();
    });
  }
}

window.executeSuggestion = function(action, queryText) {
  const input = document.getElementById("search-input");
  if (input) input.value = queryText;

  if (action === "reset") {
    resetAllFilters();
  } else if (action.startsWith("tab:")) {
    const tabName = action.split(":")[1];
    switchTab(tabName);
  } else if (action === "easter:barrel") {
    triggerBarrelRoll();
  } else if (action === "easter:askew") {
    triggerAskew();
  } else if (action === "easter:terminal") {
    openTerminalModal();
  }
};

function handleLiveSearch(rawQuery, isEnter = false) {
  const q = rawQuery.trim().toLowerCase();

  if (q === "do a barrel roll" || q === "barrel roll") {
    triggerBarrelRoll();
    return;
  }
  if (q === "askew" || q === "tilt") {
    triggerAskew();
    return;
  }
  if (isEnter && (q.startsWith("sudo ") || q === "terminal" || q === "bash" || q === "help")) {
    openTerminalModal();
    return;
  }

  if (!q || q === "ayush singh - distributed systems engineer" || q === "ayush singh") {
    renderExperience("");
    renderProjects("");
    return;
  }

  renderExperience(q);
  renderProjects(q);
}

// 6. Navigation Tabs & Knowledge Panel Pills Controller
function setupTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      switchTab(target);
    });
  });
}

window.switchTab = function(tabName, shouldScroll = true) {
  activeTab = tabName;
  document.querySelectorAll(".nav-tab").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
  });

  // Also sync Knowledge Panel Overview / Experience / Skills pills
  document.querySelectorAll(".kp-pill-btn").forEach(pill => {
    const pTab = pill.getAttribute("data-kp-tab");
    pill.classList.toggle("active", (tabName === "all" && pTab === "overview") || pTab === tabName);
  });

  const aiOverview = document.getElementById("section-ai-overview");
  const aiInteractive = document.getElementById("section-ai-interactive");
  const topStats = document.getElementById("section-top-stats");
  const expSection = document.getElementById("section-experience");
  const projSection = document.getElementById("section-projects");
  const paaSection = document.getElementById("section-paa");

  if (aiOverview) aiOverview.style.display = "block";
  if (aiInteractive) aiInteractive.style.display = tabName === "ai" ? "block" : "none";
  if (topStats) topStats.style.display = "grid";
  if (expSection) expSection.style.display = "block";
  if (projSection) projSection.style.display = "block";
  if (paaSection) paaSection.style.display = "block";

  if (tabName === "experience") {
    if (aiOverview) aiOverview.style.display = "none";
    if (projSection) projSection.style.display = "none";
    if (shouldScroll && expSection) expSection.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (tabName === "projects") {
    if (aiOverview) aiOverview.style.display = "none";
    if (topStats) topStats.style.display = "none";
    if (expSection) expSection.style.display = "none";
    if (shouldScroll && projSection) projSection.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (tabName === "skills") {
    const kpSkills = document.getElementById("kp-skills-section");
    if (kpSkills) {
      if (shouldScroll) kpSkills.scrollIntoView({ behavior: "smooth", block: "center" });
      kpSkills.style.boxShadow = "inset 0 0 0 2px #8ab4f8";
      setTimeout(() => { kpSkills.style.boxShadow = "none"; }, 1800);
    }
  } else if (tabName === "ai") {
    if (aiInteractive && shouldScroll) {
      aiInteractive.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  } else if (tabName === "all" && shouldScroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// 7. Audio Overview Player (Playing ayush_resume.mp3 inside AI Overview)
function setupAudioPlayer() {
  const toggleBtns = document.querySelectorAll(".trigger-audio-overview");
  const drawer = document.getElementById("audio-drawer");
  const audioEl = document.getElementById("resume-audio-element");

  if (!drawer) return;

  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const isOpen = drawer.classList.toggle("open");
      if (isOpen && audioEl && audioEl.paused) {
        audioEl.play().catch(() => {});
      } else if (!isOpen && audioEl && !audioEl.paused) {
        audioEl.pause();
      }
    });
  });
}

// 8. Popovers: Google Apps Launcher (⋮⋮⋮) & Settings Gear (⚙)
function setupPopovers() {
  const appsBtn = document.getElementById("google-apps-btn");
  const appsMenu = document.getElementById("google-apps-menu");
  const gearBtn = document.getElementById("settings-gear-btn");
  const gearMenu = document.getElementById("settings-gear-menu");

  if (appsBtn && appsMenu) {
    appsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (gearMenu) gearMenu.classList.remove("open");
      appsMenu.classList.toggle("open");
    });
  }

  if (gearBtn && gearMenu) {
    gearBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (appsMenu) appsMenu.classList.remove("open");
      gearMenu.classList.toggle("open");
    });
  }

  document.addEventListener("click", (e) => {
    if (appsMenu && !appsMenu.contains(e.target) && e.target !== appsBtn) {
      appsMenu.classList.remove("open");
    }
    if (gearMenu && !gearMenu.contains(e.target) && e.target !== gearBtn) {
      gearMenu.classList.remove("open");
    }
  });
}

// 10. Recruiter Action Modal (`hiring` button + visible CTAs)
function setupRecruiterModal() {
  const openBtns = document.querySelectorAll(".open-recruiter-modal");
  const closeBtn = document.getElementById("close-recruiter-modal");
  const modal = document.getElementById("recruiter-modal");

  openBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (modal) modal.classList.add("open");
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("open"));
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
  }
}

window.copyToClipboard = function(text, label = "Email") {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`✅ Copied ${label}: ${text}`);
    }).catch(() => {
      fallbackCopy(text, label);
    });
  } else {
    fallbackCopy(text, label);
  }
};

function fallbackCopy(text, label) {
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
  showToast(`✅ Copied ${label}: ${text}`);
}

// 11. Easter Eggs: Barrel Roll, Askew, Toast Notifications
window.triggerBarrelRoll = function() {
  document.body.classList.remove("barrel-roll");
  void document.body.offsetWidth;
  document.body.classList.add("barrel-roll");
  showToast("🎡 Doing a Google Search Barrel Roll!");
  setTimeout(() => {
    document.body.classList.remove("barrel-roll");
  }, 1500);
};

window.triggerAskew = function() {
  const isAskew = document.body.classList.toggle("askew-mode");
  showToast(isAskew ? "📐 Askew Mode Activated! (Click again to straighten)" : "📐 Page alignment restored!");
};

window.showToast = function(message) {
  let toast = document.getElementById("easter-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "easter-toast";
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #1e3a5f;
      color: #e8eaed;
      border: 1px solid #8ab4f8;
      padding: 12px 18px;
      border-radius: 12px;
      font-size: 13.5px;
      font-weight: 500;
      box-shadow: 0 10px 30px rgba(0,0,0,0.85);
      z-index: 250;
      transition: opacity 0.25s ease, transform 0.25s ease;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
  }, 3200);
};

// 12. Interactive AI Mode Assistant
function setupAIChat() {
  const chips = document.querySelectorAll(".ai-prompt-chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const topic = chip.getAttribute("data-topic");
      const question = chip.textContent;
      appendAIMessage(question, "user");
      setTimeout(() => {
        const reply = PORTFOLIO_DATA.aiKnowledgeBase[topic] || PORTFOLIO_DATA.aiKnowledgeBase["hire"];
        appendAIMessage(reply, "bot");
      }, 220);
    });
  });

  const aiForm = document.getElementById("ai-custom-form");
  const aiInput = document.getElementById("ai-custom-input");
  if (aiForm && aiInput) {
    aiForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = aiInput.value.trim();
      if (!q) return;
      aiInput.value = "";
      appendAIMessage(q, "user");
      const low = q.toLowerCase();
      let topic = "hire";
      if (low.includes("scale") || low.includes("node") || low.includes("search") || low.includes("c++") || low.includes("java")) topic = "scale";
      else if (low.includes("ytm") || low.includes("music") || low.includes("open source") || low.includes("project")) topic = "ytm";
      else if (low.includes("storage") || low.includes("file") || low.includes("fuse") || low.includes("paxos")) topic = "storage";
      else if (low.includes("email") || low.includes("contact") || low.includes("call") || low.includes("reach")) topic = "contact";

      setTimeout(() => {
        appendAIMessage(PORTFOLIO_DATA.aiKnowledgeBase[topic], "bot");
      }, 240);
    });
  }
}

function appendAIMessage(text, sender) {
  const container = document.getElementById("ai-chat-messages");
  if (!container) return;
  const div = document.createElement("div");
  div.className = `ai-msg ${sender}`;
  div.innerHTML = text.replace(/\n/g, "<br>");
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// 13. Interactive Terminal Modal (`guest@TheFlyingDutchman`)
function setupTerminal() {
  const openBtns = document.querySelectorAll(".open-terminal-trigger");
  const closeBtn = document.getElementById("close-terminal-btn");
  const modal = document.getElementById("terminal-modal");
  const input = document.getElementById("terminal-cli-input");

  openBtns.forEach(btn => btn.addEventListener("click", openTerminalModal));
  if (closeBtn) closeBtn.addEventListener("click", closeTerminalModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeTerminalModal();
    });
  }

  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = input.value.trim();
        input.value = "";
        runTerminalCommand(cmd);
      } else if (e.key === "Escape") {
        closeTerminalModal();
      }
    });
  }
}

window.openTerminalModal = function() {
  const modal = document.getElementById("terminal-modal");
  const input = document.getElementById("terminal-cli-input");
  if (modal) {
    modal.classList.add("open");
    setTimeout(() => { if (input) input.focus(); }, 80);
  }
};

window.closeTerminalModal = function() {
  const modal = document.getElementById("terminal-modal");
  if (modal) modal.classList.remove("open");
};

function runTerminalCommand(rawCmd) {
  const out = document.getElementById("terminal-output");
  if (!out) return;

  const cmd = rawCmd.toLowerCase();
  const cmdLine = document.createElement("div");
  cmdLine.innerHTML = `<span style="color:#50fa7b;">guest@TheFlyingDutchman</span>:<span style="color:#8be9fd;">~</span>$ ${rawCmd}`;
  out.appendChild(cmdLine);

  const resp = document.createElement("div");
  resp.style.marginBottom = "12px";
  resp.style.color = "#bdc1c6";

  if (cmd === "help" || cmd === "ls") {
    resp.innerHTML = `Available commands: <strong style="color:#f1fa8c;">about</strong>, <strong style="color:#f1fa8c;">experience</strong>, <strong style="color:#f1fa8c;">projects</strong>, <strong style="color:#f1fa8c;">skills</strong>, <strong style="color:#f1fa8c;">download</strong>, <strong style="color:#f1fa8c;">contact</strong>, <strong style="color:#f1fa8c;">full-terminal</strong>, <strong style="color:#f1fa8c;">sudo hire ayush</strong>, <strong style="color:#f1fa8c;">clear</strong>`;
  } else if (cmd === "about" || cmd === "whoami") {
    resp.innerHTML = `Ayush Singh (iu-sh) — Software Engineer III (L4) at Google, Munich. Building planet-scale C++/Java/Go distributed systems, HDFS-like storage (100K+ services), and real-time AI streaming engines.`;
  } else if (cmd === "experience") {
    resp.innerHTML = `• Google (Munich, L4 SWE III, Nov 2024–Present): Core Java/C++ frameworks (~5,200 microservice nodes)<br>• Google (India, L3→L4 SWE, Jul 2022–Nov 2024): Distributed FS (100K+ services) & $2.5M+/qtr SLA/SLO platform<br>• Komprise, Accenture, Tookitaki, Excain`;
  } else if (cmd === "projects") {
    resp.innerHTML = `1. YTM AI Host (<100ms AI Radio Jockey, WebGPU/WebLLM + Gemini)<br>2. LinkinJMS (<50ms Spark + ActiveMQ connector)<br>3. Autonomous Multi-Agent Oncall Triage<br>4. PIKA Autonomous CV Robot`;
  } else if (cmd === "skills") {
    resp.innerHTML = `Languages: C++, Java, Go, TypeScript, Python, Scala, Kotlin, SQL<br>Systems: gRPC, Protobuf, HDFS/FUSE, Spanner, Paxos/Raft, Spark, Kafka, ActiveMQ, Kubernetes, OpenTelemetry`;
  } else if (cmd === "download") {
    resp.innerHTML = `Opening Resume on Google Drive...`;
    window.open(PORTFOLIO_DATA.profile.driveResumeUrl, "_blank");
  } else if (cmd === "full-terminal") {
    window.location.href = "terminal.html";
  } else if (cmd === "contact") {
    resp.innerHTML = `Email: apparently.ayush@gmail.com | GitHub: github.com/iu-sh | LinkedIn: linkedin.com/in/iu-sh`;
  } else if (cmd === "sudo hire ayush") {
    resp.innerHTML = `<span style="color:#50fa7b;">[OK] Offer packet initialized! Opening Recruiter Connect Modal... May the Force be with you ✨</span>`;
    setTimeout(() => {
      closeTerminalModal();
      const recModal = document.getElementById("recruiter-modal");
      if (recModal) recModal.classList.add("open");
    }, 500);
  } else if (cmd === "clear") {
    out.innerHTML = "";
    return;
  } else if (cmd !== "") {
    resp.innerHTML = `Command not found: ${rawCmd}. Type <strong style="color:#f1fa8c;">help</strong> for available commands.`;
  }

  out.appendChild(resp);
  const body = document.getElementById("terminal-scroll-body");
  if (body) body.scrollTop = body.scrollHeight;
}

// 14. Global Keyboard Shortcuts (`/` for Search, `~` for Terminal)
function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea") return;

    if (e.key === "/") {
      e.preventDefault();
      const searchInput = document.getElementById("search-input");
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    } else if (e.key === "`" || e.key === "~") {
      e.preventDefault();
      openTerminalModal();
    } else if (e.key === "Escape") {
      closeTerminalModal();
      const recModal = document.getElementById("recruiter-modal");
      if (recModal) recModal.classList.remove("open");
    }
  });
}

// 15. Sticky Header Shadow & Animated Top Stats Counter
function setupScrollHeader() {
  const header = document.getElementById("top-search-header");
  window.addEventListener("scroll", () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  });
}

function animateCounters() {
  const counters = document.querySelectorAll("[data-counter-target]");
  counters.forEach(el => {
    const target = parseFloat(el.getAttribute("data-counter-target"));
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    const duration = 1100;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = (target * eased).toFixed(decimals);
      const formatted = Number(val).toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
      el.textContent = `${prefix}${formatted}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
