"use client"
import Link from 'next/link'
import { useLanguage } from '@/lib/languageContext'

const navigationItems = [
  { key: 'nav.news', href: '/nyheter' },
  { key: 'nav.sale', href: '/salg' },
  { key: 'nav.interior', href: '/interior' },
  { key: 'nav.outdoor', href: '/utendors' },
  { key: 'nav.furniture', href: '/mobler' },
  { key: 'nav.services', href: '/tjenester' },
  { key: 'nav.brands', href: '/merker' },
  { key: 'nav.company', href: '/selskap' },
  { key: 'nav.contact', href: '/kontakt' },
]

function Navigation() {
  const { t } = useLanguage();

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-center space-x-8 py-4">
          {navigationItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-foreground hover:text-accent font-medium transition-colors duration-300 
                       relative group py-2 px-3"
            >
              {t(item.key)}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Tablet/Mobile Navigation - Horizontal Scrollable */}
        <div className="lg:hidden relative">
          <div className="overflow-x-auto scrollbar-hide py-3 md:py-4">
            <div className="flex space-x-3 md:space-x-4 min-w-max px-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="bg-[#eff9ff] text-primary hover:text-accent border border-[#eff9ff] hover:border-accent
                           whitespace-nowrap py-2 px-3 md:px-4 text-sm md:text-base font-medium transition-all duration-300
                           rounded-lg shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>
          {/* Fade effect on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </nav>
  )
}

export default Navigation
