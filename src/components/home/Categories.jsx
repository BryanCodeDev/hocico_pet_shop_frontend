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
    bg: 'bg-gradient-to-br from-mustard-400/20 to-mustard-500/30',
    border: 'border-mustard-400/40',
  },
  {
    id: 2,
    name: 'Snacks',
    slug: 'snacks',
    desc: 'Premios, huesos y galletas para consentir a tu mascota',
    icon: Bone,
    bg: 'bg-gradient-to-br from-charcoal-400/20 to-charcoal-500/30',
    border: 'border-charcoal-400/40',
  },
  {
    id: 3,
    name: 'Accesorios',
    slug: 'accesorios',
    desc: 'Correas, camas, comederos y más',
    icon: Shirt,
    bg: 'bg-gradient-to-br from-primary-200 to-primary-300',
    border: 'border-primary-400',
  },
  {
    id: 4,
    name: 'Higiene y Cuidado',
    slug: 'higiene-cuidado',
    desc: 'Shampoos, cepillos y productos de aseo',
    icon: Sparkles,
    bg: 'bg-gradient-to-br from-green-200 to-green-300',
    border: 'border-green-400',
  },
]

export default function Categories() {
  return (
    <section className="py-20 lg:py-32 bg-primary-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-900 mb-4">
            Todo para tu Mascota
          </h2>
          <p className="text-primary-600 max-w-2xl mx-auto">
            Explora nuestras categorías y encuentra todo lo que tu mejor amigo necesita
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/categoria/${category.slug}`}
                className={`group block p-6 rounded-2xl border-2 ${category.bg} ${category.border} hover:shadow-card-hover transition-all duration-500 h-full`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/50 mb-3">
                    <category.icon className="w-8 h-8 text-charcoal-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-primary-900 group-hover:text-charcoal-600 transition-colors mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-primary-600 mb-3 line-clamp-2 h-10">
                    {category.desc}
                  </p>
                  <motion.div
                    className="flex items-center gap-1 text-xs font-medium text-charcoal-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    Ver productos
                    <ChevronRight className="w-3 h-3" aria-hidden="true" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
