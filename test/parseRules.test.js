const test = require('ava')
const parseRules = require('../src/parseRules')

test('Should default to global', t => {
  // Arrange
  const input = 'eslint-disable'
  const expected = ['*block-disable*']
  // Act
  const result = parseRules(input)
  // Assert
  t.deepEqual(expected, result)
})

test('Should parse eslint-disable-line', t => {
  // Arrange
  const input = 'eslint-disable-line no-console'
  const expected = ['no-console']
  // Act
  const result = parseRules(input)
  // Assert
  t.deepEqual(expected, result)
})

test('Should parse eslint-disable-line multiples', t => {
  // Arrange
  const input = 'eslint-disable-line no-console, other-rule'
  const expected = ['no-console', 'other-rule']
  // Act
  const result = parseRules(input)
  // Assert
  t.deepEqual(expected, result)
})

test('Should parse eslint-disable-next-line', t => {
  // Arrange
  const input = 'eslint-disable-next-line no-console'
  const expected = ['no-console']
  // Act
  const result = parseRules(input)
  // Assert
  t.deepEqual(expected, result)
})

test('Should parse eslint-disable-next-line multiples', t => {
  // Arrange
  const input = 'eslint-disable-next-line no-console, other-rule'
  const expected = ['no-console', 'other-rule']
  // Act
  const result = parseRules(input)
  // Assert
  t.deepEqual(expected, result)
})

test('Should parse eslint', t => {
  // Arrange
  const input = 'eslint eqeqeq:0'
  const expected = ['eqeqeq:0']
  // Act
  const result = parseRules(input)
  // Assert
  t.deepEqual(expected, result)
})

test.skip('Should parse eslint array', t => {
  // Arrange
  const input = 'eslint eqeqeq: ["error", { option: 1, option: 2 }]'
  const expected = []
  // Act
  const result = parseRules(input)
  // Assert
  t.deepEqual(expected, result)
})
