https://kiil-ecommerce.vercel.app/dux/jetson-classic-soft-88
## Issue
Dux production individual pages aren't showing images and variants because they're using hardcoded static data instead of the Sanity-powered DuxProductClient component.

## Plan
- [x] Step 1: Identify the issue (hardcoded data vs Sanity data)
- [x] Step 2: Confirm Sanity data is working (12 products with images and variants)
- [x] Step 3: Update app/dux/[productId]/page.tsx to use DuxProductClient
- [x] Step 4: Test the fix
- [x] Step 5: Verify all Dux product pages work correctly

## Current Status - COMPLETED ✅
- Sanity has 12 DUX products with proper images and variants
- DuxProductClient component exists and works correctly
- Main page.tsx file has been updated to use DuxProductClient instead of hardcoded data
- Fixed query structure in getDuxProducts.ts to use `brand == "DUX"` instead of category lookup
- All tests passing: getDuxProductBySlug function working correctly

## What Was Fixed
1. ✅ Replaced 500+ lines of hardcoded static data in page.tsx with simple DuxProductClient implementation
2. ✅ Fixed query structure in sanity/lib/products/getDuxProducts.ts:
   - Changed from `"dux" in categories[]->slug.current` to `brand == "DUX"`
   - Updated all DUX product queries (getDuxProducts, getDuxTables, getDuxChairs, getDuxProductBySlug)
3. ✅ Verified 12 DUX products exist in Sanity with proper data structure
4. ✅ Confirmed individual product pages now load from Sanity instead of hardcoded data

## Test Results ✅
- ✅ Found 12 DUX products in Sanity
- ✅ getDuxProductBySlug function working correctly
- ✅ Page structure updated (using DuxProductClient, no hardcoded data)
- ✅ Ready for production
