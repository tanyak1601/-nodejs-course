module.exports.checkOpts = function fn({ shift, action }) {
  if (typeof +shift !== 'number' || shift < 0) {
    throw Error('Error: shift must be a positive integer');
  }

  if (action !== 'encode' && action !== 'decode ') {
    throw Error('Error: action must be encode/decode only');
  }
};
