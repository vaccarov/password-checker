var sha1 = require('sha1');
var request = require('request');
const pass = process.argv[2];

if (pass) {
  const hashedPassword = sha1(pass).toUpperCase();
  request(`https://api.pwnedpasswords.com/range/${hashedPassword.substring(0,5)}`,
      (err, res, body) => isPasswordUsed(hashedPassword, body.split(/\r\n/)));
} else {
  console.log('Please add a parameter ex: node pass-checker.js passwordToCheck');
}

function isPasswordUsed(hashedPassword, listPasswords) {
  let numberFounded = 0;
  for (var i = 0; i < listPasswords.length; i++) {
    const line = listPasswords[i].split(/:/);
    if (line[0] === hashedPassword.substring(5)) {
      numberFounded = line[1];
      break;
    }
  }

  const textColor = `\x1b[3${numberFounded ? 1 : 2}m%s\x1b[0m`;
  console.log(textColor, `Password used ${numberFounded} times`);
}
