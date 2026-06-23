# SRIDKK Hospital React Redesign

Conversion-focused React + Framer Motion redesign mapped from the cloned SRIDKK HTML snapshot in `../sridkkhospital.com`.

## Stack

- React + Vite
- React Router
- Framer Motion
- Tailwind CSS (via `@tailwindcss/vite`)
- Lucide React icons

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run lint
npm run build
npm run preview
```

## Route Map

- `/` Home
- `/treatments` Treatments list
- `/treatments/:slug` Treatment detail
- `/specialties` Specialties
- `/doctors` Doctors
- `/careers` Careers form
- `/contact` Contact + appointment
- `/blogs` Blog listing

## Content Mapping Source

Primary source was mapped from:

- `../sridkkhospital.com/index.html`
- `../sridkkhospital.com/treatments/index.html`
- `../sridkkhospital.com/our-doctors/index.html`
- `../sridkkhospital.com/careers/index.html`
- `../sridkkhospital.com/contact-us/index.html`
- WordPress JSON snapshots under `../sridkkhospital.com/wp-json/wp/v2/pages/*` and `../sridkkhospital.com/wp-json/wp/v2/posts/*`

Normalized content objects live in `src/data/siteData.js`.

## Form Behavior

No backend API is used in this phase.

- Callback + Appointment forms open WhatsApp with prefilled details.
- Contact + Careers forms open the default mail client (`mailto`) with prefilled details.
- Careers form includes a resume upload picker and instructs manual attachment in email.

## Assets

- Asset manifest: `public/assets/images/asset-manifest.json`
- Source hospital asset + royalty-free placeholders are listed with source URL and usage context.

## UI/UX Improvements Delivered

- Premium medical visual direction with cleaner hierarchy and stronger trust cues.
- Mobile-first responsive layout with sticky mobile CTA bar (Call + Appointment).
- Reusable UI components and data-driven pages to speed future maintenance.
- Framer Motion page transitions and reveal animations with reduced-motion support.
- Improved readability, consistent spacing, and high-visibility conversion CTAs.
