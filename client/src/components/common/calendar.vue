<template>
  <table class="table table-bordered table-fixed table-calendar">
    <thead>
      <tr>
        <th v-for="wn in weekNames" :key="wn.name">
          {{wn.name}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(week,i) in weeks" :key="i">
        <td v-for="item in week" :key="item.date" :class="className(item)" :data-date="item.date" @click="clickDate(item)">
          <slot :date="item"></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { calendar } from '../../assets/js'

export default {
  name: 'calendar',
  props: {
    initDate: {
      type: Date,
      default: function () {
        return new Date()
      }
    }
  },
  data() {
    return {
      year: 0,
      month: 0,
      currDate: null,
      dates: [],
      weekNames: calendar.getWeekName()
    }
  },
  computed: {
    weeks() {
      let weeks = []
      for (var i = 0; i < 6; i++) {
        weeks.push(this.dates.slice(i * 7, (i + 1) * 7))
      }
      return weeks
    }
  },
  methods: {
    dateChange() {
      console.log(Object.prototype.toString.apply(this.initDate))
      console.log(this.initDate)
      let date = calendar.convertDate(this.initDate)
      this.year = date.year
      this.month = date.month
      this.getDates()
    },
    getDates() {
      let options = {
        justify: true
      }
      this.dates = calendar.getDates(this.year, this.month, options)
    },
    className(date) {
      return {
        'date-gap': date.month !== this.month,
        weekend: date.isWeekend,
        holiday: !date.isWeekend && !date.isWorkday,
        workday: date.isWeekend && date.isWorkday,
        current: date === this.currDate
      }
    },
    clickDate() { }
  },
  mounted() {
    this.dateChange()
  },
  watch: {
    initDate(curVal) {
      this.dateChange()
    }
  }
}
</script>
<style lang="scss" scoped>
.table-calendar {
  th {
    height: 34px;
  }
  td {
    position: relative;
    cursor: pointer;
    &::before {
      position: absolute;
      left: 0;
      top: 0;
    }
    &::after {
      position: absolute;
      font-size: 20px;
      font-weight: bold;
      content: attr(data-date);
      top: 0;
      right: 0;
      color: #bbb;
    }
  }
}
.date-gap {
  background: #fafafa;
  opacity: .4;
}
.weekend {
  background: #fafafa;
}

.holiday {
  background: #fff0f0;

  &::before {
    background: #f00;
    color: #fff;
    content: '休'
  }
}

.workday {
  background: #f5f5f5;
  &::before {
    background: #969799;
    color: #fff;
    content: '班'
  }
}

.current {
  background: #ffd;
}
</style>

