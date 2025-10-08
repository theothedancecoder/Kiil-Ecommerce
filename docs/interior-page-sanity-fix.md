# Interior Page Sanity Integration Fix

## Problem
The interior page at `/interior` was displaying hardcoded mock products instead of fetching real products from Sanity CMS. This caused the production site to show incorrect or outdated product information.

## Solution
Converted the interior page to fetch real products from Sanity using the existing `getAllProducts()` function.

## Changes Made

### 1. Updated `app/(store)/interior/page.tsx`
- Changed from client component to server component
- Added import for `getAllProducts()` from Sanity
- Added import for `getImageUrl()` helper for proper image handling
- Implemented product filtering logic:
  - Filters out outdoor products
  - Only shows products that are in stock
  - Maps Sanity product structure to expected format
- Added helper functions:
  - `getProductLink()` - Maps brand names to correct routes
  - `getProductColor()` - Extracts color from variants
  - `getProductMaterial()` - Extracts material from variants
  - `getProductSize()` - Extracts size from variants
  - `getProductCategory()` - Gets category from product data
- Passes processed products to client component

### 2. Created `app/(store)/interior/InteriorPageClient.tsx`
- New client component for handling filtering functionality
- Maintains the existing filter sidebar and product grid
- Implements client-side filtering by:
  - Price range
  - Colors
  - Materials
  - Brands
  - Sizes
- Preserves all existing UI/UX functionality

## Product Mapping
Products from Sanity are mapped to include:
- `_id` - Unique identifier
- `name` - Product name
- `price` - Product price
- `image` - Properly formatted image URL from Sanity CDN
- `category` - Product category
- `color` - Extracted from variants or default
- `material` - Extracted from variants or default
- `brand` - Product brand
- `size` - Extracted from variants or default
- `description` - Product description
- `link` - Correct brand-specific route
- `slug` - Product slug
- `variants` - Product variants
- `inStock` - Stock status

## Brand Route Mapping
The following brands are mapped to their specific routes:
- Fritz Hansen → `/fritz-hansen`
- Montana → `/montana`
- Kartell → `/kartell`
- Fredericia → `/fredericia`
- Vitra → `/vitra`
- Flos → `/flos`
- Louis Poulsen → `/louis-poulsen`
- Umage → `/umage`
- HAY → `/hay`
- Dux → `/dux`
- RO Collection → `/ro-collection`
- Sibast → `/sibast`
- Søren Lund → `/soren-lund`
- Serax → `/serax`
- Tradition → `/tradition`
- Audo Copenhagen → `/audo-copenhagen`
- Juul → `/juul`
- Crafts → `/crafts`

## Testing
To verify the fix:
1. Visit https://kiil-ecommerce.vercel.app/interior
2. Confirm real products from Sanity are displayed
3. Test filtering functionality (price, color, material, brand, size)
4. Verify product images load correctly from Sanity CDN
5. Click on products to ensure links work correctly

## Dependencies
- Requires `USE_SANITY_PRODUCTS=true` environment variable in production
- Uses existing Sanity client configuration
- Leverages existing image URL helper functions

## Benefits
- ✅ Real-time product data from Sanity CMS
- ✅ Automatic updates when products are added/modified in Sanity
- ✅ Proper image handling from Sanity CDN
- ✅ Correct product links to brand pages
- ✅ Stock filtering (only shows in-stock products)
- ✅ Maintains existing filtering functionality
- ✅ Better performance with server-side data fetching
