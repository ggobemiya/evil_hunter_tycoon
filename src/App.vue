<template>
  <a href="/"><img alt="evt_title" src="./assets/eht_title.png"></a>
  <h2>이블 헌터 타이쿤 공속 계산기</h2>
  <table>
    <thead>
    <th v-for="item in items" :key="item">
      {{ item }}
    </th>
    </thead>
    <tbody>
    <td>
      <select v-model.trim.number="job">
        <option disabled value="">선택</option>
        <option value="0">버서커</option>
        <option value="1">소서러</option>
        <option value="2">레인져</option>
        <option value="3">팔라딘</option>
      </select>
    </td>
    <td v-show="job===0">
      <select v-model.trim.number="weapon_speed" @change="cal">
        <option disabled value="">선택</option>
        <option value="1.7">초월한 일격필살</option>
        <option value="1.3">초월한 피의 광기</option>
        <option value="2">초월한 고대의 도끼</option>
        <option value="2">초월한 원시의 대검</option>
      </select>
    </td>
    <td v-show="job===1">
      <select v-model.trim.number="weapon_speed" @change="cal">
        <option disabled value="">선택</option>
        <option value="1.5">초월한 데모닉</option>
        <option value="2.3">초월한 대마법사의 손아귀</option>
        <option value="2.2">초월한 고대의 지팡이</option>
        <option value="2.2">초월한 원시의 지팡이</option>
      </select>
    </td>
    <td v-show="job===2">
      <select v-model.trim.number="weapon_speed" @change="cal">
        <option disabled value="">선택</option>
        <option value="2.1">초월한 삼위일체의 활</option>
        <option value="1.5">초월한 백발백중</option>
        <option value="1.8">초월한 고대의 활</option>
        <option value="1.8">초월한 원시의 활</option>
      </select>
    </td>
    <td v-show="job===3">
      <select v-model.trim.number="weapon_speed" @change="cal">
        <option disabled value="">선택</option>
        <option value="2.5">초월한 오딘의 망치</option>
        <option value="2">초월한 신의 격노</option>
        <option value="2.4">초월한 고대의 망치</option>
        <option value="2.4">초월한 원시의 망치</option>
      </select>
    </td>
    <td>
      <select v-model.trim.number="stat" @change="cal">
        <option disabled value="">선택</option>
        <option value="0">회색</option>
        <option value="0.1">파란색</option>
        <option value="0.2">주황색</option>
        <option value="0.3">보라색</option>
      </select>
    </td>
    <td>
      <select v-model.trim.number="personality" @change="cal">
        <option disabled value="">선택</option>
        <option value="0">효과 없음</option>
        <option value="-0.1">둔한</option>
        <option value="0.07">영웅심리</option>
        <option value="0.1">날쌘돌이</option>
      </select>
    </td>
    <td>
      <input v-model.trim.number="secret" max="10" min="0" placeholder="입력(%)" step="0.1" type="number" @input="cal">
    </td>
    <td>
      <input v-model.trim.number="union_speed" max="5" min="0" placeholder="입력(%)" type="number" @input="cal">
    </td>
    <td>
      <select v-model.trim.number="quicken" @change="cal">
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
      <select v-model.trim.number="fury" @change="cal">
        <option disabled value="">선택</option>
        <option value="1">Lv.0</option>
        <option value="2.38">Lv.1</option>
        <option value="4">Lv.10(버서커)</option>
      </select>
    </td>
    </tbody>
  </table>
  <div class="equip">
    <span>룬, 장비 공속: </span>
    <input v-model.trim.number="equip_speed" max="100" min="0" placeholder="입력(%)" type="number" @input="cal">
  </div>
  <div class="final">
    <span>최종 공속: </span>
    <span>{{ final_speed }}</span>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      job: 0,
      weapon_speed: '',
      stat: 0,
      personality: 0,
      secret: 0,
      union_speed: 0,
      quicken: 1,
      fury: 1,
      equip_speed: 0,
      final_speed: 0,
      items: ['직업', '무기', '공속스탯', '성격', '비법', '연합공속', '퀴큰', '퓨리']
    };
  }
  ,
  components: {},
  methods: {
    cal: function () {
      let final_speed = this.weapon_speed
          * (1.0 - this.stat - this.personality - this.secret / 100 - this.union_speed / 100 - this.equip_speed / 100)
          / (1.0 + this.fury - 1.0 + this.quicken - 1.0)
      final_speed = Math.round(final_speed * 1000) / 1000
      if (final_speed < 0.25) {
        this.final_speed = 0.250
      } else {
        this.final_speed = final_speed
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

img {
  width: 100%;
}

table {
  display: table;
  table-layout: fixed;
  width: 100%;
  text-align: center;
  border: 1px solid #2c3e50;
  border-collapse: collapse;
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

.equip {
  margin: 30px;
}

.final {
  color: darkred;
  font-size: 20px;
  font-weight: 900;
  margin: 30px;
}


.target > span, .necessary > span {
  margin-right: 20px;
}


</style>
