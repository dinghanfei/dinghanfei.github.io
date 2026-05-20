# Ding Hanfei Academic Portfolio

An English-first academic portfolio built with Astro and deployed to GitHub Pages.

## Local Development

```sh
npm install
npm run dev
```

## Common Commands

```sh
npm run check
npm run build
npm run preview
```

## Content Editing

Most visible content lives in `src/data/`:

- `profile.json`: name, introduction, top icon, portrait image, contact links
- `src/content/projects/*.md`: project cards and project detail pages
- `cv.json`: education, experience, awards, skills, and interests

Replace `public/cv/ding-hanfei-cv.pdf` with the final CV when ready.

## Where To Customize Your Information

- Homepage name/intro/contact: edit `src/data/profile.json`.
- Top-left page icon: edit `brandIcon` in `src/data/profile.json`, or replace `public/icons/site-mark.svg`.
- About portrait image: edit `photo.src` in `src/data/profile.json`, or replace `public/profile/avatar.svg`.
- The terminal typing words: edit `data-typed-text` in `src/pages/index.astro`.
- CV content: edit `src/data/cv.json`.
- Project cards and detail pages: add or edit Markdown files in `src/content/projects/`.
- Research title/content: edit the `#research` section in `src/pages/index.astro`.
- Contact icons: replace SVG files in `public/icons/`, or change the icon paths in `profile.json`.
- CV PDF: replace `public/cv/ding-hanfei-cv.pdf`.
- Colors, spacing, font, and scroll effects: edit `src/styles/global.css`.
