// ============================================================
// CONFIGURATION FILE - Edit this file to customize your portfolio
// ============================================================

const CONFIG = {
    meta: {
        title: "Ayush Singh | Software Engineer",
        description: "Ayush Singh (iu-sh) is a Software Engineer at Google, Munich. Experienced in Distributed Systems, Backend Engineering, and Android Development.",
        keywords: "Ayush Singh, iu-sh, Software Engineer, Distributed Systems, Backend Engineering, Google",
        author: "Ayush Singh",
        ogTitle: "Ayush Singh | iu-sh | Software Engineer",
        ogDescription: "Ayush Singh (iu-sh) is a Software Engineer at Google, Munich. Experienced in Distributed Systems and Backend Engineering.",
        themeColor: "#0d1117"
    },

    terminal: {
        title: "guest@TheFlyingDutchman: ~",
        prompt: {
            symbol: "➜",
            directory: "~"
        },
        welcomeMessage: 'Hello World! Type "<strong class="text-yellow">help</strong>" to see available commands. This website is best viewed on a PC.'
    },

    audioOverview: {
        url: "ayush_resume.mp3",
        label: "Listen to two experts discuss my resume"
    },

    resumeDownloadUrl: "https://drive.google.com/file/d/18WSvCUixoKOrkHoTGbKKNCbnNQ75WrQk/view?usp=sharing",

    about: {
        name: "Ayush Singh",
        alias: "iu-sh",
        role: "currently trading code for money",
        team: "Google",
        tagline: "TL;DR : Swiss Army Knife. Currently diving deep into Distributed Systems and building scalable solutions.",
        externalPortfolio: {
            label: "ayushsingh.is-a.dev",
            url: "https://ayushsingh.is-a.dev"
        },
        currentStatus: {
            role: "Software Engineer - III",
            location: "Google, Munich"
        },
        recentWork: [
            {
                status: "COMPLETED",
                description: "Software Engineering",
                location: "Google, India"
            }
        ],
        bio: `
        Software Engineer with a passion for building robust, scalable systems.
I pick up new tech stacks faster than I finish my coffee. Outside of work, I channel my engineering brain into building robots, devouring sci-fi novels, and curating the perfect coding playlist.`
    },

    education: [
        {
            institution: "National Institute of Technology-Agartala, India",
            degree: "B.Tech in Electrical Engineering",
            year: "August 2018 - May 2022",
            grade: "CGPA: 9.32/10"
        }
    ],

    projects: [
        {
            name: "YTM AI Host",
            url: "https://github.com/iu-sh/ytm_ai_host",
            tags: ["TypeScript", "Gemini API", "WebLLM", "WebGPU", "Python"],
            description: [
                "Developed an AI Host that acts as an RJ on YouTube Music Web, providing introductions with wit and energy similar to a real Radio Jockey.",
                "Integrated Gemini API and WebLLM for text generation, and multiple TTS engines (Chrome TTS, Kokoro JS, XTTS v2) for dynamic speech.",
                "Implemented smart caching and pre-fetching for seamless playback.",
                "Also created a local server, which can be plugged into YTM or Spotify, to run local LLM and TTS model for seamless private experience."
            ]
        },
        {
            name: "PIKA - Autonomous Robot",
            url: "https://www.youtube.com/embed/0Fff2ncdbPo",
            tags: ["Tensorflow", "OpenCV", "Keras", "Raspberry-Pi"],
            description: [
                "Developed an autonomous robot that can navigate in any environment using Computer-Vision.",
                "The robot uses onboard Raspberry-Pi to process the data received from various sensors (including onboard camera) and then makes a decision."
            ]
        },
        {
            name: "LinkinJMS",
            url: "https://github.com/iu-sh/linkinJMS",
            tags: ["Spark", "Scala", "JMS", "ActiveMQ"],
            description: [
                "Developed an application, from scratch, to connect and fetch messages from ActiveMQ broker with low latency (<0.05 sec) and enhanced AMQP security.",
                "The application also supports writing messages to the topic/queue of the ActiveMQ."
            ]
        },
        {
            name: "Professor-Mirror",
            url: "https://github.com/iu-sh/professorMirror",
            tags: ["NodeJS", "JavaScript", "Firebase", "MongoDB"],
            description: [
                "Worked on the backend for an application where the students can rate their professors on several parameters such as Research, Course-Material, Interaction with students, etc.",
                "The app uses MongoDB for persistent storage, and Firebase to store details about the users and facilitate authentication."
            ]
        },
        {
            name: "Self Driving car for GTA-V",
            url: null,
            tags: ["Tensorflow", "OpenCV", "Python"],
            description: [
                "Developed a python script to drive cars in Grand Theft Auto 5 PC.",
                "Used transfer-learning on InceptionResNetV2 to achieve high accuracy."
            ]
        },
        {
            name: "ANARC Android App",
            url: null,
            tags: ["Kotlin", "Java", "XML", "Firebase"],
            description: [
                "Developed an Android App for the ASIMOV NIT-Agartala ROBOTICS CLUB.",
                "The app included features like Realtime messaging, Notice Board, Components Management, etc."
            ]
        }
    ],

    experience: [
        {
            title: "Google, Munich - Software Engineer",
            period: "November 2024 - Present",
            department: "Software Engineering",
            highlights: [
                { label: null, detail: "Working on user data privacy across Google Products." },
                { label: null, detail: "Led implementation for the UK's Online Safety Act across web, Android, and iOS." },
                { label: null, detail: "Revamped the backend system for handling privacy signals, significantly simplifying the infrastructure." }
            ]
        },
        {
            title: "Google, India - Software Engineer",
            period: "July 2022 - November 2024",
            department: "Software Engineering",
            highlights: [
                { label: null, detail: "Worked on a highly scalable file system optimized for seamless deployment and distribution of critical binary assets." },
                { label: null, detail: "Led development of a tool that quantified the impact of Chrome's third-party cookie deprecation. Earned a promotion within 1.2 years." },
                { label: null, detail: "Designed and developed an application to extract telemetry metrics from distributed systems." },
                { label: null, detail: "Developed an SLA/SLO enforcement system for third-party systems." }
            ]
        },
        {
            title: "Komprise, India - Software Engineer Intern",
            period: "January 2022 – June 2022",
            department: "Engineering",
            highlights: [
                { label: null, detail: "Developed an Automation Engine capable of parallelizing operations and identifying critical bugs." },
                { label: null, detail: "Optimized the BVT suite using multi-threading, achieving an 87.5% reduction in execution time." }
            ]
        },
        {
            title: "Accenture, India - Data Engineer Intern",
            period: "May 2021 – July 2021",
            department: "Data Engineering",
            highlights: [
                { label: null, detail: "Developed an end-to-end Business-Intelligence Dashboard to analyze statistics of E-Commerce websites." },
                { label: null, detail: "Built a pipeline for big data to flow from AWS-S3 to Snowflake Warehouse in an optimized manner." },
                { label: null, detail: "Built an NLP-powered chat-bot that extracts and presents key insights from data." }
            ]
        },
        {
            title: "Tookitaki, Singapore - Software Engineer Intern",
            period: "October 2020 – January 2021",
            department: "Engineering",
            highlights: [
                { label: null, detail: "Developed a pipeline that fetches data from ActiveMQ-Broker through Spark Structured-Streaming." },
                { label: null, detail: "Decreased the latency of message delivery from 0.85 sec to <0.05 sec using custom JMS-Client." }
            ]
        },
        {
            title: "Excain LLP, India - Machine Learning Engineer Intern",
            period: "July 2020 – September 2020",
            department: "Machine Learning",
            highlights: [
                { label: null, detail: "Worked with the ML team of Excain LLP." },
                { label: null, detail: "Developed an OCR model which could transform handwritten prescriptions to digital text." }
            ]
        }
    ],

    skills: [
        {
            category: "Languages",
            items: "TypeScript, C++, Scala, Java, Python, Kotlin."
        },
        {
            category: "Libraries & Tools",
            items: "ActiveMQ, Spark, Kafka, ReactJS, Node.js, Express, MongoDB, Tableau, Snowflake, Rasa, Django, SQL, PyTorch, FastAPI, Firebase, git, ROS, Tensorflow."
        },
        {
            category: "Software",
            items: "Docker, Postman, Jupyter Notebook, Simulink, VS Code, Adobe Photoshop, Android-Studio, Vim, UNIX."
        }
    ],

    achievements: {
        asciiArt: `       ___________
      '._==_==_=_.'    Received 7 peer bonuses from colleagues across different teams for helping with technical challenges.
      .-\\:      /-.    Institute Rank 1 on GeeksForGeeks (among 1,180+) with worldwide Rank 72 (among 100,000+).
     | (|:.     |) |   One of 50 students selected from all across India, for Google-ExploreML 2019.
      '-|:.     |-'    Selected for the prestigious Indian Academy of Sciences: FASTSF Fellowship 2021.
        \\::.    /      Established the first Developer Student Club at NIT-A as Lead appointed by Google.
         '::. .'
           ) (
         _.' '._
        \`"""""""\``
    },

    contact: {
        email: {
            address: "ayushsingh1315@gmail.com",
            label: "ayushsingh1315@gmail.com"
        },
        social: {
            linkedin: {
                url: "https://www.linkedin.com/in/iu-sh/",
                label: "LinkedIn"
            },
            github: {
                url: "https://github.com/iu-sh",
                label: "GitHub"
            }
        }
    },

    bookATime: {
        url: "https://calendar.app.google/kgawrPecMeeKW68P8",
        label: "Book a time",
        message: "If you are a recruiter, please inform at least 48h before through email that you are reserving a 1:1 slot :)"
    },

    commands: [
        { name: "about", description: "About me" },
        { name: "education", description: "Do the degrees actually matter?" },
        { name: "projects", description: "Stuff that I have worked on" },
        { name: "experience", description: "My work experience" },
        { name: "skills", description: "Yeah I've got a few :)" },
        { name: "achievements", description: "Awards and recognition" },
        { name: "contact", description: "How to reach me?" },
        { name: "book-a-time", description: "Schedule a meeting" },
        { name: "download", description: "Download resume (PDF)" },
        { name: "listen", description: "Listen to two experts discuss my resume" },
        { name: "clear", description: "Clear this window" }
    ],

    error: {
        title: "ERROR",
        message: "Command not found!",
        helpHint: 'Type "<strong class="text-yellow">help</strong>" to see available commands.'
    },

    // ============================================================
    // CUSTOM COMMANDS - Add your own commands here!
    // Each custom command needs: name, description, and content (HTML)
    // ============================================================
    customCommands: [
        // Example custom command:
        // {
        //   name: "hobbies",
        //   description: "Things I do for fun",
        //   content: `
        //     <ul>
        //       <li><strong class="text-green">Gaming:</strong> Strategy and RPG games</li>
        //       <li><strong class="text-green">Reading:</strong> Sci-fi and fantasy novels</li>
        //     </ul>
        //   `
        // }
    ]
};

