// Force Vercel deployment by making a small change
const fs = require('fs');
const path = require('path');

console.log('🚀 Forcing Vercel deployment...');

// Create a timestamp file to trigger deployment
const timestampFile = path.join(__dirname, '..', 'deployment-timestamp.txt');
const timestamp = new Date().toISOString();

fs.writeFileSync(timestampFile, `Deployment forced at: ${timestamp}\nFLOS individual pages fix deployed`);

console.log('✅ Deployment timestamp file created');
console.log('📝 Timestamp:', timestamp);
console.log('🔄 This should trigger a new Vercel deployment');
