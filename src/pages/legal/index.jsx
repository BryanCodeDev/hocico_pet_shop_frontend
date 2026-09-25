import { motion } from 'framer-motion'
import SEO from '../../components/seo/SEO'

const legalPages = {
  'politica-privacidad': {
    title: 'Política de Privacidad',
    sections: [
      { h2: '1. Responsable del tratamiento', content: 'Hocico Pet Shop (en adelante, "nosotros"), tienda virtual con presencia en Bogotá, Mosquera, Funza, Ibagué y Madrid, Colombia, es responsable del tratamiento de tus datos personales.' },
      { h2: '2. Datos que recopilamos', content: 'Recopilamos: datos de identificación (nombre, apellido, email, teléfono), datos de facturación y envío, historial de compras, datos de navegación (cookies), y comunicaciones con soporte.' },
      { h2: '3. Finalidad y base legal', content: 'Tratamos tus datos para: gestionar pedidos y pagos (contractual), enviar comunicaciones comerciales (consentimiento), mejorar nuestra web (interés legítimo), y cumplir obligaciones legales.' },
      { h2: '4. Compartición de datos', content: 'Compartimos datos con: procesadores de pago (Mercado Pago), empresas de logística, proveedores de servicios cloud, y autoridades cuando lo requiera la ley.' },
      { h2: '5. Derechos del usuario', content: 'Podés ejercer: acceso, rectificación, supresión, oposición, limitación, y portabilidad. Contactanos a hola@hocico.com.co con asunto "Derechos ARCO".' },
      { h2: '6. Conservación', content: 'Conservamos datos mientras dure la relación contractual y los plazos legales posteriores (mínimo 10 años para facturación).' },
      { h2: '7. Seguridad', content: 'Implementamos medidas técnicas y organizativas: HTTPS, encriptación, acceso restringido, auditorías, y capacitación del personal.' },
      { h2: '8. Cookies', content: 'Usamos cookies técnicas (necesarias), analíticas (Google Analytics), y de marketing (Meta Pixel). Podés configurarlas en el banner de cookies.' },
      { h2: '9. Transferencias internacionales', content: 'Algunos proveedores (Cloudinary, Mercado Pago) pueden procesar datos fuera de Argentina. Exigen garantías adecuadas (cláusulas tipo SCC).' },
      { h2: '10. Cambios en esta política', content: 'Notificaremos cambios materiales por email y en la web. La versión actualizada rige desde su publicación.' },
    ]
  },
  'terminos': {
    title: 'Términos y Condiciones',
    sections: [
      { h2: '1. Aceptación', content: 'Al usar este sitio y realizar compras, aceptás estos términos. Si no estás de acuerdo, no utilices el servicio.' },
      { h2: '2. Productos y precios', content: 'Los precios incluyen IVA. Nos reservamos el derecho de modificar precios sin previo aviso. Las imágenes son ilustrativas. Stock sujeto a disponibilidad.' },
      { h2: '3. Proceso de compra', content: 'El pedido es una oferta de compra. La aceptación ocurre al confirmar el pago (Mercado Pago) o al confirmar por WhatsApp. Nos reservamos el derecho de cancelar pedidos por error de precio o stock.' },
      { h2: '4. Pagos', content: 'Aceptamos: Mercado Pago (tarjetas, efectivo, transferencias), transferencia bancaria, y coordinación por WhatsApp. La reserva de stock se hace al confirmar pago.' },
      { h2: '5. Envíos', content: 'Envíos a todo el país. Gratis en compras >$100.000. Tiempos estimados: 24-48hs CABA/GBA, 3-7 días interior. No nos responsabilizamos por demoras de la transportista.' },
      { h2: '6. Garantía', content: 'Todos los productos tienen garantía oficial del fabricante (12 meses típicamente). Gestionamos el trámite. Excluye daños por mal uso, golpes, humedad, o intervención de terceros.' },
      { h2: '7. Devoluciones', content: '30 días para cambio/devolución. Producto debe estar nuevo, con embalaje y accesorios. Costos de envío a nuestro cargo si hay falla de fábrica; a cargo del cliente por cambio de opinión.' },
      { h2: '8. Responsabilidad', content: 'No nos hacemos responsables por: daños indirectos, lucro cesante, fallas de conectividad, o uso indebido de productos. Responsabilidad máxima: monto del pedido.' },
      { h2: '9. Propiedad intelectual', content: 'Contenido del sitio (textos, imágenes, código, diseño) es propiedad de Hocico Pet Shop o usado con licencia. Prohibida su reproducción sin autorización.' },
      { h2: '10. Ley aplicable y jurisdicción', content: 'Ley Colombiana. Jurisdicción: tribunales ordinarios de Bogotá, Colombia.' },
    ]
  },
  'cambios-devoluciones': {
    title: 'Política de Cambios y Devoluciones',
    sections: [
      { h2: 'Plazo', content: '30 días corridos desde la recepción del producto.' },
      { h2: 'Condiciones', content: 'Producto sin uso, en estado original, con embalaje, accesorios, manuales y etiquetas. No aplica a software abierto, licencias digitales, ni productos personalizados.' },
      { h2: 'Proceso', content: '1) Contactanos por WhatsApp/email con número de pedido y motivo. 2) Te enviamos instrucciones y etiqueta de devolución. 3) Recibimos y revisamos el producto (24-48hs). 4) Procesamos cambio, nota de crédito o reembolso.' },
      { h2: 'Costos de envío', content: 'Falla de fábrica: cubrimos todo. Cambio de opinión/ talla/ modelo: cliente cubre envío de vuelta; nosotros cubrimos envío del nuevo producto.' },
      { h2: 'Reembolsos', content: 'Mismo medio de pago. Mercado Pago: 5-10 días hábiles. Transferencia: 48hs. Nota de crédito: inmediata, válida 1 año.' },
      { h2: 'Productos excluidos', content: 'Consumibles abiertos (cintas, papel), software, licencias, gift cards, productos a medida, y artículos de higiene personal abiertos.' },
    ]
  },
  'tratamiento-datos': {
    title: 'Política de Tratamiento de Datos',
    sections: [
      { h2: 'Finalidades', content: 'Gestión de pedidos, facturación, envíos, soporte, marketing (con consentimiento), análisis de uso, prevención de fraude, cumplimiento legal.' },
      { h2: 'Categorías de datos', content: 'Identificativos, contacto, transaccionales, navegación, preferencias, comunicaciones.' },
      { h2: 'Legitimación', content: 'Ejecución contractual, consentimiento, interés legítimo, obligación legal.' },
      { h2: 'Destinatarios', content: 'Procesadores de pago, logística, cloud, marketing, autoridades.' },
      { h2: 'Derechos', content: 'Acceso, rectificación, supresión, oposición, limitación, portabilidad, no decisiones automatizadas. Ejercicio: hola@hocico.com.co' },
      { h2: 'Medidas de seguridad', content: 'Cifrado TLS 1.3, acceso por roles, logs de auditoría, backups encriptados, planes de contingencia.' },
      { h2: 'Conservación', content: 'Datos de clientes: 10 años post-relación (normativa fiscal). Marketing: hasta revocación. Navegación: 24 meses.' },
      { h2: 'Cookies', content: 'Técnicas (sesión, carrito), analíticas (GA4), publicidad (Meta). Configurable en banner.' },
      { h2: 'Delegado de Protección de Datos', content: 'Contacto: dpo@hocico.com.co' },
    ]
  },
}

