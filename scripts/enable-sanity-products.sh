#!/bin/bash

echo "🔄 Enabling Sanity products..."
echo "Setting USE_SANITY_PRODUCTS=true"

# Export the environment variable and start the dev server
export USE_SANITY_PRODUCTS=true
echo "✅ Environment variable set"
echo "🚀 Starting development server with Sanity products enabled..."

npm run dev
