const lib = require('lib');

/**
 * A basic Hello World function
 * @param {string} text Text
 * @param {string} tel Phone number
 * @returns {any}
 */
module.exports = (text = 'Hello!', tel = '2042509218', context, callback) => {
  lib.utils.sms({
    to: tel,
    body: text
  }, (err, result) => {
    callback(err, result);
  });
  // callback(null, `${text}`);

};
