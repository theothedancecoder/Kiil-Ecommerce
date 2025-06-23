"use client"
import Link from 'next/link'

const navigationItems = [
  { name: 'Nyheter', href: '/nyheter' },
  { name: 'Salg', href: '/salg' },
  { name: 'Innendørs', href: '/innendors' },
  { name: 'Utendørs', href: '/utendors' },
  { name: 'Møbler', href: '/mobler' },
  { name: 'Tjenester', href: '/tjenester' },
  { name: 'Merker', href: '/merker' },
  { name: 'Selskap', href: '/selskap' },
  { name: 'Kontakt', href: '/kontakt' },
]

function Navigation() {
  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-center space-x-8 py-4">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground hover:text-accent font-medium transition-colors duration-300 
                       relative group py-2 px-3"
            >
              {item.name}
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
                  key={item.name}
                  href={item.href}
                  className="bg-[#eff9ff] text-primary hover:text-accent border border-[#eff9ff] hover:border-accent
                           whitespace-nowrap py-2 px-3 md:px-4 text-sm md:text-base font-medium transition-all duration-300
                           rounded-lg shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  {item.name}
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
