/**
 * Writes src/data/playlist.json ({ id, title, author } per track) for the
 * playlist configured in src/data/music.ts. The track ids and order come from
 * the YouTube player itself (loaded in a headless browser), titles from oEmbed,
 * so the list matches what the widget will play.  Run:  pnpm music:sync
 */
import fs from "node:fs";
import { chromium } from "@playwright/test";

const src = fs.readFileSync("src/data/music.ts", "utf8");
const id = src.match(/youtubePlaylistId:\s*"([^"]+)"/)?.[1];
if (!id) throw new Error("No youtubePlaylistId in src/data/music.ts");

const page = `<!doctype html><div id="p"></div>
<script src="https://www.youtube.com/iframe_api"></script>
<script>
  window.__ids = null;
  function onYouTubeIframeAPIReady() {
    const player = new YT.Player("p", {
      width: 320, height: 180,
      playerVars: { listType: "playlist", list: ${JSON.stringify(id)} },
      events: { onReady: () => setTimeout(() => { window.__ids = player.getPlaylist() || []; }, 1500) },
    });
  }
</script>`;

const browser = await chromium.launch();
const tab = await browser.newPage();
await tab.route("https://local.test/", (r) =>
  r.fulfill({ contentType: "text/html", body: page }),
);
await tab.goto("https://local.test/");
await tab.waitForFunction(() => Array.isArray(window.__ids), null, {
  timeout: 30_000,
});
const ids = await tab.evaluate(() => window.__ids);
await browser.close();
if (!ids.length)
  throw new Error("Player returned no tracks; is the playlist public?");

const tracks = [];
for (const vid of ids) {
  const r = await fetch(
    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${vid}&format=json`,
  );
  if (!r.ok) {
    tracks.push({ id: vid, title: "", author: "" });
    continue;
  }
  const j = await r.json();
  tracks.push({
    id: vid,
    title: j.title ?? "",
    author: (j.author_name ?? "").replace(/\s*-\s*Topic$/i, ""),
  });
}

fs.writeFileSync(
  "src/data/playlist.json",
  JSON.stringify({ id, tracks }, null, 2) + "\n",
);
console.log(`Wrote ${tracks.length} tracks for playlist ${id}`);
