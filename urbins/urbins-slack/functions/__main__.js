const https = require('https');

/**
 * A basic Hello World function
 * @param {string} text text
 * @param {string} channel text
 * @returns {any}
 */
module.exports = (text = 'Hello!', channel = 'G93E3K36Z', context, callback) => {

  const token = 'xoxp-299329192016-309812555574-309370941395-80a35699789bfe57755d68f79f1fb781';
  const user = 'urbins';
  const icon = 'https://firebasestorage.googleapis.com/v0/b/urbins-project.appspot.com/o/gb.png?alt=media%26token=961d0f0e-ecca-41be-ab9b-e805e104c05b';

  let url = `https://slack.com/api/chat.postMessage?token=${token}&channel=${channel}&text=${text}&username=${user}&icon_url=${icon}`;

  https.get(url, (res) => {
    callback(res.statusCode);
  }).on('error', (e) => {
    console.error(e);
  });
};
