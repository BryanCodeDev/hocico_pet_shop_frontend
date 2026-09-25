import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Eye, ChevronDown, ChevronUp, Package, Truck, CheckCircle, Clock, RotateCcw, Loader2, Filter } from 'lucide-react'
import SEO from '../../components/seo/SEO'
import { adminOrderService } from '../../services/admin'
import { formatPrice, formatDate, formatDateTime, getOrderStatusConfig, getPaymentStatusConfig } from '../../utils/helpers'
import toast from 'react-hot-toast'

export default function AdminOrders() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [history, setHistory] = useState([])
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [processing, setProcessing] = useState(false)

  const orderStatuses = [
    { value: 'pending', label: 'Pendiente', color: 'red' },
    { value: 'paid', label: 'Pagado', color: 'blue' },
    { value: 'preparing', label: 'Preparando', color: 'purple' },
    { value: 'shipped', label: 'Enviado', color: 'indigo' },
    { value: 'delivered', label: 'Entregado', color: 'green' },
    { value: 'cancelled', label: 'Cancelado', color: 'red' },
    { value: 'refunded', label: 'Reembolsado', color: 'gray' },
  ]

  useEffect(() => {
    fetchOrders()
  }, [currentPage, status, paymentStatus, searchParams.get('status')])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const params = {
        page: currentPage,
        limit: 20,
        ...(status && { status }),
        ...(paymentStatus && { paymentStatus }),
        ...(searchParams.get('status') && { status: searchParams.get('status') }),
        ...(search && { search }),
      }
      const data = await adminOrderService.getAll(params)
      setOrders(data.orders || [])
      setTotalPages(data.pagination?.totalPages || 1)
    } catch (error) {
      console.error('Fetch orders error:', error)
      toast.error('Error al cargar pedidos')
    } finally {
      setLoading(false)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchOrders()
  }

  const clearFilters = () => {
    setSearch('')
    setStatus('')
    setPaymentStatus('')
    setCurrentPage(1)
    setSearchParams({})
    fetchOrders()
  }

  const openStatusModal = async (order) => {
    setSelectedOrder(order)
    setNewStatus(order.status)
    setStatusModalOpen(true)
    try {
      const data = await adminOrderService.getStatusHistory(order.id)
      setHistory(data.history || [])
    } catch (error) {
      console.error('Fetch history error:', error)
    }
  }

  const handleStatusChange = async () => {
    if (!selectedOrder || !newStatus) return
    setProcessing(true)
    try {
      await adminOrderService.updateStatus(selectedOrder.id, newStatus)
      toast.success('Estado del pedido actualizado')
      setStatusModalOpen(false)
      fetchOrders()
    } catch (error) {
      console.error('Update order status error:', error)
      toast.error(error.response?.data?.error || 'Error al actualizar estado')
    } finally {
      setProcessing(false)
    }
  }

  const hasFilters = search || status || paymentStatus || searchParams.get('status')

  return (
    <>
      <SEO
        title="Pedidos | Hocico Admin"
        description="Gestiona los pedidos de Hocico Pet Shop."
        noindex
      />

      <div className="space-y-8 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary-900">Pedidos</h1>
            <p className="text-primary-900 mt-2">Gestiona y da seguimiento a todos los pedidos</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {orderStatuses.map((s) => (
              <button
                key={s.value}
                onClick={() => { setStatus(s.value); setCurrentPage(1) }}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  status === s.value
                    ? 'bg-charcoal-600/10 text-charcoal-600 border-charcoal-300'
                    : 'bg-primary-50 border-dark-border text-primary-900 hover:border-charcoal-300 hover:text-primary-900'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 bg-primary-50 border border-dark-border rounded-2xl"
        >
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-700" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por número, cliente o email..."
                className="w-full pl-12 pr-4 py-3 bg-primary-100 border border-dark-border rounded-xl text-primary-900 placeholder:text-primary-700 focus:outline-none focus:border-charcoal-500 focus:ring-1 focus:ring-charcoal-500"
              />
            </div>
            <select
              value={paymentStatus}
              onChange={(e) => { setPaymentStatus(e.target.value); setCurrentPage(1) }}
              className="input py-3 px-4 bg-primary-100"
            >
              <option value="">Todos los pagos</option>
              <option value="pending">Pendiente</option>
              <option value="approved">Aprobado</option>
              <option value="rejected">Rechazado</option>
              <option value="cancelled">Cancelado</option>
              <option value="refunded">Reembolsado</option>
            </select>
            {hasFilters && (
              <button type="button" onClick={clearFilters} className="btn-secondary px-6">
                Limpiar filtros
              </button>
            )}
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-primary-50 border border-dark-border rounded-2xl overflow-hidden"
        >
          {loading ? (
            <div className="p-6 space-y-4" role="list" aria-busy="true">
              {[...Array(8)].map((_, i) => (
                <motion.div key={i} className="skeleton h-24 rounded-xl" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <Package className="w-20 h-20 text-primary-800 mb-4" />
              <h2 className="font-display font-bold text-2xl text-primary-900 mb-2">No se encontraron pedidos</h2>
              <p className="text-primary-900 mb-6">Prueba con otros filtros o espera a que lleguen nuevos pedidos</p>
            </div>
          ) : (
            <div className="overflow-x-auto min-w-0">
              <table className="w-full min-w-[840px] text-sm">
                <thead>
                  <tr className="border-b border-dark-border bg-primary-50/50 text-left text-primary-900">
                    <th className="py-4 px-6 font-medium">Pedido</th>
                    <th className="py-4 px-6 font-medium">Cliente</th>
                    <th className="py-4 px-6 font-medium">Fecha</th>
                    <th className="py-4 px-6 font-medium">Total</th>
                    <th className="py-4 px-6 font-medium">Pago</th>
                    <th className="py-4 px-6 font-medium">Estado</th>
                    <th className="py-4 px-6 font-medium text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const orderStatus = getOrderStatusConfig(order.status)
                    const paymentStatus = getPaymentStatusConfig(order.payment_status)
                    return (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className="border-b border-dark-border/50 hover:bg-primary-50/50"
                      >
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-mono font-medium text-primary-900">{order.order_number}</p>
                            <p className="text-primary-900 text-xs">{order.item_count} producto{order.item_count !== 1 ? 's' : ''}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-primary-900">{order.customer_name}</p>
                            <p className="text-primary-900 text-xs truncate max-w-xs">{order.customer_email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-primary-900 whitespace-nowrap">{formatDate(order.created_at)}</td>
                        <td className="py-4 px-6 font-display font-bold text-charcoal-600">{formatPrice(order.total)}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentStatus.color === 'green' ? 'bg-green-600/20 text-green-400 border border-green-600/30' : paymentStatus.color === 'red' ? 'bg-red-600/20 text-red-500 border border-red-600/30' : 'bg-red-600/20 text-red-500 border border-red-600/30'}`}>
                            {paymentStatus.label}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${orderStatus.bg} ${orderStatus.text} ${orderStatus.border}`}>
                            {orderStatus.label}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openStatusModal(order)} className="p-2 text-primary-900 hover:text-charcoal-600 hover:bg-primary-100 rounded-lg transition-colors" aria-label={`Gestionar ${order.order_number}`}>
                              <Eye className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 p-4 sm:p-6 border-t border-dark-border">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="btn-secondary px-4 py-2 min-h-10 disabled:opacity-50">Anterior</button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) pageNum = i + 1
                else if (currentPage <= 3) pageNum = i + 1
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i
                else pageNum = currentPage - 2 + i
                return (
                  <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`w-10 h-10 rounded-xl font-medium transition-all ${currentPage === pageNum ? 'bg-charcoal-600 text-white' : 'bg-primary-100 text-primary-900 hover:bg-primary-200 hover:text-primary-900 border border-dark-border'}`}>
                    {pageNum}
                  </button>
                )
              })}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="btn-secondary px-4 py-2 min-h-10 disabled:opacity-50">Siguiente</button>
            </div>
          )}
        </motion.div>
      </div>

      {statusModalOpen && selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-primary-50 border border-dark-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-dark-border flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-2xl text-primary-900">Pedido #{selectedOrder.order_number}</h2>
                <p className="text-primary-900 text-sm">{formatDateTime(selectedOrder.created_at)}</p>
              </div>
              <button onClick={() => setStatusModalOpen(false)} className="p-2 text-primary-900 hover:text-charcoal-600 transition-colors" aria-label="Cerrar">
                <Trash2 className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-primary-900 mb-3">Cliente</h3>
                  <p className="text-primary-900">{selectedOrder.customer_name}</p>
                  <p className="text-primary-900 text-sm">{selectedOrder.customer_email}</p>
                  <p className="text-primary-900 text-sm">{selectedOrder.customer_phone}</p>
                </div>
                <div>
                  <h3 className="font-medium text-primary-900 mb-3">Envío</h3>
                  <p className="text-primary-900">{selectedOrder.address}</p>
                  <p className="text-primary-900 text-sm">{selectedOrder.city}, {selectedOrder.province}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-primary-900 mb-3">Productos</h3>
                <div className="space-y-2">
                  {(selectedOrder.items || []).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-primary-100 rounded-xl">
                      <div>
                        <p className="font-medium text-primary-900">{item.product_name}</p>
                        <p className="text-primary-900 text-xs">{item.quantity} × {formatPrice(item.discount_price || item.unit_price)}</p>
                      </div>
                      <span className="font-display font-bold text-charcoal-600">{formatPrice(item.subtotal)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold border-t border-dark-border pt-4">
                <span className="text-primary-900">Total</span>
                <span className="text-charcoal-600">{formatPrice(selectedOrder.total)}</span>
              </div>

              <div>
                <h3 className="font-medium text-primary-900 mb-3">Cambiar estado</h3>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="input mb-4"
                >
                  {orderStatuses.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <button onClick={handleStatusChange} disabled={processing} className="btn-primary w-full py-3">
                  {processing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Actualizando...</span>
                    </>
                  ) : (
                    <span>Actualizar estado</span>
                  )}
                </button>
              </div>

              {history.length > 0 && (
                <div>
                  <h3 className="font-medium text-primary-900 mb-3">Historial de cambios</h3>
                  <div className="space-y-2">
                    {history.map((event, index) => (
                      <div key={index} className="p-3 bg-primary-100 rounded-xl">
                        <p className="font-medium text-primary-900">{event.status}</p>
                        <p className="text-primary-900 text-sm">{event.notes || 'Sin notas'}</p>
                        <p className="text-primary-900 text-xs">{formatDateTime(event.created_at)} · {event.first_name ? `${event.first_name} ${event.last_name}` : 'Sistema'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}