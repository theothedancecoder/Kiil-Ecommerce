# 🚀 Sanity Image Migration Guide

This guide will help you migrate your 996MB of static images to Sanity CMS, solving the Vercel deployment size limit issue.

## 📋 Prerequisites

1. **Sanity API Token**: Create a token with write permissions
   - Go to https://sanity.io/manage
   - Select your project
   - Go to API → Tokens
   - Create a new token with "Editor" permissions
   - Copy the token

2. **Environment Variables**: Add to your `.env.local`:
   ```bash
   SANITY_API_TOKEN=your_token_here
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
   ```

## 🔄 Migration Steps

### Step 1: Create Sanity Products
```bash
# Install required dependencies
npm install @sanity/client

# Create products in Sanity from your static data
node scripts/create-sanity-products.js
```

This will:
- ✅ Create categories for your products
- ✅ Create product documents in Sanity
- ✅ Generate image mapping file
- ✅ Preserve all product data (variants, prices, descriptions)

### Step 2: Upload Images to Sanity
```bash
# Preview what will be uploaded (safe to run)
node scripts/migrate-images-to-sanity.js

# When ready, uncomment the upload code in the script and run:
# node scripts/migrate-images-to-sanity.js
```

This will:
- 📤 Upload all 8,454 images to Sanity Assets
- 🔗 Create proper image references
- 📊 Show progress and handle rate limits
- ✅ Update product documents with image references

### Step 3: Update Your Application

The application is already configured to work with Sanity images:
- ✅ `components/ProductionImage.tsx` handles both static and Sanity images
- ✅ `lib/ImageUrl.ts` processes Sanity image URLs
- ✅ `next.config.ts` allows Sanity CDN domain

## 📊 Expected Results

### Before Migration:
- ❌ 996MB public folder (too large for Vercel)
- ❌ 8,454 static image files
- ❌ Images don't load in production
- ❌ Broken product displays

### After Migration:
- ✅ ~50MB deployment size (within Vercel limits)
- ✅ All images served from Sanity CDN
- ✅ Automatic image optimization
- ✅ Fast global image delivery
- ✅ Responsive image variants
- ✅ WebP/AVIF format support

## 🔧 Technical Benefits

1. **Vercel Compatibility**: Deployment size reduced by 95%
2. **Performance**: Sanity CDN provides global image delivery
3. **Optimization**: Automatic format conversion and resizing
4. **Scalability**: No file count limits
5. **Management**: Easy image management through Sanity Studio
6. **Backup**: Images stored securely in Sanity

## 📁 File Structure Changes

### Before:
```
public/
├── Fritz Hansen/           (245MB)
├── HAY/                   (156MB)
├── Kartell/               (98MB)
├── Montana/               (87MB)
└── ... (8,454 files total)
```

### After:
```
public/
├── favicon.ico
└── (other small assets only)

# All product images now in Sanity CMS
```

## 🚨 Important Notes

1. **Backup First**: Make sure you have backups of your images
2. **Test Thoroughly**: Test the migration on a staging environment first
3. **Rate Limits**: The script includes delays to respect Sanity's rate limits
4. **Batch Processing**: Images are uploaded in batches of 5 to avoid timeouts
5. **Error Handling**: Failed uploads are logged and can be retried

## 🔍 Verification Steps

After migration, verify:

1. **Sanity Studio**: Check that images appear in your Sanity project
2. **Product Pages**: Verify images load on product pages
3. **Performance**: Test page load speeds
4. **Responsive**: Check images work on different screen sizes
5. **SEO**: Ensure alt texts and image metadata are preserved

## 🆘 Troubleshooting

### Common Issues:

1. **Rate Limit Errors**: Increase delays in migration script
2. **Large Images**: Sanity has a 100MB per image limit
3. **Token Permissions**: Ensure your token has write access
4. **Network Timeouts**: Run migration in smaller batches

### Support:
- Check Sanity documentation: https://sanity.io/docs
- Review migration logs for specific errors
- Test individual image uploads first

## 📈 Performance Comparison

| Metric | Before (Static) | After (Sanity) |
|--------|----------------|----------------|
| Deployment Size | 996MB | ~50MB |
| Image Load Time | Slow/Broken | Fast (CDN) |
| Format Support | Original only | WebP/AVIF |
| Global Delivery | No | Yes (CDN) |
| Responsive Images | Manual | Automatic |
| Management | File system | Sanity Studio |

## 🎯 Next Steps After Migration

1. **Remove Static Images**: Delete the `public/` image folders
2. **Update Git**: Add large folders to `.gitignore`
3. **Monitor Performance**: Check Core Web Vitals improvement
4. **Optimize Further**: Use Sanity's image transformation features
5. **Content Management**: Train team on Sanity Studio for image management

This migration will solve your production image issues permanently while providing better performance and management capabilities.
