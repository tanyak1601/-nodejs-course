const fs = require('fs');
const { pipeline } = require('stream');
const { transformm } = require('./utils/transform');

module.exports.getPipeline = function fn(opts) {
  const options = {
    flags: 'a'
  };
  const readable = opts.input ? fs.createReadStream(opts.input) : process.stdin;
  const writable = opts.output
    ? fs.createWriteStream(opts.output, options)
    : process.stdout;

  pipeline(readable, transformm(opts), writable, err => {
    if (err) {
      console.error('Pipeline failed.', err.message);
    } else {
      console.log('Pipeline succeeded.');
    }
  });
};
