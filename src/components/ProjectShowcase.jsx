import Link from 'next/link';
import { ExternalLink, Github, FileText, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const sectionNav = [
  { id: 'overview', label: 'Overview' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'features', label: 'Features' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'folder-structure', label: 'Folder Structure' },
  { id: 'api-docs', label: 'API' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'performance', label: 'Performance' },
  { id: 'future-improvements', label: 'Roadmap' },
  { id: 'lessons-learned', label: 'Lessons' },
  { id: 'recruiter-summary', label: 'Recruiter Summary' },
];

function PlaceholderImage({ caption }) {
  return (
    <div className="flex h-56 w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-[--line] bg-[--chip-bg] text-center text-xs text-[--muted]">
      <span>Screenshot not added yet</span>
      {caption && <span className="text-[--muted]">{caption}</span>}
    </div>
  );
}

function Section({ id, title, children }) {
  if (!children) return null;
  return (
    <section id={id} className="space-y-4 border-t border-[--line] pt-10 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="space-y-4 text-sm text-[--muted]">{children}</div>
    </section>
  );
}

function TagList({ items }) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]">
          {item}
        </span>
      ))}
    </div>
  );
}

function StackGroup({ label, items }) {
  if (!items?.length) return null;
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-mono uppercase tracking-wide text-[--muted]">{label}</h4>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.name}>
            <span className="text-[--page-fg] font-medium">{item.name}</span>
            {item.why && <span> — {item.why}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectShowcase({ data }) {
  if (!data) return null;

  return (
    <article className="px-6 lg:px-12 py-16 text-[--page-fg]">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Breadcrumb — Home / Work / <project> / <every section>, click any
            crumb to jump straight there instead of scrolling */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-x-2 gap-y-1.5 border-b border-[--line] pb-6 text-xs font-mono text-[--muted]"
        >
          <Link href="/" className="hover:text-[--page-fg] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#work" className="hover:text-[--page-fg] transition-colors">Work</Link>
          <span>/</span>
          <a href="#top" className="text-[--page-fg] hover:text-[--accent] transition-colors">{data.title}</a>
          {sectionNav.map((item) => (
            <span key={item.id} className="flex items-center gap-2">
              <span>/</span>
              <a href={`#${item.id}`} className="hover:text-[--page-fg] transition-colors">{item.label}</a>
            </span>
          ))}
        </nav>

        {/* 1. Hero */}
        <header id="top" className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{data.title}</h1>
          <p className="max-w-2xl text-[--muted]">{data.oneLiner}</p>
          <div className="flex flex-wrap gap-4 text-sm text-[--muted]">
            {data.status && <span><strong className="text-[--page-fg]">Status:</strong> {data.status}</span>}
            {data.duration && <span><strong className="text-[--page-fg]">Duration:</strong> {data.duration}</span>}
            {data.role && <span><strong className="text-[--page-fg]">Role:</strong> {data.role}</span>}
            {data.teamSize && <span><strong className="text-[--page-fg]">Team:</strong> {data.teamSize}</span>}
          </div>
          <div className="flex gap-2">
            {data.links?.demo && (
              <Button variant="outline" size="sm" className="gap-2 border-[--line]" asChild>
                <a href={data.links.demo} target="_blank" rel="noreferrer">Live Demo <ExternalLink className="h-4 w-4" /></a>
              </Button>
            )}
            {data.links?.github && (
              <Button variant="ghost" size="sm" className="gap-2" asChild>
                <a href={data.links.github} target="_blank" rel="noreferrer">GitHub <Github className="h-4 w-4" /></a>
              </Button>
            )}
            {data.links?.docs && (
              <Button variant="ghost" size="sm" className="gap-2" asChild>
                <a href={data.links.docs} target="_blank" rel="noreferrer">Documentation <FileText className="h-4 w-4" /></a>
              </Button>
            )}
          </div>
          {data.banner ? (
            <img
              src={data.banner}
              alt={`${data.title} banner`}
              className="h-56 w-full rounded-lg border border-[--line] object-cover sm:h-72"
            />
          ) : (
            <PlaceholderImage caption={`No banner yet for ${data.title}`} />
          )}
        </header>

        {/* 2. Overview */}
        <Section id="overview" title="Overview">
          {data.overview?.purpose && <p><strong className="text-[--page-fg]">Purpose:</strong> {data.overview.purpose}</p>}
          {data.overview?.targetUsers && <p><strong className="text-[--page-fg]">Target users:</strong> {data.overview.targetUsers}</p>}
          {data.overview?.businessProblem && <p><strong className="text-[--page-fg]">Problem:</strong> {data.overview.businessProblem}</p>}
          {data.overview?.objectives?.length > 0 && (
            <ul className="list-disc list-inside space-y-1">
              {data.overview.objectives.map((o) => <li key={o}>{o}</li>)}
            </ul>
          )}
        </Section>

        {/* 3. Tech Stack */}
        <Section id="tech-stack" title="Tech Stack">
          {data.techStackNote && <p className="italic">{data.techStackNote}</p>}
          <div className="grid gap-6 sm:grid-cols-2">
            <StackGroup label="Frontend" items={data.techStack?.frontend} />
            <StackGroup label="Backend" items={data.techStack?.backend} />
            <StackGroup label="Database" items={data.techStack?.database} />
            <StackGroup label="Auth" items={data.techStack?.auth} />
            <StackGroup label="AI" items={data.techStack?.ai} />
            <StackGroup label="DevOps" items={data.techStack?.devops} />
            <StackGroup label="Deployment" items={data.techStack?.deployment} />
            <StackGroup label="Libraries" items={data.techStack?.libraries} />
          </div>
        </Section>

        {/* 4. Features */}
        <Section id="features" title="Features">
          {data.features?.length > 0 ? (
            <div className="space-y-4">
              {data.features.map((f) => (
                <Card key={f.name} className="border-[--line] bg-[--card]">
                  <CardHeader className="pb-2"><h3 className="text-base font-semibold text-[--page-fg]">{f.name}</h3></CardHeader>
                  <CardContent className="space-y-1 text-sm">
                    {f.description && <p>{f.description}</p>}
                    {f.implementation && <p><strong className="text-[--page-fg]">How:</strong> {f.implementation}</p>}
                    {f.challenges && <p><strong className="text-[--page-fg]">Challenge:</strong> {f.challenges}</p>}
                    {f.benefits && <p><strong className="text-[--page-fg]">Benefit:</strong> {f.benefits}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : <p>Not documented yet.</p>}
        </Section>

        {/* 5. Architecture */}
        <Section id="architecture" title="Architecture">
          {data.architecture?.flow?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              {data.architecture.flow.map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded border border-[--line] bg-[--chip-bg] px-3 py-1">{step}</span>
                  {i < data.architecture.flow.length - 1 && <span>→</span>}
                </span>
              ))}
            </div>
          )}
          {data.architecture?.folderStructure && (
            <p id="folder-structure" className="scroll-mt-24">
              <strong className="text-[--page-fg]">Folder structure:</strong> {data.architecture.folderStructure}
            </p>
          )}
          {data.architecture?.appFlow && <p><strong className="text-[--page-fg]">App flow:</strong> {data.architecture.appFlow}</p>}
          {data.architecture?.authFlow && <p><strong className="text-[--page-fg]">Auth flow:</strong> {data.architecture.authFlow}</p>}
          {data.architecture?.requestLifecycle && <p><strong className="text-[--page-fg]">Request lifecycle:</strong> {data.architecture.requestLifecycle}</p>}
        </Section>

        {/* 6. Database Design */}
        <Section id="database-design" title="Database Design">
          {data.databaseDesign?.collections?.length > 0 && (
            <ul className="list-disc list-inside space-y-1">
              {data.databaseDesign.collections.map((c) => (
                <li key={c.name}><strong className="text-[--page-fg]">{c.name}</strong>{c.notes ? ` — ${c.notes}` : ''}</li>
              ))}
            </ul>
          )}
          {data.databaseDesign?.reasoning && <p>{data.databaseDesign.reasoning}</p>}
        </Section>

        {/* 7. API Documentation */}
        <Section id="api-docs" title="API Documentation">
          {data.apiDocsNote && <p className="italic">{data.apiDocsNote}</p>}
          {data.apiDocs?.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[--line] text-[--page-fg]">
                    <th className="py-2 pr-4">Method</th>
                    <th className="py-2 pr-4">URL</th>
                    <th className="py-2 pr-4">Purpose</th>
                    <th className="py-2">Auth</th>
                  </tr>
                </thead>
                <tbody>
                  {data.apiDocs.map((d) => (
                    <tr key={d.url + d.method} className="border-b border-[--line]">
                      <td className="py-2 pr-4 font-mono">{d.method}</td>
                      <td className="py-2 pr-4 font-mono">{d.url}</td>
                      <td className="py-2 pr-4">{d.purpose}</td>
                      <td className="py-2">{d.auth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        {/* 8. Authentication Flow */}
        <Section id="auth-flow" title="Authentication Flow">
          {Object.entries(data.authFlow || {}).map(([key, value]) => value && (
            <p key={key}><strong className="text-[--page-fg] capitalize">{key}:</strong> {value}</p>
          ))}
        </Section>

        {/* 9. Screenshots */}
        <Section id="screenshots" title="Screenshots">
          {data.screenshots?.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {data.screenshots.map((s) => (
                <figure key={s.caption}>
                  {s.url ? <img src={s.url} alt={s.caption} className="rounded-lg" /> : <PlaceholderImage caption={s.caption} />}
                  <figcaption className="mt-1 text-xs">{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          ) : <PlaceholderImage caption={`No screenshots added yet for ${data.title}`} />}
        </Section>

        {/* 10. Challenges */}
        <Section id="challenges" title="Challenges">
          {data.challenges?.length > 0 ? (
            <div className="space-y-4">
              {data.challenges.map((c) => (
                <Card key={c.problem} className="border-[--line] bg-[--card]">
                  <CardContent className="space-y-1 pt-4 text-sm">
                    <p><strong className="text-[--page-fg]">Problem:</strong> {c.problem}</p>
                    {c.why && <p><strong className="text-[--page-fg]">Why:</strong> {c.why}</p>}
                    {c.solution && <p><strong className="text-[--page-fg]">Solution:</strong> {c.solution}</p>}
                    {c.tradeoffs && <p><strong className="text-[--page-fg]">Tradeoffs:</strong> {c.tradeoffs}</p>}
                    {c.lessons && <p><strong className="text-[--page-fg]">Lessons:</strong> {c.lessons}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : <p>None documented yet.</p>}
        </Section>

        {/* 11. Performance */}
        <Section id="performance" title="Performance">
          {data.performance?.lighthouse && <p><strong className="text-[--page-fg]">Lighthouse:</strong> {data.performance.lighthouse}</p>}
          {data.performance?.techniques?.length > 0 && (
            <ul className="list-disc list-inside space-y-1">{data.performance.techniques.map((t) => <li key={t}>{t}</li>)}</ul>
          )}
        </Section>

        {/* 12. Security */}
        <Section id="security" title="Security">
          {data.security?.considerations?.length > 0 && (
            <ul className="list-disc list-inside space-y-1">{data.security.considerations.map((s) => <li key={s}>{s}</li>)}</ul>
          )}
        </Section>

        {/* 13. Deployment */}
        <Section id="deployment" title="Deployment">
          {Object.entries(data.deployment || {}).map(([key, value]) => value && (
            <p key={key}><strong className="text-[--page-fg] capitalize">{key}:</strong> {value}</p>
          ))}
        </Section>

        {/* 14. Future Improvements */}
        <Section id="future-improvements" title="Future Improvements">
          {data.futureImprovements?.length > 0 && (
            <ul className="list-disc list-inside space-y-1">{data.futureImprovements.map((f) => <li key={f}>{f}</li>)}</ul>
          )}
        </Section>

        {/* 15. Lessons Learned */}
        <Section id="lessons-learned" title="Lessons Learned">
          {data.lessonsLearned?.length > 0 && (
            <ul className="list-disc list-inside space-y-1">{data.lessonsLearned.map((l) => <li key={l}>{l}</li>)}</ul>
          )}
        </Section>

        {/* 16. Project Metrics */}
        <Section id="metrics" title="Project Metrics">
          <TagList items={Object.entries(data.metrics || {}).map(([k, v]) => `${k}: ${v}`)} />
        </Section>

        {/* 17. Timeline */}
        <Section id="timeline" title="Timeline">
          {data.timeline?.length > 0 && (
            <ol className="space-y-2 border-l border-[--line] pl-4">
              {data.timeline.map((t) => (
                <li key={t.label}><strong className="text-[--page-fg] font-mono">{t.label}</strong> — {t.description}</li>
              ))}
            </ol>
          )}
        </Section>

        {/* 18. AI Assistant */}
        <Section id="ai-assistant" title="Ask about this project">
          <div className="flex items-center gap-3 rounded-full border border-[--line] bg-[--chip-bg] px-4 py-2 opacity-60">
            <Sparkles className="h-4 w-4 text-[--accent]" />
            <input
              disabled
              placeholder={`Coming soon — ask why ${data.title} used MongoDB, explain its auth flow, etc.`}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-[--muted]"
            />
          </div>
          <p className="text-xs">Depends on the /api/chat orchestrator and MCP tool server — not built yet (see plan.md).</p>
        </Section>

        {/* 19. Recruiter Summary */}
        <Section id="recruiter-summary" title="Recruiter Summary">
          {data.recruiterSummary?.role && <p><strong className="text-[--page-fg]">Role:</strong> {data.recruiterSummary.role}</p>}
          {data.recruiterSummary?.responsibilities?.length > 0 && (
            <div>
              <strong className="text-[--page-fg]">Responsibilities:</strong>
              <ul className="list-disc list-inside space-y-1">{data.recruiterSummary.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
          )}
          {data.recruiterSummary?.impact?.length > 0 && (
            <div>
              <strong className="text-[--page-fg]">Impact:</strong>
              <ul className="list-disc list-inside space-y-1">{data.recruiterSummary.impact.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          )}
          <TagList items={data.recruiterSummary?.technologies} />
          <TagList items={data.recruiterSummary?.skills} />
        </Section>
      </div>
    </article>
  );
}
