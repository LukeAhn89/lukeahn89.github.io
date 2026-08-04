# Multilingual Resume Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship Korean and English static resume routes with locale-matched PDFs, explicit BBROS leadership wording, accessible contact icons, and an English project README.

**Architecture:** Keep locale content in typed Korean and English data modules, render both routes through one shared Astro page component, and verify the built HTML with Node's test runner. Generate both PDFs from the built routes with headless Chrome and deploy the resulting `dist/` artifact through GitHub Actions.

**Tech Stack:** Astro 7.1, TypeScript 5.9, Tailwind CSS 4.3, pnpm 10.30, Node test runner, simple-icons, headless Chrome, GitHub Actions, GitHub Pages.

## Global Constraints

- `/` is Korean and `/en/` is English; both must remain static, directly addressable routes.
- Use one shared presentation path; do not duplicate the full Astro page markup.
- Do not add an i18n framework or client-side locale state.
- Preserve verified dates, URLs, product names, technology names, and the existing email address.
- Do not invent metrics, outcomes, team size, or responsibilities during translation.
- Display the BBROS role exactly as `Backend Developer / 접수·예약 개발 파트 리드` in Korean and `Backend Developer / Reception & Appointment Development Lead` in English.
- The top GitHub and email buttons keep visible text and add decorative `aria-hidden="true"` icons.
- Generate `dist/resume.pdf` and `dist/resume-en.pdf`; do not commit generated PDFs or `dist/`.
- Use `ASTRO_TELEMETRY_DISABLED=1` for Astro commands in restricted environments.
- Use two-space indentation, double quotes in TypeScript/Astro frontmatter, and pnpm only.

---

### Task 1: Build the typed locale content and shared multilingual page

**Files:**

- Create: `src/data/resume.types.ts`
- Create: `src/data/resume.shared.ts`
- Create: `src/data/resume.ko.ts`
- Create: `src/data/resume.en.ts`
- Create: `src/components/ResumePage.astro`
- Create: `src/pages/en/index.astro`
- Create: `tests/multilingual-resume.test.mjs`
- Modify: `src/pages/index.astro:1-40`
- Modify: `src/layouts/BaseLayout.astro:1-50`
- Modify: `src/components/Header.astro:1-71`
- Modify: `src/components/HighlightGrid.astro:1-14`
- Modify: `src/components/SkillMatrix.astro:1-69`
- Modify: `src/components/ExperienceList.astro:1-53`
- Modify: `src/components/ProjectGrid.astro:1-43`
- Modify: `src/components/PrintButton.astro:1-8`
- Modify: `package.json:7-11`
- Delete after migration: `src/data/resume.ts`

**Interfaces:**

- Produces: `type Locale = "ko" | "en"`.
- Produces: `type ResumeContent = { locale, meta, profile, highlights, skillGroups, experiences, projects, education, sections, footer, pdf }`.
- Produces: `resumeKo: ResumeContent` and `resumeEn: ResumeContent`.
- Produces: `<ResumePage content={resumeKo} alternateHref="/en/" />` and `<ResumePage content={resumeEn} alternateHref="/" />`.
- `Header.astro` consumes `{ profile, locale, alternateHref, alternateLabel, contactLabel, contactNote }`.
- `BaseLayout.astro` consumes `{ lang, title, description, canonicalPath, alternatePath }`.
- `PrintButton.astro` consumes `{ href, download, label }`.

- [ ] **Step 1: Read the test-quality rules before writing the first test**

Read `superpowers:test-driven-development/writing-good-tests.md`. Name the production changes that make each assertion pass: the English route, shared localized props, metadata, icons, leadership role, and PDF links.

- [ ] **Step 2: Add the failing built-output contract test**

Create `tests/multilingual-resume.test.mjs` with real built-output assertions:

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const readPage = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

