<template>
  <section class="job-guide">
    <h3>직업 / 스킬</h3>
    <p>1차 계열 → 2차 → 3차 → 4차 순서로 전직합니다. <strong>2·3·4차 직업은 같은 계열 안에서 각각 따로 선택합니다.</strong></p>
    <p class="note">예: 소서러 계열의 3차 다크로드에서 4차 마나로드로 전직할 수 있습니다.</p>
    <section v-for="job in jobs" :key="job.name" class="job-family">
      <h4>{{ job.name }}</h4>
      <p><b>1차 스킬:</b> {{ job.base }}</p>
      <div class="job-stages">
        <section v-for="stage in job.stages" :key="stage.name">
          <h5>{{ stage.name }}</h5>
          <dl><template v-for="entry in stage.entries" :key="entry.name">
            <dt>{{ entry.name }}</dt><dd>{{ entry.skill }}</dd>
          </template></dl>
        </section>
      </div>
    </section>
    <h3>기본 무기 공속</h3>
    <div class="job-scroll"><table>
      <thead><tr><th>1차 계열</th><th>고대·원시</th><th>콜로·월보</th></tr></thead>
      <tbody><tr v-for="row in speeds" :key="row[0]"><th scope="row">{{ row[0] }}</th><td>{{ row[1] }}</td><td>{{ row[2] }}</td></tr></tbody>
    </table></div>
    <h3>자주 쓰는 줄임말</h3>
    <dl class="abbreviations"><template v-for="item in abbreviations" :key="item.short"><dt>{{ item.short }}</dt><dd>{{ item.full }}</dd></template></dl>
    <h3>참고</h3>
    <ul>
      <li>다크로드와 오포지터는 모두 <b>소서러 계열</b>입니다.</li>
      <li>4차 스킬트리는 게임 내 스킬 탭의 초록색 ‘스킬트리’ 버튼에서 확인합니다. 12개 노드 중 ‘Lv.10’ 표시가 있는 노드가 선택된 노드입니다.</li>
      <li>배틀커맨더·소드엠페러는 퓨리 패시브를 가집니다. 공격속도를 크게 올리지만 헌터가 사망한 상태에서는 발동하지 않습니다.</li>
    </ul>
    <p class="note">제공된 ‘직업과 스킬 이름’ 정리 문서 기준 · 2026-11-18</p>
  </section>
</template>
<script>
import { jobs, speeds, abbreviations } from './jobSkillData';
export default { name: 'JobSkills', data: () => ({ jobs, speeds, abbreviations }) };
</script>
<style scoped>
.job-guide { max-width: 1100px; padding: 0 16px; margin: 24px auto; text-align: left; line-height: 1.65; }
.job-family { border: 1px solid #d5dfe9; border-radius: 8px; margin: 20px 0; overflow: hidden; }
.job-family > h4 { margin: 0; padding: 10px 16px; background: #edf3f9; color: #315f98; font-size: 18px; }
.job-family > p { padding: 0 16px; }
.job-stages { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; padding: 0 16px 16px; }
.job-stages section { padding: 12px; background: #fafbfc; border-radius: 6px; }
h5 { margin: 0 0 12px; font-size: 15px; color: #315f98; }
dl { margin: 0; } dt { font-weight: 700; } dd { margin: 0 0 12px; color: #555; }
.job-scroll { overflow-x: auto; }
table { width: 100%; min-width: 330px; table-layout: auto; border-collapse: collapse; }
th, td { padding: 10px 16px; border: 1px solid #ddd; }
th { background: #edf3f9; }
.abbreviations { display: grid; grid-template-columns: max-content 1fr; gap: 8px 20px; }
.abbreviations dd { margin: 0; }
ul { padding-left: 22px; } li { margin-bottom: 8px; }
.note { font-size: 13px; color: #666; }
@media (max-width: 640px) { .job-stages { grid-template-columns: 1fr; } }
</style>
