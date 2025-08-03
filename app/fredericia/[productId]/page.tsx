import Link from "next/link";
import { getFredericiaProduct, getFredericiaProducts } from '@/sanity/lib/products/getFredericiaProducts';
import { notFound } from 'next/navigation';
import ProductPageClient from './ProductPageClient';

// Static fallback data for when Sanity is unavailable - complete collection
const staticProducts = [
  {
    id: "bm71-library-table",
    name: "BM71 Library Table",
    description: "Elegant library table designed with clean lines and premium materials. Perfect for modern workspaces and home offices.",
    price: 75750,
    image: "/fredericia/bm71-library-table/main.jpg",
    variants: [{ name: "Standard", image: "/fredericia/bm71-library-table/main.jpg", material: "Premium oak", price: 75750 }],
    lifestyleImages: ["/fredericia/bm71-library-table/lifestyle1.jpg"]
  },
  {
    id: "wegner-ox-chair",
    name: "Wegner Ox Chair",
    description: "Iconic Ox Chair designed by Hans J. Wegner. A masterpiece of Danish furniture design with exceptional comfort and style.",
    price: 139995,
    image: "/fredericia/wegner-ox-chair/main.jpg",
    variants: [{ name: "Essene Cognac", image: "/fredericia/wegner-ox-chair/main.jpg", material: "Premium leather", price: 139995 }]
  },
  {
    id: "delphi-elements-sofa",
    name: "Delphi Elements Sofa",
    description: "Modular sofa system offering endless configuration possibilities. Contemporary design meets exceptional comfort.",
    price: 125000,
    image: "/fredericia/delphi-elements-sofa/main.jpg",
    variants: [{ name: "Steelcut Trio 213", image: "/fredericia/delphi-elements-sofa/main.jpg", material: "Steelcut Trio fabric", price: 125000 }]
  },
  {
    id: "ej220-sofa-2-seater",
    name: "EJ220 Sofa 2 Seater",
    description: "Elegant two-seater sofa with refined proportions and premium materials. Available in various upholstery options.",
    price: 98000,
    image: "/fredericia/ej220-sofa/main.jpg",
    variants: [
      { name: "Leather Max 95 Cognac", image: "/fredericia/ej220-sofa/main.jpg", material: "Leather Max 95", price: 98000 },
      { name: "Erik 9998 Broken Grey", image: "/fredericia/ej220-sofa/variant1.jpg", material: "Erik fabric", price: 98000 }
    ],
    lifestyleImages: ["/fredericia/ej220-sofa/lifestyle1.jpg"]
  },
  {
    id: "delphi-sofa-2-seater",
    name: "Delphi Sofa 2 Seater",
    description: "Contemporary two-seater sofa with clean lines and premium leather upholstery. Perfect centerpiece for modern living spaces.",
    price: 95000,
    image: "/fredericia/delphi-sofa/main.jpg",
    variants: [{ name: "Leather Max 98 Black", image: "/fredericia/delphi-sofa/main.jpg", material: "Leather Max 98", price: 95000 }]
  },
  {
    id: "ej-5-corona-armchair",
    name: "EJ 5 Corona Armchair",
    description: "Elegant armchair designed by Erik Jørgensen, featuring refined proportions and exceptional comfort.",
    price: 69347,
    image: "/fredericia/corona-armchair/main.jpg",
    variants: [{ name: "Omni 301 Black", image: "/fredericia/corona-armchair/main.jpg", material: "Omni 301 leather", price: 69347 }]
  },
  {
    id: "insula-piccolo-side-table",
    name: "Insula Piccolo Side Table",
    description: "Compact side table with elegant proportions and premium materials. Perfect for modern living spaces.",
    price: 5295,
    image: "/fredericia/insula-piccolo-side-table/main.jpg",
    variants: [{ name: "H 58cm", image: "/fredericia/insula-piccolo-side-table/main.jpg", material: "Solid oak", price: 5295 }],
    lifestyleImages: ["/fredericia/insula-piccolo-side-table/lifestyle1.jpg"]
  },
  {
    id: "mogensen-6284-dining-table",
    name: "Mogensen 6284 Dining Table",
    description: "Classic dining table designed by Børge Mogensen, featuring clean lines and exceptional craftsmanship.",
    price: 50395,
    image: "/fredericia/mogensen-dining-table/main.jpg",
    variants: [{ name: "Oak Natural", image: "/fredericia/mogensen-dining-table/main.jpg", material: "Solid oak", price: 50395 }]
  },
  {
    id: "mogensen-j39-dining-chair",
    name: "Mogensen J39 Dining Chair",
    description: "Iconic dining chair designed by Børge Mogensen in 1947. Perfect balance between traditional craftsmanship and modern functionality.",
    price: 8930,
    image: "/fredericia/mogensen-j39-dining-chair/main.jpg",
    variants: [
      { name: "Oiled Oak", image: "/fredericia/mogensen-j39-dining-chair/main.jpg", material: "Solid oak", price: 8930 },
      { name: "Soaped Oak", image: "/fredericia/mogensen-j39-dining-chair/variant1.webp", material: "Solid oak", price: 8930 },
      { name: "Black Oak", image: "/fredericia/mogensen-j39-dining-chair/variant2.jpg", material: "Solid oak", price: 8930 }
    ],
    lifestyleImages: [
      "/fredericia/mogensen-j39-dining-chair/lifestyle1.jpg",
      "/fredericia/mogensen-j39-dining-chair/lifestyle2.jpg"
    ]
  },
  {
    id: "piloti-coffee-table",
    name: "Piloti Coffee Table",
    description: "Contemporary coffee table with architectural design elements. Clean lines and premium materials create a sophisticated centerpiece.",
    price: 9840,
    image: "/fredericia/piloti-coffee-table/main.jpg",
    variants: [{ name: "Light Oiled Oak", image: "/fredericia/piloti-coffee-table/main.jpg", material: "Solid oak", price: 9840 }]
  },
  {
    id: "post-dining-chair-with-wooden-seat",
    name: "Post Dining Chair",
    description: "Minimalist dining chair with wooden seat, designed for comfort and durability. Embodies Scandinavian simplicity.",
    price: 6500,
    image: "/fredericia/post-dining-chair/main.jpg",
    variants: [{ name: "Oak Natural", image: "/fredericia/post-dining-chair/main.jpg", material: "Solid oak", price: 6500 }]
  },
  {
    id: "risom-magazine-table",
    name: "Risom Magazine Table",
    description: "Functional magazine table with elegant design. Perfect for organizing reading materials while maintaining sophisticated aesthetics.",
    price: 6945,
    image: "/fredericia/risom-magazine-table/main.jpg",
    variants: [{ name: "Lacquered Oak", image: "/fredericia/risom-magazine-table/main.jpg", material: "Solid oak", price: 6945 }]
  },
  {
    id: "the-canvas-chair",
    name: "The Canvas Chair",
    description: "Contemporary chair with canvas upholstery, combining comfort with modern aesthetics. Perfect for casual and formal settings.",
    price: 15500,
    image: "/fredericia/canvas-chair/main.jpg",
    variants: [{ name: "Natural Canvas & Oak", image: "/fredericia/canvas-chair/main.jpg", material: "Oak & Canvas", price: 15500 }]
  },
  {
    id: "trinidad-chair",
    name: "Trinidad Chair",
    description: "Iconic chair with distinctive perforated shell design. Available in multiple color combinations with chrome or powder-coated finishes.",
    price: 6245,
    image: "/fredericia/trinidad-chair/main.jpg",
    variants: [
      { name: "Beech & Chrome", image: "/fredericia/trinidad-chair/main.jpg", material: "Beech & Chrome", price: 6245 },
      { name: "Black & Chrome", image: "/fredericia/trinidad-chair/variant1.jpg", material: "Black & Chrome", price: 6245 },
      { name: "Grey & Flint", image: "/fredericia/trinidad-chair/variant2.jpg", material: "Grey & Flint", price: 6245 }
    ]
  },
  {
    id: "wegner-j16-rocking-chair",
    name: "Wegner J16 Rocking Chair",
    description: "Classic rocking chair designed by Hans J. Wegner. Combines traditional craftsmanship with timeless comfort and elegance.",
    price: 30900,
    image: "/fredericia/wegner-j16-rocking-chair/main.jpg",
    variants: [{ name: "Oiled Oak Natural Seat", image: "/fredericia/wegner-j16-rocking-chair/main.jpg", material: "Oiled oak", price: 30900 }]
  }
];

export default async function FredericiaProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  
  // For now, use static products only until Sanity products have proper image data
  // This ensures all products display with correct images and variant information
  const product = staticProducts.find((p) => p.id === productId);
  
  if (!product) {
    notFound();
  }

  // Get related products from static data
  const relatedProducts = staticProducts.filter((p) => p.id !== productId).slice(0, 3);

  console.log(`Loading Fredericia product: ${product.name} (static data)`);

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/fredericia" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Fredericia Collection
          </Link>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-stone-600 hover:text-stone-800">
              Home
            </Link>
            <span className="text-stone-400">/</span>
            <Link href="/fredericia" className="text-stone-600 hover:text-stone-800">
              Fredericia
            </Link>
            <span className="text-stone-400">/</span>
            <span className="text-stone-800 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <ProductPageClient product={product} relatedProducts={relatedProducts} />
    </div>
  );
}
