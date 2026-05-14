import type { PropsWithChildren } from 'react';

export function PageShell({ children }: PropsWithChildren) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-void text-platinum antialiased">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.16),transparent_32rem)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(97,118,255,0.11),transparent_38%,rgba(255,255,255,0.06))]" />
      <div className="relative z-10">{children}</div>
    </main>
  );
}
