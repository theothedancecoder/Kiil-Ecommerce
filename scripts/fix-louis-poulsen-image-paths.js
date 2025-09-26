const fs = require('fs');
const path = require('path');

// Get all actual image files in the Louis Poulsen directory
function getAllImageFiles(dir) {
  const files = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && item !== 'lifestyle') {
        scanDirectory(fullPath);
      } else if (stat.isFile() && (item.endsWith('.webp') || item.endsWith('.jpg') || item.endsWith('.png'))) {
        // Convert to web path
        const webPath = fullPath.replace(path.join(__dirname, '../public'), '').replace(/\\/g, '/');
        files.push({
          fileName: item,
          fullPath: webPath,
          directory: path.dirname(webPath)
        });
      }
    }
  }
  
  scanDirectory(dir);
  return files;
}

// Main function to analyze and suggest fixes
function analyzeImagePaths() {
  const publicDir = path.join(__dirname, '../public/Louis-Poulsen');
  
  if (!fs.existsSync(publicDir)) {
    console.error('Louis Poulsen directory not found in public folder');
    return;
  }
  
  console.log('Scanning Louis Poulsen image files...');
  const actualFiles = getAllImageFiles(publicDir);
  
  console.log(`Found ${actualFiles.length} image files:`);
  
  // Group by directory for easier analysis
  const filesByDir = {};
  actualFiles.forEach(file => {
    const dir = file.directory;
    if (!filesByDir[dir]) {
      filesByDir[dir] = [];
    }
    filesByDir[dir].push(file);
  });
  
  // Print organized results
  Object.keys(filesByDir).sort().forEach(dir => {
    console.log(`\n${dir}:`);
    filesByDir[dir].forEach(file => {
      console.log(`  - ${file.fileName}`);
      console.log(`    Path: ${file.fullPath}`);
    });
  });
  
  // Suggest corrections for common patterns
  console.log('\n=== SUGGESTED CORRECTIONS ===');
  
  // Check for AJ Floor Lamp images
  const ajFloorFiles = actualFiles.filter(f => f.directory.includes('AJ-Floor-Lamp'));
  console.log('\nAJ Floor Lamp images found:');
  ajFloorFiles.forEach(file => {
    console.log(`  "${file.fullPath}",`);
  });
  
  // Check for Panthella 160 images
  const panthella160Files = actualFiles.filter(f => f.directory.includes('Panthella-160'));
  console.log('\nPanthella 160 images found:');
  panthella160Files.forEach(file => {
    console.log(`  "${file.fullPath}",`);
  });
  
  // Check for PH 5 Ceiling lamp images
  const ph5Files = actualFiles.filter(f => f.directory.includes('PH-5-Ceiling-lamp'));
  console.log('\nPH 5 Ceiling lamp images found:');
  ph5Files.forEach(file => {
    console.log(`  "${file.fullPath}",`);
  });
  
  // Check for PH 3/2 Table Lamp images
  const ph32TableFiles = actualFiles.filter(f => f.directory.includes('PH-3:2-Table-Lamp'));
  console.log('\nPH 3/2 Table Lamp images found:');
  ph32TableFiles.forEach(file => {
    console.log(`  "${file.fullPath}",`);
  });
  
  // Check for PH 3/2 Pendant images
  const ph32PendantFiles = actualFiles.filter(f => f.directory.includes('PH-3:2-Pendant'));
  console.log('\nPH 3/2 Pendant images found:');
  ph32PendantFiles.forEach(file => {
    console.log(`  "${file.fullPath}",`);
  });
  
  // Check for PH Artichoke images
  const phArtichokeFiles = actualFiles.filter(f => f.directory.includes('PH-Artichoke'));
  console.log('\nPH Artichoke images found:');
  phArtichokeFiles.forEach(file => {
    console.log(`  "${file.fullPath}",`);
  });
  
  // Check for NJP Floor Lamp images
  const njpFloorFiles = actualFiles.filter(f => f.directory.includes('NJP-Floor-Lamp'));
  console.log('\nNJP Floor Lamp images found:');
  njpFloorFiles.forEach(file => {
    console.log(`  "${file.fullPath}",`);
  });
  
  // Check for NJP Table Lamp images
  const njpTableFiles = actualFiles.filter(f => f.directory.includes('NJP-Table-Lamp'));
  console.log('\nNJP Table Lamp images found:');
  njpTableFiles.forEach(file => {
    console.log(`  "${file.fullPath}",`);
  });
}

// Run the analysis
analyzeImagePaths();