test("builds Korean and English resume routes with reciprocal locale metadata", () => {
  const korean = readPage("../dist/index.html");
  const english = readPage("../dist/en/index.html");

  assert.match(korean, /<html lang="ko">/);
  assert.match(english, /<html lang="en">/);
  assert.match(korean, /rel="alternate" hreflang="en" href="https:\/\/lukeahn89\.github\.io\/en\/"/);
  assert.match(english, /rel="alternate" hreflang="ko" href="https:\/\/lukeahn89\.github\.io\/"/);
  assert.match(korean, /href="\/en\/"[^>]*>\s*EN\s*</);
  assert.match(english, /href="\/"[^>]*>\s*KO\s*</);
});

test("renders localized leadership, accessible contact actions, and matching PDFs", () => {
  const korean = readPage("../dist/index.html");
  const english = readPage("../dist/en/index.html");

  assert.match(korean, /Backend Developer \/ 접수·예약 개발 파트 리드/);
  assert.match(english, /Backend Developer \/ Reception &amp; Appointment Development Lead/);
  assert.match(korean, /data-contact-icon="github"/);
  assert.match(korean, /data-contact-icon="email"/);
  assert.match(english, /data-contact-icon="github"/);
  assert.match(english, /data-contact-icon="email"/);
  assert.match(korean, /href="\/resume\.pdf"/);
  assert.match(english, /href="\/resume-en\.pdf"/);
});
```

Add scripts to `package.json`:

```json
"test:resume": "node --test tests/multilingual-resume.test.mjs",
"test": "pnpm run build && pnpm run test:resume"
```

- [ ] **Step 3: Run the contract test and verify the RED state**

Run:

```bash
ASTRO_TELEMETRY_DISABLED=1 corepack pnpm run build
corepack pnpm run test:resume
```

Expected: the build succeeds, then the test fails with `ENOENT` for `dist/en/index.html`. This proves the missing English route is the reason for failure.

- [ ] **Step 4: Extract shared types and career calculation**

Create `src/data/resume.types.ts` with the existing item types plus this complete top-level contract:

```ts
export type Locale = "ko" | "en";

export type Link = {
  label: string;
  href: string;
  icon: "github" | "email";
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
  items: { name: string; icon?: string }[];
};

export type ResumeContent = {
  locale: Locale;
  meta: { title: string; description: string; canonicalPath: "/" | "/en/" };
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
  highlights: { value: string; label: string; detail: string }[];
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
  footer: { references: string };
  pdf: { href: "/resume.pdf" | "/resume-en.pdf"; download: string; label: string };
};
```

Create `src/data/resume.shared.ts`:

```ts
const careerStart = new Date("2013-07-01T00:00:00+09:00");

