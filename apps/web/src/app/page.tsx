import Navbar from '../components/layout/Navbar'
import HeroSection from '../components/home/HeroSection'
import CategoryGrid from '../components/home/CategoryGrid'
import FeaturedPieces from '../components/home/FeaturedPieces'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-velore-black">
      <Navbar />
      <HeroSection />
      <CategoryGrid />
      <FeaturedPieces />
    </main>
  )
}