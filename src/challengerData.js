// 챌린저스 리그 티어별 명예점수 보상표
// rating 은 해당 티어에 필요한 최소 레이팅(이상)이다. 높은 티어부터 정렬되어 있다.

export const challengerGroups = {
  '마스터': '#f3d275',
  '다이아': '#c5d9f1',
  '플레티넘': '#d9ead3',
  '골드': '#fce3b0',
  '실버': '#dcdcdc',
  '브론즈': '#d9a404',
};

export const challengerTiers = [
  { group: '마스터', tier: '마스터1', rating: 3600, honor: 700 },
  { group: '마스터', tier: '마스터2', rating: 3500, honor: 650 },
  { group: '마스터', tier: '마스터3', rating: 3400, honor: 600 },
  { group: '마스터', tier: '마스터4', rating: 3300, honor: 550 },
  { group: '다이아', tier: '다이아1', rating: 3200, honor: 500 },
  { group: '다이아', tier: '다이아2', rating: 3100, honor: 475 },
  { group: '다이아', tier: '다이아3', rating: 3000, honor: 450 },
  { group: '다이아', tier: '다이아4', rating: 2900, honor: 425 },
  { group: '플레티넘', tier: '플레티넘1', rating: 2800, honor: 400 },
  { group: '플레티넘', tier: '플레티넘2', rating: 2700, honor: 375 },
  { group: '플레티넘', tier: '플레티넘3', rating: 2600, honor: 350 },
  { group: '플레티넘', tier: '플레티넘4', rating: 2500, honor: 325 },
  { group: '골드', tier: '골드1', rating: 2400, honor: 300 },
  { group: '골드', tier: '골드2', rating: 2300, honor: 275 },
  { group: '골드', tier: '골드3', rating: 2200, honor: 250 },
  { group: '골드', tier: '골드4', rating: 2100, honor: 225 },
  { group: '실버', tier: '실버1', rating: 2000, honor: 200 },
  { group: '실버', tier: '실버2', rating: 1900, honor: 175 },
  { group: '실버', tier: '실버3', rating: 1800, honor: 150 },
  { group: '실버', tier: '실버4', rating: 1700, honor: 125 },
  { group: '브론즈', tier: '브론즈1', rating: 1600, honor: 100 },
  { group: '브론즈', tier: '브론즈2', rating: 1500, honor: 75 },
  { group: '브론즈', tier: '브론즈3', rating: 1400, honor: 50 },
  { group: '브론즈', tier: '브론즈4', rating: 1300, honor: 25 },
];

export const rankingRewards = [
  { name: '1티어 보상', cond: '랭킹 1~3위', token: 250, gem: 500 },
  { name: '2티어 보상', cond: '랭킹 4~10위', token: 200, gem: 400 },
  { name: '3티어 보상', cond: '랭킹 11~20위', token: 150, gem: 300 },
  { name: '4티어 보상', cond: '랭킹 21~50위', token: 125, gem: 250 },
  { name: '5티어 보상', cond: '랭킹 51~100위', token: 100, gem: 200 },
  { name: '6티어 보상', cond: '랭킹 101~200위', token: 70, gem: 140 },
  { name: '7티어 보상', cond: '랭킹 201~300위', token: 60, gem: 120 },
  { name: '8티어 보상', cond: '랭킹 301~400위', token: 50, gem: 100 },
  { name: '9티어 보상', cond: '랭킹 401~500위', token: 40, gem: 80 },
  { name: '10티어 보상', cond: '랭킹 501~750위', token: 30, gem: 60 },
  { name: '11티어 보상', cond: '랭킹 751~1000위', token: 20, gem: 40 },
  { name: '12티어 보상', cond: '랭킹 1001위 ~ 10000위', token: 10, gem: 20 },
];

export const participationRewards = [
  { name: '50회 참여보상', cond: '50회 이상 참여', token: 50, gem: 200 },
  { name: '35회 참여보상', cond: '35회 이상 참여', token: 20, gem: 100 },
  { name: '20회 참여보상', cond: '20회 이상 참여', token: 10, gem: 0 },
];
