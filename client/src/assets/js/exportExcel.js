import {excel} from './excel'
export function exportExcel(attendances) {
  var datas = []
  let overTime = {name: '加班', data: [['序号', '姓名', '年/月/日', '时', '分', '年/月/日', '时', '分', '总时长', '事由', '本人手签']]}
  let overTimeIdx = 1
  let leaves = {name: '调休', data: [['序号', '姓名', '年/月/日', '时', '分', '年/月/日', '时', '分', '总时长', '事由', '本人手签']]}
  let leaveIdx = 1
  let reimburses = {name: '报销', data: [['序号', '所属分公司', '姓名', '报销日期', '金额', '票据发生类别', '票据发生时间', '出发地—目的地', '客户公司名称', '客户姓名及电话', '备注说明']]}
  let reimburseIdx = 1

  attendances.forEach(att => {
    att.dates.forEach(date => {
      // 加班
      if (date.overtimes.length) {
        date.overtimes.forEach(ot => {
          let item = []
          item.push(overTimeIdx++)
          item.push(att.name)
          item.push(`${date.year}年${date.month}月${date.date}日`)
          item.push(ot.startTime.hours)
          item.push(ot.startTime.minutes)
          item.push(`${date.year}年${date.month}月${date.date}日`)
          item.push(ot.endTime.hours)
          item.push(ot.endTime.minutes)
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
          item.push(leaveIdx++)
          item.push(att.name)
          item.push(`${date.year}年${date.month}月${date.date}日`)
          item.push(ot.startTime.hours)
          item.push(ot.startTime.minutes)
          item.push(`${date.year}年${date.month}月${date.date}日`)
          item.push(ot.endTime.hours)
          item.push(ot.endTime.minutes)
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
          item.push(it.times.map(t => { return `${t.hours}:${t.minutes}` }).join('/'))
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
