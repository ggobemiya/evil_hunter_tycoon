<template>
  <section class="relic-planner">
    <h3>유물 토큰 획득처</h3>
    <p>수집한 유물의 버프는 마을의 모든 헌터에게, 모든 콘텐츠에서 적용됩니다.</p>
    <div class="planner-scroll"><table><thead><tr><th>획득처</th><th>지급 조건</th></tr></thead>
      <tbody><tr v-for="row in tokenSources" :key="row[0]"><th>{{ row[0] }}</th><td>{{ row[1] }}</td></tr></tbody>
    </table></div>
    <p><a href="https://cafe.naver.com/evilhuntertycoon/51391" target="_blank" rel="noopener noreferrer">출처: 공식 카페 v1.376 안내</a></p>

    <h3>일주일에 모으는 유물 토큰 · 만렙까지 걸리는 시간</h3>
    <p>평소 참여 횟수로 앞으로 7일 동안 모을 토큰을 계산합니다. 토큰으로 상자를 구매하면 유물을 얻습니다. 필드보스·탐험은 매번 지급되지 않으므로 평균값으로 표시합니다.</p>
    <p class="note" role="status">{{ saveMessage }}</p>
    <p class="note">처음에는 월보 각각 4티어·주 3회, 필보 하루 3회, 탐험 하루 2회와 Lv.3~5 보유량 예시가 적용됩니다. 바꾼 값은 다음 방문에도 유지됩니다. 탐험 보상 35개는 확인 전 가정값입니다. 실제 당첨 보상에 맞춰 수정하세요(공지 기준 1~7개).</p>
    <div class="boss-grid">
      <fieldset v-for="b in bosses" :key="b.tier">
        <legend>{{ b.label }}</legend>
        <label :for="b.tier">보상 티어</label>
        <div class="tier-control">
          <input :id="b.tier" type="number" min="1" max="5" step="1" :value="settings[b.tier]" @input="set(b.tier, $event, 1, 5)">
          <span>티어</span>
          <input type="range" min="1" max="5" step="1" :aria-label="b.label + ' 티어 슬라이더'" :value="settings[b.tier]" @input="set(b.tier, $event, 1, 5)">
        </div>
        <p>보상 1회당 {{ 45 - 5 * settings[b.tier] }}개 (참여 10개 포함)</p>
        <label :for="b.times">주간 보상 수령 횟수</label>
        <input :id="b.times" type="number" min="0" max="100" :value="settings[b.times]" @input="set(b.times, $event, 0, 100)">
      </fieldset>
    </div>
    <div class="income-grid">
      <label v-for="f in fields" :key="f.key" :for="'income-' + f.key">{{ f.label }}
        <input :id="'income-' + f.key" type="number" :min="f.min || 0" :max="f.max || 100000" step="1" :value="settings[f.key]" @input="set(f.key, $event, f.min || 0, f.max || 100000)">
      </label>
    </div>
    <p class="note">필드보스는 1회당 50% × 10개 = 평균 5개, 탐험은 1회당 20% × 지역별 토큰 수로 계산합니다. 유적 발굴은 2시간당 1개로, 하루 24시간분을 빠짐없이 수령하면 주 84개입니다. 6회분이 쌓이기 전에 수령하고, 놓친 시간은 하루 수령 시간에서 빼 주세요. 승리의 전장 시즌은 14일입니다.</p>
    <div class="planner-scroll"><table><thead><tr><th>획득처</th><th>계산 방법</th><th>일주일에 모으는 토큰</th></tr></thead>
      <tbody><tr v-for="(row, index) in income" :key="row[0]"><td>{{ row[0] }}</td><td>{{ incomeExplanation[index] }}</td><td>{{ fmt(row[1]) }}개</td></tr></tbody>
    </table></div>

    <details>
      <summary>내 유물 레벨과 모은 개수 (자동 저장)</summary>
      <p>게임 화면처럼 현재 레벨과 다음 레벨을 위해 모은 개수를 입력하세요. 예: Lv.4에서 15 / 25. 레벨을 바꾸면 모은 개수는 0부터 시작합니다.</p>
      <label>모든 유물 레벨 일괄 적용
        <select aria-label="모든 유물 레벨 일괄 적용" @change="setAll($event)"><option value="">선택</option><option v-for="(n, level) in thresholds" :key="level" :value="n">{{ level === 0 ? '미보유' : 'Lv.' + level }}</option></select>
      </label>
      <div class="planner-scroll"><table><thead><tr><th>유물</th><th>레벨</th><th>모은 개수 / 다음 레벨까지</th></tr></thead><tbody>
        <tr v-for="(r, i) in relics" :key="r.name"><td>{{ r.name }}</td><td>
          <select :aria-label="r.name + ' 레벨'" :value="levelOf(owned[i])" @change="owned[i] = thresholds[Number($event.target.value)]">
            <option v-for="(n, level) in thresholds" :key="level" :value="level">{{ level === 0 ? '미보유' : 'Lv.' + level }}</option>
          </select></td><td><span v-if="levelOf(owned[i]) === 10">만렙</span><template v-else><input type="number" min="0" :max="nextCount(i)" :aria-label="r.name + ' 모은 개수'" :value="owned[i] - thresholds[levelOf(owned[i])]" @input="setExtra(i, $event)"> / {{ nextCount(i) }}</template></td></tr>
      </tbody></table></div>
    </details>
    <label class="wallet">현재 유물 토큰 <input type="number" min="0" max="100000" v-model.number="wallet" aria-label="현재 유물 토큰"></label>
    <div class="results" aria-live="polite">
      <p><strong>일주일에 평균 {{ fmt(weekly) }}토큰을 모아요</strong></p>
      <p>이 토큰을 전부 쓰면 랜덤 유물 약 {{ fmt(weekly / 10) }}개 또는 선택 유물 약 {{ fmt(weekly / 50) }}개에 해당합니다. 두 수량을 동시에 받는 것은 아닙니다.</p>
      <p>전체 만렙까지 필요한 유물: <b>{{ missing.toLocaleString() }}개</b> / 총 8,130개</p>
      <div class="result-grid">
        <div><h4>랜덤 상자로 모으면</h4><strong>{{ days(random.mean) }}</strong><p>모의실험 중간 80%: {{ days(random.low) }} ~ {{ days(random.high) }}</p><p>예상 필요 토큰 {{ fmt(random.mean) }}개</p></div>
        <div><h4>선택 상자로 모으면</h4><strong>{{ days(missing * 50) }}</strong><p>부족한 유물만 선택하는 기준</p><p>필요 토큰 {{ fmt(missing * 50) }}개</p></div>
      </div>
    </div>
    <p class="note">랜덤 5개 묶음 50토큰 / 25개 묶음 250토큰, 선택 상자 1개 50토큰 기준입니다. 상자당 유물 1개로 계산합니다. 주간 개수는 토큰 환산 평균이며 랜덤 묶음 구매는 5개 단위입니다.</p>
    <p class="note">랜덤 예상은 각 유물 확률 1/30, 256회 모의실험, 초과 유물 1개당 5토큰 즉시 교환 기준입니다. 기간은 평균 수급 속도로 환산한 추정치이며 실제 보상 일정·획득 운에 따라 달라집니다. 구매 묶음의 잔여 상자와 랜덤·선택 혼합 구매는 반영하지 않습니다.</p>
  </section>
