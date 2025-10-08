# Interior Categories Sanity Migration Plan

## Current State Analysis

### Files Using Static Data:
1. `app/(store)/interior/[...category]/page.tsx` - Main category handler
   - Uses static data for: cushions, throws, wall-art, decor, mirrors
   - Uses mixed approach for: lighting (FLOS + Louis Poulsen static)
   - Uses Sanity for: RO Collection tables/chairs, living room furniture
   - Uses `getProductByCategory()` as fallback

### Static Data Files to Replace:
- `lib/cushionsData.ts`
- `lib/throwsData.ts`
- `lib/wallArtData.ts`
- `lib/decorData.ts`
- `lib/mirrorsData.ts`
- `lib/flosProducts.ts` (lighting)
- `lib/louisPoulsenProducts.ts` (lighting)

## Migration Strategy

### Phase 1: Update Category Page to Use Sanity
- [x] Analyze current implementation
- [ ] Create unified Sanity query function for all categories
- [ ] Update `[...category]/page.tsx` to use Sanity exclusively
- [ ] Add proper category mapping
- [ ] Ensure product links work correctly

### Phase 2: Verify Product Data in Sanity
- [ ] Confirm all products have proper categories assigned
- [ ] Verify FLOS products are in Sanity
- [ ] Verify Louis Poulsen products are in Sanity
- [ ] Check Designers Guild products (cushions, throws)
- [ ] Verify decor and mirror products

### Phase 3: Update Helper Functions
- [ ] Update or create `getProductsByCategory()` to handle all cases
- [ ] Add category slug mapping for special cases
- [ ] Ensure proper image URL handling
- [ ] Add stock filtering

### Phase 4: Test Individual Product Pages
- [ ] Verify product links navigate correctly
- [ ] Test brand-specific pages
- [ ] Ensure individual product pages load

### Phase 5: Clean Up
- [ ] Remove unused static data files (after confirming migration)
- [ ] Update imports
- [ ] Test all category pages
- [ ] Deploy and verify production

## Category Mapping

### Categories in Sanity (to verify):
- `dining-chairs` → RO Collection chairs
- `dining-tables` → RO Collection tables  
- `chairs` → Various brands (living room)
- `sofas` → Living room sofas
- `lighting` → FLOS + Louis Poulsen
- `cushions` → Designers Guild
- `throws` → Designers Guild
- `mirrors` → Montana
- `decor` → Various brands
- `wall-art` → Various brands

## Implementation Steps

1. Create enhanced `getProductsByCategory` function
2. Update `[...category]/page.tsx` to use new function
3. Test each category page
4. Verify product links
5. Deploy and test production

## Notes
- All products should already be in Sanity from previous migrations
- Need to ensure proper category assignments
- Product links must point to correct brand pages
- Images must load from Sanity CDN
