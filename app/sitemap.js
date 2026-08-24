import connectDB from '@/lib/connectDB';
import Project from '@/models/Project';

const SITE_URL = 'https://himeshchanchal.com.np';

export default async function sitemap() {
  await connectDB();
  const projects = await Project.find().select('slug updatedAt').lean();

  const staticRoutes = ['', '/now', '/uses'].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.5,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: p.updatedAt || new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
