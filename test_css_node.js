const fs = require('fs');
const css = fs.readFileSync('css/main.css', 'utf8');

// very basic check for syntax error that would break parsing
let inComment = false;
for (let i = 0; i < css.length; i++) {
  if (css[i] === '/' && css[i+1] === '*') inComment = true;
  if (css[i] === '*' && css[i+1] === '/') inComment = false;
}
console.log("inComment:", inComment);
