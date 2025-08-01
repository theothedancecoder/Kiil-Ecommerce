# Image Troubleshooting Guide

This guide helps debug image loading issues in production, particularly on Vercel.

## Common Issues

### 1. Images Not Loading on Vercel Production

**Symptoms:**
- Images work locally but not on Vercel
- Browser shows 404 errors for image URLs
- Images appear as broken or show fallback text

**Causes:**
- Missing Sanity environment variables
- Incorrect Next.js image configuration
- Invalid image paths
- Sanity CDN issues

## Debugging Steps

### Step 1: Validate Environment Variables

Run the environment validation script:

```bash
npm run validate-env
```

This will check:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- Connection to Sanity API

### Step 2: Check Image Debug Information

In development mode, the app will log detailed image information to the browser console:

```bash
npm run dev
```

Look for console logs like:
```
[Image Debug] Product: Product Name
[Image Debug] Image Source: /path/to/image.jpg
[Image Debug] Is Local: true
[Image Debug] Is Sanity CDN: false
```

### Step 3: Verify Vercel Environment Variables

In your Vercel dashboard:

1. Go to Project Settings → Environment Variables
2. Ensure these variables are set:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`

### Step 4: Check Image Paths

Valid image paths should be:
- Sanity CDN URLs: `https://cdn.sanity.io/images/...`
- Local paths: `/public/folder/image.jpg`

Invalid paths:
- Relative paths without leading slash: `folder/image.jpg`
- Missing file extensions
- Special characters in filenames

## Image Types in This Application

### 1. Sanity CMS Images
- Stored in Sanity CDN
- Processed through `imageUrl()` utility
- Automatically optimized by Next.js

### 2. Static Images
- Stored in `/public` folder
- Used for products with hardcoded data
- Must start with `/` for proper loading

## Configuration Files

### Next.js Image Configuration (`next.config.ts`)
```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "cdn.sanity.io"
    }
  ],
  // ... other settings
}
```

### Sanity Client Configuration (`sanity/lib/client.ts`)
```typescript
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
})
```

## Common Fixes

### Fix 1: Update Environment Variables
Add missing variables to Vercel:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-06-13
```

### Fix 2: Redeploy After Environment Changes
After updating environment variables in Vercel:
1. Go to Deployments tab
2. Click "Redeploy" on the latest deployment
3. Select "Use existing Build Cache" = No

### Fix 3: Check Image File Paths
Ensure static images in `/public` folder:
- Have correct file extensions
- Don't contain special characters
- Are referenced with leading slash: `/folder/image.jpg`

### Fix 4: Verify Sanity Image Assets
In Sanity Studio:
1. Check that products have image assets
2. Verify images are published (not drafts)
3. Ensure image assets are properly uploaded

## Testing

### Local Testing
```bash
npm run dev
npm run debug:images
```

### Production Testing
1. Deploy to Vercel
2. Check browser console for errors
3. Use Network tab to see failed requests
4. Verify image URLs are correct

## Emergency Fallbacks

If images still don't load, the app will:
1. Show "Image unavailable" placeholder
2. Log errors to console
3. Continue functioning without images

## Getting Help

If issues persist:
1. Check Vercel deployment logs
2. Verify Sanity project status
3. Test image URLs directly in browser
4. Contact support with error logs and environment details
