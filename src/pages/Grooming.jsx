import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Scissors, Sparkles, Heart, Clock, Calendar, Star } from 'lucide-react'
import SEO from '../components/seo/SEO'

const services = [
  {
    id: 1,
    name: 'Corte de Pelo Completo',
    desc: 'Corte, lavado con shampoo premium, secado y accesorios. Ideal para mantener a tu mascota fresco y limpio.',
    price: '$35.000',
    duration: '2-3 horas',
    icon: Scissors,
    featured: true,
  },
  {
    id: 2,
    name: 'Baño de Relax',
    desc: 'Lavado con shampoo hidratante, enjuague y secado con secadora de baja temperatura.',
    price: '$25.000',
    duration: '1 hora',
    icon: Sparkles,
    featured: false,
  },
  {
    id: 3,
    name: 'Corte de Uñas',
    desc: 'Corte de uñas profesional con los archivos adecuados para evitar incomodidad.',
    price: '$10.000',
    duration: '30 min',
    icon: Scissors,
    featured: false,
  },
  {
    id: 4,
    name: 'Limpieza Dental',
    desc: 'Limpieza profunda de dientes con productos especializados para mascotas.',
    price: '$30.000',
    duration: '45 min',
    icon: Heart,
    featured: true,
  },
  {
    id: 5,
    name: 'Spa Completo',
    desc: 'Baño, corte de pelo, limpieza dental, corte de uñas y visto de salud general.',
    price: '$75.000',
    duration: '4-5 horas',
    icon: Star,
    featured: false,
  },
]

const testimonials = [
  {
    name: 'María Gómez',
    text: '¡Luna quedó preciosa después del spa completo! El equipo es muy amable y profesional.',
    rating: 5,
  },
  {
    name: 'Carlos Ruiz',
    text: 'El mejor servicio de grooming en Madrid. Mi perrito salió reluciente y feliz.',
    rating: 5,
  },
]

export default function Grooming() {
  return (
    <>
      <SEO
        title="Servicio de Grooming - Hocico Pet Shop"
        description="Servicio profesional de grooming para perros y gatos en Madrid. Baño, corte de pelo, limpieza dental y más. ¡Reserva tu cita!"
        type="website"
      />
      <section className="py-20 lg:py-32 bg-white" aria-labelledby="grooming-title">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-dark-border text-charcoal-600 text-sm font-medium mb-6">
              <Scissors className="w-4 h-4" aria-hidden="true" />
              Servicio de Grooming
            </div>
            <h1 id="grooming-title" className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-primary-900 mb-6">
              Cuidado Profesional para tu Mascota
            </h1>
            <p className="text-lg text-primary-600 max-w-2xl mx-auto">
              En Hocico Pet Shop, creemos que una mascota bien cuidada es una mascota feliz. Nuestro equipo de groomers certificados ofrece servicios profesionales para que tu mejor amigo luzca y se sienta espectacular.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`card p-6 lg:p-8 relative ${service.featured ? 'ring-2 ring-mustard-400/30' : ''}`}
              >
                {service.featured && (
                  <div className="absolute top-4 right-4">
                    <Star className="w-5 h-5 text-mustard-500 fill-current" aria-label="Servicio destacado" />
                  </div>
                )}
                <div className={`w-14 h-14 rounded-2xl bg-mustard-400/10 flex items-center justify-center mb-6`}>
                  <service.icon className="w-7 h-7 text-mustard-600" aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-xl text-primary-900 mb-3">{service.name}</h3>
                <p className="text-primary-600 mb-4 leading-relaxed">{service.desc}</p>
                <div className="flex items-center justify-between text-sm text-charcoal-600">
                  <span className="font-bold text-primary-900">{service.price}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    {service.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <div className="bg-primary-50 border border-dark-border rounded-3xl p-8 lg:p-12 max-w-3xl mx-auto">
              <h2 className="font-display font-bold text-3xl text-primary-900 mb-4">
                Reserva tu Cita
              </h2>
              <p className="text-primary-600 mb-6">
                Agenda tu servicio de grooming por WhatsApp y garantiza el mejor cuidado para tu mascota. Nuestros horarios de atención son de lunes a viernes de 9:00 a 18:00 y sábados de 9:00 a 14:00.
              </p>
              <a
                href="https://wa.me/573133245600"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-green-600 text-white hover:bg-green-500 flex items-center justify-center gap-2 w-full sm:w-auto mx-auto"
              >
                <Calendar className="w-5 h-5" aria-hidden="true" />
                Agendar por WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <h2 className="font-display font-bold text-3xl text-primary-900 text-center mb-12">
              Lo que opinan nuestros clientes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card p-6 lg:p-8">
                  <div className="flex items-center gap-1 mb-3 text-mustard-500">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-primary-700 italic mb-4">"{testimonial.text}"</p>
                  <p className="font-medium text-charcoal-600">— {testimonial.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
