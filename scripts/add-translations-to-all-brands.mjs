#!/usr/bin/env node

/**
 * Script to add translation support to all brand product client components
 * This adds useLanguage hook and translation keys to all product pages
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Brand configurations
const brands = [
  { name: 'flos', key: 'flos', displayName: 'Flos' },
  { name: 'fredericia', key: 'fredericia', displayName: 'Fredericia' },
  { name: 'kartell', key: 'kartell', displayName: 'Kartell' },
  { name: 'ro-collection', key: 'roCollection', displayName: 'RO Collection' },
  { name: 'dux', key: 'dux', displayName: 'Dux' },
  { name: 'serax', key: 'serax', displayName: 'Serax' },
  { name: 'sibast', key: 'sibast', displayName: 'Sibast' },
  { name: 'soren-lund', key: 'sorenLund', displayName: 'Søren Lund' },
  { name: 'audo-copenhagen', key: 'audoCopenhagen', displayName: 'Audo Copenhagen' },
  { name: 'juul', key: 'juul', displayName: 'Juul' },
  { name: 'louis-poulsen', key: 'louisPoulsen', displayName: 'Louis Poulsen' },
  { name: 'tradition', key: 'tradition', displayName: 'Tradition' },
  { name: 'crafts', key: 'crafts', displayName: 'Crafts' },
];

function updateClientComponent(brandName, brandKey, displayName) {
  const clientPath = path.join(__dirname, '..', 'app', brandName, '[productId]', `${brandName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}ProductClient.tsx`);
  
  if (!fs.existsSync(clientPath)) {
    console.log(`⚠️  Client component not found: ${clientPath}`);
    return false;
  }

  let content = fs.readFileSync(clientPath, 'utf-8');
  
  // Check if already updated
  if (content.includes('useLanguage')) {
    console.log(`✅ ${displayName} client component already has translations`);
    return true;
  }

  // Add import
  if (!content.includes('import { useLanguage }')) {
    content = content.replace(
      /import Header from "@\/components\/Header";/,
      `import Header from "@/components/Header";\nimport { useLanguage } from "@/lib/languageContext";`
    );
  }

  // Add descriptionNo to Product interface
  content = content.replace(
    /description: string;/,
    `description: string;\n  descriptionNo?: string;`
  );

  // Add useLanguage hook and displayDescription logic
  const hookPattern = /export default function \w+ProductClient\([^)]+\) \{/;
  content = content.replace(
    hookPattern,
    (match) => `${match}\n  const { t, language } = useLanguage();\n`
  );

  // Add displayDescription logic after hooks
  const displayDescPattern = /(const \[.*?\] = useState.*?\n)+/;
  content = content.replace(
    displayDescPattern,
    (match) => `${match}\n  // Get description based on language\n  const displayDescription = language === 'no' && product.descriptionNo \n    ? product.descriptionNo \n    : product.description;\n`
  );

  // Replace hardcoded text with translation keys
  content = content.replace(/Back to \w+ Collection/g, `{t('product.back.${brandKey}')}`);
  content = content.replace(/Back to RO Collection/g, `{t('product.back.roCollection')}`);
  content = content.replace(/Back to Søren Lund Collection/g, `{t('product.back.sorenLund')}`);
  content = content.replace(/Back to Audo Copenhagen Collection/g, `{t('product.back.audoCopenhagen')}`);
  content = content.replace(/Back to Louis Poulsen Collection/g, `{t('product.back.louisPoulsen')}`);
  
  content = content.replace(/"Home"/g, `{t('product.breadcrumb.home')}`);
  content = content.replace(/>\s*Home\s*</g, `>{t('product.breadcrumb.home')}<`);
  
  // Replace collection labels
  const collectionPatterns = [
    new RegExp(`${displayName} Collection`, 'g'),
    new RegExp(`${displayName.toUpperCase()} COLLECTION`, 'g'),
    new RegExp(`${displayName.toUpperCase()} Collection`, 'g'),
  ];
  
  collectionPatterns.forEach(pattern => {
    content = content.replace(pattern, `{t('product.collection.${brandKey}')}`);
  });

  // Replace description display
  content = content.replace(
    /{product\.description}/g,
    '{displayDescription}'
  );

  // Replace Features, Specifications, Related Products
  content = content.replace(/"Features"/g, `{t('product.features')}`);
  content = content.replace(/>Features</g, `>{t('product.features')}<`);
  content = content.replace(/"Specifications"/g, `{t('product.specifications')}`);
  content = content.replace(/>Specifications</g, `>{t('product.specifications')}<`);
  content = content.replace(/"Related Products"/g, `{t('product.relatedProducts')}`);
  content = content.replace(/>Related Products</g, `>{t('product.relatedProducts')}<`);
  
  // Replace View All Products buttons
  content = content.replace(
    new RegExp(`View All ${displayName} Products`, 'g'),
    `{t('product.viewAll.${brandKey}')}`
  );
  content = content.replace(
    new RegExp(`View All ${displayName.toUpperCase()} Products`, 'g'),
    `{t('product.viewAll.${brandKey}')}`
  );

  fs.writeFileSync(clientPath, content, 'utf-8');
  console.log(`✅ Updated ${displayName} client component`);
  return true;
}

function updateServerComponent(brandName, brandKey) {
  const serverPath = path.join(__dirname, '..', 'app', brandName, '[productId]', 'page.tsx');
  
  if (!fs.existsSync(serverPath)) {
    console.log(`⚠️  Server component not found: ${serverPath}`);
    return false;
  }

  let content = fs.readFileSync(serverPath, 'utf-8');
  
  // Check if already has convertDescription helper
  if (content.includes('convertDescription')) {
    console.log(`✅ ${brandName} server component already has description conversion`);
    return true;
  }

  // Add convertDescription helper function before the convertedProduct object
  const helperFunction = `
  // Helper function to convert description (handles both string and block content)
  const convertDescription = (desc: any): string => {
    if (typeof desc === 'string') {
      return desc;
    }
    if (Array.isArray(desc)) {
      return desc
        .filter((block: any) => block?._type === 'block' && 'children' in block)
        .map((block: any) => 
          'children' in block && Array.isArray(block.children)
            ? block.children
                .filter((child: any) => child?._type === 'span')
                .map((child: any) => child?.text)
                .join(' ')
            : ''
        )
        .join(' ');
    }
    return '';
  };
`;

  // Find where to insert the helper (before convertedProduct)
  content = content.replace(
    /(\/\/ Convert.*?to.*?Client\n)/,
    `${helperFunction}\n$1`
  );

  // Update description field to use convertDescription
  content = content.replace(
    /description: typeof product\?\.description.*?\n.*?\n.*?\n.*?\n.*?\n.*?\n.*?\n.*?\n.*?\n.*?\n.*?\n.*?\n.*?'Detailed product description available upon request\.',/s,
    `description: convertDescription(product?.description) || 'Detailed product description available upon request.',\n    descriptionNo: convertDescription((product as any)?.descriptionNo) || convertDescription(product?.description) || 'Detaljert produktbeskrivelse tilgjengelig på forespørsel.',`
  );

  fs.writeFileSync(serverPath, content, 'utf-8');
  console.log(`✅ Updated ${brandName} server component`);
  return true;
}

console.log('🚀 Starting translation updates for all brand product pages...\n');

let successCount = 0;
let failCount = 0;

brands.forEach(({ name, key, displayName }) => {
  console.log(`\n📦 Processing ${displayName}...`);
  
  const clientSuccess = updateClientComponent(name, key, displayName);
  const serverSuccess = updateServerComponent(name, key);
  
  if (clientSuccess && serverSuccess) {
    successCount++;
  } else {
    failCount++;
  }
});

console.log(`\n\n✨ Translation update complete!`);
console.log(`✅ Successfully updated: ${successCount} brands`);
console.log(`❌ Failed: ${failCount} brands`);
console.log(`\n📝 Note: Umage and Hay were already updated manually and are not included in this count.`);
