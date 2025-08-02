# Homepage Sanity Setup Guide

This guide will help you set up the homepage content in Sanity so that the hero image loads from Sanity CMS instead of static files.

## What's Already Done

✅ **Homepage Schema Created** - The `homepage` content type is already added to Sanity
✅ **Homepage Query Function** - `getHomepage()` function fetches data from Sanity
✅ **Home Page Updated** - The page now uses Sanity data with fallbacks
✅ **Image URL Processing** - Sanity images are properly processed through `getImageUrl()`

## Setup Steps

### Option 1: Using the Automated Script

1. **Get your Sanity API Token:**
   - Go to https://sanity.io/manage
   - Select your project
   - Go to API > Tokens
   - Create a new token with **Editor** permissions
   - Copy the token

2. **Add the token to your environment:**
   ```bash
   # Add this line to your .env.local file
   SANITY_API_TOKEN=your_token_here
   ```

3. **Run the setup script:**
   ```bash
   npm run setup:homepage
   ```

### Option 2: Manual Setup via Sanity Studio

1. **Access Sanity Studio:**
   - Visit `http://localhost:3000/studio`
   - Sign in to your Sanity account

2. **Create Homepage Content:**
   - Click the "+" button to create new content
   - Select "Homepage" from the content types
   - Fill in the fields:
     - **Main Heading**: "Timeless Design"
     - **Sub Heading**: "for Modern Living"
     - **Description**: "Discover our curated collection of sophisticated furniture and home accessories, thoughtfully designed to create spaces that inspire and endure."
     - **Hero Image**: Upload your desired hero image

3. **Publish the content:**
   - Click "Publish" to make the content live

## Verification

After setting up the content, visit your homepage at `http://localhost:3000` to verify:

1. The text content matches what you entered in Sanity
2. The hero image loads from Sanity (you can check the image URL in browser dev tools)
3. If Sanity is unavailable, it gracefully falls back to the static content

## Troubleshooting

### Image Not Loading
- Check that the image was uploaded successfully in Sanity Studio
- Verify the image has proper alt text
- Check browser console for any image loading errors

### Content Not Updating
- Make sure you published the content in Sanity Studio
- Clear your browser cache
- Check that your Sanity project ID and dataset are correct in environment variables

### Fallback Content Showing
- This is normal if no homepage content exists in Sanity yet
- Create the homepage content as described above
- The page will automatically switch to Sanity content once it's available

## Technical Details

The implementation includes:
- **Graceful Fallbacks**: If Sanity is unavailable, shows static content
- **Image Optimization**: Sanity images are processed through Next.js Image optimization
- **Type Safety**: Full TypeScript support for homepage data structure
- **Performance**: Content is cached and revalidated every 30 minutes
