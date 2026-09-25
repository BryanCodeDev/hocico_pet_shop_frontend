import { motion } from 'framer-motion'
import { ShoppingCart, CheckCircle2, Truck, MapPin } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Elige tus productos',
    desc: 'Navega por nuestra tienda y encuentra todo lo que necesita tu mascota',
    icon: ShoppingCart,
  },
  {
    id: 2,
    title: 'Realiza tu pedido',
    desc: 'Completa tu compra de forma segura con Mercado Pago',
    icon: CheckCircle2,
  },
  {
    id: 3,
    title: 'Envío rápido',
    desc: 'Recibe tu pedido en Mosquera, Madrid y Funza con seguimiento',
    icon: Truck,
  },
  {
    id: 4,
    title: 'Disfruta en casa',
    desc: 'Tu mascota estará feliz con sus nuevos productos favoritos',
    icon: MapPin,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-900 mb-3">
            Así de fácil comprar
          </h2>
          <p className="text-primary-600 max-w-xl mx-auto">
            En 4 sencillos pasos tendrás todo listo para tu mascota
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-4 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-px bg-dark-border -z-0" aria-hidden="true" />
                )}
                <div className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center bg-charcoal-600 mb-5">
                  <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-mustard-500 text-primary-950 text-xs font-bold flex items-center justify-center ring-2 ring-white">
                    {step.id}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-primary-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-primary-600 leading-relaxed">
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