// Sample content for the pre-launch site. Every figure here is illustrative and
// labelled as a sample on the page; real menus and kitchen profiles come from the app.

export type Diet = "veg" | "egg" | "nonveg";

export type Bowl = {
  id: string;
  name: string;
  diet: Diet;
  kcal: number;
  p: number;
  c: number;
  f: number;
  price: number;
  memberPrice: number;
  kitchen: string;
  kitchenScore: number;
  image: string;
};

export const BOWLS: Bowl[] = [
  { id: "paneer", name: "Charred Paneer & Brown Rice", diet: "veg", kcal: 573, p: 46, c: 63, f: 16, price: 249, memberPrice: 225, kitchen: "K-07", kitchenScore: 91, image: "/media/dish-paneer.jpg" },
  { id: "tandoori", name: "Tandoori Chicken Millet Bowl", diet: "nonveg", kcal: 510, p: 46, c: 48, f: 14, price: 269, memberPrice: 245, kitchen: "K-03", kitchenScore: 88, image: "/media/dish-tandoori.jpg" },
  { id: "rajma", name: "Rajma & Brown Rice", diet: "veg", kcal: 470, p: 24, c: 66, f: 11, price: 199, memberPrice: 179, kitchen: "K-11", kitchenScore: 86, image: "/media/dish-rajma.jpg" },
  { id: "bhurji", name: "Egg Bhurji & Jowar Roti", diet: "egg", kcal: 430, p: 32, c: 38, f: 16, price: 179, memberPrice: 159, kitchen: "K-03", kitchenScore: 88, image: "/media/dish-bhurji.jpg" },
  { id: "fish", name: "Grilled Fish Lemon Rice", diet: "nonveg", kcal: 610, p: 44, c: 70, f: 16, price: 299, memberPrice: 275, kitchen: "K-07", kitchenScore: 91, image: "/media/dish-fish.jpg" },
  { id: "soya", name: "Soya Chunk Curry & Brown Rice", diet: "veg", kcal: 520, p: 42, c: 60, f: 12, price: 219, memberPrice: 195, kitchen: "K-11", kitchenScore: 86, image: "/media/dish-soya.jpg" },
  { id: "tikka", name: "Chicken Tikka Salad", diet: "nonveg", kcal: 380, p: 40, c: 18, f: 16, price: 239, memberPrice: 215, kitchen: "K-05", kitchenScore: 93, image: "/media/dish-tikka.jpg" },
  { id: "chilla", name: "Moong Chilla Stack", diet: "veg", kcal: 350, p: 22, c: 44, f: 9, price: 169, memberPrice: 149, kitchen: "K-05", kitchenScore: 93, image: "/media/dish-chilla.jpg" },
  { id: "biryani", name: "Lean Chicken Biryani", diet: "nonveg", kcal: 650, p: 45, c: 78, f: 17, price: 289, memberPrice: 265, kitchen: "K-09", kitchenScore: 84, image: "/media/dish-biryani.jpg" },
];

export type GoalKey = "fat" | "muscle" | "track";

export const GOALS: Record<GoalKey, { label: string; kcal: number; protein: number }> = {
  fat: { label: "Lose fat", kcal: 1840, protein: 140 },
  muscle: { label: "Build muscle", kcal: 2600, protein: 165 },
  track: { label: "Stay on track", kcal: 2200, protein: 120 },
};

export type SlotKey = "breakfast" | "lunch" | "dinner";

// Share of the day's target this meal should carry.
export const SLOTS: Record<SlotKey, { label: string; share: number; time: string }> = {
  breakfast: { label: "Breakfast", share: 0.22, time: "08:30" },
  lunch: { label: "Lunch", share: 0.3, time: "13:00" },
  dinner: { label: "Dinner", share: 0.28, time: "20:00" },
};

export type Ranked = Bowl & { fit: number; reason: string };

