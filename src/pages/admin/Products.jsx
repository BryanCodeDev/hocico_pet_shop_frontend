import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { Plus, Search, Edit, Trash2, Copy, Eye, AlertTriangle, Package, Loader2, X } from 'lucide-react'
import SEO from '../../components/seo/SEO'
import { adminProductService } from '../../services/admin'
import { formatPrice, getStockStatus } from '../../utils/helpers'
import toast from 'react-hot-toast'

export default function AdminProducts() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [deleteModal, setDeleteModal] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [currentPage, status, searchParams.get('filter')])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = {
        page: currentPage,
        limit: 20,
        status: status || undefined,
        ...(searchParams.get('filter') === 'low-stock' && { lowStock: 'true' }),
        ...(search && { search }),
      }
      const data = await adminProductService.getAll(params)
      setProducts(data.products || [])
      setTotalPages(data.pagination?.totalPages || 1)
      setTotalProducts(data.pagination?.total || 0)
    } catch (error) {
      console.error('Fetch products error:', error)
      toast.error('Error al cargar productos')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const product = products.find(p => p.id === id)
    if (product) {
      setDeleteModal(product)
    }
  }

  const confirmDelete = async () => {
    if (!deleteModal) return
    try {
      await adminProductService.delete(deleteModal.id)
      toast.success('Producto eliminado correctamente')
      setDeleteModal(null)
      fetchProducts()
    } catch (error) {
      console.error('Delete product error:', error)
      toast.error('Error al eliminar producto')
    }
  }

  const handleDuplicate = async (id) => {
    try {
      await adminProductService.duplicate(id)
      toast.success('Producto duplicado correctamente')
      fetchProducts()
    } catch (error) {
      console.error('Duplicate product error:', error)
      toast.error('Error al duplicar producto')
    }
  }

  const handleToggleFeatured = async (id) => {
    try {
      await adminProductService.toggleFeatured(id)
      toast.success('Estado destacado actualizado')
      fetchProducts()
    } catch (error) {
      console.error('Toggle featured error:', error)
      toast.error('Error al actualizar producto')
    }
  }

  const handleToggleStatus = async (id) => {
    try {
      await adminProductService.toggleStatus(id)
      toast.success('Estado actualizado')
      fetchProducts()
    } catch (error) {
      console.error('Toggle status error:', error)
      toast.error('Error al actualizar producto')
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchProducts()
  }

  const clearFilters = () => {
    setSearch('')
    setStatus('')
    setCurrentPage(1)
    setSearchParams({})
    fetchProducts()
  }

  const hasFilters = search || status || searchParams.get('filter') === 'low-stock'

  return (
    <>
      <SEO
        title="Productos | Hocico Admin"
        description="Gestiona el catálogo de productos de Hocico Pet Shop."
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
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary-900">Productos</h1>
            <p className="text-primary-900 mt-2">{totalProducts} productos en el catálogo</p>
          </div>
          <Link to="/admin/productos/nuevo" className="btn-primary w-full sm:w-auto justify-center">
            <Plus className="w-5 h-5" />
            <span>Nuevo producto</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="min-w-0 p-4 sm:p-6 bg-primary-50 border border-dark-border rounded-2xl"
        >
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4 min-w-0">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-700" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre, SKU o slug..."
                className="w-full pl-12 pr-4 py-3 bg-primary-100 border border-dark-border rounded-xl text-primary-900 placeholder:text-primary-700 focus:outline-none focus:border-charcoal-500 focus:ring-1 focus:ring-charcoal-500"
              />
            </div>
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setCurrentPage(1) }}
              className="input py-3 px-4 bg-primary-100 w-full sm:w-auto"
            >
              <option value="">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
            {hasFilters && (
              <button type="button" onClick={clearFilters} className="btn-secondary px-6 w-full sm:w-auto">
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
                <motion.div key={i} className="skeleton h-20 rounded-xl" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <Package className="w-20 h-20 text-primary-800 mb-4" />
              <h2 className="font-display font-bold text-2xl text-primary-900 mb-2">No se encontraron productos</h2>
              <p className="text-primary-900 mb-6">Prueba con otros filtros o crea un nuevo producto</p>
              <Link to="/admin/productos/nuevo" className="btn-primary w-full sm:w-auto">Crear producto</Link>
            </div>
          ) : (
            <div className="overflow-x-auto min-w-0">
              <table className="w-full min-w-[840px] text-sm">
                <thead>
                  <tr className="border-b border-dark-border bg-primary-50/50 text-left text-primary-900">
                    <th className="py-4 px-6 font-medium">Producto</th>
                    <th className="py-4 px-6 font-medium">SKU</th>
                    <th className="py-4 px-6 font-medium">Categoría</th>
                    <th className="py-4 px-6 font-medium">Precio</th>
                    <th className="py-4 px-6 font-medium">Stock</th>
                    <th className="py-4 px-6 font-medium">Estado</th>
                    <th className="py-4 px-6 font-medium text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => {
                    const stockStatus = getStockStatus(product.stock, product.min_stock)
                    return (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        onClick={() => setSelectedProduct(product.id)}
                        className={`border-b border-dark-border/50 hover:bg-primary-50/50 cursor-pointer transition-colors ${
                          selectedProduct === product.id 
                            ? 'bg-yellow-100 border-yellow-300 shadow-[0_0_0_2px_theme(colors.yellow.300)]' 
                            : ''}`}
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-primary-100 flex-shrink-0">
                              <img src={product.main_image || '/assets/images/producto1.webp'} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-primary-900 truncate max-w-xs">{product.name}</p>
                              <p className="text-primary-900 text-xs truncate">{product.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-primary-900">{product.sku}</td>
                        <td className="py-4 px-6 text-primary-900">{product.category_name || 'Sin categoría'}</td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-charcoal-600">{formatPrice(product.price)}</p>
                            {product.original_price && product.original_price > product.price && (
                              <p className="text-primary-900 text-xs line-through">{formatPrice(product.original_price)}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${stockStatus.level === 'out' ? 'text-red-500' : stockStatus.level === 'low' ? 'text-yellow-400' : 'text-green-400'}`}>
                              {product.stock}
                            </span>
                            {stockStatus.level === 'low' && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                            {stockStatus.level === 'out' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.is_active ? 'bg-green-600/20 text-green-400 border border-green-600/30' : 'bg-red-600/20 text-red-500 border border-red-600/30'}`}>
                              {product.is_active ? 'Activo' : 'Inactivo'}
                            </span>
                            {product.is_featured && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-charcoal-600/10 text-charcoal-600 border border-charcoal-600/20">
                                Destacado
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/admin/productos/${product.id}/editar`} className="min-h-10 min-w-10 p-2 text-primary-900 hover:text-charcoal-600 hover:bg-primary-100 rounded-lg transition-colors" aria-label={`Editar ${product.name}`}>
                              <Edit className="w-5 h-5" />
                            </Link>
                            <Link to={`/producto/${product.slug}`} target="_blank" className="min-h-10 min-w-10 p-2 text-primary-900 hover:text-charcoal-600 hover:bg-primary-100 rounded-lg transition-colors" aria-label={`Ver ${product.name}`}>
                              <Eye className="w-5 h-5" />
                            </Link>
                            <button onClick={() => handleDuplicate(product.id)} className="min-h-10 min-w-10 p-2 text-primary-900 hover:text-charcoal-600 hover:bg-primary-100 rounded-lg transition-colors" aria-label={`Duplicar ${product.name}`}>
                              <Copy className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleToggleFeatured(product.id)} className={`min-h-10 min-w-10 p-2 rounded-lg transition-colors ${product.is_featured ? 'text-charcoal-600 hover:bg-charcoal-600/10' : 'text-primary-900 hover:text-charcoal-600 hover:bg-primary-100'}`} aria-label={`Marcar como destacado ${product.name}`}>
                              <Package className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleToggleStatus(product.id)} className={`min-h-10 min-w-10 p-2 rounded-lg transition-colors ${product.is_active ? 'text-primary-900 hover:text-charcoal-600 hover:bg-charcoal-600/10' : 'text-primary-900 hover:text-green-400 hover:bg-green-600/10'}`} aria-label={`${product.is_active ? 'Desactivar' : 'Activar'} ${product.name}`}>
                              {product.is_active ? <Trash2 className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                            </button>
                            <button onClick={() => handleDelete(product.id)} className="min-h-10 min-w-10 p-2 text-primary-900 hover:text-red-500 hover:bg-red-600/10 rounded-lg transition-colors" aria-label={`Eliminar ${product.name}`}>
                              <Trash2 className="w-5 h-5" />
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
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="btn-secondary px-4 py-2 disabled:opacity-50">Anterior</button>
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
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="btn-secondary px-4 py-2 disabled:opacity-50">Siguiente</button>
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setDeleteModal(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-primary-50 border border-dark-border rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 id="delete-modal-title" className="font-display font-bold text-xl text-primary-900">Eliminar producto</h2>
                <button
                  onClick={() => setDeleteModal(null)}
                  className="min-h-10 min-w-10 p-1 text-primary-900 hover:text-charcoal-600 hover:bg-primary-100 rounded-lg transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-primary-900 mb-6">
                ¿Estás seguro de que quieres eliminar <strong className="text-charcoal-600">"{deleteModal.name}"</strong>? Esta acción no se puede deshacer.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={() => setDeleteModal(null)}
                  className="btn-secondary w-full sm:w-auto"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 px-6 rounded-xl transition-colors w-full sm:w-auto"
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}