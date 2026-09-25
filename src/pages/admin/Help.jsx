import { useState, useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Layers, Network, Boxes, Search, Copy, Check } from 'lucide-react'
import SEO from '../../components/seo/SEO'

const DOC_SECTIONS = [
  { id: 'overview', label: 'Visión general y stack' },
  { id: 'architecture', label: 'Arquitectura' },
  { id: 'database', label: 'Base de datos' },
  { id: 'auth', label: 'Autenticación y roles' },
  { id: 'api', label: 'Catálogo de API (resumen)' },
  { id: 'business', label: 'Reglas de negocio' },
  { id: 'frontend-state', label: 'Estado del frontend' },
  { id: 'services', label: 'Servicios y utilidades' },
  { id: 'env', label: 'Variables de entorno' },
  { id: 'errors', label: 'Manejo de errores' },
]

const ENDPOINTS = [
  { method: 'POST', path: '/api/auth/register', auth: 'Ninguno', desc: 'Registro de usuario (bcrypt + JWT en cookie HttpOnly).' },
  { method: 'POST', path: '/api/auth/login', auth: 'Ninguno', desc: 'Login. Emite JWT en cookie HttpOnly + usuario en body.' },
  { method: 'POST', path: '/api/auth/logout', auth: 'Opcional', desc: 'Cierra sesión y borra la cookie.' },
  { method: 'GET', path: '/api/auth/profile', auth: 'Usuario', desc: 'Devuelve el perfil del usuario autenticado.' },
  { method: 'PUT', path: '/api/auth/profile', auth: 'Usuario', desc: 'Actualiza nombre, email, teléfono y avatar.' },
  { method: 'PUT', path: '/api/auth/change-password', auth: 'Usuario', desc: 'Cambia la contraseña (verifica actual).' },
  { method: 'POST', path: '/api/auth/forgot-password', auth: 'Ninguno', desc: 'Envía email de restablecimiento.' },
  { method: 'POST', path: '/api/auth/reset-password/:token', auth: 'Ninguno', desc: 'Restablece la contraseña con token válido.' },
  { method: 'GET', path: '/api/products', auth: 'Público', desc: 'Listado con filtros: búsqueda, categoría, marca, rango de precio, rating, orden, paginación, destacados.' },
  { method: 'GET', path: '/api/products/:id', auth: 'Admin', desc: 'Detalle de producto por id.' },
  { method: 'GET', path: '/api/products/slug/:slug', auth: 'Público', desc: 'Detalle de producto por slug (frontend).' },
  { method: 'GET', path: '/api/products/related/:id', auth: 'Público', desc: 'Productos relacionados (misma categoría).' },
  { method: 'POST', path: '/api/products', auth: 'Admin', desc: 'Crea un producto (incluye imágenes).' },
  { method: 'PUT', path: '/api/products/:id', auth: 'Admin', desc: 'Actualiza un producto.' },
  { method: 'DELETE', path: '/api/products/:id', auth: 'Admin', desc: 'Borrado lógico (soft delete) del producto.' },
  { method: 'GET', path: '/api/categories', auth: 'Público', desc: 'Listado de categorías activas.' },
  { method: 'GET', path: '/api/categories/:slug', auth: 'Público', desc: 'Categoría + productos asociados.' },
  { method: 'POST', path: '/api/categories', auth: 'Admin', desc: 'Crea una categoría.' },
  { method: 'GET', path: '/api/categories/admin', auth: 'Admin', desc: 'Listado admin (incluye inactivas).' },
  { method: 'PUT', path: '/api/categories/:id', auth: 'Admin', desc: 'Actualiza una categoría.' },
  { method: 'DELETE', path: '/api/categories/:id', auth: 'Admin', desc: 'Borrado lógico (falla si hay productos activos).' },
  { method: 'GET', path: '/api/brands', auth: 'Público', desc: 'Listado de marcas.' },
  { method: 'POST', path: '/api/orders', auth: 'Usuario', desc: 'Crea orden (transacción: stock, orden, items, historial, vacía carrito).' },
  { method: 'GET', path: '/api/orders', auth: 'Usuario', desc: 'Órdenes del usuario autenticado.' },
  { method: 'GET', path: '/api/orders/:id', auth: 'Usuario/Admin', desc: 'Detalle de orden con items, historial y pago.' },
  { method: 'GET', path: '/api/orders/admin/all', auth: 'Admin', desc: 'Todas las órdenes (paginado, filtro por estado).' },
  { method: 'PUT', path: '/api/orders/:id/status', auth: 'Admin', desc: 'Actualiza estado y registra historial.' },
  { method: 'DELETE', path: '/api/orders/:id', auth: 'Usuario', desc: 'Cancela una orden (solo si es cancelable).' },
  { method: 'POST', path: '/api/orders/:id/reorder', auth: 'Usuario', desc: 'Reordena: vuelve a agregar items al carrito.' },
  { method: 'GET', path: '/api/cart', auth: 'Usuario', desc: 'Carrito del usuario.' },
  { method: 'POST', path: '/api/cart', auth: 'Usuario', desc: 'Agrega un item al carrito.' },
  { method: 'PUT', path: '/api/cart/:itemId', auth: 'Usuario', desc: 'Actualiza cantidad de un item.' },
  { method: 'DELETE', path: '/api/cart/:itemId', auth: 'Usuario', desc: 'Elimina un item del carrito.' },
  { method: 'DELETE', path: '/api/cart', auth: 'Usuario', desc: 'Vacía el carrito.' },
  { method: 'POST', path: '/api/cart/merge', auth: 'Usuario', desc: 'Fusiona el carrito anónimo (guest) con el del usuario.' },
  { method: 'POST', path: '/api/payments/create', auth: 'Usuario', desc: 'Crea preferencia de Mercado Pago (redirect init_point).' },
  { method: 'POST', path: '/api/payments/webhook', auth: 'IPN (MP)', desc: 'Webhook de Mercado Pago: valida firma HMAC e intenta notificación de pago.' },
  { method: 'GET', path: '/api/payments/status/:orderId', auth: 'Usuario', desc: 'Estado del pago de una orden.' },
  { method: 'GET', path: '/api/users', auth: 'Admin', desc: 'Listado de usuarios (paginado + búsqueda + estado).' },
  { method: 'GET', path: '/api/users/:id', auth: 'Admin', desc: 'Detalle de usuario.' },
  { method: 'PUT', path: '/api/users/:id', auth: 'Admin', desc: 'Actualiza rol/estado de usuario.' },
  { method: 'DELETE', path: '/api/users/:id', auth: 'Admin', desc: 'Borrado lógico de usuario.' },
  { method: 'GET', path: '/api/admin/dashboard/stats', auth: 'Admin', desc: 'Estadísticas globales: ventas, pedidos, productos, usuarios, stock bajo.' },
  { method: 'GET', path: '/api/admin/settings', auth: 'Admin', desc: 'Obtiene la configuración del sitio (key/value).' },
  { method: 'PUT', path: '/api/admin/settings', auth: 'Admin', desc: 'Actualiza valores de configuración.' },
  { method: 'POST', path: '/api/admin/settings/upload', auth: 'Admin', desc: 'Sube logo a Cloudinary y guarda la URL.' },
  { method: 'GET', path: '/api/health', auth: 'Ninguno', desc: 'Health check: { status: "ok", timestamp }.' },
]

