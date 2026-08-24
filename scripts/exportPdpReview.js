import mongoose from "mongoose";
import fs from "node:fs";
import Project from "../src/models/Project.js";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not set");

const order = [
  "nepal-denim",
  "ai-ecommerce",
  "contentflow",
  "stroid",
  "portfolio-v2",
  "helmet-head",
  "nprevolution",
];

function line(label, value) {
  if (value === undefined || value === null || value === "") return "";
  return `**${label}:** ${value}\n`;
}

function list(items) {
  if (!items?.length) return "";
  return items.map((i) => `- ${i}`).join("\n") + "\n";
}

function stackGroup(label, items) {
  if (!items?.length) return "";
  let out = `**${label}**\n`;
  out += items.map((i) => `- ${i.name}${i.why ? ` — ${i.why}` : ""}`).join("\n") + "\n";
  return out;
}

function render(p) {
  let md = "";
  md += `\n---\n\n# ${p.title || p.slug}\n\n`;
  md += `${p.oneLiner || ""}\n\n`;
  md += line("Status", p.status);
  md += line("Duration", p.duration);
  md += line("Role", p.role);
  md += line("Team", p.teamSize);
  if (p.links) {
    const l = [];
    if (p.links.demo) l.push(`[Live Demo](${p.links.demo})`);
    if (p.links.github) l.push(`[GitHub](${p.links.github})`);
    if (p.links.docs) l.push(`[Documentation](${p.links.docs})`);
    if (l.length) md += `\n${l.join(" · ")}\n`;
  }

  md += `\n## Overview\n\n`;
  md += line("Purpose", p.overview?.purpose);
  md += line("Target users", p.overview?.targetUsers);
  md += line("Problem", p.overview?.businessProblem);
  md += list(p.overview?.objectives);

  md += `\n## Tech Stack\n\n`;
  if (p.techStackNote) md += `*${p.techStackNote}*\n\n`;
  md += stackGroup("Frontend", p.techStack?.frontend);
  md += stackGroup("Backend", p.techStack?.backend);
  md += stackGroup("Database", p.techStack?.database);
  md += stackGroup("Auth", p.techStack?.auth);
  md += stackGroup("AI", p.techStack?.ai);
  md += stackGroup("DevOps", p.techStack?.devops);
  md += stackGroup("Deployment", p.techStack?.deployment);
  md += stackGroup("Libraries", p.techStack?.libraries);

  md += `\n## Features\n\n`;
  if (p.features?.length) {
    for (const f of p.features) {
      md += `### ${f.name}\n`;
      if (f.description) md += `${f.description}\n\n`;
      md += line("How", f.implementation);
      md += line("Challenge", f.challenges);
      md += line("Benefit", f.benefits);
      md += "\n";
    }
  } else md += "Not documented yet.\n";

  md += `\n## Architecture\n\n`;
  if (p.architecture?.flow?.length) md += `Flow: ${p.architecture.flow.join(" → ")}\n\n`;
  md += line("Folder structure", p.architecture?.folderStructure);
  md += line("App flow", p.architecture?.appFlow);
  md += line("Auth flow", p.architecture?.authFlow);
  md += line("Request lifecycle", p.architecture?.requestLifecycle);

  md += `\n## Database Design\n\n`;
  if (p.databaseDesign?.collections?.length) {
    md += p.databaseDesign.collections.map((c) => `- **${c.name}**${c.notes ? ` — ${c.notes}` : ""}`).join("\n") + "\n";
  }
  if (p.databaseDesign?.reasoning) md += `\n${p.databaseDesign.reasoning}\n`;

  md += `\n## API Documentation\n\n`;
  if (p.apiDocsNote) md += `*${p.apiDocsNote}*\n\n`;
  if (p.apiDocs?.length) {
    md += `| Method | URL | Purpose | Auth |\n|---|---|---|---|\n`;
    md += p.apiDocs.map((d) => `| ${d.method} | ${d.url} | ${d.purpose} | ${d.auth} |`).join("\n") + "\n";
  }

  md += `\n## Authentication Flow\n\n`;
  if (p.authFlow) {
    for (const [k, v] of Object.entries(p.authFlow.toObject ? p.authFlow.toObject() : p.authFlow)) {
      if (v) md += line(k.charAt(0).toUpperCase() + k.slice(1), v);
    }
  }

  md += `\n## Challenges\n\n`;
  if (p.challenges?.length) {
    for (const c of p.challenges) {
      md += `**Problem:** ${c.problem}\n\n`;
      md += line("Why", c.why);
      md += line("Solution", c.solution);
      md += line("Tradeoffs", c.tradeoffs);
      md += line("Lessons", c.lessons);
      md += "\n";
    }
  } else md += "None documented yet.\n";

  md += `\n## Performance\n\n`;
  md += line("Lighthouse", p.performance?.lighthouse);
  md += list(p.performance?.techniques);

  md += `\n## Security\n\n`;
  md += list(p.security?.considerations);

  md += `\n## Deployment\n\n`;
  if (p.deployment) {
    for (const [k, v] of Object.entries(p.deployment.toObject ? p.deployment.toObject() : p.deployment)) {
      if (v) md += line(k.charAt(0).toUpperCase() + k.slice(1), v);
    }
  }

  md += `\n## Future Improvements\n\n${list(p.futureImprovements)}`;
  md += `\n## Lessons Learned\n\n${list(p.lessonsLearned)}`;

  md += `\n## Project Metrics\n\n`;
  if (p.metrics) {
    for (const [k, v] of Object.entries(p.metrics.toObject ? p.metrics.toObject() : p.metrics)) {
      if (v) md += `- **${k}:** ${v}\n`;
    }
  }

  md += `\n## Timeline\n\n`;
  if (p.timeline?.length) {
    md += p.timeline.map((t) => `- **${t.label}** — ${t.description}`).join("\n") + "\n";
  }

  md += `\n## Recruiter Summary\n\n`;
  md += line("Role", p.recruiterSummary?.role);
  if (p.recruiterSummary?.responsibilities?.length) {
    md += `\nResponsibilities:\n${list(p.recruiterSummary.responsibilities)}`;
  }
  if (p.recruiterSummary?.impact?.length) {
    md += `\nImpact:\n${list(p.recruiterSummary.impact)}`;
  }
  if (p.recruiterSummary?.technologies?.length) md += `\nTechnologies: ${p.recruiterSummary.technologies.join(", ")}\n`;
  if (p.recruiterSummary?.skills?.length) md += `Skills: ${p.recruiterSummary.skills.join(", ")}\n`;

  return md;
}

async function main() {
  await mongoose.connect(MONGODB_URI);
  const projects = await Project.find().lean();
  const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

  let out = "# PDP Content Review\n\nGenerated from MongoDB, in the same order/sections as the live page. Screenshots omitted (tackling those separately). Edit this file freely — once you're happy, tell me what changed and I'll push it back into the database.\n";
  for (const slug of order) {
    if (bySlug[slug]) out += render(bySlug[slug]);
  }

  fs.writeFileSync("PDP_CONTENT_REVIEW.md", out);
  console.log("Wrote PDP_CONTENT_REVIEW.md");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
