import mongoose from "mongoose";
import Content from "../src/models/content.js";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not set");
}

const contentData = {
  navbar: {
    brandImage: "/loog-hcb.png",
    brandName: "Himeshchanchal Bhattarai",
    links: ["Home", "Work", "Experience", "About", "Resume", "Contact"],
  },

  hero: {
    role: "Full Stack Developer | AI Engineer",
    location: "Kathmandu, Nepal",
    availability: "Open to Opportunities",
    headline: "Building scalable web applications and intelligent AI-powered software.",
    description:
      "I build production-ready applications using React, Next.js, Node.js, TypeScript, PostgreSQL, MongoDB, and modern AI technologies, focusing on clean architecture, performance, and real-world problem solving.",
    highlights: [
      { value: "1+", label: "Years Experience" },
      { value: "15+", label: "Projects" },
      { value: "AI", label: "Powered Apps" },
      { value: "MERN", label: "Tech Stack" },
    ],
    primaryCTA: { label: "View Projects", href: "#work" },
    secondaryCTA: { label: "Download Resume", href: "/resume.pdf" },
    socialLinks: [
      { label: "GitHub", url: "https://github.com/Himesh-Bhattarai" },
      { label: "LinkedIn", url: "https://linkedin.com/in/himeshchanchal-bhattarai" },
      { label: "Email", url: "mailto:himesh.hcb@gmail.com" },
      { label: "Phone", url: "tel:+9779806352021" },
    ],
  },

  about: {
    headline: "Building modern software with full-stack expertise and AI innovation.",
    paragraphs: [
      "I'm Himeshchanchal Bhattarai, a Full Stack Developer based in Kathmandu, Nepal, focused on building production-ready web applications with Next.js, React, TypeScript, Node.js, PostgreSQL, and MongoDB. I have hands-on experience across the full stack — frontend, backend, authentication, REST APIs, role-based access control, state management, and deployment.",
      "I independently delivered Nepal Denim, a production e-commerce and inventory platform (Next.js, PostgreSQL, Prisma) with a centralized inventory domain, admin tooling, and production deployment on Vercel. Beyond client work, I build AI-powered applications using RAG, tool calling, and MCP, scalable systems like multi-tenant CMS platforms, and open-source developer tools — including STATUS Commit, a Git commit convention I designed and published to npm with a CLI, VS Code extension, and GitHub Actions integration.",
    ],
    stats: [
      { value: "1+", label: "Years Experience" },
      { value: "15+", label: "Projects Built" },
      { value: "20+", label: "Technologies Used" },
      { value: "AI", label: "Engineering Focus" },
    ],
    name: "HIMESHCHANCHAL BHATTARAI",
    email: "code.himesh@gmail.com",
    location: "Kathmandu, Nepal",
    availability: "Open to Full-Time Opportunities",
    portrait: "/WhatsApp Image 2025-12-01 at 7.49.26 PM (1).jpeg",
  },

  experience: [
    {
      period: "Jul 2026 – Present",
      title: "Full Stack Developer",
      company: "Nepal Denim (Contract)",
      location: "Kathmandu, Nepal · Remote",
      description:
        "Working as a contract Full Stack Developer for Nepal Denim, a Nepal-based denim and fashion brand, building and maintaining its e-commerce and inventory platform as an independent, project-based engagement rather than a permanent position.",
      achievements: [
        "Designed, developed, and deployed the platform end-to-end using Next.js, TypeScript, PostgreSQL, Prisma ORM, and Vercel.",
        "Built the customer storefront, admin panel, authentication and session workflows, and multi-variant product management.",
        "Implemented transactional email, SEO, image optimization, and API-backed inventory synchronization.",
        "Designed a centralized inventory domain as the source of truth for on-hand and reserved stock, with separate reservation, release, fulfillment, and return operations.",
        "Implemented cross-tab cart/session synchronization using the BroadcastChannel API.",
      ],
      skills: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Vercel", "SEO"],
    },
    {
      period: "Jun 2025 – Jun 2026",
      title: "Junior Full Stack Developer",
      company: "Infinite Pro Technology Pvt. Ltd.",
      location: "Lalitpur, Nepal",
      description:
        "Worked as a Junior Full Stack Developer after successfully completing the internship, contributing to the development and maintenance of production web applications using the MERN stack, Next.js, and TypeScript.",
      achievements: [
        "Designed and developed responsive, reusable, and maintainable frontend interfaces using React, Next.js, TypeScript, and Tailwind CSS.",
        "Built and enhanced RESTful APIs with Node.js, Express.js, and MongoDB to support production features.",
        "Implemented secure authentication and authorization using JWT, cookies, and role-based access control.",
        "Collaborated with senior developers to deliver new features, resolve bugs, and continuously improve application performance.",
        "Integrated frontend applications with backend services, ensuring reliable data flow and seamless user experiences.",
        "Participated in code reviews, debugging, testing, and deployment activities while following professional Git workflows and coding standards.",
      ],
      skills: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT", "REST API", "Git"],
    },
    {
      period: "Feb 2025 – May 2025",
      title: "Full Stack Developer Intern",
      company: "Infinite Pro Technology Pvt. Ltd.",
      location: "Lalitpur, Nepal",
      description:
        "Completed a full-stack development internship, gaining hands-on experience in modern web development while contributing to real-world business applications.",
      achievements: [
        "Developed responsive user interfaces with React, Next.js, and Tailwind CSS under the guidance of senior developers.",
        "Implemented backend APIs using Node.js, Express.js, MongoDB, and TypeScript.",
        "Worked with authentication, form validation, CRUD operations, and API integrations across multiple modules.",
        "Managed component-level and shared application state using React Hooks and Zustand.",
        "Learned professional software development practices including Git version control, code reviews, issue tracking, and collaborative development.",
        "Assisted in debugging production issues, testing new features, and improving overall application stability.",
      ],
      skills: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Zustand", "Git"],
    },
    {
      period: "2023 – Present",
      title: "Independent Full Stack Developer",
      company: "Personal Projects & Open Source",
      location: "Kathmandu, Nepal",
      description:
        "Continuously building personal projects to explore modern web development, AI engineering, and scalable software architecture beyond professional work.",
      achievements: [
        "Developed an AI-powered e-commerce platform integrating LLM capabilities, RAG, and MCP-based tool calling for intelligent search and support.",
        "Built ContentFlow, a multi-tenant headless CMS with authentication, role-based access control, and dynamic content management.",
        "Designed and published STATUS Commit, an open-source Git commit convention with an npm CLI, VS Code extension, GitHub Actions integration, and a local risk-scoring dashboard.",
        "Designed and developed reusable React component libraries and modern UI systems.",
        "Explored CI/CD and MCP-based AI-assisted development workflows through personal projects.",
      ],
      skills: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "AI", "MCP", "CI/CD"],
    },
  ],

  profile: {
    skills: [
      {
        category: "Frontend",
        items: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Zustand", "HTML5", "CSS3", "Python"],
      },
      {
        category: "Backend",
        items: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Prisma ORM", "Mongoose", "REST API", "JWT Authentication", "Auth.js / NextAuth.js", "Zod", "Role-Based Access Control"],
      },
      {
        category: "AI & Modern Development",
        items: ["LLM Integration", "RAG", "MCP", "Prompt Engineering", "AI API Integration"],
      },
      {
        category: "DevOps & Tools",
        items: ["Git", "GitHub", "GitHub Actions", "Vercel", "Vercel Blob", "Neon", "Resend", "Postman", "Thunder Client", "VS Code", "CI/CD", "SEO", "Agile"],
      },
      {
        category: "Soft Skills",
        items: ["Problem Solving", "Critical Thinking", "Communication", "Team Collaboration", "Analytical Thinking", "Continuous Learning"],
      },
    ],
    education: [
      {
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "Xavier International College",
        university: "Tribhuvan University",
        period: "Nov 2024 – Present",
        description: "Studying computer science fundamentals, software engineering, databases, networking, algorithms, and modern web technologies.",
      },
      {
        degree: "+2 in Computer Management",
        institution: "Orchid Public Secondary School",
        period: "2022 – 2024",
        gpa: "3.09",
        description: "Focused on computer science, programming fundamentals, mathematics, and business studies.",
      },
    ],
    certifications: [
      { name: "CS50's Introduction to Computer Science", issuer: "Harvard University", year: "2024" },
      { name: "CS50's Introduction to Programming with Python", issuer: "Harvard University", year: "2025" },
      { name: "Front End Development Libraries", issuer: "freeCodeCamp", year: "2025" },
    ],
    languages: [
      { name: "Nepali", proficiency: "Native" },
      { name: "English", proficiency: "Professional Working" },
      { name: "Hindi", proficiency: "Limited Working Proficiency" },
    ],
  },

  projects: [
    {
      slug: "nepal-denim",
      title: "Nepal Denim",
      description:
        "A live client e-commerce and inventory platform with storefront, admin, multi-variant products, transactional email, and a centralized inventory domain separating on-hand and reserved stock across reservation, fulfillment, and returns.",
      image: "https://vaqftdvfpmqlbp2i.public.blob.vercel-storage.com/projects/nepal-denim/v4-banner.png",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Vercel"],
      featured: true,
      link: "https://nepaldenim.com",
      code: "",
    },
    {
      slug: "ai-ecommerce",
      title: "AI Integrated E-Commerce",
      description:
        "A full-stack AI-powered e-commerce platform featuring intelligent product search, AI chatbot, review summarization, FAQ generation, seller dashboards, authentication, and modern commerce workflows.",
      image: "https://vaqftdvfpmqlbp2i.public.blob.vercel-storage.com/projects/ai-ecommerce/v4-banner.png",
      tags: ["Next.js", "TypeScript", "MongoDB", "Node.js", "AI", "RAG"],
      featured: true,
      link: "",
      code: "",
    },
    {
      slug: "contentflow",
      title: "ContentFlow CMS",
      description: "A modern headless CMS with role-based authentication, dynamic content management, reusable APIs, media handling, and scalable architecture.",
      image: "https://vaqftdvfpmqlbp2i.public.blob.vercel-storage.com/projects/contentflow/v4-banner.png",
      tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      featured: true,
      link: "",
      code: "",
    },
    {
      slug: "stroid",
      title: "Stroid",
      description: "A deterministic React state management library supporting configurable store authority, predictable hydration, and drift detection for modern React applications.",
      image: "https://vaqftdvfpmqlbp2i.public.blob.vercel-storage.com/projects/stroid/00-docs-site-down-evidence.png",
      tags: ["React", "TypeScript", "Library", "NPM"],
      featured: true,
      link: "",
      code: "",
    },
    {
      slug: "portfolio-v2",
      title: "Portfolio v2",
      description: "Personal portfolio built with React and modern UI architecture, designed to evolve into an AI-powered portfolio where an assistant can manage content through structured APIs and automation.",
      image: "https://vaqftdvfpmqlbp2i.public.blob.vercel-storage.com/projects/portfolio-v2/v4-banner.png",
      tags: ["React", "Vite", "Tailwind", "Framer Motion"],
      featured: true,
      link: "",
      code: "",
    },
    {
      slug: "helmet-head",
      title: "Helmet Head Nepal",
      description: "A modern e-commerce experience for motorcycle helmets featuring responsive layouts, smooth shopping flows, and interactive product presentation.",
      image: "https://vaqftdvfpmqlbp2i.public.blob.vercel-storage.com/projects/helmet-head/v4-banner.png",
      tags: ["Next.js", "Three.js", "Express", "Tailwind"],
      featured: false,
      link: "",
      code: "",
    },
    {
      slug: "nprevolution",
      title: "NP Revolution",
      description: "An independent Nepali news platform delivering categorized news, dynamic content, and a clean reading experience.",
      image: "https://vaqftdvfpmqlbp2i.public.blob.vercel-storage.com/projects/nprevolution/v4-banner.png",
      tags: ["Next.js", "TypeScript", "MongoDB"],
      featured: false,
      link: "",
      code: "",
    },
  ],

  contact: {
    email: "himesh.hcb@gmail.com",
    phone: "+977 9806352021",
    location: "Kathmandu, Nepal",
  },

  footer: {
    brandImage: "/loog-hcb.png",
    brandName: "Himeshchanchal Bhattarai",
    tagLine: "Full Stack Developer building modern web applications and AI-powered software.",
    quickLinks: ["Home", "Work", "Experience", "About", "Resume", "Contact", "Now", "Uses"],
    socialLinks: [
      { label: "GitHub", url: "https://github.com/Himesh-Bhattarai" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/himeshchanchal-bhattarai" },
      { label: "Mail", url: "mailto:himesh.hcb@gmail.com" },
    ],
    copyright: "© 2026 Himesh Bhattarai. All rights reserved.",
  },
};

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  const existing = await Content.findOne();
  if (existing) {
    await Content.replaceOne({ _id: existing._id }, contentData);
    console.log(`Replaced existing Content document (${existing._id}).`);
  } else {
    const created = await Content.create(contentData);
    console.log(`Created new Content document (${created._id}).`);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
