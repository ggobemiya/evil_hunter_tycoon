<template>
  <section class="reference-info">
    <template v-if="kind === 'tempering'">
      <h3>지옥불 담금질 옵션 35종</h3>
      <p>SSS·L급의 획득 확률은 동일합니다. 수치 범위는 옵션 설명의 N에 해당합니다.</p>
      <div class="reference-scroll"><table>
        <thead><tr><th>옵션</th><th>중첩</th><th>획득 확률</th><th>SSS급 N(%)</th><th>L급 N(%)</th></tr></thead>
        <tbody><tr v-for="o in temperingOptions" :key="o.name">
          <td>{{ o.name }}</td><td>{{ o.stack ? '가능' : '불가' }}</td>
          <td>{{ o.chance.toFixed(2) }}%</td><td>{{ o.sss }}</td><td>{{ o.legendary }}</td>
        </tr></tbody>
      </table></div>
      <p>유니크 장비의 유니크 옵션은 등장하지 않습니다. v1.381 사전 안내 기준입니다.</p>
      <a href="https://cafe.naver.com/evilhuntertycoon/51803" target="_blank" rel="noopener noreferrer">출처: 공식 카페 v1.381 안내</a>
    </template>
    <template v-else>
      <h3>헌터 성격 33종</h3>
      <div class="personality-legend" aria-label="성격 색상 안내">
        <span v-for="(label, category) in personalityCategories" :key="category" :class="'personality-' + category">{{ label }}</span>
      </div>
      <div class="reference-scroll"><table>
        <thead><tr><th>번호</th><th>성격</th><th>효과</th><th>분류</th></tr></thead>
        <tbody><tr v-for="(p, i) in personalities" :key="p.name"><td>{{ i + 1 }}</td><td :class="'personality-' + p.category">{{ p.name }}</td><td :class="'personality-' + p.category">{{ p.effect }}</td><td :class="'personality-' + p.category">{{ personalityCategories[p.category] }}</td></tr></tbody>
      </table></div>
      <a href="https://cafe.naver.com/evilhuntertycoon/16163" target="_blank" rel="noopener noreferrer">출처: 하리멍 님의 헌터 성격 정리</a>
    </template>
  </section>
</template>
<script>
import { temperingOptions, personalities, personalityCategories } from './referenceData';
export default { props: { kind: { type: String, required: true } }, data: () => ({ temperingOptions, personalities, personalityCategories }) };
</script>
<style scoped>
.reference-info { max-width: 1100px; margin: 24px auto; padding: 0 12px; text-align: left; }
.reference-info p { line-height: 1.6; color: #555; }
.reference-scroll { overflow-x: auto; margin: 16px 0; }
table { width: 100%; min-width: 560px; table-layout: auto; text-align: left; border-collapse: collapse; font-size: 14px; }
th, td { padding: 11px 12px; border: 1px solid #ddd; }
th { background: #eef3f8; white-space: nowrap; }
tbody tr:nth-child(even) { background: #fafafa; }
td:not(:first-child) { min-width: 65px; }
a { color: #315f98; }
.personality-legend { display: flex; flex-wrap: wrap; gap: 8px 20px; font-weight: 600; }
.personality-combat { color: #14532d; font-weight: 600; }
.personality-utility { color: #4f7f3f; }
.personality-negative { color: #b42318; }
.personality-neutral { color: #2c3e50; }
</style>
