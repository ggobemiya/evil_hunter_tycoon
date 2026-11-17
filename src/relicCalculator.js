export const MAX_COPIES = 271;
export const RANDOM_COST = 10;
export const SELECT_COST = 50;
export function bounded(value, min = 0, max = 100000, integer = false) {
  const n = Number(value);
  const result = Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : min;
  return integer ? Math.floor(result) : result;
}
export function weeklyIncome(s) {
  const boss = (tier, times) => (45 - 5 * bounded(tier, 1, 5, true)) * bounded(times, 0, 100, true);
  return [
    ['월드보스', boss(s.worldTier, s.worldTimes)],
    ['영웅 월드보스', boss(s.heroTier, s.heroTimes)],
    ['필드보스', bounded(s.field) * 7 * 5],
    ['탐험', bounded(s.expeditions) * 7 * 0.2 * bounded(s.expeditionTokens, 1, 7, true)],
    ['유적 발굴', bounded(s.excavation) * 7],
    ['챌린저스 샵', bounded(s.challenger, 0, 2, true) * 100],
    ['승리의 메달 샵', bounded(s.medal, 0, 2, true) * 200 * 7 / bounded(s.seasonDays, 1, 365, true)],
    ['기타 토큰', bounded(s.extra)],
  ];
}

// Fixed seed makes estimates stable when income sliders move. Each draw has p=1/30.
// Excess copies are exchanged immediately. Costs are net external tokens required.
export function estimateRandom(owned, samples = 256) {
  const start = owned.map(n => bounded(n, 0, MAX_COPIES, true));
  const missing = start.reduce((sum, n) => sum + MAX_COPIES - n, 0);
  if (!missing) return { mean: 0, low: 0, high: 0, draws: 0 };
  let seed = 20261117;
  const random = () => {
    seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
    return (seed >>> 0) / 4294967296;
  };
  const costs = [];
  let totalDraws = 0;
  for (let run = 0; run < samples; run++) {
    const counts = start.slice();
    let left = missing, draws = 0, duplicates = 0;
    while (left > 0) {
      const index = Math.floor(random() * counts.length);
      draws++;
      if (counts[index] < MAX_COPIES) { counts[index]++; left--; }
      else duplicates++;
    }
    totalDraws += draws;
    costs.push(draws * RANDOM_COST - duplicates * 5);
  }
  costs.sort((a, b) => a - b);
  return { mean: costs.reduce((a, b) => a + b, 0) / samples,
    low: costs[Math.floor(samples * 0.1)], high: costs[Math.floor(samples * 0.9)], draws: totalDraws / samples };
}
export function daysNeeded(cost, wallet, weekly) {
  const remaining = Math.max(0, cost - bounded(wallet));
  return remaining === 0 ? 0 : weekly > 0 ? Math.ceil(remaining * 7 / weekly) : null;
}
