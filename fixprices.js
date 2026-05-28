const fs = require('fs');
const content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Correct mapping:
// Original $0 (Free) -> $49 (Starter)
// Original $29 (Starter) -> $99 (Pro with Most Popular)
// Original $99 (Pro) -> $149 (Business)
// Later we'll add Enterprise $199

let updated = content;

// Find the first price block ($0) and change to $49
updated = updated.replace('>$0<span', '>$49<span');

// Find the second price block ($29) and change to $99  
updated = updated.replace('>$29<span', '>$99<span');

// Find the third price block ($99) and change to $149
// But need to be careful not to replace the $99 we just set!
// So we look for the specific context after second replacement
const parts = updated.split('>$99<span');
if (parts.length >= 2) {
  // First $99 was the Starter->Pro, now change the Pro->Business
  // The third occurrence is the one we want
  updated = parts[0] + '>$99<span' + parts[1].replace('>$99<span', '>$149<span');
}

fs.writeFileSync('src/app/page.tsx', updated);
console.log('Done! Verifying prices:');
const prices = updated.match(/\$[0-9]+<span/g);
console.log(prices);
