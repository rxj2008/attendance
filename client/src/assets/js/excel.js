import XLSX from 'xlsx'

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

export const excel = {
  sheetToJson
}
