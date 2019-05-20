'use strict'

const fs = require('fs')
const util = require('util')
const path = require('path')
const recursive = require('recursive-readdir')
const extract = require('extract-comments')
const parseRules = require('./parseRules')

const recursiveAsync = util.promisify(recursive)
const readFileAsync = util.promisify(fs.readFile)

const defaultExcludes = [
  'node_modules'
]

async function extractRules (filePath) {
  const rawFile = await readFileAsync(filePath, 'utf8')
  if (typeof rawFile !== 'string') {
    throw new TypeError('expected a string')
  }
  return extract(rawFile)
    .filter(c => c.value.includes('eslint'))
    .map(c => ({
      line: c.loc.start.line,
      value: c.value.trim(),
      file: filePath,
      rules: parseRules(c.value.trim())
    }))
}

async function getFilePaths (dirPath, excludes) {
  excludes.push(...defaultExcludes)
  const allFilePaths = await recursiveAsync(dirPath, excludes)
  return allFilePaths.filter(p => path.parse(p).ext === '.js')
}

module.exports = async function (dirPath, excludes = []) {
  try {
    const filePaths = await getFilePaths(dirPath, excludes)
    const promiseList = filePaths.map(sf => extractRules(sf))
    const results = await Promise.all(promiseList)
    return results.flat()
      .filter(Boolean)
  } catch (e) {
    throw e
  }
}
