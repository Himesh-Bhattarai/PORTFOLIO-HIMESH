import { notFound } from 'next/navigation';
import connectDB from '@/lib/connectDB';
import Project from '@/models/Project';
import ProjectShowcase from '@/components/ProjectShowcase';

const SITE_URL = 'https://himeshchanchal.com.np';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  await connectDB();
  const projects = await Project.find().select('slug').lean();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectDB();
  const data = await Project.findOne({ slug }).select('title oneLiner banner').lean();

  if (!data) return {};

  const title = data.title || slug;
  const description = data.oneLiner || `Case study: ${title}, built by Himeshchanchal Bhattarai.`;
  const url = `${SITE_URL}/projects/${slug}`;
  const image = data.banner || `${SITE_URL}/loog-hcb.png`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${title} — Case Study`,
      description,
      images: [{ url: image, width: 1600, height: 1000, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Case Study`,
      description,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  await connectDB();
  const data = await Project.findOne({ slug }).lean();

  if (!data) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: data.title,
    description: data.oneLiner,
    url: `${SITE_URL}/projects/${slug}`,
    image: data.banner || undefined,
    creator: {
      '@type': 'Person',
      name: 'Himeshchanchal Bhattarai',
      url: SITE_URL,
    },
    keywords: [
      ...(data.techStack?.frontend || []),
      ...(data.techStack?.backend || []),
      ...(data.techStack?.database || []),
    ]
      .map((t) => t.name)
      .filter(Boolean)
      .join(', '),
    ...(data.links?.demo ? { sameAs: [data.links.demo] } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectShowcase data={data} />
    </>
  );
}