export const getCareerYear = (date = new Date()) => {
  const anniversary = new Date(date.getFullYear(), careerStart.getMonth(), careerStart.getDate());
  const elapsedYears = date.getFullYear() - careerStart.getFullYear() - (date < anniversary ? 1 : 0);

  return elapsedYears + 1;
};
```

- [ ] **Step 5: Move the Korean source into the typed Korean locale module**

Create `src/data/resume.ko.ts` by moving all current `profile`, `highlights`, `skillGroups`, `experiences`, `projects`, and `education` values into one `resumeKo satisfies ResumeContent` object. Apply the accepted BBROS role and remove the now-duplicative leadership bullet:

```ts
{
  company: "비브로스",
  companyLogo: "/assets/companies/bbros.png",
  companyInitial: "B",
  link: "https://bbros.co.kr",
  role: "Backend Developer / 접수·예약 개발 파트 리드",
  period: "2017.02 ~ 2020.02",
  summary: "국내 모바일 병의원 진료 접수/예약 서비스",
  bullets: [
    "EMR Chart 연계 모바일 접수/예약 시스템 개발",
    "카카오 병원 찾기 연동 모바일 접수 API 시스템 개발",
    "AWS 운영 인프라 구축 운영 및 관리",
    "서버 모니터링을 위한 ELK Stack 구축 및 운영",
    "검색 엔진을 이용한 병원/약국 검색 서비스 개발",
  ],
}
```

Set Korean route labels and PDF data exactly:

```ts
locale: "ko",
meta: {
  title: "안정민 | Software Engineer",
  description: profileSummary,
  canonicalPath: "/",
},
pdf: {
  href: "/resume.pdf",
  download: "안정민_이력서.pdf",
  label: "PDF 다운로드",
},
```

- [ ] **Step 6: Add the complete English locale module**

Create `src/data/resume.en.ts` with the same array ordering, dates, links, logos, technologies, and verified facts as Korean. Translate every human-readable profile, highlight, skill description, experience, project, education, section, footer, image-alt, and PDF label field. Use these exact anchor translations:

```ts
locale: "en",
meta: {
  title: "Jungmin Ahn | Software Engineer",
  description: `Software engineer with ${careerYear} years of experience across backend, frontend, and Windows application development, focused on system architecture and reliable operations.`,
  canonicalPath: "/en/",
},
profile: {
  name: "Jungmin Ahn",
  displayName: "Jungmin Ahn",
  title: "Software Engineer",
  location: "Seoul, Korea",
  contactLabel: "Contact",
  contactNote: "LLM agent systems, generative content workflows, backend engineering, and product reliability.",
},
pdf: {
  href: "/resume-en.pdf",
  download: "Jungmin_Ahn_Resume.pdf",
  label: "Download PDF",
},
```

Use the accepted BBROS entry:

```ts
{
  company: "BBROS",
  companyLogo: "/assets/companies/bbros.png",
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
}
```

Keep official product names such as `GCP Studio`, `LangGraph`, `Zigzag Mate`, and `DDocdoc` recognizable; explain them in English summaries rather than transliterating every Korean word.

- [ ] **Step 7: Refactor components to consume props and add accessible contact icons**

Change data-owning components to accept typed props. In `Header.astro`, import `siGithub` and render the GitHub path, then render a local mail outline path. Keep the visible label next to each icon:

```astro
<svg
  class="h-4 w-4 shrink-0"
  viewBox="0 0 24 24"
  aria-hidden="true"
  data-contact-icon={link.icon}
>
  <path fill="currentColor" d={link.icon === "github" ? siGithub.path : mailIconPath}></path>
</svg>
<span>{link.label}</span>
```

Make contact actions visible on mobile by removing the current `hidden ... sm:inline-flex` behavior. Add the locale link beside them using `alternateHref` and `alternateLabel`. The existing external-link and `mailto:` behavior remains unchanged.

Update `PrintButton.astro` to use props:

```astro
---
type Props = { href: string; download: string; label: string };
const { href, download, label } = Astro.props;
---

<a href={href} download={download} data-print-button>{label}</a>
```

Preserve its full existing classes when replacing the hard-coded attributes.

- [ ] **Step 8: Add shared page assembly and route-specific metadata**

Move the current `index.astro` assembly into `ResumePage.astro`, replacing hard-coded strings and singleton imports with `content` props. Have route files contain only locale selection:

```astro
---
import ResumePage from "../components/ResumePage.astro";
import { resumeKo } from "../data/resume.ko";
---

<ResumePage content={resumeKo} alternateHref="/en/" alternateLabel="EN" />
```

```astro
---
import ResumePage from "../../components/ResumePage.astro";
import { resumeEn } from "../../data/resume.en";
---

<ResumePage content={resumeEn} alternateHref="/" alternateLabel="KO" />
```

Update `BaseLayout.astro` metadata contract:

```astro
---
type Props = {
  lang: "ko" | "en";
  title: string;
  description: string;
  canonicalPath: "/" | "/en/";
  alternatePath: "/" | "/en/";
};

