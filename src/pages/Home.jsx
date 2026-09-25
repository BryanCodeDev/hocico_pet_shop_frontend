import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/seo/SEO'
import Hero from '../components/home/Hero'
import FeaturedProducts from '../components/home/FeaturedProducts'
import TrustSection from '../components/home/TrustSection'
import Newsletter from '../components/home/Newsletter'

export default function Home() {
  return (
    <>
      <SEO
        title="Hocico Pet Shop - Alimentos, Accesorios y Grooming para tu Mascota"
        description="Tu tienda online de alimentos, snacks, accesorios y servicios de grooming para perros y gatas. Envíos a Mosquera, Madrid y Funza."
        type="website"
      />
      <div className="min-h-screen">
        <Hero />
        <FeaturedProducts />
        <TrustSection />
        <Newsletter />
      </div>
    </>
  )
}