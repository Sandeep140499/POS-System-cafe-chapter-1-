const STORAGE_KEY = "cc1_sales_targets";

export interface MonthlyTarget {
  month: string; // "April 2026"
  targetRaw: number;
  collectedRaw: number;
}

export function getSalesTargets(): MonthlyTarget[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [
    { month: "April 2026", targetRaw: 150000, collectedRaw: 5960 },
    { month: "March 2026", targetRaw: 120000, collectedRaw: 115420 },
    { month: "February 2026", targetRaw: 100000, collectedRaw: 98200 },
  ];
}

export function saveSalesTargets(targets: MonthlyTarget[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(targets));
}

export function getCurrentMonthTarget(): MonthlyTarget {
  const targets = getSalesTargets();
  const now = new Date();
  const currentLabel = now.toLocaleString("default", { month: "long", year: "numeric" });
  const found = targets.find((t) => t.month === currentLabel);
  if (found) return found;
  return targets[0] ?? { month: currentLabel, targetRaw: 150000, collectedRaw: 0 };
}

export function updateOrAddTarget(month: string, targetRaw: number) {
  const targets = getSalesTargets();
  const idx = targets.findIndex((t) => t.month === month);
  if (idx >= 0) {
    targets[idx] = { ...targets[idx], targetRaw };
  } else {
    targets.unshift({ month, targetRaw, collectedRaw: 0 });
  }
  saveSalesTargets(targets);
}
