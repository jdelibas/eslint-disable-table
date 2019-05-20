const path = require('path')
const test = require('ava')
const table = require('../src')

test('Should ignore node_modules comments (01)', async t => {
  // Arrange
  const testPath = path.resolve(__dirname, 'fixtures/01')
  const expected = [{
    file: path.resolve(__dirname, 'fixtures/01/01.js'),
    line: 3,
    rules: ['no-console', 'include-me'],
    value: 'eslint-disable-line no-console, include-me'
  }]
  // Act
  const result = await table(testPath)
  // Assert
  t.deepEqual(expected, result)
})

test('Should trim block comment (02)', async t => {
  // Arrange
  const testPath = path.resolve(__dirname, 'fixtures/02')
  const expected = [{
    file: path.resolve(__dirname, 'fixtures/02/02.js'),
    line: 3,
    rules: ['no-console'],
    value: 'eslint-disable-line no-console'
  }]
  // Act
  const result = await table(testPath)
  // Assert
  t.deepEqual(expected, result)
})
