#!/usr/bin/env node
const { Command } = require('commander');
const { getPipeline } = require('./src/pipeline');
const program = new Command();

program
  .requiredOption('-s, --shift [value]', 'a shift')
  .option('-i, --input [value]', 'an input file')
  .option('-o, --output [value]', 'an output file')
  .requiredOption('-a, --action [value]', 'an action encode/decode');

program.parse(process.argv);

const opts = program.opts();

getPipeline(opts);
