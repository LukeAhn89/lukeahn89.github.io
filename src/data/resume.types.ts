export type Locale = "ko" | "en";

export type Link = {
  label: string;
  href: string;
  icon: "github" | "email";
};

export type ResumeItem = {
  company?: string;
  companyLogo?: string;
  companyLogoAlt?: string;
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

export type ResumeContent = {
  locale: Locale;
  meta: {
    title: string;
    description: string;
    canonicalPath: "/" | "/en/";
  };
  profile: {
    name: string;
    displayName: string;
    title: string;
    email: string;
    github: string;
    image: string;
    imageAlt: string;
    location: string;
    summary: string;
    principles: string[];
    links: Link[];
    contactLabel: string;
    contactNote: string;
  };
  highlights: {
    value: string;
    label: string;
    detail: string;
  }[];
  skillGroups: SkillGroup[];
  experiences: ResumeItem[];
  projects: ResumeItem[];
  education: ResumeItem[];
  sections: {
    skills: { eyebrow: string; title: string; description: string };
    experience: { eyebrow: string; title: string; description: string };
    projects: { eyebrow: string; title: string; description: string };
    education: { eyebrow: string; title: string };
  };
  footer: {
    references: string;
  };
  pdf: {
    href: "/resume.pdf" | "/resume-en.pdf";
    download: string;
    label: string;
  };
};
