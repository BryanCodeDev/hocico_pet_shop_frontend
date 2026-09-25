import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/helpers'
import { Link, useNavigate } from 'react-router-dom'

export default function CartDrawer() {
  const { items, total, itemCount, removeItem, updateQuantity, clearCart, loading } = useCart()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'techstore_cart_open') {
        setOpen(e.newValue === 'true')
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const toggleCart = () => {
    const newState = !open
    setOpen(newState)
    localStorage.setItem('techstore_cart_open', newState.toString())
  }

  const handleCheckout = () => {
    toggleCart()
    navigate('/checkout')
  }

  if (loading) return null

  return (
    <>
      <button
        onClick={toggleCart}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-charcoal-600 text-white shadow-card flex items-center justify-center"
        aria-label={`Carrito: ${itemCount} productos`}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a2 2 0 00-2-2H5a2 2 0 00-2 2v4m0 0h14m-5 5v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1m14-5l-3.5-3.5a2 2 0 00-2.828 0L8 11m7 0l-3.5 3.5a2 2 0 01-2.828 0"/></svg>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-charcoal-700 text-white text-xs font-bold rounded-full flex items-center justify-center"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 lg:hidden"
            onClick={() => toggleCart()}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-white border-l border-dark-border flex flex-col shadow-card"
            role="dialog"
            aria-label="Carrito de compras"
          >
            <div className="flex items-center justify-between p-4 border-b border-dark-border">
              <h2 className="font-display font-bold text-xl text-primary-900">Carrito ({itemCount})</h2>
              <button
                onClick={toggleCart}
                className="p-2 rounded-lg text-primary-700 hover:text-charcoal-600 hover:bg-primary-50 transition-colors lg:hidden"
                aria-label="Cerrar carrito"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <svg className="w-16 h-16 text-charcoal-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a2 2 0 00-2-2H5a2 2 0 00-2 2v4m0 0h14m-5 5v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1m14-5l-3.5-3.5a2 2 0 00-2.828 0L8 11m7 0l-3.5 3.5a2 2 0 01-2.828 0"/></svg>
                  <p className="text-primary-600 mb-2">Tu carrito está vacío</p>
                  <p className="text-primary-700 text-sm mb-6">Agrega productos para comenzar tu compra</p>
                  <Link to="/tienda" onClick={toggleCart} className="btn-primary">Explorar productos</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.productId}-${index}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 p-3 bg-primary-50 rounded-xl border border-dark-border"
                    >
                      <Link to={`/producto/${item.slug}`} className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-primary-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/producto/${item.slug}`} onClick={toggleCart} className="font-medium text-primary-900 text-sm line-clamp-2 hover:text-charcoal-600 transition-colors">
                          {item.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-charcoal-600 font-semibold text-sm">{formatPrice(item.discountPrice || item.price)}</span>
                          {item.discountPrice && item.price > item.discountPrice && (
                            <span className="text-primary-600 text-xs line-through">{formatPrice(item.price)}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 rounded-lg bg-primary-100 border border-dark-border flex items-center justify-center text-primary-900 hover:border-charcoal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-4 h-4" aria-hidden="true" />
                          </button>
                          <span className="w-10 text-center text-primary-900 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="w-8 h-8 rounded-lg bg-primary-100 border border-dark-border flex items-center justify-center text-primary-900 hover:border-charcoal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-4 h-4" aria-hidden="true" />
                          </button>
                          <span className="flex-1 text-right text-primary-900 text-sm font-medium">
                            {formatPrice((item.discountPrice || item.price) * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-2 text-primary-600 hover:text-charcoal-600 transition-colors flex-shrink-0"
                        aria-label={`Eliminar ${item.name}`}
                      >
                        <Trash2 className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-dark-border space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-primary-900">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Descuentos</span>
                    <span>-{formatPrice(items.reduce((sum, item) => sum + ((item.price - (item.discountPrice || item.price)) * item.quantity), 0))}</span>
                  </div>
                  <div className="flex justify-between text-primary-900 border-t border-dark-border pt-2">
                    <span>Envío</span>
                    <span>Calcular en checkout</span>
                  </div>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-primary-900">Total</span>
                  <span className="text-charcoal-600">{formatPrice(total)}</span>
                </div>
                <button onClick={handleCheckout} className="btn-primary w-full py-4 text-lg">
                  Ir al checkout
                </button>
                <button onClick={clearCart} className="w-full py-3 text-sm text-primary-600 hover:text-charcoal-600 transition-colors">
                  Vaciar carrito
                </button>
                <p className="text-center text-primary-700 text-xs">
                  También puedes comprar por <a href={getWhatsAppUrlForCart(items, total)} target="_blank" rel="noopener noreferrer" className="text-charcoal-600 hover:underline">WhatsApp</a>
                </p>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

function getWhatsAppUrlForCart(items, total) {
  const productsText = items.map(item =>
    `- ${item.name} x${item.quantity} = $${((item.discountPrice || item.price) * item.quantity).toLocaleString('es-CO')}`
  ).join('\n')
  const text = `Hola, quiero realizar el siguiente pedido:\n\n${productsText}\n\nTotal: $${total.toLocaleString('es-CO')}\n\n¿Me pueden brindar información para finalizar la compra?`
  const number = import.meta.env.VITE_WHATSAPP_NUMBER
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}
