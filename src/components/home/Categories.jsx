import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, Utensils, Bone, Shirt, Sparkles } from 'lucide-react'

const categories = [
  {
    id: 1,
    name: 'Alimentos',
    slug: 'alimentos',
    desc: 'Alimento seco y húmedo para perros y gatos',
    icon: Utensils,
  },
  {
    id: 2,
    name: 'Snacks',
    slug: 'snacks',
    desc: 'Premios, huesos y galletas para consentir a tu peludo',
    icon: Bone,
  },
  {
    id: 3,
    name: 'Accesorios',
    slug: 'accesorios',
    desc: 'Correas, camas, comederos y más',
    icon: Shirt,
  },
  {
    id: 4,
    name: 'Higiene y cuidado',
    slug: 'higiene-cuidado',
    desc: 'Shampoos, cepillos y productos de aseo',
    icon: Sparkles,
  },
]

export default function Categories() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-900 mb-3">
            Todo para tu mascota
          </h2>
          <p className="text-primary-600 max-w-xl mx-auto">
            Explora nuestras categorías y encuentra todo lo que tu mejor amigo necesita
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link
                to={`/categoria/${category.slug}`}
                className="group flex flex-col h-full p-5 sm:p-6 rounded-2xl border border-dark-border bg-primary-50/50 hover:bg-white hover:border-charcoal-300 hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-charcoal-600 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <category.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-primary-900 mb-1.5">
                  {category.name}
                </h3>
                <p className="text-xs sm:text-sm text-primary-600 leading-relaxed mb-4 flex-1">
                  {category.desc}
                </p>
                <span className="flex items-center gap-1 text-xs sm:text-sm font-medium text-charcoal-700">
                  Ver productos
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}