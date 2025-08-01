export interface OutdoorProduct {
  _id: string;
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  brand: string;
  image: string;
  staticProduct: true;
  staticHref: string;
  staticImage: string;
  staticBrand: string;
  variants?: Array<{
    name: string;
    image: string;
    color: string;
  }>;
  features: string[];
  specifications: Array<{
    label: string;
    value: string;
  }>;
  lifestyleImages?: string[];
}

export const outdoorProducts: OutdoorProduct[] = [
  // Pelagus Collection
  {
    _id: "pelagus-armchair",
    id: "pelagus-armchair",
    name: "Pelagus Armchair",
    description: "Elegant outdoor armchair from the Pelagus collection by Skagerak. Designed for comfort and durability with weather-resistant materials and timeless Scandinavian design.",
    price: 10999,
    category: "furniture",
    subcategory: "seating",
    brand: "Skagerak by Fritz Hansen",
    image: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-armchair/Pelagus armchair NOK  10,999  Color -  Hunter Green.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/pelagus-armchair",
    staticImage: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-armchair/Pelagus armchair NOK  10,999  Color -  Hunter Green.jpg",
    staticBrand: "Skagerak by Fritz Hansen",
    variants: [
      {
        name: "Hunter Green",
        image: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-armchair/Pelagus armchair NOK  10,999  Color -  Hunter Green.jpg",
        color: "Hunter Green"
      },
      {
        name: "Light Ivory",
        image: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-armchair/Pelagus armchair NOK  10,999  Color -  Light Ivory.jpg",
        color: "Light Ivory"
      }
    ],
    features: [
      "Weather-resistant outdoor construction",
      "Comfortable armrest design",
      "Durable powder-coated aluminum frame",
      "UV-resistant fabric",
      "Stackable design for easy storage",
      "Scandinavian design aesthetic"
    ],
    specifications: [
      { label: "Material", value: "Powder-coated aluminum, weather-resistant fabric" },
      { label: "Dimensions", value: "W: 60cm, D: 60cm, H: 80cm" },
      { label: "Weight", value: "4.5 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" },
      { label: "Stackable", value: "Yes" }
    ],
    lifestyleImages: [
      "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-armchair/lifestyle/1430053-pelagus_19-jpg.webp"
    ]
  },
  {
    _id: "pelagus-chair",
    id: "pelagus-chair",
    name: "Pelagus Chair",
    description: "Stylish outdoor dining chair from the Pelagus collection. Perfect for outdoor dining with its comfortable design and weather-resistant construction.",
    price: 8999,
    category: "furniture",
    subcategory: "dining-chairs",
    brand: "Skagerak by Fritz Hansen",
    image: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-chair/Pelagus chair NOK  8,999  Color -  Hunter Green.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/pelagus-chair",
    staticImage: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-chair/Pelagus chair NOK  8,999  Color -  Hunter Green.jpg",
    staticBrand: "Skagerak by Fritz Hansen",
    variants: [
      {
        name: "Hunter Green",
        image: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-chair/Pelagus chair NOK  8,999  Color -  Hunter Green.jpg",
        color: "Hunter Green"
      },
      {
        name: "Light Ivory",
        image: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-chair/Pelagus chair NOK  8,999  Color -  Light Ivory.webp",
        color: "Light Ivory"
      }
    ],
    features: [
      "Weather-resistant outdoor construction",
      "Comfortable dining height",
      "Durable powder-coated aluminum frame",
      "UV-resistant fabric",
      "Stackable design for easy storage",
      "Matches Pelagus dining table"
    ],
    specifications: [
      { label: "Material", value: "Powder-coated aluminum, weather-resistant fabric" },
      { label: "Dimensions", value: "W: 50cm, D: 55cm, H: 82cm" },
      { label: "Seat Height", value: "45cm" },
      { label: "Weight", value: "3.8 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Stackable", value: "Yes" }
    ],
    lifestyleImages: [
      "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-chair/lifestyle/1430059-pelagus_table_chair_and_armchair_01_m-jpg.webp"
    ]
  },
  {
    _id: "pelagus-dining-table",
    id: "pelagus-dining-table",
    name: "Pelagus Dining Table",
    description: "Elegant outdoor dining table from the Pelagus collection. Features a spacious surface perfect for outdoor entertaining and dining with family and friends.",
    price: 44499,
    category: "furniture",
    subcategory: "dining-tables",
    brand: "Skagerak by Fritz Hansen",
    image: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-dining-table/Pelagus dining table NOK  44,499  Color -  Hunter Green.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/pelagus-dining-table",
    staticImage: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-dining-table/Pelagus dining table NOK  44,499  Color -  Hunter Green.jpg",
    staticBrand: "Skagerak by Fritz Hansen",
    variants: [
      {
        name: "Hunter Green",
        image: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-dining-table/Pelagus dining table NOK  44,499  Color -  Hunter Green.jpg",
        color: "Hunter Green"
      },
      {
        name: "Light Ivory",
        image: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-dining-table/Pelagus dining table NOK  44,499  Color -  Light Ivory.jpg",
        color: "Light Ivory"
      }
    ],
    features: [
      "Weather-resistant outdoor construction",
      "Spacious dining surface for 6-8 people",
      "Durable powder-coated aluminum frame",
      "UV-resistant finish",
      "Matches Pelagus seating collection",
      "Modern Scandinavian design"
    ],
    specifications: [
      { label: "Material", value: "Powder-coated aluminum" },
      { label: "Dimensions", value: "L: 220cm, W: 100cm, H: 74cm" },
      { label: "Seating Capacity", value: "6-8 people" },
      { label: "Weight", value: "28 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: [
      "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-dining-table/lifestyle/1430053-pelagus_table_chair_and_armchair_01_m-jpg.webp"
    ]
  },
  {
    _id: "pelagus-lounge-chair",
    id: "pelagus-lounge-chair",
    name: "Pelagus Lounge Chair",
    description: "Comfortable outdoor lounge chair from the Pelagus collection. Perfect for relaxation with its ergonomic design and premium outdoor materials.",
    price: 19499,
    category: "furniture",
    subcategory: "lounge-seating",
    brand: "Skagerak by Fritz Hansen",
    image: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-lounge-chair/Pelagus lounge chair NOK  19,499.webp",
    staticProduct: true,
    staticHref: "/utendors/product/pelagus-lounge-chair",
    staticImage: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-lounge-chair/Pelagus lounge chair NOK  19,499.webp",
    staticBrand: "Skagerak by Fritz Hansen",
    features: [
      "Weather-resistant outdoor construction",
      "Ergonomic lounge design",
      "Durable powder-coated aluminum frame",
      "UV-resistant fabric",
      "Comfortable reclining position",
      "Matches Pelagus collection"
    ],
    specifications: [
      { label: "Material", value: "Powder-coated aluminum, weather-resistant fabric" },
      { label: "Dimensions", value: "W: 70cm, D: 85cm, H: 75cm" },
      { label: "Weight", value: "6.2 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" },
      { label: "Reclining", value: "Fixed comfortable angle" }
    ],
    lifestyleImages: [
      "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-lounge-chair/lifestyle/pelagus-16.webp"
    ]
  },
  {
    _id: "pelagus-insert-plate",
    id: "pelagus-insert-plate",
    name: "Pelagus Insert Plate",
    description: "Extension plate for the Pelagus dining table, allowing you to accommodate more guests for larger outdoor gatherings.",
    price: 7199,
    category: "furniture",
    subcategory: "accessories",
    brand: "Skagerak by Fritz Hansen",
    image: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-insert-plate/Pelagus insert plate kr  7 199.webp",
    staticProduct: true,
    staticHref: "/utendors/product/pelagus-insert-plate",
    staticImage: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-insert-plate/Pelagus insert plate kr  7 199.webp",
    staticBrand: "Skagerak by Fritz Hansen",
    features: [
      "Extends Pelagus dining table",
      "Weather-resistant construction",
      "Easy to install and remove",
      "Matches table finish perfectly",
      "Accommodates additional guests",
      "Durable outdoor materials"
    ],
    specifications: [
      { label: "Material", value: "Powder-coated aluminum" },
      { label: "Dimensions", value: "L: 60cm, W: 100cm" },
      { label: "Compatibility", value: "Pelagus Dining Table" },
      { label: "Additional Seating", value: "2 extra guests" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes" }
    ],
    lifestyleImages: [
      "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-insert-plate/lifestyle/1430053-pelagus_19-jpg-1.webp"
    ]
  },
  {
    _id: "pelagus-seat-cushion",
    id: "pelagus-seat-cushion",
    name: "Pelagus Seat Cushion",
    description: "Premium outdoor seat cushion designed specifically for Pelagus chairs. Available in multiple colors to match your outdoor decor.",
    price: 2799,
    category: "cushions-pillows",
    subcategory: "cushions",
    brand: "Skagerak by Fritz Hansen",
    image: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-seat-cushion/Pelagus seat cushion NOK  2,799  Color -  Honey Yellow.png",
    staticProduct: true,
    staticHref: "/utendors/product/pelagus-seat-cushion",
    staticImage: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-seat-cushion/Pelagus seat cushion NOK  2,799  Color -  Honey Yellow.png",
    staticBrand: "Skagerak by Fritz Hansen",
    variants: [
      {
        name: "Honey Yellow",
        image: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-seat-cushion/Pelagus seat cushion NOK  2,799  Color -  Honey Yellow.png",
        color: "Honey Yellow"
      },
      {
        name: "Ash",
        image: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-seat-cushion/Pelagus seat cushion kr  2 199  Color -  Ash.png",
        color: "Ash"
      },
      {
        name: "Charcoal",
        image: "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-seat-cushion/Pelagus seat cushion kr  2 199  Color -  Charcoal.png",
        color: "Charcoal"
      }
    ],
    features: [
      "Weather-resistant outdoor fabric",
      "Perfect fit for Pelagus chairs",
      "Quick-dry foam filling",
      "UV-resistant colors",
      "Easy to clean",
      "Ties securely to chair"
    ],
    specifications: [
      { label: "Material", value: "Weather-resistant outdoor fabric" },
      { label: "Filling", value: "Quick-dry outdoor foam" },
      { label: "Dimensions", value: "W: 45cm, D: 45cm, H: 5cm" },
      { label: "Compatibility", value: "Pelagus Chair & Armchair" },
      { label: "Care", value: "Machine washable cover" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: [
      "/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-seat-cushion/lifestyle/DFB8C7EB22B041CAB000CCBE112D3FE6_09ab-scaled.webp"
    ]
  },
  // Plank Collection
  {
    _id: "plank-bench",
    id: "plank-bench",
    name: "Plank Bench",
    description: "Minimalist outdoor bench with clean lines and durable construction. Perfect for gardens, patios, and outdoor spaces requiring simple, elegant seating.",
    price: 19999,
    category: "furniture",
    subcategory: "benches",
    brand: "Skagerak by Fritz Hansen",
    image: "/outdoor/Skagerak-by-Fritz-Hansen/Plank-Bench/Plank Bench NOK  19,999.png",
    staticProduct: true,
    staticHref: "/utendors/product/plank-bench",
    staticImage: "/outdoor/Skagerak-by-Fritz-Hansen/Plank-Bench/Plank Bench NOK  19,999.png",
    staticBrand: "Skagerak by Fritz Hansen",
    features: [
      "Minimalist Scandinavian design",
      "Weather-resistant teak construction",
      "Comfortable seating for 2-3 people",
      "Develops beautiful patina over time",
      "Durable outdoor construction",
      "Easy maintenance"
    ],
    specifications: [
      { label: "Material", value: "FSC-certified teak wood" },
      { label: "Dimensions", value: "L: 160cm, W: 35cm, H: 45cm" },
      { label: "Seating Capacity", value: "2-3 people" },
      { label: "Weight", value: "18 kg" },
      { label: "Care", value: "Clean with mild soap and water, teak oil recommended" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: [
      "/outdoor/Skagerak-by-Fritz-Hansen/Plank-Bench/lifestyle/Plank-Bench-02-scaled.jpg.avif"
    ]
  },
  // Steamer Collection
  {
    _id: "steamer-deck-chair-cushion",
    id: "steamer-deck-chair-cushion",
    name: "Steamer Deck Chair Cushion",
    description: "Premium outdoor cushion designed for steamer deck chairs. Available in multiple colors and patterns to enhance your outdoor relaxation experience.",
    price: 3899,
    category: "cushions-pillows",
    subcategory: "cushions",
    brand: "Skagerak by Fritz Hansen",
    image: "/outdoor/Skagerak-by-Fritz-Hansen/Steamer-Deck-Chair-Cushion/Steamer Deck Chair Cushion NOK  3,899  Color -  Papyrus.png",
    staticProduct: true,
    staticHref: "/utendors/product/steamer-deck-chair-cushion",
    staticImage: "/outdoor/Skagerak-by-Fritz-Hansen/Steamer-Deck-Chair-Cushion/Steamer Deck Chair Cushion NOK  3,899  Color -  Papyrus.png",
    staticBrand: "Skagerak by Fritz Hansen",
    variants: [
      {
        name: "Papyrus",
        image: "/outdoor/Skagerak-by-Fritz-Hansen/Steamer-Deck-Chair-Cushion/Steamer Deck Chair Cushion NOK  3,899  Color -  Papyrus.png",
        color: "Papyrus"
      },
      {
        name: "Ash",
        image: "/outdoor/Skagerak-by-Fritz-Hansen/Steamer-Deck-Chair-Cushion/Steamer Deck Chair Cushion NOK  3,899  Color -  Ash.jpg",
        color: "Ash"
      },
      {
        name: "Charcoal",
        image: "/outdoor/Skagerak-by-Fritz-Hansen/Steamer-Deck-Chair-Cushion/Steamer Deck Chair Cushion NOK  3,899  Color -  Charcoal.png",
        color: "Charcoal"
      },
      {
        name: "Golden Yellow Stripe",
        image: "/outdoor/Skagerak-by-Fritz-Hansen/Steamer-Deck-Chair-Cushion/Steamer Deck Chair Cushion NOK  3,899  Color -  Golden Yellow Stripe.png",
        color: "Golden Yellow Stripe"
      },
      {
        name: "Marine",
        image: "/outdoor/Skagerak-by-Fritz-Hansen/Steamer-Deck-Chair-Cushion/Steamer Deck Chair Cushion NOK  3,899  Color -  Marine.png",
        color: "Marine"
      }
    ],
    features: [
      "Weather-resistant outdoor fabric",
      "Perfect fit for steamer deck chairs",
      "Quick-dry foam filling",
      "UV-resistant colors and patterns",
      "Easy to clean and maintain",
      "Ties securely to chair"
    ],
    specifications: [
      { label: "Material", value: "Weather-resistant outdoor fabric" },
      { label: "Filling", value: "Quick-dry outdoor foam" },
      { label: "Dimensions", value: "L: 180cm, W: 50cm, H: 6cm" },
      { label: "Compatibility", value: "Steamer Deck Chairs" },
      { label: "Care", value: "Machine washable cover" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: [
      "/outdoor/Skagerak-by-Fritz-Hansen/Steamer-Deck-Chair-Cushion/lifestyle/10419362r_2.jpg"
    ]
  },
  // Vendia Collection
  {
    _id: "vendia-folding-chair",
    id: "vendia-folding-chair",
    name: "Vendia Folding Chair",
    description: "Practical folding chair perfect for outdoor dining and entertaining. Combines functionality with elegant design, easy to store when not in use.",
    price: 5199,
    category: "furniture",
    subcategory: "dining-chairs",
    brand: "Skagerak by Fritz Hansen",
    image: "/outdoor/Skagerak-by-Fritz-Hansen/Vendia klappstol/ Skagerak by Fritz Hansen Vendia klappstol Skagerak kr 5 199.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/vendia-folding-chair",
    staticImage: "/outdoor/Skagerak-by-Fritz-Hansen/Vendia klappstol/ Skagerak by Fritz Hansen Vendia klappstol Skagerak kr 5 199.jpg",
    staticBrand: "Skagerak by Fritz Hansen",
    features: [
      "Space-saving folding design",
      "Weather-resistant teak construction",
      "Comfortable dining height",
      "Easy storage and transport",
      "Durable outdoor construction",
      "Classic Scandinavian design"
    ],
    specifications: [
      { label: "Material", value: "FSC-certified teak wood" },
      { label: "Dimensions", value: "W: 45cm, D: 50cm, H: 80cm" },
      { label: "Seat Height", value: "45cm" },
      { label: "Weight", value: "4.2 kg" },
      { label: "Folding", value: "Yes, for easy storage" },
      { label: "Care", value: "Clean with mild soap and water, teak oil recommended" }
    ],
    lifestyleImages: [
      "/outdoor/Skagerak-by-Fritz-Hansen/Vendia klappstol/lifestyle/10419548_2.jpg"
    ]
  },
  {
    _id: "vendia-cafe-table",
    id: "vendia-cafe-table",
    name: "Vendia Café Table",
    description: "Compact outdoor café table perfect for small spaces, balconies, and intimate outdoor dining. Features durable teak construction with timeless design.",
    price: 6299,
    category: "furniture",
    subcategory: "dining-tables",
    brand: "Skagerak by Fritz Hansen",
    image: "/outdoor/Skagerak-by-Fritz-Hansen/Vendia-kafébord/Vendia kafébord H-75 Skagerak kr 6 299.png",
    staticProduct: true,
    staticHref: "/utendors/product/vendia-cafe-table",
    staticImage: "/outdoor/Skagerak-by-Fritz-Hansen/Vendia-kafébord/Vendia kafébord H-75 Skagerak kr 6 299.png",
    staticBrand: "Skagerak by Fritz Hansen",
    features: [
      "Compact size perfect for small spaces",
      "Weather-resistant teak construction",
      "Ideal for 2 people",
      "Develops beautiful patina over time",
      "Durable outdoor construction",
      "Matches Vendia folding chairs"
    ],
    specifications: [
      { label: "Material", value: "FSC-certified teak wood" },
      { label: "Dimensions", value: "Ø: 70cm, H: 75cm" },
      { label: "Seating Capacity", value: "2 people" },
      { label: "Weight", value: "12 kg" },
      { label: "Shape", value: "Round" },
      { label: "Care", value: "Clean with mild soap and water, teak oil recommended" }
    ],
    lifestyleImages: [
      "/outdoor/Skagerak-by-Fritz-Hansen/Vendia-kafébord/lifestyle/10419549_2.jpg"
    ]
  },
  // HAY Palissade Collection
  {
    _id: "palissade-lounge-sofa",
    id: "palissade-lounge-sofa",
    name: "Palissade Lounge Sofa",
    description: "Contemporary outdoor lounge sofa featuring durable steel construction and modern design. Perfect for creating comfortable outdoor seating areas with its clean lines and weather-resistant finish.",
    price: 24999,
    category: "furniture",
    subcategory: "sofas-seating",
    brand: "HAY",
    image: "/Palissade -Lounge Sofa/AA613-A800_Palissade-Lounge-Sofa-cream-white.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/palissade-lounge-sofa",
    staticImage: "/Palissade -Lounge Sofa/AA613-A800_Palissade-Lounge-Sofa-cream-white.jpg",
    staticBrand: "HAY",
    variants: [
      {
        name: "Cream White",
        image: "/Palissade -Lounge Sofa/AA613-A800_Palissade-Lounge-Sofa-cream-white.jpg",
        color: "Cream White"
      },
      {
        name: "Sky Grey",
        image: "/Palissade -Lounge Sofa/AA617-A221_Palissade-Lounge-Sofa-sky-grey.jpg",
        color: "Sky Grey"
      },
      {
        name: "Hot Galvanised",
        image: "/Palissade -Lounge Sofa/AA617-A234_Palissade-Lounge-Sofa-hot-galvanised.jpg",
        color: "Hot Galvanised"
      },
      {
        name: "Iron Red",
        image: "/Palissade -Lounge Sofa/iron red.jpg",
        color: "Iron Red"
      },
      {
        name: "Olive",
        image: "/Palissade -Lounge Sofa/olive.jpg",
        color: "Olive"
      },
      {
        name: "Anthracite",
        image: "/Palissade -Lounge Sofa/Palissade-Lounge-Sofa-anthracite_Palissade-Lounge-Sofa-Seat-Cushion-anthracite.jpg",
        color: "Anthracite"
      }
    ],
    features: [
      "Weather-resistant steel construction",
      "Contemporary minimalist design",
      "Suitable for outdoor use",
      "Optional cushions available",
      "Stackable design for easy storage",
      "UV-resistant powder coating",
      "Modern Scandinavian aesthetic"
    ],
    specifications: [
      { label: "Material", value: "Powder-coated steel" },
      { label: "Dimensions", value: "W: 139cm, D: 80cm, H: 80cm" },
      { label: "Weight", value: "18 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" },
      { label: "Assembly", value: "Minimal assembly required" },
      { label: "Warranty", value: "2 years manufacturer warranty" }
    ],
    lifestyleImages: []
  },
  {
    _id: "palissade-armchair",
    id: "palissade-armchair",
    name: "Palissade Armchair",
    description: "Contemporary outdoor armchair with distinctive slatted design. Perfect for outdoor dining and relaxation with its comfortable proportions and weather-resistant construction.",
    price: 4999,
    category: "furniture",
    subcategory: "dining-chairs",
    brand: "HAY",
    image: "/HAY/Palissade-Armchair/Palissade Armchair NOK  4,999  Color -  Anthracite.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/palissade-armchair",
    staticImage: "/HAY/Palissade-Armchair/Palissade Armchair NOK  4,999  Color -  Anthracite.jpg",
    staticBrand: "HAY",
    variants: [
      {
        name: "Anthracite",
        image: "/HAY/Palissade-Armchair/Palissade Armchair NOK  4,999  Color -  Anthracite.jpg",
        color: "Anthracite"
      },
      {
        name: "Cream White",
        image: "/HAY/Palissade-Armchair/Palissade Armchair NOK  4,999  Color -  Cream white.jpg",
        color: "Cream White"
      },
      {
        name: "Iron Red",
        image: "/HAY/Palissade-Armchair/Palissade Armchair NOK  4,999  Color -  Iron Red.jpg",
        color: "Iron Red"
      },
      {
        name: "Olive",
        image: "/HAY/Palissade-Armchair/Palissade Armchair NOK  4,999  Color -  Olive.jpg",
        color: "Olive"
      },
      {
        name: "Sky Grey",
        image: "/HAY/Palissade-Armchair/Palissade Armchair kr 4 999  Farge - Sky grey.jpg",
        color: "Sky Grey"
      },
      {
        name: "Hot Galvanized Steel",
        image: "/HAY/Palissade-Armchair/Palissade Armchair NOK  7,099  Color -  Hot galvanized steel.jpg",
        color: "Hot Galvanized Steel"
      }
    ],
    features: [
      "Contemporary outdoor design",
      "Weather-resistant powder-coated steel",
      "Comfortable armchair proportions",
      "Available in 6 colors",
      "Stackable design",
      "Easy to clean and maintain"
    ],
    specifications: [
      { label: "Material", value: "Powder-coated galvanized steel" },
      { label: "Dimensions", value: "W: 59.5cm, D: 70cm, H: 80.5cm" },
      { label: "Seat Height", value: "44cm" },
      { label: "Weight", value: "8 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: []
  },
  {
    _id: "palissade-dining-chair",
    id: "palissade-dining-chair",
    name: "Palissade Dining Chair",
    description: "Elegant outdoor dining chair with armrests and distinctive slatted design. Perfect for outdoor dining spaces with its comfortable seating and modern aesthetic.",
    price: 6049,
    category: "furniture",
    subcategory: "dining-chairs",
    brand: "HAY",
    image: "/HAY/Palissade-Dining-Chair/Palissade Dining Chair NOK  6,049  Color -  Anthracite.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/palissade-dining-chair",
    staticImage: "/HAY/Palissade-Dining-Chair/Palissade Dining Chair NOK  6,049  Color -  Anthracite.jpg",
    staticBrand: "HAY",
    variants: [
      {
        name: "Anthracite",
        image: "/HAY/Palissade-Dining-Chair/Palissade Dining Chair NOK  6,049  Color -  Anthracite.jpg",
        color: "Anthracite"
      },
      {
        name: "Cream White",
        image: "/HAY/Palissade-Dining-Chair/Palissade Dining Chair NOK  6,049  Color -  Cream white.jpg",
        color: "Cream White"
      },
      {
        name: "Iron Red",
        image: "/HAY/Palissade-Dining-Chair/Palissade Dining Chair NOK  6,049  Color -  Iron Red.jpg",
        color: "Iron Red"
      },
      {
        name: "Sky Grey",
        image: "/HAY/Palissade-Dining-Chair/Palissade Dining Chair NOK  6,049  Color -  Sky grey.jpg",
        color: "Sky Grey"
      },
      {
        name: "Olive",
        image: "/HAY/Palissade-Dining-Chair/Palissade Dining Armchair kr 6 049  Farge - Olive.jpg",
        color: "Olive"
      },
      {
        name: "Hot Galvanized Steel",
        image: "/HAY/Palissade-Dining-Chair/Palissade Dining Chair NOK  10,049  Color -  Hot galvanized steel.jpg",
        color: "Hot Galvanized Steel"
      }
    ],
    features: [
      "Elegant dining chair design",
      "Weather-resistant powder-coated steel",
      "Comfortable armrests",
      "Available in 6 colors",
      "Stackable for easy storage",
      "Perfect for outdoor dining"
    ],
    specifications: [
      { label: "Material", value: "Powder-coated galvanized steel" },
      { label: "Dimensions", value: "W: 59.5cm, D: 70cm, H: 80.5cm" },
      { label: "Seat Height", value: "44cm" },
      { label: "Weight", value: "9 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: []
  },
  {
    _id: "palissade-bench-l120",
    id: "palissade-bench-l120",
    name: "Palissade Bench L-120",
    description: "Contemporary outdoor bench with clean lines and distinctive slatted design. Perfect for gardens, patios, and outdoor seating areas.",
    price: 6549,
    category: "furniture",
    subcategory: "benches",
    brand: "HAY",
    image: "/HAY/Palissade-Bench-L-120/Palissade Bench L-120 NOK  6,549  Color -  Anthracite.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/palissade-bench-l120",
    staticImage: "/HAY/Palissade-Bench-L-120/Palissade Bench L-120 NOK  6,549  Color -  Anthracite.jpg",
    staticBrand: "HAY",
    variants: [
      {
        name: "Anthracite",
        image: "/HAY/Palissade-Bench-L-120/Palissade Bench L-120 NOK  6,549  Color -  Anthracite.jpg",
        color: "Anthracite"
      },
      {
        name: "Olive",
        image: "/HAY/Palissade-Bench-L-120/Palissade Bench L-120 NOK  6,549  Color -  Olive.jpg",
        color: "Olive"
      },
      {
        name: "Sky Grey",
        image: "/HAY/Palissade-Bench-L-120/Palissade Bench L-120 NOK  6,549  Color -  Sky grey.jpg",
        color: "Sky Grey"
      },
      {
        name: "Cream White",
        image: "/HAY/Palissade-Bench-L-120/Palissade Sittebenk L-120 kr 6 549  Farge - Cream white.jpg",
        color: "Cream White"
      },
      {
        name: "Iron Red",
        image: "/HAY/Palissade-Bench-L-120/Palissade Sittebenk L-120 kr 6 549  Farge - Iron Red.jpg",
        color: "Iron Red"
      },
      {
        name: "Hot Galvanised Steel",
        image: "/HAY/Palissade-Bench-L-120/Palissade Sittebenk L-120 kr 8 649  Farge - Hot galvanised steel.jpg",
        color: "Hot Galvanised Steel"
      }
    ],
    features: [
      "Contemporary bench design",
      "Weather-resistant powder-coated steel",
      "Comfortable seating for 2-3 people",
      "Available in 6 colors",
      "Durable outdoor construction",
      "Easy to clean and maintain"
    ],
    specifications: [
      { label: "Material", value: "Powder-coated galvanized steel" },
      { label: "Dimensions", value: "L: 120cm, W: 42.5cm, H: 82.5cm" },
      { label: "Seating Capacity", value: "2-3 people" },
      { label: "Weight", value: "12 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: []
  },
  {
    _id: "palissade-lounge-chair",
    id: "palissade-lounge-chair",
    name: "Palissade Lounge Chair",
    description: "Comfortable outdoor lounge chair with modern design and weather-resistant construction. Perfect for relaxation in outdoor spaces.",
    price: 8499,
    category: "furniture",
    subcategory: "lounge-seating",
    brand: "HAY",
    image: "/HAY/Palissade-Lounge-Chair/Palissade Lounge Chair High NOK  8,499  Color -  Anthracite.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/palissade-lounge-chair",
    staticImage: "/HAY/Palissade-Lounge-Chair/Palissade Lounge Chair High NOK  8,499  Color -  Anthracite.jpg",
    staticBrand: "HAY",
    variants: [
      {
        name: "Anthracite",
        image: "/HAY/Palissade-Lounge-Chair/Palissade Lounge Chair High NOK  8,499  Color -  Anthracite.jpg",
        color: "Anthracite"
      },
      {
        name: "Cream White",
        image: "/HAY/Palissade-Lounge-Chair/Palissade Lounge Chair High NOK  8,499  Color -  Cream white.jpg",
        color: "Cream White"
      },
      {
        name: "Iron Red",
        image: "/HAY/Palissade-Lounge-Chair/Palissade Lounge Chair High NOK  8,499  Color -  Iron Red.jpg",
        color: "Iron Red"
      },
      {
        name: "Olive",
        image: "/HAY/Palissade-Lounge-Chair/Palissade Lounge Chair High NOK  8,499  Color -  Olive.jpg",
        color: "Olive"
      },
      {
        name: "Sky Grey",
        image: "/HAY/Palissade-Lounge-Chair/Palissade Lounge Chair High NOK  8,499  Color -  Sky grey.jpg",
        color: "Sky Grey"
      }
    ],
    features: [
      "Comfortable lounge design",
      "Weather-resistant powder-coated steel",
      "Perfect for outdoor relaxation",
      "Available in 5 colors",
      "Durable construction",
      "Easy to clean and maintain"
    ],
    specifications: [
      { label: "Material", value: "Powder-coated galvanized steel" },
      { label: "Dimensions", value: "W: 73.5cm, D: 80.5cm, H: 80cm" },
      { label: "Seat Height", value: "37cm" },
      { label: "Weight", value: "12 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: []
  },
  {
    _id: "palissade-cone-table-60",
    id: "palissade-cone-table-60",
    name: "Palissade Cone Table Ø-60",
    description: "Round outdoor table with distinctive cone base and slatted top. Perfect for cafés, patios, and outdoor dining areas.",
    price: 6549,
    category: "furniture",
    subcategory: "dining-tables",
    brand: "HAY",
    image: "/HAY/Palissade-Cone-Table-Ø-60/Palissade Cone Table Ø-60 NOK  6,549  Color -  Anthracite.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/palissade-cone-table-60",
    staticImage: "/HAY/Palissade-Cone-Table-Ø-60/Palissade Cone Table Ø-60 NOK  6,549  Color -  Anthracite.jpg",
    staticBrand: "HAY",
    variants: [
      {
        name: "Anthracite",
        image: "/HAY/Palissade-Cone-Table-Ø-60/Palissade Cone Table Ø-60 NOK  6,549  Color -  Anthracite.jpg",
        color: "Anthracite"
      },
      {
        name: "Cream White",
        image: "/HAY/Palissade-Cone-Table-Ø-60/Palissade Cone Table Ø-60 NOK  6,549  Color -  Cream white.jpg",
        color: "Cream White"
      },
      {
        name: "Iron Red",
        image: "/HAY/Palissade-Cone-Table-Ø-60/Palissade Cone Table Ø-60 NOK  6,549  Color -  Iron Red.jpg",
        color: "Iron Red"
      },
      {
        name: "Olive",
        image: "/HAY/Palissade-Cone-Table-Ø-60/Palissade Cone Table Ø-60 NOK  6,549  Color -  Olive.jpg",
        color: "Olive"
      },
      {
        name: "Sky Grey",
        image: "/HAY/Palissade-Cone-Table-Ø-60/Palissade Cone Table Ø-60 NOK  6,549  Color -  Sky grey.jpg",
        color: "Sky Grey"
      }
    ],
    features: [
      "Round dining table design",
      "Weather-resistant powder-coated steel",
      "Distinctive cone base",
      "Available in 5 colors",
      "Perfect for outdoor dining",
      "Easy to clean and maintain"
    ],
    specifications: [
      { label: "Material", value: "Powder-coated galvanized steel" },
      { label: "Dimensions", value: "Ø: 60cm, H: 74cm" },
      { label: "Shape", value: "Round" },
      { label: "Weight", value: "15 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: []
  },
  {
    _id: "palissade-low-table",
    id: "palissade-low-table",
    name: "Palissade Low Table",
    description: "Low outdoor coffee table perfect for lounge areas and outdoor relaxation spaces. Features the distinctive Palissade slatted design.",
    price: 7799,
    category: "furniture",
    subcategory: "coffee-tables",
    brand: "HAY",
    image: "/HAY/Palissade-Low-Table/Palissade Low Table NOK  7,799  Color -  Anthracite.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/palissade-low-table",
    staticImage: "/HAY/Palissade-Low-Table/Palissade Low Table NOK  7,799  Color -  Anthracite.jpg",
    staticBrand: "HAY",
    variants: [
      {
        name: "Anthracite",
        image: "/HAY/Palissade-Low-Table/Palissade Low Table NOK  7,799  Color -  Anthracite.jpg",
        color: "Anthracite"
      },
      {
        name: "Cream White",
        image: "/HAY/Palissade-Low-Table/Palissade Low Table NOK  7,799  Color -  Cream white.jpg",
        color: "Cream White"
      },
      {
        name: "Iron Red",
        image: "/HAY/Palissade-Low-Table/Palissade Low Table NOK  7,799  Color -  Iron Red.jpg",
        color: "Iron Red"
      },
      {
        name: "Sky Grey",
        image: "/HAY/Palissade-Low-Table/Palissade Low Table NOK  7,799  Color -  Sky grey.jpg",
        color: "Sky Grey"
      },
      {
        name: "Hot Galvanized Steel",
        image: "/HAY/Palissade-Low-Table/Palissade Low Table NOK  11,799  Color -  Hot galvanized steel.jpg",
        color: "Hot Galvanized Steel"
      }
    ],
    features: [
      "Low coffee table design",
      "Weather-resistant powder-coated steel",
      "Perfect for lounge areas",
      "Available in 5 colors",
      "Durable outdoor construction",
      "Easy to clean and maintain"
    ],
    specifications: [
      { label: "Material", value: "Powder-coated galvanized steel" },
      { label: "Dimensions", value: "L: 90cm, W: 90cm, H: 40cm" },
      { label: "Shape", value: "Square" },
      { label: "Weight", value: "18 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: []
  },
  {
    _id: "palisade-bar-stool",
    id: "palisade-bar-stool",
    name: "Palisade Bar Stool",
    description: "Contemporary outdoor bar stool with distinctive slatted design. Perfect for outdoor bars, high tables, and modern patio spaces.",
    price: 4999,
    category: "furniture",
    subcategory: "stools",
    brand: "HAY",
    image: "/HAY/Palisade-Bar-Stool/Palisade Bar Stool NOK  4,999  Color -  Anthracite.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/palisade-bar-stool",
    staticImage: "/HAY/Palisade-Bar-Stool/Palisade Bar Stool NOK  4,999  Color -  Anthracite.jpg",
    staticBrand: "HAY",
    variants: [
      {
        name: "Anthracite",
        image: "/HAY/Palisade-Bar-Stool/Palisade Bar Stool NOK  4,999  Color -  Anthracite.jpg",
        color: "Anthracite"
      },
      {
        name: "Cream White",
        image: "/HAY/Palisade-Bar-Stool/Palisade Bar Stool NOK  4,999  Color -  Cream white.jpg",
        color: "Cream White"
      },
      {
        name: "Iron Red",
        image: "/HAY/Palisade-Bar-Stool/Palisade Bar Stool NOK  4,999  Color -  Iron Red.jpg",
        color: "Iron Red"
      },
      {
        name: "Olive",
        image: "/HAY/Palisade-Bar-Stool/Palisade Bar Stool NOK  4,999  Color -  Olive.jpg",
        color: "Olive"
      },
      {
        name: "Sky Grey",
        image: "/HAY/Palisade-Bar-Stool/Palisade Bar Stool NOK  4,999  Color -  Sky grey.jpg",
        color: "Sky Grey"
      }
    ],
    features: [
      "Contemporary bar stool design",
      "Weather-resistant powder-coated steel",
      "Perfect for outdoor bars",
      "Available in 5 colors",
      "Stackable for easy storage",
      "Easy to clean and maintain"
    ],
    specifications: [
      { label: "Material", value: "Powder-coated galvanized steel" },
      { label: "Dimensions", value: "W: 42.5cm, D: 42.5cm, H: 106cm" },
      { label: "Seat Height", value: "75cm" },
      { label: "Weight", value: "6 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: []
  },
  // Kartell Outdoor Lighting
  {
    _id: "kartell-kabuki-floor-lamp",
    id: "kartell-kabuki-floor-lamp",
    name: "Kabuki Floor Lamp",
    description: "Contemporary outdoor floor lamp with distinctive design and weather-resistant construction. Perfect for illuminating outdoor spaces with style and functionality.",
    price: 8999,
    category: "lighting",
    subcategory: "floor-lamps",
    brand: "Kartell",
    image: "/kartell-kabui floor indoor lamp/crystal.webp",
    staticProduct: true,
    staticHref: "/utendors/product/kartell-kabuki-floor-lamp",
    staticImage: "/kartell-kabui floor indoor lamp/crystal.webp",
    staticBrand: "Kartell",
    variants: [
      {
        name: "Crystal",
        image: "/kartell-kabui floor indoor lamp/crystal.webp",
        color: "Crystal"
      },
      {
        name: "White",
        image: "/kartell-kabui floor indoor lamp/white.webp",
        color: "White"
      },
      {
        name: "Black",
        image: "/kartell-kabui floor indoor lamp/black.webp",
        color: "Black"
      },
      {
        name: "Blue",
        image: "/kartell-kabui floor indoor lamp/blue.webp",
        color: "Blue"
      },
      {
        name: "Green",
        image: "/kartell-kabui floor indoor lamp/green.webp",
        color: "Green"
      }
    ],
    features: [
      "Contemporary outdoor lighting design",
      "Weather-resistant construction",
      "Available in 5 colors",
      "Energy-efficient LED lighting",
      "Distinctive Kabuki aesthetic",
      "Suitable for outdoor use"
    ],
    specifications: [
      { label: "Material", value: "Weather-resistant polycarbonate" },
      { label: "Dimensions", value: "H: 165cm, Ø: 40cm" },
      { label: "Light Source", value: "LED compatible" },
      { label: "Weight", value: "6 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: [
      "/kartell-kabui floor indoor lamp/lifestyle/kabuki_floor_outdoor_01.jpg"
    ]
  },
  {
    _id: "flos-ktribe-3-outdoor-floor-lamp",
    id: "flos-ktribe-3-outdoor-floor-lamp",
    name: "KTribe 3 Outdoor Floor Lamp",
    description: "Premium outdoor floor lamp from FLOS with distinctive tribal-inspired design. Features weather-resistant construction and sophisticated lighting for elegant outdoor spaces.",
    price: 33250,
    category: "lighting",
    subcategory: "floor-lamps",
    brand: "FLOS",
    image: "/FLOS/KTribe-3-Outdoor-floor-lamp/KTribe 3 Outdoor floor lamp NOK  33,250  Color -  Panama.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/flos-ktribe-3-outdoor-floor-lamp",
    staticImage: "/FLOS/KTribe-3-Outdoor-floor-lamp/KTribe 3 Outdoor floor lamp NOK  33,250  Color -  Panama.jpg",
    staticBrand: "FLOS",
    variants: [
      {
        name: "Panama",
        image: "/FLOS/KTribe-3-Outdoor-floor-lamp/KTribe 3 Outdoor floor lamp NOK  33,250  Color -  Panama.jpg",
        color: "Panama"
      },
      {
        name: "Green Wall",
        image: "/FLOS/KTribe-3-Outdoor-floor-lamp/KTribe 3 Outdoor floor lamp NOK  33,250  Color -  Green wall.jpg",
        color: "Green Wall"
      }
    ],
    features: [
      "Premium FLOS design and quality",
      "Weather-resistant outdoor construction",
      "Distinctive tribal-inspired aesthetic",
      "Available in 2 sophisticated colors",
      "High-quality materials and finishes",
      "Professional outdoor lighting solution"
    ],
    specifications: [
      { label: "Material", value: "Weather-resistant aluminum and fabric" },
      { label: "Dimensions", value: "H: 183cm, Ø: 70cm" },
      { label: "Light Source", value: "E27 LED compatible" },
      { label: "Weight", value: "12 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: [
      "/FLOS/KTribe-3-Outdoor-floor-lamp/lifestyle/ktribe_outdoor_lifestyle_01.jpg"
    ]
  },
  // Montana Outdoor Collection
  {
    _id: "montana-panton-one-dining-chair-outdoor",
    id: "montana-panton-one-dining-chair-outdoor",
    name: "Panton One Dining Chair Outdoor",
    description: "Iconic Panton One dining chair designed for outdoor use. Features weather-resistant construction with the classic Panton design aesthetic, available in 8 distinctive colors.",
    price: 5360,
    category: "furniture",
    subcategory: "dining-chairs",
    brand: "Montana",
    image: "/Montana/Panton-One-dining-chair-Outdoor/Panton One dining chair Outdoor Montana NOK  5,360  Color -  Carmen.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/montana-panton-one-dining-chair-outdoor",
    staticImage: "/Montana/Panton-One-dining-chair-Outdoor/Panton One dining chair Outdoor Montana NOK  5,360  Color -  Carmen.jpg",
    staticBrand: "Montana",
    variants: [
      {
        name: "Carmen",
        image: "/Montana/Panton-One-dining-chair-Outdoor/Panton One dining chair Outdoor Montana NOK  5,360  Color -  Carmen.jpg",
        color: "Carmen"
      },
      {
        name: "Clark",
        image: "/Montana/Panton-One-dining-chair-Outdoor/Panton One dining chair Outdoor Montana NOK  5,360  Color -  Clark.jpg",
        color: "Clark"
      },
      {
        name: "Duke",
        image: "/Montana/Panton-One-dining-chair-Outdoor/Panton One dining chair Outdoor Montana NOK  5,360  Color -  Duke.jpg",
        color: "Duke"
      },
      {
        name: "Holmes",
        image: "/Montana/Panton-One-dining-chair-Outdoor/Panton One dining chair Outdoor Montana NOK  5,360  Color -  Holmes.jpg",
        color: "Holmes"
      },
      {
        name: "Marcel",
        image: "/Montana/Panton-One-dining-chair-Outdoor/Panton One dining chair Outdoor Montana NOK  5,360  Color -  Marcel.jpg",
        color: "Marcel"
      },
      {
        name: "Marylinn",
        image: "/Montana/Panton-One-dining-chair-Outdoor/Panton One dining chair Outdoor Montana NOK  5,360  Color -  Marylinn.jpg",
        color: "Marylinn"
      },
      {
        name: "Scarlett",
        image: "/Montana/Panton-One-dining-chair-Outdoor/Panton One dining chair Outdoor Montana NOK  5,360  Color -  Scarlett.jpg",
        color: "Scarlett"
      },
      {
        name: "Vincent",
        image: "/Montana/Panton-One-dining-chair-Outdoor/Panton One dining chair Outdoor Montana NOK  5,360  Color -  Vincent.jpg",
        color: "Vincent"
      }
    ],
    features: [
      "Iconic Panton One design for outdoor use",
      "Weather-resistant construction",
      "Available in 8 distinctive colors",
      "Stackable design for easy storage",
      "UV-resistant materials",
      "Contemporary Scandinavian aesthetic"
    ],
    specifications: [
      { label: "Material", value: "Weather-resistant polypropylene" },
      { label: "Dimensions", value: "W: 50cm, D: 55cm, H: 80cm" },
      { label: "Seat Height", value: "46cm" },
      { label: "Weight", value: "4.2 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: [
      "/Montana/Panton-One-dining-chair-Outdoor/lifestyle/panton_one_outdoor_lifestyle_01.jpg"
    ]
  },
  // England Collection (Drachmann)
  {
    _id: "england-bench",
    id: "england-bench",
    name: "England Bench",
    description: "Classic outdoor bench with timeless design and superior craftsmanship. Perfect for gardens, patios, and outdoor spaces requiring elegant and durable seating. Available in two sizes to suit different spaces.",
    price: 21499,
    category: "furniture",
    subcategory: "benches",
    brand: "Fritz Hansen",
    image: "/Fritz Hansen/England bench/England bench NOK  21,499  Size -  L-152.png",
    staticProduct: true,
    staticHref: "/utendors/product/england-bench",
    staticImage: "/Fritz Hansen/England bench/England bench NOK  21,499  Size -  L-152.png",
    staticBrand: "Fritz Hansen",
    variants: [
      {
        name: "152cm Length",
        image: "/Fritz Hansen/England bench/England bench NOK  21,499  Size -  L-152.png",
        color: "152cm"
      },
      {
        name: "180cm Length",
        image: "/Fritz Hansen/England bench/England bench NOK  23,999  Size -  L-180.png",
        color: "180cm"
      }
    ],
    features: [
      "Classic Scandinavian design",
      "Weather-resistant teak construction",
      "Available in two sizes",
      "Comfortable seating for 2-4 people",
      "Develops beautiful patina over time",
      "Durable outdoor construction",
      "Timeless aesthetic"
    ],
    specifications: [
      { label: "Material", value: "FSC-certified teak wood" },
      { label: "Dimensions (152cm)", value: "L: 152cm, W: 45cm, H: 45cm" },
      { label: "Dimensions (180cm)", value: "L: 180cm, W: 45cm, H: 45cm" },
      { label: "Seating Capacity", value: "2-4 people depending on size" },
      { label: "Weight", value: "22-28 kg depending on size" },
      { label: "Care", value: "Clean with mild soap and water, teak oil recommended" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: [
      "/Fritz Hansen/England bench/lifestyle/England-Bench152_01.jpg",
      "/Fritz Hansen/England bench/lifestyle/England-Bench180_02.jpg"
    ]
  },
  // Skagen Collection
  {
    _id: "skagen-bench",
    id: "skagen-bench",
    name: "Skagen Bench",
    description: "Modern outdoor bench with clean lines and durable teak construction. Perfect for contemporary outdoor spaces, offering comfortable seating with timeless Scandinavian design.",
    price: 14999,
    category: "furniture",
    subcategory: "benches",
    brand: "Fritz Hansen",
    image: "/Fritz Hansen/Skagen-bench/Skagen bench L-150 NOK  14,999.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/skagen-bench",
    staticImage: "/Fritz Hansen/Skagen-bench/Skagen bench L-150 NOK  14,999.jpg",
    staticBrand: "Fritz Hansen",
    features: [
      "Modern Scandinavian design",
      "Weather-resistant teak construction",
      "Comfortable seating for 2-3 people",
      "Develops beautiful patina over time",
      "Durable outdoor construction",
      "Contemporary aesthetic"
    ],
    specifications: [
      { label: "Material", value: "FSC-certified teak wood" },
      { label: "Dimensions", value: "L: 150cm, W: 45cm, H: 45cm" },
      { label: "Seating Capacity", value: "2-3 people" },
      { label: "Weight", value: "20 kg" },
      { label: "Care", value: "Clean with mild soap and water, teak oil recommended" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: []
  },
  {
    _id: "skagen-table",
    id: "skagen-table",
    name: "Skagen Table",
    description: "Contemporary outdoor dining table with sleek design and durable teak construction. Perfect for outdoor dining with its spacious surface and weather-resistant finish.",
    price: 16999,
    category: "furniture",
    subcategory: "dining-tables",
    brand: "Fritz Hansen",
    image: "/Fritz Hansen/Skagen-table /Skagen table 140×78 NOK  16,999.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/skagen-table",
    staticImage: "/Fritz Hansen/Skagen-table /Skagen table 140×78 NOK  16,999.jpg",
    staticBrand: "Fritz Hansen",
    features: [
      "Contemporary Scandinavian design",
      "Weather-resistant teak construction",
      "Spacious dining surface for 4-6 people",
      "Develops beautiful patina over time",
      "Durable outdoor construction",
      "Matches Skagen seating collection"
    ],
    specifications: [
      { label: "Material", value: "FSC-certified teak wood" },
      { label: "Dimensions", value: "L: 140cm, W: 78cm, H: 74cm" },
      { label: "Seating Capacity", value: "4-6 people" },
      { label: "Weight", value: "25 kg" },
      { label: "Care", value: "Clean with mild soap and water, teak oil recommended" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: []
  },
  // Regatta Collection
  {
    _id: "regatta-lounge-bench",
    id: "regatta-lounge-bench",
    name: "Regatta Lounge Bench",
    description: "Elegant outdoor lounge bench with sophisticated design and premium materials. Perfect for creating comfortable outdoor seating areas with its modern aesthetic and durable construction.",
    price: 18999,
    category: "furniture",
    subcategory: "benches",
    brand: "Fritz Hansen",
    image: "/Fritz Hansen/Regatta-Bench/S1508650-Regatta-Lounge-Bench.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/regatta-lounge-bench",
    staticImage: "/Fritz Hansen/Regatta-Bench/S1508650-Regatta-Lounge-Bench.jpg",
    staticBrand: "Fritz Hansen",
    features: [
      "Sophisticated lounge design",
      "Weather-resistant construction",
      "Comfortable seating for 2 people",
      "Premium outdoor materials",
      "Modern aesthetic",
      "Matches Regatta collection"
    ],
    specifications: [
      { label: "Material", value: "Weather-resistant materials" },
      { label: "Dimensions", value: "L: 120cm, W: 60cm, H: 75cm" },
      { label: "Seating Capacity", value: "2 people" },
      { label: "Weight", value: "15 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: [
      "/Fritz Hansen/Regatta-Bench/lifestyle/Regatta_Cam01_Main_v06.jpg",
      "/Fritz Hansen/Regatta-Bench/lifestyle/Regatta-2-seater.jpg"
    ]
  },
  {
    _id: "regatta-lounge-stool",
    id: "regatta-lounge-stool",
    name: "Regatta Lounge Stool",
    description: "Versatile outdoor lounge stool with modern design and premium construction. Perfect as additional seating or as a side table for outdoor lounge areas.",
    price: 8999,
    category: "furniture",
    subcategory: "stools",
    brand: "Fritz Hansen",
    image: "/Fritz Hansen/Regatta-stool/S1508700-Regatta-Lounge-Stool.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/regatta-lounge-stool",
    staticImage: "/Fritz Hansen/Regatta-stool/S1508700-Regatta-Lounge-Stool.jpg",
    staticBrand: "Fritz Hansen",
    features: [
      "Versatile lounge stool design",
      "Weather-resistant construction",
      "Can be used as seating or side table",
      "Premium outdoor materials",
      "Modern aesthetic",
      "Matches Regatta collection"
    ],
    specifications: [
      { label: "Material", value: "Weather-resistant materials" },
      { label: "Dimensions", value: "W: 45cm, D: 45cm, H: 45cm" },
      { label: "Weight", value: "8 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" },
      { label: "Multi-functional", value: "Seating or side table" }
    ],
    lifestyleImages: [
      "/Fritz Hansen/Regatta-stool/lifestyle/Regatta_Cam01_Main_v06.jpg",
      "/Fritz Hansen/Regatta-stool/lifestyle/Regatta-Set.jpg"
    ]
  },
  {
    _id: "regatta-lounge-table",
    id: "regatta-lounge-table",
    name: "Regatta Lounge Table Ø60",
    description: "Elegant round outdoor lounge table with sophisticated design. Perfect for outdoor lounge areas, providing a stylish surface for drinks and accessories.",
    price: 12999,
    category: "furniture",
    subcategory: "coffee-tables",
    brand: "Fritz Hansen",
    image: "/Fritz Hansen/Regatta-table-Ø-60/S1508600-Regatta-Lounge-Table.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/regatta-lounge-table",
    staticImage: "/Fritz Hansen/Regatta-table-Ø-60/S1508600-Regatta-Lounge-Table.jpg",
    staticBrand: "Fritz Hansen",
    features: [
      "Round lounge table design",
      "Weather-resistant construction",
      "Perfect for outdoor lounge areas",
      "Premium outdoor materials",
      "Modern aesthetic",
      "Matches Regatta collection"
    ],
    specifications: [
      { label: "Material", value: "Weather-resistant materials" },
      { label: "Dimensions", value: "Ø: 60cm, H: 45cm" },
      { label: "Shape", value: "Round" },
      { label: "Weight", value: "12 kg" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: []
  },
  // Drachmann Collection
  {
    _id: "drachmann-chair",
    id: "drachmann-chair",
    name: "Drachmann Chair",
    description: "Classic outdoor dining chair with timeless design and superior craftsmanship. Perfect for outdoor dining with its comfortable design and durable teak construction.",
    price: 9699,
    category: "furniture",
    subcategory: "dining-chairs",
    brand: "Fritz Hansen",
    image: "/Fritz Hansen/Drachmann chair /Drachmann chair NOK  9,699.webp",
    staticProduct: true,
    staticHref: "/utendors/product/drachmann-chair",
    staticImage: "/Fritz Hansen/Drachmann chair /Drachmann chair NOK  9,699.webp",
    staticBrand: "Fritz Hansen",
    features: [
      "Classic Scandinavian design",
      "Weather-resistant teak construction",
      "Comfortable dining height",
      "Develops beautiful patina over time",
      "Durable outdoor construction",
      "Timeless aesthetic"
    ],
    specifications: [
      { label: "Material", value: "FSC-certified teak wood" },
      { label: "Dimensions", value: "W: 50cm, D: 55cm, H: 82cm" },
      { label: "Seat Height", value: "45cm" },
      { label: "Weight", value: "6 kg" },
      { label: "Care", value: "Clean with mild soap and water, teak oil recommended" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: [
      "/Fritz Hansen/Drachmann chair /lifestyle/10419384_2.webp",
      "/Fritz Hansen/Drachmann chair /lifestyle/10419384_3.webp"
    ]
  },
  {
    _id: "drachmann-dining-table",
    id: "drachmann-dining-table",
    name: "Drachmann Dining Table",
    description: "Classic outdoor dining table with timeless design and superior craftsmanship. Available in multiple sizes to accommodate different outdoor dining needs.",
    price: 20499,
    category: "furniture",
    subcategory: "dining-tables",
    brand: "Fritz Hansen",
    image: "/Fritz Hansen/Drachmann-dining-table/Drachmann dining table NOK  20,499  Size -  156x86.webp",
    staticProduct: true,
    staticHref: "/utendors/product/drachmann-dining-table",
    staticImage: "/Fritz Hansen/Drachmann-dining-table/Drachmann dining table NOK  20,499  Size -  156x86.webp",
    staticBrand: "Fritz Hansen",
    variants: [
      {
        name: "86x86cm",
        image: "/Fritz Hansen/Drachmann-dining-table/Drachmann spisebord kr 13 499  Størrelse - 86x86.webp",
        color: "86x86cm"
      },
      {
        name: "156x86cm",
        image: "/Fritz Hansen/Drachmann-dining-table/Drachmann dining table NOK  20,499  Size -  156x86.webp",
        color: "156x86cm"
      },
      {
        name: "190x86cm",
        image: "/Fritz Hansen/Drachmann-dining-table/Drachmann dining table NOK  28,499  Size -  190x86.webp",
        color: "190x86cm"
      }
    ],
    features: [
      "Classic Scandinavian design",
      "Weather-resistant teak construction",
      "Available in three sizes",
      "Develops beautiful patina over time",
      "Durable outdoor construction",
      "Timeless aesthetic"
    ],
    specifications: [
      { label: "Material", value: "FSC-certified teak wood" },
      { label: "Dimensions (86x86)", value: "L: 86cm, W: 86cm, H: 74cm" },
      { label: "Dimensions (156x86)", value: "L: 156cm, W: 86cm, H: 74cm" },
      { label: "Dimensions (190x86)", value: "L: 190cm, W: 86cm, H: 74cm" },
      { label: "Seating Capacity", value: "2-8 people depending on size" },
      { label: "Care", value: "Clean with mild soap and water, teak oil recommended" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: [
      "/Fritz Hansen/Drachmann-dining-table/lifestyle/10419392r_3.webp",
      "/Fritz Hansen/Drachmann-dining-table/lifestyle/s1042015_1.jpg"
    ]
  },
  // Fionia Collection
  {
    _id: "fionia-stool",
    id: "fionia-stool",
    name: "Fionia Stool",
    description: "Elegant outdoor stool with natural wood construction. Available in oak and teak finishes, perfect for additional seating or as a side table in outdoor spaces.",
    price: 4999,
    category: "furniture",
    subcategory: "stools",
    brand: "Fritz Hansen",
    image: "/Fritz Hansen/Fionia/Color -  Untreated oak.png",
    staticProduct: true,
    staticHref: "/utendors/product/fionia-stool",
    staticImage: "/Fritz Hansen/Fionia/Color -  Untreated oak.png",
    staticBrand: "Fritz Hansen",
    variants: [
      {
        name: "Untreated Oak",
        image: "/Fritz Hansen/Fionia/Color -  Untreated oak.png",
        color: "Untreated Oak"
      },
      {
        name: "Untreated Teak",
        image: "/Fritz Hansen/Fionia/Color -  Untreated teak.png",
        color: "Untreated Teak"
      }
    ],
    features: [
      "Natural wood construction",
      "Available in oak and teak",
      "Versatile use as stool or side table",
      "Develops beautiful patina over time",
      "Durable outdoor construction",
      "Minimalist design"
    ],
    specifications: [
      { label: "Material", value: "FSC-certified oak or teak wood" },
      { label: "Dimensions", value: "W: 35cm, D: 35cm, H: 45cm" },
      { label: "Weight", value: "4 kg" },
      { label: "Care", value: "Clean with mild soap and water, wood oil recommended" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" },
      { label: "Multi-functional", value: "Seating or side table" }
    ],
    lifestyleImages: [
      "/Fritz Hansen/Fionia/Lifestyle/abt_714277583385747069MjAzNDIw.jpg-l.jpg",
      "/Fritz Hansen/Fionia/Lifestyle/Fionia Stool Oak 03.jpg"
    ]
  },
  // Parasol Collection
  {
    _id: "capri-parasol-base",
    id: "capri-parasol-base",
    name: "Capri Parasol Base",
    description: "Heavy-duty parasol base designed to provide stable support for outdoor umbrellas. Available in two weight options to accommodate different parasol sizes and wind conditions.",
    price: 5799,
    category: "umbrellas-stands",
    subcategory: "parasol-bases",
    brand: "Skagerak by Fritz Hansen",
    image: "/outdoor/Skagerak-by-Fritz-Hansen/Capri-parasol-base/Capri parasol base NOK  5,799  Variants -  30kg.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/capri-parasol-base",
    staticImage: "/outdoor/Skagerak-by-Fritz-Hansen/Capri-parasol-base/Capri parasol base NOK  5,799  Variants -  30kg.jpg",
    staticBrand: "Skagerak by Fritz Hansen",
    variants: [
      {
        name: "30kg Base",
        image: "/outdoor/Skagerak-by-Fritz-Hansen/Capri-parasol-base/Capri parasol base NOK  5,799  Variants -  30kg.jpg",
        color: "30kg"
      },
      {
        name: "50kg Base",
        image: "/outdoor/Skagerak-by-Fritz-Hansen/Capri-parasol-base/Capri parasol base NOK  7,699  Variants -  50kg.jpg",
        color: "50kg"
      }
    ],
    features: [
      "Heavy-duty construction for stability",
      "Weather-resistant materials",
      "Available in 30kg and 50kg options",
      "Compatible with standard parasol poles",
      "Durable outdoor construction",
      "Easy to position and move"
    ],
    specifications: [
      { label: "Material", value: "Cast iron and steel" },
      { label: "Weight Options", value: "30kg or 50kg" },
      { label: "Pole Diameter", value: "Standard parasol pole compatibility" },
      { label: "Base Diameter", value: "45cm" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Weather Resistance", value: "Yes, designed for outdoor use" }
    ],
    lifestyleImages: [
      "/outdoor/Skagerak-by-Fritz-Hansen/Capri-parasol-base/lifestyle/10419353r_2.jpg"
    ]
  },
  {
    _id: "catania-parasol",
    id: "catania-parasol",
    name: "Catania Parasol Ø270",
    description: "Large outdoor parasol with 270cm diameter, perfect for providing shade over dining areas and outdoor seating. Features durable construction and elegant design.",
    price: 3350,
    category: "umbrellas-stands",
    subcategory: "parasols",
    brand: "Skagerak by Fritz Hansen",
    image: "/outdoor/Skagerak-by-Fritz-Hansen/Catania-parasol/Catania parasol Ø270 NOK  3,350.jpg",
    staticProduct: true,
    staticHref: "/utendors/product/catania-parasol",
    staticImage: "/outdoor/Skagerak-by-Fritz-Hansen/Catania-parasol/Catania parasol Ø270 NOK  3,350.jpg",
    staticBrand: "Skagerak by Fritz Hansen",
    features: [
      "Large 270cm diameter for maximum shade",
      "Weather-resistant fabric",
      "Durable aluminum frame",
      "UV protection",
      "Easy opening and closing mechanism",
      "Elegant Scandinavian design"
    ],
    specifications: [
      { label: "Material", value: "Aluminum frame with weather-resistant fabric" },
      { label: "Diameter", value: "270cm" },
      { label: "Height", value: "250cm" },
      { label: "Pole Diameter", value: "48mm" },
      { label: "UV Protection", value: "UPF 50+" },
      { label: "Care", value: "Clean fabric with mild soap and water" }
    ],
    lifestyleImages: [
      "/outdoor/Skagerak-by-Fritz-Hansen/Catania-parasol/lifestyle/10419355_2.jpg"
    ]
  }
];

// Helper functions to filter products by category
export const getOutdoorProductsByCategory = (category: string) => {
  return outdoorProducts.filter(product => product.category === category);
};

export const getOutdoorProductsBySubcategory = (subcategory: string) => {
  return outdoorProducts.filter(product => product.subcategory === subcategory);
};

export const getOutdoorProductById = (id: string) => {
  return outdoorProducts.find(product => product.id === id);
};

export const getRelatedOutdoorProducts = (currentProductId: string, limit: number = 4) => {
  const currentProduct = getOutdoorProductById(currentProductId);
  if (!currentProduct) return [];

  // Get products from the same category or subcategory, excluding the current product
  const relatedProducts = outdoorProducts.filter(product => 
    product.id !== currentProductId && (
      product.category === currentProduct.category ||
      product.subcategory === currentProduct.subcategory ||
      product.brand === currentProduct.brand
    )
  );

  // Shuffle and limit the results
  const shuffled = relatedProducts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
};

// Category mappings for the sidebar
export const outdoorCategoryMappings = {
  'all': outdoorProducts,
  'furniture': getOutdoorProductsByCategory('furniture'),
  'lighting': getOutdoorProductsByCategory('lighting'),
  'seating-sets': getOutdoorProductsBySubcategory('seating'),
  'dining-sets': [...getOutdoorProductsBySubcategory('dining-chairs'), ...getOutdoorProductsBySubcategory('dining-tables')],
  'chaise-lounges': getOutdoorProductsBySubcategory('lounge-seating'),
  'sofas-seating': getOutdoorProductsBySubcategory('sofas-seating'),
  'covers': getOutdoorProductsBySubcategory('accessories'),
  'dining-tables': getOutdoorProductsBySubcategory('dining-tables'),
  'coffee-tables': getOutdoorProductsBySubcategory('coffee-tables'),
  'stools': getOutdoorProductsBySubcategory('stools'),
  'benches': getOutdoorProductsBySubcategory('benches'),
  'cushions': getOutdoorProductsByCategory('cushions-pillows'),
  'pillows': getOutdoorProductsBySubcategory('pillows')
};
