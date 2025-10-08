import Link from 'next/link'
import Image from 'next/image'
import Form from 'next/form'
import { TrolleyIcon } from '@sanity/icons'
import ClientHeader from './ClientHeader'

// Server component for static parts
function OptimizedHeader() {
  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <header className='flex flex-wrap justify-between items-center px-4 py-6 max-w-7xl mx-auto'>
        {/*top row*/}
        <div className='flex w-full justify-between items-center'>
          <Link
            href="/" 
            className="flex items-center hover:opacity-80 transition-opacity duration-300">
            <Image
              src="/kiil-black-square-bla.png"
              alt="KIIL"
              width={178}
              height={60}
              className="h-14 w-auto"
              priority
            />
          </Link>

          <Form action='/search'
            className='flex-1 mx-8 max-w-md'>
            <div className="relative">
              <input 
                type='text'
                name='query'
                placeholder="What can we help you find?"
                className='w-full px-4 py-3 pr-12 border border-stone-300 bg-white text-stone-800 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent text-sm'
                style={{ borderRadius: '0' }}
              />
              <button 
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-3 hover:bg-stone-50 transition-colors duration-200"
                aria-label="Search"
              >
                <svg className="h-5 w-5 text-stone-400 hover:text-stone-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </Form>

          {/* Client-side components */}
          <ClientHeader />
        </div>
      </header>
      
      {/* Navigation - keep as separate component */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/products" className="px-4 py-2 text-sm font-medium transition-all duration-200 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400" style={{ borderRadius: '2px', letterSpacing: '0.025em' }}>
              ALL PRODUCTS
            </Link>
            <Link href="/nyheter" className="px-4 py-2 text-sm font-medium transition-all duration-200 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400" style={{ borderRadius: '2px', letterSpacing: '0.025em' }}>
              NEWS
            </Link>
            <Link href="/salg" className="px-4 py-2 text-sm font-medium transition-all duration-200 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400" style={{ borderRadius: '2px', letterSpacing: '0.025em' }}>
              SALE
            </Link>
            <Link href="/mobler" className="px-4 py-2 text-sm font-medium transition-all duration-200 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400" style={{ borderRadius: '2px', letterSpacing: '0.025em' }}>
              FURNITURE
            </Link>
            <Link href="/tjenester" className="px-4 py-2 text-sm font-medium transition-all duration-200 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400" style={{ borderRadius: '2px', letterSpacing: '0.025em' }}>
              SERVICES
            </Link>
            <Link href="/merker" className="px-4 py-2 text-sm font-medium transition-all duration-200 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400" style={{ borderRadius: '2px', letterSpacing: '0.025em' }}>
              BRANDS
            </Link>
            <Link href="/selskap" className="px-4 py-2 text-sm font-medium transition-all duration-200 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400" style={{ borderRadius: '2px', letterSpacing: '0.025em' }}>
              COMPANY
            </Link>
            <Link href="/kontakt" className="px-4 py-2 text-sm font-medium transition-all duration-200 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400" style={{ borderRadius: '2px', letterSpacing: '0.025em' }}>
              CONTACT
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default OptimizedHeader
