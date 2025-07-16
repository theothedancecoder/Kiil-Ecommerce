"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ColorVariant {
  id: string;
  name: string;
  colorCode: string;
  image: string;
}

interface BaseOption {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function DreamBedsideTablePage() {
  const [selectedVariant, setSelectedVariant] = useState('new-white');
  const [selectedBase, setSelectedBase] = useState('legs-brass');

  const variants: ColorVariant[] = [
    // Selection Colors (most popular)
    {
      id: 'new-white',
      name: 'New White',
      colorCode: '#FAFAFA',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_NewWhite_Legs_Brass_Perspective.png'
    },
    {
      id: 'nordic',
      name: 'Nordic',
      colorCode: '#E8E8E8',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Nordic_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'vanilla',
      name: 'Vanilla',
      colorCode: '#F5F5DC',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Vanilla_Legs_Brass_Perspective.png'
    },
    {
      id: 'monarch',
      name: 'Monarch',
      colorCode: '#4A5D8A',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Monarch_Legs_Snow_Perspective.png'
    },
    {
      id: 'anthracite',
      name: 'Anthracite',
      colorCode: '#3A3A3A',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Anthracite_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'mushroom',
      name: 'Mushroom',
      colorCode: '#B8A082',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Mushroom_Legs_Snow_Perspective.png'
    },
    // Additional Colors - using fallback to available Montana Selection images
    {
      id: 'white',
      name: 'White',
      colorCode: '#FFFFFF',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_NewWhite_Legs_Brass_Perspective.png'
    },
    {
      id: 'black',
      name: 'Black',
      colorCode: '#000000',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Anthracite_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'fjord',
      name: 'Fjord',
      colorCode: '#4A6B8A',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Nordic_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'graphic',
      name: 'Graphic',
      colorCode: '#2C2C2C',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Anthracite_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'pine',
      name: 'Pine',
      colorCode: '#4A5D23',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Nordic_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'juniper',
      name: 'Juniper',
      colorCode: '#3A4A2A',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Nordic_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'oregano',
      name: 'Oregano',
      colorCode: '#5D6B3A',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Nordic_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'pomelo',
      name: 'Pomelo',
      colorCode: '#F5E6A3',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Vanilla_Legs_Brass_Perspective.png'
    },
    {
      id: 'truffle',
      name: 'Truffle',
      colorCode: '#8B7355',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Mushroom_Legs_Snow_Perspective.png'
    },
    {
      id: 'amber',
      name: 'Amber',
      colorCode: '#D4A574',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Vanilla_Legs_Brass_Perspective.png'
    },
    {
      id: 'fennel',
      name: 'Fennel',
      colorCode: '#A8B48C',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Nordic_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'rosehip',
      name: 'Rosehip',
      colorCode: '#C4626B',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Mushroom_Legs_Snow_Perspective.png'
    },
    {
      id: 'hazelnut',
      name: 'Hazelnut',
      colorCode: '#A67C52',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Mushroom_Legs_Snow_Perspective.png'
    },
    {
      id: 'shadow',
      name: 'Shadow',
      colorCode: '#6B6B6B',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Anthracite_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'flint',
      name: 'Flint',
      colorCode: '#A8A8A8',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Nordic_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'rhubarb',
      name: 'Rhubarb',
      colorCode: '#B85450',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Mushroom_Legs_Snow_Perspective.png'
    },
    {
      id: 'parsley',
      name: 'Parsley',
      colorCode: '#4A5D23',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Nordic_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'azure',
      name: 'Azure',
      colorCode: '#5B8DB8',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Nordic_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'masala',
      name: 'Masala',
      colorCode: '#8B4513',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Mushroom_Legs_Snow_Perspective.png'
    },
    {
      id: 'oyster',
      name: 'Oyster',
      colorCode: '#E8E0D6',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Vanilla_Legs_Brass_Perspective.png'
    },
    {
      id: 'cumin',
      name: 'Cumin',
      colorCode: '#B8860B',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Vanilla_Legs_Brass_Perspective.png'
    },
    {
      id: 'oat',
      name: 'Oat',
      colorCode: '#DEB887',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Vanilla_Legs_Brass_Perspective.png'
    },
    {
      id: 'camomile',
      name: 'Camomile',
      colorCode: '#F0E68C',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Vanilla_Legs_Brass_Perspective.png'
    },
    {
      id: 'balsamic',
      name: 'Balsamic',
      colorCode: '#654321',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Mushroom_Legs_Snow_Perspective.png'
    },
    {
      id: 'mist',
      name: 'Mist',
      colorCode: '#D3D3D3',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Nordic_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'hokkaido',
      name: 'Hokkaido',
      colorCode: '#FF8C00',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Vanilla_Legs_Brass_Perspective.png'
    },
    {
      id: 'black-jade',
      name: 'Black Jade',
      colorCode: '#2F4F2F',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Anthracite_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'iris',
      name: 'Iris',
      colorCode: '#9370DB',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Nordic_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'beetroot',
      name: 'Beetroot',
      colorCode: '#8B0000',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Mushroom_Legs_Snow_Perspective.png'
    },
    {
      id: 'acacia',
      name: 'Acacia',
      colorCode: '#DAA520',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Vanilla_Legs_Brass_Perspective.png'
    },
    {
      id: 'ruby',
      name: 'Ruby',
      colorCode: '#CC0000',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Mushroom_Legs_Snow_Perspective.png'
    },
    {
      id: 'clay',
      name: 'Clay',
      colorCode: '#B8860B',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Vanilla_Legs_Brass_Perspective.png'
    },
    {
      id: 'coffee',
      name: 'Coffee',
      colorCode: '#6F4E37',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Mushroom_Legs_Snow_Perspective.png'
    },
    {
      id: 'coal',
      name: 'Coal',
      colorCode: '#2C2C2C',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Anthracite_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'snow',
      name: 'Snow',
      colorCode: '#FFFAFA',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_NewWhite_Legs_Brass_Perspective.png'
    }
  ];

  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[0];

