'use client';

import { ArrowDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar  from '@/components/SearchBar';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
  window.scrollTo({ top: y, behavior: 'smooth' });
};

export default function Hero({ data }) {
  const heroContent = {
    role: data?.role || "",
    location: data?.location || "",
    availability: data?.availability || "",
    headline: data?.headline || "",
    description: data?.description || "",
    highlights: data?.highlights || [],
    primaryCTA: data?.primaryCTA || { label: "View Projects", href: "#work" },
    secondaryCTA: data?.secondaryCTA || { label: "Download Resume", href: "/resume.pdf" },
    socialLinks: data?.socialLinks || [],
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[--page-bg] text-[--page-fg] border-b border-[--line] px-6 lg:px-12 xl:px-16 pt-20 pb-8 min-h-[100dvh] flex flex-col"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="max-w-[1440px] mx-auto grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-center relative z-10 w-full flex-1 content-center">
        <div className="space-y-4">
          <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1.5 bg-[--chip-bg] text-[--muted] px-3 py-1.5 rounded-full font-mono text-xs border border-[--line] max-w-full">
            <span className="truncate">{heroContent.role}</span>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-[--accent]" />
            <span className="truncate">{heroContent.location}</span>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-[--accent]" />
            <span className="truncate">{heroContent.availability}</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold leading-tight tracking-tight">
              {heroContent.headline}
            </h1>

            <p className="text-base md:text-lg text-[--muted] max-w-2xl">
              {heroContent.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="gap-2" onClick={() => scrollTo('work')}>
              View Work <ArrowDown className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-[--line]"
              onClick={() => scrollTo('resume')}
            >
              Download CV <Download className="h-4 w-4" />
            </Button>
          </div>

          {heroContent.highlights.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              {heroContent.highlights.map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-[120px] rounded-lg border border-[--line] px-3 py-2 bg-[--panel]"
                >
                  <div className="text-xl font-semibold">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wide text-[--muted]">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            {(heroContent.socialLinks.length ? heroContent.socialLinks : []).map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-mono text-[--muted] hover:text-[--page-fg] transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[--accent] group-hover:scale-110 transition-transform" />
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="overflow-hidden rounded-2xl border border-[--line] bg-[--panel] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] h-[420px] xl:h-[500px]">
            <div className="overflow-hidden rounded-xl border border-[--line] relative h-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,243,163,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(125,166,255,0.16),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0))]" />
              <div className="absolute inset-0 grid-background opacity-60" aria-hidden />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-36 w-36 xl:h-44 xl:w-44 rounded-full border border-[--line] flex items-center justify-center">
                  <div className="h-28 w-28 xl:h-32 xl:w-32 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(45,243,163,0.2),rgba(125,166,255,0.18))] border border-[--line]" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg bg-black/40 px-3 py-2 backdrop-blur border border-[--line]">
                <div className="text-sm font-semibold">{heroContent.location || "Kathmandu • Remote"}</div>
                <div className="text-xs text-[--muted] font-mono">Design / Build / Ship</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-6 mx-auto flex w-full max-w-[1440px] justify-center relative z-10">
        <SearchBar />
      </div>
    </section>
  );
}