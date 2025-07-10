"use client"
import { ClerkLoaded, ClerkLoading, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Form from 'next/form'
import { PackageIcon, TrolleyIcon, UserIcon } from '@sanity/icons'
import UseBasketStore from '@/app/(store)/store'
import Navigation from './Navigation'
import { Loader } from 'lucide-react'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '@/lib/languageContext'

function Header() {
    const { user } = useUser();
    const { t } = useLanguage();
    const itemCount = UseBasketStore((state) =>
        state.items.reduce((total, item) => total + item.quantity, 0)
    );

    const createClerkPasskey = async () =>{
        try{
            const response = await user?.createPasskey()
            console.log(response)
        } catch(err){
            console.error("Error:", JSON.stringify(err,null,2))
        }
    }

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
                                className='w-full px-4 py-3 border border-stone-300 bg-white text-stone-800 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent text-sm'
                                style={{ borderRadius: '0' }}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg className="h-5 w-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </Form>

                    <div className='flex items-center space-x-6'>
                        <LanguageToggle />
                        
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
                            <span className='hidden sm:inline text-sm font-medium tracking-wide'>CART</span>
                        </Link>

                        <Link
                            href='/stores'
                            className='flex items-center space-x-2 text-stone-700 hover:text-stone-900 transition-colors duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4.5l9 5.25v9a2.25 2.25 0 01-2.25 2.25h-13.5A2.25 2.25 0 013 18.75v-9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 22.5v-6h6v6" />
                            </svg>
                            <span className='hidden sm:inline text-sm font-medium tracking-wide'>STORES</span>
                        </Link>

                        <ClerkLoaded>
                            {user && (
                                <Link
                                    href="/orders"
                                    className='flex items-center space-x-2 text-stone-700 hover:text-stone-900 transition-colors duration-300'>
                                    <PackageIcon className='w-5 h-5'/>
                                    <span className='hidden sm:inline text-sm font-medium tracking-wide'>ORDERS</span>
                                </Link>
                            )}
                        </ClerkLoaded>

                        <ClerkLoaded>
                            {user ? (
                                <div className='flex items-center space-x-3'>
                                    <UserButton/>
                                    <div className='hidden lg:block'>
                                        <p className='text-stone-500 text-xs uppercase tracking-wider'>Welcome</p>
                                        <p className='font-medium text-stone-800'>{user.fullName}</p>
                                    </div>
                                </div>
                            ) : (
                                <SignInButton mode='modal'>
                                    <button className='flex items-center space-x-2 text-stone-700 hover:text-stone-900 transition-colors duration-300'>
                                        <UserIcon className='w-5 h-5'/>
                                        <span className='hidden sm:inline text-sm font-medium tracking-wide'>SIGN IN</span>
                                    </button>
                                </SignInButton>
                            )}
                        </ClerkLoaded>

                        <ClerkLoading>
                            <Loader className="w-5 h-5 text-stone-400"/>
                        </ClerkLoading>
                    </div>
                </div>
            </header>
            
            {/* Navigation */}
            <Navigation />
        </div>
    )
}

export default Header
