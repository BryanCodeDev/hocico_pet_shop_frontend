import { useState, useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Layers, Network, Boxes, Search, Copy, Check } from 'lucide-react'
import SEO from '../../components/seo/SEO'

const DOC_SECTIONS = [
  { id: 'overview', label: 'Visión general y stack' },
  { id: 'architecture', label: 'Arquitectura' },
  { id: 'database', label: 'Base de datos' },
  { id: 'auth', label: 'Autenticación y roles' },
  { id: 'pos', label: 'Módulo POS (caja)' },
  { id: 'online', label: 'Ventas online' },
  { id: 'payments', label: 'Pagos y facturación' },
  { id: 'catalog', label: 'Catálogo y administración' },
  { id: 'api', label: 'Catálogo de API (resumen)' },
  { id: 'frontend-state', label: 'Estado del frontend' },
  { id: 'services', label: 'Servicios y utilidades' },
  { id: 'env', label: 'Variables de entorno' },
  { id: 'errors', label: 'Manejo de errores' },
]

const ENDPOINTS = [
  { method: 'POST', path: '/api/auth/register', auth: 'Ninguno', desc: 'Registro de usuario (bcrypt + JWT en cookie HttpOnly).' },
  { method: 'POST', path: '/api/auth/login', auth: 'Ninguno', desc: 'Login. Emite JWT en cookie HttpOnly y devuelve usuario en el cuerpo.' },
  { method: 'POST', path: '/api/auth/logout', auth: 'Opcional', desc: 'Cierra sesión y elimina la cookie.' },
  { method: 'GET', path: '/api/auth/me', auth: 'Usuario', desc: 'Usuario autenticado + roles y permisos.' },
  { method: 'GET', path: '/api/products', auth: 'Público', desc: 'Listado con filtros (búsqueda, categoría, marca, precio, rating, orden, paginación, destacados).' },
  { method: 'GET', path: '/api/products/:id', auth: 'Admin', desc: 'Detalle de producto por id.' },
  { method: 'GET', path: '/api/products/slug/:slug', auth: 'Público', desc: 'Detalle de producto por slug.' },
  { method: 'POST', path: '/api/products', auth: 'Admin', desc: 'Crea un producto (incluye imágenes vía multipart).' },
  { method: 'PUT', path: '/api/products/:id', auth: 'Admin', desc: 'Actualiza un producto.' },
  { method: 'DELETE', path: '/api/products/:id', auth: 'Admin', desc: 'Borrado lógico (soft delete).' },
  { method: 'GET', path: '/api/categories', auth: 'Público', desc: 'Listado de categorías activas.' },
  { method: 'POST', path: '/api/orders', auth: 'Usuario', desc: 'Crea orden online (transacción: stock, orden, items, historial).' },
  { method: 'GET', path: '/api/orders', auth: 'Usuario', desc: 'Órdenes del usuario autenticado.' },
  { method: 'GET', path: '/api/orders/:id', auth: 'Usuario/Admin', desc: 'Detalle de orden con items, historial y factura.' },
  { method: 'GET', path: '/api/orders/admin/all', auth: 'Admin', desc: 'Todas las órdenes (paginado, filtro por estado).' },
  { method: 'PUT', path: '/api/orders/:id/status', auth: 'Admin', desc: 'Actualiza estado y registra historial.' },
  { method: 'POST', path: '/api/payments/create', auth: 'Usuario', desc: 'Crea preferencia de Mercado Pago (redirect init_point).' },
  { method: 'POST', path: '/api/payments/webhook', auth: 'IPN (MP)', desc: 'Webhook de Mercado Pago: valida firma HMAC e intenta notificación de pago.' },
  { method: 'GET', path: '/api/payments/status/:orderId', auth: 'Usuario', desc: 'Estado del pago de una orden.' },
  { method: 'GET', path: '/api/invoices/:id', auth: 'Admin', desc: 'Detalle de factura (Factus).' },
  { method: 'GET', path: '/api/stock', auth: 'Admin', desc: 'Movimientos de stock (paginado, filtros).' },
  { method: 'POST', path: '/api/stock/adjust', auth: 'Admin', desc: 'Ajuste manual de stock.' },
  { method: 'GET', path: '/api/admin/dashboard/stats', auth: 'Admin', desc: 'Estadísticas globales: ventas, órdenes, productos, usuarios, stock bajo.' },
  { method: 'GET', path: '/api/pos/cash-register/current', auth: 'Admin/Cashier', desc: 'Caja abierta del usuario autenticado.' },
  { method: 'POST', path: '/api/pos/cash-register/open', auth: 'Admin/Cashier', desc: 'Abre la caja con monto inicial.' },
  { method: 'POST', path: '/api/pos/cash-register/close', auth: 'Admin/Cashier', desc: 'Cierra la caja con monto de cierre y notas.' },
  { method: 'GET', path: '/api/pos/cash-register/:id', auth: 'Admin/Cashier', desc: 'Detalle de una caja específica.' },
  { method: 'GET', path: '/api/pos/cash-register/history', auth: 'Admin/Cashier', desc: 'Historial de cajas del usuario (últimos 30 días).' },
  { method: 'GET', path: '/api/pos/cash-register/admin/history', auth: 'Admin', desc: 'Historial de todas las cajas.' },
  { method: 'GET', path: '/api/pos/products/search', auth: 'Admin/Cashier', desc: 'Busca productos con stock disponible (paginado).' },
  { method: 'GET', path: '/api/pos/products/barcode/:barcode', auth: 'Admin/Cashier', desc: 'Obtiene un producto por código de barras.' },
  { method: 'POST', path: '/api/pos/sale', auth: 'Admin/Cashier', desc: 'Crea una venta POS (transacción + Factus en background).' },
  { method: 'GET', path: '/api/pos/sale/:id/receipt', auth: 'Admin/Cashier', desc: 'Recibo detallado de una venta POS.' },
  { method: 'GET', path: '/api/pos/sales', auth: 'Admin/Cashier', desc: 'Listado de ventas POS (paginado, filtros de fecha).' },
  { method: 'GET', path: '/api/pos/reports/daily', auth: 'Admin/Cashier', desc: 'Reporte diario de caja del usuario.' },
  { method: 'GET', path: '/api/pos/reports/admin/daily', auth: 'Admin', desc: 'Reporte diario consolidado de ventas POS.' },
  { method: 'GET', path: '/api/pos/reports/admin/by-channel', auth: 'Admin', desc: 'Ventas segmentadas por canal (online vs POS).' },
  { method: 'GET', path: '/api/pos/reports/admin/by-payment-method', auth: 'Admin', desc: 'Ventas segmentadas por método de pago.' },
  { method: 'GET', path: '/api/pos/reports/summary', auth: 'Admin', desc: 'Resumen ejecutivo de POS: totales, canales, métodos de pago, cajas.' },
  { method: 'GET', path: '/api/pos/reports/cash-registers', auth: 'Admin/Cashier', desc: 'Reporte de movimientos de caja (diferencias y cierres).' },
  { method: 'GET', path: '/api/health', auth: 'Ninguno', desc: 'Health check: { status: "ok", timestamp }. ' },
]

