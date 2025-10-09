# Sanity Product Management Guide

This guide explains how to manage products in your e-commerce site using Sanity CMS.

## Table of Contents
1. [Accessing Sanity Studio](#accessing-sanity-studio)
2. [Updating Product Prices](#updating-product-prices)
3. [Adding New Products Manually](#adding-new-products-manually)
4. [Bulk Importing Products](#bulk-importing-products)
5. [Managing Product Images](#managing-product-images)
6. [Product Categories](#product-categories)
7. [Troubleshooting](#troubleshooting)

---

## Accessing Sanity Studio

### Option 1: Local Development
1. Open your terminal
2. Navigate to your project directory: `cd /path/to/kiil-ecommerce`
3. Run: `npm run dev`
4. Open your browser and go to: `http://localhost:3000/studio`

### Option 2: Production Studio
1. Go to: `https://your-domain.com/studio`
2. Sign in with your Sanity credentials

---

## Updating Product Prices

### Step-by-Step:
1. **Access Sanity Studio** (see above)
2. Click on **"Products"** in the left sidebar
3. **Find the product** you want to update:
   - Use the search bar at the top
   - Or scroll through the list
4. **Click on the product** to open it
5. Find the **"Price"** field
6. **Update the price** (enter numbers only, without currency symbols)
7. Click **"Publish"** button (top right)
8. **Changes will appear on the website within 60 seconds** (due to revalidation)

### Example:
```
Old Price: 5000
New Price: 4500
```

---

## Adding New Products Manually

### Required Fields:
- **Name** (required) - Product name
- **Slug** (auto-generated from name, but can be customized)
- **Price** (required) - Product price in NOK
- **Brand** (required) - Select from dropdown
- **Description** - Product description (supports rich text)
- **Image** (recommended) - Main product image

### Optional Fields:
- **Categories** - Select applicable categories
- **Stock Quantity** - Number of items in stock
- **Variants** - Color/size variations
- **Lifestyle Images** - Additional product photos
- **Related Products** - Products to show as recommendations
- **Designer** - Product designer name
- **Material** - Product materials
- **Dimensions** - Product measurements

### Step-by-Step:
1. **Access Sanity Studio**
2. Click on **"Products"** in the sidebar
3. Click the **"Create new Product"** button (top right or center)
4. **Fill in the required fields**:
   ```
   Name: Example Chair
   Price: 12500
   Brand: Fritz Hansen
   Description: A beautiful modern chair...
   ```
5. **Add an image**:
   - Click "Upload" in the Image field
   - Select image from your computer
   - Or drag and drop
6. **Select categories** (optional but recommended):
   - Click "Add item" under Categories
   - Select from the dropdown (e.g., "Chairs", "Living Room")
7. **Set stock quantity** (optional):
   - Enter a number in the Stock field
   - Leave empty for unlimited stock
8. Click **"Publish"**

### Tips:
- The **slug** is auto-generated from the product name
- You can customize the slug for SEO purposes
- Use high-quality images (recommended: 1200x1500px)
- Add multiple categories for better discoverability

---

## Bulk Importing Products

For adding multiple products at once, use the migration scripts:

### Method 1: Using Existing Scripts
1. Navigate to the `scripts/` folder
2. Find or create a migration script (e.g., `migrate-[brand]-to-sanity.mjs`)
3. Prepare your product data in JSON format:

```javascript
const products = [
  {
    name: "Product Name 1",
    price: 5000,
    brand: "Brand Name",
    description: "Product description...",
    image: "/path/to/image.jpg",
    categories: ["chairs", "living-room"]
  },
  {
    name: "Product Name 2",
    price: 7500,
    // ... more fields
  }
];
```

4. Run the script:
```bash
node scripts/your-migration-script.mjs
```

### Method 2: CSV Import (Advanced)
1. Prepare a CSV file with product data
2. Create a custom import script
3. Use Sanity's client API to bulk create products

---

## Managing Product Images

### Uploading Images:
1. **Single Image Upload**:
   - In the product editor, click the Image field
   - Click "Upload" or drag and drop
   - Supported formats: JPG, PNG, WebP, AVIF

2. **Multiple Images** (Lifestyle Images):
   - Scroll to "Lifestyle Images" section
   - Click "Add item"
   - Upload each image
   - You can reorder by dragging

### Image Best Practices:
- **Main Image**: 1200x1500px (4:5 aspect ratio)
- **Lifestyle Images**: 1920x1080px or higher
- **File Size**: Keep under 2MB for faster loading
- **Format**: WebP or AVIF for best performance
- **Background**: White or transparent for product shots

### Image URLs:
- Sanity automatically optimizes and serves images via CDN
- Images are automatically resized for different devices
- No need to manually create thumbnails

---

## Product Categories

### Available Categories:
- **Living Room**: Sofas, Chairs, Coffee Tables, Side Tables
- **Dining Room**: Dining Tables, Dining Chairs, Sideboards
- **Bedroom**: Beds, Wardrobes, Dressers, Nightstands
- **Office**: Desks, Office Chairs, Storage
- **Outdoor**: Outdoor Furniture, Cushions, Umbrellas
- **Lighting**: Floor Lamps, Table Lamps, Pendant Lights
- **Accessories**: Mirrors, Vases, Decor

### Adding Categories to Products:
1. Open the product in Sanity Studio
2. Scroll to "Categories" section
3. Click "Add item"
4. Select category from dropdown
5. Add multiple categories if applicable
6. Click "Publish"

---

## Troubleshooting

### Product Not Showing on Website
**Possible causes:**
1. **Not published** - Check if you clicked "Publish" button
2. **Cache delay** - Wait up to 60 seconds for revalidation
3. **Missing required fields** - Ensure Name, Price, and Brand are filled
4. **Out of stock filter** - Check if product has stock quantity set

**Solution:**
- Re-publish the product
- Clear browser cache
- Check browser console for errors

### Images Not Loading
**Possible causes:**
1. **Image not uploaded** - Check if image field has a value
2. **Invalid image format** - Use JPG, PNG, WebP, or AVIF
3. **File too large** - Compress images over 5MB
4. **CDN delay** - Wait a few minutes for CDN propagation

**Solution:**
- Re-upload the image
- Use image compression tools
- Check Sanity asset library

### Price Not Updating
**Possible causes:**
1. **Not published** - Changes must be published
2. **Cache** - Browser or CDN cache
3. **Multiple product entries** - Duplicate products in Sanity

**Solution:**
- Click "Publish" after making changes
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
- Search for duplicate products and delete them

### Can't Find Product in Studio
**Solution:**
- Use the search bar at the top
- Check if you're in the correct document type ("Products")
- Check if product was accidentally deleted

---

## Advanced Features

### Product Variants
Add color or size variations:
1. Scroll to "Variants" section
2. Click "Add item"
3. Fill in variant details:
   - Name (e.g., "Black", "Large")
   - Price (if different from main price)
   - Image (variant-specific image)
4. Publish

### Related Products
Show product recommendations:
1. Scroll to "Related Products" section
2. Click "Add item"
3. Search and select related products
4. Reorder by dragging
5. Publish

### Rich Text Descriptions
Format product descriptions:
- **Bold**: Select text and click B
- **Italic**: Select text and click I
- **Lists**: Click bullet or number icon
- **Links**: Select text and click link icon

---

## Quick Reference

### Common Tasks:
| Task | Steps |
|------|-------|
| Update price | Products → Select product → Edit price → Publish |
| Add new product | Products → Create new → Fill fields → Publish |
| Upload image | Product editor → Image field → Upload → Publish |
| Add category | Product editor → Categories → Add item → Select → Publish |
| Delete product | Products → Select product → Delete button → Confirm |

### Keyboard Shortcuts:
- `Cmd/Ctrl + S` - Save draft
- `Cmd/Ctrl + Alt + P` - Publish
- `Cmd/Ctrl + K` - Search
- `Esc` - Close dialog

---

## Support

For additional help:
- Check Sanity documentation: https://www.sanity.io/docs
- Contact your development team
- Review migration scripts in `/scripts` folder for examples

---

**Last Updated:** December 2024
