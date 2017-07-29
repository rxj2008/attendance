export class Time {
  constructor(hours, minutes) {
    if (arguments.length === 1) {
      this.totalMinutes = arguments[0].valueOf()
    } else {
      this.totalMinutes = hours * 60 + minutes
    }
  }

  get totalHours() {
    return this.totalMinutes / 60
  }

  get totalMinutes() {
    return this.value
  }

  set totalMinutes(value) {
    this.hours = Math.floor(value / 60)
    this.minutes = value % 60
    this.value = value
  }

  valueOf() {
    return this.value
  }

  toString() {
    let hours = this.hours
    let minutes = this.minutes
    if (hours < 10) {
      hours = '0' + hours
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    return `${hours}:${minutes}`
  }

  add(time) {
    let value = time.valueOf()
    if (Number.isInteger(value)) {
      return new Time(0, this.totalMinutes + value)
    }
  }

  subtract(time) {
    let value = time.valueOf()
    if (Number.isInteger(value)) {
      return new Time(0, this.totalMinutes - value)
    }
  }

}

