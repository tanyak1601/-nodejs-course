#!/usr/bin/env node
const { Command } = require('commander');
const { getPipeline } = require('./src/pipeline');
const { checkOpts } = require('./src/checkOpts');
const program = new Command();

program
  .requiredOption('-s, --shift [value]', 'a shift')
  .option('-i, --input [value]', 'an input file')
  .option('-o, --output [value]', 'an output file')
  .requiredOption('-a, --action [value]', 'an action encode/decode');

program.parse(process.argv);

const opts = program.opts();

try {
  checkOpts(opts);
} catch (err) {
  console.error(err.message);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

getPipeline(opts);
