const fs = require('fs');
let c = fs.readFileSync('src/app/page.tsx', 'utf8');

// We need to change the third $99 to $149
// After the first two replacements, the file has $49 and $99
// The remaining $99 should become $149

// Simple approach: replace ALL remaining $99 with $149
// But only in the pricing section (after "Simple, Transparent Pricing")

const marker = 'Simple, Transparent Pricing';
const idx = c.indexOf(marker);
if (idx > -1) {
  const before = c.substring(0, idx);
  const after = c.substring(idx);
  const updatedAfter = after.replace(/\$99<span/g, '$149<span');
  fs.writeFileSync('src/app/page.tsx', before + updatedAfter);
  console.log('Third price fixed!');
} else {
  console.log('Marker not found');
}