const SCHEMA_TABLES = `
roles
  id 1=admin, 2=user, 3=manager, 4=cashier  UNIQUE name
  permissions JSON (estructura: {module: [acciones]})

users
  id BIGINT PK AI  email UNIQUE  password (bcrypt)
  role_id → roles  first_name  last_name  phone  address  city  province
  is_active  created_at  updated_at  deleted_at

products
  id PK AI  sku UNIQUE  barcode UNIQUE  name  slug UNIQUE
  price  original_price  cost_price  stock  min_stock
  category_id → categories  brand_id → brands
  is_active  is_featured  images (JSON)
  created_at  updated_at  deleted_at

orders  (online + POS)
  id PK AI  order_number UNIQUE  user_id → users  channel ENUM(online,pos)
  status ENUM(pending,paid,preparing,shipped,delivered,cancelled,refunded)
  payment_status ENUM(pending,approved,rejected,cancelled,refunded,...)
  payment_method ENUM(wompi,whatsapp,bank_transfer,cash,card_pos,cash_on_delivery)
  subtotal  discount  shipping_cost  total  currency
  customer_name  customer_email  customer_phone
  customer_document_type  customer_document_number
  address  city  province  notes
  cash_register_id → cash_registers  invoice_id → invoices  paid_at
  created_at  updated_at

order_items
  id PK AI  order_id → orders CASCADE
  product_id  product_name  product_sku  product_slug
  quantity  unit_price  discount_price  subtotal  image

cash_registers
  id PK AI  user_id → users
  register_number  opening_amount  closing_amount  expected_amount  difference
  status ENUM(open,closed)  opened_at  closed_at  notes
  INDEX(user_id)  INDEX(status)

invoices
  id PK AI  order_id → orders
  factus_id  invoice_number  cufe  status ENUM(pending,sent,error,voided)
  xml_url  pdf_url  error_message  issued_at

stock_movements
  id PK AI  product_id → products  type ENUM(in,out)  quantity
  reason  reference_type  reference_id  created_by
  INDEX(product_id)  INDEX(created_at)

settings
  id PK AI  key VARCHAR(100) UNIQUE  value TEXT
  type ENUM(string,number,boolean,image,json)

Convenciones: InnoDB, soft-delete (deleted_at), timestamps UTC,
transacciones vía transaction(fn) (commit/rollback), FK CASCADE
para order_items/cart_items, ER_DUP_FIELDNAME tolerado en migraciones.
`