  // Generate current image based on selected variant and base
  const getCurrentImage = () => {
    // Map color IDs to proper Montana naming convention
    const colorMap: { [key: string]: string } = {
      'new-white': 'NewWhite',
      'nordic': 'Nordic',
      'vanilla': 'Vanilla',
      'monarch': 'Monarch',
      'anthracite': 'Anthracite',
      'mushroom': 'Mushroom',
      'white': 'NewWhite', // Use NewWhite for white
      'black': 'Anthracite', // Use Anthracite for black variants
      'fjord': 'Nordic', // Fallback to Nordic
      'graphic': 'Anthracite', // Fallback to Anthracite
      'pine': 'Nordic', // Fallback to Nordic
      'juniper': 'Nordic', // Fallback to Nordic
      'oregano': 'Nordic', // Fallback to Nordic
      'pomelo': 'Vanilla', // Fallback to Vanilla
      'truffle': 'Mushroom', // Fallback to Mushroom
      'amber': 'Vanilla', // Fallback to Vanilla
      'fennel': 'Nordic', // Fallback to Nordic
      'rosehip': 'Mushroom', // Fallback to Mushroom
      'hazelnut': 'Mushroom', // Fallback to Mushroom
      'shadow': 'Anthracite', // Fallback to Anthracite
      'flint': 'Nordic', // Fallback to Nordic
      'rhubarb': 'Mushroom', // Fallback to Mushroom
      'parsley': 'Nordic', // Fallback to Nordic
      'azure': 'Nordic', // Fallback to Nordic
      'masala': 'Mushroom', // Fallback to Mushroom
      'oyster': 'Vanilla', // Fallback to Vanilla
      'cumin': 'Vanilla', // Fallback to Vanilla
      'oat': 'Vanilla', // Fallback to Vanilla
      'camomile': 'Vanilla', // Fallback to Vanilla
      'balsamic': 'Mushroom', // Fallback to Mushroom
      'mist': 'Nordic', // Fallback to Nordic
      'hokkaido': 'Vanilla', // Fallback to Vanilla
      'black-jade': 'Anthracite', // Fallback to Anthracite
      'iris': 'Nordic', // Fallback to Nordic
      'beetroot': 'Mushroom', // Fallback to Mushroom
      'acacia': 'Vanilla', // Fallback to Vanilla
      'ruby': 'Mushroom', // Fallback to Mushroom
      'clay': 'Vanilla', // Fallback to Vanilla
      'coffee': 'Mushroom', // Fallback to Mushroom
      'coal': 'Anthracite', // Fallback to Anthracite
      'snow': 'NewWhite' // Fallback to NewWhite
    };

    // Map base IDs to proper Montana naming convention
    const baseMap: { [key: string]: string } = {
      'legs-white': 'Legs_Snow',
      'legs-matt-chrome': 'Legs_MattChrome',
      'legs-brass': 'Legs_Brass',
      'legs-black': 'Legs_Black',
      'base-3cm': 'PlinthH3',
      'base-7cm': 'PlinthH7',
      'wall-mounted': 'Suspended',
      'legs-flint': 'Legs_Snow', // Fallback to Snow legs
      'legs-mushroom': 'Legs_Snow', // Fallback to Snow legs
      'legs-parsley': 'Legs_Snow', // Fallback to Snow legs
      'legs-rosehip': 'Legs_Snow' // Fallback to Snow legs
    };

    const colorName = colorMap[selectedVariant] || 'NewWhite';
    const baseName = baseMap[selectedBase] || 'Legs_Brass';
    
    // Create a function to find the best available image
    const getAvailableImage = (color: string, base: string) => {
      // Define available combinations based on actual files
      const availableCombinations: { [key: string]: { [key: string]: string } } = {
        'NewWhite': {
          'Legs_Black': '.png',
          'Legs_Brass': '.png',
          'Legs_MattChrome': '.png',
          'Legs_Snow': '.png',
          'PlinthH3': '.png'
        },
        'Nordic': {
          'Legs_MattChrome': '.png',
          'Legs_Snow': '.png',
          'PlinthH7': '.png',
          'Suspended': '.png'
        },
        'Vanilla': {
          'Legs_Black': '.png',
          'Legs_Brass': '.png',
          'Legs_MattChrome': '.png',
          'Legs_Snow': '.png'
        },
        'Monarch': {
          'Legs_Snow': '.png',
          'PlinthH3': '.png',
          'PlinthH7': '.png',
          'Suspended': '.png'
        },
        'Anthracite': {
          'Legs_MattChrome': '.png',
          'Legs_Snow': '.png',
          'PlinthH7': '.jpg',
          'Suspended': '.png'
        },
        'Mushroom': {
          'Legs_Snow': '.png',
          'PlinthH3': '.png',
          'PlinthH7': '.png',
          'Suspended': '.png'
        }
      };

      // Check if the exact combination exists
      if (availableCombinations[color] && availableCombinations[color][base]) {
        const extension = availableCombinations[color][base];
        return `/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_${color}_${base}_Perspective${extension}`;
      }

      // Fallback logic: try to find a similar base for the color
      if (availableCombinations[color]) {
        const availableBases = Object.keys(availableCombinations[color]);
        
        // Prefer legs over other bases for fallback
        const preferredFallbacks = ['Legs_Brass', 'Legs_Snow', 'Legs_MattChrome', 'Legs_Black'];
        for (const fallbackBase of preferredFallbacks) {
          if (availableBases.includes(fallbackBase)) {
            const extension = availableCombinations[color][fallbackBase];
            return `/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_${color}_${fallbackBase}_Perspective${extension}`;
          }
        }
        
        // If no legs available, use any available base
        const firstAvailable = availableBases[0];
        const extension = availableCombinations[color][firstAvailable];
        return `/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_${color}_${firstAvailable}_Perspective${extension}`;
      }

      // Ultimate fallback to NewWhite with Brass legs
      return '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_NewWhite_Legs_Brass_Perspective.png';
    };

    return getAvailableImage(colorName, baseName);
  };

