#!/usr/bin/env node
const fs = require('fs');
const { pipeline } = require('stream');
const { Command } = require('commander');
const caesarCipher = require('./utils/caesarCipher');
const program = new Command();

program
  .requiredOption('-s, --shift [value]', 'a shift')
  .option('-i, --input [value]', 'an input file')
  .option('-o, --output [value]', 'an output file')
  .requiredOption('-a, --action [value]', 'an action encode/decode');

program.parse(process.argv);

const opts = program.opts();

const readable = opts.input ? fs.createReadStream(opts.input) : process.stdin;
const writable = opts.output
  ? fs.createWriteStream(opts.output)
  : process.stdout;

pipeline(readable, caesarCipher(opts), writable, err => {
  if (err) {
    console.error('Pipeline failed.', err.message);
  } else {
    console.log('Pipeline succeeded.');
  }
});
