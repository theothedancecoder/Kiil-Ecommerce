# 🗑️ Delete All Products from Sanity CMS

## **Method 1: Using the Deletion Script (Recommended)**

### Step 1: Get Your Sanity Write Token
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **API** → **Tokens**
4. Create a new token with **Write** permissions
5. Copy the token

### Step 2: Add Token to Environment Variables
Add this line to your `.env.local` file:
```bash
SANITY_API_WRITE_TOKEN=your_write_token_here
```

### Step 3: Run the Deletion Script
```bash
node scripts/delete-all-products.js
```

---

## **Method 2: Manual Deletion via Sanity Studio**

### Step 1: Access Sanity Studio
1. Open: `http://localhost:3000/studio`
2. Login with your credentials

### Step 2: Delete Products
1. Click on **"Products"** in the sidebar
2. Select all products (Ctrl/Cmd + A)
3. Click **"Delete"** button
4. Confirm deletion
5. **Publish** changes

---

## **Method 3: Using Sanity CLI (Advanced)**

### Step 1: Install Sanity CLI
```bash
npm install -g @sanity/cli
```

### Step 2: Login to Sanity
```bash
sanity login
```

### Step 3: Delete All Products
```bash
sanity dataset delete production --force
sanity dataset create production
```

⚠️ **Warning**: This deletes ALL data, not just products!

---

## **Method 4: GROQ Query Deletion**

### Using Sanity Studio Vision Tool:
1. Go to `http://localhost:3000/studio`
2. Open **Vision** tool
3. Run this query to see all products:
```groq
*[_type == "product"]
```
4. Use the delete mutation (requires write token)

---

## **Verification**

After deletion, verify by:
1. Checking your products page: `http://localhost:3000/products`
2. Running this query in Vision: `count(*[_type == "product"])`

---

## **Need Help?**

If you encounter issues:
1. Check your Sanity project ID and dataset in `sanity/env.ts`
2. Ensure your write token has correct permissions
3. Verify your network connection to Sanity

**The deletion script I created (`scripts/delete-all-products.js`) is the safest and most reliable method.**
