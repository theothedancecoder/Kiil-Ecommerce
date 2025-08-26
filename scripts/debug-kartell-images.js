#!/usr/bin/env node

/**
 * Script to debug and verify Kartell image paths
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Debugging Kartell image paths...');

// Check if Kartell directories exist
const publicDir = 'public';
const kartellDirs = [
  'Kartell -Componibili classic 2',
  'kartell-Componibili classic 3',
  ' Kartell -Kabuki Hanging ',
  ' Kartell Kartell -Big Battery ',
  'Kartell Pumo lamp',
  'kartell-kabui floor indoor lamp',
  'Kartell H.H.H ',
  'kartell-furniture'
];

console.log('\n📁 Checking Kartell directories:');
kartellDirs.forEach(dir => {
  const fullPath = path.join(publicDir, dir);
  const exists = fs.existsSync(fullPath);
  console.log(`${exists ? '✅' : '❌'} ${dir} - ${exists ? 'EXISTS' : 'NOT FOUND'}`);
  
  if (exists) {
    try {
      const files = fs.readdirSync(fullPath);
      console.log(`   📄 Files: ${files.length} (${files.slice(0, 3).join(', ')}${files.length > 3 ? '...' : ''})`);
    } catch (error) {
      console.log(`   ❌ Error reading directory: ${error.message}`);
    }
  }
});

// Check specific image paths from the Kartell page
const imagePaths = [
  '/Kartell -Componibili classic 2/Red.webp',
  '/kartell-Componibili classic 3/blue.webp',
  '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - Green.webp',
  '/ Kartell Kartell -Big Battery /light blue.webp',
  '/Kartell Pumo lamp/AMBER.webp',
  '/kartell-kabui floor indoor lamp/crystal.webp',
  '/Kartell H.H.H /Orange.webp',
  '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/sage.webp'
];

console.log('\n🖼️  Checking specific image paths:');
imagePaths.forEach(imagePath => {
  const fullPath = path.join(publicDir, imagePath.substring(1)); // Remove leading slash
  const exists = fs.existsSync(fullPath);
  console.log(`${exists ? '✅' : '❌'} ${imagePath} - ${exists ? 'EXISTS' : 'NOT FOUND'}`);
});

// Check for alternative paths or similar files
console.log('\n🔍 Looking for alternative paths...');

// Check if there are any Kartell-related directories we might have missed
const allDirs = fs.readdirSync(publicDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)
  .filter(name => name.toLowerCase().includes('kartell'));

console.log('\n📂 All Kartell-related directories found:');
allDirs.forEach(dir => {
  console.log(`   📁 ${dir}`);
});

// Check the lifestyle images directory
const lifestylePaths = [
  '/kartell-furniture/PLASTIC LIFESTYLE/Kartell_Cassinella19592.jpg',
  '/kartell-furniture/PLASTIC LIFESTYLE/OUTDOOR-LIBERTY_181.jpg'
];

console.log('\n🎨 Checking lifestyle images:');
lifestylePaths.forEach(imagePath => {
  const fullPath = path.join(publicDir, imagePath.substring(1));
  const exists = fs.existsSync(fullPath);
  console.log(`${exists ? '✅' : '❌'} ${imagePath} - ${exists ? 'EXISTS' : 'NOT FOUND'}`);
});

console.log('\n✅ Kartell image debugging completed!');
