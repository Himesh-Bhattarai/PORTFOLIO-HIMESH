import { put } from "@vercel/blob";
import mongoose from "mongoose";
import fs from "node:fs";
import path from "node:path";
import Project from "../src/models/Project.js";

const SCRATCH =
  "/private/tmp/claude-502/-Users-himeshbhattarai-Desktop-Portfolio/5b77197d-10a8-4705-b858-3c289fce0d64/scratchpad";

const token = process.env.BLOB_READ_WRITE_TOKEN;
const MONGODB_URI = process.env.MONGODB_URI;
if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not set");
if (!MONGODB_URI) throw new Error("MONGODB_URI is not set");

// Projects that got a full new screenshots-v2/ set (banner-*.png + the rest)
const fullReplace = ["contentflow", "portfolio-v2", "ai-ecommerce", "nprevolution"];
// Projects that only got a new banner shot; existing screenshots[] stays as-is
const bannerOnly = ["nepal-denim"];
// Projects with no live UI to improve; reuse an existing screenshot as banner
const reuseExisting = ["stroid", "helmet-head"];

function captionFromFilename(filename) {
  const base = filename.replace(/\.png$/, "").replace(/^\d+-/, "");
  return base
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function uploadDir(dir, slug) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".png"));
  const results = [];
  for (const file of files) {
    const buffer = fs.readFileSync(path.join(dir, file));
    const blob = await put(`projects/${slug}/v2-${file}`, buffer, {
      access: "public",
      token,
      addRandomSuffix: false,
    });
    console.log(`${slug}/${file} -> ${blob.url}`);
    results.push({ file, url: blob.url });
  }
  return results;
}

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  for (const slug of fullReplace) {
    const dir = path.join(SCRATCH, `pdp-${slug}`, "screenshots-v2");
    if (!fs.existsSync(dir)) {
      console.log(`SKIP ${slug} — no screenshots-v2 dir found`);
      continue;
    }
    const uploaded = await uploadDir(dir, slug);
    const bannerEntry = uploaded.find((u) => u.file.toLowerCase().includes("banner"));
    const screenshots = uploaded
      .filter((u) => u !== bannerEntry)
      .map((u) => ({ url: u.url, caption: captionFromFilename(u.file) }));

    const update = { screenshots };
    if (bannerEntry) update.banner = bannerEntry.url;

    await Project.updateOne({ slug }, { $set: update });
    console.log(`Updated ${slug}: banner=${!!bannerEntry}, screenshots=${screenshots.length}`);
  }

  for (const slug of bannerOnly) {
    const dir = path.join(SCRATCH, `pdp-${slug}`, "screenshots-v2");
    if (!fs.existsSync(dir)) {
      console.log(`SKIP ${slug} — no screenshots-v2 dir found`);
      continue;
    }
    const uploaded = await uploadDir(dir, slug);
    const bannerEntry = uploaded.find((u) => u.file.toLowerCase().includes("banner"));
    if (bannerEntry) {
      await Project.updateOne({ slug }, { $set: { banner: bannerEntry.url } });
      console.log(`Updated ${slug}: banner set, screenshots left as-is`);
    }
  }

  for (const slug of reuseExisting) {
    const project = await Project.findOne({ slug });
    if (project?.screenshots?.[0]?.url) {
      await Project.updateOne({ slug }, { $set: { banner: project.screenshots[0].url } });
      console.log(`Updated ${slug}: banner reused from existing screenshot`);
    }
  }

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
