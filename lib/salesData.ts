export interface SaleProduct {
  id: string;
  name: string;
  brand: string;
  designer?: string;
  originalPrice: number;
  salePrice: number;
  image: string;
  folder: string;
  description?: string;
}

export const salesProducts: SaleProduct[] = [
  {
    id: "kevi-2063-lounge-chair",
    name: "Kevi 2063 Lounge Chair",
    brand: "Montana",
    designer: "Jørgen Rasmussen",
    originalPrice: 9668,
    salePrice: 6768,
    image: "/sales/ Kevi-2063-Lounge-chair/Exhibition model Gjøvik – Kevi 2063 Lounge chair kr  9 668 Original price was- NOK 9,668.kr  6 768.jpg",
    folder: " Kevi-2063-Lounge-chair",
    description: "Exhibition model from Gjøvik"
  },
  {
    id: "helios-firebowl",
    name: "Helios Fire Bowl",
    brand: "Skagerak",
    designer: "Fritz Hansen",
    originalPrice: 4999,
    salePrice: 2499,
    image: "/sales/helios-firebowl/Skagerak by Fritz Hansen Helios fire bowl NOK  4,999 Original price was- NOK 4,999.NOK  2,499.webp",
    folder: "helios-firebowl",
    description: "Outdoor fire bowl"
  },
  {
    id: "juul-301-sofa-tobacco",
    name: "301 Sofa L-240",
    brand: "Juul",
    originalPrice: 44737,
    salePrice: 39990,
    image: "/sales/Juul-301-sofa/Juul 301 sofa L-240 NOK  44,737 Original price was- NOK 44,737.NOK  39,990Current price is- NOK 39,990.  Variants -  Tobacco 16.jpg",
    folder: "Juul-301-sofa",
    description: "L-240 size in Tobacco variant"
  },
  {
    id: "juul-301-sofa-mainz",
    name: "301 Sofa L-240",
    brand: "Juul",
    originalPrice: 53957,
    salePrice: 42990,
    image: "/sales/Juul-301-sofa/Juul 301 sofa L-240 NOK  53,957 Original price was- NOK 53,957.NOK  42,990Current price is- NOK 42,990.  Variants -  Mainz 09.jpg",
    folder: "Juul-301-sofa",
    description: "L-240 size in Mainz variant"
  },
  {
    id: "juul-sofa-l200",
    name: "Sofa 903 L-200",
    brand: "Juul",
    originalPrice: 35021,
    salePrice: 29990,
    image: "/sales/Juul-sofa/Juul Sofa | 903 FromNOK  35,021 Original price was- NOK 35,021.NOK  29,990Current price is- NOK 29,990.  Size -  L-200.jpg",
    folder: "Juul-sofa",
    description: "Size L-200"
  },
  {
    id: "juul-sofa-l220",
    name: "Sofa 903 L-220",
    brand: "Juul",
    originalPrice: 36128,
    salePrice: 32990,
    image: "/sales/Juul-sofa/Juul Sofa | 903 NOK  36,128 Original price was- NOK 36,128.NOK  32,990Current price is- NOK 32,990.  Size -  L-220.jpg",
    folder: "Juul-sofa",
    description: "Size L-220"
  },
  {
    id: "juul-sofa-l240",
    name: "Sofa 903 L-240",
    brand: "Juul",
    originalPrice: 58662,
    salePrice: 44990,
    image: "/sales/Juul-sofa/Juul Sofa | 903 NOK  58,662 Original price was- NOK 58,662.NOK  44,990Current price is- NOK 44,990.  Size -  L-240.jpg",
    folder: "Juul-sofa",
    description: "Size L-240"
  },
  {
    id: "kiil-plank-dining-table",
    name: "Plank Dining Table",
    brand: "KiiL",
    originalPrice: 66812,
    salePrice: 39900,
    image: "/sales/KiiL-Plank-dining-table/KiiL Plank dining table with 1 top Waxed Oak EXHIBITION MODEL NOK  66,812 Original price was- NOK 66,812.NOK  39,900.jpg",
    folder: "KiiL-Plank-dining-table",
    description: "Waxed Oak exhibition model"
  },
  {
    id: "scandia-senior-black",
    name: "Scandia Senior Tilt Armchair",
    brand: "Fjordfiesta",
    designer: "Hans Brattrud",
    originalPrice: 29250,
    salePrice: 24863,
    image: "/sales/Scandia-Senior-Tilt-armchair/Scandia Senior Tilt armchair NOK  29,250 Original price was- NOK 29,250.NOK  24,863Current price is- NOK 24,863.  Color -  Oak Oak White pigmented oak Black Walnut Base -  Black.webp",
    folder: "Scandia-Senior-Tilt-armchair",
    description: "Oak with black base"
  },
  {
    id: "scandia-senior-chrome",
    name: "Scandia Senior Tilt Armchair",
    brand: "Fjordfiesta",
    designer: "Hans Brattrud",
    originalPrice: 30050,
    salePrice: 25543,
    image: "/sales/Scandia-Senior-Tilt-armchair/Scandia Senior Tilt armchair NOK  30,050 Original price was- NOK 30,050.NOK  25,543Current price is- NOK 25,543.  Color -  Black Oak White pigmented oak Black Walnut Base -  Matt chrome.webp",
    folder: "Scandia-Senior-Tilt-armchair",
    description: "Black oak with matt chrome base"
  },
  {
    id: "swoon-lounge-chair",
    name: "Swoon Lounge Chair",
    brand: "Space Copenhagen",
    designer: "Signe Bindslev Henriksen",
    originalPrice: 50996,
    salePrice: 34900,
    image: "/sales/Swoon-Lounge-chair/Exhibition model Gjøvik – Swoon Lounge NOK  50,996 Original price was- NOK 50,996.NOK  34,900.webp",
    folder: "Swoon-Lounge-chair",
    description: "Exhibition model from Gjøvik"
  },
  {
    id: "vipp478-chimney-shelf-60",
    name: "Chimney Shelf 60cm",
    brand: "Vipp",
    originalPrice: 3495,
    salePrice: 2796,
    image: "/sales/Vipp478-Chimney-shelf/Brands : VIPP Vipp478 Chimney shelf, 60 cm EXHIBITION MODEL NOK  3,495 Original price was- NOK 3,495.kr  2 796.webp",
    folder: "Vipp478-Chimney-shelf",
    description: "60cm exhibition model"
  },
  {
    id: "vipp479-chimney-shelf-120",
    name: "Chimney Shelf 120cm",
    brand: "Vipp",
    originalPrice: 4395,
    salePrice: 3516,
    image: "/sales/Vipp478-Chimney-shelf/Brands : VIPP Vipp479 Chimney shelf, 120 cm EXHIBITION MODEL NOK  4,395 Original price was- NOK 4,395.kr  3 516Current price is- NOK 3,516.  .webp",
    folder: "Vipp478-Chimney-shelf",
    description: "120cm exhibition model"
  },
  {
    id: "delphi-sofa",
    name: "Delphi Sofa",
    brand: "Hannes Wettstein",
    originalPrice: 76931,
    salePrice: 53850,
    image: "/sales/Delphi-sofa/Exhibition model Gjøvik – Delphi sofa NOK  76,931 Original price was- NOK 76,931.NOK  53,850.avif",
    folder: "Delphi-sofa",
    description: "Exhibition model from Gjøvik"
  }
];

export const calculateSavings = (originalPrice: number, salePrice: number): number => {
  if (originalPrice <= 0 || salePrice <= 0) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};
