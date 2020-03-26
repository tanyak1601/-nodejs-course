const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');
const stringDecoder = new StringDecoder('utf-8');

function caesarCipher({ shift, action }) {
  return new Transform({
    transform(chunk, encoding, callback) {
      if (encoding === 'buffer') {
        chunk = stringDecoder.write(chunk);
      }

      chunk = chunk
        .split('')
        .map(el => {
          let code = el.charCodeAt();

          if (code >= 65 && code <= 90) {
            if (action === 'encode') {
              code += +shift;
              if (code > 90) code -= 26;
            }

            if (action === 'decode') {
              code -= +shift;
              if (code < 90) code += 26;
            }
          }

          if (code >= 97 && code <= 122) {
            if (action === 'encode') {
              code += +shift;
              if (code > 122) code -= 26;
            }

            if (action === 'decode') {
              code -= +shift;
              if (code < 97) code += 26;
            }
          }

          return String.fromCharCode(code);
        })
        .join('');

      callback(null, chunk);
    }
  });
}

module.exports = caesarCipher;
