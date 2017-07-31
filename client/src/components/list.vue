<template>
  <div class="page-container">
    <h3 class="page-header">
      {{year}}年{{month}}月 打卡记录表
    </h3>
    <div class="list">
      <el-table :data="attendances" border stripe height="el-table">
        <el-table-column prop="name" fixed label="姓名" width="100">
          <template scope="scope">
            <router-link :to="{name:'detail', params:{name:scope.row.name}}">{{scope.row.name}}</router-link>
          </template>
        </el-table-column>
        <el-table-column :label="date.month+'-'+date.date" v-for="(date,i) in dates" :key="date.date">
          <template scope="scope">
            <span class="clocktime" v-for="time in scope.row.dates[i].clocktimes" :key="time.valueOf()">
              {{time.toString()}}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { calendar } from '../assets/js'
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
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.list{
  height: calc(100% - 65px)
}
.el-table{
  height: 100%;
}
.clocktime {
  display: block;
  margin: 4px 0;
}
</style>

