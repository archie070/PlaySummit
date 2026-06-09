const fs = require('fs');
const text = fs.readFileSync('index.html', 'utf8');
const tail = text.slice(-500);
console.log(tail);
