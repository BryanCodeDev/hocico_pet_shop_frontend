import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Truck, Heart } from 'lucide-react'

const MotionLink = motion.create(Link)

const heroImages = ['/assets/images/herosection.webp']

const trustBadges = [
  { icon: ShieldCheck, text: 'Pago seguro con Mercado Pago' },
  { icon: Truck, text: 'Envíos a Mosquera, Madrid y Funza' },
  { icon: Heart, text: 'Atención personalizada' },
]

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/45 to-primary-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container-custom py-24 lg:py-32">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/25 text-white text-xs sm:text-sm font-medium mb-6"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mustard-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-mustard-400" />
            </span>
            Envío gratis en compras mayores a $100.000
          </motion.span>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white mb-6"
          >
            Cuidado que marca la diferencia
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base sm:text-lg text-white/85 max-w-lg mb-9 leading-relaxed"
          >
            Alimentos, snacks y accesorios de calidad para que tu mejor amigo siempre esté feliz y saludable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <MotionLink
              to="/tienda"
              className="group btn-primary justify-center px-7 py-3.5 text-base gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Ver productos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </MotionLink>
            <MotionLink
              to="/contacto"
              className="btn-outline justify-center border-white/40 text-white hover:bg-white/10 px-7 py-3.5 text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contáctanos
            </MotionLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 lg:mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-white/80"
          >
            {trustBadges.map((badge) => (
              <div key={badge.text} className="flex items-center gap-2">
                <badge.icon className="w-4 h-4 text-mustard-400 flex-shrink-0" aria-hidden="true" />
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}