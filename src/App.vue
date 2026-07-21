<template>
  <!-- Modal -->
  <div v-if="isOpened" class="black-bg" @click="isOpened=false">
    <div class="white-bg">
      <h4>공속 계산식</h4>
      <p>최종 공속 =
        무기 공속 * (1 - 스탯공속 - 성격공속 - 비법공속 - 연합공속 - 펫장비 - 장비공속) / (1 + 퓨리공속증가량 + 퀴큰공속증가량)</p>
      <p>{{ final_speed }} =
        {{ weapon_speed }} * (1 - {{ stat }} - {{ personality }} - {{ secret / 100 }} - {{ union_speed / 100 }} - {{ pet_equipment / 100 }} -
        {{ equip_speed / 100 }}) / (1 + {{ fury - 1 }} + {{ quicken - 1 }})</p>
    </div>
  </div>

  <a href="/evil_hunter_tycoon"><img alt="evt_title" class="title_img" src="./assets/eht_title.png"></a>
  <div>
    <a class="hits" href="https://hits.sh/ggobemiya.github.io/evil_hunter_tycoon/">
      <img alt="Hits" src="https://hits.sh/ggobemiya.github.io/evil_hunter_tycoon.svg?view=today-total"/>
    </a>
    <h2>이블 헌터 타이쿤 계산기</h2>
  </div>

  <!-- Tab Buttons -->
  <div class="tab-buttons">
    <button :class="{ active: activeTab === 'attack' }" @click="activeTab = 'attack'">공속 계산기</button>
    <button :class="{ active: activeTab === 'move' }" @click="activeTab = 'move'">이속 계산기</button>
    <button :class="{ active: activeTab === 'kills' }" @click="activeTab = 'kills'">킬수 계산기</button>
    <button :class="{ active: activeTab === 'rune' }" @click="activeTab = 'rune'">룬 획득 정보</button>
  </div>

  <!-- Attack Speed Calculator -->
  <div v-show="activeTab === 'attack'">
    <table>
      <thead>
      <th v-for="item in items" :key="item">
        {{ item }}
      </th>
      </thead>
      <tbody>
      <td>
        <select v-model.trim.number="job" @change="change_job">
          <option disabled value="">선택</option>
          <option value="0">버서커</option>
          <option value="1">소서러</option>
          <option value="2">레인져</option>
          <option value="3">팔라딘</option>
          <option value="4">다크나이트</option>
        </select>
      </td>
      <td v-show="job===''"></td>
      <td v-show="job===0">
        <select v-model.trim.number="weapon_speed" @change="weapon_speed_cal">
          <option disabled value="">선택</option>
          <option value="2">고대,원시</option>
          <option value="2.2">콜로,월보</option>
        </select>
      </td>
      <td v-show="job===1 || job===4">
        <select v-model.trim.number="weapon_speed" @change="weapon_speed_cal">
          <option disabled value="">선택</option>
          <option value="2.2">고대,원시</option>
          <option value="2.3">콜로,월보</option>
        </select>
      </td>
      <td v-show="job===2">
        <select v-model.trim.number="weapon_speed" @change="weapon_speed_cal">
          <option disabled value="">선택</option>
          <option value="1.8">고대,원시</option>
          <option value="2">콜로,월보</option>
        </select>
      </td>
      <td v-show="job===3">
        <select v-model.trim.number="weapon_speed" @change="weapon_speed_cal">
          <option disabled value="">선택</option>
          <option value="2.4">고대,원시</option>
          <option value="2.5">콜로,월보</option>
        </select>
      </td>
      <td>
        <select v-model.trim.number="stat" @change="weapon_speed_cal">
          <option disabled value="">선택</option>
          <option value="0">회색</option>
          <option value="0.1">파란색</option>
          <option value="0.2">주황색</option>
          <option value="0.3">보라색</option>
        </select>
      </td>
      <td>
        <select v-model.trim.number="personality" @change="weapon_speed_cal">
          <option disabled value="">선택</option>
          <option value="0">효과 없음</option>
          <option value="-0.1">둔한</option>
          <option value="0.07">영웅심리</option>
          <option value="0.1">날쌘돌이</option>
        </select>
      </td>
      <td>
        <input v-model.trim.number="secret" max="10" min="0" onfocus="this.value=''" placeholder="입력(%)" step="0.1"
               type="number" @input="weapon_speed_cal">
      </td>
      <td>
        <input v-model.trim.number="union_speed" max="5" min="0" onfocus="this.value=''" placeholder="입력(%)" type="number"
               @input="weapon_speed_cal">
      </td>
      <td>
        <select v-model.trim.number="pet_equipment" @change="weapon_speed_cal">
          <option disabled value="">선택</option>
          <option value="0">없음</option>
          <option value="6">B</option>
          <option value="9">A</option>
          <option value="12">S</option>
        </select>
      </td>
      <td>
        <select v-model.trim.number="quicken" @change="weapon_speed_cal">
          <option disabled value="">선택</option>
          <option value="1">Lv.0</option>
          <option value="1.1">Lv.1</option>
          <option value="1.2">Lv.2</option>
          <option value="1.3">Lv.3</option>
          <option value="1.4">Lv.4</option>
          <option value="1.5">Lv.5</option>
        </select>
      </td>
      <td>
        <select v-model.trim.number="fury" @change="weapon_speed_cal">
          <option disabled value="">선택</option>
          <option value="1">Lv.0</option>
          <option value="2.38">Lv.1</option>
          <option value="4">Lv.10</option>
          <option value="4.18">Lv.11</option>
          <option value="4.36">Lv.12</option>
          <option value="4.54">Lv.13</option>
        </select>
      </td>
      </tbody>
    </table>
    <div class="equip">
      <span>룬, 장비 공속: </span>
      <input v-model.trim.number="equip_speed" max="100" min="0" placeholder="입력(%)" type="number"
             @input="final_speed_cal">
    </div>
    <div class="final">
      <span>최종 공속: </span>
      <input v-model.trim.number="final_speed" max="3" min="0.25" placeholder="입력(%)" step="0.01" type="number"
             @input="weapon_speed_cal">
      <br>
      <button @click="isOpened=true">공속 계산식</button>
    </div>
    <ol>
      <h3>⭐ ️참고</h3>
      <li>직업을 선택하세요.</li>
      <li>무기, 스탯, 성격, 퀴큰, 퓨리를 선택 / 비법, 연합공속을 입력하세요.</li>
      <li>퓨리룬 Lv1,2,3 장착시 퓨리 Lv11,12,13 선택하면 됩니다.</li>
      <li><span class="final_inline">최종 공속</span> 0.25를 기준으로 <span class="equip_inline">룬, 장비 공속</span>이 계산됩니다. <span
          class="final_inline">최종 공속</span>
        수정도 가능합니다.
      </li>
      <li><span class="equip_inline">룬, 장비 공속</span> 수정 시 그에 따른 <span class="final_inline">최종 공속</span>이 계산됩니다.</li>
      <li>정확도를 위해서 반올림 안했습니다.</li>
      <li>ex) <span class="equip_inline">룬, 장비 공속</span>이 82.955면 83을 맞춰야 합니다.</li>
      <li>ex) <span class="final_inline">최종 공속</span>이 0.255면 인게임 표기는 0.25지만 초당 공격력은 0.255로 계산됩니다.</li>
    </ol>
  </div>

  <!-- Movement Speed Calculator -->
  <div v-show="activeTab === 'move'">
    <table class="move-speed-table">
      <tbody>
      <tr>
        <td>헌터 등급 버프</td>
        <td>
          <select v-model.number="moveBuffs.hunterRank">
            <option value="0">없음</option>
            <option value="10">H (히로익)</option>
            <option value="20">L (레전더리)</option>
            <option value="30">U (울티메이트)</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>건물 (0 ~ 50)</td>
        <td class="slider-cell">
          <input type="range" min="0" max="50" step="1" v-model.number="moveBuffs.building">
          <input type="number" min="0" max="50" v-model.number="moveBuffs.building" class="slider-input">
        </td>
      </tr>
      <tr>
        <td>코스튬 (옷)</td>
        <td>
          <select v-model.number="moveBuffs.clothes">
            <option value="0">미적용</option>
            <option value="40">적용</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>코스튬 (날개)</td>
        <td>
          <select v-model.number="moveBuffs.wings">
            <option value="0">미적용</option>
            <option value="20">적용</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>인장</td>
        <td>
          <select v-model.number="moveBuffs.seal">
            <option value="0">미적용</option>
            <option value="20">적용</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>라이딩</td>
        <td>
          <select v-model.number="moveBuffs.riding">
            <option value="0">미적용</option>
            <option value="30">적용</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>비법 (0 ~ 15)</td>
        <td class="slider-cell">
          <input type="range" min="0" max="15" step="1" v-model.number="moveBuffs.secret">
          <input type="number" min="0" max="15" v-model.number="moveBuffs.secret" class="slider-input">
        </td>
      </tr>
       <tr>
        <td>룬</td>
        <td><input type="number" v-model.number="moveBuffs.rune" placeholder="입력" class="full-width-input"></td>
      </tr>
      <tr>
        <td>질풍신 포함 장비 이속 총합</td>
        <td><input type="number" v-model.number="moveBuffs.equipmentTotal" placeholder="입력" class="full-width-input"></td>
      </tr>
      <tr>
        <td>라이딩 장비 (편자)</td>
        <td>
          <select v-model.number="moveBuffs.horseshoe">
            <option value="0">없음</option>
            <option value="15">B</option>
            <option value="30">A</option>
            <option value="45">S</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>성격</td>
        <td>
          <select v-model.number="moveBuffs.personality">
            <option value="0">없음</option>
            <option value="10">달리기가 빠른</option>
            <option value="7">영웅심리</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>프로즌소울 (글레이셜 보우)</td>
        <td>
          <select v-model.number="moveBuffs.frozenSoul">
            <option value="0">미적용</option>
            <option value="80">적용</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>대악마 (원시,태초,혼돈,심연 무기)</td>
        <td>
          <select v-model.number="moveBuffs.greatDemon">
            <option value="0">미적용</option>
            <option value="200">적용</option>
          </select>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="move-speed-results">
      <h3>계산 결과</h3>
      <div class="result-item">
        <span class="label">총 이동속도 증가량 (합계):</span>
        <span class="value">{{ totalMoveSpeed }}</span>
      </div>
      <div class="result-item result-note">
        <span class="label">질풍신 공격력 증폭 (최대 30%)</span>
      </div>
      <div class="result-item result-note">
        <span class="label">진 질풍신 공격력 증폭 (최대 40%)</span>
      </div>
    </div>

    <div class="requirement-table-container">
        <h4>증폭률별 요구 이속량</h4>
        <table>
            <thead>
                <tr>
                    <th>증폭률</th>
                    <th>질풍신(30%) 요구값</th>
                    <th>부족한 값(증폭률)</th>
                    <th>진 질풍신(40%) 요구값</th>
                    <th>부족한 값(증폭률)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="rate in requirementRates" :key="rate">
                    <td>{{ rate }}%</td>
                    <td>{{ requiredSpeed(30, rate) }}</td>
                    <td :class="{met: isMet(requiredSpeed(30, rate))}">{{ deficit(requiredSpeed(30, rate)) }} ({{ currentAmp(30, rate) }}%)</td>
                    <td>{{ requiredSpeed(40, rate) }}</td>
                    <td :class="{met: isMet(requiredSpeed(40, rate))}">{{ deficit(requiredSpeed(40, rate)) }} ({{ currentAmp(40, rate) }}%)</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>

  <!-- Kills per Hour Calculator -->
  <div v-show="activeTab === 'kills'">
    <div class="kills-calculator-container">
      <table>
        <thead>
          <tr>
            <th>월</th>
            <th>일</th>
            <th>시</th>
            <th>분</th>
            <th>마리수</th>
            <th>시간당킬수</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in killsRecords" :key="index">
            <td><input type="number" v-model.number="record.month" min="1" max="12" placeholder="월"></td>
            <td><input type="number" v-model.number="record.day" min="1" max="31" placeholder="일"></td>
            <td><input type="number" v-model.number="record.hour" min="0" max="23" placeholder="시"></td>
            <td><input type="number" v-model.number="record.minute" min="0" max="59" placeholder="분"></td>
            <td><input type="number" v-model.number="record.kills" min="0" placeholder="마리수"></td>
            <td><input type="text" :value="record.kph !== null ? record.kph : ''" readonly class="kpm-display-input"></td>
          </tr>
        </tbody>
      </table>
      <div class="kills-buttons">
        <button @click="addKillsRecord">행 추가</button>
        <button @click="resetKillsRecords">표 전체 초기화</button>
        <button @click="resetExcludingLastKillsRecord">마지막 기록 빼고 초기화</button>
      </div>
      <ol class="kills-guide">
        <h3>⭐ 사용 가이드</h3>
        <li>첫 번째 행에 현재 **월, 일, 시, 분**과 **촌장의 마리수**를 입력하세요.</li>
        <li>일정 시간 뒤, 다시 접속하여 다음 행에 업데이트된 **월, 일, 시, 분**과 **촌장의 마리수**를 입력하면 이전 기록과의 차이를 바탕으로 **시간당 킬수**가 계산됩니다.</li>
        <li>**행 추가** 버튼을 통해 기록을 위한 새로운 빈 행을 계속 추가할 수 있습니다.</li>
        <li>**표 전체 초기화** 버튼을 누르면 현재 표의 모든 기록이 지워지고, 초기 상태인 4개의 빈 행만 남습니다.</li>
        <li>**마지막 기록 빼고 초기화** 버튼은 표가 너무 길어졌을 때 유용합니다. 이 버튼을 누르면 마지막으로 '월, 일, 시, 분, 마리수'가 모두 채워진 유효한 기록만 첫 번째 행으로 남기고, 나머지 기록은 모두 지워져 초기 상태(총 4개 행)로 돌아갑니다. 마지막 기록이 불완전할 경우, 표 전체가 초기화됩니다.</li>
      </ol>
    </div>
  </div>

  <!-- Rune Drop Info -->
  <div v-show="activeTab === 'rune'">
    <div class="rune-container">
      <div class="rune-floor-finder">
        <span class="rune-finder-label">현재 층</span>
        <input type="number" min="1" max="300" v-model.number="currentFloor" placeholder="예) 235">
        <div class="rune-floor-result" v-if="currentFloorStages">
          <span v-for="s in currentFloorStages" :key="s.name" class="floor-chip" :style="s.style">
            {{ s.name }} · {{ s.text }}
          </span>
        </div>
        <div class="rune-floor-result rune-floor-empty" v-else>1 ~ 300 사이의 층을 입력하면 해당 위치를 표에서 짚어줍니다.</div>
      </div>

      <h3>룬 획득 층</h3>
      <p class="rune-note">칸 하나가 하나의 단계 구간입니다. 색이 진할수록 높은 단계입니다.</p>

      <div v-for="block in [0, 1, 2]" :key="block" class="rune-block">
        <h4>{{ block * 100 + 1 }} ~ {{ block * 100 + 100 }}층</h4>
        <div class="rune-scroll">
          <table class="rune-matrix">
            <thead>
            <tr>
              <th class="rune-row-label">룬 구분</th>
              <th v-for="h in blockHeaders(block)" :key="h.from">{{ h.from }}<br>~{{ h.to }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in runeRows" :key="row.name">
              <th class="rune-row-label">{{ row.name }}</th>
              <td v-for="cell in blockCells(row, block)" :key="cell.from"
                  :colspan="cell.span"
                  :class="{ 'rune-empty': cell.stage === null, 'rune-active': isActiveCell(cell) }"
                  :style="cell.stage === null ? null : bandStyle(row, cell.stage)">
                {{ cell.stage === null ? '미출현' : cell.stage + '단계' }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3>스탯 룬 옵션 수치</h3>
      <p class="rune-note">단계별 <b>최대치</b>입니다. 같은 그룹 안에서는 옵션 종류와 상관없이 수치가 같습니다.</p>
      <div class="rune-scroll">
        <table class="rune-option-table">
          <thead>
          <tr>
            <th class="rune-row-label">그룹 \ 단계</th>
            <th v-for="n in 15" :key="n">{{ n }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="g in runeOptionGroups" :key="g.label">
            <th class="rune-row-label">{{ g.label }}그룹</th>
            <td v-for="(v, i) in g.values" :key="i">{{ v }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="rune-group-list">
        <div v-for="g in runeOptionGroups" :key="g.label" class="rune-group-item">
          <div class="rune-group-head"><span class="rune-group-badge">{{ g.label }}</span>{{ g.title }} ({{ g.options.length }}종)</div>
          <div class="rune-group-options">{{ g.options.join(', ') }}</div>
        </div>
      </div>

      <h3>스킬룬 목록</h3>
      <table class="rune-skill-table">
        <tbody>
        <tr v-for="t in skillRuneList" :key="t.tier">
          <th>{{ t.tier }}<br>({{ t.runes.length }}종)</th>
          <td>{{ t.runes.join(', ') }}</td>
        </tr>
        </tbody>
      </table>

      <ol class="rune-guide">
        <h3>⭐ 참고</h3>
        <li>모든 룬은 <b>마왕성 앞뜰</b>에서만 나옵니다. 층이 높을수록 높은 단계의 룬이 나옵니다.</li>
        <li>같은 차수의 스킬룬은 종류와 상관없이 획득 층이 동일합니다.</li>
        <li>스탯 룬과 2차 스킬룬은 20층마다, 1차 스킬룬은 30층마다 단계가 오릅니다.</li>
        <li>3차 스킬룬만 201~210층에서 3단계가 한 번 더 이어진 뒤 20층 단위로 올라갑니다.</li>
        <li>11~15단계의 최소 수치는 공개된 자료가 없어 최대치만 표기했습니다.</li>
        <li>A그룹은 10단계까지 2단계마다 최대치가 1씩 올랐지만, 11단계부터는 1단계마다 1씩 오릅니다.</li>
        <li>출처: 이블헌터 타이쿤 공식 카페 (룬 옵션표 / 스킬룬 층정보 / 앞뜰 201~300층 룬 정보)</li>
      </ol>
    </div>
  </div>

  <div class="maker">
    <span>제작) Andante An가자미</span>
    <br>
    <span>수정) Bell 꼬뱀벨</span>
  </div>
</template>

<script>
export default {
  name: 'App',
    data() {
      return {
              // Common
              activeTab: 'attack', // Set 'attack' as the default active tab
              isOpened: false,  
        // Attack Speed Calculator
        job: '',
        weapon_speed: '',
        stat: '',
        personality: '',
        secret: '',
        union_speed: '',
        quicken: '',
        fury: '',
        equip_speed: '',
        final_speed: '',
        pet_equipment: '',
        items: ['직업', '무기', '공속스탯', '성격', '비법', '연합공속', '펫장비', '퀴큰', '퓨리'],
  
        // Movement Speed Calculator
        moveBuffs: {
          hunterRank: 0,
          building: 0,
          clothes: 40,
          wings: 0,
          seal: 20,
          riding: 30,
          secret: 0,
          rune: 0,
          equipmentTotal: 0,
          horseshoe: 0,
          personality: 0,
          frozenSoul: 0,
          greatDemon: 0,
        },
        requirementRates: [3, 4, 5, 6, 7, 8, 9, 10],
  
        // Kills per Hour Calculator
        killsRecords: [
          { month: null, day: null, hour: null, minute: null, kills: null, kph: null },
          { month: null, day: null, hour: null, minute: null, kills: null, kph: null },
          { month: null, day: null, hour: null, minute: null, kills: null, kph: null }, // Added
          { month: null, day: null, hour: null, minute: null, kills: null, kph: null }, // Added
        ],
        killsLocalStorageKey: 'killsPerHourRecords', // Key for localStorage

        // Rune Drop Info
        currentFloor: null,
        runeRows: [
          {
            name: '스탯 룬',
            hue: 210,
            maxStage: 15,
            // 20층마다 1단계씩, 1~300층
            bands: Array.from({ length: 15 }, (_, i) => ({ stage: i + 1, from: i * 20 + 1, to: (i + 1) * 20 })),
          },
          {
            name: '1차 스킬룬',
            hue: 145,
            maxStage: 3,
            bands: [
              { stage: 1, from: 101, to: 130 },
              { stage: 2, from: 131, to: 160 },
              { stage: 3, from: 161, to: 300 },
            ],
          },
          {
            name: '2차 스킬룬',
            hue: 25,
            maxStage: 8,
            bands: [
              { stage: 1, from: 111, to: 140 },
              { stage: 2, from: 141, to: 170 },
              { stage: 3, from: 171, to: 200 },
              { stage: 4, from: 201, to: 220 },
              { stage: 5, from: 221, to: 240 },
              { stage: 6, from: 241, to: 260 },
              { stage: 7, from: 261, to: 280 },
              { stage: 8, from: 281, to: 300 },
            ],
          },
          {
            name: '3차 스킬룬',
            hue: 285,
            maxStage: 8,
            bands: [
              { stage: 1, from: 121, to: 150 },
              { stage: 2, from: 151, to: 180 },
              { stage: 3, from: 181, to: 210 },
              { stage: 4, from: 211, to: 230 },
              { stage: 5, from: 231, to: 250 },
              { stage: 6, from: 251, to: 270 },
              { stage: 7, from: 271, to: 290 },
              { stage: 8, from: 291, to: 300 },
            ],
          },
        ],
        runeOptionGroups: [
          {
            label: 'A',
            title: '공격속도 · 회피 · 치명타 확률',
            options: ['공격속도 %', '회피력 %', '치명타 확률 %'],
            values: [1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8, 9, 10, 11],
          },
          {
            label: 'B',
            title: '이동속도 · 흡혈 · 회복류',
            options: ['이동속도 %', '데미지 흡혈 %', '받는 데미지 25% 감소 확률 %', '공격시 피해의 추가 데미지 %', '공격시 3% 기분 회복 확률 %', '공격시 1% 기력 회복 확률 %', '공격시 3% 허기 회복 확률 %'],
            values: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          },
          {
            label: 'C',
            title: '소모량 · 경험치',
            options: ['기분 소모량 %', '기력 소모량 %', '허기 소모량 %', '획득 경험치 %'],
            values: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
          },
          {
            label: 'D',
            title: '공격력 · 방어력 · 체력 · 획득류',
            options: ['전체 공격력 %', '전체 방어력 %', '체력 %', '2배 골드획득 확률 %', '재료 추가 획득 확률 %'],
            values: [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34],
          },
          {
            label: 'E',
            title: '종족 데미지 · 치명타 피해량',
            options: ['영장류 데미지 %', '악마류 데미지 %', '언데드류 데미지 %', '보스류 데미지 %', '동물류 데미지 %', '치명타 피해량 %'],
            values: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38],
          },
        ],
        skillRuneList: [
          { tier: '1차 스킬룬', runes: ['퓨리', '홀리라이트', '멀티샷', '썬더볼트'] },
          { tier: '2차 스킬룬', runes: ['듀얼웨폰', '데스코일', '필버라이즈', '블레싱', '실버웨폰', '다크웨폰', '레인폴', '스나이핑', '서몬피닉스', '블리자드', '스톤커즈', '메테오'] },
          { tier: '3차 스킬룬', runes: ['배틀샤우트', '오라블레이드', '싸이클론', '디펜스오라', '핸즈오브갓', '익스큐션', '송오브피스', '포이즌봄', '미스틱애로우', '서몬퍼밀리어', '폴리모프', '나이트메어'] },
        ],
      };
    },
    computed: {
    totalMoveSpeed() {
      // Ensure all values are numbers before summing
      return Object.values(this.moveBuffs).reduce((sum, value) => sum + (Number(value) || 0), 0);
    },
    currentFloorStages() {
      const floor = Number(this.currentFloor);
      if (!floor || floor < 1 || floor > 300) return null;
      const columnStart = Math.floor((floor - 1) / 10) * 10 + 1;
      return this.runeRows.map(row => {
        const stage = this.stageAtColumn(row, columnStart);
        return {
          name: row.name,
          text: stage === null ? '미출현' : stage + '단계',
          style: stage === null ? {} : this.bandStyle(row, stage),
        };
      });
    },
  },
  mounted() {
    this.loadKillsRecords();
  },
  watch: {
    killsRecords: {
      handler() {
        this.saveKillsRecords();
        this.calculateKPHs(); // Recalculate KPMs on any change to records
      },
      deep: true
    },
    // Watch for changes in activeTab to calculate KPM only when the kills tab is active
    activeTab(newTab) {
      if (newTab === 'kills') {
        this.calculateKPHs();
      }
    },
  },
  methods: {
    // Rune Drop Info Methods
    blockHeaders(block) {
      return Array.from({ length: 10 }, (_, i) => {
        const from = block * 100 + i * 10 + 1;
        return { from, to: from + 9 };
      });
    },
    // 층 구간 경계가 모두 10 단위라 컬럼 시작 층만으로 단계를 판별할 수 있다
    stageAtColumn(row, columnStart) {
      const band = row.bands.find(b => columnStart >= b.from && columnStart + 9 <= b.to);
      return band ? band.stage : null;
    },
    // 같은 단계가 이어지는 컬럼들을 하나의 셀로 병합한다
    blockCells(row, block) {
      const cells = [];
      for (let i = 0; i < 10; i++) {
        const from = block * 100 + i * 10 + 1;
        const stage = this.stageAtColumn(row, from);
        const last = cells[cells.length - 1];
        if (last && last.stage === stage) {
          last.span += 1;
        } else {
          cells.push({ stage, span: 1, from });
        }
      }
      return cells;
    },
    bandStyle(row, stage) {
      const ratio = row.maxStage > 1 ? (stage - 1) / (row.maxStage - 1) : 0;
      const lightness = 92 - ratio * 37;
      return {
        backgroundColor: `hsl(${row.hue}, 62%, ${lightness}%)`,
        color: lightness < 68 ? '#fff' : '#2c3e50',
      };
    },
    isActiveCell(cell) {
      const floor = Number(this.currentFloor);
      if (!floor) return false;
      return floor >= cell.from && floor <= cell.from + cell.span * 10 - 1;
    },

    // Kills Calculator Methods
    addKillsRecord() {
      this.killsRecords.push({ month: null, day: null, hour: null, minute: null, kills: null, kph: null });
    },
    resetKillsRecords() {
      this.killsRecords = [
        { month: null, day: null, hour: null, minute: null, kills: null, kph: null },
        { month: null, day: null, hour: null, minute: null, kills: null, kph: null },
        { month: null, day: null, hour: null, minute: null, kills: null, kph: null },
        { month: null, day: null, hour: null, minute: null, kills: null, kph: null },
      ];
    },
    resetExcludingLastKillsRecord() {
      if (this.killsRecords.length > 0) {
        const lastRecordCandidate = this.killsRecords[this.killsRecords.length - 1];
        const isLastRecordComplete = [
          lastRecordCandidate.month,
          lastRecordCandidate.day,
          lastRecordCandidate.hour,
          lastRecordCandidate.minute,
          lastRecordCandidate.kills
        ].every(val => typeof val === 'number' && val !== null);

        if (isLastRecordComplete) {
          const lastRecord = { ...lastRecordCandidate }; // Deep copy
          lastRecord.kph = null; // Clear kph for the moved record
          this.killsRecords = [
            lastRecord,
            { month: null, day: null, hour: null, minute: null, kills: null, kph: null },
            { month: null, day: null, hour: null, minute: null, kills: null, kph: null }, // Ensure 4 initial rows
            { month: null, day: null, hour: null, minute: null, kills: null, kph: null },
          ];
        } else {
          this.resetKillsRecords(); // If last record is incomplete, reset all
        }
      } else {
        this.resetKillsRecords(); // If no records, just reset to empty state
      }
    },
    saveKillsRecords() {
      localStorage.setItem(this.killsLocalStorageKey, JSON.stringify(this.killsRecords));
    },
    loadKillsRecords() {
      const savedRecords = localStorage.getItem(this.killsLocalStorageKey);
      if (savedRecords) {
        this.killsRecords = JSON.parse(savedRecords);
      }
      // Ensure there are at least four records if loaded from empty or less than four
      if (this.killsRecords.length < 4) {
        while (this.killsRecords.length < 4) {
          this.killsRecords.push({ month: null, day: null, hour: null, minute: null, kills: null, kpm: null });
        }
      }
      this.calculateKPHs(); // Recalculate KPMs after loading
    },
    calculateKPHs() {
      for (let i = 0; i < this.killsRecords.length; i++) {
        if (i === 0) {
          this.killsRecords[i].kph = null; // First record has no previous record for comparison
          continue;
        }

        const currentRecord = this.killsRecords[i];
        const prevRecord = this.killsRecords[i - 1];

        // Ensure all necessary fields are numbers and not null
        const isValid = [
          currentRecord.month, currentRecord.day, currentRecord.hour, currentRecord.minute, currentRecord.kills,
          prevRecord.month, prevRecord.day, prevRecord.hour, prevRecord.minute, prevRecord.kills
        ].every(val => typeof val === 'number' && val !== null);

        if (isValid) {
          const currentTime = new Date(2000, currentRecord.month - 1, currentRecord.day, currentRecord.hour, currentRecord.minute);
          const prevTime = new Date(2000, prevRecord.month - 1, prevRecord.day, prevRecord.hour, prevRecord.minute);

          const timeDiffMinutes = (currentTime.getTime() - prevTime.getTime()) / (1000 * 60);
          const killDiff = currentRecord.kills - prevRecord.kills;

          if (timeDiffMinutes > 0) {
            currentRecord.kph = Math.round((killDiff / timeDiffMinutes) * 60); // Calculate kills per hour and round to nearest integer
          } else {
            currentRecord.kph = 0; // No time difference, or invalid time
          }
        } else {
          currentRecord.kph = null;
        }
      }
    },
    requiredSpeed(maxAmp, rate) {
        if (rate === 0) return 'N/A';
        return Math.ceil(maxAmp / (rate / 100));
    },
    // 현재 이속 총합으로 해당 증폭률에서 실제로 받는 증폭값 (상한 적용)
    currentAmp(maxAmp, rate) {
        const amp = Math.min(this.totalMoveSpeed * (rate / 100), maxAmp);
        return Math.round(amp * 10) / 10;
    },
    deficit(required) {
        if (required === 'N/A') return 'N/A';
        const diff = required - this.totalMoveSpeed;
        return diff > 0 ? diff : '충족';
    },
    isMet(required) {
        if (required === 'N/A') return false;
        return this.totalMoveSpeed >= required;
    },
    change_job: function () {
      this.job_init(this.job);
    },
    job_init: function (job) {
      if (job === 0) {
        this.job = 0;
        this.weapon_speed = 2;
        this.quicken = 1;
        this.fury = 4;
        this.final_speed = 0.25;
        this.pet_equipment = 0;
        this.weapon_speed_cal();
      } else if (job === 1 || job === 4) {
        this.job = job;
        this.weapon_speed = 2.2;
        this.quicken = 1.5;
        this.fury = 1;
        this.final_speed = 0.25;
        this.pet_equipment = 0;
        this.weapon_speed_cal();
      } else if (job === 2) {
        this.job = 2;
        this.weapon_speed = 1.8;
        this.quicken = 1.5;
        this.fury = 1;
        this.final_speed = 0.25;
        this.pet_equipment = 0;
        this.weapon_speed_cal();
      } else if (job === 3) {
        this.job = 3;
        this.weapon_speed = 2.4;
        this.quicken = 1.5;
        this.fury = 1;
        this.final_speed = 0.25;
        this.pet_equipment = 0;
        this.weapon_speed_cal();
      }
    },
    weapon_speed_cal: function () {
      let equip_speed
          = (1.0 - this.stat - this.personality - this.secret / 100 - this.union_speed / 100 - this.pet_equipment / 100
          - this.final_speed / this.weapon_speed * (1.0 + this.fury - 1.0 + this.quicken - 1.0)) * 100
      if (equip_speed < 0) {
        this.equip_speed = 0;
      } else {
        this.equip_speed = equip_speed.toFixed(3);
      }
    },
    final_speed_cal: function () {
      let final_speed =
          this.weapon_speed
          * (1.0 - this.stat - this.personality - this.secret / 100 - this.union_speed / 100 - this.equip_speed / 100 - this.pet_equipment / 100)
          / (1.0 + this.fury - 1.0 + this.quicken - 1.0)
      if (final_speed < 0.25) {
        this.final_speed = 0.250
      } else {
        this.final_speed = final_speed.toFixed(3);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

table {
  display: table;
  table-layout: fixed;
  width: 100%;
  text-align: center;
  border: 1px solid #2c3e50;
  border-collapse: collapse;
}

body {
  margin: 0 auto;
}

th {
  background: lightgrey;
}

th, td {
  display: table-cell;
  border: 1px solid #2c3e50;
  padding: 5px;
}

td > select, td > input {
  text-align: center;
  width: 100%;
  border: none;
  box-sizing: border-box;
}

input {
  width: 80px;
  text-align: center;
}

.equip, .final {
  margin: 30px;
}

.final, .final > input {
  color: darkred;
  font-size: 20px;
  font-weight: 900;
}

.equip, .equip > input {
  color: darkblue;
  font-size: 20px;
  font-weight: 900;
}

.black-bg {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
  z-index: 10;
}

.white-bg {
  width: calc(100% - 40px - 40px);
  position: absolute;
  top: 30%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

button {
  font-size: 15px;
  padding: 10px 15px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  cursor: pointer;
}

.tab-buttons {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.tab-buttons button {
  flex: 1 1 40%;
  max-width: 250px;
}

.tab-buttons button.active {
  background-color: #2c3e50;
  color: white;
  border-bottom: 2px solid #2c3e50;
}

ol {
  text-align: left;
  margin-top: 20px;
}

h3, h4 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.final_inline {
  font-weight: 700;
  color: darkred;
}

.equip_inline {
  font-weight: 700;
  color: darkblue;
}

.title_img {
  width: 100%;
}

.hits {
  float: right;
}

.maker {
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  border-top: solid 1px;
  font-weight: 700;
  font-size: 13px;
  text-align: right;
  margin-top: 30px;
}

/* Move Speed Calculator Styles */
.move-speed-table {
  margin-top: 20px;
}

.move-speed-table td:first-child {
  width: 50%;
  text-align: left;
  padding-left: 15px;
  font-weight: bold;
}

.slider-cell {
    display: flex;
    align-items: center;
    gap: 10px;
}

.slider-cell input[type="range"] {
    flex-grow: 1;
}

.slider-cell .slider-input {
    width: 60px;
}

.full-width-input {
    width: 100%;
}

.move-speed-results {
  margin-top: 30px;
  padding: 20px;
  border: 2px solid #2c3e50;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.move-speed-results h3 {
  margin-top: 0;
  text-align: center;
}

.move-speed-results .result-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 18px;
}

.move-speed-results .result-item .label {
  font-weight: bold;
}

.move-speed-results .result-item .value {
  color: darkblue;
  font-weight: bold;
}

.move-speed-results .result-item.result-note {
  justify-content: flex-start;
  padding: 4px 0;
  font-size: 15px;
  color: #555;
}

.requirement-table-container {
    margin-top: 30px;
}
.requirement-table-container td.met {
    color: green;
    font-weight: bold;
}


@media (min-width: 600px) {
  body {
    width: 600px;
  }

  .black-bg {
    box-sizing: border-box;
    width: 600px;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    padding: 20px;
  }

  .white-bg {
    width: calc(600px - 40px - 40px);
    position: absolute;
    top: 30%;
    background: white;
    border-radius: 8px;
    padding: 20px;
  }
}

/* Kills Calculator Styles */
.kills-calculator-container {
  margin-top: 20px;
}

.kills-calculator-container table {
  width: 100%;
}

.kills-calculator-container table input {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
}

.kills-calculator-container table th,
.kills-calculator-container table td {
  padding: 5px;
}

.kills-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  gap: 10px; /* Add gap between buttons */
}

.kills-buttons button {
  flex-grow: 1; /* Allow buttons to grow and fill space */
  max-width: none; /* Remove max-width constraint for these buttons */
}

.kills-calculator-container table input.kpm-display-input {
  background-color: #f0f0f0; /* Light grey background */
  color: #555; /* Slightly darker text color */
  font-weight: bold;
}

/* Rune Drop Info Styles */
.rune-container {
  margin-top: 20px;
}

.rune-floor-finder {
  padding: 15px;
  border: 2px solid #2c3e50;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.rune-finder-label {
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
}

.rune-floor-result {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}

.rune-floor-result .floor-chip {
  padding: 5px 12px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 13px;
  font-weight: bold;
}

.rune-floor-empty {
  color: #888;
  font-size: 13px;
}

.rune-note {
  font-size: 13px;
  color: #666;
  margin: 0 0 10px;
  text-align: left;
}

.rune-block {
  margin-bottom: 20px;
}

.rune-block h4 {
  text-align: left;
  margin-bottom: 6px;
}

/* border-collapse 때문에 sticky 셀의 border가 사라져 box-shadow로 대체한다 */
.rune-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.rune-matrix, .rune-option-table {
  table-layout: auto;
  width: max-content;
  min-width: 100%;
  font-size: 12px;
  white-space: nowrap;
}

.rune-matrix th, .rune-matrix td,
.rune-option-table th, .rune-option-table td {
  padding: 6px 5px;
}

.rune-matrix thead th, .rune-option-table thead th {
  font-weight: normal;
  line-height: 1.3;
}

.rune-matrix td, .rune-option-table td {
  font-weight: bold;
}

.rune-row-label {
  position: sticky;
  left: 0;
  z-index: 1;
  background: lightgrey;
  font-weight: bold;
  text-align: left;
  box-shadow: 1px 0 0 #2c3e50;
}

.rune-matrix td.rune-empty {
  background-color: #eeeeee;
  color: #aaaaaa;
  font-weight: normal;
}

.rune-matrix td.rune-active {
  outline: 3px solid #d40000;
  outline-offset: -3px;
}

.rune-group-list {
  margin-top: 12px;
  text-align: left;
}

.rune-group-item {
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
}

.rune-group-head {
  font-weight: bold;
  font-size: 14px;
}

.rune-group-badge {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 8px;
  border-radius: 50%;
  background-color: #2c3e50;
  color: white;
  text-align: center;
  font-size: 12px;
}

.rune-group-options {
  font-size: 13px;
  color: #555;
  margin-top: 3px;
  padding-left: 28px;
}

.rune-skill-table th {
  width: 90px;
  font-size: 13px;
}

.rune-skill-table td {
  text-align: left;
  font-size: 13px;
  line-height: 1.6;
}

.rune-guide li {
  margin-bottom: 5px;
}
</style>