const ENV_VARS = `
# ── Backend (.env en backend/) ──
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=hocico_pet_shop
DB_PORT=3306

JWT_SECRET=<requerido>
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=<...>
CLOUDINARY_API_KEY=<...>
CLOUDINARY_API_SECRET=<...>

WOMPI_PRIVATE_KEY=sk_test_...
WOMPI_PUBLIC_KEY=AK_TEST_...
WOMPI_EVENT_ID=webhook-test

FACTUS_CLIENT_ID=<...>
FACTUS_CLIENT_SECRET=<...>
FACTUS_USERNAME=<...>
FACTUS_PASSWORD=<...>
FACTUS_BASE_URL=https://api.factus.com.co

FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# ── Frontend (.env en frontend/, prefijo VITE_) ──
VITE_API_URL=/api
VITE_CURRENCY=COP
VITE_SITE_NAME=Hocico Pet Shop
VITE_SITE_DESCRIPTION=...
`

/* ---------- Componentes reutilizables ---------- */

function Section({ id, index, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="bg-white border border-dark-border rounded-2xl p-5 sm:p-7">
        <div className="flex items-center gap-3 mb-5">
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-charcoal-600 text-white font-display font-bold text-sm flex items-center justify-center">
            {index}
          </span>
          <h2 className="font-display font-bold text-lg sm:text-xl text-primary-900">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  )
}

function Prose({ children }) {
  return (
    <div className="prose prose-sm max-w-none text-primary-900 [&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-primary-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:first:mt-0 [&_p]:leading-relaxed [&_ul]:ml-5 [&_ul]:space-y-1 [&_ol]:ml-5 [&_ol]:space-y-1 [&_li]:leading-relaxed [&_code]:font-mono [&_code]:bg-charcoal-600/10 [&_code]:text-charcoal-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[0.8em]">
      {children}
    </div>
  )
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard no disponible */
    }
  }

  return (
    <div className="relative mt-4">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-white/10 text-primary-100 hover:bg-white/20 transition-colors duration-200"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? 'Copiado' : 'Copiar'}
      </button>
      <pre className="bg-primary-900 text-primary-100 border border-primary-800 rounded-xl p-4 pr-24 overflow-x-auto text-xs leading-relaxed font-mono whitespace-pre">
        {code.trim()}
      </pre>
    </div>
  )
}

const METHOD_STYLES = {
  GET: 'bg-charcoal-600/10 text-charcoal-700',
  POST: 'bg-mustard-100 text-mustard-800',
  PUT: 'bg-primary-200 text-primary-800',
  DELETE: 'bg-red-600/10 text-red-700',
}

function authBadgeClass(auth) {
  if (auth === 'Admin') return 'bg-red-600/10 text-red-700'
  if (auth === 'Admin/Cashier') return 'bg-green-600/10 text-green-700'
  if (auth === 'Usuario/Admin') return 'bg-mustard-100 text-mustard-800'
  if (auth === 'Usuario') return 'bg-charcoal-600/10 text-charcoal-700'
  if (auth === 'Público' || auth === 'Ninguno') return 'bg-primary-100 text-primary-700'
  return 'bg-primary-100 text-primary-600 italic'
}

