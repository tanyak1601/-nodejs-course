const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const { transformChunk } = require('./utils/transformChunk');

module.exports.getPipeline = function fn(opts) {
  const inputPath = path.join(__dirname, '..', opts.input);
  const outputPath = path.join(__dirname, '..', opts.output);

  const options = {
    flags: 'a'
  };

  const readable = opts.input ? fs.createReadStream(inputPath) : process.stdin;
  const writable = opts.output
    ? fs.createWriteStream(outputPath, options)
    : process.stdout;

  pipeline(readable, transformChunk(opts), writable, err => {
    if (err) {
      console.error('Pipeline failed.', err.message);
    } else {
      console.log('Pipeline succeeded.');
    }
  });
};
