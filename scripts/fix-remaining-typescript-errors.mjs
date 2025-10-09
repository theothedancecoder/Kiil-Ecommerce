#!/usr/bin/env node

/**
 * Fix TypeScript errors in ProductClient files where product props might be undefined
 * Add optional chaining and null checks where needed
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const filesToFix = [
  'app/(store)/fredericia/[productId]/FredericiaProductClient.tsx',
  'app/soren-lund/[productId]/SorenLundProductClient.tsx',
  'app/kartell/[productId]/KartellProductClient.tsx',
  'app/audo-copenhagen/[productId]/AudoCopenhagenProductClient.tsx',
  'app/tradition/[productId]/TraditionProductClient.tsx',
  'app/louis-poulsen/[productId]/LouisPoulsenProductClient.tsx',
  'app/sibast/[productId]/SibastProductClient.tsx',
  'app/juul/[...productId]/JuulProductClient.tsx',
  'app/hay/[productId]/HayProductClient.tsx',
  'app/umage/[productId]/UmageProductClient.tsx',
];

console.log('Fixing TypeScript errors in ProductClient files...\n');

let fixedCount = 0;

for (const filePath of filesToFix) {
  const fullPath = join(rootDir, filePath);
  
  try {
    let content = readFileSync(fullPath, 'utf-8');
    
    // Fix: Move displayDescription calculation after any early returns or add optional chaining
    // Pattern: const displayDescription = language === 'no' && product.descriptionNo
    if (content.includes("const displayDescription = language === 'no' && product.descriptionNo")) {
      // Add optional chaining to make it safe
      content = content.replace(
        /const displayDescription = language === 'no' && product\.descriptionNo\s+\? product\.descriptionNo\s+: product\.description;/g,
        "const displayDescription = language === 'no' && product?.descriptionNo \n    ? product.descriptionNo \n    : product?.description || product.description;"
      );
      
      writeFileSync(fullPath, content, 'utf-8');
      console.log(`✅ Fixed: ${filePath}`);
      fixedCount++;
    } else {
      console.log(`⏭️  Skipped (already fixed or different pattern): ${filePath}`);
    }
    
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

console.log(`\n📊 Summary: Fixed ${fixedCount} files`);

if (fixedCount > 0) {
  console.log('\n✅ Files have been fixed! Run npm run build to verify.');
}
