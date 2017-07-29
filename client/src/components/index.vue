<template>
  <div class="page-container">
    <h3 class="page-header">
      <el-date-picker v-model="date" type="month" placeholder="选择月" format="yyyy-MM" @change="dateChange">
      </el-date-picker>
    </h3>
    <calendar class="calendar" :initDate="date"></calendar>
  </div>
</template>

<script>
import calendar from './common/calendar.vue'
// import { calendar as ca } from '../assets/js'
export default {
  name: 'index',
  data() {
    return {
      date: new Date()
    }
  },
  methods: {
    dateChange(text) {
      console.log(text)
      console.log(this.date)
    }
  },
  components: { calendar }
}
</script>

<style lang="scss" scoped>
.page-header{
  text-align: left;
}
.calendar{
  height: calc(100% - 80px)
}
</style>


