"use client"
import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import Form from 'next/form'
import { PackageIcon, TrolleyIcon } from '@sanity/icons'
import UseBasketStore from '@/app/(store)/store'
import Navigation from './Navigation'

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
                <div className='flex w-full flex-wrap justify-between items-center'>
                    <Link
                        href="/" 
                        className="text-3xl font-serif font-bold text-primary hover:text-accent 
                                transition-colors duration-300 tracking-tight mx-auto sm:mx-0">
                        Kiil
                    </Link>

                    <Form action='/search'
                        className='w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0'>
                        <div className="relative">
                            <input 
                                type='text'
                                name='query'
                                placeholder='Search for Products'
                                className='luxury-input w-full'
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </Form>

                    <div className='flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none'>
                        <Link
                            href='/basket'
                            className='flex items-center space-x-2 text-foreground hover:text-accent transition-colors duration-300 relative'>
                            <TrolleyIcon className='w-5 h-5'/>
                            {itemCount > 0 && (
                                <span className='absolute -top-2 -right-2 bg-primary text-primary-foreground
                                            rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold'>
                                    {itemCount}
                                </span>
                            )}
                            <span className='hidden sm:inline'>Cart</span>
                        </Link>

                        <ClerkLoaded>
                            {user && (
                                <Link
                                    href="/orders"
                                    className='flex items-center space-x-2 text-foreground hover:text-accent transition-colors duration-300'>
                                    <PackageIcon className='w-5 h-5'/>
                                    <span className='hidden sm:inline'>Orders</span>
                                </Link>
                            )}

                            {user ? (
                                <div className='flex items-center space-x-4'>
                                    <UserButton/>
                                    <div className='hidden lg:block'>
                                        <p className='text-muted-foreground text-sm'>Welcome</p>
                                        <p className='font-medium'>{user.fullName}</p>
                                    </div>
                                </div>
                            ) : (
                                <SignInButton mode='modal'/>
                            )}

                            {user?.passkeys.length === 0 && (
                                <button
                                    onClick={createClerkPasskey}
                                    className="luxury-button bg-secondary text-secondary-foreground">
                                    Create passkey
                                </button>
                            )}
                        </ClerkLoaded>
                    </div>
                </div>
            </header>
            
            {/* Navigation */}
            <Navigation />
        </div>
    )
}

export default Header
