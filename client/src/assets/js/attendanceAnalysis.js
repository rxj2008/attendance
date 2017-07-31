import store from '../../store'
import {
  calendar,
  excel,
  run
} from './index'
export function analysis(file, year, month) {
  let dates = calendar.getDates(year, month)
  let task1 = store.dispatch('getCalender', {
    start: dates[0],
    end: dates[dates.length - 1]
  })
  let task2 = excel.sheetToJson(file)
  let promise = Promise.all([task1, task2])
  return promise.then(([holidays, json]) => {
    holidays.forEach(holiday => {
      let date = dates.find(d => d.id === holiday.id)
      Object.assign(date, holiday)
    })
    let data = convert(json, dates)
    data.forEach(item => {
      item.dates.forEach(date => {
        try {
          run(date)
        } catch (err) {
          console.log(JSON.stringify(err))
        }
      })
    })
    store.dispatch('saveAttendance', {
      year,
      month,
      list: data
    })
    return data
  })
}

function convert(records, dates) {
  return records.filter(r => {
    return r['姓名']
  }).map(record => {
    return {
      name: record['姓名'],
      id: `${record['姓名']}-${dates[0].moment.format('YYYYMM')}`,
      dates: dates.map(date => {
        let key = `${date.month}-${date.date}`
        return {
          ...date,
          originalValue: (record[key] || '').trim()
        }
      })
    }
  })
}
