import { useState, useCallback } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const isActive = useCallback((path: string) => {
    return currentPath === path
  }, [currentPath])

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-2 z-10">
          <div className="w-3 h-3 bg-gray-900 rounded-sm"></div>
          <h1 className="text-sm font-bold tracking-tight uppercase text-gray-900">
            Walrus <span className="text-gray-400 font-normal">/ Estimator</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/"
            className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Estimate
          </Link>
          <Link 
            to="/analyzer"
            className={`text-sm font-medium transition-colors ${isActive('/analyzer') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Analyzer
          </Link>
          <Link 
            to="/transparency"
            className={`text-sm font-medium transition-colors ${isActive('/transparency') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Transparency
          </Link>
        </nav>

        <button 
          className="md:hidden p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-sm transition-colors z-10"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white absolute w-full left-0 py-2 shadow-sm border-b border-gray-200">
          <div className="flex flex-col">
            <Link 
              to="/"
              onClick={closeMobileMenu}
              className={`w-full text-left px-8 py-4 text-sm font-medium ${isActive('/') ? 'bg-gray-50 text-gray-900 border-l-2 border-gray-900' : 'text-gray-500'}`}
            >
              Estimate
            </Link>
            <Link 
              to="/analyzer"
              onClick={closeMobileMenu}
              className={`w-full text-left px-8 py-4 text-sm font-medium ${isActive('/analyzer') ? 'bg-gray-50 text-gray-900 border-l-2 border-gray-900' : 'text-gray-500'}`}
            >
              Analyzer
            </Link>
            <Link 
              to="/transparency"
              onClick={closeMobileMenu}
              className={`w-full text-left px-8 py-4 text-sm font-medium ${isActive('/transparency') ? 'bg-gray-50 text-gray-900 border-l-2 border-gray-900' : 'text-gray-500'}`}
            >
              Transparency
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}