  // Generate base option image based on current color selection
  const getBaseOptionImage = (baseId: string) => {
    // For base options, show how they would look with the current color
    const colorMap: { [key: string]: string } = {
      'new-white': 'NewWhite',
      'nordic': 'Nordic',
      'vanilla': 'Vanilla',
      'monarch': 'Monarch',
      'anthracite': 'Anthracite',
      'mushroom': 'Mushroom',
      'white': 'NewWhite',
      'black': 'Anthracite',
      'fjord': 'Nordic',
      'graphic': 'Anthracite',
      'pine': 'Nordic',
      'juniper': 'Nordic',
      'oregano': 'Nordic',
      'pomelo': 'Vanilla',
      'truffle': 'Mushroom',
      'amber': 'Vanilla',
      'fennel': 'Nordic',
      'rosehip': 'Mushroom',
      'hazelnut': 'Mushroom',
      'shadow': 'Anthracite',
      'flint': 'Nordic',
      'rhubarb': 'Mushroom',
      'parsley': 'Nordic',
      'azure': 'Nordic',
      'masala': 'Mushroom',
      'oyster': 'Vanilla',
      'cumin': 'Vanilla',
      'oat': 'Vanilla',
      'camomile': 'Vanilla',
      'balsamic': 'Mushroom',
      'mist': 'Nordic',
      'hokkaido': 'Vanilla',
      'black-jade': 'Anthracite',
      'iris': 'Nordic',
      'beetroot': 'Mushroom',
      'acacia': 'Vanilla',
      'ruby': 'Mushroom',
      'clay': 'Vanilla',
      'coffee': 'Mushroom',
      'coal': 'Anthracite',
      'snow': 'NewWhite'
    };

    const baseMap: { [key: string]: string } = {
      'legs-white': 'Legs_Snow',
      'legs-matt-chrome': 'Legs_MattChrome',
      'legs-brass': 'Legs_Brass',
      'legs-black': 'Legs_Black',
      'base-3cm': 'PlinthH3',
      'base-7cm': 'PlinthH7',
      'wall-mounted': 'Suspended',
      'legs-flint': 'Legs_Snow',
      'legs-mushroom': 'Legs_Snow',
      'legs-parsley': 'Legs_Snow',
      'legs-rosehip': 'Legs_Snow'
    };

    const colorName = colorMap[selectedVariant] || 'NewWhite';
    const baseName = baseMap[baseId] || 'Legs_Brass';
    
    // Use the same availability logic as getCurrentImage
    const availableCombinations: { [key: string]: { [key: string]: string } } = {
      'NewWhite': {
        'Legs_Black': '.png',
        'Legs_Brass': '.png',
        'Legs_MattChrome': '.png',
        'Legs_Snow': '.png',
        'PlinthH3': '.png'
      },
      'Nordic': {
        'Legs_MattChrome': '.png',
        'Legs_Snow': '.png',
        'PlinthH7': '.png',
        'Suspended': '.png'
      },
      'Vanilla': {
        'Legs_Black': '.png',
        'Legs_Brass': '.png',
        'Legs_MattChrome': '.png',
        'Legs_Snow': '.png'
      },
      'Monarch': {
        'Legs_Snow': '.png',
        'PlinthH3': '.png',
        'PlinthH7': '.png',
        'Suspended': '.png'
      },
      'Anthracite': {
        'Legs_MattChrome': '.png',
        'Legs_Snow': '.png',
        'PlinthH7': '.jpg',
        'Suspended': '.png'
      },
      'Mushroom': {
        'Legs_Snow': '.png',
        'PlinthH3': '.png',
        'PlinthH7': '.png',
        'Suspended': '.png'
      }
    };

    // Check if the exact combination exists
    if (availableCombinations[colorName] && availableCombinations[colorName][baseName]) {
      const extension = availableCombinations[colorName][baseName];
      return `/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_${colorName}_${baseName}_Perspective${extension}`;
    }

    // Fallback logic: try to find a similar base for the color
    if (availableCombinations[colorName]) {
      const availableBases = Object.keys(availableCombinations[colorName]);
      
      // Prefer legs over other bases for fallback
      const preferredFallbacks = ['Legs_Brass', 'Legs_Snow', 'Legs_MattChrome', 'Legs_Black'];
      for (const fallbackBase of preferredFallbacks) {
        if (availableBases.includes(fallbackBase)) {
          const extension = availableCombinations[colorName][fallbackBase];
          return `/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_${colorName}_${fallbackBase}_Perspective${extension}`;
        }
      }
      
      // If no legs available, use any available base
      const firstAvailable = availableBases[0];
      const extension = availableCombinations[colorName][firstAvailable];
      return `/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_${colorName}_${firstAvailable}_Perspective${extension}`;
    }

    // Ultimate fallback to NewWhite with Brass legs
    return '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_NewWhite_Legs_Brass_Perspective.png';
  };

