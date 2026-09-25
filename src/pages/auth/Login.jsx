import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LockKeyhole, Mail, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react'
import SEO from '../../components/seo/SEO'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const redirect = new URLSearchParams(location.search).get('redirect') || '/cuenta'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!formData.email.trim()) newErrors.email = 'Email es requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email inválido'
    if (!formData.password) newErrors.password = 'Contraseña es requerida'
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setLoading(true)
    try {
      const data = await login(formData.email, formData.password)
      toast.success('¡Bienvenido de nuevo!')
      const destination = data.user?.role === 'admin' ? '/admin' : redirect
      navigate(destination, { replace: true })
    } catch (error) {
      console.error('Login error:', error)
      toast.error(error.response?.data?.error || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }))
    }
  }

  return (
    <>
      <SEO
        title="Iniciar sesión | Hocico Pet Shop"
        description="Accede a tu cuenta de Hocico Pet Shop para gestionar pedidos, direcciones y preferencias."
        noindex
      />

      <div className="min-h-screen bg-white pt-20 flex items-center justify-center py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-primary-900 hover:text-charcoal-600 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" />
            Volver al inicio
          </Link>

          <div className="bg-primary-50 border border-charcoal-100 rounded-2xl p-6 sm:p-8 shadow-card">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-charcoal-600 to-charcoal-700 flex items-center justify-center mx-auto mb-5">
                <LockKeyhole className="w-7 h-7 text-white" />
              </div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary-900 mb-2">Bienvenido de nuevo</h1>
              <p className="text-primary-900/60">Inicia sesión para continuar comprando</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="email" className="label">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-700" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input pl-12 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="tu@email.com"
                    autoComplete="email"
                    required
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="label">Contraseña</label>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-700" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className={`input pl-12 pr-12 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-900 hover:text-charcoal-600 transition-colors"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm text-primary-900 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-charcoal-600 border-charcoal-200 bg-charcoal-50 focus:ring-charcoal-500 rounded" />
                  Recordarme
                </label>
                <Link to="/recuperar-password" className="text-sm text-charcoal-600 hover:text-charcoal-500 transition-colors">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-lg gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar sesión'
                )}
              </button>
            </form>

            <div className="my-5 border-t border-charcoal-100" />

            <div className="text-center">
              <p className="text-primary-900/70 text-sm">
                ¿No tienes cuenta?{' '}
                <Link to="/registro" className="text-charcoal-600 hover:text-charcoal-500 font-medium transition-colors">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-5 text-center text-primary-900/50 text-xs">
            <p>Al iniciar sesión aceptas nuestros <Link to="/terminos" className="underline hover:text-charcoal-600">Términos y condiciones</Link>.</p>
          </div>
        </motion.div>
      </div>
    </>
  )
}