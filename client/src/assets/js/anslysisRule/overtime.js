import {
  config,
  Time,
  LeaveTimeSpan,
  OverTimeSpan
} from '../index'

let startTime
let endTime

// 校对上下班打卡时间
function proofread(date, config) {
  startTime = null
  endTime = null
  if (date.clocktimes.length === 1) {
    date.exception = true
    date.message = '只有一次打卡记录'
  } else if (date.clocktimes.length >= 2) {
    startTime = date.clocktimes[0]
    endTime = date.clocktimes[date.clocktimes.length - 1]
    if (endTime <= config.startTime.earliest) {
      date.exception = true
      date.message = '打卡异常'
      return
    }
    if (startTime >= config.endTime.earliest) {
      date.exception = true
      date.message = '打卡异常'
      return
    }
    if (startTime < config.startTime.earliest) {
      // 如果早上打卡时间早于公司弹性上班最早时间，
      // 打卡时间设置为公司弹性上班最早时间
      startTime = new Time(config.startTime.earliest)
    } else if (startTime < config.lunchBreak.end &&
      startTime >= config.lunchBreak.start
    ) {
      // 如果上班打卡时间是午休时间，打卡时间设置为午休结束时间
      startTime = new Time(config.lunchBreak.end)
    }
    if (endTime <= config.lunchBreak.end &&
      endTime > config.lunchBreak.start
    ) {
      // 如果下班打卡时间是午休时间，打卡时间设置为午休开始时间
      endTime = new Time(config.lunchBreak.start)
    }
  }
}

// 计算工作时长
function computeWorkingTime(date, config) {
  if (!startTime || !endTime) return
  let workingTime = endTime.subtract(startTime)
  if (startTime <= config.lunchBreak.start && endTime >= config.lunchBreak.end) {
    workingTime = workingTime.subtract(config.lunchBreak.time)
  }
  date.workingTime = workingTime
}

// 一般情况：早上打卡正常
function computerOvertimeWithNormal(date, config) {
  if (!startTime || !endTime) return

  if (startTime >= config.startTime.earliest &&
    startTime <= config.startTime.latest) {
    // 晚加班
    let start = startTime.add(config.workingTime).add(config.lunchBreak.time)
    if (date.workingTime >= config.workingTime + config.overtime.min) {
      date.overtimes.push(new OverTimeSpan(start, endTime))
    } else if (date.workingTime < config.workingTime) {
      // 早退请假
      date.leaves.push(new LeaveTimeSpan(endTime, start))
    }
  }
}

// 迟到情况：早上迟到
function computerOvertimeWithEarly(date, config) {
  if (!startTime || !endTime) return

  if (startTime > config.startTime.latest) {
    if (endTime >= config.endTime.earliest &&
      endTime <= config.endTime.latest) {
      // 正常下班
      let start = endTime.subtract(config.workingTime)
        .subtract(config.lunchBreak.time)
      date.leaves.push(new LeaveTimeSpan(start, startTime))
    } else {
      // 早退
      let time = startTime.subtract(config.startTime.earliest)

      if (startTime >= config.lunchBreak.end) {
        time.subtract(config.lunchBreak.time)
      }
      let start = config.startTime.earliest.add(time.minutes)
      let end = start.add(config.workingTime).add(config.lunchBreak.time)
      date.leaves.push(new LeaveTimeSpan(start, startTime))
      if (endTime < end) {
        date.leaves.push(new LeaveTimeSpan(endTime, end))
      } else if (endTime.subtract(end) >= config.overtime.min) {
        date.overtimes.push(new OverTimeSpan(end, endTime))
      }
    }
  }
}

function workdayOvertime(date, config) {
  if (!startTime && !endTime) {
    date.leaves.push(new LeaveTimeSpan(config.startTime.earliest, config.endTime.earliest))
  } else {
    computerOvertimeWithNormal(date, config)
    computerOvertimeWithEarly(date, config)
  }
}

function holidayOvertime(date, config) {
  if (!startTime || !endTime) return

  if (date.workingTime >= config.overtime.min) {
    date.overtimes.push(new OverTimeSpan(startTime, endTime))
  }
}

export default function (record) {
  Object.assign(record, {
    leaves: [],
    overtimes: []
  })
  proofread(record, config)
  if (!record.exception) {
    computeWorkingTime(record, config)
    if (record.isWorkday) {
      workdayOvertime(record, config)
    } else {
      holidayOvertime(record, config)
    }
  }

  return record
}
