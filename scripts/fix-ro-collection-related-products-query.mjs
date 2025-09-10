#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const filePath = 'sanity/lib/products/getRoCollectionProducts.ts';

console.log('🔧 Fixing RO Collection related products queries...\n');

// Read the current file
const content = fs.readFileSync(filePath, 'utf8');

// Add slug to related products queries and interface
const updatedContent = content
  // Update all relatedProducts queries to include slug
  .replace(
    /relatedProducts\[\]->\s*{\s*_id,\s*name,\s*price,\s*image\s*{\s*asset->\s*{\s*_id,\s*url\s*}\s*}\s*}/g,
    `relatedProducts[]-> {
        _id,
        name,
        slug,
        price,
        image {
          asset-> {
            _id,
            url
          }
        }
      }`
  )
  // Update the TypeScript interface
  .replace(
    /relatedProducts\?\: Array<{\s*_id: string;\s*name\?: string;\s*price\?: number;\s*image\?: {\s*asset\?: {\s*_id: string;\s*url: string;\s*};\s*};\s*}>;/,
    `relatedProducts?: Array<{
    _id: string;
    name?: string;
    slug?: {
      _type: "slug";
      current?: string;
    };
    price?: number;
    image?: {
      asset?: {
        _id: string;
        url: string;
      };
    };
  }>;`
  );

// Write the updated content back to the file
fs.writeFileSync(filePath, updatedContent);

console.log('✅ Updated RO Collection queries to include slug in related products');
console.log('✅ Updated TypeScript interface to include slug field');
console.log('\n🎉 Related products queries fixed!');
console.log('\n💡 Related products should now display with proper links');
