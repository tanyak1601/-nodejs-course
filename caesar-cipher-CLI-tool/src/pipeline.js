const fs = require('fs');
const { pipeline } = require('stream');
const caesarCipher = require('./utils/caesarCipher');

module.exports.getPipeline = function fn(opts) {
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
};