export default function LegalPage({ pageKey }) {
  const page = legalPages[pageKey] || legalPages['politica-privacidad']
  const pageTitle = page.title

  return (
    <>
      <SEO
        title={`${pageTitle} | Hocico Pet Shop`}
        description={`Lee nuestra ${pageTitle.toLowerCase()} de Hocico Pet Shop. Información transparente sobre tus derechos y nuestros compromisos.`}
        noindex
      />

      <div className="min-h-screen bg-white pt-20">
        <section className="py-12 lg:py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-primary-900 mb-6 text-center">
                {pageTitle}
              </h1>
              <p className="text-primary-900/60 text-center mb-10">
                Última actualización: {new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <div className="prose prose max-w-none text-primary-900 space-y-6">
                {page.sections.map((section, index) => (
                  <motion.section
                    key={section.h2}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <h2 className="font-display font-semibold text-lg sm:text-xl text-primary-900 mb-3">{section.h2}</h2>
                    <div className="text-primary-900 leading-relaxed space-y-3 text-sm sm:text-base">
                      {section.content.split('\n\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </motion.section>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-10 p-5 bg-charcoal-50/50 border border-charcoal-100 rounded-xl text-center"
              >
                <p className="text-primary-900/70 text-sm">
                  ¿Dudas sobre esta política? <a href="/contacto" className="text-charcoal-600 hover:underline">Contactanos</a>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export function PrivacyPolicy() {
  return <LegalPage pageKey="politica-privacidad" />
}

export function Terms() {
  return <LegalPage pageKey="terminos" />
}

export function Returns() {
  return <LegalPage pageKey="cambios-devoluciones" />
}

export function DataPolicy() {
  return <LegalPage pageKey="tratamiento-datos" />
}