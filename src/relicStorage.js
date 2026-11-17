export const STORAGE_KEY = 'eht.relicPlanner.v1';
export const DEFAULT_SETTINGS = { worldTier: 4, heroTier: 4, worldTimes: 3, heroTimes: 3, field: 3, expeditions: 2, expeditionTokens: 35, excavationHours: 24, challenger: 2, medal: 2, extra: 0 };
const DEFAULT_OWNED = {
  '태초의 알': 71, '청옥 펜던트': 61, '투신의 부적': 52, '태양의 견갑': 53,
  '수호의 장갑': 61, '심해의 샘물': 54, '생기의 비약': 46, '숲의 이슬': 46,
  '사냥의 징표': 61, '간파의 양피지': 64, '푸른 진혼곡': 58, '칠흑의 깃털': 57,
  '주시자의 패': 58, '주술 송곳니': 55, '칠흑의 족쇄': 59, '원혼의 해골': 59,
  '선혈의 구슬': 68, '푸른 혼불': 56, '영혼의 비석': 63, '정화의 깃털': 70,
  '맹독의 띠': 55, '부의 천칭': 58, '풍요의 모래시계': 62, '광기의 단검': 57,
  '성광의 낫': 61, '집중의 단안경': 57, '마력의 산호': 60, '암흑경 파편': 46,
  '파괴의 완갑': 44, '가시 반지': 43,
};
const limits = { worldTier: [1, 5], heroTier: [1, 5], worldTimes: [0, 100], heroTimes: [0, 100], expeditionTokens: [1, 1000], excavationHours: [0, 24], challenger: [0, 2], medal: [0, 2] };
function number(value, fallback, min, max) {
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(min, Math.min(max, Math.floor(value))) : fallback;
}
export function normalizeState(raw, names) {
  const state = raw && typeof raw === 'object' ? raw : {};
  const settings = {};
  Object.keys(DEFAULT_SETTINGS).forEach(key => {
    const [min, max] = limits[key] || [0, 100000];
    settings[key] = number(state.settings?.[key], DEFAULT_SETTINGS[key], min, max);
  });
  return { settings, wallet: number(state.wallet, 0, 0, 100000),
    owned: names.map(name => number(state.owned?.[name], DEFAULT_OWNED[name] || 0, 0, 271)) };
}
export function loadState(storage, names) {
  try { return { ...normalizeState(JSON.parse(storage.getItem(STORAGE_KEY)), names), error: false }; }
  catch { return { ...normalizeState(null, names), error: true }; }
}
export function saveState(storage, state, names) {
  try {
    const owned = Object.fromEntries(names.map((name, i) => [name, state.owned[i]]));
    const clean = normalizeState({ settings: state.settings, wallet: state.wallet, owned }, names);
    storage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, settings: clean.settings, wallet: clean.wallet,
      owned: Object.fromEntries(names.map((name, i) => [name, clean.owned[i]])) }));
    return true;
  } catch { return false; }
}
