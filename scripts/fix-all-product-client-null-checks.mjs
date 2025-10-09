#!/usr/bin/env node

/**
 * Fix all ProductClient files that have displayDescription calculated before null check
 * This causes TypeScript errors: 'product' is possibly 'null'
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const filesToFix = [
  'app/ro-collection/[productId]/ROCollectionProductClient.tsx',
  'app/(store)/fredericia/[productId]/FredericiaProductClient.tsx',
  'app/soren-lund/[productId]/SorenLundProductClient.tsx',
  'app/kartell/[productId]/KartellProductClient.tsx',
  'app/audo-copenhagen/[productId]/AudoCopenhagenProductClient.tsx',
  'app/tradition/[productId]/TraditionProductClient.tsx',
  'app/louis-poulsen/[productId]/LouisPoulsenProductClient.tsx',
  'app/sibast/[productId]/SibastProductClient.tsx',
  'app/serax/[productId]/SeraxProductClient.tsx',
  'app/juul/[...productId]/JuulProductClient.tsx',
  'app/hay/[productId]/HayProductClient.tsx',
  'app/umage/[productId]/UmageProductClient.tsx',
];

console.log('Fixing ProductClient files with null check issues...\n');

let fixedCount = 0;
let errorCount = 0;

for (const filePath of filesToFix) {
  const fullPath = join(rootDir, filePath);
  
  try {
    let content = readFileSync(fullPath, 'utf-8');
    
    // Pattern 1: displayDescription before null check
    const pattern1 = /(\s+const \[product, setProduct\] = useState<[^>]+>\(null\);)\s+\/\/ Get description based on language\s+const displayDescription = language === 'no' && product\.descriptionNo\s+\? product\.descriptionNo\s+: product\.description;\s+(const \[selectedVariantIndex)/g;
    
    // Pattern 2: displayDescription before null check (without comment)
    const pattern2 = /(\s+const \[product, setProduct\] = useState<[^>]+>\(null\);)\s+const displayDescription = language === 'no' && product\.descriptionNo\s+\? product\.descriptionNo\s+: product\.description;\s+(const \[selectedVariantIndex)/g;
    
    let modified = false;
    
    if (pattern1.test(content)) {
      content = content.replace(pattern1, '$1\n  $2');
      modified = true;
    } else if (pattern2.test(content)) {
      content = content.replace(pattern2, '$1\n  $2');
      modified = true;
    }
    
    if (modified) {
      // Now add the displayDescription after the null check
      const nullCheckPattern = /(if \(!product\) \{\s+return[^}]+\}\s+)/;
      
      if (nullCheckPattern.test(content)) {
        content = content.replace(
          nullCheckPattern,
          '$1\n  // Get description based on language\n  const displayDescription = language === \'no\' && product.descriptionNo \n    ? product.descriptionNo \n    : product.description;\n\n  '
        );
      }
      
      writeFileSync(fullPath, content, 'utf-8');
      console.log(`✅ Fixed: ${filePath}`);
      fixedCount++;
    } else {
      console.log(`⏭️  Skipped (no pattern match): ${filePath}`);
    }
    
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    errorCount++;
  }
}

console.log(`\n📊 Summary:`);
console.log(`   Fixed: ${fixedCount}`);
console.log(`   Errors: ${errorCount}`);
console.log(`   Total: ${filesToFix.length}`);

if (fixedCount > 0) {
  console.log('\n✅ All files have been fixed! Run npm run build to verify.');
} else {
  console.log('\n⚠️  No files were modified. They may already be fixed or have a different pattern.');
}
