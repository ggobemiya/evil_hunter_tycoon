<template>
  <div v-if="isOpened == true" class="black-bg" @click="isOpened=false">
    <div class="white-bg">
      <h4>공속 계산식</h4>
      <p>최종 공속 =
        무기 공속 * (1 - 스탯공속 - 성격공속 - 비법공속 - 연합공속 - 장비공속) / (1 + 퓨리공속증가량 + 퀴큰공속증가량)</p>
      <p>{{ final_speed }} =
        {{ weapon_speed }} * (1 - {{ stat }} - {{ personality }} - {{ secret / 100 }} - {{ union_speed / 100 }} -
        {{ equip_speed / 100 }}) / (1 + {{ fury - 1 }} + {{ quicken - 1 }})</p>
    </div>
  </div>
  <a href="/evil_hunter_tycoon"><img alt="evt_title" class="title_img" src="./assets/eht_title.png"></a>
  <div>
    <a class="hits" href="https://hits.sh/lubiksss.github.io/evil_hunter_tycoon/">
      <img alt="Hits" src="https://hits.sh/lubiksss.github.io/evil_hunter_tycoon.svg?view=today-total"/>
    </a>
    <h2>이블 헌터 타이쿤 공속 계산기</h2>
  </div>
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
      </select>
    </td>
    <td v-show="job===''"></td>
    <td v-show="job===0">
      <select v-model.trim.number="weapon_speed" @change="weapon_speed_cal">
        <option disabled value="">선택</option>
        <!--        <option value="1.7">일격필살</option>-->
        <!--        <option value="1.3">피의 광기</option>-->
        <option value="2">고대,원시</option>
        <option value="2.2">발할라</option>
      </select>
    </td>
    <td v-show="job===1">
      <select v-model.trim.number="weapon_speed" @change="weapon_speed_cal">
        <option disabled value="">선택</option>
        <!--        <option value="1.5">데모닉</option>-->
        <!--        <option value="2.3">대마법사</option>-->
        <option value="2.2">고대,원시</option>
        <option value="2.3">이모탈</option>
      </select>
    </td>
    <td v-show="job===2">
      <select v-model.trim.number="weapon_speed" @change="weapon_speed_cal">
        <option disabled value="">선택</option>
        <!--        <option value="2.1">삼위일체</option>-->
        <!--        <option value="1.5">백발백중</option>-->
        <option value="1.8">고대,원시</option>
        <option value="2">비자야</option>
      </select>
    </td>
    <td v-show="job===3">
      <select v-model.trim.number="weapon_speed" @change="weapon_speed_cal">
        <option disabled value="">선택</option>
        <!--        <option value="2.5">오딘의 망치</option>-->
        <!--        <option value="2">신의 격노</option>-->
        <option value="2.4">고대,원시</option>
        <option value="2.5">묠니르</option>
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
  <div class="maker">
    <span>제작) 벨 연합 가자미벨</span>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
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
      isOpened: false,
      items: ['직업', '무기', '공속스탯', '성격', '비법', '연합공속', '퀴큰', '퓨리']
    };
  }
  ,
  components: {},
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
        this.weapon_speed_cal();
      } else if (job === 1) {
        this.job = 1;
        this.weapon_speed = 2.2;
        this.quicken = 1.5;
        this.fury = 1;
        this.final_speed = 0.25;
        this.weapon_speed_cal();
      } else if (job === 2) {
        this.job = 2;
        this.weapon_speed = 1.8;
        this.quicken = 1.5;
        this.fury = 1;
        this.final_speed = 0.25;
        this.weapon_speed_cal();
      } else if (job === 3) {
        this.job = 3;
        this.weapon_speed = 2.4;
        this.quicken = 1.5;
        this.fury = 1;
        this.final_speed = 0.25;
        this.weapon_speed_cal();
      }
    },
    weapon_speed_cal: function () {
      let equip_speed
          = (1.0 - this.stat - this.personality - this.secret / 100 - this.union_speed / 100
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
          * (1.0 - this.stat - this.personality - this.secret / 100 - this.union_speed / 100 - this.equip_speed / 100)
          / (1.0 + this.fury - 1.0 + this.quicken - 1.0)
      // final_speed = final_speed * 1000 / 1000
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


.target > span, .necessary > span {
  margin-right: 20px;
}

.black-bg {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
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
}

ol {
  text-align: left;
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
