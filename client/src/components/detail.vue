<template>
  <div class="page-container">
    <h3 class="page-header">
      <el-button type="primary" icon="arrow-left" @click="back">返回</el-button>
      &emsp;{{name}}-{{year}}年{{month}}月 考勤
      <el-select v-model="type" class="type-select" clearable size="small" placeholder="请选择" @change="query">
        <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </h3>
    <div class="list">
      <el-table :data="attendances" sum-text="合计" :summary-method="getSummaries"
      show-summary border fit height="el-table" :row-style="setRowClass">
        <el-table-column fixed label="日期" width="150">
          <template scope="scope">
            {{scope.row.month}}-{{scope.row.date|padLeft(2)}}
          </template>
        </el-table-column>
        <el-table-column label="打卡记录" width="180">
          <template scope="scope">
            <span class="item" v-for="(time, idx) in scope.row.clocktimes" :key="time.valueOf()">
              <template v-if="idx===0 || idx=== (scope.row.clocktimes.length-1)">
                {{time.toString()}}
              </template>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="加班" v-if="columns.overtime">
          <template scope="scope">
            <span class="item" v-for="item in scope.row.overtimes" :key="item.length">
              {{item.toString()}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="请假" v-if="columns.leave">
          <template scope="scope">
            <span class="item" v-for="item in scope.row.leaves" :key="item.length">
              {{item.toString()}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="报销" v-if="columns.reimburse">
          <template scope="scope">
            <span class="item" v-for="item in scope.row.reimburses" :key="item.toString()">
              {{item.toString()}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="message" v-if="columns.exception">
          <template scope="scope">
            {{scope.row.message}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
// import { calendar } from '../assets/js'
const OVERTIME = 1
const LEAVE = 2
const REIMBURSE = 4
const EXCEPTION = 8
const ALL = 15

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
        { label: '全部', value: ALL },
        { label: '加班', value: OVERTIME },
        { label: '请假', value: LEAVE },
        { label: '报销', value: REIMBURSE },
        { label: '打卡异常', value: EXCEPTION }],
      type: ALL,
      columns: {
        overtime: true,
        leave: true,
        reimburse: true,
        exception: true
      }
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
    back() {
      window.history.back()
    },
    query() {
      this.setColumns(this.type)
      switch (this.type) {
        case OVERTIME:
          this.attendances = this.allAttendances.filter(item => { return item.overtimes.length })
          break
        case LEAVE:
          this.attendances = this.allAttendances.filter(item => { return item.leaves.length })
          break
        case REIMBURSE:
          this.attendances = this.allAttendances.filter(item => { return item.reimburses.length })
          break
        case EXCEPTION:
          this.attendances = this.allAttendances.filter(item => { return item.exception })
          break
        default:
          this.attendances = this.allAttendances
          break
      }
    },
    setColumns(type) {
      type || (type = ALL)
      this.columns.overtime = !!(type & OVERTIME)
      this.columns.leave = !!(type & LEAVE)
      this.columns.reimburse = !!(type & REIMBURSE)
      this.columns.exception = !!(type & EXCEPTION)
    },
    getSummaries(param) {
      const { columns, data } = param
      let summary = { leave: 0, overtime: 0, reimburse: 0 }
      data.forEach(item => {
        item.leaves.forEach(leave => {
          summary.leave += leave.time.totalHours
        })
        item.overtimes.forEach(overtime => {
          summary.overtime += overtime.time.totalHours
        })
        item.reimburses.forEach(reimburse => {
          summary.reimburse += reimburse.money
        })
      })
      return columns.map(col => {
        switch (col.label) {
          case '日期':
            return '合计'
          case '请假':
            return summary.leave
          case '加班':
            return summary.overtime
          case '报销':
            return summary.reimburse
          default:
            return 'N/A'
        }
      })
    },
    setRowClass(data) {
      return data.isWorkday ? '' : 'background:rgba(29, 144, 230, 0.50);'
      // return data.isWorkday ? '' : 'holiday'
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

.list {
  height: calc(100% - 70px)
}

.el-table {
  height: 100%;
}

.item {
  display: block;
  margin: 4px 0;
}

.holiday {
  color:#0ff;
  background: #ff0;
}
</style>

