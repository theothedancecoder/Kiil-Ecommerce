"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface DuxProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  variants: {
    id: string;
    name: string;
    image: string;
    color?: string;
    material?: string;
  }[];
  category: string;
}

export default function DuxPage() {
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // Enhanced DUX products data with comprehensive information
  const products: DuxProduct[] = [
    {
      id: "inter-dining-table",
      name: "Inter Dining Table",
      description: "Made to order - 8 weeks delivery. Classic cafe table perfect for smaller dining areas or dining table for 6 people. Durable nanolaminate surface.",
      price: 19490,
      image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp",
      category: "Tables",
      variants: [
        {
          id: "ø-110-white-laminate",
          name: "Ø-110 White Laminate",
          image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp",
          color: "White",
        },
        {
          id: "ø-110-black-laminate",
          name: "Ø-110 Black Laminate",
          image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 sort laminat.jpg",
          color: "Black",
        },
        {
          id: "100x180-white-laminate",
          name: "100×180 White Laminate",
          image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp",
          color: "White",
        },
        {
          id: "100x180-black-laminate",
          name: "100×180 Black Laminate",
          image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 26 440  Varianter - 100x180 sort laminat.webp",
          color: "Black",
        },
        {
          id: "100x180-white-laminate-2-plates",
          name: "100×180 White w/2 Insert Panels",
          image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 45 990  Varianter - 100x180 hvit laminat m:2 illeggsplater.webp",
          color: "White",
        },
        {
          id: "100x180-black-laminate-2-plates",
          name: "100×180 Black w/2 Insert Panels",
          image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 45 990  Varianter - 100x180 sort laminat m:2 illeggsplater.webp",
          color: "Black",
        },
      ],
    },
    {
      id: "jetson-classic-soft-88",
      name: "Jetson Classic Soft 88",
      description: "Ergonomic swivel armchair by Bruno Mathsson (1966). Premium Classic Soft leather upholstery with sophisticated design for modern and classic homes.",
      price: 27990,
      image: "/dux/Jetson Classic soft 88/classic soft 88 black.jpg",
      category: "Chairs",
      variants: [
        {
          id: "classic-soft-88-black",
          name: "Classic Soft 88 Black",
          image: "/dux/Jetson Classic soft 88/classic soft 88 black.jpg",
          color: "Black",
        },
        {
          id: "classic-soft-25-brown",
          name: "Classic Soft 25 Brown",
          image: "/dux/Jetson Classic soft 88/classic soft 25 brown.jpg",
          color: "Brown",
        },
      ],
    },
    {
      id: "jetson-match-flax-21",
      name: "Jetson Match Flax 21",
      description: "Special tribute to Bruno Mathsson's Swedish design classic. Flax 21 linen fabric with exclusive Dakota leather edges, frame and neck cushion.",
      price: 27990,
      image: "/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg",
      category: "Chairs",
      variants: [
        {
          id: "flax-21-dakota-88-black",
          name: "Flax 21 with Dakota 88 Black",
          image: "/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg",
          color: "Black",
        },
        {
          id: "flax-21-dakota-29-cognac",
          name: "Flax 21 with Dakota 29 Cognac",
          image: "/dux/Jetson-Match-Flax-21/Jetson Match Flax : daktota 29 leather :21 NOK  27,990.jpg",
          color: "Cognac",
        },
        {
          id: "flax-21-dakota-24",
          name: "Flax 21 with Dakota 24",
          image: "/dux/Jetson-Match-Flax-21/Jetson Match Flax-dakota 24 leather: 21 NOK  27,990.webp",
          color: "Brown",
        },
      ],
    },
    {
      id: "lunaria-table",
      name: "Lunaria Table",
      description: "Made to order - 8 weeks delivery. Organic shaped tables by Claesson Koivisto Rune (2018). Available in ash, oak, and walnut with wax-oil finish.",
      price: 10215,
      image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp",
      category: "Tables",
      variants: [
        {
          id: "small-ash",
          name: "Small - Wax-oiled Ash",
          image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp",
          color: "Ash",
        },
        {
          id: "medium-ash",
          name: "Medium - Wax-oiled Ash",
          image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 980  Størrelse - Medium Large Medium Small Nullstill H-45 Ø-60.webp",
          color: "Ash",
        },
        {
          id: "large-ash",
          name: "Large - Wax-oiled Ash",
          image: "/dux/Lunaria-table /Lunaria table from DUX NOK  16 080  Size -  Large Large Medium Small Reset H-40 Ø-86.webp",
          color: "Ash",
        },
        {
          id: "small-oak",
          name: "Small - Wax-oiled Oak",
          image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp",
          color: "Oak",
        },
        {
          id: "medium-oak",
          name: "Medium - Wax-oiled Oak",
          image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 980  Størrelse - Medium Large Medium Small Nullstill H-45 Ø-60.webp",
          color: "Oak",
        },
        {
          id: "large-oak",
          name: "Large - Wax-oiled Oak",
          image: "/dux/Lunaria-table /Lunaria table from DUX NOK  16 080  Size -  Large Large Medium Small Reset H-40 Ø-86.webp",
          color: "Oak",
        },
        {
          id: "small-walnut",
          name: "Small - Wax-oiled Walnut",
          image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp",
          color: "Walnut",
        },
        {
          id: "medium-walnut",
          name: "Medium - Wax-oiled Walnut",
          image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 980  Størrelse - Medium Large Medium Small Nullstill H-45 Ø-60.webp",
          color: "Walnut",
        },
        {
          id: "large-walnut",
          name: "Large - Wax-oiled Walnut",
          image: "/dux/Lunaria-table /Lunaria table from DUX NOK  16 080  Size -  Large Large Medium Small Reset H-40 Ø-86.webp",
          color: "Walnut",
        },
      ],
    },
    {
      id: "sam-dining-chair",
      name: "Sam Dining Chair",
      description: "Made to order - 12 weeks delivery. Elegant chair by Sam Larsson (1974), relaunched 2015. Chrome frame with tufted seat and premium leather upholstery.",
      price: 13790,
      image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg",
      category: "Chairs",
      variants: [
        {
          id: "classic-soft-88-with-armrest",
          name: "Classic Soft 88 - With Armrest",
          image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg",
          color: "Black",
        },
        {
          id: "naturale-camel-with-armrest",
          name: "Naturale Camel - With Armrest",
          image: "/dux/Sam-Dining-Chair/Sam Dining Chair from DUX FromNOK  13,790  Color -  Natural Camel.jpg",
          color: "Camel",
        },
        {
          id: "naturale-perle-with-armrest",
          name: "Naturale Perle - With Armrest",
          image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Naturale Perle.jpg",
          color: "Perle",
        },
        {
          id: "naturale-truffle-with-armrest",
          name: "Naturale Truffle - With Armrest",
          image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Naturale Truffle.jpg",
          color: "Truffle",
        },
        {
          id: "classic-soft-88-without-armrest",
          name: "Classic Soft 88 - Without Armrest",
          image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg",
          color: "Black",
        },
        {
          id: "naturale-camel-without-armrest",
          name: "Naturale Camel - Without Armrest",
          image: "/dux/Sam-Dining-Chair/Sam Dining Chair from DUX FromNOK  13,790  Color -  Natural Camel.jpg",
          color: "Camel",
        },
        {
          id: "naturale-perle-without-armrest",
          name: "Naturale Perle - Without Armrest",
          image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Naturale Perle.jpg",
          color: "Perle",
        },
        {
          id: "naturale-truffle-without-armrest",
          name: "Naturale Truffle - Without Armrest",
          image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Naturale Truffle.jpg",
          color: "Truffle",
        },
      ],
    },
    {
      id: "superspider-sheepskin",
      name: "Superspider Sheepskin",
      description: "Made to order - 8 weeks delivery. Classic design by DUX Design Team (1987). First-class materials with tubular steel frame and Pirelli strap support.",
      price: 53815,
      image: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Scandinavian Grey 22.jpg",
      category: "Chairs",
      variants: [
        {
          id: "scandinavian-grey-22",
          name: "Scandinavian Grey 22 Sheepskin",
          image: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Scandinavian Grey 22.jpg",
          color: "Grey",
        },
        {
          id: "black-01",
          name: "Black 01 Sheepskin",
          image: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Black 01.jpg",
          color: "Black",
        },
        {
          id: "off-white-02",
          name: "Off-white 02 Sheepskin",
          image: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Off-white 02.jpg",
          color: "Off-white",
        },
        {
          id: "cork-19",
          name: "Cork 19 Sheepskin",
          image: "/dux/Superspider sheepskin /Superspider fåreskinn DUX kr 53 815  Farge - Cork 19.jpg",
          color: "Cork",
        },
        {
          id: "drake-20",
          name: "Drake 20 Sheepskin",
          image: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Black 01.jpg",
          color: "Drake",
        },
        {
          id: "mohawi-21",
          name: "Mohawi 21 Sheepskin",
          image: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Off-white 02.jpg",
          color: "Mohawi",
        },
      ],
    },
  ];

  const filteredProducts = products.filter(
    (product) => filterBy === "all" || product.category === filterBy
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handleFilterChange = (newFilter: string) => {
    setFilterBy(newFilter);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back to Homepage */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-stone-600 hover:text-stone-800 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/dux/Inter-dining-table/lifestyle/inter3.webp"
          alt="Dux Collection"
          fill
          className="object-cover"
        />

        {/* Colorful Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-pink-500/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

        {/* Content */}
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-block bg-black px-8 py-4 rounded-lg">
              <h1 className="text-4xl md:text-6xl font-serif text-white">DUX</h1>
            </div>
          </div>
        </div>

        {/* Floating Color Dots */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-80 animate-pulse"></div>
        <div className="absolute top-32 right-16 w-6 h-6 bg-pink-400 rounded-full opacity-70 animate-pulse delay-300"></div>
        <div className="absolute bottom-24 left-20 w-5 h-5 bg-blue-400 rounded-full opacity-75 animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-12 w-3 h-3 bg-green-400 rounded-full opacity-80 animate-pulse delay-500"></div>
        <div className="absolute top-40 left-1/3 w-4 h-4 bg-purple-400 rounded-full opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-1/3 w-5 h-5 bg-orange-400 rounded-full opacity-75 animate-pulse delay-200"></div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-stone-800 mb-4">DUX Collection</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Discover our elegant and functional furniture pieces from DUX.
            </p>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 space-y-4 sm:space-y-0">
            <div className="flex space-x-4">
              <select
                value={filterBy}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              >
                <option value="all">All Categories</option>
                <option value="Tables">Tables</option>
                <option value="Chairs">Chairs</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-stone-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentProducts.map((product) => (
              <Link
                key={product.id}
                href={`/dux/${product.id}`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain object-center group-hover:scale-105 transition-transform duration-300 p-4"
                    />
                    <div className="absolute top-3 right-3 bg-stone-100 px-2 py-1 rounded-full text-xs text-stone-600">
                      {product.category}
                    </div>
                  </div>

                  {product.variants.length > 1 && (
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="flex space-x-1">
                        {product.variants.slice(0, 4).map((variant, index) => {
                          const getVariantColor = (color: string) => {
                            const colorMap: { [key: string]: string } = {
                              White: "#FFFFFF",
                              Black: "#000000",
                              Brown: "#8B4513",
                              Camel: "#C8A882",
                              Perle: "#F5F5DC",
                              Truffle: "#8B4513",
                              Cognac: "#A0522D",
                              Ash: "#D2B48C",
                              Oak: "#DEB887",
                              Walnut: "#8B4513",
                              Grey: "#8B8680",
                              "Off-white": "#F5F5F0",
                              Cork: "#D2B48C",
                              Drake: "#4A4A4A",
                              Mohawi: "#8B7355",
                            };
                            return colorMap[color] || "#D1D5DB";
                          };

                          const backgroundColor = getVariantColor(variant.color || "");

                          return (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-gray-200"
                              style={{ backgroundColor }}
                              title={variant.name}
                            />
                          );
                        })}
                        {product.variants.length > 4 && (
                          <div className="w-4 h-4 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-500">+</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 p-4">
                    <h3 className="text-lg font-serif text-stone-800 group-hover:text-stone-600 transition-colors leading-tight text-center">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-stone-900 font-medium">
                        kr {product.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-500 uppercase tracking-wider">
                        {product.variants.length} variant
                        {product.variants.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-stone-800 text-white hover:bg-stone-700"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? "bg-stone-800 text-white"
                          : "bg-gray-100 text-stone-600 hover:bg-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-stone-800 text-white hover:bg-stone-700"
                }`}
              >
                Next
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* About DUX Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif text-stone-800 mb-6">About DUX</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              DUX is a renowned Swedish furniture brand known for its elegant and functional designs. 
              Since 1926, DUX has been creating furniture that combines exceptional craftsmanship with modern aesthetics to create timeless pieces.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              Our collection features iconic designs from legendary designers like Bruno Mathsson, alongside contemporary pieces from the DUX Design Team. Each piece is made to order with meticulous attention to detail.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Made to order - Premium quality furniture</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Iconic designs by Bruno Mathsson and DUX Design Team</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Swedish craftsmanship since 1926</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Premium materials: leather, linen, nanolaminate, solid wood</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Delivery: 8-12 weeks (varies by product)</span>
              </div>
            </div>
          </div>
          <div className="relative h-96">
            <Image
              src="/dux/Inter-dining-table/lifestyle/inter3.webp"
              alt="Dux Design Detail"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-stone-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-serif mb-6">Discover Timeless Furniture</h2>
          <p className="text-xl text-stone-300 mb-8 leading-relaxed">
            Find your perfect piece from the DUX collection and elevate your home with style and comfort.
          </p>
          <Link
            href="/book-consultation"
            className="inline-block bg-white text-stone-800 px-8 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors"
          >
            Book a Design Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
