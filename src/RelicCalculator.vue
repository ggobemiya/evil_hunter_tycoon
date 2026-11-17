<template>
  <section class="relic-planner">
    <h3>유물 토큰 획득처</h3>
    <p>수집한 유물의 버프는 마을의 모든 헌터에게, 모든 콘텐츠에서 적용됩니다.</p>
    <div class="planner-scroll"><table><thead><tr><th>획득처</th><th>지급 조건</th></tr></thead>
      <tbody><tr v-for="row in tokenSources" :key="row[0]"><th>{{ row[0] }}</th><td>{{ row[1] }}</td></tr></tbody>
    </table></div>
    <p><a href="https://cafe.naver.com/evilhuntertycoon/51391" target="_blank" rel="noopener noreferrer">출처: 공식 카페 v1.376 안내</a></p>

    <h3>주간 수급량 · 전체 만렙 예상 기간</h3>
    <p>플레이 횟수를 입력하세요. 필드보스·탐험은 확률을 반영한 평균 수급량으로 계산합니다.</p>
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
    <p class="note">탐험은 해당 지역에서 당첨 시 받는 토큰 수(1~7개)를 입력합니다. 승리의 메달 샵은 입력한 시즌 일수로 주간 환산합니다. 초기 참여 횟수는 모두 0입니다.</p>
    <div class="planner-scroll"><table><thead><tr><th>획득처</th><th>주간 예상 토큰</th></tr></thead>
      <tbody><tr v-for="row in income" :key="row[0]"><td>{{ row[0] }}</td><td>{{ fmt(row[1]) }}개</td></tr></tbody>
    </table></div>

    <details>
      <summary>현재 유물 보유량 입력 · 미입력 시 처음부터 계산</summary>
      <p>레벨업에 사용한 수량을 포함한 누적 획득량입니다. 레벨을 고르면 해당 레벨의 최소 누적 수량으로 바뀌며, 여분은 누적 수량에 더해 주세요. 최대 271개입니다.</p>
      <label>모든 유물 레벨 일괄 적용
        <select aria-label="모든 유물 레벨 일괄 적용" @change="setAll($event)"><option value="">선택</option><option v-for="(n, level) in thresholds" :key="level" :value="n">{{ level === 0 ? '미보유' : 'Lv.' + level }}</option></select>
      </label>
      <div class="planner-scroll"><table><thead><tr><th>유물</th><th>레벨</th><th>누적 획득량</th></tr></thead><tbody>
        <tr v-for="(r, i) in relics" :key="r.name"><td>{{ r.name }}</td><td>
          <select :aria-label="r.name + ' 레벨'" :value="levelOf(owned[i])" @change="owned[i] = thresholds[Number($event.target.value)]">
            <option v-for="(n, level) in thresholds" :key="level" :value="level">{{ level === 0 ? '미보유' : 'Lv.' + level }}</option>
          </select></td><td><input type="number" min="0" max="271" :aria-label="r.name + ' 누적 획득량'" :value="owned[i]" @input="owned[i] = bounded($event.target.value, 0, 271, true)"></td></tr>
      </tbody></table></div>
    </details>
    <label class="wallet">현재 유물 토큰 <input type="number" min="0" max="100000" v-model.number="wallet" aria-label="현재 유물 토큰"></label>
    <div class="results" aria-live="polite">
      <p><strong>주간 예상 토큰 {{ fmt(weekly) }}개</strong></p>
      <p>랜덤 상자 기준 주 {{ fmt(weekly / 10) }}개 · 선택 상자 기준 주 {{ fmt(weekly / 50) }}개</p>
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
const thresholds = [0, 1];
relicLevelUp.forEach(row => thresholds.push(thresholds[thresholds.length - 1] + row.count));
export default {
  data: () => ({ relics, tokenSources, thresholds, wallet: 0, owned: relics.map(() => 0),
    settings: { worldTier: 5, heroTier: 5, worldTimes: 0, heroTimes: 0, field: 0, expeditions: 0, expeditionTokens: 1, excavation: 0, challenger: 0, medal: 0, seasonDays: 28, extra: 0 },
    bosses: [{ label: '일반 월드보스', tier: 'worldTier', times: 'worldTimes' }, { label: '영웅 월드보스', tier: 'heroTier', times: 'heroTimes' }],
    fields: [
      { key: 'field', label: '필드보스 보상 횟수 / 일' },
      { key: 'expeditions', label: '탐험 클리어 횟수 / 일' },
      { key: 'expeditionTokens', label: '탐험 당첨 시 토큰 수', min: 1, max: 7 },
      { key: 'excavation', label: '유적 발굴 보상 회분 / 일' },
      { key: 'challenger', label: '챌린저스 샵 구매 / 주', max: 2 },
      { key: 'medal', label: '승리의 메달 샵 구매 / 시즌', max: 2 },
      { key: 'seasonDays', label: '시즌 길이 (일, 직접 조정)', min: 1, max: 365 },
      { key: 'extra', label: '기타 토큰 / 주 (보너스샵 등)' },
    ],
  }),
  computed: {
    income() { return weeklyIncome(this.settings); },
    weekly() { return this.income.reduce((sum, row) => sum + row[1], 0); },
    missing() { return this.owned.reduce((sum, n) => sum + MAX_COPIES - bounded(n, 0, MAX_COPIES, true), 0); },
    random() { return estimateRandom(this.owned); },
  },
  methods: {
    bounded,
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
