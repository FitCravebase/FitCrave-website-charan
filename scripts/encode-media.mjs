// Re-encodes the raw stock clips in /media-src into web-ready loops in /public/media.
// Run: npm i -D ffmpeg-static && node scripts/encode-media.mjs   (ffmpeg is only needed to re-encode footage)
// To swap in your own footage later, drop a file with the same name into /media-src and rerun.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import ffmpeg from "ffmpeg-static";

const SRC = "media-src";
const OUT = "public/media";
mkdirSync(OUT, { recursive: true });

// name: [start seconds, length seconds, scrub]
// Scrub clips are driven by scroll position, so they get a keyframe every 4 frames for smooth seeking.
const CLIPS = {
  hero: [0, 5.7, false],
  steam: [2, 8, false],
  scale: [1, 8, true],
  sauce: [2, 7, false],
  line: [0, 6.9, false],
  kitchen: [1, 7, false],
  pan: [4, 7, false],
  scroll: [2, 7, false],
  ride: [0, 11.7, true],
  handover: [2, 7, false],
  runner: [2, 7, false],
  city: [0, 9, false],
};

for (const [name, [ss, t, scrub]] of Object.entries(CLIPS)) {
  const input = `${SRC}/${name}.mp4`;
  if (!existsSync(input)) {
    console.warn(`skip ${name}: no ${input}`);
    continue;
  }
  const args = [
    "-y", "-loglevel", "error",
    "-ss", String(ss), "-t", String(t), "-i", input,
    "-an",
    "-vf", "scale='min(1280,iw)':-2,fps=25,format=yuv420p",
    "-c:v", "libx264", "-preset", "slow", "-crf", scrub ? "27" : "29",
    "-g", scrub ? "4" : "50",
    "-movflags", "+faststart",
    `${OUT}/${name}.mp4`,
  ];
  execFileSync(ffmpeg, args, { stdio: "inherit" });
  // Poster: the first frame, so the still matches where the loop starts.
  execFileSync(ffmpeg, ["-y", "-loglevel", "error", "-i", `${OUT}/${name}.mp4`, "-frames:v", "1", "-q:v", "4", `${OUT}/${name}.jpg`], { stdio: "inherit" });
  console.log(`ok ${name}`);
}
