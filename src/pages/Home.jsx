import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/seo/SEO'
import Hero from '../components/home/Hero'
import Categories from '../components/home/Categories'
import HowItWorks from '../components/home/HowItWorks'
import FeaturedProducts from '../components/home/FeaturedProducts'
import TrustSection from '../components/home/TrustSection'
import Newsletter from '../components/home/Newsletter'

export default function Home() {
  return (
    <>
      <SEO
        title="Hocico Pet Shop - Alimentos, Accesorios y Snacks para tu Mascota"
        description="Tu tienda online de alimentos, snacks y accesorios para perros y gatas. Envíos a Mosquera, Madrid y Funza."
        type="website"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <Categories />
        <HowItWorks />
        <FeaturedProducts />
        <TrustSection />
        <Newsletter />
      </motion.div>
    </>
  )
}