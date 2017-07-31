import {config, Time, Reimburse} from '../index'

// 餐费报销
function mealFee(record) {
  if (record.isWorkday) {
    // 工作日
    let [startTime, endTime] = record.clocktimes

    if (startTime <= config.startTime.latest && endTime >= new Time(20, 0)) {
      record.reimburses.push(new Reimburse(20, '餐费', [new Time(12, 0)]))
    }
  } else {
    // 节假日
    if (record.workingTime >= new Time(8, 0)) {
      record.reimburses.push(new Reimburse(40, '餐费', [new Time(12, 0)]))
    } else if (record.workingTime >= new Time(6, 0)) {
      record.reimburses.push(new Reimburse(20, '餐费', [new Time(12, 0)]))
    }
  }
}

// 打车费
function carFee(record) {
  let [startTime, endTime] = record.clocktimes
  if (startTime <= config.startTime.latest && endTime >= new Time(22, 0)) {
    record.reimburses.push(new Reimburse(0, '交通费', [new Time(22, 0)]))
  }
}

export default function (record) {
  record.reimburses = []
  if (record.clocktimes && record.clocktimes.length === 2) {
    mealFee(record)
    carFee(record)
  }
  return record
}
