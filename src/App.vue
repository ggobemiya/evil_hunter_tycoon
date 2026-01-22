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
              <option value="10">H</option>
              <option value="20">L</option>
              <option value="30">U</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>건물</td>
          <td>
            <select v-model.number="moveBuffs.building">
              <option value="0">미적용</option>
              <option value="50">적용</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>코스튬 (옷+날개)</td>
          <td>
            <select v-model.number="moveBuffs.costume">
              <option value="0">미적용</option>
              <option value="60">적용</option>
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
          <td>비법</td>
          <td>
            <select v-model.number="moveBuffs.secret">
              <option value="0">미적용</option>
              <option value="15">적용</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>룬</td>
          <td>
            <select v-model.number="moveBuffs.rune">
              <option value="0">미적용</option>
              <option value="12">적용</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>이속신</td>
          <td>
            <select v-model.number="moveBuffs.boots">
              <option value="0">미착용</option>
              <option value="30">질풍신</option>
              <option value="32">진 질풍신</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>개별 이속옵션</td>
          <td>
            <select v-model.number="moveBuffs.individual">
              <option value="0">없음</option>
              <option value="19">일반</option>
              <option value="21">심연</option>
            </select>
          </td>
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
          <td>성격 (달리기가 빠른)</td>
          <td>
            <select v-model.number="moveBuffs.personality">
              <option value="0">미적용</option>
              <option value="10">적용</option>
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
            <span class="label">총 이동속도 증가량:</span>
            <span class="value">{{ totalMoveSpeed }}</span>
        </div>
        <div class="result-item">
            <span class="label">질풍신 공격력 증폭 (최대 30%):</span>
            <span class="value final-amp">{{ zephyrAmp }}%</span>
        </div>
        <div class="result-item">
            <span class="label">진 질풍신 공격력 증폭 (최대 40%):</span>
            <span class="value final-amp">{{ trueZephyrAmp }}%</span>
        </div>
    </div>
     <ol>
      <h3>⭐ ️참고</h3>
      <li>각 항목별 이동속도 증가 효과를 선택하세요.</li>
       <li>'총 이동속도 증가량'은 선택한 모든 효과의 합입니다.</li>
      <li>'질풍신 공격력 증폭'은 총 이동속도 증가량을 기반으로 계산되며, 최대 30%를 넘을 수 없습니다.</li>
      <li>'진 질풍신 공격력 증폭'은 총 이동속도 증가량을 기반으로 계산되며, 최대 40%를 넘을 수 없습니다.</li>
    </ol>
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
      activeTab: 'attack',
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
        costume: 0,
        seal: 0,
        riding: 0,
        secret: 0,
        rune: 0,
        boots: 0,
        individual: 0,
        horseshoe: 0,
        personality: 0,
        frozenSoul: 0,
        greatDemon: 0,
      }
    };
  },
  computed: {
    totalMoveSpeed() {
      return Object.values(this.moveBuffs).reduce((sum, value) => sum + value, 0);
    },
    zephyrAmp() {
      return Math.min(this.totalMoveSpeed, 30);
    },
    trueZephyrAmp() {
      return Math.min(this.totalMoveSpeed, 40);
    }
  },
  methods: {
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

h3 {
  margin-bottom: 5px;
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
  width: 60%;
  text-align: left;
  padding-left: 15px;
  font-weight: bold;
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

.move-speed-results .result-item .final-amp {
  color: darkred;
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
</style>
