import { salesProducts } from "@/lib/salesData";
import SalesProductCard from "@/components/SalesProductCard";

export default function SalgPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {salesProducts.map((product) => (
            <SalesProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Interessert i et produkt?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Kontakt oss for mer informasjon om tilgjengelighet og levering av salgsprodukter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+4762948080" 
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200"
            >
              Ring oss: 62 94 80 80
            </a>
            <a 
              href="mailto:post@kiil.no" 
              className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200"
            >
              Send e-post
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
