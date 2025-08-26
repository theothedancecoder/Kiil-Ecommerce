#!/usr/bin/env node

/**
 * Script to fix Git LFS issues for all brand images
 * This script will:
 * 1. Update .gitattributes to exclude all brand directories from LFS
 * 2. Untrack all brand images from Git LFS
 * 3. Add them back as regular files
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Starting comprehensive Git LFS fix for all brand images...');

// List of all brand directories that should be excluded from Git LFS
const brandDirectories = [
  // Public brand directories
  'public/Louis-Poulsen/*',
  'public/Louis[[:space:]]Poulsen-[[:space:]]Panthella[[:space:]]160[[:space:]]oppladbar[[:space:]]/*',
  'public/Montana/*',
  'public/Montana-*/*',
  'public/Fritz[[:space:]]Hansen/*',
  'public/Fritz-Hansen/*',
  'public/Kartell/*',
  'public/kartell-*/*',
  'public/FLOS/*',
  'public/Flos[[:space:]]IC[[:space:]]Lights[[:space:]]/*',
  'public/Fredericia[[:space:]]/*',
  'public/fredericia/*',
  'public/fredericia-processed/*',
  'public/umage/*',
  'public/Vitra/*',
  'public/HAY/*',
  'public/Serax/*',
  'public/&Tradition/*',
  'public/&traditions./*',
  'public/Sibast-Furniture/*',
  'public/Ro-Collection/*',
  'public/Soren-Lund/*',
  'public/dux/*',
  'public/Audo-Copenhagen/*',
  'public/Enzo-de-Gasperi/*',
  'public/Designers-Guild/*',
  'public/Artwood/*',
  'public/ClassiCon/*',
  'public/Crafts/*',
  'public/Eldvarm[[:space:]]Emma[[:space:]]lantern[[:space:]]/*',
  'public/Essem[[:space:]]Design[[:space:]]Mama[[:space:]]Knagg[[:space:]]/*',
  'public/Juul[[:space:]]903/*',
  'public/Missoni[[:space:]]Home*/*',
  'public/Moooi/*',
  'public/Nordan*/*',
  'public/Outdoor/*',
  'public/Palissade*/*',
  'public/Skagerak*/*',
  'public/Skogsberg*/*',
  'public/VIPP/*',
  'public/interior-collection/*',
  'public/outdoor-collection/*',
  'public/sales/*',
  
  // App directories
  'app/(store)/*',
  'app/fritz-hansen/*',
  'app/montana/*'
];

