import { put } from "@vercel/blob";
import mongoose from "mongoose";
import fs from "node:fs";
import Project from "../src/models/Project.js";

const SCRATCH =
  "/private/tmp/claude-502/-Users-himeshbhattarai-Desktop-Portfolio/5b77197d-10a8-4705-b858-3c289fce0d64/scratchpad";

const token = process.env.BLOB_READ_WRITE_TOKEN;
const MONGODB_URI = process.env.MONGODB_URI;
if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not set");
if (!MONGODB_URI) throw new Error("MONGODB_URI is not set");

const files = {
  "portfolio-v2": `${SCRATCH}/dark-portfolio-v2.png`,
  contentflow: `${SCRATCH}/dark-contentflow.png`,
  "nepal-denim": `${SCRATCH}/dark-nepal-denim.png`,
  "ai-ecommerce": `${SCRATCH}/dark-ai-ecommerce.png`,
  nprevolution: `${SCRATCH}/dark-nprevolution.png`,
  "helmet-head": `${SCRATCH}/dark-helmet-head.png`,
};

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  for (const [slug, filePath] of Object.entries(files)) {
    const buffer = fs.readFileSync(filePath);
    const blob = await put(`projects/${slug}/v4-banner.png`, buffer, {
      access: "public",
      token,
      addRandomSuffix: false,
    });
    await Project.updateOne({ slug }, { $set: { banner: blob.url } });
    console.log(`${slug} -> ${blob.url}`);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
