import util from '../util'
const {
  Time
} = util
export const config = {
  // 早上上班时间
  startTime: {
    earliest: new Time(8, 30),
    latest: new Time(9, 30)
  },
  // 晚上下班时间
  endTime: {
    earliest: new Time(18, 0),
    latest: new Time(19, 0)
  },
  workingTime: 8 * 60,
  // 午休
  lunchBreak: {
    start: new Time(12, 0),
    end: new Time(13, 30),
    time: 90
  },
  flexTime: 60,
  // 加班
  overtime: {
    // 最少加班时长 ，单位分钟
    min: 60,
    // 最小加班时长 ，单位分钟
    step: 30,
    // 是否计算工作日加班
    includeWorkday: true
  },
  // 加班
  leave: {
    // 最少加班时长 ，单位分钟
    min: 60,
    // 最小加班时长 ，单位分钟
    step: 60,
    // 是否计算工作日加班
    includeWorkday: true
  }
}