function EndpointsTable({ endpoints }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return endpoints
    return endpoints.filter(
      (e) =>
        e.path.toLowerCase().includes(q) ||
        e.desc.toLowerCase().includes(q) ||
        e.method.toLowerCase().includes(q) ||
        e.auth.toLowerCase().includes(q)
    )
  }, [endpoints, query])

  return (
    <div className="mt-4">
      <div className="relative mb-3">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-600" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por ruta, método o descripción…"
          className="w-full pl-10 pr-3 py-2.5 text-sm bg-primary-50 border border-dark-border rounded-lg focus:outline-none focus:border-charcoal-400 focus:ring-2 focus:ring-charcoal-300/40 transition-all duration-200"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-dark-border">
        <table className="w-full min-w-[640px] text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-primary-50 text-left text-primary-600">
              <th className="py-2.5 px-4 font-medium">Método</th>
              <th className="py-2.5 px-4 font-medium">Ruta</th>
              <th className="py-2.5 px-4 font-medium">Auth</th>
              <th className="py-2.5 px-4 font-medium">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e, i) => (
              <tr
                key={`${e.method}-${e.path}`}
                className={`border-t border-dark-border/60 transition-colors hover:bg-primary-50/80 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-cream-100/60'
                }`}
              >
                <td className="py-2.5 px-4">
                  <span className={`inline-flex w-16 justify-center font-mono text-[11px] font-bold px-1.5 py-0.5 rounded ${METHOD_STYLES[e.method] || 'bg-primary-100 text-primary-800'}`}>
                    {e.method}
                  </span>
                </td>
                <td className="py-2.5 px-4 font-mono text-xs text-primary-900">{e.path}</td>
                <td className="py-2.5 px-4 whitespace-nowrap">
                  <span className={`badge ${authBadgeClass(e.auth)}`}>{e.auth}</span>
                </td>
                <td className="py-2.5 px-4 text-primary-800">{e.desc}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 px-4 text-center text-primary-600">
                  No hay endpoints que coincidan con "{query}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-xs text-primary-600">
        Mostrando {filtered.length} de {endpoints.length} endpoints.
      </p>
    </div>
  )
}

/* ---------- Página ---------- */

