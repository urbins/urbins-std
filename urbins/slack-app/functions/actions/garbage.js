const https = require('https');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'urbins-project',
    clientEmail: 'firebase-adminsdk-r4xls@urbins-project.iam.gserviceaccount.com',
    privateKey: `-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCwUPz9VjcmYJpf\nnkNknNjXUEwYb73G06QE+bW7EdVR69GKrkLZDVDdJyb3soecndymlYQ4u/2qjK6D\nKpY4572SPCxeBM5i5g6aPbu+MPaCZcjgejjcBmsRh88Vc+TopV5JRDOOZ/8QS/hX\ndIMRq2OU7sAB5lzdIRPaa9nizSFlw03Qb66DpnVixAIdqoJA61xkG9S/7iC6f+qm\nOJu6c03SF5/afej3YRsLYIoHL5hqMi//a9pdVocGgUqIXnHTxYA2wIQ0qMeJ7ZLg\nZEitEjfvhDGQ/CnYnXkZho1WeJiZRtsX5iGTjop3cbZ7V28SJVErvmpnZYjIsE7f\njuE5IwknAgMBAAECggEABf+gtnxswJPVd16qtk1BHK+GVz0op2S4lilqDbpBQq8+\nNXSmS5ImEnrBhaMqSqFy9KvuOqvn/m8Y2izkaCfiODZvNVJT3zjVKFmPU0eBK4CL\nrATHKHKDdAOQf7oDVghCQ/CGZy2R7PEDZZ5OKJdnJOsBLKS0u2/jqAZhUakJniz6\nD5fP1raM7hoKTv/USu3+mrQDdampej8LSX89QfKifjFdQvpU3p6/EIjy87MsWqB4\nyc6anhz0GSAchviBeEB5yCssuTV/qEGSO6syFxyRi1OZdRt5LnjO1M57XZMuxFGA\nq9pnRPzWw99Wjnp1j1HKvxERyavSrzSLHKIN8M5zuQKBgQDVO3yB6iEv7YYBlT1C\nBT6cOC3V1bD8Oct83u3VlaKwBY+JI7xKNv0e1jNirZL6QgDD1jYKID1h3iQ924Nv\nt/q7rEuS1SZrvBnQ5SdWNaWRdWafbYGMly3fZ/N25b7frM0FZIwaEZwckeHwi/0W\nF100jyEezNpi+B3Zqz/JXihTZQKBgQDTrghTxJuzh4BReSP3FcqAyjo259BR3YfR\nuHVv25M3U6+IdOYmH9iisiukuv/GGPFO0BGFcyYiIAjQngpgXI3fmgAI8VZmUZIa\njZQU1mp4VVHf+pMJawAUb/DVcsR5y1cCNUaciAUOyURUGPPZ8VORDQBlz7WgePrn\nRbQaZbUvmwKBgEgCUsW8v4BkAkE+mPVWuBIhlrkD9UT4b5O35TGf2tT+y75QZyHY\n+BoV1DyayWviJkf8azt4L8KBNlP9caGky/Pc95iaiuMPHtjAykv+ye8ZapKkdH95\n/m/XtwyMAa2fuYz8q6OSFto/GcIWRF3VfhBl1ZWFMKsDh3Eet+fU+GFRAoGBAL25\nBuelmPPw57aeP/juhACowEKDxPgK+PekP0WRZMI69GH2fG0BMBaqYGmV3Tc9FdLQ\ntFOKoEwHsD7i12QEsHgPvCZHwGuWgr/f0zBV+Tl/JxH7sRvI1lp69j0pTyXmdUaa\nX35ef0IAbIh/kNfu7zpbj9awsxZwOFle5QyfyiQvAoGBAJM5wy67m6jMVlPxuF7C\nrOuWwkUViffjd14U5VIMJPPwBAXcj9i4qAdzfx/gaRHvsnymUjL/TA+2zApP2KRQ\nyPN/wSjG2tlsCZg9Jn9J+5CpOaqNzytxGMrEruyo1aySea53JHSy/w8I0QGePI1+\nX1JwiEVQrvUDQWDAxgLO+UH9\n-----END PRIVATE KEY-----\n`
  }),
  databaseURL: 'https://urbins-project.firebaseio.com'
});

const db = admin.database();

/**
 * @param {string} user The user id of the user that invoked this command (name is usable as well)
 * @param {string} channel The channel id the command was executed in (name is usable as well)
 * @param {object} action The full Slack action object
 * @param {string} botToken The bot token for the Slack bot you have activated
 * @returns {any}
 */
module.exports = (user, channel, action = {}, botToken = null, callback) => {

  var img = action.actions[0].value;
  var garbage = [];

  db.ref('/').child('sorted/garbage').once("value", function(snap) {
    var temp = snap.val();
    if (temp) {
      garbage = garbage.concat(temp);
      garbage.push(img);
      if (garbage.length > 12) {
        db.ref('/').child('sorted/create-zip-garbage').set(true);
      }
      db.ref('/').child('sorted/garbage').set(garbage);
    } else {
      db.ref('/').child('sorted/garbage').set([img]);
    }
  });

};
