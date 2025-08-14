# Complete Static to Sanity Migration Guide

This guide will help you migrate all remaining static products from `lib/allProducts.ts` to Sanity CMS, solving the production image issues.

## 🎯 Goal

Migrate all static products to Sanity CMS so that:
- ✅ Images work reliably in production (served from Sanity CDN)
- ✅ All products are managed through Sanity Studio
- ✅ No more static image path issues on Vercel

## 📊 Current Status

- **✅ Already Migrated:** UMAGE, FLOS, Fredericia (149+ products)
- **⏳ Pending Migration:** HAY, Fritz Hansen, Kartell, Montana, Vitra, DUX, Eilersen, Soren Lund, &Tradition, Audo Copenhagen, RO Collection, Jonas Ihreborn, Juul, Sibast Furniture

## 🚀 Migration Process

### Step 1: Check Current Status

First, verify what needs to be migrated:

```bash
node scripts/verify-migration-status.js
```

This will show you:
- How many products are in each brand
- Which brands are complete vs pending
- Products with missing images

### Step 2: Run the Migration

Execute the comprehensive migration script:

```bash
node scripts/migrate-remaining-static-products.js
```

**What this script does:**
- ✅ Processes products one by one (no freezing)
- ✅ Skips already migrated brands (UMAGE, FLOS, Fredericia)
- ✅ Uploads all images to Sanity CDN
- ✅ Creates categories automatically
- ✅ Handles variants and lifestyle images
- ✅ Provides detailed progress reporting
- ✅ Includes error handling and retry logic

### Step 3: Verify Migration Results

After migration, check the results:

```bash
node scripts/verify-migration-status.js
```

### Step 4: Enable Sanity Products

Once migration is complete, update your environment:

```bash
# In .env.local
USE_SANITY_PRODUCTS=true
```

### Step 5: Test Your Site

1. **Local Testing:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000/products` to verify all products load correctly.

2. **Production Testing:**
   Deploy to Vercel and verify images work in production.

## 🔧 Migration Script Features

### Smart Processing
- **One-by-one processing:** Avoids memory issues and freezing
- **Duplicate detection:** Skips products that already exist
- **Brand filtering:** Automatically skips already migrated brands
- **Progress tracking:** Shows current progress and ETA

### Image Handling
- **Automatic upload:** Uploads images from `/public` folder to Sanity CDN
- **Variant images:** Handles all product variant images
- **Lifestyle images:** Migrates additional product photos
- **Error handling:** Continues migration even if some images fail
- **Alt text:** Automatically generates appropriate alt text

### Category Management
- **Auto-creation:** Creates categories automatically from static data
- **Slug generation:** Creates URL-friendly category slugs
- **Duplicate prevention:** Reuses existing categories when possible

### Data Integrity
- **Complete product data:** Migrates all product fields
- **Variant preservation:** Maintains all color/material/size variants
- **Price handling:** Preserves base prices and variant-specific pricing
- **Stock management:** Sets reasonable default stock levels

## 📁 Files Created/Modified

### New Scripts
- `scripts/migrate-remaining-static-products.js` - Main migration script
- `scripts/verify-migration-status.js` - Status verification script
- `docs/complete-static-to-sanity-migration-guide.md` - This guide

### Key Features of Migration Script

```javascript
// Example of what gets migrated for each product:
{
  _id: 'hay-dont-leave-me-dlm-side-table',
  _type: 'product',
  name: "Don't Leave Me - DLM Side Table",
  slug: { current: 'dont-leave-me-dlm-side-table' },
  image: { /* Sanity CDN image */ },
  description: 'Playful and functional side table...',
  price: 2649,
  brand: 'HAY',
  categories: [{ _ref: 'category-tables-id' }],
  variants: [
    {
      name: 'Black',
      image: { /* Sanity CDN image */ },
      color: 'Black',
      price: 2649
    }
    // ... more variants
  ],
  lifestyleImages: [
    { /* Sanity CDN lifestyle images */ }
  ],
  stock: 10,
  inStock: true
}
```

## 🚨 Troubleshooting

### Common Issues

**1. "Image not found" warnings**
- Some static images may be missing from `/public` folder
- Script continues and logs warnings
- Products are still created without the missing images

**2. "Category creation failed"**
- Check Sanity API token permissions
- Ensure token has write access to your dataset

**3. "Product already exists"**
- Script automatically skips existing products
- This is normal behavior, not an error

**4. Migration stops/freezes**
- The script processes one product at a time to prevent this
- If it still happens, check your network connection
- Restart the script - it will skip already migrated products

### Verification Commands

```bash
# Check migration status
node scripts/verify-migration-status.js

# Test Sanity connection
node scripts/test-sanity-products.js

# Check environment variables
node scripts/test-env-vars.js
```

## 📈 Expected Results

After successful migration:

- **~200+ products** migrated to Sanity
- **All images** served from Sanity CDN
- **Categories** automatically created
- **Variants** preserved with images
- **Production images** working reliably

## 🎉 Post-Migration Steps

1. **Set environment variable:**
   ```
   USE_SANITY_PRODUCTS=true
   ```

2. **Test locally:**
   ```bash
   npm run dev
   ```

3. **Deploy to production:**
   ```bash
   vercel --prod
   ```

4. **Verify production images work**

5. **Optional cleanup:**
   - Remove static product files (after confirming everything works)
   - Update components to remove static fallbacks

## 💡 Benefits After Migration

- ✅ **Reliable production images** - No more Vercel static file issues
- ✅ **Faster loading** - Images served from Sanity's global CDN
- ✅ **Easy management** - Edit products through Sanity Studio
- ✅ **Automatic optimization** - Sanity handles image resizing/optimization
- ✅ **Consistent data** - Single source of truth for all products
- ✅ **Better SEO** - Proper image alt tags and metadata

## 🔗 Related Files

- `lib/allProducts.ts` - Static product data (source)
- `sanity/schemaTypes/productType.ts` - Product schema
- `sanity/lib/products/getAllProducts.ts` - Sanity product queries
- `components/ProductionImage.tsx` - Image component
- `lib/ImageUrl.ts` - Image URL helpers

---

**Need help?** Check the console output during migration for detailed progress and error information.
