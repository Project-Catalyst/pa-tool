import { parse } from 'json2csv'
import FileSaver from 'file-saver'

import csvHeaders from '../assets/data/csv-headers.json'

function generateFields() {
  let criteriaKeys = Object.keys(csvHeaders).map((c) => {
    return {
      label: csvHeaders[c].label,
      value: (row) => {
        if (csvHeaders[c].type === 'boolean') {
          return (row[c]) ? 1 : 0
        } else if (csvHeaders[c].type === 'array') {
          return row[c].toString()
        } else {
          return row[c]
        }
      }
    }
  })
  return criteriaKeys
}

function generateCsv(data) {
  if (data.length) {
    return parse(
      data,
      {
        fields: generateFields()
      }
    );
  }
  return ''
}

function downloadCsv(data) {
  let filename = 'CA-export.csv'
  let csv = generateCsv(data);
  var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(blob, filename);
}

export default downloadCsv
