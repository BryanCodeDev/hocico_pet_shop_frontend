import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Truck, Shield, RotateCcw, Headphones, Award, Sparkles, Heart } from 'lucide-react'
import SEO from '../components/seo/SEO'

const features = [
  { icon: Heart, title: 'Pasión por las Mascotas', desc: 'Cada producto es elegido con amor y cuidado, pensado para la felicidad de tu mejor amigo' },
  { icon: Shield, title: 'Garantía de Calidad', desc: 'Todos los productos cuentan con garantía oficial del fabricante' },
  { icon: Headphones, title: 'Asesoramiento Experto', desc: 'Nuestro equipo de amantes de las mascotas te ayuda a encontrar lo que necesitas' },
  { icon: Truck, title: 'Envío Rápido y Seguro', desc: 'Llegamos a Mosquera, Madrid y Funza con embalaje premium y seguimiento' },
  { icon: RotateCcw, title: 'Devoluciones Sin Complicaciones', desc: '30 días para cambios o devoluciones, sin preguntas' },
  { icon: Award, title: 'Productos Premium', desc: 'Solo marcas reconocidas con ingredientes y materiales de alta calidad' },
]

const team = [
  { name: 'Equipo Hocico', role: 'Fundadores', desc: 'Apasionados por las mascotas con 10+ años de experiencia en nutrición y accesorios' },
]

export default function About() {
  return (
    <>
      <SEO
        title="Nosotros | Hocico Pet Shop"
        description="Conoce a Hocico Pet Shop: tu tienda online de alimentos, snacks y accesorios para perros y gatas. Selección curada, garantía oficial, envíos a Mosquera, Madrid y Funza."
      />

      <div className="min-h-screen bg-white pt-20">
        <section className="py-20 lg:py-28" aria-labelledby="about-hero">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 id="about-hero" className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-primary-900 mb-6">
                MÁS QUE UNA TIENDA,<br />
                <span className="bg-gradient-to-r from-charcoal-500 via-charcoal-600 to-charcoal-700 bg-clip-text text-transparent">
                  TU COMPAÑERO FELIZ
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-primary-900 leading-relaxed">
                Hocico Pet Shop nace de la pasión por las mascotas y el compromiso de ofrecer solo lo mejor para tu mejor amigo.
                No somos un marketplace más: somos amantes de las mascotas que curamos cada producto con cariño.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-primary-50/50" aria-labelledby="values-title">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 id="values-title" className="section-title mx-auto mb-4">NUESTROS VALORES</h2>
              <p className="text-primary-900 max-w-2xl mx-auto">Lo que nos diferencia y nos impulsa cada día a cuidar de tus mascotas</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature, index) => (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-6 lg:p-8 bg-primary-50 border border-dark-border rounded-2xl hover:border-charcoal-300 hover:shadow-card-hover transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-charcoal-600/10 to-charcoal-500/5 border border-charcoal-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-charcoal-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-primary-900 mb-3">{feature.title}</h3>
                  <p className="text-primary-900 leading-relaxed">{feature.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28" aria-labelledby="story-title">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 id="story-title" className="section-title mb-8 text-center">NUESTRA HISTORIA</h2>
              <div className="prose prose max-w-none text-primary-900 space-y-6">
                <p>
                  Hocico Pet Shop nació en 2020 con una misión clara: mejorar la calidad de vida de las mascotas en Colombia.
                  Cansados de productos genéricos y poco efectivos, decidimos crear un espacio donde cada artículo tuviera un
                  propósito y una razón de ser para el bienestar de tus mascotas.
                </p>
                <p>
                  Empezamos como un pequeño espacio en Bogotá, donde cada cliente recibía atención personalizada
                  y podía probar los productos antes de comprar. Esa filosofía —el trato humano, el asesoramiento honesto,
                  el cariño por las mascotas— sigue siendo nuestro núcleo aunque ahora operamos online en toda la región.
                </p>
                <p>
                  Hoy, Hocico Pet Shop es referente en alimentos, snacks y accesorios para perros y gatas en Colombia.
                  Trabajamos directamente con marcas reconocidas y fabricantes oficiales para garantizar autenticidad,
                  garantía y el mejor precio. Cada producto en nuestro catálogo ha pasado por nuestro filtro de calidad:
                  si no lo recomendaríamos a nuestro propio perro, no lo vendemos.
                </p>
                <p>
                  Nuestro compromiso va más allá de la venta. Ofrecemos soporte post-venta real, gestión de garantías,
                  asesoramiento técnico y una experiencia de compra que respeta tu tiempo y tu dinero.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-primary-50/50" aria-labelledby="team-title">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 id="team-title" className="section-title mx-auto mb-4">EL EQUIPO</h2>
              <p className="text-primary-900 max-w-2xl mx-auto">Personas reales detrás de cada pedido, con pasión por las mascotas</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {team.map((member, index) => (
                <motion.article
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-primary-50 border border-dark-border rounded-2xl text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-charcoal-600/10 to-charcoal-500/5 border border-charcoal-600/20 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-12 h-12 text-charcoal-600" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-primary-900">{member.name}</h3>
                  <p className="text-charcoal-600 text-sm mb-2">{member.role}</p>
                  <p className="text-primary-900">{member.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28" aria-labelledby="cta-title">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center p-8 lg:p-12 bg-primary-50 backdrop-blur-sm border border-dark-border rounded-3xl"
            >
              <h2 id="cta-title" className="font-display font-bold text-3xl sm:text-4xl text-primary-900 mb-4">
                ¿Listo para mimar a tu compañero?
              </h2>
              <p className="text-primary-900 mb-8">
                Explora nuestro catálogo curado y descubre por qué miles de dueños de mascotas confían en Hocico.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/tienda" className="btn-primary px-8 py-4 text-lg">
                  Ver catálogo
                </Link>
                <Link to="/contacto" className="btn-outline px-8 py-4 text-lg">
                  Contactarnos
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
