export type Link = {
  label: string;
  href: string;
};

export type ResumeItem = {
  company?: string;
  companyLogo?: string;
  companyLogoFlush?: boolean;
  companyLogoClass?: string;
  companyMarkClass?: string;
  companyInitial?: string;
  name?: string;
  link?: string;
  role?: string;
  period?: string;
  summary?: string;
  bullets: string[];
  tech?: string[];
};

export type SkillGroup = {
  name: string;
  description: string;
  items: {
    name: string;
    icon?: string;
  }[];
};

const careerStart = new Date("2013-07-01T00:00:00+09:00");

const getKoreanCareerYear = (date = new Date()) => {
  const anniversary = new Date(date.getFullYear(), careerStart.getMonth(), careerStart.getDate());
  const elapsedYears = date.getFullYear() - careerStart.getFullYear() - (date < anniversary ? 1 : 0);

  return elapsedYears + 1;
};

export const careerYear = getKoreanCareerYear();

export const profile = {
  name: "안정민",
  title: "Software Engineer",
  email: "dkswjdals89@gmail.com",
  github: "dkswjdals89",
  image: "/assets/images/profile.webp",
  location: "Seoul, Korea",
  summary:
    `새로운 기술을 경험하고 배우는 것을 즐기는 ${careerYear}년차 개발자입니다. 백엔드, 프론트엔드, 윈도우 애플리케이션 개발 경험을 바탕으로 시스템 아키텍처를 설계하고 안정적으로 운영하는 일에 집중하고 있습니다.`,
  principles: [
    "테스트 코드와 코드 리뷰를 통한 품질 개선",
    "LLM AI 기반 콘텐츠 생성 에이전트 개발",
    "커머스, 검색, 결제, 주문, 풀필먼트 도메인 경험",
  ],
  links: [
    {
      label: "GitHub",
      href: "https://github.com/dkswjdals89",
    },
    {
      label: "Email",
      href: "mailto:dkswjdals89@gmail.com",
    },
  ] satisfies Link[],
};

export const highlights = [
  {
    value: `${careerYear}`,
    label: "Years",
    detail: "소프트웨어 엔지니어 경력",
  },
  {
    value: "Commerce",
    label: "Domain",
    detail: "상품, 주문, 결제, 프로모션, 리뷰",
  },
  {
    value: "AI Agent",
    label: "Product",
    detail: "LLM 기반 콘텐츠 생성 시스템",
  },
  {
    value: "Search",
    label: "Scale",
    detail: "Elasticsearch, Redis 기반 성능 개선",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    name: "AI Agent & LLM",
    description: "LLM 기반 콘텐츠 생성 에이전트 시스템 개발에 사용하는 스택",
    items: [
      { name: "LangChain", icon: "langchain" },
      { name: "LangGraph", icon: "langgraph" },
      { name: "AWS Bedrock" },
    ],
  },
  {
    name: "Core Backend",
    description: "최근 업무와 강점이 드러나는 백엔드 중심 스택",
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
    description: "검색, 캐시, 메시징, 운영 경험이 있는 인프라/데이터 스택",
    items: [
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
      { name: "Elasticsearch", icon: "elasticsearch" },
      { name: "AWS" },
      { name: "Docker", icon: "docker" },
    ],
  },
];

