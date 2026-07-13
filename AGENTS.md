# Repository Guidelines

## Project Structure & Module Organization

This resume site uses Astro, TypeScript, and Tailwind CSS. `src/pages/index.astro` assembles the page. Shared UI lives in `src/components/`, the document shell is `src/layouts/BaseLayout.astro`, and global animation and print rules are in `src/styles/global.css`. Keep resume content in `src/data/resume.ts`, not components. Static files belong in `public/`: images are under `public/assets/`, and the downloadable document is `public/resume.pdf`. Do not commit generated `dist/` output.

## Build, Test, and Development Commands

- `pnpm install`: install locked dependencies with the declared pnpm version.
- `pnpm run dev`: start Astro's development server with hot reload.
- `pnpm run build`: generate `dist/` and catch compilation errors.
- `pnpm run preview`: serve the production build for final browser and download checks.

Use pnpm only; do not add npm or Yarn lockfiles. If Astro telemetry cannot write in a restricted environment, prefix commands with `ASTRO_TELEMETRY_DISABLED=1`.

## Coding Style & Naming Conventions

Use two-space indentation, double quotes in TypeScript and Astro frontmatter, and trailing commas in multiline objects. Name components in PascalCase (`ExperienceList.astro`) and data fields in camelCase (`companyLogoClass`). Prefer typed data and `.map()` rendering over repeated markup. Use Tailwind utilities; reserve `global.css` for shared behavior and print layout. Keep Korean copy concise and preserve established product and technology names.

## Testing Guidelines

No automated tests or coverage threshold are configured. Every change must pass `pnpm run build`. For UI changes, verify desktop and mobile layouts, scroll reveal, image loading, and console errors. For print or content changes, check both the page and `resume.pdf`; regenerate the PDF when they differ.

## Commit & Pull Request Guidelines

Recent history favors concise Conventional Commit-style subjects such as `fix: skill, project 최신화` and `chore(deps): bump nokogiri`. Use an imperative `type: summary` subject with `feat`, `fix`, `docs`, or `chore`, and keep commits focused.

Pull requests should summarize the user-visible result, list validation commands, and link related issues. Include desktop and mobile screenshots for visual changes, call out PDF updates explicitly, and avoid mixing dependency upgrades with resume content edits.

## Content & Asset Safety

Do not invent performance metrics or disclose confidential internal details. Use verified outcomes only. Optimize new raster assets for the web, prefer WebP for photographs, and preserve recognizable company branding and accessible alt text.
