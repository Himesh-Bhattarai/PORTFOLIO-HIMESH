import { ThemeProvider } from '@/components/Theme-provider';
import '../src/index.css';

const SITE_URL = 'https://himeshchanchal.com.np';
const SITE_DESCRIPTION =
  'Himeshchanchal Bhattarai — Full Stack Developer based in Kathmandu, Nepal, building production-ready web applications with Next.js, React, TypeScript, and Node.js, and AI-powered software using RAG, tool calling, and MCP.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Himeshchanchal Bhattarai — Full Stack Developer',
    template: '%s | Himeshchanchal Bhattarai',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Himeshchanchal Bhattarai',
    'Full Stack Developer',
    'Next.js Developer',
    'React Developer',
    'Node.js Developer',
    'AI Engineer',
    'MCP',
    'Nepal software engineer',
    'Kathmandu developer',
  ],
  authors: [{ name: 'Himeshchanchal Bhattarai', url: SITE_URL }],
  creator: 'Himeshchanchal Bhattarai',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Himeshchanchal Bhattarai',
    title: 'Himeshchanchal Bhattarai — Full Stack Developer',
    description: SITE_DESCRIPTION,
    locale: 'en_US',
    images: [
      {
        url: '/loog-hcb.png',
        width: 512,
        height: 512,
        alt: 'Himeshchanchal Bhattarai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Himeshchanchal Bhattarai — Full Stack Developer',
    description: SITE_DESCRIPTION,
    images: ['/loog-hcb.png'],
  },
  verification: {
    google: 'E1nu-m5R85zZGsJ6RGCXnydDhNmLCY95p7LNQkB_YOM',
  },
  icons: {
    icon: [
      {
        url: '/fav-con.png',
        type: 'image/png',
      },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Himeshchanchal Bhattarai',
  alternateName: 'Himesh Bhattarai',
  url: SITE_URL,
  jobTitle: 'Full Stack Developer',
  description: SITE_DESCRIPTION,
  image: `${SITE_URL}/loog-hcb.png`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kathmandu',
    addressCountry: 'NP',
  },
  sameAs: [
    'https://github.com/Himesh-Bhattarai',
    'https://www.linkedin.com/in/himeshchanchal-bhattarai',
  ],
  knowsAbout: [
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'MongoDB',
    'PostgreSQL',
    'Model Context Protocol',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Himeshchanchal Bhattarai',
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
