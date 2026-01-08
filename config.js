const CONFIG = {
  meta: {
    title: "Ayush Singh | Software Engineer",
    description: "Ayush Singh (WinterSoldier13) is a Software Engineer at Google, Munich. Experienced in Distributed Systems, Backend Engineering, and Android Development.",
    keywords: "Ayush Singh, WinterSoldier13, Ayush Google, Software Engineer, Google Munich, Distributed Systems, Backend Engineering, Android Development",
    author: "Ayush Singh",
    ogTitle: "Ayush Singh | iu-sh | Software Engineer | Google",
    ogDescription: "Ayush Singh (iu-sh) is a Software Engineer at Google, Munich. Experienced in Distributed Systems, Backend Engineering, and Android Development.",
    themeColor: "#282a36"
  },
  terminal: {
    title: "guest@TheFlyingDutchman:~",
    prompt: { symbol: "$", directory: "~" },
    welcomeMessage: 'Hello World!<br>(Type "<strong class="text-yellow">help</strong>" to know all the commands).<br>This website is best viewed on a PC'
  },
  resumeDownloadUrl: "https://drive.google.com/file/d/18WSvCUixoKOrkHoTGbKKNCbnNQ75WrQk/view?usp=sharing",
  about: {
    name: "Ayush Singh",
    alias: "iu-sh",
    role: "Software Engineer",
    team: "Google",
    tagline: "TL;DR : Swiss Army Knife. Currently diving deep into Distributed Systems and building scalable solutions. Always down to chat about Physics, Algorithms, or high-throughput architecture.",
    externalPortfolio: { label: "github.com/iu-sh", url: "https://github.com/iu-sh" },
    currentStatus: { role: "SWE-III", location: "Google, Munich" },
    recentWork: [
      {
        status: "CURRENT",
        description: "Software Engineering - III",
        location: "Google, Munich"
      },
      {
        status: "COMPLETED",
        description: "Software Engineering - III",
        location: "Google, India"
      },
      {
        status: "COMPLETED",
        description: "Software-Engineering Internship",
        location: "Komprise"
      },
      {
        status: "COMPLETED",
        description: "Data-Engineering Internship",
        location: "Accenture"
      }
    ],
    bio: "I consider myself a quick and constant learner. I can adapt to new tech-stack within a short amount of time.<br><br>I build robots in my free time, love reading books and listening to music."
  },
  education: [
    {
      institution: "National Institute of Technology-Agartala, India",
      degree: "B.Tech in Electrical Engineering",
      year: "August 2018 - May 2022",
      grade: "Current CGPA: 9.32/10"
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
      name: "PIKA- Autonomous Robot",
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
        "I developed a python script to drive cars in Grand Theft Auto 5 PC",
        "Used transfer-learning on InceptionResNetV2 to acheive high accuracy."
      ]
    },
    {
      name: "ANARC Android App",
      url: null,
      tags: ["Kotlin", "Java", "XML", "Firebase"],
      description: [
        "Developed an Android App for the ASIMOV NIT-Agartala ROBOTICS CLUB",
        "The app included features like Realtime messaging, Notice Board, Components Managment, etc."
      ]
    }
  ],
  experience: [
    {
      title: "Google, Munich - Software Engineer - III",
      period: "November 2024 - Present",
      department: "SignedOut Consent team",
      highlights: [
        { label: "TechStack", detail: "Java, C++, Kotlin, Proprietary Google technologies" },
        { label: null, detail: "Working in the SignedOut Consent team, responsible for managing user data privacy across all Google Products." },
        { label: null, detail: "Led the SignedOut implementation for the UK's Online Safety Act, executing changes across the web, Android, and iOS Google Search app. Coordinated development efforts with multiple engineering and legal teams to ensure timely compliance. I was awarded spot bonus from VP of Engineering for this work." },
        { label: null, detail: "Commandeered the effort to implement the changes related to US's AppStore AgeVerification bill. I was responsible for driving, developing, and co-ordinating the launch with a very strict deadline. Efforts like this saves Google from millions of dollars of fine." },
        { label: null, detail: "Revamped the backend system for handling privacy signals, significantly simplifying the infrastructure. This was a major achievement for our org within Google." }
      ]
    },
    {
      title: "Google, India - Software Engineer - III",
      period: "July 2022 - November 2024",
      department: "Core Engineering",
      highlights: [
        { label: "TechStack", detail: "C++, TypeScript, Java, Proprietary Google Technologies" },
        { label: null, detail: "Worked on BinaryFileSystem, an exceptionally scalable and impervious file system optimized for the seamless deployment and distribution of critical binary assets inside the company." },
        { label: null, detail: "Led the development and implementation of a tool that quantified the impact of Google Chrome's third-party cookie deprecation on all internal Google web apps. This project had significant impact and received executive approval, including the CEO's go-ahead. Earned a promotion within 1.2 years of joining for my contributions." },
        { label: null, detail: "Designed and developed an application to extract intricate telemetry metrics from externally hosted third-party distributed systems, facilitating a comprehensive understanding of system performance dynamics." },
        { label: null, detail: "Drove the architecture and implementation of a robust, highly available, and scalable backend infrastructure, responsible for the aggregation and correlation of metrics and trace spans originating from the monitored distributed systems." },
        { label: null, detail: "Developed an SLA/SLO enforcement system for third-party systems, saving Google an estimated $2.5 million per quarter." },
        { label: null, detail: "Developed a gateway system engineered to securely transfer static content from a third-party storage repository to a secure internal storage system." },
        { label: null, detail: "Collaborated as a co-author on the development of three comprehensive Technical Design Documents, demonstrating a commitment to documenting and disseminating critical engineering insights and knowledge." }
      ]
    },
    {
      title: "Komprise, India - Software Engineer-Intern",
      period: "January 2022 – June 2022",
      department: "Software Engineering",
      highlights: [
        { label: "TechStack", detail: "Python, proprietary organization components, Robot-Framework" },
        { label: null, detail: "Developed an Automation Engine capable of parallelizing the different operations in the product and identifying critical bugs." },
        { label: null, detail: "Optimized the BVT suite using multi-threading, achieving an 87.5% reduction in execution time. This improved test efficiency and contributed to faster software delivery." }
      ]
    },
    {
      title: "Accenture, India - Data Engineer-Intern",
      period: "May 2021 – July 2021",
      department: "Data Engineering",
      highlights: [
        { label: "TechStack", detail: "Snowflake, Tableau, Python, AWS-S3, Rasa" },
        { label: null, detail: "Developed an end-to-end Business-Intelligence Dashboard to analyze statistics of E-Commerce websites." },
        { label: null, detail: "Designed and built a pipeline for the big data to flow from the staging area in AWS-S3 to Snowflake Warehouse in an optimized manner." },
        { label: null, detail: "Built a Natural Language Processing-powered chat-bot that extracts and presents key insights from data, facilitating informed decision-making for stakeholders." }
      ]
    },
    {
      title: "Tookitaki, Singapore - Software Engineer-Intern",
      period: "October 2020 – January 2021",
      department: "Software Engineering",
      highlights: [
        { label: "TechStack", detail: "Spark, ActiveMQ, JMS, Scala, MySQL" },
        { label: null, detail: "Developed a pipeline that fetches data from a queue/topic of an ActiveMQ-Broker through Spark Structured-Streaming and then writes the data to another queue of the broker." },
        { label: null, detail: "Decreased the latency of message delivery from 0.85 sec (Bahir) to <0.05 sec (Custom JMS-Client)." },
        { label: null, detail: "Embedded the JMS-Client in a Spark Structured-Streaming application, with client-side message recovery system." }
      ]
    },
    {
      title: "Excain LLP, India - Machine Learning Engineer [Intern]",
      period: "July 2020 – Sept 2020",
      department: "ML Team",
      highlights: [
        { label: "TechStack", detail: "Python3, OpenCV, Azure-Vision" },
        { label: null, detail: "Worked as an Intern with the ML team of Excain LLP." },
        { label: null, detail: "Developed an OCR model which could transform handwritten prescriptions to digital text." }
      ]
    }
  ],
  skills: [
    {
      category: "Languages",
      items: "TypeScript, C++, Scala, Java"
    },
    {
      category: "Libraries and Tools",
      items: "ActiveMQ, Spark, Kafka, ReactJS, Node.js, Express, MongoDB, Tableau, Snowflake, Rasa, Django, SQL, PyTorch, FastAPI, Firebase, git, ROS, Tensorflow"
    },
    {
      category: "Software Packages",
      items: "Docker, Postman, Jupyter Notebook, Simulink, VS Code, Adobe Photoshop, Android-Studio, Vim, UNIX"
    }
  ],
  achievements: {
    asciiArt: `
       ___________
      '._==_==_=_.'  Received 7 peer bonuses from colleagues across different teams at Google for helping them out with their technical blockage.
      .-\\:      /-.  Institute Rank 1 on GeeksForGeeks (among 1,180+) with a worldwide Rank 72 (among 100,000+) in Algorithms.
     | (|:.     |) | One of 50 students selected from all across India, for Google-ExploreML 2019.
      '-|:.     |-'  One of 11 students selected for the prestigious Indian Academy of Sciences: FASTSF Fellowship 2021.
        \\::.    /   Established the first Developer Student Club at NIT-A after being appointed as the Lead by Google in a highly selective process.
         '::. .'
           ) (
         _.' '._
        \`"""""""\`
`
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
        label: "Github"
      }
    }
  },
  bookATime: {
    url: "https://calendar.app.google/kgawrPecMeeKW68P8",
    label: "Book a time",
    message: "If you are a recruiter use this to schedule some time with me, please inform atleast 48h before through email that you are reserving a 1:1 slot :)"
  },
  commands: [
    { name: "about", description: "About me" },
    { name: "education", description: "do the degrees actually matter?" },
    { name: "projects", description: "Stuff that I have worked on" },
    { name: "experience", description: "my work experience" },
    { name: "skills", description: "Yeah I've got a few :)" },
    { name: "achievements", description: "Some awards and recognition" },
    { name: "contact", description: "How to reach me?" },
    { name: "book-a-time", description: "Schedule a meeting" },
    { name: "download", description: "Download my resume in a PDF format" },
    { name: "clear", description: "Clear this window" }
  ],
  error: {
    title: "ERROR",
    message: "Command not found!",
    helpHint: 'Type "<strong class="text-yellow">help</strong>" to see available commands.'
  },
  customCommands: []
};

