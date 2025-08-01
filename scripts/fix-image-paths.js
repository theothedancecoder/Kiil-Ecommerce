#!/usr/bin/env node

// Script to identify and suggest fixes for problematic image paths
const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing image paths for production compatibility...\n');

// Read the allProducts.ts file
const allProductsPath = path.join(__dirname, '../lib/allProducts.ts');
const content = fs.readFileSync(allProductsPath, 'utf8');

// Extract image paths from the file
const imagePathRegex = /image:\s*['"`]([^'"`]+)['"`]/g;
const imagePaths = [];
let match;

while ((match = imagePathRegex.exec(content)) !== null) {
  imagePaths.push(match[1]);
}

console.log(`Found ${imagePaths.length} image paths to analyze\n`);

// Analyze paths for problematic characters
const problematicPaths = [];
const issues = {
  backticks: [],
  spaces: [],
  specialChars: [],
  longNames: []
};

imagePaths.forEach(imagePath => {
  const problems = [];
  
  // Check for backticks
  if (imagePath.includes('`')) {
    problems.push('backticks');
    issues.backticks.push(imagePath);
  }
  
  // Check for spaces (common issue in production)
  if (imagePath.includes(' ')) {
    problems.push('spaces');
    issues.spaces.push(imagePath);
  }
  
  // Check for other special characters that might cause issues
  const specialCharRegex = /[^a-zA-Z0-9\/\-_\.]/;
  if (specialCharRegex.test(imagePath.replace(/\s/g, ''))) {
    problems.push('special characters');
    issues.specialChars.push(imagePath);
  }
  
  // Check for very long file names
  const fileName = imagePath.split('/').pop();
  if (fileName && fileName.length > 100) {
    problems.push('long filename');
    issues.longNames.push(imagePath);
  }
  
  if (problems.length > 0) {
    problematicPaths.push({
      path: imagePath,
      issues: problems
    });
  }
});

// Report findings
console.log('📊 Analysis Results:');
console.log(`Total paths analyzed: ${imagePaths.length}`);
console.log(`Problematic paths found: ${problematicPaths.length}`);
console.log(`Clean paths: ${imagePaths.length - problematicPaths.length}\n`);

if (issues.backticks.length > 0) {
  console.log(`❌ Paths with backticks (${issues.backticks.length}):`);
  issues.backticks.slice(0, 5).forEach(path => console.log(`   ${path}`));
  if (issues.backticks.length > 5) console.log(`   ... and ${issues.backticks.length - 5} more`);
  console.log('');
}

if (issues.spaces.length > 0) {
  console.log(`⚠️  Paths with spaces (${issues.spaces.length}):`);
  issues.spaces.slice(0, 5).forEach(path => console.log(`   ${path}`));
  if (issues.spaces.length > 5) console.log(`   ... and ${issues.spaces.length - 5} more`);
  console.log('');
}

if (issues.specialChars.length > 0) {
  console.log(`⚠️  Paths with special characters (${issues.specialChars.length}):`);
  issues.specialChars.slice(0, 5).forEach(path => console.log(`   ${path}`));
  if (issues.specialChars.length > 5) console.log(`   ... and ${issues.specialChars.length - 5} more`);
  console.log('');
}

// Provide solutions
console.log('🔧 Recommended Solutions:\n');

console.log('1. **Immediate Fix - URL Encoding**:');
console.log('   Update your ProductionImage component to encode URLs:');
console.log('   ```javascript');
console.log('   const encodedSrc = encodeURI(imageSrc);');
console.log('   ```\n');

console.log('2. **Long-term Fix - Rename Files**:');
console.log('   - Remove backticks (`) from folder names');
console.log('   - Replace spaces with hyphens (-)');
console.log('   - Remove special characters like colons (:)');
console.log('   - Keep file names under 100 characters\n');

console.log('3. **Quick Test**:');
console.log('   Try accessing one of these URLs directly in your browser:');
if (problematicPaths.length > 0) {
  const testPath = problematicPaths[0].path;
  console.log(`   https://your-domain.vercel.app${testPath}`);
  console.log(`   vs encoded:`);
  console.log(`   https://your-domain.vercel.app${encodeURI(testPath)}`);
}

console.log('\n4. **Example Problematic Paths**:');
problematicPaths.slice(0, 3).forEach(item => {
  console.log(`   Original: ${item.path}`);
  console.log(`   Issues: ${item.issues.join(', ')}`);
  console.log(`   Encoded: ${encodeURI(item.path)}`);
  console.log('');
});

console.log('💡 The most likely cause of your production image issues is the');
console.log('   backticks and spaces in your file paths. Try the URL encoding');
console.log('   fix first as it requires no file renaming.');
