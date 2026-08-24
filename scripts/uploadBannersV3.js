import { put } from "@vercel/blob";
import mongoose from "mongoose";
import fs from "node:fs";
import Project from "../src/models/Project.js";

const SCRATCH =
  "/private/tmp/claude-502/-Users-himeshbhattarai-Desktop-Portfolio/5b77197d-10a8-4705-b858-3c289fce0d64/scratchpad/banners-v3";

const token = process.env.BLOB_READ_WRITE_TOKEN;
const MONGODB_URI = process.env.MONGODB_URI;
if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not set");
if (!MONGODB_URI) throw new Error("MONGODB_URI is not set");

const slugs = ["contentflow", "nepal-denim", "ai-ecommerce", "nprevolution", "portfolio-v2"];

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  for (const slug of slugs) {
    const filePath = `${SCRATCH}/${slug}.png`;
    const buffer = fs.readFileSync(filePath);
    const blob = await put(`projects/${slug}/v3-banner-hero.png`, buffer, {
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
