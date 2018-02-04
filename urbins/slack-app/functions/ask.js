const https = require('https');

/**
 * A basic Hello World function
 * @param {string} img image url
 * @param {string} channel text
 * @returns {any}
 */
module.exports = (img = '', channel = 'G93E3K36Z', context, callback) => {

  const token = 'xoxp-299329192016-309812555574-309530119010-3f9ef0abe91e7f175090d1c340eefb3e';
  const user = 'urbins';
  let attachments = `%5B%0D%0A++++++++%7B%0D%0A++++++++++++%22text%22%3A+%22Hello%21+Can+you+identify+this+item%3F%22%2C%0D%0A++++++++++++%22fallback%22%3A+%22Sorry%21%22%2C%0D%0A++++++++++++%22callback_id%22%3A+%22wopr_game%22%2C%0D%0A++++++++++++%22color%22%3A+%22%233AA3E3%22%2C%0D%0A++++++++++++%22attachment_type%22%3A+%22default%22%2C%0D%0A++++++++++++%22actions%22%3A+%5B%0D%0A++++++++++++++++%7B%0D%0A++++++++++++++++++++%22name%22%3A+%22recycle%22%2C%0D%0A++++++++++++++++++++%22text%22%3A+%22Recycle%22%2C%0D%0A++++++++++++++++++++%22type%22%3A+%22button%22%2C%0D%0A++++++++++++++++++++%22value%22%3A+%22${img}%22%0D%0A++++++++++++++++%7D%2C%0D%0A++++++++++++++++%7B%0D%0A++++++++++++++++++++%22name%22%3A+%22garbage%22%2C%0D%0A++++++++++++++++++++%22text%22%3A+%22Garbage%22%2C%0D%0A++++++++++++++++++++%22type%22%3A+%22button%22%2C%0D%0A++++++++++++++++++++%22value%22%3A+%22${img}%22%0D%0A++++++++++++++++%7D%0D%0A++++++++++++%5D%0D%0A++++++++%7D%0D%0A++++%5D`

  let url = `https://slack.com/api/chat.postMessage?token=${token}&channel=${channel}&text=${img}&username=${user}&attachments=${attachments}`;

  https.get(url, (res) => {
    callback(res.statusCode);
  }).on('error', (e) => {
    console.error(e);
  });
};
