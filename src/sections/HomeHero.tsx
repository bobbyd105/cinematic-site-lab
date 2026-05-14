import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { FadeIn } from '../components/ui/FadeIn';

const scrollBeats = [
  {
    label: '01 / Atmosphere',
    title: 'Open on a full-frame cinematic canvas.',
    body: 'The hero video breathes with the scroll, expanding from a composed poster into an immersive product stage.',
  },
  {
    label: '02 / Direction',
    title: 'Let motion guide the narrative rhythm.',
    body: 'Progressive overlays, soft masks, and measured typography keep the experience premium without overwhelming the story.',
  },
  {
    label: '03 / Conversion',
    title: 'Land on a confident, action-ready frame.',
    body: 'The final beat resolves into crisp calls to action for teams ready to prototype elevated launch pages.',
  },
];

const proofPoints = [
  'Scroll-linked hero motion',
  'Responsive motion fallback',
  'Post-hero content handoff',
];

type ScrollBeatCardProps = {
  beat: (typeof scrollBeats)[number];
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
};

function ScrollBeatCard({ beat, index, progress, reduceMotion }: ScrollBeatCardProps) {
  const start = index / scrollBeats.length;
  const midpoint = (index + 0.5) / scrollBeats.length;
  const end = (index + 1) / scrollBeats.length;
  const opacity = useTransform(progress, [start, midpoint, end], [0.34, 1, 0.34]);
  const y = useTransform(progress, [start, midpoint, end], [18, 0, -18]);

  return (
    <motion.article
      className="rounded-3xl border border-white/10 bg-void/46 p-4 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-5"
      style={{ opacity: reduceMotion ? 1 : opacity, y: reduceMotion ? 0 : y }}
    >
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/44">
        {beat.label}
      </p>
      <h2 className="mt-3 text-lg font-semibold tracking-[-0.035em] text-platinum sm:mt-4 sm:text-xl">
        {beat.title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-white/58 sm:mt-3">{beat.body}</p>
    </motion.article>
  );
}

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = Boolean(shouldReduceMotion);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.74, 1, 1.08]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.08, 0.82, 1], [0.38, 0.88, 0.92, 0.52]);
  const videoRadius = useTransform(scrollYProgress, [0, 0.48, 1], ['2.5rem', '1.25rem', '0rem']);
  const headlineY = useTransform(scrollYProgress, [0, 0.35], [0, -96]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.28, 0.42], [1, 0.92, 0]);
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <section ref={sectionRef} className="relative min-h-[420vh]" aria-labelledby="home-hero-title">
        <div className="sticky top-0 grid min-h-svh overflow-hidden px-5 py-6 sm:px-8 sm:py-8 lg:px-12">
          <motion.div
            className="absolute inset-x-4 top-20 bottom-20 overflow-hidden border border-white/12 bg-graphite/80 shadow-[0_0_120px_rgba(90,108,255,0.22)] sm:inset-x-8 sm:top-24 sm:bottom-24 lg:inset-x-12"
            style={{
              borderRadius: reduceMotion ? '1.5rem' : videoRadius,
              opacity: reduceMotion ? 0.86 : videoOpacity,
              scale: reduceMotion ? 1 : videoScale,
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_28%,rgba(245,245,240,0.34),transparent_22rem),linear-gradient(135deg,rgba(97,118,255,0.48),rgba(3,3,5,0.22)_46%,rgba(3,3,5,0.96))] sm:hidden" />
            <video
              className="hidden h-full w-full object-cover sm:block"
              src="/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Abstract cinematic hero footage"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(3,3,5,0.14)_42%,rgba(3,3,5,0.92)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,5,0.32)_0%,transparent_34%,rgba(3,3,5,0.88)_100%)]" />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,5,0.92),transparent_24%,transparent_76%,rgba(3,3,5,0.92))]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(3,3,5,0.54)_72%)]" />

          <div className="relative z-10 flex min-h-full flex-col justify-between py-4 sm:py-6">
            <motion.div
              className="mx-auto mt-12 max-w-6xl text-center sm:mt-20 lg:mt-24"
              style={{
                y: reduceMotion ? 0 : headlineY,
                opacity: reduceMotion ? 1 : headlineOpacity,
              }}
            >
              <FadeIn>
                <p className="mb-5 text-xs font-medium uppercase tracking-[0.44em] text-white/48 sm:mb-6 sm:tracking-[0.52em]">
                  Cinematic Site Lab
                </p>
                <h1
                  id="home-hero-title"
                  className="text-balance text-4xl font-semibold tracking-[-0.06em] text-platinum sm:text-7xl lg:text-8xl"
                >
                  Scroll-shaped product stories with cinematic depth.
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-pretty text-sm leading-7 text-white/64 sm:mt-8 sm:text-lg sm:leading-8">
                  A premium React, Vite, Tailwind, Framer Motion, and Lenis experiment that
                  turns a single hero reel into a paced landing-page narrative.
                </p>
              </FadeIn>
            </motion.div>

            <div className="mx-auto grid w-full max-w-6xl gap-5 pb-5 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <FadeIn delay={0.18} className="hidden max-w-md lg:block">
                <div className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/50 backdrop-blur-md">
                  Scroll to direct the sequence
                </div>
              </FadeIn>

              <div className="grid gap-3 sm:grid-cols-3">
                {scrollBeats.map((beat, index) => (
                  <ScrollBeatCard
                    key={beat.label}
                    beat={beat}
                    index={index}
                    progress={scrollYProgress}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-x-5 bottom-5 z-20 h-px overflow-hidden rounded-full bg-white/12 sm:inset-x-8 lg:inset-x-12">
            <motion.div className="h-full origin-left bg-platinum" style={{ scaleX: progressScaleX }} />
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid min-h-svh w-full max-w-6xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:px-12">
        <FadeIn className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/42">After the hero</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-platinum sm:text-6xl">
            The story resolves into content that keeps the page moving.
          </h2>
        </FadeIn>

        <div className="grid gap-4">
          {proofPoints.map((point) => (
            <div
              key={point}
              className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 text-lg font-medium text-white/72 backdrop-blur-xl"
            >
              {point}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
