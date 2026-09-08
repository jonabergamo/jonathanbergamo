import { chromium } from "@playwright/test";
import fs from "node:fs";
const b = await chromium.launch();
const ctx = await b.newContext({ userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36" });
let src = fs.readFileSync("src/data/photos.ts", "utf8");
const codes = [...src.matchAll(/code: "(\w+)"/g)].map((m) => m[1]);
for (const code of codes) {
  const p = await ctx.newPage();
  await p.goto(`https://www.instagram.com/p/${code}/`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await p.waitForTimeout(3000);
  const og = await p.$eval('meta[property="og:description"]', (m) => m.content).catch(() => "");
  const cap = og.match(/: "([\s\S]*)"\.?\s*$/)?.[1]?.trim() ?? "";
  console.log(code, "|", cap || "(no caption)");
  const re = new RegExp(`(\\{\\s*code: "${code}",[^}]*?)(\\s*\\})`, "s");
  src = src.replace(re, (all, body, end) => {
    const stripped = body.replace(/,?\s*caption: "[^"]*"/, "");
    return `${stripped},\n    caption: ${JSON.stringify(cap)}${end}`;
  });
  await p.close();
}
fs.writeFileSync("src/data/photos.ts", src);
await b.close();
