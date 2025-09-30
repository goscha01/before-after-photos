const fs = require('fs');

// Read the method ranges
const methodRanges = JSON.parse(fs.readFileSync('method-ranges.json', 'utf8'));

// Read app.js
const appContent = fs.readFileSync('src/js/app.js', 'utf8');
const appLines = appContent.split('\n');

// Extract methods
const extractedMethods = [];

methodRanges.forEach(({ name, start, end }) => {
  // Extract lines (convert from 1-indexed to 0-indexed)
  const methodLines = appLines.slice(start - 1, end);

  // Join the method
  const methodCode = methodLines.join('\n');

  extractedMethods.push({
    name,
    code: methodCode,
    start,
    end
  });
});

// Generate ui.js content
const uiJsContent = `/**
 * UI Module
 * Handles all HTML generation and template rendering
 */

export class UIGenerator {
  constructor(app) {
    this.app = app; // Reference to main app for accessing state
  }

${extractedMethods.map(m => '  ' + m.code).join('\n\n')}
}

export default UIGenerator;
`;

// Write ui.js
fs.writeFileSync('src/js/ui.js', uiJsContent);

console.log('Created ui.js with', extractedMethods.length, 'methods');
console.log('Total lines:', uiJsContent.split('\n').length);

// Generate a list of methods for replacement
console.log('\nMethods extracted:');
extractedMethods.forEach(m => {
  console.log(`  - ${m.name} (lines ${m.start}-${m.end})`);
});