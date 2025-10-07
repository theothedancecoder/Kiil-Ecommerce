import { execSync } from 'child_process';

console.log('🚀 Triggering Vercel redeployment...\n');

try {
  // Create a deployment timestamp file to trigger rebuild
  const timestamp = new Date().toISOString();
  execSync(`echo "${timestamp}" > deployment-timestamp.txt`);
  
  console.log('✅ Created deployment timestamp file');
  console.log('\nNext steps:');
  console.log('1. Commit and push the changes:');
  console.log('   git add .');
  console.log('   git commit -m "feat: add Juul product collection with sale price support"');
  console.log('   git push');
  console.log('\n2. Vercel will automatically redeploy');
  console.log('3. After deployment, the sale price will be visible:');
  console.log('   - Juul 903: Fra kr 35,021 → kr 29,990');
  console.log('\nAlternatively, you can manually trigger a redeploy in Vercel dashboard.');
  
} catch (error) {
  console.error('❌ Error:', error);
}
