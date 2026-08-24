import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not set");

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");
  const content = mongoose.connection.collection("contents");
  const doc = await content.findOne({});

  // --- About ---
  const newAbout = {
    ...doc.about,
    paragraphs: [
      "I'm Himeshchanchal Bhattarai, a Full Stack Developer based in Kathmandu, Nepal, focused on building production-ready web applications with Next.js, React, TypeScript, Node.js, PostgreSQL, and MongoDB. I have hands-on experience across the full stack — frontend, backend, authentication, REST APIs, role-based access control, state management, and deployment.",
      "I independently delivered Nepal Denim, a production e-commerce and inventory platform (Next.js, PostgreSQL, Prisma) with a centralized inventory domain, admin tooling, and production deployment on Vercel. Beyond client work, I build AI-powered applications using RAG, tool calling, and MCP, scalable systems like multi-tenant CMS platforms, and open-source developer tools — including STATUS Commit, a Git commit convention I designed and published to npm with a CLI, VS Code extension, and GitHub Actions integration.",
    ],
  };

  // --- Experience ---
  const newExperience = [
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
  ];

  // --- Education: add real period to +2, drop unconfirmed SEE entry ---
  const newEducation = doc.profile.education
    .filter((e) => e.degree !== "Secondary Education Examination (SEE)")
    .map((e) =>
      e.degree === "+2 in Computer Management" ? { ...e, period: "2022 – 2024" } : e
    );

  // --- Languages: correct Hindi proficiency per LinkedIn ---
  const newLanguages = doc.profile.languages.map((l) =>
    l.name === "Hindi" ? { ...l, proficiency: "Limited Working Proficiency" } : l
  );

  // --- Skills: remove unconfirmed specific claims (Ollama, Docker) ---
  const newSkills = doc.profile.skills.map((group) => {
    if (group.category === "AI & Modern Development") {
      return { ...group, items: group.items.filter((i) => i !== "Ollama") };
    }
    if (group.category === "DevOps & Tools") {
      return { ...group, items: group.items.filter((i) => i !== "Docker") };
    }
    return group;
  });

  await content.updateOne(
    { _id: doc._id },
    {
      $set: {
        about: newAbout,
        experience: newExperience,
        "profile.education": newEducation,
        "profile.languages": newLanguages,
        "profile.skills": newSkills,
      },
    }
  );

  console.log("Updated about, experience, education, languages, skills.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
