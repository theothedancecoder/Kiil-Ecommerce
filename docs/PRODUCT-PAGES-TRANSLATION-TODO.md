# Product Pages Translation Implementation

## Status: In Progress

## Overview
Adding translation support to all individual product pages so they respond to the language toggle.

## Translation Keys Added to languageContext.tsx
- [x] Common product page elements
- [x] Breadcrumb navigation
- [x] Product details sections
- [x] Call-to-action buttons

## Product Client Components to Update

### ✅ Completed
- [x] app/umage/[productId]/UmageProductClient.tsx

### 🔄 In Progress
- [ ] app/hay/[productId]/HayProductClient.tsx
- [ ] app/flos/[productId]/FlosProductClient.tsx
- [ ] app/fredericia/[productId]/FredericiaProductClient.tsx
- [ ] app/kartell/[productId]/KartellProductClient.tsx
- [ ] app/ro-collection/[productId]/ROCollectionProductClient.tsx
- [ ] app/dux/[productId]/DuxProductClient.tsx
- [ ] app/serax/[productId]/SeraxProductClient.tsx
- [ ] app/sibast/[productId]/SibastProductClient.tsx
- [ ] app/soren-lund/[productId]/SorenLundProductClient.tsx
- [ ] app/audo-copenhagen/[productId]/AudoCopenhagenProductClient.tsx
- [ ] app/juul/[...productId]/JuulProductClient.tsx
- [ ] app/louis-poulsen/[productId]/LouisPoulsenProductClient.tsx
- [ ] app/tradition/[productId]/TraditionProductClient.tsx
- [ ] app/crafts/[productId]/CraftsProductClient.tsx

## Translation Keys Pattern

### Breadcrumb & Navigation
- `product.breadcrumb.home` - "Home" / "Hjem"
- `product.back.collection` - "Back to {brand} Collection" / "Tilbake til {brand} Kolleksjon"

### Product Details
- `product.collection` - "Collection" / "Kolleksjon"
- `product.designedBy` - "Designed by" / "Designet av"
- `product.material` - "Material:" / "Materiale:"
- `product.features` - "Features" / "Funksjoner"
- `product.specifications` - "Specifications" / "Spesifikasjoner"

### Related Products
- `product.relatedProducts` - "Related Products" / "Relaterte Produkter"
- `product.viewAll` - "View All {brand} Products" / "Se Alle {brand} Produkter"

## Testing Checklist
- [ ] Verify translations appear correctly on product pages
- [ ] Test language toggle switches all text
- [ ] Check breadcrumb navigation translates
- [ ] Verify "Back to Collection" links translate
- [ ] Test Features/Specifications sections
- [ ] Check Related Products section
- [ ] Test across different brands

## Notes
- All product client components follow the same pattern
- Brand names remain in English (e.g., "Umage", "Flos")
- Dynamic content (product names, descriptions) from Sanity remain as-is