export const experiences: ResumeItem[] = [
  {
    company: "놀 유니버스",
    companyLogo: "/assets/companies/nol-universe.png",
    companyLogoClass: "scale-[0.9]",
    companyMarkClass: "h-14 w-14",
    companyInitial: "N",
    link: "https://www.nol-universe.com",
    role: "Software Engineer / Generative Content Platform Team Lead",
    period: "2025.02.25 ~ 현재",
    summary: "Generative Content Platform 팀에서 여행 콘텐츠 제작을 자동화하는 LLM Agent 기반 GCP Studio 개발 리딩",
    bullets: [
      "놀 콘텐츠팀의 수기 여행 가이드 제작 워크플로우를 분석해 초안 생성, 섹션 단위 재생성, 검토 흐름을 지원하는 내부 도구 설계 및 개발",
      "LangGraph 기반 콘텐츠 생성 라이프사이클을 설계해 구조 기획, 섹션별 생성, 리뷰 대기, 피드백 기반 재생성을 하나의 워크플로우로 구성",
      "POI, 이미지, 웹 검색 도구를 Agent Tool로 연동하고 생성 결과를 서비스 렌더링 가능한 구조화 콘텐츠로 변환",
      "Generative Content Platform 팀 리더 역할 수행",
    ],
  },
  {
    company: "카카오스타일",
    companyLogo: "/assets/companies/kakaostyle.png",
    companyLogoFlush: true,
    companyMarkClass: "h-14 w-14 bg-[#ffcd00]",
    companyInitial: "K",
    link: "https://kakaostyle.com",
    role: "Backend Developer",
    period: "2020.04 ~ 2025.02.14",
    summary: "여성 패션 이커머스 서비스",
    bullets: [
      "일본 패션 이커머스 나우나우 서비스 개발 및 AWS 인프라 운영",
      "상품, 주문, 결제, 프로모션 등 이커머스 전반적인 서비스 개발",
      "일본어 상품 검색 서비스 개발",
      "인플루언서 기반 위탁 풀필먼트 직잭메이트 서비스 개발 및 운영",
    ],
  },
  {
    company: "비브로스",
    companyLogo: "/assets/companies/bbros.png",
    companyInitial: "B",
    link: "https://bbros.co.kr",
    role: "Backend Developer",
    period: "2017.02 ~ 2020.02",
    summary: "국내 모바일 병의원 진료 접수/예약 서비스",
    bullets: [
      "접수/예약 서비스 개발 파트 리드",
      "EMR Chart 연계 모바일 접수/예약 시스템 개발",
      "카카오 병원 찾기 연동 모바일 접수 API 시스템 개발",
      "AWS 운영 인프라 구축 운영 및 관리",
      "서버 모니터링을 위한 ELK Stack 구축 및 운영",
      "검색 엔진을 이용한 병원/약국 검색 서비스 개발",
    ],
  },
  {
    company: "모베란",
    companyLogo: "/assets/companies/moberan.png",
    companyInitial: "M",
    link: "http://www.moberan.com",
    role: "Full Stack Developer",
    period: "2013.07 ~ 2017.01",
    summary: "방송국 관련 솔루션 및 기타 외주 솔루션 개발",
    bullets: [
      "Backend, Frontend, Windows Application 프로그램 개발",
      "C# WinForms, WPF, ASP.NET, Java Spring 등 다양한 언어와 프레임워크 사용",
    ],
  },
];

