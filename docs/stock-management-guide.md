# Stock Management Guide

## Overview
Your Sanity products already have stock management capabilities built-in with two fields:
- **Stock Quantity** (`stock`): Number of units available
- **In Stock** (`inStock`): Boolean flag for availability

## Current Stock Status
Based on the migration, you have:
- **89 products** in Sanity
- **82 products** currently marked as in stock
- **7 products** currently out of stock
- **848 total units** across all products

## Managing Stock via Sanity Studio

### 1. Access Sanity Studio
Navigate to: `http://localhost:3000/studio`

### 2. Edit Product Stock
1. Go to the **Products** section
2. Select any product to edit
3. Scroll down to find:
   - **Stock Quantity**: Set the number of available units
   - **In Stock**: Toggle availability status

### 3. Bulk Stock Management
For bulk updates, you can:
1. Use the Sanity Studio's bulk actions
2. Create custom scripts with proper write permissions
3. Use the Sanity CLI tools

## Setting Up Write Permissions (For Scripts)

To enable automated stock management scripts, you need:

### 1. Create a Write Token
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **API** → **Tokens**
4. Create a new token with **Editor** permissions
5. Copy the token

### 2. Add Token to Environment
Add to your `.env.local` file:
```
SANITY_API_WRITE_TOKEN=your_write_token_here
```

### 3. Run Stock Scripts
Once the token is configured:
```bash
npm run stock:add    # Add stock to all products
```

## Stock Management in Your Application

### Current Setup
- Products use static data by default (`USE_SANITY_PRODUCTS=false`)
- Stock information is available in both static and Sanity data
- The `productService.ts` handles both data sources seamlessly

### Enable Sanity Stock Management
1. Set `USE_SANITY_PRODUCTS=true` in your environment
2. Restart your application
3. Stock levels will now be managed through Sanity

### Stock Display Features
Your application already supports:
- Stock quantity display
- In/out of stock indicators
- Stock-based product filtering
- Inventory management dashboard (see `StockDashboard.tsx`)

## Recommended Stock Levels by Product Type

Based on price ranges:
- **Premium items (>50k NOK)**: 1-5 units
- **High-end items (30k-50k NOK)**: 2-9 units  
- **Mid-range items (15k-30k NOK)**: 3-14 units
- **Standard items (5k-15k NOK)**: 5-24 units
- **Accessories (<5k NOK)**: 10-39 units

## Stock Monitoring

### Key Metrics to Track
- Total inventory value
- Low stock alerts (< 5 units)
- Out of stock products
- Stock turnover by brand
- Seasonal stock adjustments

### Automated Alerts
Consider setting up:
- Low stock notifications
- Reorder point alerts
- Stock movement tracking
- Inventory reports

## Next Steps

1. **Immediate**: Use Sanity Studio to manually set stock levels
2. **Short-term**: Set up write token for automated scripts
3. **Long-term**: Implement automated stock management system
4. **Testing**: Enable Sanity products and test stock functionality

## Troubleshooting

### Common Issues
- **Permission errors**: Ensure write token has Editor permissions
- **Stock not updating**: Check if using Sanity data (`USE_SANITY_PRODUCTS=true`)
- **Studio access**: Verify Sanity configuration and authentication

### Support
- Check Sanity documentation: [sanity.io/docs](https://sanity.io/docs)
- Review migration logs for any data issues
- Test with small stock updates first
