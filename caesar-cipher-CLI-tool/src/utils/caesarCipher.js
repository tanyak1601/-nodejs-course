module.exports.caesarCipher = function fn(shift, action, chunk) {
  return `${chunk
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
    .join('')}\n`;
};
