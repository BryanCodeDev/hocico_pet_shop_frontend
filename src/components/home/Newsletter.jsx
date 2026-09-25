import { motion } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Ingresa un correo válido')
      return
    }

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubscribed(true)
      setEmail('')
      toast.success('¡Gracias por suscribirte! Te enviaremos las mejores ofertas.')
    } catch {
      toast.error('Error al suscribirse. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-white" aria-labelledby="newsletter-title">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative p-8 lg:p-10 bg-charcoal-600 rounded-3xl overflow-hidden">
            <div
              className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/5"
              aria-hidden="true"
            />
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex flex-col items-center text-center gap-3"
              >
                <CheckCircle className="w-12 h-12 text-mustard-400" aria-hidden="true" />
                <h2 id="newsletter-title" className="font-display font-bold text-2xl sm:text-3xl text-white">¡Gracias por suscribirte!</h2>
                <p className="text-white/75">Pronto recibirás nuestras mejores ofertas y novedades.</p>
                <button
                  onClick={() => setSubscribed(false)}
                  className="btn-outline border-white/40 text-white hover:bg-white/10 mt-3"
                >
                  Suscribir otro correo
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative space-y-6 text-center">
                <div>
                  <h2 id="newsletter-title" className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
                    No te pierdas nuestras ofertas
                  </h2>
                  <p className="text-white/75">Suscríbete y recibe descuentos exclusivos, lanzamientos y más.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500" aria-hidden="true" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-white border border-transparent rounded-xl text-primary-900 placeholder:text-primary-500 focus:outline-none focus:ring-2 focus:ring-mustard-400/60"
                      required
                      autoComplete="email"
                      aria-label="Correo electrónico"
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-xl bg-mustard-500 text-primary-950 font-semibold whitespace-nowrap hover:bg-mustard-400 transition-colors disabled:opacity-70"
                  >
                    {loading ? (
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 22 10 10 0 0 1 2 12 10 10 0 0 1 12 2" /></svg>
                    ) : (
                      <>
                        Suscribirse
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-white/60 text-xs">
                  Al suscribirte aceptas nuestra <a href="/politica-privacidad" className="underline hover:text-white">Política de privacidad</a>. Sin spam, solo lo mejor.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}