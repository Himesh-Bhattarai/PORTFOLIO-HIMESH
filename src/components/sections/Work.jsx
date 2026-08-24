import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Work({ data }) {
  const raw = data && Array.isArray(data) ? data : [];
  // Flagship work first: real live deployments + featured, then featured,
  // then the rest — so the strongest evidence gets first attention instead
  // of a flat, undifferentiated grid.
  const projects = [...raw].sort((a, b) => {
    const score = (p) => (p.featured ? 1 : 0) + (p.link ? 1 : 0);
    return score(b) - score(a);
  });

  return (
    <section id="work" className="px-6 lg:px-12 xl:px-16 py-20 border-b border-[--line] bg-[--panel] text-[--page-fg]">
      <div className="max-w-[1440px] mx-auto space-y-10">
        <header className="flex flex-col gap-3">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]">
            Selected work
          </p>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Building software from idea to deployment.</h2>
            <p className="text-[--muted] max-w-2xl">
              These projects demonstrate my experience building full-stack applications, AI-powered solutions, and scalable software using modern technologies. Each reflects real-world problem solving, clean architecture, and a focus on performance and maintainability.
            </p>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => {
            const tags = project.tags || [];
            return (
            <Card
              key={project.title}
              className={`group border-[--line] bg-[--card] transition-transform duration-200 hover:-translate-y-1 ${
                project.featured ? 'ring-1 ring-[--accent]/40' : ''
              }`}
            >
              <Link href={`/projects/${project.slug}`} className="block">
                <div className="relative overflow-hidden border-b border-[--line]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {project.link && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide text-white border border-white/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-[--accent] animate-pulse" />
                        Live
                      </span>
                    )}
                    {project.featured && (
                      <span className="inline-flex items-center rounded-full bg-[--accent] px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide text-black">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/projects/${project.slug}`}>
                      <h3 className="text-xl font-semibold hover:text-[--accent] transition-colors">{project.title}</h3>
                    </Link>
                    <p className="text-[--muted] text-sm leading-relaxed">{project.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2 border-[--line]" asChild>
                    <Link href={`/projects/${project.slug}`}>Case Study</Link>
                  </Button>
                  {(project.link || project.live) && (
                    <Button variant="outline" size="sm" className="gap-2 border-[--line]" asChild>
                      <a href={project.link || project.live} target="_blank" rel="noreferrer">
                        Live <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {project.code && (
                    <Button variant="ghost" size="sm" className="gap-2" asChild>
                      <a href={project.code} target="_blank" rel="noreferrer">
                        Code <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )})}
        </div>
      </div>
    </section>
  );
}
