# How to Use the Stock Management System

## 🚀 Quick Start Guide

### 1. **Access the Stock Dashboard**
Navigate to: **http://localhost:3000/admin/stock**

This is your main control center for managing all 78 products.

### 2. **View Products with Stock Status**
Go to: **http://localhost:3000/products**

You'll now see:
- ✅ **Green badges** for "In Stock" items
- 🟡 **Orange badges** for "Low Stock" (Only X left)
- 🔴 **Red badges** for "Out of Stock" items
- 🚫 **Disabled "Add to Cart"** for unavailable items

## 📊 Dashboard Features

### **Overview Tab**
- Total products count (78)
- Total stock value in NOK
- Low stock alerts count
- Out of stock items count

### **Low Stock Tab**
- Products below their threshold
- Automatic alerts for reordering
- Supplier information

### **Out of Stock Tab**
- Items that need immediate restocking
- Customer impact tracking

### **All Products Tab**
- Complete inventory overview
- Bulk editing capabilities
- Export functions

## 🛠️ Admin Functions

### **Update Stock Quantities**
1. Go to **http://localhost:3000/admin/stock**
2. Click "All Products" tab
3. In the "Actions" column, change quantities directly
4. Click "+10" buttons for quick additions
5. Changes save automatically

### **Set Low Stock Thresholds**
```typescript
// In lib/stockManager.ts, modify:
const stockData: StockInfo[] = [
  { 
    productId: 'kartell-componibili-2', 
    quantity: 15, 
    lowStockThreshold: 5,  // ← Change this number
    supplier: 'Kartell Nordic',
    leadTime: 14 
  },
  // ... more products
];
```

### **Add New Products to Stock System**
```typescript
// Add to stockData array in lib/stockManager.ts:
{ 
  productId: 'new-product-id', 
  quantity: 10, 
  lowStockThreshold: 3,
  supplier: 'Supplier Name',
  leadTime: 14,
  lastUpdated: new Date()
}
```

## 🎯 Daily Operations

### **Morning Routine**
1. Check **http://localhost:3000/admin/stock**
2. Review "Low Stock" alerts
3. Check "Out of Stock" items
4. Place orders for items below threshold

### **After Receiving Stock**
1. Go to "All Products" tab
2. Update quantities for received items
3. System automatically updates stock status

### **Customer Service**
- Check stock status on products page
- Use dashboard to verify availability
- Set up pre-orders for out-of-stock items

## 🔧 Customization

### **Change Stock Display**
Edit `components/ProductThumbWithStock.tsx`:
```typescript
// Modify stock status text
{stockStatus.status === 'in-stock' && stockStatus.quantity > 10 ? 'In Stock' :
 stockStatus.status === 'in-stock' && stockStatus.quantity <= 10 ? `${stockStatus.quantity} in stock` :
 // ← Customize these messages
}
```

### **Adjust Stock Thresholds by Category**
```typescript
const categoryThresholds = {
  'Lighting': 3,      // FLOS, Louis Poulsen
  'Seating': 5,       // Fritz Hansen, Kartell
  'Tables': 2,        // Umage, Vitra
  'Storage': 8,       // Montana, Kartell
  'Outdoor': 4        // Seasonal items
};
```

## 📱 Mobile Access

The dashboard is responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

Access the same URL: **http://localhost:3000/admin/stock**

## 🚨 Alerts & Notifications

### **Low Stock Alerts**
- Automatically shown on dashboard
- Red badges on product pages
- Email notifications (can be added)

### **Out of Stock Handling**
- Products automatically disabled for purchase
- "Out of Stock" overlay on product images
- Pre-order options available

## 📈 Reports & Analytics

### **Export Stock Report**
1. Go to dashboard
2. Click "Export Stock Report" button
3. Download CSV with all stock data

### **Track Stock Movements**
- All changes are logged
- View history in browser console
- Can be extended to database logging

## 🔐 Security

### **Admin Access**
Currently open access. To secure:
1. Add authentication middleware
2. Protect `/admin/*` routes
3. Add user roles and permissions

### **Data Backup**
- Stock data currently in memory
- Recommend database integration for persistence
- Regular exports for backup

## 🆘 Troubleshooting

### **Stock Not Updating**
1. Check browser console for errors
2. Refresh the page
3. Verify product IDs match exactly

### **Dashboard Not Loading**
1. Ensure you're at correct URL: `/admin/stock`
2. Check if development server is running
3. Look for JavaScript errors in console

### **Products Not Showing Stock Status**
1. Verify `ProductThumbWithStock` is being used
2. Check if stock data exists for product
3. Ensure product IDs match between systems

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Review this guide
3. Check the comprehensive guide: `docs/stock-management-guide.md`

---

## 🎉 You're Ready!

Your stock management system is now active for all 78 products. Start by visiting:
**http://localhost:3000/admin/stock**