const INTRO_ASCII = `


                ___   ____    ____  __    __       _______. __    __
                /   \\  \\   \\  /   / |  |  |  |     /       ||  |  |  |
               /  ^  \\  \\   \\/   /  |  |  |  |    |   (----\`|  |__|  |
              /  /_\\  \\  \\_    _/   |  |  |  |     \\   \\    |   __   |
             /  _____  \\   |  |     |  \`--'  | .----)   |   |  |  |  |
            /__/     \\__\\  |__|      \\______/  |_______/    |__|  |__|

                                                                        __.-._
                                                                        '-._"7'
                                                                        /'.-c
                                                                        |  /T
                                       do or do not, there is no trying _)_/LI
`;

const ERROR_ASCII = `
        < Enter help to get list of all available commands >
        -----------------------------------------------------------

        .___  ___.      ___   ____    ____    .___________. __    __   _______     _______   ______   .______        ______  _______
|   \\/   |     /   \\  \\   \\  /   /    |           ||  |  |  | |   ____|   |   ____| /  __  \\  |   _  \\      /      ||   ____|
|  \\  /  |    /  ^  \\  \\   \\/   /     \`---|  |----\`|  |__|  | |  |__      |  |__   |  |  |  | |  |_)  |    |  ,----'|  |__
|  |\\/|  |   /  /_\\  \\  \\_    _/          |  |     |   __   | |   __|     |   __|  |  |  |  | |      /     |  |     |   __|
|  |  |  |  /  _____  \\   |  |            |  |     |  |  |  | |  |____    |  |     |  \`--'  | |  |\\  \\----.|  \`----.|  |____
|__|  |__| /__/     \\__\\  |__|            |__|     |__|  |__| |_______|   |__|      \\______/  | _| \`._____| \\______||_______|

   .______    _______    ____    __    ____  __  .___________. __    __     ____    ____  ______    __    __
   |   _  \\  |   ____|   \\   \\  /  \\  /   / |  | |           ||  |  |  |    \\   \\  /   / /  __  \\  |  |  |  |
   |  |_)  | |  |__       \\   \\/    \\/   /  |  | \`---|  |----\`|  |__|  |     \\   \\/   / |  |  |  | |  |  |  |
   |   _  <  |   __|       \\            /   |  |     |  |     |   __   |      \\_    _/  |  |  |  | |  |  |  |
   |  |_)  | |  |____       \\    /\\    /    |  |     |  |     |  |  |  |        |  |    |  \`--'  | |  \`--'  |
   |______/  |_______|       \\__/  \\__/     |__|     |__|     |__|  |__|        |__|     \\______/   \\______/


        ps: I am a big StarWars fan :D
`;