</template>
<script>
import { relics, relicLevelUp } from './relicData';
import { tokenSources } from './referenceData';
import { bounded, weeklyIncome, estimateRandom, daysNeeded, MAX_COPIES } from './relicCalculator';
import { normalizeState, loadState, saveState } from './relicStorage';
const thresholds = [0, 1];
relicLevelUp.forEach(row => thresholds.push(thresholds[thresholds.length - 1] + row.count));
export default {
  data: () => ({ relics, tokenSources, thresholds, ...normalizeState(null, relics.map(r => r.name)), saveMessage: '',
    bosses: [{ label: '일반 월드보스', tier: 'worldTier', times: 'worldTimes' }, { label: '영웅 월드보스', tier: 'heroTier', times: 'heroTimes' }],
    fields: [
      { key: 'field', label: '필드보스 보상 횟수 / 일' },
      { key: 'expeditions', label: '탐험 클리어 횟수 / 일' },
      { key: 'expeditionTokens', label: '탐험 당첨 시 받는 토큰 (가정값)', min: 1, max: 1000 },
      { key: 'excavationHours', label: '유적 발굴 수령 시간분 / 일', max: 24 },
      { key: 'challenger', label: '챌린저스 샵 구매 / 주', max: 2 },
      { key: 'medal', label: '승리의 메달 샵 구매 / 시즌', max: 2 },
      { key: 'extra', label: '기타 토큰 / 주 (보너스샵 등)' },
    ],
  }),
  created() {
    try {
      const state = loadState(window.localStorage, this.relics.map(r => r.name));
      this.settings = state.settings; this.owned = state.owned; this.wallet = state.wallet;
      this.persist();
    } catch { this.saveMessage = '브라우저 저장을 사용할 수 없습니다. 이번 입력은 새로고침하면 사라집니다.'; }
  },
  watch: {
    settings: { deep: true, handler() { this.persist(); } },
    owned: { deep: true, handler() { this.persist(); } },
    wallet() { this.persist(); },
  },
  computed: {
    incomeExplanation() {
      const s = this.settings;
      return [
        `주 ${s.worldTimes}회 × ${45 - 5 * s.worldTier}개`,
        `주 ${s.heroTimes}회 × ${45 - 5 * s.heroTier}개`,
        `하루 ${s.field}회 × 7일 × 50% × 10개`,
        `하루 ${s.expeditions}회 × 7일 × 20% × ${s.expeditionTokens}개`,
        `하루 ${s.excavationHours}시간 ÷ 2시간 × 7일`,
        `주 ${s.challenger}회 구매 × 100개`,
        `2주에 ${s.medal}회 구매 × 200개 ÷ 2`,
        '직접 입력한 일주일 추가 토큰',
      ];
    },
    income() { return weeklyIncome(this.settings); },
    weekly() { return this.income.reduce((sum, row) => sum + row[1], 0); },
    missing() { return this.owned.reduce((sum, n) => sum + MAX_COPIES - bounded(n, 0, MAX_COPIES, true), 0); },
    random() { return estimateRandom(this.owned); },
  },
  methods: {
    bounded,
    persist() {
      let ok = false;
      try { ok = saveState(window.localStorage, this, this.relics.map(r => r.name)); } catch { /* Storage may be disabled. */ }
      this.saveMessage = ok ? '자동 저장됨 · 이 브라우저에서 다시 열면 입력값이 복원됩니다. 브라우저 데이터를 삭제하면 초기화됩니다.' : '자동 저장에 실패했습니다. 이번 입력은 새로고침하면 사라질 수 있습니다.';
    },
    nextCount(i) { const level = this.levelOf(this.owned[i]); return level < 10 ? thresholds[level + 1] - thresholds[level] : 0; },
    setExtra(i, event) { const base = thresholds[this.levelOf(this.owned[i])]; this.owned[i] = base + bounded(event.target.value, 0, this.nextCount(i), true); },
    set(key, event, min, max) { const n = bounded(event.target.value, min, max, true); this.settings[key] = n; event.target.value = n; },
    setAll(event) { if (event.target.value !== '') this.owned = this.relics.map(() => Number(event.target.value)); },
    levelOf(n) { return thresholds.reduce((level, count, i) => n >= count ? i : level, 0); },
    fmt(n) { return n.toLocaleString('ko-KR', { maximumFractionDigits: 1 }); },
    days(cost) { const d = daysNeeded(cost, this.wallet, this.weekly); return d === null ? '수급량을 입력하세요' : d === 0 ? '추가 수급 0일' : '약 ' + d.toLocaleString() + '일'; },
  },
};
</script>
<style scoped>
.relic-planner { margin: 28px 0; text-align: left; line-height: 1.6; }
.planner-scroll { overflow-x: auto; margin: 16px 0; }
table { width: 100%; min-width: 360px; table-layout: auto; text-align: left; border-collapse: collapse; font-size: 14px; }
th, td { border: 1px solid #ddd; padding: 9px 12px; }
th { background: #eef3f8; }
.boss-grid, .result-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
fieldset { min-width: 0; border: 1px solid #ccd6e2; border-radius: 8px; padding: 16px; }
legend, h4 { font-weight: 700; }
.tier-control { display: flex; align-items: center; gap: 8px; }
.relic-planner input[type=number] { width: 90px; box-sizing: border-box; padding: 8px; border: 1px solid #aaa; border-radius: 4px; font-size: 16px; }
.relic-planner input[type=range] { flex: 1; min-width: 60px; width: 100%; accent-color: #396aa2; }
.income-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 20px; }
.income-grid label { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.note { color: #666; font-size: 13px; }
.results { background: #f0f5fa; padding: 18px; border-radius: 8px; margin-top: 16px; }
.result-grid strong { font-size: 22px; color: #275b91; }
details { margin: 20px 0; }
summary { cursor: pointer; font-weight: 700; }
select { padding: 7px; font-size: 14px; }
a { color: #315f98; }
.wallet { display: block; margin-top: 16px; }
@media (max-width: 640px) { .boss-grid, .result-grid, .income-grid { grid-template-columns: 1fr; } th, td { padding: 8px; } }
</style>
