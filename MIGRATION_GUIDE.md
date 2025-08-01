# Product Migration to Sanity Guide

This guide walks you through migrating your static product data to Sanity CMS with zero downtime.

## Overview

Your e-commerce site currently uses static product data stored in TypeScript files. This migration will move all products to Sanity CMS while maintaining full backward compatibility.

## Current Status

- ✅ **Sanity Schemas Enhanced** - Product schema now supports all static data fields
- ✅ **Migration Scripts Created** - Ready to transform and upload data
- ✅ **Hybrid Service Layer** - Seamless switching between data sources
- ✅ **Feature Flag System** - Safe testing and rollback capability

## Prerequisites

### 1. Environment Variables

Add these to your `.env.local` file:

```bash
# Sanity Configuration (already exists)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
NEXT_PUBLIC_SANITY_API_VERSION=2025-06-13

# Migration Requirements
SANITY_API_TOKEN=your_write_token_here
USE_SANITY_PRODUCTS=false  # Set to 'true' to enable Sanity products
```

### 2. Get Sanity API Token

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **API** → **Tokens**
4. Create a new token with **Editor** permissions
5. Copy the token to `SANITY_API_TOKEN` in `.env.local`

## Migration Steps

### Phase 1: Data Migration (No Impact)

1. **Install dependencies** (if needed):
   ```bash
   npm install @sanity/client
   ```

2. **Run the migration script**:
   ```bash
   node scripts/migrate-products-to-sanity.js
   ```

   This will:
   - Create all categories in Sanity
   - Transform and upload all ~200+ products
   - Preserve all variant data, pricing, and metadata

3. **Verify in Sanity Studio**:
   - Visit `/studio` on your site
   - Check that products and categories were created
   - Verify product data looks correct

### Phase 2: Image Migration (Optional)

The migration script currently doesn't upload images. You have two options:

**Option A: Keep existing images** (Recommended for testing)
- Images will continue to load from your current paths
- No additional work needed

**Option B: Upload images to Sanity**
- Better performance and CDN delivery
- Requires additional script (can be created if needed)

### Phase 3: Testing (No Impact)

1. **Enable Sanity products in test environment**:
   ```bash
   # In .env.local
   USE_SANITY_PRODUCTS=true
   ```

2. **Test your site**:
   - Browse product pages
   - Test search functionality
   - Verify brand pages work
   - Check product variants display correctly

3. **Compare performance**:
   - Page load times
   - Search responsiveness
   - Overall user experience

### Phase 4: Go Live (Single Switch)

When you're satisfied with testing:

1. **Deploy with Sanity enabled**:
   ```bash
   # In production environment
   USE_SANITY_PRODUCTS=true
   ```

2. **Monitor for issues**:
   - Check error logs
   - Verify all pages load correctly
   - Test critical user flows

### Phase 5: Rollback (If Needed)

If any issues arise:

```bash
# Instant rollback to static data
USE_SANITY_PRODUCTS=false
```

## Benefits After Migration

### For Developers
- ✅ No more code deployments for product updates
- ✅ Better data structure and relationships
- ✅ Powerful query capabilities
- ✅ Image optimization and CDN delivery

### For Content Managers
- ✅ User-friendly Sanity Studio interface
- ✅ Real-time product management
- ✅ Rich media handling
- ✅ Collaborative editing

### For Users
- ✅ Faster page loads (cached queries)
- ✅ Better image performance
- ✅ More consistent data
- ✅ Enhanced search capabilities

## Troubleshooting

### Migration Script Issues

**Error: Missing environment variables**
- Ensure all required env vars are set in `.env.local`
- Restart your development server after adding variables

**Error: Sanity API token invalid**
- Verify token has Editor permissions
- Check project ID and dataset are correct

**Error: Products not appearing**
- Verify `USE_SANITY_PRODUCTS=true` is set
- Check Sanity Studio to confirm products were created
- Look for console errors in browser/server logs

### Runtime Issues

**Products not loading**
- Check network tab for failed Sanity API calls
- Verify Sanity project is accessible
- Ensure API version matches your project

**Images not displaying**
- Images from migration script will be null initially
- Either keep existing image paths or upload to Sanity assets

## Data Structure Comparison

### Before (Static)
```typescript
interface StaticProduct {
  id: string;
  name: string;
  price: number;
  brand: string;
  category: string;
  variants?: ProductVariant[];
  // ... other fields
}
```

### After (Sanity)
```typescript
interface SanityProduct {
  _id: string;
  name: string;
  price: number;
  brand: string;
  categories: Reference[];
  variants: ProductVariant[];
  // ... enhanced fields
}
```

The hybrid service layer handles these differences automatically.

## Next Steps

1. **Run the migration** when you're ready
2. **Test thoroughly** in development
3. **Plan your go-live** timing
4. **Monitor after deployment**

## Support

If you encounter any issues:
1. Check this guide first
2. Look at console logs for specific errors
3. Verify environment variables are correct
4. Test with `USE_SANITY_PRODUCTS=false` to confirm rollback works

The migration is designed to be safe and reversible. Take your time testing before going live!
