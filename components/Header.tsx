"use client"
import { ClerkLoaded, ClerkLoading, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import Form from 'next/form'
import { PackageIcon, TrolleyIcon, UserIcon } from '@sanity/icons'
import UseBasketStore from '@/app/(store)/store'
import Navigation from './Navigation'
import { Loader } from 'lucide-react'

function Header() {
    const{user} =useUser ()
    const itemCount = UseBasketStore ((state)=>
    state.items.reduce((total,item)=>total +item.quantity, 0))

    const createClerkPasskey = async () =>{
        try{
            const response = await user?.createPasskey()
            console.log(response)
        } catch(err){
            console.error("Error:", JSON.stringify(err,null,2))
        }
    }

    return (
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
            <header className='flex flex-wrap justify-between items-center px-4 py-4 max-w-7xl mx-auto'>
                {/*top row*/}
                <div className='flex w-full justify-between items-center'>
                    <Link
                        href="/" 
                        className="text-3xl font-serif font-bold text-primary hover:text-accent 
                                transition-colors duration-300 tracking-tight">
                        Kiil
                    </Link>

                    <Form action='/search'
                        className='flex-1 mx-2 sm:mx-4'>
                        <div className="relative">
                            <input 
                                type='text'
                                name='query'
                                placeholder='Search'
                                className='luxury-input w-full text-sm'
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </Form>

                    <div className='flex items-center space-x-2 sm:space-x-4'>
                        <div className='flex items-center space-x-2'>
                    <Link
                        href='/basket'
                        className='flex items-center space-x-1 text-foreground hover:text-accent transition-colors duration-300 relative'>
                        <TrolleyIcon className='w-5 h-5'/>
                        {itemCount > 0 && (
                            <span className='absolute -top-2 -right-2 bg-primary text-primary-foreground
                                        rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold'>
                                {itemCount}
                            </span>
                        )}
                        <span className='hidden sm:inline'>Cart</span>
                    </Link>

                    <Link
                        href='/stores'
                        className='flex items-center space-x-1 text-foreground hover:text-accent transition-colors duration-300 relative ml-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4.5l9 5.25v9a2.25 2.25 0 01-2.25 2.25h-13.5A2.25 2.25 0 013 18.75v-9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 22.5v-6h6v6" />
                        </svg>
                        <span className='hidden sm:inline'>Stores</span>
                    </Link>

                            <ClerkLoaded>
                                {user && (
                                    <Link
                                        href="/orders"
                                        className='flex items-center space-x-1 text-foreground hover:text-accent transition-colors duration-300'>
                                        <PackageIcon className='w-5 h-5'/>
                                        <span className='hidden sm:inline'>Orders</span>
                                    </Link>
                                )}
                            </ClerkLoaded>
                        </div>

                        <ClerkLoaded>
                            {user ? (
                                <div className='flex items-center space-x-2'>
                                    <UserButton/>
                                    <div className='hidden lg:block'>
                                        <p className='text-muted-foreground text-sm'>Welcome</p>
                                        <p className='font-medium'>{user.fullName}</p>
                                    </div>
                                </div>
                            ) : (
                                <SignInButton mode='modal'>
                                    <button className='flex items-center space-x-1 text-foreground hover:text-accent transition-colors duration-300'>
                                        <UserIcon className='w-5 h-5'/>
                                        <span className='hidden sm:inline'>Sign In</span>
                                    </button>
                                </SignInButton>
                            )}

                            {user?.passkeys.length === 0 && (
                                <button
                                    onClick={createClerkPasskey}
                                    className="luxury-button bg-secondary text-secondary-foreground">
                                    Create passkey
                                </button>
                            )}
                        </ClerkLoaded>

                        <ClerkLoading>
                            <Loader/>
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
