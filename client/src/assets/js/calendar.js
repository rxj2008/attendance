import moment from 'moment'

function convertDate(date) {
  date = moment(date)
  let day = date.day()
  return {
    year: date.year(),
    month: date.month() + 1,
    date: date.date(),
    day: day,
    isWeekend: day === 0 || day === 6,
    isWorkday: day > 0 && day < 6,
    moment: moment(date),
    id: +date.format('YYYYMMDD')
  }
}

function getDates(year, month, options) {
  options = Object.assign({
    justify: false
  }, options)
  let dates = []
  let start = moment([year, month - 1])
  if (options.justify) {
    let day = start.day()
    start = start.subtract(day, 'days')
  }
  for (let i = 0; i < 42; i++) {
    let date = convertDate(start)
    if (!options.justify && date.month !== month) {
      break
    }

    dates.push(date)
    start.add(1, 'days')
  }
  return dates
}

function now() {
  let now = moment()
  return convertDate(now)
}
const weekName = [{
  name: '星期日',
  isWorkday: false,
  index: 0
},
{
  name: '星期一',
  isWorkday: true,
  index: 1
},
{
  name: '星期二',
  isWorkday: true,
  index: 2
},
{
  name: '星期三',
  isWorkday: true,
  index: 3
},
{
  name: '星期四',
  isWorkday: true,
  index: 4
},
{
  name: '星期五',
  isWorkday: true,
  index: 5
},
{
  name: '星期六',
  isWorkday: false,
  index: 6
}
]

function getWeekName(startIndex = 0) {
  return weekName.map((wn, i) => {
    return weekName[(i + startIndex) % 7]
  })
}
export const calendar = {
  now,
  getDates,
  convertDate,
  getWeekName
}
