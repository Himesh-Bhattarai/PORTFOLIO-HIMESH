import mongoose from "mongoose";
import fs from "node:fs";
import path from "node:path";
import Project from "../src/models/Project.js";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not set");
}

const SCRATCH =
  "/private/tmp/claude-502/-Users-himeshbhattarai-Desktop-Portfolio/5b77197d-10a8-4705-b858-3c289fce0d64/scratchpad";

const slugs = [
  "ai-ecommerce",
  "contentflow",
  "stroid",
  "helmet-head",
  "nprevolution",
  "nepal-denim",
  "portfolio-v2",
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  for (const slug of slugs) {
    const reportPath = path.join(SCRATCH, `pdp-${slug}`, "report.json");
    const data = JSON.parse(fs.readFileSync(reportPath, "utf8"));

    const existing = await Project.findOne({ slug });
    if (existing) {
      await Project.replaceOne({ _id: existing._id }, data);
      console.log(`Replaced ${slug} (${existing._id})`);
    } else {
      const created = await Project.create(data);
      console.log(`Created ${slug} (${created._id})`);
    }
  }

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
