import { motion } from 'framer-motion'
import { ShoppingCart, Truck, MapPin, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Elige tus productos',
    desc: 'Navega por nuestra tienda y encuentra todo lo que necesita tu mascota',
    icon: ShoppingCart,
    color: 'bg-mustard-400/10 border-mustard-400/30 text-mustard-600',
  },
  {
    id: 2,
    title: 'Realiza tu pedido',
    desc: 'Completa tu compra de forma segura con Mercado Pago',
    icon: CheckCircle2,
    color: 'bg-charcoal-500/10 border-charcoal-500/30 text-charcoal-600',
  },
  {
    id: 3,
    title: 'Envío rápido',
    desc: 'Recibe tu pedido en Mosquera, Madrid y Funza con seguimiento',
    icon: Truck,
    color: 'bg-green-500/10 border-green-500/30 text-green-600',
  },
  {
    id: 4,
    title: 'Disfruta en casa',
    desc: 'Tu mascota estará feliz con sus nuevos productos favoritos',
    icon: MapPin,
    color: 'bg-mustard-400/10 border-mustard-400/30 text-mustard-600',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-900 mb-4">
            Así de fácil comprar
          </h2>
          <p className="text-primary-600 max-w-2xl mx-auto">
            En 4 sencillos pasos tendrás todo listo para tu mascota
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-charcoal-200 -z-0" />
                )}
                <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center border ${step.color} mb-6 group`}>
                  <Icon className="w-8 h-8" aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-xl text-primary-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-primary-600 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
