import { motion } from 'framer-motion'
import { Shield, Truck, RotateCcw, Headphones, Lock, Award } from 'lucide-react'

const trustItems = [
  { icon: Lock, title: 'Pago 100% Seguro', desc: 'Protección SSL y Mercado Pago certificado' },
  { icon: Shield, title: 'Productos Verificados', desc: 'Calidad garantizada en cada artículo' },
  { icon: Headphones, title: 'Soporte Experto', desc: 'Asesoramiento personalizado antes y después de tu compra' },
  { icon: Truck, title: 'Envío Rápido', desc: 'A todo el país con seguimiento en tiempo real' },
  { icon: RotateCcw, title: 'Devoluciones Fáciles', desc: '30 días para cambios sin complicaciones' },
  { icon: Award, title: 'Garantía Oficial', desc: 'Todos los productos con garantía del fabricante' },
]

export default function TrustSection() {
  return (
    <section className="py-20 lg:py-28 border-y border-dark-border" aria-labelledby="trust-title">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="trust-title" className="section-title mx-auto mb-4">COMPRA CON CONFIANZA</h2>
          <p className="text-primary-600 max-w-2xl mx-auto"> Más de 10.000 mascotas felices en todo Colombia</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" role="list">
          {trustItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              role="listitem"
              className="group p-6 bg-white border border-dark-border rounded-2xl hover:border-charcoal-300 hover:shadow-card-hover transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-charcoal-600/10 border border-charcoal-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-7 h-7 text-charcoal-600" aria-hidden="true" />
              </div>
              <h3 className="font-display font-semibold text-xl text-primary-900 mb-2">{item.title}</h3>
              <p className="text-primary-600 leading-relaxed">{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
