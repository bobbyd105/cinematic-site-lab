# Cinematic Site Lab

A lightweight React + Vite + TypeScript foundation for premium cinematic landing page experiments. The project is intentionally minimal so it can become a reusable lab for Apple/Tesla/Palantir-style dark, motion-forward product pages.

## Stack

- React with TypeScript
- Vite for local development and production builds
- Tailwind CSS via the official Vite plugin
- Framer Motion for declarative entrance and interface motion
- Lenis for smooth scrolling

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Project structure

```text
src/
  assets/              Static experiment assets such as images, video, and textures.
  components/
    layout/            Page-level reusable layout primitives.
    ui/                Small reusable interface and motion primitives.
  hooks/               Shared React hooks and integration utilities.
  sections/            Landing page sections composed from components.
  styles/              Global Tailwind imports, theme tokens, and base styles.
```

## Current homepage

The initial homepage is a dark premium placeholder with a centered headline and smooth Framer Motion fade-in. It does not include the future scroll video hero yet.
