import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🧹 Clearing Next.js cache and rebuilding...');

try {
  // Clear Next.js cache
  console.log('🗑️  Clearing .next cache...');
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
    console.log('✅ .next directory removed');
  }

  // Clear node_modules/.cache if it exists
  console.log('🗑️  Clearing node_modules cache...');
  const nodeModulesCache = path.join('node_modules', '.cache');
  if (fs.existsSync(nodeModulesCache)) {
    fs.rmSync(nodeModulesCache, { recursive: true, force: true });
    console.log('✅ node_modules/.cache removed');
  }

  // Update a file to trigger revalidation
  console.log('🔄 Triggering revalidation...');
  const timestamp = new Date().toISOString();
  const revalidationFile = 'public/cache-bust.json';
  fs.writeFileSync(revalidationFile, JSON.stringify({
    timestamp,
    reason: 'Dux images fix - force cache clear',
    duxImagesFix: true
  }, null, 2));
  console.log('✅ Cache bust file created');

  // Build the project
  console.log('🔨 Building Next.js project...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed');

  console.log('\n🎉 Cache cleared and project rebuilt!');
  console.log('📝 Next steps:');
  console.log('   1. The static pages should now be regenerated with the correct image data');
  console.log('   2. Test the individual product pages');
  console.log('   3. If still not working, we may need to check the client-side hydration');

} catch (error) {
  console.error('❌ Error during cache clear and rebuild:', error.message);
  process.exit(1);
}
