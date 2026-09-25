import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Truck, Shield, Headphones, RotateCcw, Lock } from 'lucide-react'

const footerLinks = {
  tienda: [
    { label: 'Todos los productos', href: '/tienda' },
    { label: 'Ofertas', href: '/tienda?category=ofertas' },
    { label: 'Novedades', href: '/tienda?sort=newest' },
    { label: 'Más vendidos', href: '/tienda?sort=best-sellers' },
    { label: 'Marcas', href: '/categoria/marcas' },
  ],
  categorias: [
    { label: 'Alimentos', href: '/categoria/alimentos' },
    { label: 'Snacks', href: '/categoria/snacks' },
    { label: 'Accesorios', href: '/categoria/accesorios' },
    { label: 'Higiene y cuidado', href: '/categoria/higiene-cuidado' },
  ],
  ayuda: [
    { label: 'Preguntas frecuentes', href: '/contacto#faq' },
    { label: 'Envíos y entregas', href: '/contacto#shipping' },
    { label: 'Cambios y devoluciones', href: '/cambios-devoluciones' },
    { label: 'Garantía', href: '/contacto#warranty' },
    { label: 'Contacto', href: '/contacto' },
  ],
  empresa: [
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Trabaja con nosotros', href: '/contacto#jobs' },
    { label: 'Prensa', href: '/contacto#press' },
    { label: 'Sostenibilidad', href: '/contacto#sustainability' },
    { label: 'Afiliados', href: '/contacto#affiliates' },
  ],
  legal: [
    { label: 'Política de privacidad', href: '/politica-privacidad' },
    { label: 'Términos y condiciones', href: '/terminos' },
    { label: 'Política de cambios/devoluciones', href: '/cambios-devoluciones' },
    { label: 'Tratamiento de datos', href: '/tratamiento-datos' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/hocico_petshop', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/hocico_petshop', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/hocico_petshop', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/hocico_petshop', label: 'YouTube' },
]

const trustItems = [
  { icon: Lock, title: 'Pago seguro', desc: 'Protección SSL y Mercado Pago' },
  { icon: Shield, title: 'Productos seleccionados', desc: 'Calidad verificada' },
  { icon: Headphones, title: 'Atención personalizada', desc: 'Soporte experto' },
  { icon: Truck, title: 'Envíos a tu puerta', desc: 'Mosquera, Madrid y Funza' },
  { icon: RotateCcw, title: 'Cambios y devoluciones', desc: '30 días sin complicaciones' },
  { icon: Shield, title: 'Garantía de satisfacción', desc: 'Productos para mascotas' },
]

const contactInfo = [
  { icon: MapPin, text: 'Km 1 vía Mosquera - La Mesa, EDS Primax, Malta, Mosquera, Cundinamarca' },
  { icon: Phone, text: '+57 313 3245600' },
  { icon: Mail, text: 'hola@hocico.com.co' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-950 border-t border-dark-border" role="contentinfo">
      <div className="container-custom py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6" aria-label="Hocico Pet Shop - Inicio">
              <img src="/assets/images/Logo.webp" alt="Hocico Pet Shop" className="w-12 h-12" />
              <span className="font-display font-bold text-2xl text-white">Hocico Pet Shop</span>
            </Link>
            <p className="text-primary-300 text-base leading-relaxed mb-6 max-w-xs">
              Tu tienda online de alimentos, snacks y accesorios para perros y gatas. Envíos a Mosquera, Madrid y Funza.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-primary-200 border border-dark-border flex items-center justify-center text-primary-900 hover:border-charcoal-400 hover:text-charcoal-700 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Tienda</h4>
            <nav aria-label="Enlaces de tienda">
              <ul className="space-y-3">
                {footerLinks.tienda.map(link => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-primary-300 hover:text-white transition-colors text-sm">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Categorías</h4>
            <nav aria-label="Enlaces de categorías">
              <ul className="space-y-3">
                {footerLinks.categorias.map(link => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-primary-300 hover:text-white transition-colors text-sm">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Ayuda</h4>
            <nav aria-label="Enlaces de ayuda">
              <ul className="space-y-3">
                {footerLinks.ayuda.map(link => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-primary-300 hover:text-white transition-colors text-sm">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Empresa</h4>
            <nav aria-label="Enlaces de empresa">
              <ul className="space-y-3">
                {footerLinks.empresa.map(link => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-primary-300 hover:text-white transition-colors text-sm">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-dark-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h4 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                <Truck className="w-6 h-6 text-charcoal-400" aria-hidden="true" />
                Compra con confianza
              </h4>
              <ul className="space-y-3">
                {trustItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-200 border border-dark-border flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-charcoal-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{item.title}</p>
                      <p className="text-primary-300 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6 text-charcoal-400" aria-hidden="true" />
                Contacto
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-200 border border-dark-border flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary-900" aria-hidden="true" />
                    </div>
                    <p className="text-primary-300 text-sm">{info.text}</p>
                  </div>
                ))}
              </div>

              <form className="space-y-4 max-w-md" action="/contacto" method="POST">
                <h5 className="font-medium text-white">Suscríbete a nuestro newsletter</h5>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="flex-1 input"
                    required
                    aria-label="Correo electrónico"
                  />
                  <button type="submit" className="btn-primary whitespace-nowrap">
                    Suscribirse
                  </button>
                </div>
                <p className="text-primary-300 text-xs">Al suscribirte aceptas nuestra <Link to="/politica-privacidad" className="underline hover:text-white">Política de privacidad</Link>.</p>
              </form>
            </div>
          </div>

          <div className="pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-400 text-sm">
              © {currentYear} Hocico Pet Shop. Todos los derechos reservados.
            </p>
            <nav aria-label="Enlaces legales" className="flex flex-wrap items-center gap-4 md:gap-6">
              {footerLinks.legal.map(link => (
                <Link key={link.href} to={link.href} className="text-primary-400 hover:text-white transition-colors text-sm">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
