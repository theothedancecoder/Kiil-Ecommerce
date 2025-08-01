import { createClient } from '@sanity/client'

// Create a client with write permissions
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN, // You'll need to add this to your .env.local
  useCdn: false,
  apiVersion: '2023-05-03'
})

async function deleteAllProducts() {
  try {
    console.log('🔍 Fetching all products...')
    
    // Fetch all product documents
    const products = await client.fetch('*[_type == "product"]')
    
    console.log(`📦 Found ${products.length} products to delete`)
    
    if (products.length === 0) {
      console.log('✅ No products found to delete')
      return
    }
    
    // Delete all products
    const transaction = client.transaction()
    
    products.forEach(product => {
      transaction.delete(product._id)
    })
    
    console.log('🗑️ Deleting all products...')
    await transaction.commit()
    
    console.log('✅ Successfully deleted all products!')
    console.log(`🎉 Removed ${products.length} products from Sanity`)
    
  } catch (error) {
    console.error('❌ Error deleting products:', error)
  }
}

// Run the deletion
deleteAllProducts()
