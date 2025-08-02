# Static Products to Sanity Migration Guide

This guide explains how to migrate all static products from `lib/allProducts.ts` to Sanity CMS to resolve Vercel static image loading issues.

## Overview

Currently, your e-commerce site loads products from two sources:
1. **Sanity CMS** (149 products) - Primary source
2. **Static files** (`lib/allProducts.ts`) - Fallback/additional products

The goal is to migrate ALL products to load exclusively from Sanity, including their images.

## Prerequisites

1. **Sanity API Token**: You need a Sanity API token with write permissions
   - Go to [Sanity Manage](https://sanity.io/manage)
   - Select your project
   - Go to API → Tokens
   - Create a new token with "Editor" permissions
   - Add it to your `.env.local` file:
     ```
     SANITY_API_TOKEN=your_token_here
     ```

## Migration Process

### Step 1: Run the Migration Script

```bash
node scripts/migrate-static-products-to-sanity.js
```

This script will:
- ✅ Read all static products from `lib/allProducts.ts`
- 📥 Upload all product images to Sanity
- 📥 Upload all variant images to Sanity
- 📥 Upload all lifestyle images to Sanity
- 🏷️ Create categories as needed
- 💾 Create product documents in Sanity
- ⏭️ Skip products that already exist

### Step 2: Verify Migration

```bash
node scripts/test-sanity-products.js
```

This will show you the total number of products now in Sanity.

### Step 3: Test the Products Page

Visit `http://localhost:3000/products` to verify all products are loading correctly.

## What Gets Migrated

### Product Data
- ✅ Product name, description, price
- ✅ Brand information
- ✅ Categories (created automatically)
- ✅ Product URLs/slugs
- ✅ Stock information

### Images
- ✅ Main product images
- ✅ All variant images (color, material, size options)
- ✅ Lifestyle/context images
- ✅ Proper alt text for accessibility

### Variants
- ✅ Color options
- ✅ Material options
- ✅ Size options
- ✅ Variant-specific pricing

## Benefits After Migration

1. **🚀 Faster Loading**: All images served from Sanity CDN
2. **🔧 No Vercel Issues**: No more static image loading problems
3. **📱 Responsive Images**: Automatic image optimization
4. **✏️ Easy Management**: Edit products through Sanity Studio
5. **🔄 Consistent Data**: Single source of truth for all products

## File Changes Made

### Modified Files
- `components/ProductsView.tsx` - Removed static product fallback
- `app/(store)/products/page.tsx` - Now loads only from Sanity

### New Files
- `scripts/migrate-static-products-to-sanity.js` - Migration script
- `docs/static-to-sanity-migration-guide.md` - This guide

## Post-Migration Cleanup (Optional)

After verifying everything works correctly, you can:

1. **Remove static products file**:
   ```bash
   # Backup first
   mv lib/allProducts.ts lib/allProducts.ts.backup
   ```

2. **Remove unused imports** in components that referenced static products

3. **Update any hardcoded references** to static product data

## Troubleshooting

### Missing Images
If some images fail to upload:
- Check that image files exist in the `public` directory
- Verify image URLs are accessible
- Check Sanity project permissions

### Duplicate Products
The script automatically skips existing products. If you need to re-migrate:
- Delete products from Sanity Studio first
- Or modify the script to update existing products

### API Rate Limits
The script includes delays between uploads. If you hit rate limits:
- Increase the delay in the script (line with `setTimeout`)
- Run the script in smaller batches

## Verification Checklist

- [ ] All static products appear in Sanity Studio
- [ ] Product images load correctly on the website
- [ ] Variant images display properly
- [ ] Product filtering and sorting work
- [ ] Individual product pages load correctly
- [ ] No console errors related to missing images

## Support

If you encounter issues:
1. Check the console output for specific error messages
2. Verify your Sanity API token has correct permissions
3. Ensure all required environment variables are set
4. Test with a small subset of products first