// A printable rule, not a model: distance from the meal's kcal budget, plus a
// penalty for missing the meal's protein share, minus a small kitchen-score bonus.
export function rankBowls(goal: GoalKey, slot: SlotKey, diet: "any" | "veg"): {
  kcal: number;
  protein: number;
  ranked: Ranked[];
} {
  const g = GOALS[goal];
  const s = SLOTS[slot];
  const kcal = Math.round((g.kcal * s.share) / 10) * 10;
  const protein = Math.round(g.protein * s.share);
  const pool = BOWLS.filter((b) => (diet === "veg" ? b.diet === "veg" : true));
  const ranked = pool
    .map((b) => {
      const kcalGap = Math.abs(b.kcal - kcal) / kcal;
      const proteinShort = Math.max(0, protein - b.p) / protein;
      const fit = kcalGap + 1.2 * proteinShort - (b.kitchenScore - 80) / 400;
      const kDelta = b.kcal - kcal;
      const kText = kDelta === 0 ? `exactly your ${kcal} kcal` : kDelta < 0 ? `${-kDelta} kcal under your ${kcal}` : `${kDelta} kcal over your ${kcal}`;
      const pText = b.p >= protein ? `${b.p} g protein clears ${protein} g` : `${b.p} g of ${protein} g protein`;
      return { ...b, fit, reason: `${kText} · ${pText}` };
    })
    .sort((a, b) => a.fit - b.fit);
  return { kcal, protein, ranked };
}

// Components of the hero bowl, weighed. Macros per component; the total is computed, not typed.
export const BOWL_PARTS = [
  { name: "Brown rice", grams: 150, kcal: 168, p: 4, c: 35, f: 1, color: "var(--gold)" },
  { name: "Charred paneer", grams: 120, kcal: 250, p: 30, c: 6, f: 12, color: "#f3e6c6" },
  { name: "Roasted chana", grams: 25, kcal: 95, p: 6, c: 15, f: 2, color: "var(--red)" },
  { name: "Greens & onion", grams: 80, kcal: 24, p: 2, c: 5, f: 0, color: "var(--leaf)" },
  { name: "Mint hung curd", grams: 60, kcal: 36, p: 4, c: 2, f: 1, color: "var(--muted)" },
];

export const CRITERIA_GROUPS = [
  { group: "Legal and licensing", count: 7, passed: 7, note: "FSSAI licence, GST, trade licence, insurance" },
  { group: "Food safety", count: 14, passed: 14, note: "Cold chain ≤ 5 °C, hot hold ≥ 60 °C, allergen and veg/non-veg separation" },
  { group: "Sourcing", count: 6, passed: 6, note: "Supplier list with FSSAI numbers, protein traceable weekly" },
  { group: "Nutrition accuracy", count: 8, passed: 8, note: "0.1 g scale on the line, spot-check pass rate 94%" },
  { group: "Packaging and handover", count: 6, passed: 6, note: "Numbered tamper seal, label with kcal and allergens" },
  { group: "Operations", count: 7, passed: 6, note: "Last 30 days of real orders, updated nightly" },
  { group: "People", count: 4, passed: 4, note: "Food-handler training, a named line lead" },
  { group: "Facility", count: 5, passed: 5, note: "Ventilation, waste, drainage, lighting at the pass" },
  { group: "Customer signal", count: 3, passed: 3, note: "Taste 4.5 · macros felt right 93%" },
];

export const OPS_METRICS = [
  { label: "On time", value: 96, suffix: "%" },
  { label: "Order accuracy", value: 99.1, suffix: "%", decimals: 1 },
  { label: "Complaints", value: 1.4, suffix: "/100", decimals: 1 },
  { label: "Accept < 90 s", value: 97, suffix: "%" },
];

export const PLANS = [
  { id: "plus_1m", months: 1, discount: 0 },
  { id: "plus_3m", months: 3, discount: 0.15 },
  { id: "plus_6m", months: 6, discount: 0.25 },
];

export const PLUS_BASE_INR = 399;

export function planPrice(months: number, discount: number) {
  // Rounded down, matching the PRD's figures (₹1,017 and ₹1,795).
  const total = Math.floor(PLUS_BASE_INR * months * (1 - discount));
  return { total, perMonth: Math.round(total / months) };
}

export const WEARABLES = [
  "Apple Health",
  "Health Connect",
  "Samsung Health",
  "Fitbit",
  "Garmin",
  "Whoop",
  "Oura",
  "Noise",
  "boAt",
  "Amazfit",
  "Strava",
  "Polar",
];

export const KONDAPUR_PINCODES = ["500084", "500081", "500032", "500033"];

export const SUPPORT_EMAIL = "support@fitcrave.co";

export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}
