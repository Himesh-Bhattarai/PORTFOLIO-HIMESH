import React from 'react';
import { Inter } from '@fontsource/inter';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import { ThemeProvider } from '@/components/Theme-provider';
import './globals.css';

// Font setup
const inter = {
  className: 'font-sans' // Using Tailwind class instead of Next.js font
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>3D Portfolio | HCB</title>
        <meta name="description" content="Personal portfolio showcasing 3D development and design work" />
        <meta name="generator" content="v0.dev" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}