const site = "https://lukeahn89.github.io";
const { lang, title, description, canonicalPath, alternatePath } = Astro.props;
const alternateLang = lang === "ko" ? "en" : "ko";
---
```

Emit canonical, reciprocal alternate, and `x-default` links with absolute URLs. Set `<html lang={lang}>` and the locale-specific Open Graph URL.

- [ ] **Step 9: Run the multilingual contract test and verify GREEN**

Run:

```bash
ASTRO_TELEMETRY_DISABLED=1 corepack pnpm run build
corepack pnpm run test:resume
```

Expected: both tests pass, two static pages are built, and there are no Astro or TypeScript errors.

- [ ] **Step 10: Refactor only after GREEN and commit the page feature**

Remove `src/data/resume.ts`, confirm no imports remain, then run:

```bash
rg -n 'from "\.\./data/resume"|from "\.\./\.\./data/resume"' src
ASTRO_TELEMETRY_DISABLED=1 corepack pnpm test
git diff --check
```

Expected: the import scan has no output, the test suite passes, and the diff check is clean.

Commit:

```bash
git add package.json src tests
git commit -m "feat: add multilingual resume pages"
```

---

### Task 2: Generate and deploy locale-matched PDFs

**Files:**

- Create: `scripts/pdf-targets.mjs`
- Create: `scripts/generate-pdfs.mjs`
- Create: `tests/pdf-targets.test.mjs`
- Modify: `package.json:7-11`
- Modify: `.github/workflows/deploy.yml:18-37`
- Delete: `public/resume.pdf`

**Interfaces:**

- Produces: `pdfTargets = [{ path: "/", output: "resume.pdf" }, { path: "/en/", output: "resume-en.pdf" }]`.
- `generate-pdfs.mjs` consumes `CHROME_PATH` optionally and requires an existing `dist/` build.
- `build:pdf` produces two non-empty PDFs inside `dist/`.
- `build:all` runs the site build followed by PDF generation.

- [ ] **Step 1: Write the failing PDF-target contract test**

Create `tests/pdf-targets.test.mjs`:

```js
import assert from "node:assert/strict";
import test from "node:test";
import { pdfTargets } from "../scripts/pdf-targets.mjs";

test("defines one PDF target per locale route", () => {
  assert.deepEqual(pdfTargets, [
    { path: "/", output: "resume.pdf" },
    { path: "/en/", output: "resume-en.pdf" },
  ]);
});
```

- [ ] **Step 2: Run the PDF-target test and verify RED**

Run: `node --test tests/pdf-targets.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `scripts/pdf-targets.mjs`.

- [ ] **Step 3: Add the minimal PDF target module and verify GREEN**

Create `scripts/pdf-targets.mjs`:

```js
export const pdfTargets = [
  { path: "/", output: "resume.pdf" },
  { path: "/en/", output: "resume-en.pdf" },
];
```

Run: `node --test tests/pdf-targets.test.mjs`

Expected: PASS.

- [ ] **Step 4: Implement deterministic headless Chrome generation**

Create `scripts/generate-pdfs.mjs` that:

1. Verifies `dist/index.html` and `dist/en/index.html` exist.
2. Resolves Chrome from `CHROME_PATH`, macOS Google Chrome, Linux `google-chrome`, or Linux `chromium`.
3. Starts `corepack pnpm exec astro preview --host 127.0.0.1 --port 4327`.
4. Polls `http://127.0.0.1:4327/` until it returns success or a 15-second deadline expires.
5. Runs Chrome once per `pdfTargets` entry with `--headless=new`, `--disable-gpu`, `--no-first-run`, `--no-default-browser-check`, and `--print-to-pdf-no-header`.
6. Writes each file to `dist/<output>` and verifies it is larger than zero bytes.
7. Terminates the preview process in `finally` and forwards an actionable non-zero exit on any failure.

Add scripts:

```json
"build:pdf": "node scripts/generate-pdfs.mjs",
"build:all": "pnpm run build && pnpm run build:pdf",
"test:pdf": "node --test tests/pdf-targets.test.mjs"
```