try {
  // Read current .gitattributes
  const gitattributesPath = '.gitattributes';
  let gitattributesContent = '';
  
  if (fs.existsSync(gitattributesPath)) {
    gitattributesContent = fs.readFileSync(gitattributesPath, 'utf8');
  }

  console.log('📝 Updating .gitattributes file...');
  
  // Add exclusions for all brand directories
  const exclusions = brandDirectories.map(dir => `${dir} !text !filter !merge !diff`).join('\n');
  
  // Check if exclusions already exist to avoid duplicates
  const newExclusions = brandDirectories.filter(dir => 
    !gitattributesContent.includes(dir)
  ).map(dir => `${dir} !text !filter !merge !diff`);
  
  if (newExclusions.length > 0) {
    gitattributesContent += '\n' + newExclusions.join('\n') + '\n';
    fs.writeFileSync(gitattributesPath, gitattributesContent);
    console.log(`✅ Added ${newExclusions.length} new exclusions to .gitattributes`);
  } else {
    console.log('✅ All exclusions already present in .gitattributes');
  }

  console.log('🔄 Untracking all brand images from Git LFS...');
  
  // Get all LFS tracked files
  const lfsFiles = execSync('git lfs ls-files', { encoding: 'utf8' });
  const lfsFileList = lfsFiles.split('\n').filter(line => line.trim());
  
  console.log(`📊 Found ${lfsFileList.length} files tracked by Git LFS`);
  
  // Filter for brand-related files
  const brandFiles = lfsFileList.filter(line => {
    const filePath = line.split(' * ')[1];
    if (!filePath) return false;
    
    return filePath.includes('public/') && (
      filePath.includes('Montana') ||
      filePath.includes('Fritz') ||
      filePath.includes('Kartell') ||
      filePath.includes('FLOS') ||
      filePath.includes('Fredericia') ||
      filePath.includes('umage') ||
      filePath.includes('Vitra') ||
      filePath.includes('HAY') ||
      filePath.includes('Serax') ||
      filePath.includes('&Tradition') ||
      filePath.includes('Sibast') ||
      filePath.includes('Ro-Collection') ||
      filePath.includes('Soren-Lund') ||
      filePath.includes('dux') ||
      filePath.includes('Audo') ||
      filePath.includes('Enzo') ||
      filePath.includes('Designers') ||
      filePath.includes('Artwood') ||
      filePath.includes('ClassiCon') ||
      filePath.includes('Crafts') ||
      filePath.includes('Eldvarm') ||
      filePath.includes('Essem') ||
      filePath.includes('Juul') ||
      filePath.includes('Missoni') ||
      filePath.includes('Moooi') ||
      filePath.includes('Nordan') ||
      filePath.includes('Outdoor') ||
      filePath.includes('Palissade') ||
      filePath.includes('Skagerak') ||
      filePath.includes('Skogsberg') ||
      filePath.includes('VIPP') ||
      filePath.includes('interior-collection') ||
      filePath.includes('outdoor-collection') ||
      filePath.includes('sales')
    );
  });
  
  console.log(`🎯 Found ${brandFiles.length} brand-related files in Git LFS`);
  
  if (brandFiles.length > 0) {
    // Untrack files from LFS in batches to avoid command line length limits
    const batchSize = 50;
    for (let i = 0; i < brandFiles.length; i += batchSize) {
      const batch = brandFiles.slice(i, i + batchSize);
      const filePaths = batch.map(line => `"${line.split(' * ')[1]}"`).join(' ');
      
      try {
        execSync(`git lfs untrack ${filePaths}`, { stdio: 'inherit' });
        console.log(`✅ Untracked batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(brandFiles.length/batchSize)}`);
      } catch (error) {
        console.warn(`⚠️  Warning: Could not untrack batch ${Math.floor(i/batchSize) + 1}: ${error.message}`);
      }
    }
  }

  console.log('📦 Adding all brand directories back as regular files...');
  
  // Add all brand directories back as regular files
  const addCommands = [
    'git add public/Montana/',
    'git add public/Montana-*/',
    'git add "public/Fritz Hansen/"',
    'git add public/Fritz-Hansen/',
    'git add public/Kartell/',
    'git add public/kartell-*/',
    'git add public/FLOS/',
    'git add "public/Flos IC Lights"*/',
    'git add "public/Fredericia /"',
    'git add public/fredericia/',
    'git add public/fredericia-processed/',
    'git add public/umage/',
    'git add public/Vitra/',
    'git add public/HAY/',
    'git add public/Serax/',
    'git add public/&Tradition/',
    'git add public/&traditions./',
    'git add public/Sibast-Furniture/',
    'git add public/Ro-Collection/',
    'git add public/Soren-Lund/',
    'git add public/dux/',
    'git add public/Audo-Copenhagen/',
    'git add public/Enzo-de-Gasperi/',
    'git add public/Designers-Guild/',
    'git add public/Artwood/',
    'git add public/ClassiCon/',
    'git add public/Crafts/',
    'git add "public/Eldvarm Emma lantern /"',
    'git add "public/Essem Design Mama Knagg /"',
    'git add "public/Juul 903/"',
    'git add "public/Missoni Home"*/',
    'git add public/Moooi/',
    'git add public/Nordan*/',
    'git add public/Outdoor/',
    'git add public/Palissade*/',
    'git add public/Skagerak*/',
    'git add public/Skogsberg*/',
    'git add public/VIPP/',
    'git add public/interior-collection/',
    'git add public/outdoor-collection/',
    'git add public/sales/',
    'git add .gitattributes'
  ];

  for (const command of addCommands) {
    try {
      execSync(command, { stdio: 'inherit' });
    } catch (error) {
      console.warn(`⚠️  Warning: Could not execute "${command}": ${error.message}`);
    }
  }

  console.log('✅ Git LFS fix completed successfully!');
  console.log('');
  console.log('📋 Summary:');
  console.log(`   • Updated .gitattributes with brand exclusions`);
  console.log(`   • Untracked ${brandFiles.length} files from Git LFS`);
  console.log(`   • Added brand directories back as regular files`);
  console.log('');
  console.log('🚀 Next steps:');
  console.log('   1. Review the changes with: git status');
  console.log('   2. Commit the changes with: git commit -m "Fix Git LFS issues for all brand images"');
  console.log('   3. Push to GitHub with: git push origin main');

} catch (error) {
  console.error('❌ Error during Git LFS fix:', error.message);
  process.exit(1);
}
