#!/bin/bash

echo "🧹 Clearing Next.js cache..."
rm -rf .next

echo "📦 Clearing node_modules cache..."
rm -rf node_modules/.cache

echo "✅ Cache cleared!"
echo ""
echo "🚀 Now run: npm run dev"
echo ""
echo "Then test translations by:"
echo "1. Navigate to a Umage product page (e.g., /umage/a-conversation-piece-dining-chair)"
echo "2. Click the EN/NO toggle in the header"
echo "3. Verify text changes between English and Norwegian"
echo ""
echo "If translations still don't work, try:"
echo "- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)"
echo "- Clear browser cache"
echo "- Open in incognito/private window"
