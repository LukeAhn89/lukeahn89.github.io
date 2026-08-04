import { getCompletedCareerYears } from "./resume.shared";
import type { ResumeContent } from "./resume.types";

const careerYear = getCompletedCareerYears();
const profileSummary = `Software engineer with ${careerYear} years of experience across backend, frontend, and Windows application development, focused on system architecture and reliable operations.`;

export const resumeEn = {
  locale: "en",
  meta: {
    title: "Jungmin Ahn | Software Engineer",
    description: profileSummary,
    canonicalPath: "/en/",
  },
  profile: {
    name: "Jungmin Ahn",
    displayName: "Jungmin Ahn",
    title: "Software Engineer",
    email: "dkswjdals89@gmail.com",
    github: "lukeahn89",
    image: "/assets/images/profile.webp",
    imageAlt: "Portrait of Jungmin Ahn",
    location: "Seoul, Korea",
    summary: profileSummary,
    principles: [
      "Improving quality through automated tests and code reviews",
      "Building LLM-powered content generation agents",
      "Experience across commerce, search, payments, orders, and fulfillment",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/lukeahn89",
        icon: "github",
      },
      {
        label: "Email",
        href: "mailto:dkswjdals89@gmail.com",
        icon: "email",
      },
    ],
    contactLabel: "Contact",
    contactNote: "LLM agent systems, generative content workflows, backend engineering, and product reliability.",
  },
  highlights: [
    {
      value: `${careerYear}`,
      label: "Years",
      detail: "Years of software engineering experience",
    },
    {
      value: "Commerce",
      label: "Domain",
      detail: "Catalog, orders, payments, promotions, and reviews",
    },
    {
      value: "AI Agent",
      label: "Product",
      detail: "LLM-powered content generation systems",
    },
    {
      value: "Search",
      label: "Scale",
      detail: "Performance improvements with Elasticsearch and Redis",
    },
  ],
  skillGroups: [
    {
      name: "AI Agent & LLM",
      description: "Tools used to build LLM-powered content generation agent systems",
      items: [
        { name: "LangChain", icon: "langchain" },
        { name: "LangGraph", icon: "langgraph" },
        { name: "AWS Bedrock" },
      ],
    },
    {
      name: "Core Backend",
      description: "Backend technologies that reflect my recent work and core strengths",
      items: [
        { name: "Python", icon: "python" },
        { name: "FastAPI", icon: "fastapi" },
        { name: "Kotlin", icon: "kotlin" },
        { name: "Java", icon: "java" },
        { name: "Spring Boot", icon: "springboot" },
        { name: "JPA / Hibernate", icon: "hibernate" },
        { name: "Querydsl" },
        { name: "GraphQL", icon: "graphql" },
        { name: "Kafka", icon: "kafka" },
        { name: "Node.js", icon: "nodejs" },
        { name: "TypeScript", icon: "typescript" },
      ],
    },
    {
      name: "Data & Operations",
      description: "Infrastructure and data technologies used for search, caching, messaging, and operations",
      items: [
        { name: "MySQL", icon: "mysql" },
        { name: "MongoDB", icon: "mongodb" },
        { name: "Redis", icon: "redis" },
        { name: "Elasticsearch", icon: "elasticsearch" },
        { name: "AWS" },
        { name: "Docker", icon: "docker" },
      ],
    },
  ],
  experiences: [
    {
      company: "NOL Universe",
      companyLogo: "/assets/companies/nol-universe.png",
      companyLogoAlt: "NOL Universe logo",
      companyLogoClass: "scale-[0.9]",
      companyMarkClass: "h-14 w-14",
      companyInitial: "N",
      link: "https://www.nol-universe.com",
      role: "Software Engineer / Generative Content Platform Team Lead",
      period: "Feb 25, 2025 – Present",
      summary: "Leading GCP Studio, an LLM agent platform that automates travel content production for the Generative Content Platform team",
      bullets: [
        "Analyzed the content team's manual travel-guide workflow and designed an internal tool for draft generation, section-level regeneration, and review",
        "Designed a LangGraph-based content lifecycle that combines structure planning, section generation, review waits, and feedback-driven regeneration",
        "Connected POI, image, and web search as agent tools and transformed generated results into structured content that product services can render",
        "Serve as the Generative Content Platform team lead",
      ],
    },
    {
      company: "KakaoStyle",
      companyLogo: "/assets/companies/kakaostyle.png",
      companyLogoAlt: "KakaoStyle logo",
      companyLogoFlush: true,
      companyMarkClass: "h-14 w-14 bg-[#ffcd00]",
      companyInitial: "K",
      link: "https://kakaostyle.com",
      role: "Backend Developer",
      period: "Apr 2020 – Feb 14, 2025",
      summary: "Women's fashion e-commerce services",
      bullets: [
        "Developed the NOW.NOW fashion e-commerce service for Japan and operated its AWS infrastructure",
        "Built services across catalog, orders, payments, promotions, and other commerce domains",
        "Developed Japanese-language product search",
        "Developed and operated Zigzag Mate, an influencer-based consignment fulfillment service",
      ],
    },
    {
      company: "BBROS",
      companyLogo: "/assets/companies/bbros.png",
      companyLogoAlt: "BBROS logo",
      companyInitial: "B",
      link: "https://bbros.co.kr",
      role: "Backend Developer / Reception & Appointment Development Lead",
      period: "Feb 2017 – Feb 2020",
      summary: "Mobile clinic reception and appointment service for the Korean healthcare market",
      bullets: [
        "Developed a mobile reception and appointment system integrated with EMR chart providers",
        "Built mobile reception APIs integrated with Kakao's hospital search service",
        "Built, operated, and maintained production infrastructure on AWS",
        "Implemented and operated an ELK Stack for server monitoring",
        "Developed hospital and pharmacy search services using a search engine",
      ],
    },
    {
      company: "Moberan",
      companyLogo: "/assets/companies/moberan.png",
      companyLogoAlt: "Moberan logo",
      companyInitial: "M",
      link: "http://www.moberan.com",
      role: "Full Stack Developer",
      period: "Jul 2013 – Jan 2017",
      summary: "Broadcasting solutions and custom software projects",
      bullets: [
        "Developed backend, frontend, and Windows applications",
        "Worked with C# WinForms, WPF, ASP.NET, Java Spring, and other languages and frameworks",
      ],
    },
  ],
  projects: [
    {
      name: "GCP Studio – LLM Travel Content Generation Agent",
      period: "Feb 2025 – Present",
      summary: "An internal LLM agent system that supports the NOL content team's travel guide and magazine production",
      bullets: [
        "Designed template-based guide generation, section-level regeneration, and review and approval flows as a LangGraph workflow",
        "Converted LLM output into GCS blocks such as Heading, Paragraph, Media, and POI to support Generative UI and publishing integration",
        "Combined internal data with POI, image, and web search agent tools to improve content accuracy",
        "Streamed progress for long-running generation jobs to reduce uncertainty for content operators",
        "Designed Langfuse-based tracing and evaluation to track quality regressions across prompt and model changes",
      ],
      tech: ["Python", "FastAPI", "LangChain", "LangGraph", "AWS Bedrock", "MongoDB", "Redis", "FastMCP", "Langfuse"],
    },
    {
      name: "Review Service",
      period: "Apr 2024 – Feb 2025",
      bullets: [
        "Implemented dynamic review-image thumbnail resizing with Lambda@Edge",
        "Developed AI-assisted review moderation",
        "Refactored service code, improved performance, and separated presentation logic",
      ],
      tech: ["Kotlin", "Spring Boot", "MySQL", "Aurora", "Redis", "JPA", "Querydsl", "GraphQL", "Kafka"],
    },
    {
      name: "Zigzag Mate",
      period: "Jul 2022 – Apr 2024",
      bullets: [
        "Migrated an existing Node.js service to Kotlin",
        "Moved the AWS deployment from the Tokyo region to the Seoul region",
        "Designed and implemented a wholesale OpenAPI for fulfillment-provider integrations",
        "Developed seller settlement services and automated transfers",
      ],
      tech: ["Kotlin", "Spring Boot", "MySQL", "Aurora", "Redis", "JPA", "Querydsl", "GraphQL", "Kafka"],
    },
    {
      name: "NOW.NOW – Fashion E-commerce for Japan",
      period: "Apr 2020 – Jul 2022",
      bullets: [
        "Developed Japanese-language product search with Elasticsearch",
        "Improved API latency through Redis caching and asynchronous processing",
        "Built product ranking with Redis sorted sets",
        "Developed promotions including discounts, coupons, and reward points",
        "Built APIs for logistics providers and external wholesale-product integrations",
        "Developed backend and frontend features for the back office",
      ],
      tech: ["Node.js", "TypeScript", "MySQL", "Redis", "GraphQL", "Elasticsearch", "Kibana", "SQS", "Lambda"],
    },
    {
      name: "DDocdoc Hospital and Pharmacy Search",
      period: "May 2019 – Nov 2019",
      summary: "Search features for hospital and pharmacy information in Korea",
      bullets: [
        "Introduced Elasticsearch to eliminate slow queries and database load caused by LIKE and regular-expression queries",
        "Developed search autocomplete and keyword recommendations",
        "Implemented real-time search-index updates with MongoDB Change Streams and AWS Lambda",
        "Built Kibana dashboards for monitoring user search keywords",
      ],
      tech: ["Node.js", "MongoDB", "AWS Lambda", "Elasticsearch"],
    },
    {
      name: "DDocdoc Mobile Reception and Appointment Integration API",
      summary: "An external integration API that enabled mobile clinic reception on partner platforms",
      bullets: [
        "Designed an API service that supported integrations across multiple platforms",
        "Applied Redis Cache-Aside and Write-Back strategies to reduce database load from partner traffic",
        "Retired the service after the Kakao partnership ended in November 2019",
      ],
      tech: ["Node.js", "MongoDB", "Redis", "AWS SQS", "Lambda"],
    },
    {
      name: "DDocdoc Mobile Reception and Appointment Service",
      period: "Feb 2017 – Feb 2020",
      summary: "A service for clinic reception and appointments without an in-person visit",
      bullets: [
        "Developed integrations that exchanged clinic status and mobile reception and appointment requests with EMR providers",
        "Developed infant health-check appointments and pre-visit questionnaires",
        "Filed a patent application for the pre-visit questionnaire feature (application no. 10-2018-0158500)",
        "Developed hospital admin APIs for reception and appointment settings",
        "Handled an average of 80,000–100,000 server requests per minute in 2019",
        "Improved legacy performance using event-loop lag monitoring, SQS, and Lambda",
      ],
      tech: ["Node.js", "MongoDB", "DynamoDB", "Redis", "Socket.io"],
    },
  ],
  education: [
    {
      name: "Kangwon National University",
      role: "B.S. in Computer Engineering",
      period: "2008 – 2014",
      summary: "Studied computer engineering after developing an early interest in programming, participated in academic clubs, and served as vice student representative for the department.",
      bullets: [
        "ZeroOne academic club: studied C++, Visual Basic, and other languages and mentored first-year programming classes",
        "J.S.E.A academic club: studied Java, Spring Framework, and software engineering and built small projects",
      ],
    },
  ],
  sections: {
    skills: {
      eyebrow: "Stack",
      title: "Skills",
      description: "Technologies I have used repeatedly to build and operate products.",
    },
    experience: {
      eyebrow: "Career",
      title: "Experience",
      description: "Key responsibilities and operational experience by company.",
    },
    projects: {
      eyebrow: "Selected Work",
      title: "Projects",
      description: "Selected projects that highlight service impact and backend architecture experience.",
    },
    education: {
      eyebrow: "Education",
      title: "Education",
    },
  },
  footer: {
    references: "References available on request",
  },
  pdf: {
    href: "/resume-en.pdf",
    download: "Jungmin_Ahn_Resume.pdf",
    label: "Download PDF",
  },
} satisfies ResumeContent;
