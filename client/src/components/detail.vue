<template>
  <div class="page-container">
    <h3 class="page-header">
      <a href="javascript:history.back();">&lt; 返回</a> &emsp;&emsp;{{name}}-{{year}}年{{month}}月 考勤
      <el-select v-model="type" class="type-select" clearable size="small" placeholder="请选择" @change="query">
        <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </h3>
    <div class="list">
      <el-table :data="attendances" border stripe fit height="el-table">
        <el-table-column fixed label="日期" width="100">
          <template scope="scope">
            {{scope.row.month}}-{{scope.row.date|padLeft(2)}}
          </template>
        </el-table-column>
        <el-table-column label="打卡记录" width="150">
          <template scope="scope">
            <span class="item" v-for="item in scope.row.clocktimes" :key="item.valueOf()">
              {{item.toString()}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="加班">
          <template scope="scope">
            <span class="item" v-for="item in scope.row.overtimes" :key="item.length">
              {{item.toString()}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="请假">
          <template scope="scope">
            <span class="item" v-for="item in scope.row.leaves" :key="item.length">
              {{item.toString()}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="报销">
          <template scope="scope">
            <span class="item" v-for="item in scope.row.reimburses" :key="item.toString()">
              {{item.toString()}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="message">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
// import { calendar } from '../assets/js'
export default {
  name: 'details',
  data() {
    return {
      name: '',
      year: this.$store.state.attendance.year,
      month: this.$store.state.attendance.month,
      allAttendances: [],
      attendances: [],
      types: [
        { label: '全部', value: 0 },
        { label: '加班', value: 1 },
        { label: '请假', value: 2 },
        { label: '报销', value: 3 },
        { label: '打卡异常', value: 4 }],
      type: 0
    }
  },
  methods: {
    init(route) {
      this.name = route.params.name
      let record = this.$store.state.attendance.list.find(item => {
        return item.name === this.name
      })
      this.allAttendances = record ? record.dates : []
      // this.dates = calendar.getDates(this.year, this.month)
      // let holidays = await this.$store.dispatch('getCalender', { start: this.dates[0], end: this.dates[this.dates.length - 1] })
      // holidays.forEach(holiday => {
      //   let date = this.dates.find(d => d.id === holiday.id)
      //   Object.assign(date, holiday)
      // })
    },
    query() {
      switch (this.type) {
        case 1:
          this.attendances = this.allAttendances.filter(item => { return item.overtimes.length })
          break
        case 2:
          this.attendances = this.allAttendances.filter(item => { return item.leaves.length })
          break
        case 3:
          this.attendances = this.allAttendances.filter(item => { return item.reimburses.length })
          break
        case 4:
          this.attendances = this.allAttendances.filter(item => { return item.exception })
          break
        default:
          this.attendances = this.allAttendances
          break
      }
    }
  },
  mounted() {
    this.init(this.$route)
    this.query()
  }
}
</script>

<style lang="scss" scoped>

.page-header {
  line-height: 30px;
}

.type-select {
  float: right;
}
.list{
  height: calc(100% - 70px)
}
.el-table{
  height: 100%;
}
.item {
  display: block;
  margin: 4px 0;
}
</style>

