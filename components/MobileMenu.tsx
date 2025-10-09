"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Menu, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/languageContext'
import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { PackageIcon, UserIcon } from '@sanity/icons'
import LanguageToggle from './LanguageToggle'

const navigationItems = [
  { key: 'nav.allProducts', href: '/products' },
  { key: 'nav.news', href: '/nyheter' },
  { key: 'nav.sale', href: '/salg' },
  { key: 'nav.furniture', href: '/mobler' },
  { key: 'nav.services', href: '/tjenester' },
  { key: 'nav.brands', href: '/merker' },
  { key: 'nav.company', href: '/selskap' },
  { key: 'nav.contact', href: '/kontakt' },
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()
  const { user } = useUser()

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 text-stone-700 hover:text-stone-900 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-stone-200">
            <h2 className="text-lg font-medium text-stone-800">Menu</h2>
            <button
              onClick={closeMenu}
              className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* User Section */}
            <div className="p-4 border-b border-stone-200">
              <ClerkLoaded>
                {user ? (
                  <div className="flex items-center space-x-3">
                    <UserButton />
                    <div>
                      <p className="text-xs text-stone-500 uppercase tracking-wider">
                        {t('common.welcome')}
                      </p>
                      <p className="font-medium text-stone-800">{user.fullName}</p>
                    </div>
                  </div>
                ) : (
                  <SignInButton mode="modal">
                    <button className="flex items-center space-x-2 text-stone-700 hover:text-stone-900 transition-colors w-full py-2">
                      <UserIcon className="w-5 h-5" />
                      <span className="text-sm font-medium tracking-wide">
                        {t('common.signIn').toUpperCase()}
                      </span>
                    </button>
                  </SignInButton>
                )}
              </ClerkLoaded>
            </div>

            {/* Quick Actions */}
            <div className="p-4 space-y-2 border-b border-stone-200">
              <Link
                href="/stores"
                onClick={closeMenu}
                className="flex items-center justify-between py-3 px-2 text-stone-700 hover:bg-stone-50 rounded transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 9.75L12 4.5l9 5.25v9a2.25 2.25 0 01-2.25 2.25h-13.5A2.25 2.25 0 013 18.75v-9z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 22.5v-6h6v6" />
                  </svg>
                  <span className="text-sm font-medium">{t('common.stores').toUpperCase()}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </Link>

              {user && (
                <Link
                  href="/orders"
                  onClick={closeMenu}
                  className="flex items-center justify-between py-3 px-2 text-stone-700 hover:bg-stone-50 rounded transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <PackageIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">{t('common.orders').toUpperCase()}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </Link>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-1">
              <p className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3 px-2">
                Navigation
              </p>
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between py-3 px-2 text-stone-700 hover:bg-stone-50 rounded transition-colors"
                >
                  <span className="text-sm font-medium">{t(item.key).toUpperCase()}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer with Language Toggle */}
          <div className="p-4 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                Language
              </span>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
