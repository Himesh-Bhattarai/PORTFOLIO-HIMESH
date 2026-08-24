import { put } from "@vercel/blob";
import fs from "node:fs";
import path from "node:path";

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

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not set");

async function run() {
  for (const slug of slugs) {
    const reportPath = path.join(SCRATCH, `pdp-${slug}`, "report.json");
    const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));

    const uploaded = [];
    for (const shot of report.screenshots || []) {
      const filename = path.basename(shot.localPath);
      const buffer = fs.readFileSync(shot.localPath);
      const blob = await put(`projects/${slug}/${filename}`, buffer, {
        access: "public",
        token,
        addRandomSuffix: false,
      });
      console.log(`${slug}/${filename} -> ${blob.url}`);
      uploaded.push({ url: blob.url, caption: shot.caption || "" });
    }
    report.screenshots = uploaded;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }
  console.log("Done uploading all screenshots.");
}

run().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
