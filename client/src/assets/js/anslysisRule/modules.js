import {
  config,
  Time
} from '../index'

class TimeSpan {
  constructor(startTime, endTime) {
    this.startTime = startTime
    this.endTime = endTime
    this.time = endTime.subtract(startTime)
    if (startTime <= config.lunchBreak.start && endTime >= config.lunchBreak.end) {
      this.time = this.time.subtract(config.lunchBreak.time)
    }
  }
  toString() {
    return `${this.startTime.toString()}--${this.endTime.toString()}|${this.time.totalHours}`
  }
}

export class LeaveTimeSpan extends TimeSpan {
  constructor(startTime, endTime) {
    super(startTime, endTime)
    let totalMinutes = Math.max(this.time.totalMinutes, config.leave.min)
    let factor = Math.ceil((totalMinutes - config.leave.min) / config.leave.step)
    let time = factor * config.leave.step + config.leave.min
    this.time = new Time(time)
  }
}

export class OverTimeSpan extends TimeSpan {
  constructor(startTime, endTime) {
    super(startTime, endTime)
    let factor = Math.floor((this.time.totalMinutes - config.overtime.min) / config.overtime.step)
    let time = factor * config.overtime.step + config.overtime.min
    this.time = new Time(time)
  }
}
export class Reimburse {
  constructor(money, type, times) {
    this.money = money
    this.type = type
    this.times = times
  }
  toString() {
    let timeStr = this.times.map(t => { return t.toString() }).join('/')
    return `${this.type}|${this.money}|${timeStr}`
  }
}
