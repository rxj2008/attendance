import {
    excel
} from './excel'
export function exportExcel(attendances) {
  var datas = []
  let overTime = {
    name: '加班',
    data: [
            ['姓名', '加班日期', '开始时间', '结束时间', '时长(小时)', '原因', '本人签字']
    ]
  }
  let overTimeIdx = 1
  let leaves = {
    name: '调休',
    data: [
            ['姓名', '休假日期', '开始时间', '结束时间', '休假时长(小时)', '休假类型', '本人签字']
    ]
  }
  let leaveIdx = 1
  let reimburses = {
    name: '报销',
    data: [
            ['序号', '所属分公司', '姓名', '报销日期', '金额', '票据发生类别', '票据发生时间', '出发地—目的地', '客户公司名称', '客户姓名及电话', '备注说明']
    ]
  }
  let reimburseIdx = 1

  attendances.forEach(att => {
    att.dates.forEach(date => {
            // 加班
      if (date.overtimes.length) {
        date.overtimes.forEach(ot => {
          let item = []
          item.push(att.name)
          item.push(`${date.year}/${date.month}/${date.date}`)
          item.push(new Date(date.year, date.month - 1, date.date, ot.startTime.hours + 8, ot.startTime.minutes, 0))
          // item.push( ot.startTime.hours)
          // item.push(ot.startTime.minutes)
          // item.push(`${date.year}年${date.month}月${date.date}日`)
          // item.push(ot.endTime.hours)
          // item.push(ot.endTime.minutes)
          item.push(new Date(date.year, date.month - 1, date.date, ot.endTime.hours + 8, ot.endTime.minutes, 0))
          item.push(ot.time.value / 60)
          item.push('')
          item.push('')
          overTime.data.push(item)
        })
      }
            // 调休
      if (date.leaves.length) {
        date.leaves.forEach(ot => {
          let item = []
          item.push(att.name)
          item.push(`${date.year}/${date.month}/${date.date}`)
          item.push(new Date(date.year, date.month - 1, date.date, ot.startTime.hours + 8, ot.startTime.minutes, 0))
          item.push(new Date(date.year, date.month - 1, date.date, ot.endTime.hours + 8, ot.endTime.minutes, 0))
          console.log(JSON.stringify(ot))
          console.log(`${date.year}, ${date.month - 1}, ${date.date}, ${ot.endTime.hours}, ${ot.endTime.minutes}`)
          // item.push(ot.startTime.hours)
          // item.push(ot.startTime.minutes)
          // item.push(`${date.year}年${date.month}月${date.date}日`)
          // item.push(ot.endTime.hours)
          // item.push(ot.endTime.minutes)
          item.push(ot.time.value / 60)
          item.push('调休')
          item.push('')
          leaves.data.push(item)
        })
      }
            // 报销
      if (date.reimburses.length) {
        date.reimburses.forEach(it => {
          let item = []
          item.push(reimburseIdx++)
          item.push('九次方')
          item.push(att.name)
          item.push(`${date.year}/${date.month}/${date.date}`)
          item.push(it.money)
          item.push(it.type)
          item.push(it.times.map(t => {
            return `${t.hours}:${t.minutes}`
          }).join('/'))
          item.push('')
          item.push('')
          item.push('')
          item.push(date.isWeekend ? '周末加班' : '')
          reimburses.data.push(item)
        })
      }
    })
  })
  datas.push(overTime)
  datas.push(leaves)
  datas.push(reimburses)
  excel.export('考勤', datas)
}
