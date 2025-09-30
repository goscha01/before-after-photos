const fs = require('fs');
const content = fs.readFileSync('src/js/app.js', 'utf8');
const lines = content.split('\n');

function findMethodBoundaries(lines, methodName) {
  let startLine = -1;
  let braceDepth = 0;
  let methodStarted = false;
  let initialBraceDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Find method declaration
    if (!methodStarted) {
      // Look for method name followed by opening paren
      const methodPattern = new RegExp('^' + methodName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\(');
      if (methodPattern.test(trimmed)) {
        startLine = i;
        methodStarted = true;
      }
      continue;
    }

    if (methodStarted) {
      // Count braces
      for (let char of line) {
        if (char === '{') {
          braceDepth++;
          if (initialBraceDepth === 0) {
            initialBraceDepth = braceDepth;
          }
        }
        if (char === '}') {
          braceDepth--;
          // When we return to the depth before the method started, we're done
          if (braceDepth < initialBraceDepth) {
            return { start: startLine + 1, end: i + 1 }; // 1-indexed
          }
        }
      }
    }
  }

  return null;
}

const methodNames = [
  'getSignInHTML',
  'getBeforePhotoModalHTML',
  'getBeforePhotosGridHTML',
  'getComparisonModalHTML',
  'getSplitScreenPreviewHTML',
  'getAppHTML',
  'getRoomTabsCarousel',
  'getAllPhotosHTML',
  'getTemplateDisplayName',
  'getTemplateLayoutType',
  'getTemplatePurpose',
  'getTemplateMainTitle',
  'getEnlargedPhotoHTML',
  'getTemplateSelector',
  'getStackModeTemplateSelector',
  'getSideBySideModeTemplateSelector',
  'getPhotosHTML',
  'showSuccessNotification',
  'removeNotification',
  'showUploadSuccessNotification'
];

const results = [];
methodNames.forEach(name => {
  const bounds = findMethodBoundaries(lines, name);
  if (bounds) {
    results.push({
      name,
      start: bounds.start,
      end: bounds.end,
      lines: bounds.end - bounds.start + 1
    });
    console.log(`${name}: lines ${bounds.start}-${bounds.end} (${bounds.end - bounds.start + 1} lines)`);
  } else {
    console.log(`${name}: NOT FOUND`);
  }
});

fs.writeFileSync('method-ranges.json', JSON.stringify(results, null, 2));
console.log('\nTotal methods found:', results.length);