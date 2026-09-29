# fitcrave.co.in

Marketing site for FitCrave v12: Kondapur's inspected healthy kitchens in one app.
Next.js 16 (App Router), GSAP + ScrollTrigger + Lenis for motion, Firebase for the waitlist.

## Deploy to Vercel

The Vercel dashboard deploys from Git or the CLI (it has no zip upload), so use one of these.

**Option A: GitHub (recommended, redeploys on every push)**

1. Create an empty GitHub repo, then from this folder:
   ```
   git init
   git add -A
   git commit -m "FitCrave v12 site"
   git branch -M main
   git remote add origin https://github.com/<you>/fitcrave-web.git
   git push -u origin main
   ```
2. Vercel → your existing fitcrave project → Settings → Git → connect this repo.
   Framework preset: Next.js. Root directory: `/`. Build command and output: defaults.
3. Push to `main` to deploy. The domain fitcrave.co.in stays attached to the project.

**Option B: Vercel CLI (one-off deploy from this folder)**

```
npm i -g vercel
vercel link        # pick your existing fitcrave project
vercel --prod
```

No environment variables are needed: `.env.production` carries the public Firebase web
config for project `fitcrave-39bdc` (the same values the old site shipped in its bundle).

## After deploying

- Merge `firestore.rules.suggested` into the project's Firestore rules. The old site left the
  `waitlist` collection readable by anyone; the suggested rules make it write-only.
- Submit the waitlist form once on the live site and check the entry appears in Firestore.
- `/privacy`, `/terms` and `/account-deletion` keep the same URLs the store listings use.

## Run locally

```
npm install
npm run dev
```

## What the site reads and writes

- `website/config` (Firestore): `appLaunched`, `playstoreLink`, `appstoreLink`, `announcement`, `waitlistEnabled`.
  Set `appLaunched: true` and add store links to switch the CTAs to download, no redeploy needed.
- `waitlist` (Firestore): write-only from the site. Fields `email, name, goal, pincode, city, inZone, ts, source`.

## Media

Stock footage and photos from Pexels (free licence, no attribution required), in `public/media`.
To swap a clip, put the raw file in `media-src/<name>.mp4` and run
`npm i -D ffmpeg-static && node scripts/encode-media.mjs`. Sample menu and kitchen data live in `src/lib/data.ts`.
Fonts are self-hosted in `src/app/fonts`.
