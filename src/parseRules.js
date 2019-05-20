'use strict'

function parseRules (line) {
  const rules = line.split(' ')
    .filter(l => !l.includes('eslint'))
    .map(l => l.replace(',', ''))
  if (!rules.length) {
    return ['*block-disable*']
  }
  return rules
}

module.exports = parseRules
