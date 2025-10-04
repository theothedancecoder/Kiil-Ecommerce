# Vitra Migration to Dynamic Routes - Complete Guide

## Overview
Migrated Vitra from static folder structure to dynamic routes with Sanity integration, matching the Sibast implementation pattern.

## What Was Done

### 1. Migration to Sanity ✅
**Script:** `scripts/complete-vitra-migration.mjs`
- Uploaded all 6 Vitra products with images to Sanity
- Products migrated:
  1. Ball Clock - 4 variants
  2. Sunburst Clock - 4 variants  
  3. Noguchi Coffee Table - 3 variants
  4. Panton Chair - 4 variants
  5. Eames RE Plastic Chair DSR - 4 variants
  6. Hang It All - 7 variants
- All main images and variant images uploaded to Sanity CDN

### 2. Sanity Query Functions ✅
**File:** `sanity/lib/products/getVitraProducts.ts`
- `getVitraProducts()` - Fetch all Vitra products
- `getVitraProductBySlug(slug)` - Fetch single product by slug
- Optimized queries with proper image references

### 3. Client Component ✅
**File:** `app/vitra/[productId]/VitraProductClient.tsx`
- Product display with variant selection
- Image gallery with ProductionImage component
- Add to cart functionality
- Related products section
- Features and specifications display

### 4. Still To Do
- [ ] Create `app/vitra/[productId]/page.tsx` (dynamic route)
- [ ] Update `app/vitra/page.tsx` to fetch from Sanity
- [ ] Delete old static product folders
- [ ] Test and deploy

## Implementation Pattern

### Dynamic Route Structure
```
app/vitra/
├── page.tsx (brand page - fetch from Sanity)
└── [productId]/
    ├── page.tsx (server component - force-static + ISR)
    └── VitraProductClient.tsx (client component)
```

### Key Features
- **force-static**: Pages pre-generated at build time
- **ISR**: Revalidate every hour (3600 seconds)
- **No freezing**: Direct product fetching, no getAllProducts()
- **Sanity CDN**: All images from Sanity (no Git LFS)
- **Efficient**: Only fetches Vitra products

## Benefits
1. No production freezing
2. Fast page loads (pre-generated)
3. Scalable architecture
4. Consistent with other brands (Sibast, Fredericia, etc.)
5. Easy to maintain

## Next Steps
1. Create dynamic route page.tsx
2. Update brand page to use Sanity
3. Delete old static folders
4. Deploy to production
