const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const { transformChunk } = require('./utils/transformChunk');

module.exports.getPipeline = function fn(opts) {
  const options = {
    flags: 'a'
  };

  const readable = opts.input
    ? fs.createReadStream(path.join(__dirname, '..', opts.input))
    : process.stdin;
  const writable = opts.output
    ? fs.createWriteStream(path.join(__dirname, '..', opts.output), options)
    : process.stdout;

  pipeline(readable, transformChunk(opts), writable, err => {
    if (err) {
      console.error('Pipeline failed.', err.message);
    } else {
      console.log('Pipeline succeeded.');
    }
  });
};