Extend `test` to run both test files after the Astro build.

- [ ] **Step 5: Verify both local PDFs**

Run:

```bash
ASTRO_TELEMETRY_DISABLED=1 corepack pnpm run build:all
test -s dist/resume.pdf
test -s dist/resume-en.pdf
```

Expected: the build exits zero and both file checks exit zero.

- [ ] **Step 6: Replace the Pages build with an explicit PDF-aware workflow**

Change the build job to these ordered steps:

```yaml
- name: Checkout repository
  uses: actions/checkout@v7

- name: Set up pnpm
  uses: pnpm/action-setup@v4
  with:
    run_install: false

- name: Set up Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: pnpm

- name: Set up Chrome
  uses: browser-actions/setup-chrome@v2
  id: chrome

- name: Install dependencies
  run: pnpm install --frozen-lockfile

- name: Build site and PDFs
  env:
    ASTRO_TELEMETRY_DISABLED: "1"
    CHROME_PATH: ${{ steps.chrome.outputs.chrome-path }}
  run: pnpm run build:all

- name: Upload Pages artifact
  uses: actions/upload-pages-artifact@v4
  with:
    path: dist
```

Keep the existing deploy job and permissions. Remove `withastro/action` because PDF generation now owns the build sequence.

- [ ] **Step 7: Remove the stale committed PDF and run the full test suite**

Remove `public/resume.pdf`; it is recoverable from Git history and must no longer shadow generated output. Run:

```bash
ASTRO_TELEMETRY_DISABLED=1 corepack pnpm test
ASTRO_TELEMETRY_DISABLED=1 corepack pnpm run build:all
git diff --check
```

Expected: all tests pass, both PDFs exist only in ignored `dist/`, and the diff check is clean.

- [ ] **Step 8: Commit the PDF and deployment pipeline**

```bash
git add .github/workflows/deploy.yml package.json scripts tests public/resume.pdf
git commit -m "ci: generate localized resume PDFs"
```

---

### Task 3: Rewrite the README in English

**Files:**

- Modify: `README.md:1-19`

**Interfaces:**

- Documents: `/`, `/en/`, `pnpm run dev`, `pnpm run build`, `pnpm run build:pdf`, `pnpm run build:all`, `pnpm test`, locale content files, and Pages deployment.

- [ ] **Step 1: Replace the README with concise English project documentation**

Use this structure and substance:

```markdown
# Jungmin Ahn Resume

A bilingual personal resume built as a static Astro site. The Korean resume is available at `/`, and the English resume is available at `/en/`.

## Tech Stack

- Astro and TypeScript for static page generation and typed resume content
- Tailwind CSS for responsive and print-aware styling
- pnpm for dependency and script management
- Headless Chrome for Korean and English PDF generation
- GitHub Actions and GitHub Pages for automated deployment

## Development

```sh
pnpm install
pnpm run dev
```

## Build and Test

```sh
pnpm run build
pnpm test
pnpm run build:all
```

`pnpm run build:all` builds the site and generates `dist/resume.pdf` and `dist/resume-en.pdf`. Resume content lives in `src/data/resume.ko.ts` and `src/data/resume.en.ts`; shared presentation components live in `src/components/`.

## Deployment

Pushes to `main` run the GitHub Pages workflow, which builds the site, generates both PDFs, uploads `dist/`, and deploys the artifact.
```

Ensure the nested shell fences render correctly in the actual README by using standard Markdown fences rather than copying the outer plan fence literally.

- [ ] **Step 2: Verify the README references real commands and files**

Run:

```bash
for path in src/data/resume.ko.ts src/data/resume.en.ts src/components; do test -e "$path"; done
corepack pnpm run build
corepack pnpm run build:pdf
rg -n 'Astro|TypeScript|Tailwind CSS|pnpm|Headless Chrome|GitHub Actions|GitHub Pages' README.md
```

