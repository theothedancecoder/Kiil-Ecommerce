"use client"
import { ClerkLoaded, ClerkLoading, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { PackageIcon, TrolleyIcon, UserIcon } from '@sanity/icons'
import UseBasketStore from '@/app/(store)/store'
import { Loader } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useLanguage } from '@/lib/languageContext'

// Lazy load language toggle
const LanguageToggle = dynamic(() => import('./LanguageToggle'), {
  ssr: false,
  loading: () => <div className="w-6 h-6" />
})

function ClientHeader() {
  const { user } = useUser();
  const { t } = useLanguage();
  const itemCount = UseBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <div className='flex items-center space-x-6'>
      <Suspense fallback={<div className="w-6 h-6" />}>
        <LanguageToggle />
      </Suspense>
      
      <Link
        href='/basket'
        className='flex items-center space-x-2 text-stone-700 hover:text-stone-900 transition-colors duration-300 relative'>
        <TrolleyIcon className='w-5 h-5'/>
        {itemCount > 0 && (
          <span className='absolute -top-2 -right-2 bg-stone-800 text-white
                      rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium'>
            {itemCount}
          </span>
        )}
        <span className='hidden sm:inline text-sm font-medium tracking-wide'>{t('common.cart').toUpperCase()}</span>
      </Link>

      <Link
        href='/stores'
        className='flex items-center space-x-2 text-stone-700 hover:text-stone-900 transition-colors duration-300'>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4.5l9 5.25v9a2.25 2.25 0 01-2.25 2.25h-13.5A2.25 2.25 0 013 18.75v-9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 22.5v-6h6v6" />
        </svg>
        <span className='hidden sm:inline text-sm font-medium tracking-wide'>{t('common.stores').toUpperCase()}</span>
      </Link>

      <ClerkLoaded>
        {user && (
          <Link
            href="/orders"
            className='flex items-center space-x-2 text-stone-700 hover:text-stone-900 transition-colors duration-300'>
            <PackageIcon className='w-5 h-5'/>
            <span className='hidden sm:inline text-sm font-medium tracking-wide'>{t('common.orders').toUpperCase()}</span>
          </Link>
        )}
      </ClerkLoaded>

      <ClerkLoaded>
        {user ? (
          <div className='flex items-center space-x-3'>
            <UserButton/>
            <div className='hidden lg:block'>
              <p className='text-stone-500 text-xs uppercase tracking-wider'>{t('common.welcome')}</p>
              <p className='font-medium text-stone-800'>{user.fullName}</p>
            </div>
          </div>
        ) : (
          <SignInButton mode='modal'>
            <button className='flex items-center space-x-2 text-stone-700 hover:text-stone-900 transition-colors duration-300'>
              <UserIcon className='w-5 h-5'/>
              <span className='hidden sm:inline text-sm font-medium tracking-wide'>{t('common.signIn').toUpperCase()}</span>
            </button>
          </SignInButton>
        )}
      </ClerkLoaded>

      <ClerkLoading>
        <Loader className="w-5 h-5 text-stone-400"/>
      </ClerkLoading>
    </div>
  )
}

export default ClientHeader
