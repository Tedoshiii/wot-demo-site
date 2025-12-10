// scripts/fetch-w3c.js
import fs from "fs/promises";
import path from "path";

const OUT_DIR = path.join(process.cwd(), "src", "content", "events");

// Replace this URL with a W3C / Web of Things endpoint you want to use
const W3C_API_URL = "https://www.w3.org/api/groups/cg/wot"; // example root; adapt to actual events endpoint

async function fetchW3C() {
  console.log("Fetching W3C API:", W3C_API_URL);
  const res = await fetch(W3C_API_URL);
  if (!res.ok) {
    throw new Error(`W3C API returned ${res.status}`);
  }
  const json = await res.json();

  // This mapping is example/pseudocode — inspect the W3C API you need and adapt fields.
  // For demo we will create 1 synthetic event from the group data.
  await fs.mkdir(OUT_DIR, { recursive: true });

  // Example: produce a single demo markdown showing group name
  const slug = `w3c-cg-wot-${new Date().toISOString().slice(0,10)}.md`;
  const md = `---
title: "W3C CG WoT - summary"
date: "${new Date().toISOString().slice(0,10)}"
type: "w3c"
summary: "Basic data from the W3C API (demo)."
---
Fetched W3C group data: ${json.title || json.id || "no title field"}
`;

  await fs.writeFile(path.join(OUT_DIR, slug), md, "utf8");
  console.log("Wrote example W3C event:", slug);

  // OPTIONAL: map json.events -> md files if the API exposes events
  // Example pseudocode:
  // if (json.events) {
  //   for (const ev of json.events) { write md file }
  // }
}

fetchW3C().catch(err => {
  console.error(err);
  process.exit(1);
});
