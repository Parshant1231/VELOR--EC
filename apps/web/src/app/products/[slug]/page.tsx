import { notFound } from 'next/navigation'
import ProductInfo from '../../../components/product/ProductInfo'
import AIStylistBanner from '../../../components/product/AIStylistBanner'
import FeaturedPieces from '../../../components/home/FeaturedPieces'
import { ALL_PRODUCTS } from '../../../lib/mock-data'
import Navbar from '../../../components/layout/Navbar'
import ImageGallery from '../../../components/product/ImageGallery'


interface Props {
  params: Promise<{ slug: string }>
}

// Static generation for all products
export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = ALL_PRODUCTS.find((p) => p.slug === slug)
  if (!product) notFound()

  return (
    <div className="min-h-screen bg-velore-black">
      <Navbar />

      {/* Main product section */}
      <section className="pt-24 pb-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 min-h-[80vh]">
            {/* Left: Image gallery */}
            <div className="h-[70vh] lg:h-[85vh]">
              <ImageGallery productName={product.name} images={product.images} />
            </div>

            {/* Right: Product info */}
            <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] overflow-y-auto
                            scrollbar-hide pb-8">
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Craftsmanship editorial — Design img 4 bottom section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-16 border-t border-velore-border/30">
            <div className="md:col-span-1">
              <p className="section-label mb-3">The Essence</p>
              <h3 className="font-serif text-3xl font-light text-velore-white mb-4 leading-tight">
                Architectural<br /><em>by design.</em>
              </h3>
              <p className="text-velore-gray text-sm leading-relaxed mb-6">
                {product.description} Constructed from the world's finest Italian wool — selected for its structure, softness, and enduring elegance.
              </p>
              <button className="text-[10px] tracking-[0.3em] uppercase text-velore-gold
                                 border-b border-velore-gold/50 pb-0.5 hover:border-velore-gold
                                 transition-colors duration-300">
                Discover the Story →
              </button>
            </div>

            {/* Fabric detail — IMAGE PLACEHOLDER */}
            <div className="relative bg-velore-surface h-48 md:h-auto flex items-center justify-center
                            border border-velore-border/30 overflow-hidden group">
              {/* IMAGE PLACEHOLDER — close-up fabric texture */}
              <span className="font-serif text-5xl text-velore-border/30">Fabric</span>
              <div className="absolute inset-0 bg-velore-gold/0 group-hover:bg-velore-gold/5
                              flex items-center justify-center transition-all duration-500">
                <span className="text-[10px] tracking-[0.3em] uppercase text-velore-gold opacity-0
                                 group-hover:opacity-100 transition-opacity duration-300 border border-velore-gold px-4 py-2">
                  Touch to Explore
                </span>
              </div>
            </div>

            {/* AI Stylist mini */}
            <div className="md:col-span-1">
              <AIStylistBanner />
            </div>
          </div>
        </div>
      </section>

      {/* You may also like */}
      <div className="border-t border-velore-border/30">
        <FeaturedPieces excludeSlug={slug} />
      </div>
    </div>
  )
}