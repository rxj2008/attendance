<template>
  <div class="page-container">
    <h3 class="page-header fl">
      {{year}}年{{month}}月 打卡记录表
    </h3>
    <el-button class="fr" v-on:click="createExcel">生成Excel表</el-button>
    <div class="list">
      <el-table :data="attendances" border stripe height="el-table">
        <el-table-column prop="name" fixed label="姓名" width="100">
          <template scope="scope">
            <router-link :to="{name:'detail', params:{name:scope.row.name}}">{{scope.row.name}}</router-link>
          </template>
        </el-table-column>
        <el-table-column :label="date.month+'-'+date.date" v-for="(date,i) in dates" :key="date.date">
          <template scope="scope">
            <span class="item" v-for="(time, idx) in scope.row.dates[i].clocktimes" :key="time.valueOf()">
              <template v-if="idx===0 || idx=== (scope.row.dates[i].clocktimes.length-1)">
              {{time.toString()}}
              </template>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { calendar } from '../assets/js'
import myxlsx from '../assets/js/Myexcel'
export default {
  name: 'list',
  data() {
    return {
      year: this.$store.state.attendance.year,
      month: this.$store.state.attendance.month,
      attendances: this.$store.state.attendance.list,
      dates: []
    }
  },
  methods: {
    async init() {
      this.dates = calendar.getDates(this.year, this.month)
      let holidays = await this.$store.dispatch('getCalender', { start: this.dates[0], end: this.dates[this.dates.length - 1] })
      holidays.forEach(holiday => {
        let date = this.dates.find(d => d.id === holiday.id)
        Object.assign(date, holiday)
      })
    },
    createExcel: function() {
      // myxlsx.createExcelFun();
      myxlsx.createExcelFun()
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.fl{
  float: left
}
.fr{
  float: right
}
.el-button{
  margin-top:15px;
}
.list{
  height: calc(100% - 65px)
}
.el-table{
  height: 100%;
}
.item {
  display: block;
  margin: 4px 0;
}

.el-table .cell a{
  color: #2c3e50;
  text-decoration: none;
}
</style>

