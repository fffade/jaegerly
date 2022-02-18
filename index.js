const fs = require('fs');

console.log(`Writing to log...`);

fs.writeFileSync('logs.txt', "This is a log");

console.log(`Complete`);