export const projects: ResumeItem[] = [
  {
    name: "GCP Studio - LLM 여행 콘텐츠 생성 Agent",
    period: "2025.02 ~ 현재",
    summary: "놀 콘텐츠팀의 여행 가이드/매거진 콘텐츠 제작을 지원하는 LLM Agent 기반 내부 콘텐츠 생성 시스템",
    bullets: [
      "템플릿 기반 가이드 생성, 섹션 단위 재생성, 리뷰/승인 흐름을 LangGraph 기반 워크플로우로 설계",
      "LLM 출력물을 Heading, Paragraph, Media, POI 등 GCS 블록 스키마로 변환해 Generative UI와 발행 연동 기반 마련",
      "POI 검색, 이미지 검색, 웹 검색 도구를 Agent Tool로 구성하고 사내 데이터와 외부 검색 결과를 조합해 콘텐츠 정확도 보강",
      "장시간 실행되는 생성 작업의 진행 상태를 실시간으로 전달해 콘텐츠 작업자의 대기 경험 개선",
      "Langfuse 기반 트레이싱과 평가 체계를 설계해 프롬프트와 모델 변경에 따른 품질 회귀를 추적",
    ],
    tech: ["Python", "FastAPI", "LangChain", "LangGraph", "AWS Bedrock", "MongoDB", "Redis", "FastMCP", "Langfuse"],
  },
  {
    name: "리뷰 서비스",
    period: "2024.04 ~ 2025.02",
    bullets: [
      "Lambda@Edge를 이용한 리뷰 이미지 썸네일 다이나믹 리사이징 처리",
      "AI 리뷰 검수 기능 개발",
      "서비스 코드 리팩터링, 성능 개선, 전시 로직 분리",
    ],
    tech: ["Kotlin", "Spring Boot", "MySQL", "Aurora", "Redis", "JPA", "Querydsl", "GraphQL", "Kafka"],
  },
  {
    name: "직잭메이트 서비스",
    period: "2022.07 ~ 2024.04",
    bullets: [
      "Node.js 기반 기존 서비스를 Kotlin으로 전환",
      "AWS Tokyo region에서 Seoul region으로 이전",
      "풀필먼트 대행 업체 연동을 위한 도매 OpenAPI 설계 및 구현",
      "셀러 정산 서비스 개발 및 송금 자동화",
    ],
    tech: ["Kotlin", "Spring Boot", "MySQL", "Aurora", "Redis", "JPA", "Querydsl", "GraphQL", "Kafka"],
  },
  {
    name: "일본향 패션 이커머스 나우나우 서비스",
    period: "2020.04 ~ 2022.07",
    bullets: [
      "Elasticsearch를 활용한 일본어 상품 검색 서비스 개발",
      "API latency 개선을 위한 Redis 캐싱 및 비동기 처리 로직 개선",
      "Redis sorted sets 기반 상품 랭킹 기능 개발",
      "상품 할인 이벤트, 쿠폰, 포인트 적립 등 프로모션 기능 개발",
      "물류 대행 업체 및 외부 도매 상품 연동 API 개발",
      "백오피스 backend/frontend 개발",
    ],
    tech: ["Node.js", "TypeScript", "MySQL", "Redis", "GraphQL", "Elasticsearch", "Kibana", "SQS", "Lambda"],
  },
  {
    name: "똑닥 병원/약국 찾기 검색 고도화",
    period: "2019.05 ~ 2019.11",
    summary: "검색 엔진을 이용한 국내 병의원/약국 정보 검색 기능",
    bullets: [
      "Like Query, Regex Query로 인한 Slow Query와 DB 부하 해소를 위해 Elasticsearch 도입",
      "검색어 자동완성 및 검색 키워드 추천 기능 개발",
      "MongoDB Change Stream, AWS Lambda 기반 실시간 검색 엔진 업데이트 처리",
      "사용자 검색 키워드 모니터링을 위한 Kibana Dashboard 구축",
    ],
    tech: ["Node.js", "MongoDB", "AWS Lambda", "Elasticsearch"],
  },
  {
    name: "똑닥 모바일 접수/예약 연동 API 서비스",
    summary: "타 플랫폼에서도 모바일 접수를 제공하기 위한 외부 연동 API 서비스",
    bullets: [
      "여러 플랫폼에서 연동 가능하도록 API 서비스 설계",
      "외부 플랫폼 트래픽으로 인한 DB 부하를 줄이기 위해 Redis Cache-Aside, Write-Back 전략 적용",
      "2019.11 카카오 제휴 종료로 서비스 종료",
    ],
    tech: ["Node.js", "MongoDB", "Redis", "AWS SQS", "Lambda"],
  },
  {
    name: "똑닥 모바일 접수/예약 서비스",
    period: "2017.02 ~ 2020.02",
    summary: "병원 방문 없이 모바일로 접수/예약을 제공하는 서비스",
    bullets: [
      "EMR 차트사와 연계하여 병의원 진료 상태와 모바일 접수/예약 신청을 주고받는 서비스 개발",
      "영유아 검진 예약 및 사전 문진표 기능 개발",
      "사전 문진표 작성 관련 특허 출원 (출원번호: 10-2018-0158500)",
      "병원 접수/예약 설정을 위한 병원 어드민 API 서버 개발",
      "2019년 기준 평균 분당 8~10만 서버 요청 트래픽 처리",
      "event loop lag, SQS, Lambda를 활용한 레거시 성능 개선",
    ],
    tech: ["Node.js", "MongoDB", "DynamoDB", "Redis", "Socket.io"],
  },
];

export const education: ResumeItem[] = [
  {
    name: "강원대학교",
    role: "컴퓨터공학과",
    period: "2008 ~ 2014",
    summary:
      "고등학생 시절부터 프로그래밍에 관심이 많아 컴퓨터공학과로 입학했고, 학과 내 학술 동아리 활동과 학생회 부학생대표를 역임했습니다.",
    bullets: [
      "ZeroOne 학술 동아리 활동: C++, Visual Basic 등 프로그래밍 언어 스터디 및 신입생 프로그래밍 교육 지도",
      "J.S.E.A 학술 동아리 활동: Java, Spring Framework, 소프트웨어 공학 스터디 및 토이 프로젝트 진행",
    ],
  },
];