  // Define base options after the function is declared
  const baseOptions: BaseOption[] = [
    {
      id: 'legs-white',
      name: 'Legs Snow',
      price: 5458,
      image: getBaseOptionImage('legs-white')
    },
    {
      id: 'legs-matt-chrome',
      name: 'Legs Matt Chrome',
      price: 5458,
      image: getBaseOptionImage('legs-matt-chrome')
    },
    {
      id: 'legs-brass',
      name: 'Legs Brass',
      price: 5458,
      image: getBaseOptionImage('legs-brass')
    },
    {
      id: 'legs-black',
      name: 'Legs Black',
      price: 5458,
      image: getBaseOptionImage('legs-black')
    },
    {
      id: 'base-3cm',
      name: 'Plinth 3cm',
      price: 5458,
      image: getBaseOptionImage('base-3cm')
    },
    {
      id: 'base-7cm',
      name: 'Plinth 7cm',
      price: 5458,
      image: getBaseOptionImage('base-7cm')
    },
    {
      id: 'wall-mounted',
      name: 'Wall Mounted',
      price: 5458,
      image: getBaseOptionImage('wall-mounted')
    }
  ];

  const currentBase = baseOptions.find(b => b.id === selectedBase) || baseOptions[2];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-stone-600">
            <Link href="/" className="hover:text-stone-800">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/montana" className="hover:text-stone-800">Montana</Link>
            <span className="mx-2">/</span>
            <span className="text-stone-800">Dream Bedside Table</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image and Lifestyle Images */}
          <div className="space-y-6">
            {/* Main Product Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={getCurrentImage()}
                alt={`Dream Bedside Table in ${currentVariant.name} with ${currentBase.name}`}
                fill
                className="object-contain object-center p-8"
              />
            </div>
            
            {/* Lifestyle Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-stone-800">Dream in Living Spaces</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Dream-Bedside-Table/Montana_Home19_20_GB_Bedroom_DREAM_Mist_Cumin_Detail_02_Rgb_Low.jpg"
                    alt="Dream bedside table in modern bedroom setting"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Bedroom Integration</p>
                  </div>
                </div>
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Dream-Bedside-Table/Montana_Home21_22_DREAM_Masala_Parsley_H-scaled.jpg"
                    alt="Dream bedside table with accessories in living space"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Living Space Integration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-stone-500 uppercase tracking-wider mb-2">
                MONTANA SELECTION
              </p>
              <h1 className="text-4xl font-serif text-stone-800 mb-4">
                Dream Bedside Table
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Dream is an elegant and functional bedside table designed to keep everything you want next to your bed. 
                It has a drawer and a shelf, so it can accommodate all your needs during the night – a book, a glass of water, 
                your glasses or, for example, your alarm clock. It fits seamlessly into the bedroom, but can also be used in 
                the living room or hallway for extra storage space.
              </p>
              <p className="text-stone-600 mb-4">
                Designed by Petter J. Lassen
              </p>
            </div>

            <div className="text-3xl font-light text-stone-800">
              kr {currentBase.price.toLocaleString()}
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                COLOR: {currentVariant.name.toUpperCase()}
              </h3>
              <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedVariant === variant.id
                        ? 'border-stone-800 scale-110'
                        : 'border-stone-300 hover:border-stone-500'
                    }`}
                    style={{ backgroundColor: variant.colorCode }}
                    title={variant.name}
                  />
                ))}
              </div>
              <p className="text-xs text-stone-500 mt-2">
                Scroll to see all {variants.length} available colors
              </p>
            </div>

            {/* Base Selection */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                BASE: {currentBase.name.toUpperCase()}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {baseOptions.map((base) => (
                  <button
                    key={base.id}
                    onClick={() => setSelectedBase(base.id)}
                    className={`p-3 text-left border rounded-lg transition-all ${
                      selectedBase === base.id
                        ? 'border-stone-800 bg-stone-50'
                        : 'border-stone-300 hover:border-stone-500'
                    }`}
                  >
                    <div className="text-sm font-medium text-stone-800">{base.name}</div>
                    <div className="text-xs text-stone-600">kr {base.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-stone-800 text-white py-4 px-8 rounded-lg font-medium hover:bg-stone-700 transition-colors text-lg">
              ADD TO CART - KR {currentBase.price.toLocaleString()}
            </button>

            {/* Made to Order Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Made to Order</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    This item is made to order. Expected delivery time is approximately 8 weeks.
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details Expandable */}
            <div className="border-t border-gray-200 pt-8">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer text-stone-800 font-medium py-2">
                  PRODUCT DETAILS
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-4 space-y-4 text-stone-600">
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Specifications</h4>
                    <ul className="space-y-1 text-sm">
                      <li><strong>Dimensions:</strong> W 35.4 x D 30 x H 35.4 cm</li>
                      <li><strong>Weight:</strong> 10 kg</li>
                      <li><strong>Designer:</strong> Petter J. Lassen</li>
                      <li><strong>Manufacturer:</strong> Montana</li>
                      <li><strong>Configuration:</strong> One drawer and one shelf</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Elegant and functional design</li>
                      <li>• One drawer and one shelf for optimal storage</li>
                      <li>• Perfect for bedside essentials</li>
                      <li>• Multiple base options: wall-mounted, legs, and pedestal</li>
                      <li>• Available in 40+ colors</li>
                      <li>• Versatile use in bedroom, living room, or hallway</li>
                      <li>• Compact size ideal for small spaces</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Available Colors</h4>
                    <p className="text-sm">
                      Selection colors: New White, Nordic, Vanilla, Monarch, Anthracite, Mushroom.
                      <br />
                      Additional colors: White, Black, Fjord, Graphic, Pine, Juniper, Oregano, Pomelo, Truffle, 
                      Amber, Fennel, Rosehip, Hazelnut, Shadow, Flint, Rhubarb, Parsley, Azure, Masala, Oyster, 
                      Cumin, Oat, Camomile, Balsamic, Mist, Hokkaido, Black Jade, Iris, Beetroot, Acacia, Ruby, 
                      Clay, Coffee, Coal, and Snow.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Base Options</h4>
                    <p className="text-sm">
                      Choose from various base options including legs in White, Matt Chrome, Brass, Black, Flint, 
                      Mushroom, Parsley, and Rosehip. Also available with Base 3cm, Base 7cm, or Wall Mounted configuration.
                    </p>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <section className="mt-20">
          <h2 className="text-2xl font-serif text-stone-800 mb-8 text-center">
            Complete Your Bedroom
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana-DASH-Nightstand/Montana_Selection_DASH_NewWhite_Suspended_Perspective.jpg"
                alt="Dash Nightstand"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Dash Nightstand</h3>
                <p className="text-sm text-stone-600">Wall-mounted bedside storage</p>
              </div>
            </div>
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_01_White_Perspective.png"
                alt="Around Mirror"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Around Mirror</h3>
                <p className="text-sm text-stone-600">Functional mirror with storage</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/montana"
              className="inline-block bg-stone-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-stone-700 transition-colors"
            >
              VIEW ALL MONTANA PRODUCTS
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
