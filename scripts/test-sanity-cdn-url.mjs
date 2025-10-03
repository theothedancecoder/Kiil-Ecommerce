// Test if Sanity CDN URLs are accessible
const testUrl = 'https://cdn.sanity.io/images/hi84i3u4/production/d346dba946c65b45ed470f60fe66e2cdede0176f-960x960.webp';

console.log('Testing Sanity CDN URL:', testUrl);

fetch(testUrl)
  .then(response => {
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      console.log('✅ Image URL is accessible!');
    } else {
      console.log('❌ Image URL returned error:', response.status);
    }
  })
  .catch(error => {
    console.error('❌ Fetch error:', error);
  });
