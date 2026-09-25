import { motion } from 'framer-motion'
import { Lock, ShieldCheck, Headphones, Truck, RotateCcw, Award } from 'lucide-react'

const trustItems = [
  { icon: Lock, title: 'Pago 100% seguro', desc: 'Protección SSL y Mercado Pago certificado' },
  { icon: ShieldCheck, title: 'Productos verificados', desc: 'Calidad garantizada en cada artículo' },
  { icon: Headphones, title: 'Soporte experto', desc: 'Asesoramiento personalizado antes y después de tu compra' },
  { icon: Truck, title: 'Envío rápido', desc: 'A Mosquera, Madrid y Funza con seguimiento en tiempo real' },
  { icon: RotateCcw, title: 'Devoluciones fáciles', desc: '30 días para cambios sin complicaciones' },
  { icon: Award, title: 'Garantía oficial', desc: 'Todos los productos con garantía del fabricante' },
]

export default function TrustSection() {
  return (
    <section className="py-16 lg:py-24 bg-primary-50/40" aria-labelledby="trust-title">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 id="trust-title" className="font-display font-bold text-3xl sm:text-4xl text-primary-900 mb-3">
            Compra con confianza
          </h2>
          <p className="text-primary-600 max-w-xl mx-auto">Más de 10.000 mascotas felices en todo Colombia</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
          {trustItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              role="listitem"
              className="flex items-start gap-4 p-5 bg-white border border-dark-border rounded-2xl hover:border-charcoal-300 hover:shadow-card transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-charcoal-50 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-charcoal-700" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-base text-primary-900 mb-1">{item.title}</h3>
                <p className="text-sm text-primary-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}