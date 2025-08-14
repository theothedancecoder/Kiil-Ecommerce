#!/usr/bin/env node

/**
 * Debug Production Static Files
 * 
 * This script checks if static files are being served correctly in production
 * by making direct HTTP requests to the production URLs.
 */

const https = require('https');

const PRODUCTION_URL = 'https://kiil-ecommerce.vercel.app';

const imagesToTest = [
  '/umage-hero.webp',
  '/umage-banner.webp', 
  '/umage-hero-banner.webp',
  '/umage-banner.jpg',
  '/kiillogo.PNG',
  '/hero-furniture.jpg'
];

function checkImageUrl(imagePath) {
  return new Promise((resolve) => {
    const url = `${PRODUCTION_URL}${imagePath}`;
    console.log(`\n🔍 Checking: ${url}`);
    
    const req = https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const contentLength = res.headers['content-length'];
        const contentType = res.headers['content-type'];
        
        console.log(`   Status: ${res.statusCode}`);
        console.log(`   Content-Type: ${contentType || 'unknown'}`);
        console.log(`   Content-Length: ${contentLength || 'unknown'} bytes`);
        
        if (res.statusCode === 200) {
          if (contentLength && parseInt(contentLength) < 1000) {
            console.log(`   ⚠️  WARNING: File size is suspiciously small (${contentLength} bytes)`);
            console.log(`   📄 First 200 chars of response: ${data.substring(0, 200)}`);
          } else {
            console.log(`   ✅ File appears to be loading correctly`);
          }
        } else {
          console.log(`   ❌ File not found or error`);
        }
        
        resolve({
          path: imagePath,
          status: res.statusCode,
          contentLength: contentLength ? parseInt(contentLength) : 0,
          contentType,
          success: res.statusCode === 200 && (!contentLength || parseInt(contentLength) > 1000)
        });
      });
    });
    
    req.on('error', (err) => {
      console.log(`   ❌ Request failed: ${err.message}`);
      resolve({
        path: imagePath,
        status: 'ERROR',
        contentLength: 0,
        contentType: null,
        success: false,
        error: err.message
      });
    });
    
    req.setTimeout(10000, () => {
      console.log(`   ⏰ Request timed out`);
      req.destroy();
      resolve({
        path: imagePath,
        status: 'TIMEOUT',
        contentLength: 0,
        contentType: null,
        success: false,
        error: 'Request timeout'
      });
    });
  });
}

async function main() {
  console.log('🚀 Debugging Production Static Files');
  console.log('=====================================');
  
  const results = [];
  
  for (const imagePath of imagesToTest) {
    const result = await checkImageUrl(imagePath);
    results.push(result);
  }
  
  console.log('\n📊 SUMMARY');
  console.log('===========');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const corrupted = results.filter(r => r.status === 200 && r.contentLength > 0 && r.contentLength < 1000);
  
  console.log(`✅ Successfully loading: ${successful.length}/${results.length}`);
  console.log(`❌ Failed to load: ${failed.length}/${results.length}`);
  console.log(`⚠️  Potentially corrupted (< 1KB): ${corrupted.length}/${results.length}`);
  
  if (corrupted.length > 0) {
    console.log('\n🚨 CORRUPTED FILES DETECTED:');
    corrupted.forEach(file => {
      console.log(`   ${file.path}: ${file.contentLength} bytes`);
    });
    console.log('\nThis confirms the Vercel static file corruption issue!');
  }
  
  if (failed.length > 0) {
    console.log('\n❌ FAILED FILES:');
    failed.forEach(file => {
      console.log(`   ${file.path}: ${file.status} ${file.error || ''}`);
    });
  }
  
  if (successful.length > 0) {
    console.log('\n✅ WORKING FILES:');
    successful.forEach(file => {
      console.log(`   ${file.path}: ${file.contentLength} bytes`);
    });
  }
}

main().catch(console.error);
