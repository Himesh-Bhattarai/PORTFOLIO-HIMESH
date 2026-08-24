import connectDB from '@/lib/connectDB';
import Content from '@/models/content';
import Dashboard from '@/components/Dashboard';

export const dynamic = 'force-dynamic';

export default async function Page() {
  await connectDB();
  const content = await Content.findOne().lean();

  return <Dashboard content={content} />;
}
