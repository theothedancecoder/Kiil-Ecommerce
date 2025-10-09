import { writeFileSync, readFileSync } from 'fs';

const filesToFix = [
  'app/(store)/fredericia/[productId]/FredericiaProductClient.tsx',
  'app/soren-lund/[productId]/SorenLundProductClient.tsx',
  'app/tradition/[productId]/TraditionProductClient.tsx',
  'app/audo-copenhagen/[productId]/AudoCopenhagenProductClient.tsx',
  'app/kartell/[productId]/KartellProductClient.tsx',
  'app/sibast/[productId]/SibastProductClient.tsx',
  'app/umage/[productId]/UmageProductClient.tsx',
  'app/juul/[...productId]/JuulProductClient.tsx',
  'app/hay/[productId]/HayProductClient.tsx',
  'app/crafts/[productId]/CraftsProductClient.tsx',
];

console.log('Fixing descriptionNo errors in all product client files...\n');

filesToFix.forEach(filePath => {
  try {
    let content = readFileSync(filePath, 'utf8');
    
    // Pattern 1: Multi-line descriptionNo check
    const pattern1 = /const displayDescription = language === 'no' && product\??\.descriptionNo\s*\n\s*\? product\.descriptionNo\s*\n\s*: product\??\.description(?: \|\| product\.description)?;/g;
    
    if (pattern1.test(content)) {
      content = content.replace(
        pattern1,
        'const displayDescription = product?.description || product.description;'
      );
      writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
    } else {
      console.log(`⏭️  Skipped (no match): ${filePath}`);
    }
  } catch (error) {
    console.log(`❌ Error fixing ${filePath}:`, error.message);
  }
});

console.log('\n✅ All files processed!');
