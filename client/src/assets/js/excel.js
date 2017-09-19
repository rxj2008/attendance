import XLSX from 'xlsx'
import '../../../static/js/Blob.js'
import saveAs from '../../../static/js/FileSaver.js'

function sheetToJson(file, sheetIndex = 0) {
  let promise = new Promise((resolve, reject) => {
    try {
      let reader = new FileReader()
      reader.onload = (e) => {
        let bytes = new Uint8Array(e.target.result)
        let binary = []
        let length = bytes.byteLength
        for (let i = 0; i < length; i++) {
          binary.push(String.fromCharCode(bytes[i]))
        }
        let workbook = XLSX.read(binary.join(''), {
          type: 'binary'
        })
        let sheetName = workbook.SheetNames[sheetIndex]
        let sheet = workbook.Sheets[sheetName]
        let content = XLSX.utils.sheet_to_json(sheet)
        resolve(content)
      }
      reader.readAsArrayBuffer(file)
    } catch (e) {
      reject(e)
    }
  })
  return promise
}
function datenum(v, date1904) {
  if (date1904) v += 1462
  var epoch = Date.parse(v)
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}
function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook()
  this.SheetNames = []
  this.Sheets = {}
}
function buildSheet(data) {
  var ws = {}
  var range = {s: {c: 10000000, r: 10000000}, e: { c: 0, r: 0 }}
  for (var R = 0; R !== data.length; ++R) {
    for (var C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C
      var cell = { v: data[R][C] }
      if (cell.v == null) continue
      var cellRef = XLSX.utils.encode_cell({c: C, r: R})

      if (typeof cell.v === 'number') cell.t = 'n'
      else if (typeof cell.v === 'boolean') cell.t = 'b'
      else if (cell.v instanceof Date) {
        cell.t = 'n'; cell.z = XLSX.SSF._table[14]
        cell.v = datenum(cell.v)
      } else cell.t = 's'

      cell.s = {
        fill: {
          bgColor: {
            rgb: 'ff00ff00'
          }
        },
        alignment: {
          horizontal: 'center',
          vertical: 'center'
        }
      }

      ws[cellRef] = cell

      // cell.v = {fill: { bgColor: { rgb: "#ff2000" }}}
      // console.log(cell)
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
  return ws
}
function s2ab(s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}
function exportExcel(name, sheets) {
  var workBook = new Workbook()
  sheets.forEach(sheet => {
    let ws = buildSheet(sheet.data)
    workBook.SheetNames.push(sheet.name)
    workBook.Sheets[sheet.name] = ws
  })
  var wbout = XLSX.write(workBook, {bookType: 'xlsx', bookSST: true, type: 'binary'})

  saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), `${name}.xlsx`)
}
export const excel = {
  sheetToJson,
  export: exportExcel
}
