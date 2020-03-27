const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');
const stringDecoder = new StringDecoder('utf-8');
const { caesarCipher } = require('./caesarCipher');

module.exports.transformm = function fn({ shift, action }) {
  return new Transform({
    transform(chunk, encoding, callback) {
      if (encoding === 'buffer') {
        chunk = stringDecoder.write(chunk);
      }

      chunk = caesarCipher(shift, action, chunk);

      callback(null, chunk);
    }
  });
};
