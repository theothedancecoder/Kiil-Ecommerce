# Vercel Production Setup Guide

## Issue: "No products found" in Production

The products are not loading in Vercel production because required environment variables are missing.

## Required Environment Variables

You need to add these environment variables in your Vercel dashboard:

### 1. Core Sanity Configuration
```
NEXT_PUBLIC_SANITY_PROJECT_ID = hi84i3u4
NEXT_PUBLIC_SANITY_DATASET = production
NEXT_PUBLIC_SANITY_API_VERSION = 2025-06-13
```

### 2. Feature Flag
```
USE_SANITY_PRODUCTS = true
```

## How to Add Environment Variables in Vercel

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Select your project

2. **Navigate to Settings**
   - Click on "Settings" tab
   - Click on "Environment Variables" in the sidebar

3. **Add Each Variable**
   - Click "Add New"
   - Enter the variable name (e.g., `USE_SANITY_PRODUCTS`)
   - Enter the value (e.g., `true`)
   - Select "Production" environment
   - Click "Save"

4. **Repeat for All Variables**
   ```
   USE_SANITY_PRODUCTS = true
   NEXT_PUBLIC_SANITY_PROJECT_ID = hi84i3u4
   NEXT_PUBLIC_SANITY_DATASET = production
   NEXT_PUBLIC_SANITY_API_VERSION = 2025-06-13
   ```

5. **Redeploy**
   - Go to "Deployments" tab
   - Click "Redeploy" on the latest deployment
   - Or push a new commit to trigger automatic deployment

## Verification

After redeployment, check the Vercel function logs:
- Go to "Functions" tab in Vercel dashboard
- Look for console logs showing environment variables
- You should see: `USE_SANITY_PRODUCTS: 'true'`

## Alternative: Quick Fix via CLI

If you have Vercel CLI installed:

```bash
vercel env add USE_SANITY_PRODUCTS
# Enter: true

vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID  
# Enter: hi84i3u4

vercel env add NEXT_PUBLIC_SANITY_DATASET
# Enter: production

vercel env add NEXT_PUBLIC_SANITY_API_VERSION
# Enter: 2025-06-13

# Redeploy
vercel --prod
```

## Expected Result

After adding these environment variables and redeploying:
- Products page should show all 167 products
- Individual product pages should work
- Images should load properly
- No more "No products found" message

## Debugging

If issues persist, check Vercel function logs for the environment check output that will now show all environment variable values.