const SCHEMA_TABLES = `
roles
  id        TINYINT PK (1=admin, 2=user)  UNIQUE name  created_at

users
  id BIGINT PK AI  uuid VARCHAR(36) UNIQUE  name  email UNIQUE  password(bcrypt)
  role_id TINYINT→roles  avatar  phone  is_active  created_at updated_at deleted_at

categories
  id PK AI  slug UNIQUE  name  description  image  is_active  created_at updated_at deleted_at

brands
  id PK AI  slug UNIQUE  name  is_active  created_at

products
  id PK AI  sku UNIQUE  name  slug UNIQUE  description  price  compare_price  cost_price
  category_id→categories  brand_id→brands  stock  sold  rating  reviews_count
  is_active  is_featured  created_at updated_at deleted_at
  INDEXES: (category_id,is_active) (brand_id) (price) (slug)

product_images
  id PK AI  product_id→products CASCADE  url  alt  is_primary  sort_order  INDEX(product_id)

cart_items
  id PK AI  user_id→users CASCADE  guest_id  product_id→products CASCADE  quantity
  INDEX(user_id) INDEX(guest_id)  (user_id XOR guest_id requerido)

orders
  id PK AI  order_number UNIQUE  user_id→users  status ENUM(pending,processing,shipped,
  delivered,cancelled,refunded)  total  subtotal  tax  shipping_cost  discount
  payment_method  payment_status ENUM(pending,paid,failed,refunded,... )  payment_id
  shipping_address(JSON)  notes  created_at updated_at
  INDEXES: (user_id,status) (status) (order_number) (created_at)

order_items
  id PK AI  order_id→orders CASCADE  product_id→products  variant  quantity  price  total
  INDEX(order_id)

order_status_history
  id PK AI  order_id→orders CASCADE  status  note  created_at  INDEX(order_id)

payments
  id PK AI  order_id→orders  payment_method  amount  currency  status ENUM(pending,paid,
  failed,refunded)  transaction_id  metadata(JSON)  created_at  INDEX(order_id)

reviews
  id PK AI  product_id→products CASCADE  user_id→users  rating(1-5)  comment  created_at
  INDEX(product_id) INDEX(user_id) UNIQUE(product_id,user_id)

settings
  id PK AI  \`key\` VARCHAR(100) UNIQUE  value TEXT  type ENUM(string,number,boolean,image,json)
  created_at updated_at

Convenciones: InnoDB, soft-delete (deleted_at), timestamps UTC,
transacciones vía database.transaction (commit/rollback), FK CASCADE para
product_images/order_items/cart_items.
`

