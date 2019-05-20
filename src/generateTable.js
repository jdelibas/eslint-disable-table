'use strict'
const Table = require('cli-table')

function generateTable (data, basePath) {
  const table = new Table({
    head: ['File', 'Line', 'Rules']
  })
  table.push(
    ...data.map(r => [
      r.file.replace(basePath, ''),
      r.line,
      r.rules.join(', ')
    ])
  )
  return table.toString()
}

module.exports = generateTable
