import { Link, Outlet, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LayoutDashboard, Package, Tag, ShoppingCart, Users, Settings, LogOut, Box, Menu, X, HelpCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const adminNavItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/productos', label: 'Productos', icon: Package },
  { path: '/admin/categorias', label: 'Categorías', icon: Tag },
  { path: '/admin/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { path: '/admin/usuarios', label: 'Usuarios', icon: Users },
  { path: '/admin/configuracion', label: 'Configuración', icon: Settings },
  { path: '/admin/ayuda', label: 'Ayuda', icon: HelpCircle },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) setSidebarOpen(false)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobile && sidebarOpen) {
        setSidebarOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobile, sidebarOpen])

  const handleLogout = async () => {
    await logout()
  }

  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobile, sidebarOpen])

  return (
    <div className="min-h-screen bg-white flex overflow-x-hidden">
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <aside className={`${isMobile ? 'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out' : 'static'} w-72 bg-primary-50 border-r border-dark-border flex flex-col h-full lg:translate-x-0 ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'} pt-16 lg:pt-20`}>
        <div className="p-6 border-b border-dark-border flex-shrink-0">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-charcoal-600 to-charcoal-700 flex items-center justify-center">
              <Box className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-primary-900">Hocico Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto min-h-0">
          {adminNavItems.map(item => {
            const Icon = item.icon
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-charcoal-600/10 text-charcoal-600 border border-charcoal-600/20'
                    : 'text-primary-900 hover:bg-primary-100 hover:text-primary-900 hover:border-charcoal-600/20'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="p-4 border-t border-dark-border flex-shrink-0">
          <div className="flex items-center gap-3 px-4 py-3 text-sm text-primary-900">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-charcoal-600 to-charcoal-700 flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-primary-900 truncate">{user?.name}</p>
              <p className="text-xs text-primary-900">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-primary-900 hover:text-charcoal-600 hover:bg-primary-100 rounded-xl transition-colors mt-2"
          >
            <LogOut className="w-5 h-5" aria-hidden="true" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 lg:ml-0 pt-16 lg:pt-20">
        <header className="lg:hidden bg-primary-50 border-b border-dark-border px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-primary-900 hover:bg-primary-100 transition-colors"
            aria-label="Abrir menú"
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-display font-bold text-xl text-primary-900">Hocico Admin</span>
          <div className="w-10" />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}