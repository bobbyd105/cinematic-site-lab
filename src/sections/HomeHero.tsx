import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { FadeIn } from '../components/ui/FadeIn';

const scrollBeats = [
  {
    label: '01 / Regional visibility',
    title: 'See public-sector opportunity flow before the market reacts.',
    body: 'Track agency notices, planned work, and capital programs across the regions your civil teams already serve.',
  },
  {
    label: '02 / Asset corridors',
    title: 'Map utility, drainage, and transportation work into a single operating view.',
    body: 'InfraSignal connects procurement signals to places, routes, districts, and owners so teams can qualify earlier.',
  },
  {
    label: '03 / Live procurement',
    title: 'Move from scattered agency pages to a live pursuit rhythm.',
    body: 'Surface bid activity, pre-RFP movement, and funding context in time for capture teams to act with confidence.',
  },
];

const proofPoints = [
  {
    label: 'Capital program monitoring',
    value: '312 active programs',
    body: 'Regional plans, CIP updates, bond-funded work, and agency board actions organized by market.',
  },
  {
    label: 'Live agency activity feeds',
    value: '18 notices today',
    body: 'Procurement snippets from transportation, water, drainage, and municipal owners in one review queue.',
  },
  {
    label: 'Surface-level intelligence layer',
    value: '7 county corridor',
    body: 'Fast awareness for civil firms that need early context without rebuilding their internal workflow.',
  },
];

const regionalMetrics = [
  { label: 'North Basin', value: '42', detail: 'open utility notices' },
  { label: 'I-84 Corridor', value: '9', detail: 'transport packages' },
  { label: 'Delta County', value: '$186M', detail: 'CIP visibility' },
];

const feedSnippets = [
  'Water authority RFQ posted · 14 min',
  'Drainage district agenda item · 31 min',
  'DOT resurfacing package updated · 1 hr',
];

const mobileViewportQuery = '(max-width: 639px)';

function getIsMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia(mobileViewportQuery).matches;
}

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
      className="rounded-3xl border border-white/10 bg-void/44 p-4 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-5"
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
  const [videoHasError, setVideoHasError] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(getIsMobileViewport);
  const heroVideoSrc = `${import.meta.env.BASE_URL}hero.mp4`;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const mobileViewport = window.matchMedia(mobileViewportQuery);
    const updateViewportMode = () => setIsMobileViewport(mobileViewport.matches);

    updateViewportMode();
    mobileViewport.addEventListener('change', updateViewportMode);

    return () => mobileViewport.removeEventListener('change', updateViewportMode);
  }, []);

  const shouldScrubVideo = !reduceMotion && !isMobileViewport;

  const videoScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.74, 1, 1.08]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.08, 0.82, 1], [0.38, 0.88, 0.92, 0.52]);
  const videoRadius = useTransform(scrollYProgress, [0, 0.48, 1], ['2.5rem', '1.25rem', '0rem']);
  const headlineY = useTransform(scrollYProgress, [0, 0.35], [0, -96]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.28, 0.42], [1, 0.92, 0]);
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const feedY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const metricY = useTransform(scrollYProgress, [0, 1], [18, -10]);

  return (
    <>
      <section ref={sectionRef} className="relative min-h-[420vh]" aria-labelledby="home-hero-title">
        <div className="sticky top-0 grid min-h-svh overflow-hidden px-5 py-6 sm:px-8 sm:py-8 lg:px-12">
          <motion.div
            className="absolute inset-x-4 top-20 bottom-20 overflow-hidden border border-white/12 bg-graphite/80 shadow-[0_0_120px_rgba(90,108,255,0.22)] sm:inset-x-8 sm:top-24 sm:bottom-24 lg:inset-x-12"
            style={{
              borderRadius: shouldScrubVideo ? videoRadius : '1.5rem',
              opacity: shouldScrubVideo ? videoOpacity : 0.86,
              scale: shouldScrubVideo ? videoScale : 1,
            }}
          >
            <video
              className="block h-full w-full object-cover"
              src={heroVideoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Abstract infrastructure intelligence background footage"
              onLoadedMetadata={() => setVideoHasError(false)}
              onError={() => setVideoHasError(true)}
            />
            {videoHasError && (
              <div
                className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_48%_28%,rgba(245,245,240,0.22),transparent_22rem),linear-gradient(135deg,rgba(97,118,255,0.42),rgba(3,3,5,0.72)_52%,rgba(3,3,5,0.96))] px-6 text-center"
                role="status"
                aria-live="polite"
              >
                <p className="max-w-sm rounded-full border border-white/14 bg-void/58 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-platinum/80 shadow-2xl shadow-black/30 backdrop-blur-xl">
                  Infrastructure preview unavailable
                </p>
              </div>
            )}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(3,3,5,0.12)_44%,rgba(3,3,5,0.84)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,5,0.24)_0%,transparent_36%,rgba(3,3,5,0.76)_100%)]" />

            <div className="pointer-events-none absolute inset-6 hidden overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.025)_48%,transparent_100%)] sm:block">
              <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:4.5rem_4.5rem]" />
              <div className="absolute left-[12%] top-[34%] h-px w-[34%] rotate-[-13deg] bg-gradient-to-r from-transparent via-platinum/48 to-transparent" />
              <div className="absolute right-[14%] top-[46%] h-px w-[28%] rotate-[18deg] bg-gradient-to-r from-transparent via-platinum/38 to-transparent" />
              <div className="absolute left-[38%] top-[25%] h-[36%] w-px rotate-[26deg] bg-gradient-to-b from-transparent via-white/28 to-transparent" />
              {['NORTH BASIN', 'DELTA COUNTY', 'I-84 CORRIDOR'].map((label, index) => (
                <div
                  key={label}
                  className="absolute rounded-full border border-white/12 bg-void/46 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-platinum/70 shadow-2xl shadow-black/30 backdrop-blur-md"
                  style={{
                    left: `${18 + index * 25}%`,
                    top: `${30 + (index % 2) * 22}%`,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            <motion.div
              className="pointer-events-none absolute right-5 top-5 hidden w-64 rounded-3xl border border-white/10 bg-void/52 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl md:block"
              style={{ y: reduceMotion ? 0 : feedY }}
            >
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-white/42">Live procurement flow</p>
              <div className="mt-4 space-y-3">
                {feedSnippets.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-xs text-white/66">
                    <span className="h-1.5 w-1.5 rounded-full bg-platinum/70 shadow-[0_0_18px_rgba(245,245,240,0.65)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="pointer-events-none absolute bottom-5 left-5 hidden grid-cols-3 gap-2 md:grid"
              style={{ y: reduceMotion ? 0 : metricY }}
            >
              {regionalMetrics.map((metric) => (
                <div key={metric.label} className="w-36 rounded-2xl border border-white/10 bg-void/48 p-3 backdrop-blur-xl">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-white/38">{metric.label}</p>
                  <p className="mt-2 text-lg font-semibold tracking-[-0.04em] text-platinum">{metric.value}</p>
                  <p className="mt-1 text-[0.68rem] text-white/50">{metric.detail}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,5,0.84),transparent_24%,transparent_76%,rgba(3,3,5,0.84))]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(3,3,5,0.44)_72%)]" />

          <div className="relative z-10 flex min-h-full flex-col justify-between py-4 sm:py-6">
            <motion.div
              className="mx-auto mt-10 max-w-6xl text-center sm:mt-20 lg:mt-24"
              style={{
                y: reduceMotion ? 0 : headlineY,
                opacity: reduceMotion ? 1 : headlineOpacity,
              }}
            >
              <FadeIn>
                <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-white/54 sm:mb-6 sm:tracking-[0.48em]">
                  InfraSignal / Infrastructure Procurement Intelligence
                </p>
                <h1
                  id="home-hero-title"
                  className="text-balance text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.06em] text-platinum sm:text-7xl lg:text-8xl"
                >
                  Infrastructure intelligence for firms that move early.
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-white/68 sm:mt-8 sm:text-lg sm:leading-8">
                  InfraSignal gives civil teams a live view into public-sector opportunity flow, regional capital programs, and agency procurement movement across utility, drainage, and transportation markets.
                </p>
              </FadeIn>
            </motion.div>

            <div className="mx-auto grid w-full max-w-6xl gap-5 pb-5 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <FadeIn delay={0.18} className="hidden max-w-md lg:block">
                <div className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/50 backdrop-blur-md">
                  Scroll for regional signal layers
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
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/42">Surface-level intelligence layer</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-platinum sm:text-6xl">
            Regional procurement awareness without another research backlog.
          </h2>
          <p className="mt-6 text-base leading-8 text-white/58 sm:text-lg">
            Monitor where agencies are planning, funding, and releasing infrastructure work so business development and capture teams can prioritize the right conversations.
          </p>
        </FadeIn>

        <div className="grid gap-4">
          {proofPoints.map((point) => (
            <div
              key={point.label}
              className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-lg font-medium text-white/78">{point.label}</p>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-platinum/70">
                  {point.value}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/54">{point.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
