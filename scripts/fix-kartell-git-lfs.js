#!/usr/bin/env node

/**
 * Fix Kartell Git LFS Issues
 * This script specifically untracts Kartell images from Git LFS
 * and adds them back as regular Git files
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🎯 Fixing Kartell Git LFS issues...');

try {
  // Step 1: Get all Kartell LFS tracked files
  console.log('📋 Finding Kartell files tracked by Git LFS...');
  const lfsFiles = execSync('git lfs ls-files', { encoding: 'utf8' })
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      const parts = line.split(' * ');
      return parts.length > 1 ? parts[1] : null;
    })
    .filter(filename => filename && (
      filename.toLowerCase().includes('kartell') ||
      filename.includes('Kartell') ||
      filename.includes('KARTELL')
    ));

  console.log(`📊 Found ${lfsFiles.length} Kartell files tracked by Git LFS`);

  if (lfsFiles.length === 0) {
    console.log('✅ No Kartell LFS files found.');
  } else {
    // Step 2: Untrack Kartell files from LFS
    console.log('🔄 Untracking Kartell files from Git LFS...');
    
    for (const filename of lfsFiles) {
      try {
        execSync(`git lfs untrack "${filename}"`, { stdio: 'pipe' });
        console.log(`   ✓ Untracked: ${filename}`);
      } catch (error) {
        console.warn(`   ⚠️  Could not untrack: ${filename}`);
      }
    }
  }

  // Step 3: Update .gitattributes to prevent future LFS tracking of Kartell files
  console.log('📝 Updating .gitattributes for Kartell files...');
  const gitattributesPath = '.gitattributes';
  
  let content = '';
  if (fs.existsSync(gitattributesPath)) {
    content = fs.readFileSync(gitattributesPath, 'utf8');
  }

  // Add Kartell exclusions if not already present
  const kartellExclusions = [
    '# Kartell image exclusions - prevent LFS tracking',
    'public/Kartell* !filter !diff !merge',
    'public/kartell* !filter !diff !merge',
    'public/ Kartell* !filter !diff !merge',
    'app/kartell* !filter !diff !merge',
    ''
  ];

  const hasKartellExclusions = content.includes('Kartell image exclusions');
  if (!hasKartellExclusions) {
    const newContent = content + '\n' + kartellExclusions.join('\n');
    fs.writeFileSync(gitattributesPath, newContent);
    console.log('   ✓ Added Kartell exclusions to .gitattributes');
  } else {
    console.log('   ✓ Kartell exclusions already present in .gitattributes');
  }

  // Step 4: Add all Kartell files back as regular files
  console.log('📁 Adding Kartell files back as regular Git files...');
  try {
    execSync('git add public/Kartell* public/kartell* public/" Kartell"* app/kartell* .gitattributes', { stdio: 'inherit' });
    console.log('   ✓ Added Kartell files to Git');
  } catch (error) {
    console.log('   ℹ️  Some Kartell files may not exist or are already tracked');
  }

  // Step 5: Check if any Kartell images exist locally
  console.log('🔍 Checking Kartell image directories...');
  const kartellDirs = [
    'public/Kartell -Componibili classic 2',
    'public/kartell-Componibili classic 3',
    'public/ Kartell -Kabuki Hanging',
    'public/ Kartell Kartell -Big Battery',
    'public/Kartell Pumo lamp',
    'public/kartell-kabui floor indoor lamp',
    'public/Kartell H.H.H',
    'public/kartell-furniture'
  ];

  let foundDirs = 0;
  for (const dir of kartellDirs) {
    if (fs.existsSync(dir)) {
      foundDirs++;
      const files = fs.readdirSync(dir);
      console.log(`   ✓ Found: ${dir} (${files.length} files)`);
    } else {
      console.log(`   ❌ Missing: ${dir}`);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   • Untracked ${lfsFiles.length} Kartell files from Git LFS`);
  console.log(`   • Found ${foundDirs}/${kartellDirs.length} Kartell directories`);
  console.log(`   • Updated .gitattributes to prevent future LFS tracking`);
  
  if (foundDirs < kartellDirs.length) {
    console.log(`\n⚠️  Warning: Some Kartell image directories are missing.`);
    console.log(`   This could explain why images aren't showing in production.`);
  }

  console.log('\n✅ Kartell Git LFS fix completed!');
  console.log('💡 Next steps:');
  console.log('   1. Commit these changes: git commit -m "Fix Kartell Git LFS issues"');
  console.log('   2. Push to trigger new deployment: git push origin main');

} catch (error) {
  console.error('❌ Error fixing Kartell Git LFS issues:', error.message);
  process.exit(1);
}
