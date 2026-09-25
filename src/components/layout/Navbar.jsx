import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { Search, Menu, X, User, ShoppingCart, ChevronDown, LayoutDashboard, LogOut, Home } from 'lucide-react'
import CartDrawer from '../cart/CartDrawer'

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/tienda', label: 'Tienda' },
  { path: '/tienda?category=ofertas', label: 'Ofertas' },
  { path: '/grooming', label: 'Grooming' },
  { path: '/nosotros', label: 'Nosotros' },
  { path: '/contacto', label: 'Contacto' },
]

function NavLink({ to, label, active, index, children, scrolled }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
    >
      <Link
        to={to}
        className={`text-sm font-medium transition-colors duration-300 ${
          active
            ? (scrolled ? 'text-charcoal-600' : 'text-primary-900')
            : (scrolled ? 'text-primary-700 hover:text-charcoal-600' : 'text-primary-900/70 hover:text-primary-900')
        }`}
      >
        {children || label}
      </Link>
    </motion.div>
  )
}

export default function Navbar() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth()
  const { itemCount, toggleCart } = useCart()
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        setSearchOpen(false)
        setDropdownOpen(null)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleMenuBackdropClick = useCallback((e) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
      setMobileMenuOpen(false)
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/buscar?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const isActive = useCallback((path) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
  }, [location.pathname])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 border-b border-dark-border shadow-card'
          : 'bg-transparent'
      }`}>
        <nav className="container-custom" aria-label="Navegación principal">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 z-10" aria-label="Hocico Pet Shop - Inicio">
              <motion.div
                className="w-10 h-10 rounded-xl bg-charcoal-600 flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
              >
                <img src="/assets/images/favicon.svg" alt="Hocico Pet Shop" className="w-6 h-6" />
              </motion.div>
              <span className={`font-display font-bold text-xl lg:text-2xl hidden sm:block ${scrolled ? 'text-primary-900' : 'text-primary-900'}`}>Hocico Pet Shop</span>
            </Link>

            <div className="flex items-center gap-3 lg:gap-4">
              <div className="lg:hidden flex items-center gap-2">
                <Link to="/carrito" onClick={toggleCart} className={`relative p-2 transition-colors ${scrolled ? 'text-primary-700 hover:text-charcoal-600' : 'text-primary-900 hover:text-charcoal-600'}`} aria-label={`Carrito: ${itemCount} productos`}>
                  <ShoppingCart className={`w-6 h-6 ${scrolled ? '' : ''}`} aria-hidden="true" />
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-charcoal-600 text-white text-xs font-bold rounded-full flex items-center justify-center"
                    >
                      {itemCount > 99 ? '99+' : itemCount}
                    </motion.span>
                  )}
                </Link>
                <button
                  onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                  className={`p-2 transition-colors ${scrolled ? 'text-primary-700 hover:text-charcoal-600' : 'text-primary-900 hover:text-charcoal-600'}`}
                  aria-label="Buscar productos"
                  aria-expanded={mobileSearchOpen}
                >
                  <Search className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              {!isAdminRoute && (
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className={`lg:hidden p-2 transition-colors flex items-center gap-1 ${scrolled ? 'text-primary-700 hover:text-charcoal-600' : 'text-primary-900 hover:text-charcoal-600'}`}
                  aria-label="Abrir menú"
                  aria-expanded={mobileMenuOpen}
                >
                  <Menu className="w-7 h-7" aria-hidden="true" />
                  <span className="text-sm font-medium hidden">Menú</span>
                </button>
              )}

              <div className="hidden lg:flex items-center gap-8 whitespace-nowrap">
                {navLinks.map((link, index) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    label={link.label}
                    active={isActive(link.path)}
                    index={index}
                    scrolled={scrolled}
                  />
                ))}
              </div>
              <div className="hidden lg:flex items-center gap-4">
                <Link to="/carrito" onClick={toggleCart} className={`relative p-2 transition-colors ${scrolled ? 'text-primary-700 hover:text-charcoal-600' : 'text-primary-900 hover:text-charcoal-600'}`} aria-label={`Carrito: ${itemCount} productos`}>
                  <ShoppingCart className="w-6 h-6" aria-hidden="true" />
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute -top-1 -right-1 w-5 h-5 text-xs font-bold rounded-full flex items-center justify-center ${scrolled ? 'bg-charcoal-600 text-white' : 'bg-white text-charcoal-900'}`}
                    >
                      {itemCount > 99 ? '99+' : itemCount}
                    </motion.span>
                  )}
                </Link>
                <div className="relative">
                   <button
                     onClick={() => setSearchOpen(!searchOpen)}
                     className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${scrolled ? 'bg-primary-50 border border-dark-border text-primary-900 hover:border-charcoal-300' : 'bg-primary-50 border border-dark-border text-primary-900 hover:border-charcoal-300'}`}
                     aria-label="Buscar productos"
                   >
                     <Search className="w-5 h-5" aria-hidden="true" />
                     <span className="hidden sm:inline">Buscar</span>
                   </button>
                   <AnimatePresence>
                     {searchOpen && (
                       <motion.div
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: 20 }}
                         className="absolute right-0 top-full mt-2 w-72 max-w-[90vw]"
                       >
                         <form onSubmit={handleSearch} className="relative">
<input
                              type="search"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Buscar productos..."
                              className={`w-full px-4 py-3 pr-12 rounded-xl focus:outline-none transition-colors ${scrolled ? 'bg-white border border-dark-border text-primary-900 placeholder:text-charcoal-500 focus:border-charcoal-400' : 'bg-white border border-dark-border text-primary-900 placeholder:text-charcoal-500 focus:border-charcoal-400'}`}
                              autoFocus
                              aria-label="Buscar productos"
                            />
                            <button
                              type="submit"
                              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors ${scrolled ? 'text-primary-700 hover:text-charcoal-600' : 'text-primary-700 hover:text-charcoal-600'}`}
                              aria-label="Buscar"
                            >
                             <Search className="w-5 h-5" aria-hidden="true" />
                           </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {isAuthenticated ? (
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setDropdownOpen(dropdownOpen === 'user' ? null : 'user')
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${scrolled ? 'bg-primary-50 border border-dark-border text-primary-900 hover:bg-primary-100' : 'bg-primary-50 border border-dark-border text-primary-900 hover:bg-primary-100'}`}
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen === 'user'}
                    >
                      <div className="w-8 h-8 rounded-full bg-charcoal-600 flex items-center justify-center text-white font-medium text-sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="hidden sm:inline text-sm font-medium text-primary-900">{user?.name}</span>
                      <ChevronDown className={`w-4 h-4 text-primary-900 transition-transform ${dropdownOpen === 'user' ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen === 'user' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 top-full mt-2 w-56 max-w-[90vw] bg-charcoal-800 border border-charcoal-700/30 rounded-xl py-2 shadow-card"
                        >
                          <Link to="/cuenta" className="flex items-center gap-3 px-4 py-2 text-white hover:text-charcoal-300 hover:bg-white/5" onClick={() => setDropdownOpen(null)}>
                            <User className="w-5 h-5" aria-hidden="true" />
                            Mi cuenta
                          </Link>
                          {isAdmin && (
                            <Link to="/admin" className="flex items-center gap-3 px-4 py-2 text-white hover:text-charcoal-300 hover:bg-white/5" onClick={() => setDropdownOpen(null)}>
                              <LayoutDashboard className="w-5 h-5" aria-hidden="true" />
                              Panel Admin
                            </Link>
                          )}
                          <hr className="my-2 border-charcoal-700/30" />
                          <Link to="/" className="flex items-center gap-3 px-4 py-2 text-white hover:text-charcoal-300 hover:bg-white/5" onClick={() => setDropdownOpen(null)}>
                            <Home className="w-5 h-5" aria-hidden="true" />
                            Volver al inicio
                          </Link>
                          <hr className="my-2 border-charcoal-700/30" />
                          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2 text-white hover:text-charcoal-300 hover:bg-white/5 text-left">
                            <LogOut className="w-5 h-5" aria-hidden="true" />
                            Cerrar sesión
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link to="/login" className="px-4 py-2 text-sm font-medium text-primary-900 hover:text-charcoal-600 transition-colors">Iniciar sesión</Link>
                    <Link to="/registro" className="btn-primary text-sm">Registrarse</Link>
                  </div>
                )}

              </div>
            </div>
          </div>
        </nav>
      </header>

      {!isAdminRoute && (
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/20"
                onClick={handleMenuBackdropClick}
              />
              <motion.div
                ref={mobileMenuRef}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                className="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-charcoal-900 border-l border-charcoal-700/30 flex flex-col shadow-card"
              >
                <div className="p-6 flex items-center justify-between border-b border-charcoal-700/30">
                  <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <div className="w-10 h-10 rounded-xl bg-charcoal-600 flex items-center justify-center">
                      <img src="/assets/images/favicon.svg" alt="Hocico Pet Shop" className="w-6 h-6" />
                    </div>
                    <span className="font-display font-bold text-xl text-white">Hocico Pet Shop</span>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-white hover:text-charcoal-300 transition-colors"
                    aria-label="Cerrar menú"
                  >
                    <X className="w-7 h-7" aria-hidden="true" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-6 space-y-2">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-4 py-3 rounded-xl text-lg font-medium transition-colors duration-200 touch-manipulation ${
                        isActive(link.path)
                          ? 'bg-white/10 text-white border border-charcoal-700/30'
                          : 'text-charcoal-300 hover:bg-white/5'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {isAuthenticated ? (
                    <div className="pt-4 border-t border-charcoal-700/30 space-y-2">
                      <Link to="/cuenta" className="block px-4 py-3 rounded-xl bg-white/5 border border-charcoal-700/30 text-white hover:bg-white/10 transition-all touch-manipulation" onClick={() => setMobileMenuOpen(false)}>
                        Mi cuenta
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" className="block px-4 py-3 rounded-xl bg-white/5 border border-charcoal-700/30 text-white hover:bg-white/10 transition-all touch-manipulation" onClick={() => setMobileMenuOpen(false)}>
                          Panel Admin
                        </Link>
                      )}
                      <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full block px-4 py-3 rounded-xl text-charcoal-300 hover:bg-white/5 hover:text-white transition-all text-left touch-manipulation">
                        Cerrar sesión
                      </button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-charcoal-700/30 space-y-2">
                      <Link to="/login" className="block w-full px-4 py-3 rounded-xl bg-white/5 border border-charcoal-700/30 text-white text-center hover:bg-white/10 transition-all touch-manipulation" onClick={() => setMobileMenuOpen(false)}>
                        Iniciar sesión
                      </Link>
                      <Link to="/registro" className="block w-full btn-primary text-center touch-manipulation" onClick={() => setMobileMenuOpen(false)}>
                        Registrarse
                      </Link>
                    </div>
                  )}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}

      <CartDrawer />
    </>
  )
}
