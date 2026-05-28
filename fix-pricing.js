const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix 1: Change $0 to $49 (Free tier -> Starter)
content = content.replace(/\$0\/mo/g, '$49/mo');

// Fix 2: Change $29 to $99 (Starter -> Pro)  
content = content.replace(/\$29\/mo/g, '$99/mo');

// Fix 3: Rename all Business tiers to proper names
// First Business becomes Starter
content = content.replace(/<h3>Business<\/h3>\s*<div className="text-4xl font-bold mb-4">\$49/, '<h3>Starter</h3>\n                  <div className="text-4xl font-bold mb-4">$49');

// Find and replace the next Business (Pro with $99)
const proMatch = content.match(/<h3>Business<\/h3>[\s\S]*?\$99[^$]*?(\/mo)/);
if (proMatch) {
  content = content.replace('<h3>Business</h3>\n                  <div className="text-4xl font-bold mb-4">$99', '<h3>Pro</h3>\n                  <div className="text-4xl font-bold mb-4">$99');
}

// Third tier - Business at $99 (now $99 after fix) -> Business
// We need to handle the third tier separately

fs.writeFileSync('src/app/page.tsx', content);
console.log('Pricing fixed!');
console.log('Checking tiers...');
const tiers = content.match(/\$[0-9]+\/mo/g);
console.log('Found tiers:', tiers);
