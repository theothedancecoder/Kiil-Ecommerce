"use client"
import Link from 'next/link'
import { useLanguage } from '@/lib/languageContext'

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

function Navigation() {
  const { t } = useLanguage();

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {navigationItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="px-4 py-2 text-sm font-medium transition-all duration-200 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              style={{
                borderRadius: '2px',
                letterSpacing: '0.025em'
              }}
            >
              {t(item.key).toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
