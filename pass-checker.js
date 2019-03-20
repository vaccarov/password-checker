var sha1 = require('sha1');
var request = require('request');
const crypted = sha1(process.argv[2]).toUpperCase();

request(`https://api.pwnedpasswords.com/range/${crypted.substring(0,5)}`,
  (err, res, body) => { isPasswordUsed(body.split(/\r\n/)); });

function isPasswordUsed(list) {
  let numberFounded = 0;
  for (var i = 0; i < list.length; i++) {
    const line = list[i].split(/:/);
    if (line[0] === crypted.substring(5)) {
      numberFounded = line[1];
      break;
    }
  }
  console.log('Password used ' + numberFounded + ' times');
}
