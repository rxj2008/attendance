<template>
  <div class="page-container">
    <h3 class="page-header">
      {{name}}-{{year}}年{{month}}月 考勤
      <el-select v-model="type" class="type-select" clearable size="small" placeholder="请选择">
        <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </h3>
    <div class="list">
      <el-table :data="attendances" border stripe fit>
        <el-table-column fixed label="日期" width="100">
          <template scope="scope">
            {{scope.row.month}}-{{scope.row.date|padLeft(2)}}
          </template>
        </el-table-column>
        <el-table-column label="打卡记录" width="100">
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
        <!-- <el-table-column label="备注" width="100">
                <template scope="scope">
                  <span class="item" v-for="item in scope.row.reimburses" :key="item.valueOf()">
                    {{time.toString()}}
                  </span>
                </template>
              </el-table-column> -->
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
      attendances: [],
      types: [
        { label: '全部', value: 0 },
        { label: '加班', value: 1 },
        { label: '请假', value: 2 },
        { label: '报销', value: 2 }],
      type: 0
    }
  },
  methods: {
    async init(route) {
      this.name = route.params.name
      let record = this.$store.state.attendance.list.find(item => {
        return item.name === this.name
      })
      this.attendances = record ? record.dates : []
      // this.dates = calendar.getDates(this.year, this.month)
      // let holidays = await this.$store.dispatch('getCalender', { start: this.dates[0], end: this.dates[this.dates.length - 1] })
      // holidays.forEach(holiday => {
      //   let date = this.dates.find(d => d.id === holiday.id)
      //   Object.assign(date, holiday)
      // })
    }
  },
  mounted() {
    this.init(this.$route)
  }
}
</script>

<style lang="scss" scoped>
.page-header{
  line-height: 30px;
}
.type-select{
  float: right;
}
.item {
  display: block;
  margin: 4px 0;
}
</style>

