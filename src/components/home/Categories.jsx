import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, Utensils, Bone, Shirt, Sparkles, Droplet, Carrot, Fish, Heart } from 'lucide-react'
import { categoryService } from '../../services/products'

function getCategoryIcon(name, slug) {
  const lowerName = name?.toLowerCase() || ''
  const lowerSlug = slug?.toLowerCase() || ''

  if (lowerName.includes('alimento') || lowerSlug.includes('alimento')) return Utensils
  if (lowerName.includes('snack') || lowerSlug.includes('snack')) return Bone
  if (lowerName.includes('accesorio') || lowerSlug.includes('accesorio')) return Shirt
  if (lowerName.includes('higiene') || lowerSlug.includes('higiene') || lowerName.includes('cuidado')) return Sparkles
  if (lowerName.includes('juguete') || lowerSlug.includes('juguete')) return Heart
  if (lowerName.includes('ropa') || lowerSlug.includes('ropa')) return Shirt
  if (lowerName.includes('cama') || lowerSlug.includes('cama')) return Heart
  if (lowerName.includes('comedero') || lowerSlug.includes('comedero')) return Utensils
  if (lowerName.includes('correa') || lowerSlug.includes('correa')) return Bone
  if (lowerName.includes('transport') || lowerSlug.includes('transport')) return Carrot
  if (lowerName.includes('shampoo') || lowerSlug.includes('shampoo')) return Droplet
  if (lowerName.includes('cepillo') || lowerSlug.includes('cepillo')) return Sparkles
  if (lowerName.includes('perro') || lowerSlug.includes('perro')) return Bone
  if (lowerName.includes('gato') || lowerSlug.includes('gato')) return Heart
  if (lowerName.includes('pescado') || lowerSlug.includes('pescado')) return Fish
  return Utensils
}

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAll({ active: true, root: true })
        setCategories(data.categories || [])
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-white" aria-busy="true">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-900 mb-3">
              Todo para tu mascota
            </h2>
            <p className="text-primary-600 max-w-xl mx-auto">
              Explora nuestras categorías y encuentra todo lo que tu mejor amigo necesita
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="h-full p-5 sm:p-6 rounded-2xl border border-dark-border bg-primary-50/50 animate-pulse">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary-100 mb-4" aria-hidden="true" />
                  <div className="h-5 bg-primary-100 rounded w-3/4 mb-2 animate-pulse" />
                  <div className="h-4 bg-primary-100 rounded w-full mb-2 animate-pulse" />
                  <div className="h-4 bg-primary-100 rounded w-1/2 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || categories.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom text-center">
          <p className="text-primary-900/60">No hay categorías disponibles</p>
        </div>
      </section>
    )
  }

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
          {categories.map((category, index) => {
            const Icon = getCategoryIcon(category.name, category.slug)
            return (
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
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-base sm:text-lg text-primary-900 mb-1.5">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-primary-600 leading-relaxed mb-4 flex-1">
                    {category.description || 'Descubre nuestra selección'}
                  </p>
                  <span className="flex items-center gap-1 text-xs sm:text-sm font-medium text-charcoal-700">
                    Ver productos
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}