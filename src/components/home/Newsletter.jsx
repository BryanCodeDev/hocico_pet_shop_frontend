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
    <section className="py-20 lg:py-28 bg-white" aria-labelledby="newsletter-title">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center relative"
        >
          <div className="relative p-8 lg:p-12 bg-primary-50 border border-dark-border rounded-3xl">
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <CheckCircle className="w-16 h-16 text-green-600" aria-hidden="true" />
                <h2 id="newsletter-title" className="font-display font-bold text-3xl text-primary-900">¡Gracias por suscribirte!</h2>
                <p className="text-primary-600">Pronto recibirás nuestras mejores ofertas y novedades.</p>
                <button
                  onClick={() => setSubscribed(false)}
                  className="btn-outline mt-4"
                >
                  Suscribir otro correo
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 id="newsletter-title" className="font-display font-bold text-3xl sm:text-4xl text-primary-900 mb-3">
                    No te pierdas nuestras ofertas
                  </h2>
                  <p className="text-primary-600">Suscríbete y recibe descuentos exclusivos, lanzamientos y más.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-primary-700" aria-hidden="true" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full pl-10 pr-4 py-3 sm:py-4 bg-white border border-dark-border rounded-xl text-primary-900 placeholder:text-charcoal-500 focus:outline-none focus:border-charcoal-400 focus:ring-1 focus:ring-charcoal-300/50"
                      required
                      autoComplete="email"
                      aria-label="Correo electrónico"
                      disabled={loading}
                    />
                  </div>
                   <button
                     type="submit"
                     disabled={loading}
                     className="group btn-primary px-8 py-4 flex items-center gap-2 whitespace-nowrap"
                   >
                    {loading ? (
                      <motion.svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 22 10 10 0 0 1 2 12 10 10 0 0 1 12 2" /></motion.svg>
                    ) : (
                      <>
                        Suscribirse
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-primary-600 text-xs">Al suscribirte aceptas nuestra <a href="/politica-privacidad" className="underline hover:text-charcoal-600">Política de privacidad</a>. Sin spam, solo lo mejor.</p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
