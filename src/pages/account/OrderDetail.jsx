import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Package, Calendar, CreditCard, Truck, CheckCircle, MapPin, User, Clock, ChevronRight } from 'lucide-react'
import SEO from '../../components/seo/SEO'
import { orderService } from '../../services/products'
import { formatPrice, formatDate, formatDateTime } from '../../utils/helpers'
import toast from 'react-hot-toast'

const statusConfig = {
  pending: { label: 'Pendiente', bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-600/30' },
  paid: { label: 'Pagado', bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-600/30' },
  preparing: { label: 'Preparando', bg: 'bg-purple-600/20', text: 'text-purple-400', border: 'border-purple-600/30' },
  shipped: { label: 'Enviado', bg: 'bg-indigo-600/20', text: 'text-indigo-400', border: 'border-indigo-600/30' },
  delivered: { label: 'Entregado', bg: 'bg-green-600/20', text: 'text-green-400', border: 'border-green-600/30' },
  cancelled: { label: 'Cancelado', bg: 'bg-red-600/20', text: 'text-red-500', border: 'border-red-600/30' },
  refunded: { label: 'Reembolsado', bg: 'bg-gray-600/20', text: 'text-primary-900', border: 'border-gray-600/30' },
}

const paymentConfig = {
  pending: { label: 'Pendiente', bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-600/30' },
  approved: { label: 'Aprobado', bg: 'bg-green-600/20', text: 'text-green-400', border: 'border-green-600/30' },
  rejected: { label: 'Rechazado', bg: 'bg-red-600/20', text: 'text-red-500', border: 'border-red-600/30' },
  cancelled: { label: 'Cancelado', bg: 'bg-gray-600/20', text: 'text-primary-900', border: 'border-gray-600/30' },
  refunded: { label: 'Reembolsado', bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-600/30' },
}

export default function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderService.getById(id)
        setOrder(data.order)
      } catch (error) {
        console.error('Fetch order error:', error)
        toast.error('Error al cargar el pedido')
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-charcoal-600 border-t-transparent" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="container-custom text-center py-20">
          <h1 className="font-display font-bold text-3xl text-primary-900 mb-2">Pedido no encontrado</h1>
          <p className="text-primary-900 mb-6">No se pudo encontrar este pedido.</p>
          <Link to="/cuenta" className="btn-primary inline-flex">Volver a mi cuenta</Link>
        </div>
      </div>
    )
  }

  const orderStatus = statusConfig[order.status] || statusConfig.pending
  const orderPayment = paymentConfig[order.payment_status] || paymentConfig.pending

  return (
    <>
      <SEO
        title={`Pedido ${order.order_number} | Hocico Pet Shop`}
        description={`Detalles del pedido ${order.order_number}`}
        noindex
      />

      <div className="min-h-screen bg-white pt-20">
        <div className="container-custom py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link to="/cuenta" className="inline-flex items-center gap-2 text-primary-900 hover:text-charcoal-600 transition-colors mb-4">
              <ArrowLeft className="w-5 h-5" />
              Volver a mi cuenta
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary-900">Pedido #{order.order_number}</h1>
                <p className="text-primary-900 mt-2">Realizado el {formatDateTime(order.created_at)}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${orderStatus.bg} ${orderStatus.text} ${orderStatus.border}`}>
                  {orderStatus.label}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${orderPayment.bg} ${orderPayment.text} ${orderPayment.border}`}>
                  Pago: {orderPayment.label}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary-50 border border-dark-border rounded-2xl p-4 sm:p-6"
              >
                <h2 className="font-display font-semibold text-xl text-primary-900 mb-5 flex items-center gap-2">
                  <Package className="w-6 h-6 text-charcoal-500" />
                  Productos
                </h2>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-primary-100 border border-dark-border rounded-xl">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-primary-100 flex-shrink-0">
                        <img src={item.main_image || item.image || '/assets/images/producto1.webp'} alt={item.product_name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-primary-900 truncate">{item.product_name}</p>
                        <p className="text-primary-900 text-sm">SKU: {item.product_sku || 'N/A'}</p>
                        <p className="text-primary-900 text-sm">Cantidad: {item.quantity} × {formatPrice(item.discount_price || item.unit_price)}</p>
                      </div>
                      <span className="font-display font-bold text-lg text-charcoal-600 whitespace-nowrap">{formatPrice(item.subtotal)}</span>
                    </div>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-primary-50 border border-dark-border rounded-2xl p-4 sm:p-6"
              >
                <h2 className="font-display font-semibold text-xl text-primary-900 mb-5 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-charcoal-500" />
                  Historial de cambios
                </h2>
                <div className="space-y-0">
                  {(order.history || []).map((event, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-2.5 h-2.5 rounded-full ${index === 0 ? 'bg-charcoal-500' : 'bg-primary-200'}`} />
                        {index < (order.history || []).length - 1 && <div className="w-px flex-1 bg-dark-border my-1" />}
                      </div>
                      <div className="flex-1 pb-4 min-w-0">
                        <p className="font-medium text-primary-900 truncate">{event.status}</p>
                        <p className="text-primary-900 text-sm truncate">{event.notes || 'Estado actualizado'}</p>
                        <p className="text-primary-900 text-xs mt-1">{formatDateTime(event.created_at)} · {event.first_name ? `${event.first_name} ${event.last_name}` : 'Sistema'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>

            <div className="space-y-6">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-primary-50 border border-dark-border rounded-2xl p-4 sm:p-6"
              >
                <h2 className="font-display font-semibold text-xl text-primary-900 mb-5">Resumen del pedido</h2>
                <div className="space-y-2 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-900">Subtotal</span>
                    <span className="text-primary-900">{formatPrice(order.subtotal)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Descuento</span>
                      <span>-{formatPrice(order.discount)}</span>
                    </div>
                  )}
                  {order.shipping_cost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-900">Envío</span>
                      <span className="text-primary-900">{formatPrice(order.shipping_cost)}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-dark-border pt-4">
                  <span className="text-primary-900">Total</span>
                  <span className="text-charcoal-600">{formatPrice(order.total)}</span>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-primary-50 border border-dark-border rounded-2xl p-4 sm:p-6 space-y-4"
              >
                <h2 className="font-display font-semibold text-xl text-primary-900">Información del cliente</h2>
                <div className="flex flex-col sm:flex-row items-start gap-3">
                  <User className="w-5 h-5 text-charcoal-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-primary-900 truncate">{order.customer_name}</p>
                    <p className="text-primary-900 text-sm truncate">{order.customer_email}</p>
                    <p className="text-primary-900 text-sm truncate">{order.customer_phone}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-3">
                  <MapPin className="w-5 h-5 text-charcoal-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-primary-900 truncate">{order.address}</p>
                    <p className="text-primary-900 text-sm truncate">{order.city}, {order.province}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-3">
                  <CreditCard className="w-5 h-5 text-charcoal-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-primary-900 capitalize truncate">{order.payment_method}</p>
                    <p className="text-primary-900 text-sm truncate">{order.payment_status === 'approved' ? 'Pago confirmado' : 'Pago pendiente'}</p>
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-primary-50 border border-dark-border rounded-2xl p-4 sm:p-6"
              >
                <h2 className="font-display font-semibold text-xl text-primary-900 mb-4">Seguimiento</h2>
                {order.status === 'delivered' ? (
                  <div className="flex flex-col sm:flex-row items-start gap-3 text-green-600">
                    <CheckCircle className="w-8 h-8 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Pedido entregado correctamente</p>
                    </div>
                  </div>
                ) : order.status === 'shipped' ? (
                  <div className="space-y-2">
                    <Truck className="w-8 h-8 text-charcoal-500" />
                    <p className="font-medium text-primary-900">Tu pedido está en camino</p>
                    <p className="text-primary-900 text-sm">Recibirás el código de seguimiento por email.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Calendar className="w-8 h-8 text-charcoal-500" />
                    <p className="font-medium text-primary-900">Procesando tu pedido</p>
                    <p className="text-primary-900 text-sm">Te notificaremos cada actualización por email.</p>
                  </div>
                )}
              </motion.section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}