const ENV_VARS = `
# ── Backend (.env en backend/) ──
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=hocico_pet_shop
DB_PORT=3306

JWT_SECRET=<requerido>        # firma y verificación de JWT
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=<...>
CLOUDINARY_API_KEY=<...>
CLOUDINARY_API_SECRET=<...>

MP_ACCESS_TOKEN=<Mercado Pago>
MP_CLIENT_ID=<...>
MP_CLIENT_SECRET=<...>
MP_WEBHOOK_SECRET=<firma HMAC>
MP_SUCCESS_URL=https://...
MP_FAILURE_URL=https://...

FRONTEND_URL=http://localhost:5173   # origen permitido en CORS
NODE_ENV=development

# ── Frontend (.env en frontend/, prefijo VITE_) ──
VITE_API_URL=/api
VITE_CURRENCY=USD
VITE_SITE_NAME=Hocico Pet Shop
VITE_SITE_DESCRIPTION=...
`

/* ---------- Piezas reutilizables ---------- */

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
      /* clipboard no disponible: no-op */
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

      <p className="mt-3 text-xs text-primary-700 bg-primary-50 border border-dark-border rounded-lg px-3 py-2">
        Nota: <code className="font-mono bg-charcoal-600/10 text-charcoal-800 px-1.5 py-0.5 rounded text-[0.8em]">POST /api/payments/webhook</code> es llamado por Mercado Pago
        (valida firma HMAC) y <code className="font-mono bg-charcoal-600/10 text-charcoal-800 px-1.5 py-0.5 rounded text-[0.8em]">GET /api/health</code> es el health check.
      </p>
    </div>
  )
}

/* ---------- Página ---------- */

