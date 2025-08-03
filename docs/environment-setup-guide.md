# Environment Setup Guide

## The Problem

Your Kiil E-commerce site shows "No products found" because the required environment variables are not configured properly in both local development and Vercel production.

## Required Environment Variables

Based on your local `env.local` file, you need these environment variables in Vercel production:

```
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=hi84i3u4
SANITY_STUDIO_PROJECT_ID=hi84i3u4
SANITY_API_TOKEN=your_sanity_api_token
SANITY_API_READ_TOKEN=your_sanity_read_token
USE_SANITY_PRODUCTS=true
```

**Note**: You'll need to copy the actual token values from your local `env.local` file.

## Step 1: Fix Local Development

1. **Create `.env.local` file** in your project root:
   ```bash
   touch .env.local
   ```

2. **Add the following content to `.env.local`:**
   ```
   USE_SANITY_PRODUCTS=true
   NEXT_PUBLIC_SANITY_PROJECT_ID=hi84i3u4
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2025-06-13
   ```

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

## Step 2: Fix Vercel Production

1. **Go to Vercel Dashboard:**
   - Visit https://vercel.com/dashboard
   - Select your kiil-ecommerce project

2. **Add Environment Variables:**
   - Go to Settings → Environment Variables
   - Add each variable:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `USE_SANITY_PRODUCTS` | `true` | Production |
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | `hi84i3u4` | Production |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` | Production |
   | `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-06-13` | Production |

3. **Redeploy:**
   - Go to Deployments tab
   - Click "Redeploy" on latest deployment
   - Wait for deployment to complete

## Step 3: Verify the Fix

### Local Verification:
```bash
node scripts/test-env-vars.js
```

### Production Verification:
1. Visit your Vercel site
2. Go to `/products` page
3. You should see all 167 products loading
4. Check Vercel function logs for environment variable output

## Quick Commands

If you have Vercel CLI installed:

```bash
# Add environment variables
vercel env add USE_SANITY_PRODUCTS
# Enter: true

vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
# Enter: hi84i3u4

vercel env add NEXT_PUBLIC_SANITY_DATASET
# Enter: production

vercel env add NEXT_PUBLIC_SANITY_API_VERSION
# Enter: 2025-06-13

# Deploy
vercel --prod
```

## Expected Results

After completing these steps:
- ✅ Local development: Products load at http://localhost:3000/products
- ✅ Production: Products load at your Vercel URL/products
- ✅ Individual product pages work
- ✅ Images display properly
- ✅ No more "No products found" message

## Troubleshooting

If products still don't load:

1. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Functions
   - Look for console output showing environment variables

2. **Verify Sanity Studio:**
   - Visit your-site.vercel.app/studio
   - Ensure products exist in Sanity

3. **Check Network Tab:**
   - Open browser dev tools
   - Look for failed API requests to Sanity

## Contact

If you need help with Sanity credentials or have questions, please let me know!