export default function AdminHelp() {
  const [active, setActive] = useState(DOC_SECTIONS[0].id)
  const didInitialScroll = useRef(false)

  useEffect(() => {
    if (didInitialScroll.current) return
    didInitialScroll.current = true
    const id = window.location.hash.replace('#', '')
    if (!id) return
    const el = document.getElementById(id)
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }))
      setActive(id)
    }
  }, [])

  useEffect(() => {
    const sections = DOC_SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const goTo = (id) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <>
      <SEO
        title="Ayuda | Hocico Admin"
        description="Funcionamiento del sistema Hocico Pet Shop: módulos, roles, flujos y API."
        noindex
      />

      <div className="space-y-6 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-charcoal-600 flex items-center justify-center shadow-gold-sm">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary-900">Guía del sistema</h1>
              <p className="text-primary-700 mt-1.5 max-w-2xl leading-relaxed">
                Cómo funciona Hocico Pet Shop: dos canales de venta (online y POS), gestión de
                inventario, órdenes, pagos con facturación electrónica y administración completa.
                 Usa el índice para navegar a la sección que necesites.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 bg-white border border-dark-border rounded-2xl px-5 py-4">
              <div className="w-9 h-9 rounded-lg bg-charcoal-600/10 text-charcoal-700 flex items-center justify-center flex-shrink-0">
                <Layers className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-primary-900 leading-none">{DOC_SECTIONS.length}</p>
                <p className="text-xs text-primary-700 mt-1">Secciones</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white border border-dark-border rounded-2xl px-5 py-4">
              <div className="w-9 h-9 rounded-lg bg-mustard-100 text-mustard-800 flex items-center justify-center flex-shrink-0">
                <Network className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-primary-900 leading-none">{ENDPOINTS.length}</p>
                <p className="text-xs text-primary-700 mt-1">Endpoints</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white border border-dark-border rounded-2xl px-5 py-4">
              <div className="w-9 h-9 rounded-lg bg-primary-200 text-primary-800 flex items-center justify-center flex-shrink-0">
                <Boxes className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-display font-bold text-primary-900 leading-tight">React · Express · MySQL</p>
                <p className="text-xs text-primary-700 mt-1">Stack</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Selector rápido — móvil/tablet */}
        <div className="lg:hidden">
          <label htmlFor="doc-jump" className="sr-only">Ir a sección</label>
          <select
            id="doc-jump"
            value={active}
            onChange={(e) => goTo(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-dark-border text-primary-900 rounded-xl focus:outline-none focus:border-charcoal-400 focus:ring-2 focus:ring-charcoal-300/40 transition-all duration-200"
          >
            {DOC_SECTIONS.map((s, i) => (
              <option key={s.id} value={s.id}>{i + 1}. {s.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 min-w-0">
          <nav className="hidden lg:block lg:w-64 lg:flex-shrink-0 min-w-0" aria-label="Índice de documentación">
            <div className="lg:sticky lg:top-20 bg-white border border-dark-border rounded-2xl overflow-hidden">
              <p className="px-4 pt-4 pb-2 text-xs font-medium text-primary-600">Índice</p>
              <ul className="p-2 space-y-0.5">
                {DOC_SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={(e) => { e.preventDefault(); goTo(s.id) }}
                      className={`flex items-center gap-2.5 text-sm py-2 pl-3 pr-3 rounded-lg border-l-2 transition-colors duration-200 ${
                        active === s.id
                          ? 'bg-charcoal-600/10 border-charcoal-600 text-charcoal-700 font-semibold'
                          : 'border-transparent text-primary-700 font-medium hover:bg-primary-100 hover:text-charcoal-600'
                      }`}
                    >
                      <span className={`flex-shrink-0 w-4 text-[11px] font-mono ${active === s.id ? 'text-charcoal-600' : 'text-primary-500'}`}>{i + 1}</span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="flex-1 min-w-0 space-y-5">
            <Section id="overview" index={1} title="Visión general y stack">
              <Prose>
                <p>
                  Hocico Pet Shop administra el negocio de venta de productos para mascotas a través de
                  <b> dos canales de venta</b>: una tienda online (web) y un punto de venta (POS) para
                  la tienda física. El frontend es una aplicación React (SPA); el backend expone una API
                  REST que maneja catálogo, órdenes, pagos, inventario y la caja registradora del POS.
                </p>
                <h3>Stack</h3>
                <ul>
                  <li>
                    <b>Frontend:</b> React 18 + Vite + React Router v6 + Tailwind CSS + Axios +
                    react-hot-toast + react-helmet-async + recharts + lucide-react + framer-motion.
                  </li>
                  <li>
                    <b>Backend:</b> Node.js (ESM) + Express + MySQL (mysql2) + jsonwebtoken
                    + bcryptjs + cloudinary + mercadopago + cors/helmet/rate-limit/cookie-parser.
                  </li>
                  <li>
                    <b>Facturación:</b> Factus API (facturación electrónica Colombia) — se dispara
                    automáticamente después de confirmar una orden.
                  </li>
                  <li>
                    <b>Pagos online:</b> Mercado Pago (Wompi disponible como alternativa).
                  </li>
                </ul>
              </Prose>
            </Section>

            <Section id="architecture" index={2} title="Arquitectura">
              <Prose>
                <p>
                  El frontend arranca en <code>frontend/src/main.jsx</code> (HelmetProvider, BrowserRouter,
                  AuthProvider, CartProvider, ErrorBoundary, Toaster). <code>App.jsx</code> define el árbol de
                  rutas con <code>Layout</code> para rutas públicas, <code>AdminLayout</code> para
                  <code>/admin/*</code> y <code>CashierRoute</code> para <code>/pos/*</code>, protegidas
                  por <code>ProtectedRoute</code>, <code>AdminRoute</code> y <code>CashierRoute</code>.
                </p>
                <p>
                  El backend (<code>backend/src/index.js</code>) aplica helmet + cors + rate-limit (100 req/15 min)
                  + parsers (10 MB) + cookie-parser, monta las rutas en <code>/api/</code> y un manejador
                  centralizado de errores, con <code>GET /api/health</code>.
                </p>
                <h3>Rutas del SPA</h3>
                <ul>
                  <li>Públicas: <code>/</code>, <code>/tienda</code>, <code>/categoria/:slug</code>, <code>/producto/:slug</code>, <code>/carrito</code>, <code>/checkout</code>, <code>/buscar</code>, <code>/contacto</code>, etc.</li>
                  <li>Usuario: <code>/cuenta</code>, <code>/cuenta/pedido/:id</code>.</li>
                  <li>Admin: <code>/admin/*</code> — Dashboard, Productos, Categorías, Pedidos, Usuarios, Configuración, Ayuda.</li>
                  <li>Pos (cajero): <code>/pos/*</code> — Caja, búsqueda de productos, carrito, pago, recibo, reportes.</li>
                </ul>
                <h3>Estado global (contextos)</h3>
                <ul>
                  <li><code>AuthContext</code>: usuario, token, login/logout/register, refresco de sesión, flags <code>isAdmin</code>/<code>isCashier</code>.</li>
                  <li><code>CartContext</code>: carrito online, sincronización invitado → usuario.</li>
                  <li><code>WishlistContext</code>: lista de deseos en localStorage.</li>
                </ul>
                <h3>Servicios de API</h3>
                <p>
                  <code>services/api.js</code> (axios con <code>withCredentials</code>, interceptor de token), <code>services/pos.js</code> (caja y ventas POS), <code>services/admin.js</code> (CRUD completo + reportes POS).
                </p>
              </Prose>
            </Section>

            <Section id="database" index={3} title="Base de datos">
              <Prose>
                <p>
                  Esquema en <code>backend/src/utils/migrate.js</code> y <code>database.sql</code>. Todas las
                  tablas usan InnoDB, soft-delete (<code>deleted_at</code>) y timestamps UTC. El acceso es
                  vía <code>database.js</code>: <code>query</code>, <code>queryOne</code>,
                  <code>transaction(fn)</code> con commit/rollback automático.
                </p>
              </Prose>
              <CodeBlock code={SCHEMA_TABLES} />
            </Section>

            <Section id="auth" index={4} title="Autenticación y roles">
              <Prose>
                <h3>Flujo</h3>
                <ol>
                  <li><b>Login:</b> <code>POST /api/auth/login</code>. Verifica el hash bcrypt, firma un JWT <code>{'{id, role}'}</code> y lo envía en cookie HttpOnly (Secure, SameSite=Strict, 7 días). El frontend almacena el usuario en contexto y localStorage.</li>
                  <li><b>Request auth:</b> el middleware <code>authenticate</code> lee <code>req.cookies.token</code> o <code>Authorization: Bearer</code>, verifica el JWT y carga el usuario + permisos desde la tabla <code>roles.permissions</code> (JSON).</li>
                  <li><b>Autorización:</b> <code>authorize('admin')</code> o <code>authorize('cashier')</code> según la ruta. El <code>requirePermission(module, action)</code> verifica permisos granulares (solo para roles distintos a admin).</li>
                  <li><b>Logout:</b> <code>POST /api/auth/logout</code> borra la cookie y el cliente limpia el storage.</li>
                </ol>
                <h3>Roles</h3>
                <ul>
                  <li><b>admin (id=1):</b> acceso total. CRUD de productos, categorías, órdenes, usuarios, configuración. Dashboard completo. Reportes POS consolidados. Puede abrir/cerrar cualquier caja.</li>
                  <li><b>cashier (id=4):</b> acceso solo a <code>/pos/*</code>. Abre su propia caja, procesa ventas POS, cierra su caja, ve reportes diarios y el reporte de cajas de su usuario.</li>
                  <li><b>user (id=2):</b> tienda online. Carrito, checkout, historial de pedidos, perfil.</li>
                  <li><b>manager (id=3):</b> acceso limitado de administración (reservas futuras).</li>
                </ul>
              </Prose>
            </Section>

            <Section id="pos" index={5} title="Módulo POS (caja registradora)">
              <Prose>
                <h3>Concepto</h3>
                <p>
                  El POS permite operar la tienda física: escanear productos, armar el carrito,
                  cobrar en efectivo o tarjeta POS y facturar. Cada sesión requiere una <b>caja abierta</b>.
                </p>
                <h3>Flujo de caja</h3>
                <ol>
                  <li><b>Abrir caja:</b> el cajero ingresa el monto inicial. Se crea un registro en <code>cash_registers</code> con <code>status='open'</code>.</li>
                  <li><b>Vender:</b> cada venta POS asocia <code>cash_register_id</code>, descuenta stock transaccionalmente, genera la orden (<code>channel='pos'</code>, <code>status='paid'</code>) y, para efectivo, guarda <code>cash_received</code> en <code>notes</code>.</li>
                  <li><b>Facturar:</b> tras crear la orden, <code>triggerInvoiceGeneration()</code> envía la factura a Factus en background (no bloquea la venta).</li>
                  <li><b>Cerrar caja:</b> el cajero ingresa el monto físico de cierre. El sistema calcula <code>expected_amount = opening + ventas - cierres_previos</code>, <code>difference = closing - expected</code> y marca <code>status='closed'</code>.</li>
                </ol>
                <h3>Métodos de pago POS</h3>
                <ul>
                  <li><b>Efectivo:</b> el cajero ingresa el monto recibido; el sistema valida que cubra el total y calcula el cambio.</li>
                  <li><b>Tarjeta POS (<code>card_pos</code>):</b> se registra la venta; el cobro físico se realiza en el terminal.</li>
                </ul>
                <h3>Vista POS (frontend)</h3>
                <p>
                  La pantalla <code>/pos</code> (CashierRoute) muestra: barra de búsqueda y escáner de código de barras,
                  cuadrícula de productos con stock, carrito con control de cantidades, modal de pago y
                  recibo imprimible. Los administradores ven un botón de reportes integrado.
                </p>
              </Prose>
            </Section>

            <Section id="online" index={6} title="Ventas online">
              <Prose>
                <h3>Checkout</h3>
                <p>
                  El usuario agrega productos al carrito (persistido en localStorage para invitados, en la BD para usuarios).
                  Al checkout crea una orden <code>channel='online'</code>, <code>status='pending'</code> y luego
                  <code>POST /api/payments/create</code> genera una preferencia de Mercado Pago; el cliente se redirige
                  a <code>init_point</code> (checkout externo).
                </p>
                <h3>Webhook y confirmación</h3>
                <p>
                  Mercado Pago notifica <code>POST /api/payments/webhook</code> (valida firma HMAC). El webhook actualiza
                  <code>orders.payment_status</code>, la tabla <code>payments</code> y el historial. Si el pago es exitoso,
                  se dispara <code>triggerInvoiceGeneration()</code> para generar la factura electrónica.
                </p>
                <h3>Pago en efectivo contraentrega</h3>
                <p>
                  <code>payment_method = 'cash_on_delivery'</code> crea la orden como <code>pending</code> y el admin
                  la marca como <code>paid</code> al recibir el pago físico.
                </p>
              </Prose>
            </Section>

            <Section id="payments" index={7} title="Pagos y facturación">
              <Prose>
                <h3>Mercado Pago</h3>
                <p>
                  Se crea una preferencia con <code>payment_preferences</code> que incluye los items del carrito.
                  El cliente paga en la página de Mercado Pago y retorna al sitio (<code>success</code>/<code>pending</code>/<code>failure</code>).
                  El webhook confirma el pago y actualiza el estado de la orden.
                </p>
                <h3>Factus (facturación electrónica)</h3>
                <p>
                  Cuando una orden se paga (<code>payment_status = 'approved'</code>), se invoca <code>triggerInvoiceGeneration(orderId)</code>.
                  Este servicio obtiene tokens OAuth de Factus, construye el payload con el RUT del cliente, items, impuestos (IVA 19%) y envía
                  la factura. Si el cliente no tiene NIT, se usa NIT de la tienda. Los errores de Factus se registran en <code>invoices.status='error'</code>
                  sin fallar la venta.
                </p>
              </Prose>
            </Section>

            <Section id="catalog" index={8} title="Catálogo y administración">
              <Prose>
                <h3>Productos</h3>
                <p>
                  Cada producto tiene <code>sku</code>, <code>barcode</code>, precios (<code>price</code>, <code>original_price</code> para descuento),
                  <code>stock</code>, <code>min_stock</code>, imágenes y relaciones con categoría/marca. Al crear un producto se puede subir imágenes a
                    Cloudinary (multipart), que guarda las URLs en <code>images</code> (JSON). El descuento se muestra cuando <code>original_price &gt; price</code>.
                </p>
                <h3>Inventario</h3>
                <p>
                  Cada orden descuenta stock de forma atómica (<code>UPDATE products SET stock = stock - qty WHERE id = ? AND stock &gt;= qty</code>),
                  registrando cada movimiento en <code>stock_movements</code>. El admin puede hacer ajustes manuales de entrada/salida.
                </p>
                <h3>Órdenes</h3>
                <p>
                  Las órdenes pasan por estados: <code>pending → paid → preparing → shipped → delivered</code> (o <code>cancelled</code>/<code>refunded</code>).
                  Cada cambio de estado se registra en <code>order_status_history</code>. La factura electrónica se enlaza vía <code>invoice_id</code>.
                </p>
              </Prose>
            </Section>

            <Section id="api" index={9} title="Catálogo de API (resumen)">
              <Prose>
                <p>
                  Todas las rutas usan <code>/api</code> con body JSON. La autenticación usa cookie HttpOnly (cookie HttpOnly) o header <code>Authorization: Bearer</code>.
                </p>
              </Prose>
              <EndpointsTable endpoints={ENDPOINTS} />
            </Section>

            <Section id="frontend-state" index={10} title="Estado del frontend">
              <Prose>
                <h3>AuthContext</h3>
                <p>
                  Estado: <code>{'{user, loading, login, logout, register, updateProfile, isAuthenticated, isAdmin, isCashier}'}</code>. Token y usuario en localStorage.
                  <code>login</code> guarda la sesión y <code>logout</code> llama al API y borra el storage.
                  Al montar, <code>fetchUser</code> verifica la sesión activa.
                </p>
                <h3>CartContext</h3>
                <p>
                  Estado: carrito + helpers (<code>addItem</code>, <code>updateQuantity</code>, <code>clearCart</code>, <code>getTotal</code>, <code>getItemCount</code>).
                  Persistencia en localStorage para invitados y en BD para usuarios; <code>syncCart</code> fusiona el carrito anónimo al iniciar sesión.
                </p>
                <h3>WishlistContext</h3>
                <p>
                  Lista de IDs de producto en localStorage (cliente). No requiere endpoints de API.
                </p>
                <h3>POS (estado local)</h3>
                <p>
                  El módulo POS usa estado local dentro del componente <code>POS.jsx</code>: carrito, caja abierta,
                  búsqueda de productos y escáner de código de barras. La caja se carga al iniciar y se mantiene en estado.
                </p>
              </Prose>
            </Section>

            <Section id="services" index={11} title="Servicios y utilidades">
              <Prose>
                <h3>Servicios (frontend/src/services/)</h3>
                <ul>
                  <li><b>api.js:</b> axios (<code>baseURL: '/api'</code>, <code>withCredentials</code>), interceptor de respuesta (401 → redirige a <code>/login</code>).</li>
                  <li><b>products.js:</b> <code>fetchProducts</code>, <code>fetchProductBySlug</code>, <code>fetchCategories</code>, <code>fetchBrands</code>, <code>fetchProductById</code>.</li>
                  <li><b>admin.js:</b> CRUD de productos/categorías/órdenes/usuarios, estadísticas, configuración, carga de logo y servicios POS (<code>adminPosService</code>).</li>
                  <li><b>pos.js:</b> búsqueda de productos, ventas POS, apertura/cierre de caja, reportes y recibos.</li>
                </ul>
                <h3>Utilidades</h3>
                <ul>
                  <li><b>utils/helpers.js:</b> <code>formatPrice</code>, <code>formatDate</code>, <code>calculateDiscount</code>, <code>getStockStatus</code>, <code>getImageUrl</code>, <code>getProductImage</code>, <code>debounce</code>, <code>throttle</code>, <code>classNames</code>.</li>
                </ul>
              </Prose>
            </Section>

            <Section id="env" index={12} title="Variables de entorno">
              <CodeBlock code={ENV_VARS} />
            </Section>

            <Section id="errors" index={13} title="Manejo de errores">
              <Prose>
                <h3>Backend</h3>
                <p>
                  <code>middleware/errorHandler.js</code> formatea errores (success, message, errors, statusCode), distingue errores operacionales
                  (401/403/404/ValidationError) de errores de programación (500) y suprime el stack en producción. La validación de express-validator
                  retorna <code>{'{ errors: [...] }'}</code> en 400 para peticiones inválidas.
                </p>
                <p>
                  Las rutas async usan try/catch para que los errores lleguen al manejador centralizado. Las validaciones retornan
                  <code>&nbsp;400</code> con el detalle de los campos inválidos.
                </p>
                <h3>Frontend</h3>
                <ul>
                  <li><b>ErrorBoundary.jsx:</b> componente de clase con fallback UI y botón de recarga.</li>
                  <li><b>api.js:</b> 401 → redirige a <code>/login</code>; otros errores disparan toast vía react-hot-toast.</li>
                </ul>
              </Prose>
            </Section>
          </div>
        </div>
      </div>
    </>
  )
}

export { DOC_SECTIONS, ENDPOINTS, SCHEMA_TABLES, ENV_VARS }