export default function AdminHelp() {
  const [active, setActive] = useState(DOC_SECTIONS[0].id)
  const didInitialScroll = useRef(false)

  // Al montar: si hay hash en la URL, ir directo a esa sección
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

  // Scrollspy: resalta en el índice la sección visible mientras se hace scroll
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
        description="Documentación del sistema Hocico Pet Shop: arquitectura, API, base de datos y reglas de negocio."
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
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary-900">Ayuda y documentación</h1>
              <p className="text-primary-700 mt-1.5 max-w-2xl leading-relaxed">
                Documentación completa de Hocico Pet Shop: stack, arquitectura, modelo de datos,
                catálogo de endpoints de la API, reglas de negocio y estado del frontend.
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
                <p className="text-xs text-primary-700 mt-1">Secciones documentadas</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white border border-dark-border rounded-2xl px-5 py-4">
              <div className="w-9 h-9 rounded-lg bg-mustard-100 text-mustard-800 flex items-center justify-center flex-shrink-0">
                <Network className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-primary-900 leading-none">{ENDPOINTS.length}</p>
                <p className="text-xs text-primary-700 mt-1">Endpoints de la API</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white border border-dark-border rounded-2xl px-5 py-4">
              <div className="w-9 h-9 rounded-lg bg-primary-200 text-primary-800 flex items-center justify-center flex-shrink-0">
                <Boxes className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-display font-bold text-primary-900 leading-tight">React · Express · MySQL</p>
                <p className="text-xs text-primary-700 mt-1">Stack principal</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Selector rápido — solo móvil/tablet */}
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
                  Hocico Pet Shop es una aplicación e-commerce completa dedicada a las mascotas. El
                  frontend es una aplicación React (SPA) con panel de administración; el
                  backend es una API REST en Express con base de datos MySQL, autenticación
                  JWT (cookie HttpOnly + Bearer), autorización basada en roles (RBAC),
                  carrito persistente (invitado → usuario), creación de órdenes
                  transaccional y pagos vía Mercado Pago.
                </p>
                <h3>Stack</h3>
                <ul>
                  <li>
                    <b>Frontend:</b> React 18 + Vite + React Router v6 + Tailwind CSS + Axios
                    + React Hook Form/Yup + react-hot-toast + react-helmet-async +
                    recharts + lucide-react + framer-motion.
                  </li>
                  <li>
                    <b>Backend:</b> Node.js (ESM) + Express + MySQL (mysql2) + jsonwebtoken
                    + bcryptjs + cloudinary + mercadopago + cors/helmet/rate-limit/cookie-parser.
                  </li>
                  <li>
                    <b>Infraestructura:</b> Railway (API) + Netlify (SPA), Cloudinary
                    (imágenes) y Mercado Pago (pagos).
                  </li>
                </ul>
              </Prose>
            </Section>

            <Section id="architecture" index={2} title="Arquitectura">
              <Prose>
                <p>
                  El frontend arranca en <code>frontend/src/main.jsx</code> (HelmetProvider,
                  BrowserRouter, ErrorBoundary, Toaster). <code>App.jsx</code> define el árbol
                  de rutas envuelto en <code>AuthProvider → CartProvider → WishlistProvider</code>,
                  con <code>Layout</code> para rutas públicas y <code>AdminLayout</code> para
                  <code>/admin/*</code>, protegidas por <code>ProtectedRoute</code>/<code>AdminRoute</code>.
                </p>
                <p>
                  El backend (<code>backend/src/index.js</code>) aplica helmet + cors +
                  rate-limit (100 req/15 min) + parsers (10 MB) + cookie-parser, monta las
                  rutas en <code>/api/</code> y un manejador centralizado de errores, con
                  <code>GET /api/health</code>.
                </p>
                <h3>Línea base de rutas (SPA)</h3>
                <ul>
                  <li>Públicas: <code>/</code>, <code>/tienda</code>, <code>/categoria/:slug</code>, <code>/producto/:slug</code>, <code>/carrito</code>, <code>/checkout</code>, <code>/buscar</code>, <code>/contacto</code>, etc.</li>
                  <li>Protegidas (usuario): <code>/cuenta</code>, <code>/cuenta/pedido/:id</code>, <code>/checkout</code>.</li>
                  <li>Admin: <code>/admin/*</code> (Dashboard, Productos, Categorías, Pedidos, Usuarios, Configuración, Ayuda).</li>
                </ul>
                <h3>Estado global (contextos)</h3>
                <ul>
                  <li><code>AuthContext</code>: usuario, token (localStorage + cookie), login/logout/register, refresco de sesión.</li>
                  <li><code>CartContext</code>: carrito, sincronización con el servidor y fusión del carrito anónimo al iniciar sesión.</li>
                  <li><code>WishlistContext</code>: lista de deseos (localStorage, cliente).</li>
                </ul>
                <h3>Servicios de API</h3>
                <p>
                  <code>services/api.js</code> (axios con <code>withCredentials</code>, interceptor de token y redirección 401), <code>services/products.js</code> y <code>services/admin.js</code> (CRUD de productos, categorías, órdenes, usuarios, configuración y estadísticas).
                </p>
              </Prose>
            </Section>

            <Section id="database" index={3} title="Base de datos">
              <Prose>
                <p>
                  Esquema en <code>backend/src/utils/migrate.js</code>. Todas las tablas usan
                  InnoDB, soft-delete (<code>deleted_at</code>) y timestamps UTC. Se accede vía
                  <code>database.js</code> (<code>query</code>, <code>queryOne</code>,
                  <code>transaction(fn)</code> con commit/rollback).
                </p>
              </Prose>
              <CodeBlock code={SCHEMA_TABLES} />
            </Section>

            <Section id="auth" index={4} title="Autenticación y roles">
              <Prose>
                <h3>Flujo</h3>
                <ol>
                  <li><b>Registro:</b> <code>POST /api/auth/register</code>. Hash bcrypt, JWT en cookie HttpOnly (Secure, SameSite=Strict, 7 días).</li>
                  <li><b>Login:</b> <code>POST /api/auth/login</code>. Verifica hash con bcrypt, firma JWT <code>{'{id,uuid,role}'}</code>, devuelve usuario + cookie.</li>
                  <li><b>Request auth:</b> el servidor lee <code>req.cookies.token</code> o <code>Authorization: Bearer</code>, verifica JWT y carga el usuario de la BD (<code>req.user</code>).</li>
                  <li><b>Autorización:</b> <code>authorize('admin')</code> en rutas admin; <code>authorize()</code> (usuario/admin) en rutas de cliente.</li>
                  <li><b>Logout:</b> borra la cookie y el token del cliente.</li>
                </ol>
                <h3>Roles</h3>
                <ul>
                  <li><b>admin (id=1):</b> acceso total a <code>/api/admin/*</code>, CRUD de productos/categorías/órdenes/usuarios, dashboard, configuración.</li>
                  <li><b>user (id=2):</b> carrito, checkout, historial de pedidos, perfil.</li>
                </ul>
              </Prose>
            </Section>

            <Section id="api" index={5} title="Catálogo de API (resumen)">
              <Prose>
                <p>
                  Todas las rutas usan <code>/api</code> con body JSON y la cookie HttpOnly
                  (o header <code>Authorization</code>).
                </p>
              </Prose>
              <EndpointsTable endpoints={ENDPOINTS} />
            </Section>

            <Section id="business" index={6} title="Reglas de negocio">
              <Prose>
                <h3>Creación de orden (transacción)</h3>
                <p>
                  <code>POST /api/orders</code> requiere autenticación. Dentro de una
                  transacción: (1) verifica y descuenta stock con <code>UPDATE … SET stock = stock - qty WHERE id = ? AND stock &gt;= qty</code>; si falla, rollback; (2) inserta la orden (<code>generateOrderNumber()</code> → <code>ORD-YYYYMMDD-XXXX-RNNNN</code>); (3) inserta <code>order_items</code>; (4) registra <code>order_status_history</code>; (5) vacía el carrito. En error → rollback y 500.
                </p>
                <h3>Carrito</h3>
                <p>
                  Los invitados usan carrito en <code>localStorage</code>; al iniciar sesión el
                  frontend llama <code>POST /api/cart/merge</code> para fusionar cantidades.
                  Los usuarios autenticados persisten su carrito en la BD.
                </p>
                <h3>Pagos (Mercado Pago)</h3>
                <p>
                  El checkout crea la orden y luego <code>POST /api/payments/create</code> genera
                  una preferencia de Mercado Pago; el cliente se redirige a <code>init_point</code>.
                  El webhook actualiza <code>orders.payment_status</code>, la tabla <code>payments</code>
                  y el historial. El frontend sondea <code>GET /api/payments/status/:orderId</code>.
                </p>
                <h3>Borrado lógico y otras reglas</h3>
                <ul>
                  <li>Los productos/categorías/usuarios se "borran" con <code>deleted_at</code>; las listas filtran <code>deleted_at IS NULL</code>.</li>
                  <li>Borrar una categoría con productos activos falla (restricción).</li>
                  <li><code>compare_price</code> &gt; <code>price</code> muestra el porcentaje de descuento.</li>
                  <li>Cancelar orden solo permitido en estados <code>pending</code>/<code>processing</code>.</li>
                </ul>
              </Prose>
            </Section>

            <Section id="frontend-state" index={7} title="Estado del frontend">
              <Prose>
                <h3>AuthContext</h3>
                <p>
                  Estado: <code>{'{user, token, isAuthenticated, isLoading, error}'}</code>. Token y
                  usuario en <code>localStorage</code>. <code>login</code> guarda el token y
                  refresca la sesión; <code>logout</code> llama al API y borra el storage.
                  Al montar, decodifica el JWT y expira la sesión automáticamente si venció.
                </p>
                <h3>CartContext</h3>
                <p>
                  Estado: carrito + helpers (<code>addItem</code>, <code>updateQuantity</code>,
                  <code>clearCart</code>, <code>getTotal</code>, <code>getItemCount</code>,
                  <code>syncGuestCart</code>). Persistencia en <code>localStorage</code> para
                  invitados y en BD para usuarios; <code>syncGuestCart</code> fusiona al login.
                </p>
                <h3>WishlistContext</h3>
                <p>
                  Lista de IDs de producto en <code>localStorage</code> (cliente). No hay
                  endpoints de API para wishlist en esta versión.
                </p>
              </Prose>
            </Section>

            <Section id="services" index={8} title="Servicios y utilidades">
              <Prose>
                <h3>Servicios (frontend/src/services/)</h3>
                <ul>
                  <li><b>api.js:</b> axios (<code>baseURL: '/api'</code>, <code>withCredentials</code>), interceptor de solicitud (token Bearer) y respuesta (401 → redirige a <code>/login</code>).</li>
                  <li><b>products.js:</b> <code>fetchProducts</code>, <code>fetchProductBySlug</code>, <code>fetchCategories</code>, <code>fetchBrands</code>.</li>
                  <li><b>admin.js:</b> CRUD de productos/categorías/órdenes/usuarios, estadísticas, configuración y carga de logo.</li>
                </ul>
                <h3>Utilidades</h3>
                <ul>
                  <li><b>utils/helpers.js:</b> <code>formatPrice</code>, <code>formatDate</code>, <code>calculateDiscountPercentage</code>, <code>calculateSubtotal/Tax/Shipping/Total</code>, <code>generateSlug</code>, <code>truncate</code>, utilidades de clases.</li>
                  <li><b>hooks/useDebounce.js:</b> debounce de valor para búsquedas y filtrados.</li>
                </ul>
              </Prose>
            </Section>

            <Section id="env" index={9} title="Variables de entorno">
              <CodeBlock code={ENV_VARS} />
            </Section>

            <Section id="errors" index={10} title="Manejo de errores">
              <Prose>
                <h3>Backend</h3>
                <p>
                  <code>middleware/errorHandler.js</code> formatea errores (success, message, errors, statusCode), distingue errores operacionales
                  (401/403/404/ValidationError) de errores de programación (500) y suprime el
                  stack en producción. <code>notFound.js</code> captura 404.
                </p>
                <p>
                  Las rutas async usan <code>express-async-handler</code> (o try/catch) para que
                  los rechazos lleguen al manejador centralizado.
                </p>
                <h3>Frontend</h3>
                <ul>
                  <li><b>ErrorBoundary.jsx:</b> componente de clase con fallback UI y botón de recarga.</li>
                  <li><b>api.js:</b> 401 → redirige a <code>/login</code>; otros errores disparan toast vía react-hot-toast y rechazan la promesa.</li>
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