import { FadeIn } from '../components/ui/FadeIn';

export function HomeHero() {
  return (
    <section className="grid min-h-screen place-items-center px-6 py-24 text-center">
      <FadeIn className="mx-auto max-w-5xl">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.52em] text-white/45">
          Cinematic Site Lab
        </p>
        <h1 className="text-balance text-5xl font-semibold tracking-[-0.055em] text-platinum sm:text-7xl lg:text-8xl">
          Premium landing page experiments for cinematic product stories.
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-8 text-white/58 sm:text-lg">
          A lightweight React, Vite, Tailwind, Framer Motion, and Lenis foundation for
          dark, refined, motion-forward web experiences.
        </p>
      </FadeIn>
    </section>
  );
}
