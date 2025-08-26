#!/usr/bin/env node

/**
 * Script to force a complete Vercel redeployment
 * This creates a timestamp file to trigger a fresh deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Forcing Vercel redeployment...');

// Create a deployment timestamp file
const deploymentInfo = {
  timestamp: new Date().toISOString(),
  reason: 'Force redeploy after Git LFS fix',
  gitLfsIssueFixed: true,
  imagesUntracked: 7851,
  deploymentId: Math.random().toString(36).substring(7)
};

const deploymentFile = path.join('public', 'deployment-info.json');
fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));

console.log('✅ Created deployment trigger file:', deploymentFile);
console.log('📊 Deployment info:', deploymentInfo);

// Also update a comment in the Kartell page to ensure it gets rebuilt
const kartellPagePath = 'app/kartell/page.tsx';
let kartellContent = fs.readFileSync(kartellPagePath, 'utf8');

// Add a timestamp comment at the top
const timestamp = new Date().toISOString();
const newComment = `// Last updated: ${timestamp} - Force redeploy after Git LFS fix\n`;

// Check if there's already a timestamp comment and replace it
if (kartellContent.includes('// Last updated:')) {
  kartellContent = kartellContent.replace(/\/\/ Last updated:.*\n/, newComment);
} else {
  kartellContent = newComment + kartellContent;
}

fs.writeFileSync(kartellPagePath, kartellContent);

console.log('✅ Updated Kartell page with deployment timestamp');
console.log('🔄 This should trigger a fresh Vercel deployment that includes all the untracked images');
