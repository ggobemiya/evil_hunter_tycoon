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
    <button :class="{ active: activeTab === 'dogam' }" @click="activeTab = 'dogam'">도감 / 확률</button>
    <button :class="{ active: activeTab === 'pet' }" @click="activeTab = 'pet'">펫 장비</button>
    <button :class="{ active: activeTab === 'formation' }" @click="activeTab = 'formation'">승전 진형 편집기</button>
    <button :class="{ active: activeTab === 'league' }" @click="activeTab = 'league'">챌린저스 리그</button>
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

  <!-- Collection / Box Probability -->
  <div v-show="activeTab === 'dogam'">
    <div class="dogam-container">
      <h3>상자 우선순위</h3>
      <p class="rune-note">아직 안 뽑은 아이템의 확률을 모두 더한 값입니다. 이 값이 클수록 한 번 열었을 때 새 아이템이 나올 가능성이 높습니다.</p>
      <table class="dogam-priority">
        <thead>
        <tr>
          <th>상자</th>
          <th>남은 종류</th>
          <th>남은 확률</th>
          <th>신규 1개당 기대 횟수</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="b in boxStats" :key="b.id" :class="{ 'best-box': b.id === bestBoxId }">
          <td class="box-name">
            {{ b.label }}
            <span v-if="b.id === bestBoxId" class="best-badge">추천</span>
          </td>
          <td>{{ b.remainCount }} / {{ b.total }}종</td>
          <td class="remain-rate">{{ b.remainRate }}%</td>
          <td>{{ b.expected === null ? '완료' : b.expected + '회' }}</td>
        </tr>
        </tbody>
      </table>

      <div class="dogam-sections">
        <button v-for="s in dogamSectionList" :key="s.id"
                :class="{ active: dogamSection === s.id }"
                @click="dogamSection = s.id">{{ s.label }}</button>
      </div>

      <div class="dogam-tools">
        <label class="dogam-filter">
          <input type="checkbox" v-model="dogamHideOwned"> 미보유만 보기
        </label>
        <span class="dogam-tool-buttons">
          <button @click="setSectionOwned(true)">전체 체크</button>
          <button @click="setSectionOwned(false)">전체 해제</button>
        </span>
      </div>

      <!-- 도감세트 -->
      <table v-if="dogamSection === 'sets'" class="dogam-table dogam-set-table">
        <thead>
        <tr>
          <th>분류</th>
          <th>아이템명</th>
          <th>출처</th>
          <th>확률</th>
          <th>보유</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="g in visibleSetGroups" :key="g.no">
          <tr class="set-head">
            <td colspan="5">
              {{ g.no }}. {{ g.set }}
              <span class="set-progress" :class="{ done: g.ownedCount === g.total }">{{ g.ownedCount }}/{{ g.total }}</span>
            </td>
          </tr>
          <tr v-for="(it, i) in g.items" :key="i" :class="{ owned: isOwned(it.key) }">
            <td>{{ it.cat }}</td>
            <td class="item-name">{{ it.name }}</td>
            <td :class="{ 'src-box': isBoxSource(it.src) }">{{ it.src || '-' }}</td>
            <td>{{ it.rate === null ? '-' : it.rate + '%' }}</td>
            <td><input type="checkbox" :checked="isOwned(it.key)" @change="toggleOwned(it.key)"></td>
          </tr>
        </template>
        <tr v-if="!visibleSetGroups.length">
          <td colspan="5" class="dogam-empty">표시할 항목이 없습니다.</td>
        </tr>
        </tbody>
      </table>

      <!-- 촌장의 비밀상자 -->
      <table v-else-if="dogamSection === '촌비'" class="dogam-table dogam-chonbi-table">
        <thead>
        <tr>
          <th>분류</th>
          <th>아이템명</th>
          <th>확률</th>
          <th>보유</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(it, i) in visibleChonbiItems" :key="i" :class="{ owned: it.key && isOwned(it.key) }">
          <td>{{ it.cat }}</td>
          <td class="item-name">{{ it.name }}</td>
          <td>{{ it.rate }}%</td>
          <td>
            <input v-if="it.key" type="checkbox" :checked="isOwned(it.key)" @change="toggleOwned(it.key)">
            <span v-else class="not-collectible">비수집</span>
          </td>
        </tr>
        <tr v-if="!visibleChonbiItems.length">
          <td colspan="4" class="dogam-empty">표시할 항목이 없습니다.</td>
        </tr>
        </tbody>
      </table>

      <!-- 반짝반짝 코스튬 상자 A / B -->
      <table v-else class="dogam-table dogam-box-table">
        <thead>
        <tr>
          <th>분류</th>
          <th>아이템명</th>
          <th>도감효과</th>
          <th>확률</th>
          <th>보유</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(it, i) in visibleBoxItems" :key="i" :class="{ owned: isOwned(it.key) }">
          <td>{{ it.cat }}</td>
          <td class="item-name">{{ it.name }}</td>
          <td class="item-eff">{{ it.eff || '-' }}</td>
          <td>{{ it.rate }}%</td>
          <td><input type="checkbox" :checked="isOwned(it.key)" @change="toggleOwned(it.key)"></td>
        </tr>
        <tr v-if="!visibleBoxItems.length">
          <td colspan="5" class="dogam-empty">표시할 항목이 없습니다.</td>
        </tr>
        </tbody>
      </table>

      <ol class="dogam-guide">
        <h3>⭐ 사용 가이드</h3>
        <li>체크한 내용은 브라우저에 저장되어 다시 방문해도 그대로 남습니다.</li>
        <li>반짝A, 반짝B, 촌장의 비밀상자에서 체크하면 <b>도감세트에도 자동으로 반영</b>됩니다. 반대로 도감세트에서 체크해도 상자 쪽에 반영됩니다.</li>
        <li><b>상자 우선순위</b>의 남은 확률이 가장 높은 상자를 여는 것이 새 아이템을 얻기에 가장 유리합니다.</li>
        <li>촌장의 비밀상자는 코스튬류만 도감에 등록되므로, 재화 같은 비수집 항목은 계산에서 빠집니다.</li>
        <li>도감세트에서 앞뜰, 보석, 어금니처럼 상자가 아닌 출처의 항목은 직접 체크하시면 됩니다.</li>
        <li>처음 쓰실 때는 <b>전체 체크</b>로 채운 뒤 아직 없는 것만 해제하시는 편이 빠릅니다.</li>
      </ol>
    </div>
  </div>

  <!-- Riding Pet Equipment -->
  <div v-show="activeTab === 'pet'">
    <div class="pet-container">
      <h3>라이딩펫 장비 설명서</h3>
      <p class="rune-note">적용 스킬 설명과 적용 직업을 한 칸에 합쳐서 보여줍니다.</p>

      <div v-for="set in petEquipSets" :key="set.name" class="pet-set">
        <div class="pet-set-head" :style="petColor(set, 78)">{{ set.name }}</div>
        <div v-for="item in set.items" :key="item.part" class="pet-item">
          <div class="pet-item-head">
            <span class="pet-part" :style="petColor(set, 88)">{{ item.part }}</span>
            <span class="pet-option">{{ item.option }}</span>
          </div>
          <div v-if="item.note" class="pet-detail">
            <p class="pet-note">{{ item.note }}</p>
            <div class="pet-chips">
              <span v-for="j in item.jobs" :key="j.job + j.skill" class="pet-job">
                <b>{{ j.job }}</b> · {{ j.skill }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ol class="pet-guide">
        <h3>⭐ 참고</h3>
        <li>세트당 <b>편자 · 안장 · 고삐</b> 세 부위로 구성됩니다.</li>
        <li>적용 대상이 정해진 옵션만 아래에 설명과 직업이 함께 표시됩니다.</li>
        <li>파란 칩은 <b>직업 · 해당 스킬</b>을 뜻합니다.</li>
      </ol>
    </div>
  </div>

  <!-- Formation Editor -->
  <div v-show="activeTab === 'formation'">
    <div class="formation-container">
      <div class="formation-form">
        <input v-model.trim="newUnit.name" type="text" maxlength="12" placeholder="캐릭터 이름" @keyup.enter="addUnit">
        <input v-model.trim="newUnit.job" type="text" list="formation-job-list" placeholder="직업" @keyup.enter="addUnit">
        <datalist id="formation-job-list">
          <option v-for="job in jobOptions" :key="job" :value="job"></option>
        </datalist>
        <select v-model="newUnit.side">
          <option value="mine">우리</option>
          <option value="enemy">상대</option>
        </select>
        <button @click="addUnit">추가</button>
        <label class="formation-reset-job">
          <input type="checkbox" v-model="resetJobOnAdd"> 추가 후 직업 초기화
        </label>
      </div>
      <p v-if="formationMessage" class="formation-message">{{ formationMessage }}</p>

      <div v-for="side in boardOrder" :key="side" class="formation-side">
        <div class="formation-side-head">
          <span class="formation-side-name" :class="side">{{ side === 'mine' ? '우리 진형' : '상대 진형' }}</span>
          <span class="formation-count">{{ unitCount(side) }} / {{ maxUnits }}</span>
          <button class="formation-clear" @click="clearSide(side)">비우기</button>
        </div>
        <div class="formation-board" :ref="el => setBoardRef(side, el)" :style="boardStyle">
          <div v-for="tile in tilesOf(side)" :key="tile.i"
               class="ftile" :class="{ occupied: !!tile.unit }" :style="tileStyle(tile)">
            <div class="ftile-bg"></div>
            <span v-if="!tile.unit" class="ftile-num">{{ tile.num }}</span>
            <div v-else class="funit" :class="{ dragging: isDragging(side, tile.i) }"
                 @pointerdown="startDrag(side, tile, $event)">
              <span class="funit-name">{{ tile.unit.name }}</span>
              <span class="funit-job" :style="{ color: jobColor(tile.unit.job) }">{{ tile.unit.job }}</span>
              <button class="funit-del" @pointerdown.stop @click.stop="removeUnit(side, tile.i)">×</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="drag" class="funit drag-ghost" :style="ghostStyle">
        <span class="funit-name">{{ drag.unit.name }}</span>
        <span class="funit-job" :style="{ color: jobColor(drag.unit.job) }">{{ drag.unit.job }}</span>
      </div>

      <ol class="formation-guide">
        <h3>⭐ 사용 가이드</h3>
        <li>이름과 직업을 입력하고 <b>우리 / 상대</b>를 고른 뒤 추가하면 빈 칸부터 채워집니다.</li>
        <li>이름을 비워두면 <b>아군1, 아군2</b> 또는 <b>적1, 적2</b> 순으로 자동으로 붙습니다.</li>
        <li>한 진영에 배치할 수 있는 인원은 <b>최대 {{ maxUnits }}명</b>입니다. 칸은 16개지만 10명까지만 들어갑니다.</li>
        <li><b>추가 후 직업 초기화</b>를 끄면 같은 직업을 연달아 추가할 때 직업이 그대로 남습니다.</li>
        <li>배치된 캐릭터를 <b>끌어서</b> 다른 칸으로 옮길 수 있습니다. 마우스와 터치 모두 됩니다.</li>
        <li>이미 다른 캐릭터가 있는 칸에 놓으면 <b>서로 자리를 바꿉니다.</b></li>
        <li>우리 진형과 상대 진형 사이로도 끌어서 옮길 수 있습니다.</li>
        <li>칸 번호는 게임과 동일합니다. 양쪽 <b>1번이 서로 맞닿는</b> 최전방입니다.</li>
        <li>배치한 내용은 브라우저에 저장되어 다시 방문해도 남습니다.</li>
      </ol>
    </div>
  </div>

  <!-- Challengers League -->
  <div v-show="activeTab === 'league'">
    <div class="league-container">
      <h3>티어별 명예점수 보상표</h3>

      <div class="league-finder">
        <span class="league-finder-label">내 레이팅</span>
        <input type="number" min="0" v-model.number="myRating" placeholder="예) 2450">
        <div v-if="myTier" class="league-result">
          <span class="league-result-tier" :style="{ backgroundColor: leagueColor(myTier.group) }">{{ myTier.tier }}</span>
          <span class="league-result-honor">명예 점수 {{ myTier.honor }}</span>
        </div>
        <div v-else class="league-result league-result-empty">
          {{ myRating ? '브론즈4 미만이라 보상 구간에 들지 않습니다.' : '레이팅을 입력하면 해당 티어를 짚어줍니다.' }}
        </div>
      </div>

      <table class="league-table">
        <thead>
        <tr>
          <th>티어</th>
          <th>레이팅(이상)</th>
          <th>명예 점수</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in challengerTiers" :key="row.tier"
            :class="{ 'league-current': myTier && myTier.tier === row.tier }"
            :style="{ backgroundColor: leagueColor(row.group) }">
          <td class="league-tier">{{ row.tier }}</td>
          <td>{{ row.rating }}</td>
          <td class="league-honor">{{ row.honor }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="maker">
    <div v-for="(credit, i) in currentCredits" :key="i">{{ credit.role }}) {{ credit.name }}</div>
  </div>
</template>

<script>
import { dogamSets, boxAItems, boxBItems, chonbiItems, boxes } from './dogamData';
import { petEquipSets } from './petEquipData';
import { challengerTiers, challengerGroups } from './challengerData';

const BOX_SOURCES = ['반짝A', '반짝B', '촌비'];

// 진형 판은 4x4 격자를 45도 돌린 다이아몬드다.
const TILE_W = 84;
const TILE_H = 60;
// 칸은 16개지만 한 진영에 배치할 수 있는 인원은 10명이다.
const MAX_UNITS = 10;
// 게임 화면에서 확인한 직업별 색
const JOB_COLORS = {
  '오포지터': '#5fd0e8',
  '스타슈터': '#7ee07e',
  '배틀커맨더': '#ff8fd0',
  '데스브링어': '#b98cff',
  '하이프리스트': '#ffe9a8',
  '마나로드': '#66d9c8',
};

export default {
  name: 'App',
    data() {
      return {
              // Common
              activeTab: 'attack', // Set 'attack' as the default active tab
              isOpened: false,
              // 탭마다 제작자 표기가 다르다
              tabCredits: {
                attack: [
                  { role: '제작', name: 'Andante An가자미' },
                  { role: '수정', name: 'Bell 꼬벨' },
                ],
                move: [{ role: '제작', name: 'Bell 꼬벨' }],
                kills: [{ role: '제작', name: 'Bell 꼬벨' }],
                rune: [{ role: '제작', name: 'Stella 꼬뱀별' }],
                dogam: [{ role: '제작', name: 'Stella 꼬뱀별' }],
                pet: [{ role: '제작', name: 'Stella 꼬뱀별' }],
                formation: [{ role: '제작', name: 'Stella 꼬뱀별' }],
                league: [{ role: '제작', name: 'Stella 꼬뱀별' }],
              },
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

        // Collection / Box Probability
        dogamOwned: {},
        dogamSection: 'sets',
        dogamHideOwned: false,
        dogamLocalStorageKey: 'dogamOwnedItems',
        dogamSectionList: [
          { id: 'sets', label: '도감세트' },
          { id: '반짝A', label: '반짝A' },
          { id: '반짝B', label: '반짝B' },
          { id: '촌비', label: '촌장의 비밀상자' },
        ],

        // Riding Pet Equipment
        petEquipSets,

        // Challengers League
        challengerTiers,
        myRating: null,

        // Formation Editor
        formation: { mine: new Array(16).fill(null), enemy: new Array(16).fill(null) },
        newUnit: { name: '', job: '', side: 'mine' },
        formationMessage: '',
        drag: null,
        boardRefs: {},
        boardOrder: ['enemy', 'mine'],
        formationLocalStorageKey: 'formationLayout',
        resetJobOnAdd: true,
        maxUnits: MAX_UNITS,
        jobOptions: [
          '배틀커맨더', '소드엠페러', '오포지터', '마나로드', '하이프리스트',
          '홀리나이트', '스타슈터', '데드아이', '오버로드', '데스브링어',
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
    // 상자별 미보유 종류 수와 확률 합계 — 값이 클수록 새 아이템이 나올 가능성이 높다
    boxStats() {
      return boxes.map(box => {
        const remain = box.items.filter(item => !this.dogamOwned[item.key]);
        const remainRate = remain.reduce((sum, item) => sum + (item.rate || 0), 0);
        return {
          id: box.id,
          label: box.label,
          total: box.items.length,
          remainCount: remain.length,
          remainRate: Math.round(remainRate * 1000) / 1000,
          expected: remainRate > 0 ? Math.ceil(100 / remainRate) : null,
        };
      });
    },
    bestBoxId() {
      const best = this.boxStats.reduce(
        (acc, b) => (b.remainRate > acc.remainRate ? b : acc),
        { remainRate: 0, id: null }
      );
      return best.remainRate > 0 ? best.id : null;
    },
    visibleSetGroups() {
      const groups = [];
      let current = null;
      dogamSets.forEach(item => {
        if (!current || current.no !== item.no) {
          current = { no: item.no, set: item.set, items: [], ownedCount: 0, total: 0 };
          groups.push(current);
        }
        current.total += 1;
        if (this.dogamOwned[item.key]) current.ownedCount += 1;
        if (!this.dogamHideOwned || !this.dogamOwned[item.key]) current.items.push(item);
      });
      return groups.filter(g => g.items.length > 0);
    },
    visibleBoxItems() {
      const items = this.dogamSection === '반짝A' ? boxAItems : boxBItems;
      return this.dogamHideOwned ? items.filter(i => !this.dogamOwned[i.key]) : items;
    },
    visibleChonbiItems() {
      if (!this.dogamHideOwned) return chonbiItems;
      return chonbiItems.filter(i => !i.key || !this.dogamOwned[i.key]);
    },
    currentCredits() {
      return this.tabCredits[this.activeTab] || [];
    },
    // 표가 높은 티어부터 정렬되어 있어 조건을 만족하는 첫 행이 곧 내 티어다
    myTier() {
      const rating = Number(this.myRating);
      if (!rating) return null;
      return challengerTiers.find(row => rating >= row.rating) || null;
    },
    boardStyle() {
      return { width: TILE_W * 4 + 'px', height: TILE_H * 4 + 'px' };
    },
    ghostStyle() {
      return { left: this.drag.x + 'px', top: this.drag.y + 'px', width: TILE_W - 6 + 'px' };
    },
  },
  mounted() {
    this.loadKillsRecords();
    this.loadDogamOwned();
    this.loadFormation();
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
    // Challengers League Methods
    leagueColor(group) {
      return challengerGroups[group] || '#ffffff';
    },

    // Formation Editor Methods
    setBoardRef(side, el) {
      this.boardRefs[side] = el;
    },
    // 격자 좌표 (r, c) 를 다이아몬드 화면 좌표로 옮긴다
    tilesOf(side) {
      const slots = this.formation[side];
      const tiles = [];
      for (let i = 0; i < 16; i++) {
        const r = Math.floor(i / 4);
        const c = i % 4;
        tiles.push({
          i, r, c,
          // 우리 진형은 앞쪽이 1번, 상대 진형은 뒤쪽이 16번이라 번호가 반대로 매겨진다
          num: side === 'mine' ? i + 1 : 16 - i,
          x: (c - r) * (TILE_W / 2) + TILE_W * 1.5,
          y: (c + r) * (TILE_H / 2),
          unit: slots[i],
        });
      }
      return tiles;
    },
    tileStyle(tile) {
      return {
        left: tile.x + 'px',
        top: tile.y + 'px',
        width: TILE_W + 'px',
        height: TILE_H + 'px',
      };
    },
    jobColor(job) {
      if (JOB_COLORS[job]) return JOB_COLORS[job];
      let hash = 0;
      for (let i = 0; i < job.length; i++) {
        hash = (hash * 31 + job.charCodeAt(i)) % 360;
      }
      return `hsl(${hash}, 70%, 68%)`;
    },
    unitCount(side) {
      return this.formation[side].filter(Boolean).length;
    },
    sideLabel(side) {
      return side === 'mine' ? '우리' : '상대';
    },
    // 이름을 비워두면 아군1, 적1 처럼 자동으로 붙인다. 삭제 후에도 겹치지 않게 빈 번호를 찾는다.
    autoName(side) {
      const prefix = side === 'mine' ? '아군' : '적';
      const used = new Set(this.formation[side].filter(Boolean).map(u => u.name));
      let n = 1;
      while (used.has(prefix + n)) n += 1;
      return prefix + n;
    },
    addUnit() {
      const side = this.newUnit.side;
      const job = this.newUnit.job;
      const name = this.newUnit.name || this.autoName(side);
      if (!this.newUnit.name && !job) {
        this.formationMessage = '이름이나 직업 중 하나는 입력해주세요.';
        return;
      }
      if (this.unitCount(side) >= MAX_UNITS) {
        this.formationMessage = this.sideLabel(side) + ' 진형은 최대 ' + MAX_UNITS + '명까지 배치할 수 있습니다.';
        return;
      }
      const empty = this.formation[side].indexOf(null);
      if (empty === -1) {
        this.formationMessage = this.sideLabel(side) + ' 진형에 빈 칸이 없습니다.';
        return;
      }
      this.formation[side][empty] = { name, job: job || '미지정' };
      this.newUnit.name = '';
      if (this.resetJobOnAdd) this.newUnit.job = '';
      this.formationMessage = '';
      this.saveFormation();
    },
    removeUnit(side, index) {
      this.formation[side][index] = null;
      this.saveFormation();
    },
    clearSide(side) {
      this.formation[side] = new Array(16).fill(null);
      this.saveFormation();
    },
    isDragging(side, index) {
      return !!this.drag && this.drag.side === side && this.drag.index === index;
    },
    startDrag(side, tile, event) {
      if (!tile.unit) return;
      event.preventDefault();
      this.drag = { side, index: tile.i, unit: tile.unit, x: event.clientX, y: event.clientY };
      window.addEventListener('pointermove', this.onDragMove);
      window.addEventListener('pointerup', this.onDragEnd);
      window.addEventListener('pointercancel', this.onDragEnd);
    },
    onDragMove(event) {
      if (!this.drag) return;
      this.drag.x = event.clientX;
      this.drag.y = event.clientY;
    },
    onDragEnd(event) {
      window.removeEventListener('pointermove', this.onDragMove);
      window.removeEventListener('pointerup', this.onDragEnd);
      window.removeEventListener('pointercancel', this.onDragEnd);
      if (!this.drag) return;
      const target = this.hitTest(event.clientX, event.clientY);
      if (target) this.moveUnit(this.drag.side, this.drag.index, target.side, target.index);
      this.drag = null;
    },
    // 화면 좌표를 격자 좌표로 되돌려 어느 칸에 놓였는지 찾는다
    hitTest(clientX, clientY) {
      for (const side of this.boardOrder) {
        const el = this.boardRefs[side];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (clientX < rect.left || clientX > rect.right) continue;
        if (clientY < rect.top || clientY > rect.bottom) continue;
        const px = clientX - rect.left - TILE_W * 2;
        const py = clientY - rect.top - TILE_H / 2;
        const a = px / (TILE_W / 2);
        const b = py / (TILE_H / 2);
        const c = Math.round((a + b) / 2);
        const r = Math.round((b - a) / 2);
        if (r < 0 || r > 3 || c < 0 || c > 3) return null;
        return { side, index: r * 4 + c };
      }
      return null;
    },
    moveUnit(fromSide, fromIndex, toSide, toIndex) {
      if (fromSide === toSide && fromIndex === toIndex) return;
      const moving = this.formation[fromSide][fromIndex];
      const displaced = this.formation[toSide][toIndex];
      // 빈 칸으로 진영을 넘어가면 인원이 늘어나므로 상한을 확인한다
      if (fromSide !== toSide && !displaced && this.unitCount(toSide) >= MAX_UNITS) {
        this.formationMessage = this.sideLabel(toSide) + ' 진형은 최대 ' + MAX_UNITS + '명까지 배치할 수 있습니다.';
        return;
      }
      this.formationMessage = '';
      this.formation[toSide][toIndex] = moving;
      this.formation[fromSide][fromIndex] = displaced;
      this.saveFormation();
    },
    saveFormation() {
      localStorage.setItem(this.formationLocalStorageKey, JSON.stringify(this.formation));
    },
    loadFormation() {
      const saved = localStorage.getItem(this.formationLocalStorageKey);
      if (!saved) return;
      try {
        const parsed = JSON.parse(saved);
        ['mine', 'enemy'].forEach(side => {
          const slots = new Array(16).fill(null);
          if (parsed && Array.isArray(parsed[side])) {
            parsed[side].slice(0, 16).forEach((unit, i) => {
              if (unit && unit.name) slots[i] = { name: unit.name, job: unit.job || '미지정' };
            });
          }
          this.formation[side] = slots;
        });
      } catch (e) {
        this.formation = { mine: new Array(16).fill(null), enemy: new Array(16).fill(null) };
      }
    },

    // Riding Pet Equipment Methods
    petColor(set, lightness) {
      return { backgroundColor: `hsl(${set.hue}, 75%, ${lightness}%)` };
    },

    // Collection / Box Probability Methods
    isOwned(key) {
      return !!this.dogamOwned[key];
    },
    isBoxSource(src) {
      return BOX_SOURCES.indexOf(src) !== -1;
    },
    toggleOwned(key) {
      if (this.dogamOwned[key]) {
        delete this.dogamOwned[key];
      } else {
        this.dogamOwned[key] = true;
      }
      this.saveDogamOwned();
    },
    // 현재 보고 있는 섹션의 항목 전체를 한 번에 체크/해제한다
    setSectionOwned(value) {
      let keys;
      if (this.dogamSection === 'sets') {
        keys = dogamSets.map(i => i.key);
      } else if (this.dogamSection === '촌비') {
        keys = chonbiItems.filter(i => i.key).map(i => i.key);
      } else {
        keys = (this.dogamSection === '반짝A' ? boxAItems : boxBItems).map(i => i.key);
      }
      keys.forEach(key => {
        if (value) {
          this.dogamOwned[key] = true;
        } else {
          delete this.dogamOwned[key];
        }
      });
      this.saveDogamOwned();
    },
    saveDogamOwned() {
      localStorage.setItem(this.dogamLocalStorageKey, JSON.stringify(this.dogamOwned));
    },
    loadDogamOwned() {
      const saved = localStorage.getItem(this.dogamLocalStorageKey);
      if (saved) {
        try {
          this.dogamOwned = JSON.parse(saved) || {};
        } catch (e) {
          this.dogamOwned = {};
        }
      }
    },

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

/* Collection / Box Probability Styles */
.dogam-container {
  margin-top: 20px;
}

.dogam-priority {
  font-size: 13px;
}

.dogam-priority .box-name {
  text-align: left;
  font-weight: bold;
}

.dogam-priority .remain-rate {
  font-weight: bold;
  color: darkblue;
}

.dogam-priority tr.best-box {
  background-color: #fff4d6;
}

.dogam-priority tr.best-box .remain-rate {
  color: darkred;
}

.best-badge {
  display: inline-block;
  margin-left: 5px;
  padding: 1px 6px;
  border-radius: 9px;
  background-color: #d40000;
  color: white;
  font-size: 11px;
}

.dogam-sections {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.dogam-sections button {
  flex: 1 1 20%;
  font-size: 13px;
  padding: 8px 5px;
}

.dogam-sections button.active {
  background-color: #2c3e50;
  color: white;
}

.dogam-tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0;
}

.dogam-filter {
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
}

.dogam-filter input {
  width: auto;
  margin-right: 4px;
  vertical-align: middle;
}

.dogam-tool-buttons button {
  font-size: 12px;
  padding: 6px 10px;
  margin-left: 5px;
}

.dogam-table {
  font-size: 12px;
}

.dogam-table th, .dogam-table td {
  padding: 5px 4px;
  word-break: break-word;
}

.dogam-table .item-name {
  text-align: left;
  font-weight: bold;
}

.dogam-table .item-eff {
  font-size: 11px;
  color: #555;
}

.dogam-table input[type="checkbox"] {
  width: 18px;
  height: 18px;
}

.dogam-table tr.owned {
  background-color: #f2f7f2;
  color: #999;
}

.dogam-table tr.owned .item-name {
  font-weight: normal;
}

.dogam-table .src-box {
  color: darkblue;
  font-weight: bold;
}

.dogam-table .not-collectible {
  font-size: 11px;
  color: #aaa;
}

.dogam-table .dogam-empty {
  padding: 20px;
  color: #888;
}

.dogam-set-table .set-head td {
  background-color: #e8eaed;
  text-align: left;
  font-weight: bold;
  font-size: 13px;
}

.set-progress {
  float: right;
  font-size: 12px;
  color: #d40000;
}

.set-progress.done {
  color: green;
}

.dogam-set-table th:nth-child(1), .dogam-set-table td:nth-child(1) { width: 16%; }
.dogam-set-table th:nth-child(3), .dogam-set-table td:nth-child(3) { width: 22%; }
.dogam-set-table th:nth-child(4), .dogam-set-table td:nth-child(4) { width: 15%; }
.dogam-set-table th:nth-child(5), .dogam-set-table td:nth-child(5) { width: 13%; }

.dogam-box-table th:nth-child(1), .dogam-box-table td:nth-child(1) { width: 14%; }
.dogam-box-table th:nth-child(3), .dogam-box-table td:nth-child(3) { width: 24%; }
.dogam-box-table th:nth-child(4), .dogam-box-table td:nth-child(4) { width: 13%; }
.dogam-box-table th:nth-child(5), .dogam-box-table td:nth-child(5) { width: 13%; }

.dogam-chonbi-table th:nth-child(1), .dogam-chonbi-table td:nth-child(1) { width: 20%; }
.dogam-chonbi-table th:nth-child(3), .dogam-chonbi-table td:nth-child(3) { width: 15%; }
.dogam-chonbi-table th:nth-child(4), .dogam-chonbi-table td:nth-child(4) { width: 15%; }

.dogam-guide li {
  margin-bottom: 5px;
}

/* Riding Pet Equipment Styles */
.pet-container {
  margin-top: 20px;
}

.pet-set {
  border: 1px solid #2c3e50;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 14px;
}

.pet-set-head {
  padding: 8px 10px;
  font-weight: bold;
  font-size: 15px;
  text-align: left;
  border-bottom: 1px solid #2c3e50;
}

.pet-item {
  border-bottom: 1px solid #dcdcdc;
  padding: 8px 10px;
  text-align: left;
}

.pet-item:last-child {
  border-bottom: none;
}

.pet-item-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.pet-part {
  flex: 0 0 auto;
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 12px;
  font-weight: bold;
}

.pet-option {
  font-size: 13px;
  font-weight: bold;
  line-height: 1.4;
}

.pet-detail {
  margin-top: 8px;
  padding: 8px;
  border-radius: 4px;
  background-color: #f7f7f7;
}

.pet-note {
  margin: 0 0 6px;
  font-size: 12px;
  color: #555;
  line-height: 1.5;
}

.pet-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.pet-job {
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 11px;
  line-height: 1.4;
  background-color: #dbe7f5;
  color: #1c3d63;
}

.pet-guide li {
  margin-bottom: 5px;
}

/* Formation Editor Styles */
.formation-container {
  margin-top: 20px;
}

.formation-form {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
  justify-content: center;
}

.formation-form input[type="text"] {
  flex: 1 1 100px;
  min-width: 0;
  padding: 7px 8px;
  box-sizing: border-box;
}

.formation-form select {
  padding: 7px 4px;
}

.formation-form button {
  padding: 7px 14px;
}

.formation-reset-job {
  flex: 1 1 100%;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
}

.formation-reset-job input {
  width: auto;
  margin-right: 4px;
  vertical-align: middle;
}

.formation-message {
  margin: 8px 0 0;
  font-size: 13px;
  color: darkred;
  font-weight: bold;
}

.formation-side {
  margin-top: 16px;
}

.formation-side-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.formation-side-name {
  font-weight: bold;
  font-size: 15px;
}

.formation-side-name.mine {
  color: #1a6ec4;
}

.formation-side-name.enemy {
  color: #c43a1a;
}

.formation-count {
  flex: 1 1 auto;
  text-align: left;
  font-size: 13px;
  color: #666;
}

.formation-clear {
  font-size: 12px;
  padding: 4px 10px;
}

.formation-board {
  position: relative;
  margin: 0 auto;
  background-color: #0b1712;
  border-radius: 6px;
}

.ftile {
  position: absolute;
}

.ftile-bg {
  position: absolute;
  inset: 0;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  background-color: #3d4f47;
}

.ftile-bg::after {
  content: '';
  position: absolute;
  inset: 2px;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  background-color: #0b1712;
}

.ftile.occupied .ftile-bg {
  background-color: #c3d64b;
}

.ftile-num {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: bold;
  color: #4f635a;
}

.funit {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 78px;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.25;
  cursor: grab;
  touch-action: none;
  user-select: none;
}

.funit.dragging {
  opacity: 0.25;
}

.funit-name {
  max-width: 100%;
  font-size: 10px;
  font-weight: bold;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.funit-job {
  max-width: 100%;
  font-size: 10px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.funit-del {
  position: absolute;
  right: 2px;
  top: -8px;
  width: 17px;
  height: 17px;
  padding: 0;
  border-radius: 50%;
  border: 1px solid #7c1d1d;
  background-color: #d03535;
  color: white;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
}

.drag-ghost {
  position: fixed;
  z-index: 20;
  pointer-events: none;
  padding: 3px 0;
  border-radius: 4px;
  background-color: rgba(11, 23, 18, 0.9);
  outline: 2px solid #c3d64b;
}

.formation-guide li {
  margin-bottom: 5px;
}

/* Challengers League Styles */
.league-container {
  margin-top: 20px;
}

.league-finder {
  padding: 15px;
  margin-bottom: 15px;
  border: 2px solid #2c3e50;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.league-finder-label {
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
}

.league-result {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.league-result-tier {
  padding: 4px 14px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-weight: bold;
  font-size: 14px;
}

.league-result-honor {
  font-weight: bold;
  font-size: 16px;
  color: darkred;
}

.league-result-empty {
  color: #888;
  font-size: 13px;
}

.league-table {
  font-size: 13px;
}

.league-table th {
  padding: 8px 4px;
}

.league-table td {
  padding: 7px 4px;
}

.league-table .league-tier {
  font-weight: bold;
}

.league-table .league-honor {
  font-weight: bold;
  color: #1a3d8f;
}

.league-table tr.league-current {
  outline: 3px solid #d40000;
  outline-offset: -3px;
}
</style>