Expected: every path and command succeeds, and all seven stack names are present.

- [ ] **Step 3: Commit the README**

```bash
git add README.md
git commit -m "docs: rewrite resume project README"
```

---

### Task 4: Perform browser, accessibility, PDF, and final branch verification

**Files:**

- Modify only when a verified defect requires a focused fix and regression assertion.
- Verify: `dist/index.html`, `dist/en/index.html`, `dist/resume.pdf`, `dist/resume-en.pdf`.

**Interfaces:**

- Consumes: the built static site and PDFs from Tasks 1–3.
- Produces: verified desktop, mobile, metadata, link, console, and PDF evidence suitable for the pull request.

- [ ] **Step 1: Run a clean automated verification pass**

```bash
CI=true corepack pnpm install --frozen-lockfile
ASTRO_TELEMETRY_DISABLED=1 corepack pnpm test
ASTRO_TELEMETRY_DISABLED=1 corepack pnpm run build:all
git diff --check
git status -sb
```

Expected: zero failures, both PDFs generated, no whitespace errors, and only intended source changes are tracked.

- [ ] **Step 2: Start the production preview**

Run: `ASTRO_TELEMETRY_DISABLED=1 corepack pnpm exec astro preview --host 127.0.0.1 --port 4327`

Wait until `http://127.0.0.1:4327/` responds before browser inspection.

- [ ] **Step 3: Verify both routes in a desktop viewport**

Using the browser control skill, inspect `/` and `/en/` at a desktop viewport. Confirm:

- the active language and alternate route are obvious;
- GitHub and email buttons show icons and visible text;
- both actions have correct destinations;
- BBROS leadership appears in the role line and is not duplicated as a bullet;
- every section is in the selected language;
- company logos and profile image load;
- there are no console errors.

Capture one desktop screenshot per locale for the pull request.

- [ ] **Step 4: Verify responsive mobile behavior**

At a 390-pixel viewport, verify both contact actions and the locale switch remain available without horizontal overflow, clipped labels, or overlapping the fixed PDF button. Capture one representative mobile screenshot.

- [ ] **Step 5: Render and inspect both PDFs**

Use the PDF skill to render `dist/resume.pdf` and `dist/resume-en.pdf` to page images. Inspect every page for clipping, blank pages, misplaced fixed controls, missing logos, mixed-language copy, and incorrect contact information. Confirm the language-matched PDF links download the correct files.

- [ ] **Step 6: Add regression coverage before fixing any discovered defect**

If browser or PDF verification reveals a behavior defect, add a failing assertion to the relevant Node test first, observe the expected failure, implement the smallest fix, and rerun the full suite. For purely visual print defects that cannot be asserted in HTML, document the before/after rendered pages and keep the CSS change narrowly scoped.

- [ ] **Step 7: Run final repository and content checks**

```bash
ASTRO_TELEMETRY_DISABLED=1 corepack pnpm test
ASTRO_TELEMETRY_DISABLED=1 corepack pnpm run build:all
git diff --check
rg -n '접수·예약 개발 파트 리드' src/data/resume.ko.ts
rg -n 'Reception & Appointment Development Lead' src/data/resume.en.ts
rg -n 'data-contact-icon="(github|email)"' src/components/Header.astro
git status -sb
```

Expected: every command succeeds and the worktree is clean after final commits.

- [ ] **Step 8: Request code review and address only evidence-backed findings**

Use `superpowers:requesting-code-review`. Any correction must return to its relevant failing test or visual evidence before editing.

- [ ] **Step 9: Push and open a draft pull request**

Push `feat/multilingual-resume` and create a draft PR targeting `main`. The PR description must summarize the bilingual routes, BBROS leadership update, contact icons, dual PDFs, README rewrite, automated tests, browser screenshots, and PDF inspection. Do not merge.

Run `gh pr view --json number,title,url,state,isDraft,headRefName,baseRefName,commits,files` and report the exact PR URL.
