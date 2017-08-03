import {
  Time
} from '../index'
const regex = /(\d+):(\d+)/

export default function (record) {
  record.clocktimes = []
  if (!record.originalValue) {
    return record
  }
  let times = record.originalValue.split(/\s+/)
  if (times.length) {
    // 去重
    times = times.filter((time, i) => {
      return !i || time !== times[i - 1]
    })
    record.clocktimes = times.map(t => {
      if (regex.test(t)) {
        return new Time(+RegExp.$1, +RegExp.$2)
      }
    })
  }
  // if (times.length > 2) {
  //   // 取最早和最晚值作为上下班时间
  //   times = [times[0], times.pop()]
  // }
  // record.clocktimes = times.map(t => {
  //   if (regex.test(t)) {
  //     return new Time(+RegExp.$1, +RegExp.$2)
  //   }
  // })
  return record
}