// ============================================================
// ASCII ART - Intro banner shown on page load
// ============================================================
const INTRO_ASCII = `   ___   ____    ____  __    __       _______. __    __
  /   \\  \\   \\  /   / |  |  |  |     /       ||  |  |  |
 /  ^  \\  \\   \\/   /  |  |  |  |    |   (----\`|  |__|  |
/  /_\\  \\  \\_    _/   |  |  |  |     \\   \\    |   __   |
/  _____  \\   |  |     |  \`--'  | .----)   |   |  |  |  |
/__/     \\__\\  |__|      \\______/  |_______/    |__|  |__|

                                                 __.-._
                                                 '-._"7'
                                                 /'.-c
                                                 |  /T
                do or do not, there is no trying _)_/LI`;

// ============================================================
// ASCII ART - Error message shown on invalid commands
// ============================================================
const ERROR_ASCII = `        .___  ___.      ___   ____    ____
|   \\/   |     /   \\  \\   \\  /   /
|  \\  /  |    /  ^  \\  \\   \\/   /
|  |\\/|  |   /  /_\\  \\  \\_    _/
|  |  |  |  /  _____  \\   |  |
|__|  |__| /__/     \\__\\  |__|


   .______    _______    ____    __    ____
   |   _  \\  |   ____|   \\   \\  /  \\  /   /
   |  |_)  | |  |__       \\   \\/    \\/   /
   |   _  <  |   __|       \\            /
   |  |_)  | |  |____       \\    /\\    /
   |______/  |_______|       \\__/  \\__/


ps: I am a big StarWars fan :D `;
