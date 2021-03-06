#!/usr/bin/env node

'use strict'

const program = require('commander')
const getTable = require('../src')
const generateTable = require('../src/generateTable')
const { commaSeparatedList } = require('../src/optionHandlers');

(async function main () {

  try {

    program
      .option('-d, --directory <dir>', 'directory to inspect', commaSeparatedList)
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

    program.parse(process.argv);

    const baseDirs = program.directory || [ process.cwd() ];

    // Prepare the output.
    const outputPromises = baseDirs.map(async baseDir =>
      Object({
        baseDir,
        table: await getTable(baseDir, program.exclude),
      })
    );
    const outputList = await Promise.all(outputPromises);

    if (program.json) { // Output as JSON.
      const outputHash = outputList.reduce((acc, item) => {
        acc[item.baseDir] = item.table;
        return acc;
      }, {});
      const outputJson = JSON.stringify(outputHash, null, 4);
      console.log(outputJson);
    } else { // Output as a pretty table.
      console.log('');
      outputList.forEach(item => {
        const outputTable = generateTable(item.table, item.baseDir);
        console.log(`DIR: ${item.baseDir}\n\n${outputTable}\n`);
      });
    }

  } catch (err) {
    console.error(err);
    setTimeout(process.exit.bind(process, 1), 250); // Logging is async and takes some time to complete.
  }

}());
