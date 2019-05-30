#!/usr/bin/env node

'use strict'

const program = require('commander')
const getTable = require('../src')
const generateTable = require('../src/generateTable')
const { commaSeparatedList } = require('../src/optionHandlers');

(async function main () {

  try {

    program
      .option('-d, --directory <dir>', 'directory to inspect', commaSeparatedList, process.cwd())
      .option('-j, --json', 'output json', false)
      .option('-e, --exclude <exclude>', 'exclude patterns, comma separated list', commaSeparatedList)

    program.on('--help', () => {
      console.log('')
      console.log('Examples:')
      console.log('')
      console.log('  $ eslint-disable-table -j > table.json')
      console.log('  $ eslint-disable-table -e .nycoutput, coverage')
      console.log('  $ eslint-disable-table -d ~/project-one, ~/project-two')
    })

    program.parse(process.argv)

    const res = await getTable(program.directory, program.exclude);
    const output = (program.json ? JSON.stringify(res, null, 4) : generateTable(res, program.directory));
    console.log(output);

  } catch (err) {
    console.error(err);
    setTimeout(process.exit.bind(process, 1), 250); // Logging is async and takes some time to complete.
  }

}());
