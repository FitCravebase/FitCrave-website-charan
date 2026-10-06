# Editing the website

Every change you commit on GitHub goes live by itself: Vercel rebuilds in about 1–2 minutes.

## Change text

Open the file on GitHub → click the **pencil** (Edit) at the top-right of the file → change only the words
between the quotes or tags → **Commit changes**. Don't delete brackets, quotes or `<` `>` tags around the words.

| What you see on the site | File |
|---|---|
| Top headline "Eat for your goal." and pincode bar | `src/components/Hero.tsx` |
| "Healthy, but make it crave." and the 4 stats | `src/components/Plates.tsx` |
| "Pick a goal. Watch the plate change." | `src/components/GoalMatch.tsx` |
| "Everything your goal needs. One app." (phone + tiles) | `src/components/AppShowcase.tsx` |
| "Weighed. Not guessed." (bowl and ingredients) | `src/components/Verified.tsx` |
| "Every kitchen, inspected. In public." | `src/components/Kitchens.tsx` |
| "Same doorstep. Different rules." (drag slider) | `src/components/Difference.tsx`, `src/components/Compare.tsx` |
| "Cooked 12:53. At your door 13:04." (live tracking) | `src/components/Delivery.tsx` |
| FitCrave Plus (coach, perks, prices) | `src/components/Plus.tsx` |
| "Kondapur first. Your city next." and the waitlist form | `src/components/City.tsx` |
| Quick FAQs | `src/components/Faq.tsx` |
| Footer (links, team names, email) | `src/components/Footer.tsx` |
| Menu dishes, kcal, prices, kitchen checks, plan prices, pincodes, contact email | `src/lib/data.ts` |
| Google search title and description | `src/app/layout.tsx` (`title`, `description`) |
| Privacy / Terms / Account deletion pages | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/account-deletion/page.tsx` |

## Replace a photo or video

All media lives in `public/media`. To swap one, upload a new file with **exactly the same name**:
GitHub → open the `public/media` folder → **Add file → Upload files** → drag your file in → **Commit changes**.
Same name = it replaces the old one. No code change needed.

| On the site | Video | Still image shown before it plays |
|---|---|---|
| Hero background | `hero.mp4` | `hero.jpg` |
| Hero steam overlay | `steam.mp4` | `steam.jpg` |
| Scale (Weighed. Not guessed.) | `scale.mp4` | `scale.jpg` |
| Kitchens evidence | `kitchen.mp4`, `pan.mp4`, `line.mp4`, `sauce.mp4` | same names `.jpg` |
| Drag slider, left side | `scroll.mp4` | `scroll.jpg` |
| Live tracking | `pan.mp4` (cooking), `ride.mp4` (rider), `handover.mp4` (doorstep) | same names `.jpg` |
| Plus watch card | `runner.mp4` | `runner.jpg` |
| Kondapur section | `city.mp4` | `city.jpg` |

| On the site | Photo |
|---|---|
| Menu dishes and floating plates | `dish-paneer.jpg`, `dish-tandoori.jpg`, `dish-rajma.jpg`, `dish-bhurji.jpg`, `dish-fish.jpg`, `dish-soya.jpg`, `dish-tikka.jpg`, `dish-chilla.jpg`, `dish-biryani.jpg`, `dish-bowl.jpg` |
| Ingredients flying into the bowl | `ing-rice.jpg`, `ing-paneer.jpg`, `ing-chana.jpg`, `ing-greens.jpg`, `ing-curd.jpg` |

Keep files light so the site stays fast:
- **Videos:** `.mp4`, landscape, about 1280 px wide, 5–10 seconds, **no sound**, under **3 MB** each.
  Also upload a matching `.jpg` (a still from the clip) with the same name.
- **Photos:** `.jpg`, about 1000 px wide, under **300 KB**. Dish and ingredient photos look best shot
  from directly above, because they're cut into circles.
- GitHub's upload page takes files up to 25 MB.

## One rule when editing in two places

If you edit on GitHub and someone also edits on a computer (in GitHub Desktop), open GitHub Desktop and
click **Fetch origin**, then **Pull origin** before making local changes, so nobody overwrites the other.
