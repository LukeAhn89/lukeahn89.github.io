# Multilingual Resume Design

## Goal

Provide a complete English version of the resume at `/en/` while keeping the Korean resume at `/`, make the BBROS appointment and reservation leadership role prominent in both languages, add GitHub and email icons to the header contact buttons, document the project in an English README, and provide locale-matched downloadable PDFs.

## Confirmed Product Decisions

- `/` remains the canonical Korean resume.
- `/en/` is a separately addressable English resume.
- A visible `KO / EN` control links between the two static routes.
- The Korean PDF remains available as `/resume.pdf`.
- The English PDF is available as `/resume-en.pdf`.
- The BBROS role is displayed as `Backend Developer / 접수·예약 개발 파트 리드` in Korean and `Backend Developer / Reception & Appointment Development Lead` in English.
- The top GitHub and email buttons include recognizable icons while retaining visible text labels.
- `README.md` is rewritten in English and briefly identifies the implementation and delivery stack.
- The existing email address remains unchanged.

## Approaches Considered

### Selected: Static locale routes with shared presentation components

Each route supplies locale-specific content and labels to the same page and section components. This produces crawlable, shareable URLs, makes canonical and alternate metadata explicit, and gives the PDF generator stable locale URLs without client-side state.

### Rejected: Fully duplicated Korean and English pages

Duplicating the page assembly would be initially simple but would allow layout, accessibility, and PDF behavior to drift between languages.

### Rejected: Client-side language state on one URL

A browser-only toggle would reduce route files but complicate direct sharing, SEO metadata, no-JavaScript behavior, and deterministic PDF generation.

## Content Model

Resume copy is separated from presentation:

- `src/data/resume.types.ts` owns shared `Link`, `ResumeItem`, `SkillGroup`, `Profile`, `Highlight`, section-label, and complete resume-content types.
- `src/data/resume.ko.ts` contains the complete Korean resume.
- `src/data/resume.en.ts` contains a faithful English translation of the same profile, highlights, skills, experiences, projects, and education.
- Technology names, company names, product names, dates, URLs, and verified responsibilities remain aligned across locales.
- English copy is idiomatic resume English rather than word-for-word translation, but it must not add metrics, scope, or outcomes not present in the Korean source.

The current career-year calculation remains shared so both locales show the same number. Locale files provide only the surrounding localized wording.

## Page and Component Architecture

`src/components/ResumePage.astro` becomes the shared page assembly. It receives one complete locale content object plus route metadata and passes data into presentation components.

The existing components stop importing Korean singleton data directly:

- `Header.astro` receives the profile, locale switch information, localized labels, and contact copy.
- `HighlightGrid.astro` receives highlights.
- `SkillMatrix.astro` receives skill groups.
- `ExperienceList.astro` and `ProjectGrid.astro` continue receiving item arrays but import types from `resume.types.ts`.
- `PrintButton.astro` receives the localized label, PDF URL, and download filename.
- `Section.astro` remains presentation-only.

`src/pages/index.astro` supplies Korean content. `src/pages/en/index.astro` supplies English content. No client-side locale store or translation dependency is introduced.

## Language, Metadata, and Navigation

`BaseLayout.astro` receives `lang`, canonical URL, and alternate locale URL instead of hard-coding Korean metadata. It emits:

- the correct `<html lang>` value;
- locale-specific title and description;
- locale-specific canonical and Open Graph URLs;
- reciprocal `hreflang="ko"` and `hreflang="en"` links;
- an `x-default` link to `/`.

The header language control is a normal link, so it works without JavaScript and preserves expected browser navigation. It is hidden from print output.

## Contact Icons and Accessibility

GitHub and email actions remain text buttons and gain inline SVG icons. The SVGs are decorative (`aria-hidden="true"`) because the visible labels already provide accessible names. The GitHub link opens in a new tab with the existing safe `rel` value; the email link remains a `mailto:` action.

The mobile layout must continue to expose both contact actions rather than hiding them at small breakpoints. Focus-visible styling, sufficient contrast, and target sizes are preserved.

## BBROS Leadership Content

Leadership is moved from a low-visibility bullet into the BBROS role line in each locale. The supporting bullet remains only if it adds distinct context; otherwise it is removed to avoid repeating the same claim twice. Project and experience descriptions continue to identify the mobile clinic reception and appointment domain.

## PDF Delivery

The repository currently stores a Korean PDF but has no reproducible PDF generator. This change makes both PDFs build artifacts:

- `scripts/generate-pdfs.mjs` starts the built Astro preview, waits for it to become reachable, and prints `/` and `/en/` through headless Chrome.
- The outputs are `dist/resume.pdf` and `dist/resume-en.pdf`.
- `CHROME_PATH` can select Chrome explicitly; the script otherwise checks supported local executable locations and exits with an actionable error when Chrome is unavailable.
- The preview process is terminated on success or failure.
- `package.json` exposes `build`, `build:pdf`, and `build:all` commands.
- The deployment workflow installs dependencies and Chrome, runs `build:all`, uploads `dist`, and deploys the resulting Pages artifact.
- The tracked `public/resume.pdf` is removed so deployed PDFs cannot silently drift from the current page content. Git history remains the recovery path for the old binary.

The PDF buttons point to the matching generated artifact and use localized filenames.

## README

`README.md` is rewritten in English with these concise sections:

- project overview and Korean/English routes;
- technology stack: Astro, TypeScript, Tailwind CSS, pnpm, GitHub Actions, and headless Chrome PDF generation;
- local development commands;
- site and PDF build commands;
- content locations and deployment behavior.

The README avoids turning into a portfolio narrative or duplicating the resume content.

## Verification Strategy

Behavior is developed test-first with Node's built-in test runner and built HTML:

1. A failing integration test first asserts that both route outputs exist and expose the correct `lang`, canonical/alternate metadata, locale switch targets, localized BBROS leadership role, contact actions, icon markup, and locale-matched PDF links.
2. The minimal data and shared-page implementation makes those assertions pass.
3. The complete suite runs against a fresh Astro build.

Final verification includes:

- `ASTRO_TELEMETRY_DISABLED=1 corepack pnpm run build`;
- the locale integration tests;
- `corepack pnpm run build:pdf` with both PDF files present and non-empty;
- desktop and mobile checks of `/` and `/en/` for layout, language navigation, contact links, image loading, and console errors;
- rendered inspection of both PDFs for clipping, page count, language, and correct contact information;
- `git diff --check` and a scan for untranslated Korean copy in the English route data, allowing only proper nouns that intentionally remain Korean.

## Error Handling and Constraints

- Missing locale data is a build-time type or test failure; there is no runtime translation fallback that could mix languages.
- PDF generation fails the build when Chrome, preview startup, either route, or either output fails.
- Existing branding, dates, links, and verified facts are preserved.
- No new client-side framework or internationalization package is added.
- Generated `dist/` output and generated PDFs are not committed.

## Delivery

Implementation remains on `feat/multilingual-resume`, based on the current `origin/main` that already contains PR #12. The work is verified locally, committed in focused steps, pushed, and delivered as a draft pull request for review without merging.
