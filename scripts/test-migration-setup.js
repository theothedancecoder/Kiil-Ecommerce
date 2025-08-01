/**
 * Test script to verify migration setup
 * Run with: node scripts/test-migration-setup.js
 */

// Try to use the client from next-sanity first, fallback to @sanity/client
let createClient;
try {
  createClient = require('next-sanity').createClient;
} catch (error) {
  try {
    createClient = require('@sanity/client').createClient;
  } catch (fallbackError) {
    console.error('❌ Could not import Sanity client. Please install @sanity/client:');
    console.error('npm install @sanity/client');
    process.exit(1);
  }
}
require('dotenv').config({ path: '.env.local' });

// Test configuration
const tests = [
  {
    name: 'Environment Variables',
    test: () => {
      const required = [
        'NEXT_PUBLIC_SANITY_PROJECT_ID',
        'NEXT_PUBLIC_SANITY_DATASET',
        'SANITY_API_TOKEN'
      ];
      
      const missing = required.filter(env => !process.env[env]);
      
      if (missing.length > 0) {
        throw new Error(`Missing environment variables: ${missing.join(', ')}`);
      }
      
      return `All required environment variables are set`;
    }
  },
  {
    name: 'Sanity Connection',
    test: async () => {
      const client = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        useCdn: false,
        token: process.env.SANITY_API_TOKEN,
        apiVersion: '2025-06-13',
      });
      
      // Test connection by fetching project info
      await client.request({ url: '/projects/' + process.env.NEXT_PUBLIC_SANITY_PROJECT_ID });
      
      return 'Successfully connected to Sanity';
    }
  },
  {
    name: 'Static Products Data',
    test: () => {
      try {
        // Try to import the static products - handle both .js and .ts extensions
        let allProducts;
        try {
          // Try .js first (compiled version)
          allProducts = require('../lib/allProducts.js').allProducts;
        } catch (jsError) {
          try {
            // Try .ts (if ts-node is available)
            allProducts = require('../lib/allProducts.ts').allProducts;
          } catch (tsError) {
            // Manual check - verify the file exists and has expected structure
            const fs = require('fs');
            const path = require('path');
            const filePath = path.join(__dirname, '../lib/allProducts.ts');
            
            if (!fs.existsSync(filePath)) {
              throw new Error('allProducts.ts file not found');
            }
            
            const fileContent = fs.readFileSync(filePath, 'utf8');
            
            // Basic validation - check if file contains expected exports
            if (!fileContent.includes('export const getAllProducts') && 
                !fileContent.includes('export const allProducts') &&
                !fileContent.includes('export { allProducts')) {
              throw new Error('allProducts export not found in file');
            }
            
            // Count approximate number of products by counting product objects
            const productMatches = fileContent.match(/{\s*id:\s*['"`]/g);
            const productCount = productMatches ? productMatches.length : 0;
            
            if (productCount === 0) {
              throw new Error('No product objects found in static data file');
            }
            
            return `Found approximately ${productCount} products in static data file (file validation passed)`;
          }
        }
        
        if (!Array.isArray(allProducts)) {
          throw new Error('allProducts is not an array');
        }
        
        if (allProducts.length === 0) {
          throw new Error('No products found in static data');
        }
        
        // Verify product structure
        const sampleProduct = allProducts[0];
        const requiredFields = ['id', 'name', 'price', 'brand', 'category'];
        const missingFields = requiredFields.filter(field => !sampleProduct[field]);
        
        if (missingFields.length > 0) {
          throw new Error(`Sample product missing fields: ${missingFields.join(', ')}`);
        }
        
        return `Found ${allProducts.length} products in static data`;
      } catch (error) {
        throw new Error(`Failed to load static products: ${error.message}`);
      }
    }
  },
  {
    name: 'Sanity Schema',
    test: async () => {
      const client = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        useCdn: false,
        token: process.env.SANITY_API_TOKEN,
        apiVersion: '2025-06-13',
      });
      
      // Check if product and category schemas exist
      const query = '*[_type in ["product", "category"]][0...1]';
      const result = await client.fetch(query);
      
      return `Sanity schema is accessible (found ${result.length} existing documents)`;
    }
  },
  {
    name: 'Write Permissions',
    test: async () => {
      const client = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        useCdn: false,
        token: process.env.SANITY_API_TOKEN,
        apiVersion: '2025-06-13',
      });
      
      // Test write permissions by creating and deleting a test document
      const testDoc = {
        _type: 'category',
        _id: 'test-migration-setup',
        title: 'Test Category',
        slug: { _type: 'slug', current: 'test-category' },
        description: 'Test category for migration setup'
      };
      
      // Create test document
      await client.createOrReplace(testDoc);
      
      // Delete test document
      await client.delete('test-migration-setup');
      
      return 'Write permissions confirmed';
    }
  }
];

// Run all tests
async function runTests() {
  console.log('🧪 Testing Migration Setup...\n');
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      console.log(`⏳ Testing: ${test.name}`);
      const result = await test.test();
      console.log(`✅ ${test.name}: ${result}\n`);
      passed++;
    } catch (error) {
      console.log(`❌ ${test.name}: ${error.message}\n`);
      failed++;
    }
  }
  
  console.log('📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! You\'re ready to run the migration.');
    console.log('\nNext steps:');
    console.log('1. Run: node scripts/migrate-products-to-sanity.js');
    console.log('2. Check Sanity Studio at /studio');
    console.log('3. Set USE_SANITY_PRODUCTS=true to test');
  } else {
    console.log('\n⚠️  Please fix the failing tests before running the migration.');
    process.exit(1);
  }
}

// Run tests if called directly
if (require.main === module) {
  runTests().catch(error => {
    console.error('💥 Test runner failed:', error);
    process.exit(1);
  });
}

module.exports = { runTests };
