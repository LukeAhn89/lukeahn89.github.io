# Jungmin Ahn Resume

A bilingual personal resume built as a static website. The Korean resume is available at `/`, and the English resume is available at `/en/`. Each language also has a matching PDF generated from the rendered page during deployment.

## Tech Stack

- [Astro](https://astro.build/) and TypeScript for static page generation and typed resume content
- [Tailwind CSS](https://tailwindcss.com/) for responsive styling and print layouts
- [Simple Icons](https://simpleicons.org/) for the GitHub contact icon
- Headless Chrome for generating the Korean and English PDF resumes
- GitHub Actions and GitHub Pages for automated builds and deployment

## Development

```sh
corepack pnpm install
corepack pnpm run dev
```

The Korean and English resume content lives in `src/data/resume.ko.ts` and `src/data/resume.en.ts`. Shared assets and constants are in `src/data/resume.shared.ts`.

## Build and Test

```sh
# Build the website and both localized PDFs
corepack pnpm run build

# Equivalent explicit command, kept for compatibility
corepack pnpm run build:all

# Run the route, localization, accessibility, and PDF target tests
corepack pnpm test
```

Both build commands write the static website to `dist/`, along with `dist/resume.pdf` and `dist/resume-en.pdf`. During `pnpm run dev`, the same action opens the browser print dialog for the active language instead of linking to a missing generated file.
