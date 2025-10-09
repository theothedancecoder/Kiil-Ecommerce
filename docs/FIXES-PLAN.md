# Fixes Plan for E-commerce Site

## Issues to Fix:

### 1. ✅ Hamburger Navigation on Mobile
**Status:** Already implemented
- The `MobileMenu.tsx` component is already working with hamburger icon
- Shows on mobile devices (< md breakpoint)
- No action needed

### 2. "All Products" Text Translation
**Status:** Needs fixing
**Files to update:**
- `app/crafts/page.tsx` - Line with `"All Products"`
- `app/jonas-ihreborn/page.tsx` - Line with `"All Products"`  
- `app/tradition/page.tsx` - Line with `"All Products"`
- `app/tradition/page-old.tsx` - Line with `"All Products"`
- Any other brand pages with hardcoded "All Products"

**Solution:**
- Add translation key to `lib/languageContext.tsx`: `'common.allProducts': 'All Products'` / `'Alle Produkter'`
- Replace hardcoded strings with `t('common.allProducts')`
- Ensure `useLanguage()` hook is imported

### 3. Out of Stock Products - Enable Add to Cart
**Status:** Needs fixing
**File:** `components/ProductThumbWithStock.tsx`

**Current behavior:**
- Shows "Out of Stock" button (disabled)
- Prevents adding to cart

**Required behavior:**
- Always show "Add to Cart" button (enabled)
- Allow users to add out-of-stock products to cart
- Remove stock checking logic that disables the button

**Changes needed:**
- Remove `isOutOfStock` check from button disabled state
- Change button text to always show "Add to Cart" (with translation)
- Remove conditional styling based on stock status
- Keep quantity selector always enabled

### 4. How to Update Product Prices/Add Products in Sanity

**Documentation needed:**

#### A. Updating Product Prices:
1. Go to Sanity Studio: `https://your-site.sanity.studio` or run `npm run dev` locally
2. Navigate to "Products" in the sidebar
3. Find the product you want to update
4. Click on the product to open it
5. Update the "Price" field
6. Click "Publish" to save changes
7. Changes will appear on the website within 60 seconds (due to revalidation)

#### B. Adding New Products Manually:
1. Go to Sanity Studio
2. Click "Products" in sidebar
3. Click "Create new Product" button
4. Fill in required fields:
   - Name (required)
   - Slug (auto-generated from name)
   - Price (required)
   - Brand (required)
   - Description
   - Image (upload or select from media library)
   - Categories (select applicable categories)
   - Stock quantity (optional)
5. Click "Publish"

#### C. Bulk Import Products:
- Use the scripts in `/scripts` folder
- Example: `scripts/migrate-[brand]-to-sanity.mjs`
- Modify script with your product data
- Run: `node scripts/your-script.mjs`

## Implementation Order:

1. Fix "All Products" translation (15 min)
2. Fix "Out of Stock" button behavior (10 min)
3. Create Sanity documentation (already done above)

## Testing Checklist:

- [ ] Test language toggle switches "All Products" text
- [ ] Test out-of-stock products can be added to cart
- [ ] Test mobile hamburger menu still works
- [ ] Test on different screen sizes
- [ ] Verify Sanity product updates reflect on site
