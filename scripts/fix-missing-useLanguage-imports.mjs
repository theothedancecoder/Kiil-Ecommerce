import { readFileSync, writeFileSync } from 'fs';

const filesToFix = [
  'app/crafts/[productId]/CraftsProductClient.tsx',
  'app/juul/[...productId]/JuulProductClient.tsx',
  'app/hay/[productId]/HayProductClient.tsx',
  'app/dux/[productId]/DuxProductClient.tsx',
  'app/serax/[productId]/SeraxProductClient.tsx',
];

console.log('Adding missing useLanguage imports...\n');

filesToFix.forEach(filePath => {
  try {
    let content = readFileSync(filePath, 'utf8');
    
    // Check if import already exists
    if (content.includes('import { useLanguage }') || content.includes('import {useLanguage}')) {
      console.log(`⏭️  Skipped (already has import): ${filePath}`);
      return;
    }
    
    // Check if file uses useLanguage
    if (!content.includes('useLanguage()')) {
      console.log(`⏭️  Skipped (doesn't use useLanguage): ${filePath}`);
      return;
    }
    
    // Add import after other imports
    const importStatement = 'import { useLanguage } from "@/lib/languageContext";';
    
    // Find the last import statement
    const lines = content.split('\n');
    let lastImportIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import ')) {
        lastImportIndex = i;
      }
    }
    
    if (lastImportIndex !== -1) {
      lines.splice(lastImportIndex + 1, 0, importStatement);
      content = lines.join('\n');
      writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
    } else {
      console.log(`❌ Could not find import section: ${filePath}`);
    }
  } catch (error) {
    console.log(`❌ Error processing ${filePath}:`, error.message);
  }
});

console.log('\n✅ All files processed!');
