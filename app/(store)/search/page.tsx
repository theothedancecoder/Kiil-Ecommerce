
//will keep it as a server component

import { searchProductsAndBrands, getBrandSuggestions } from '@/lib/allProducts';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react'

async function SearchPage({
    searchParams,
}:{
    searchParams: Promise<{
        query: string;
    }>
}) {
    const {query} = await searchParams
    const products = searchProductsAndBrands(query || '')
    const brandSuggestions = getBrandSuggestions(query || '')

    if(!products.length){
        return (
            <div className='min-h-screen bg-stone-50 py-12'>
                <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='bg-white rounded-lg shadow-sm border border-stone-200 p-8'>
                        <div className='text-center mb-8'>
                            <h1 className='text-3xl font-serif text-stone-800 mb-4'>
                                No results found for "{query}"
                            </h1>
                            <p className='text-stone-600 text-lg'>
                                We couldn't find any products or brands matching your search.
                            </p>
                        </div>

                        {brandSuggestions.length > 0 && (
                            <div className='mb-8'>
                                <h2 className='text-xl font-medium text-stone-800 mb-4'>
                                    Did you mean one of these brands?
                                </h2>
                                <div className='flex flex-wrap gap-3'>
                                    {brandSuggestions.map((brand) => (
                                        <Link
                                            key={brand}
                                            href={`/search?query=${encodeURIComponent(brand)}`}
                                            className='px-4 py-2 bg-stone-100 text-stone-700 rounded-md hover:bg-stone-200 transition-colors duration-200'
                                        >
                                            {brand}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className='text-center'>
                            <h3 className='text-lg font-medium text-stone-800 mb-4'>
                                Search suggestions:
                            </h3>
                            <div className='space-y-2 text-stone-600'>
                                <p>• Try searching for specific brands like "Fritz Hansen", "Kartell", or "Vitra"</p>
                                <p>• Search by product category like "chairs", "lighting", or "tables"</p>
                                <p>• Use broader terms like "dining", "outdoor", or "storage"</p>
                                <p>• Check your spelling and try different keywords</p>
                            </div>
                        </div>

                        <div className='mt-8 text-center'>
                            <Link 
                                href='/products'
                                className='inline-flex items-center px-6 py-3 bg-stone-800 text-white font-medium rounded-md hover:bg-stone-700 transition-colors duration-200'
                            >
                                Browse All Products
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-stone-50 py-12'>
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-serif text-stone-800 mb-2'>
                        Search Results
                    </h1>
                    <p className='text-stone-600 text-lg'>
                        Found {products.length} result{products.length !== 1 ? 's' : ''} for "{query}"
                    </p>
                </div>

                <div className='bg-white rounded-lg shadow-sm border border-stone-200 p-6'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link key={product.id} href={product.href} className="group">
                                <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 ease-out hover:shadow-lg">
                                    {/* Image Container */}
                                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                                        <Image
                                            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                        />
                                    </div>
                                    
                                    {/* Product Info */}
                                    <div className="p-4">
                                        <h3 className="text-lg font-light text-gray-900 mb-1 hover:text-gray-600 transition-colors">
                                            {product.name}
                                        </h3>
                                        
                                        {/* Brand Badge */}
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                                            {product.brand}
                                        </div>
                                        
                                        {/* Product Description */}
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {product.description.slice(0, 100)}...
                                        </p>

                                        {/* Price */}
                                        <div className="text-lg font-light text-gray-900 mb-3">
                                            {product.price.toLocaleString('no-NO')} kr
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {brandSuggestions.length > 0 && (
                    <div className='mt-8 bg-white rounded-lg shadow-sm border border-stone-200 p-6'>
                        <h2 className='text-xl font-medium text-stone-800 mb-4'>
                            Related Brands
                        </h2>
                        <div className='flex flex-wrap gap-3'>
                            {brandSuggestions.map((brand) => (
                                <Link
                                    key={brand}
                                    href={`/search?query=${encodeURIComponent(brand)}`}
                                    className='px-4 py-2 bg-stone-100 text-stone-700 rounded-md hover:bg-stone-200 transition-colors duration-200'
                                >
                                    {brand}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchPage;
