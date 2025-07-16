"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface MontanaProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  variants: {
    name: string;
    image: string;
    color?: string;
    material?: string;
  }[];
  category: 'Storage' | 'Mirrors' | 'Tables' | 'Accessories' | 'Shelving';
}

export default function MontanaPage() {
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const products: MontanaProduct[] = [
    {
      id: 'around-mirror',
      name: 'Around Mirror',
      description: 'Elegant round mirror available in a wide range of Montana colors.',
      price: 3541,
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_145-Rosehip_Perspective.png',
      category: 'Mirrors',
      variants: [
        { name: 'White', image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_01_White_Perspective.png', color: 'White' },
        { name: 'Black', image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_05-Black_Perspective.png', color: 'Black' },
        { name: 'Nordic', image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_09-Nordic_Perspective.png', color: 'Nordic' },
        { name: 'Monarch', image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_135-Monarch_Perspective.png', color: 'Monarch' },
        { name: 'Rosehip', image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_145-Rosehip_Perspective.png', color: 'Rosehip' }
      ]
    },
    {
      id: 'like-mirror',
      name: 'Like Mirror',
      description: 'Modern rectangular mirror with clean lines.',
      price: 3541,
      image: '/Montana/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Black_Perspective.png',
      category: 'Mirrors',
      variants: [
        { name: 'White', image: '/Montana/MONTANA LIKE MIRROR/Montana_Selection_LIKE_White_Perspective.png', color: 'White' },
        { name: 'Black', image: '/Montana/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Black_Perspective.png', color: 'Black' },
        { name: 'Nordic', image: '/Montana/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Nordic_Perspective.png', color: 'Nordic' }
      ]
    },
    {
      id: 'look-mirror',
      name: 'Look Mirror',
      description: 'Square mirror with elegant proportions and Montana color options.',
      price: 3219,
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Anthracite_Perspective.png',
      category: 'Mirrors',
      variants: [
        { name: 'White', image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_White_Perspective.png', color: 'White' },
        { name: 'Black', image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Black_Perspective.png', color: 'Black' },
        { name: 'Nordic', image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Nordic_Perspective.png', color: 'Nordic' },
        { name: 'Anthracite', image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Anthracite_Perspective.png', color: 'Anthracite' }
      ]
    },
    {
      id: 'octave-viii-tv-bench',
      name: 'Octave VIII TV Bench',
      description: 'Versatile TV bench with multiple mounting options and ample storage.',
      price: 29993,
      image: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Black_Plinth_H3_Perspective.png',
      category: 'Storage',
      variants: [
        { name: 'White', image: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_White_Plinth_H3_Perspective.png', color: 'White' },
        { name: 'New White', image: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_New_White_Plinth_H3_Perspective-1.png', color: 'New White' },
        { name: 'Black', image: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Black_Plinth_H3_Perspective.png', color: 'Black' },
        { name: 'Anthracite', image: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Anthracite_Plinth_H3_Perspective.png', color: 'Anthracite' }
      ]
    },
    {
      id: 'octave-v-tv-bench',
      name: 'Octave V TV Bench',
      description: 'Practical TV bench with perforated metal door and drawers. Perfect for hiding TV boxes and wires.',
      price: 20448,
      image: '/Montana/Octave-v-tv-bench/Montana_Selection_OCTAVE_II_Monarch_Suspended_Perspective.png',
      category: 'Storage',
      variants: [
        { name: 'New White', image: '/Montana/Octave-v-tv-bench/Montana_Selection_OCTAVE_II_NewWhite_Suspended_Perspective.png', color: 'New White' },
        { name: 'Nordic', image: '/Montana/Octave-v-tv-bench/Montana_Selection_OCTAVE_II_Nordic_Suspended_Perspective.png', color: 'Nordic' },
        { name: 'Vanilla', image: '/Montana/Octave-v-tv-bench/Montana_Selection_OCTAVE_II_Vanilla_Suspended_Perspective.png', color: 'Vanilla' },
        { name: 'Monarch', image: '/Montana/Octave-v-tv-bench/Montana_Selection_OCTAVE_II_Monarch_Suspended_Perspective.png', color: 'Monarch' },
        { name: 'Anthracite', image: '/Montana/Octave-v-tv-bench/Montana_Selection_OCTAVE_II_Anthracite_Suspended_Perspective.png', color: 'Anthracite' },
        { name: 'Mushroom', image: '/Montana/Octave-v-tv-bench/Montana_Selection_OCTAVE_II_Mushroom_Suspended_Perspective.png', color: 'Mushroom' }
      ]
    },
    {
      id: 'dash-nightstand',
      name: 'Dash Nightstand',
      description: 'Functional and beautiful wall-mounted bedside table with one shelf and one drawer.',
      price: 5515,
      image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_Monarch_Suspended_Perspective.jpg',
      category: 'Storage',
      variants: [
        { name: 'New White', image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_NewWhite_Suspended_Perspective.jpg', color: 'New White' },
        { name: 'Nordic', image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_Nordic_Suspended_Perspective.jpg', color: 'Nordic' },
        { name: 'Vanilla', image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_Vanilla_Suspended_Perspective.jpg', color: 'Vanilla' },
        { name: 'Monarch', image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_Monarch_Suspended_Perspective.jpg', color: 'Monarch' },
        { name: 'Anthracite', image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_Anthracite.jpg', color: 'Anthracite' },
        { name: 'Mushroom', image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_Mushroom_Suspended_Perspective.jpg', color: 'Mushroom' }
      ]
    },
    {
      id: 'bureau-desk',
      name: 'Bureau Desk',
      description: 'Small wall-mounted desk that integrates elegantly into the home office, living room and bedroom with removable shelves and cabinet storage.',
      price: 15817,
      image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Vanilla_Suspended_Perspective.png',
      category: 'Tables',
      variants: [
        { name: 'New White', image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_NewWhite_Suspended_Perspective.png', color: 'New White' },
        { name: 'Nordic', image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Nordic_Suspended_Perspective.png', color: 'Nordic' },
        { name: 'Vanilla', image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Vanilla_Suspended_Perspective.png', color: 'Vanilla' },
        { name: 'Monarch', image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Monarch_Suspended_Perspective.png', color: 'Monarch' },
        { name: 'Anthracite', image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Anthracite_Suspended_Perspective.png', color: 'Anthracite' },
        { name: 'Mushroom', image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Mushroom_Suspended_Perspective.png', color: 'Mushroom' }
      ]
    },
    {
      id: 'panton-wire-single-18',
      name: 'Panton Wire Single Ø18.8',
      description: 'Raw yet elegant, lightweight yet industrial. Can be used alone or in combination with other Panton Wire products.',
      price: 3166,
      image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D18.8_Chrome_perspective-scaled.jpg',
      category: 'Shelving',
      variants: [
        { name: 'Black', image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D18.8_Black_perspective-scaled.jpg', color: 'Black' },
        { name: 'Chrome', image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D18.8_Chrome_perspective-scaled.jpg', color: 'Chrome' },
        { name: 'Monarch', image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D18.8_Monarch_perspective-scaled.jpg', color: 'Monarch' },
        { name: 'Pine', image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D18.8_Black_perspective-scaled.jpg', color: 'Pine' },
        { name: 'Snow', image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D18.8_Snow_perspective-scaled.jpg', color: 'Snow' }
      ]
    },
    {
      id: 'panton-wire-single-35',
      name: 'Panton Wire Single Ø34.8',
      description: 'Larger version of Verner Panton\'s iconic wire shelf. Chrome-plated steel construction.',
      price: 1580,
      image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D34.8_Monarch_perspective-scaled.jpg',
      category: 'Shelving',
      variants: [
        { name: 'Black', image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D34.8_Black_perspective-scaled.jpg', color: 'Black' },
        { name: 'Chrome', image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D34.8_Chrome_perspective-scaled.jpg', color: 'Chrome' },
        { name: 'Monarch', image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D34.8_Monarch_perspective-scaled.jpg', color: 'Monarch' },
        { name: 'Pine', image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D34.8_Black_perspective-scaled.jpg', color: 'Pine' },
        { name: 'Snow', image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D34.8_Snow_perspective-scaled.jpg', color: 'Snow' }
      ]
    },
    {
      id: 'panton-wire-extended-18',
      name: 'Panton Wire Extended Ø18.8',
      description: 'Extended multi-level wire system. 70cm width creates dynamic sculptural display.',
      price: 3043,
      image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D18.8_Snow_perspective-scaled.jpg',
      category: 'Shelving',
      variants: [
        { name: 'Black', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D18.8_Black_perspective-scaled.jpg', color: 'Black' },
        { name: 'Chrome', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D18.8_Chrome_perspective-scaled.jpg', color: 'Chrome' },
        { name: 'Monarch', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D18.8_Monarch_perspective-scaled.jpg', color: 'Monarch' },
        { name: 'Pine', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D18.8_Black_perspective-scaled.jpg', color: 'Pine' },
        { name: 'Snow', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D18.8_Snow_perspective-scaled.jpg', color: 'Snow' }
      ]
    },
    {
      id: 'panton-wire-extended-35',
      name: 'Panton Wire Extended Ø34.8',
      description: 'Largest extended wire system. 70cm width with 34.8cm depth for maximum display space.',
      price: 3299,
      image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D34.8_Chrome_perspective-scaled.jpg',
      category: 'Shelving',
      variants: [
        { name: 'Black', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D34.8_Black_perspective-scaled.jpg', color: 'Black' },
        { name: 'Chrome', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D34.8_Chrome_perspective-scaled.jpg', color: 'Chrome' },
        { name: 'Monarch', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D34.8_Monarch_perspective-scaled.jpg', color: 'Monarch' },
        { name: 'Pine', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D34.8_Black_perspective-scaled.jpg', color: 'Pine' },
        { name: 'Snow', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D34.8_Snow_perspective-scaled.jpg', color: 'Snow' }
      ]
    },
    {
      id: 'read-bookshelf',
      name: 'Read Bookshelf',
      description: 'Clean, minimalist bookshelf designed for book lovers. Perfect backdrop for displaying literary collections.',
      price: 40731,
      image: '/Montana/Read-bookshelf/Montana_Selection_READ_Monarch_Suspended_Perspective.png',
      category: 'Storage',
      variants: [
        { name: 'New White', image: '/Montana/Read-bookshelf/Montana_Selection_READ_NewWhite_Suspended_Perspective.png', color: 'New White' },
        { name: 'Nordic', image: '/Montana/Read-bookshelf/Montana_Selection_READ_Nordic_Suspended_Perspective.jpg', color: 'Nordic' },
        { name: 'Vanilla', image: '/Montana/Read-bookshelf/Montana_Selection_READ_Vanilla_Suspended_Perspective.png', color: 'Vanilla' },
        { name: 'Monarch', image: '/Montana/Read-bookshelf/Montana_Selection_READ_Monarch_Suspended_Perspective.png', color: 'Monarch' },
        { name: 'Anthracite', image: '/Montana/Read-bookshelf/Montana_Selection_READ_Anthracite_Suspended_Perspective.jpg', color: 'Anthracite' },
        { name: 'Mushroom', image: '/Montana/Read-bookshelf/Montana_Selection_READ_Mushroom_Suspended_Perspective.png', color: 'Mushroom' }
      ]
    },
    {
      id: 'loom-bookshelf',
      name: 'Loom Bookshelf',
      description: 'Distinctive geometric bookshelf with multiple mounting options. Perfect for books and decorative objects.',
      price: 18017,
      image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Vanilla_Suspended_Perspective.png',
      category: 'Storage',
      variants: [
        { name: 'New White', image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_NewWhite_Suspended_Perspective.png', color: 'New White' },
        { name: 'Nordic', image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Nordic_Suspended_Perspective.jpg', color: 'Nordic' },
        { name: 'Vanilla', image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Vanilla_Suspended_Perspective.png', color: 'Vanilla' },
        { name: 'Monarch', image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Monarch_Suspended_Perspective.png', color: 'Monarch' },
        { name: 'Anthracite', image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Anthracite_Suspended_Perspective.jpg', color: 'Anthracite' },
        { name: 'Mushroom', image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Mushroom_Suspended_Perspective.png', color: 'Mushroom' }
      ]
    },
    {
      id: 'carry-chest-of-drawers',
      name: 'Carry Chest of Drawers',
      description: 'Modern and timeless three-drawer chest that provides ideal storage solution for living room, home office or bedroom.',
      price: 20376,
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Legs_Brass_Perspective.png',
      category: 'Storage',
      variants: [
        { name: 'New White', image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_NewWhite_Legs_Brass_Perspective.png', color: 'New White' },
        { name: 'Nordic', image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Nordic_Legs_Brass_Perspective.png', color: 'Nordic' },
        { name: 'Vanilla', image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Vanilla_Legs_Brass_Perspective.png', color: 'Vanilla' },
        { name: 'Monarch', image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Legs_Brass_Perspective.png', color: 'Monarch' },
        { name: 'Anthracite', image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Anthracite_Legs_Brass_Perspective.png', color: 'Anthracite' },
        { name: 'Mushroom', image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Mushroom_Legs_Brass_Perspective.png', color: 'Mushroom' }
      ]
    },
    {
      id: 'mb126-legs',
      name: 'MB126 Legs',
      description: 'Set of 4 classic Montana legs for shelving modules with height-adjustable feet.',
      price: 2345,
      image: '/Montana/MB126-LEGS/montana_mb126_position_legs_rosehip.webp',
      category: 'Accessories',
      variants: [
        { name: 'Snow', image: '/Montana/MB126-LEGS/montana_mb126_position_legs_snow.webp', color: 'Snow' },
        { name: 'Black', image: '/Montana/MB126-LEGS/montana_mb126_position_legs_black.webp', color: 'Black' },
        { name: 'Parsley', image: '/Montana/MB126-LEGS/montana_mb126_position_legs_parsley.webp', color: 'Parsley' },
        { name: 'Rosehip', image: '/Montana/MB126-LEGS/montana_mb126_position_legs_rosehip.webp', color: 'Rosehip' },
        { name: 'Flint', image: '/Montana/MB126-LEGS/montana_mb126_position_legs_flint.webp', color: 'Flint' },
        { name: 'Mushroom', image: '/Montana/MB126-LEGS/montana_mb126_position_legs_mushroom.webp', color: 'Mushroom' },
        { name: 'Brass', image: '/Montana/MB126-LEGS/montana_mb126_position_legs_brass.webp', color: 'Brass' }
      ]
    },
    {
      id: 'dream-bedside-table',
      name: 'Dream Bedside Table',
      description: 'Elegant and functional bedside table with a drawer and shelf, perfect for keeping nighttime essentials within reach.',
      price: 5458,
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_NewWhite_Legs_Brass_Perspective.png',
      category: 'Storage',
      variants: [
        { name: 'New White', image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_NewWhite_Legs_Brass_Perspective.png', color: 'New White' },
        { name: 'Nordic', image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Nordic_Legs_MattChrome_Perspective.png', color: 'Nordic' },
        { name: 'Vanilla', image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Vanilla_Legs_Snow_Perspective.png', color: 'Vanilla' },
        { name: 'Monarch', image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Monarch_Suspended_Perspective.png', color: 'Monarch' },
        { name: 'Anthracite', image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Anthracite_Suspended_Perspective.png', color: 'Anthracite' },
        { name: 'Mushroom', image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Mushroom_Suspended_Perspective.png', color: 'Mushroom' }
      ]
    },
    {
      id: 'shelfie-mirror',
      name: 'Shelfie Mirror',
      description: 'SHELFIE from Montana is a practical and decorative mirror with space for a few small items on the built-in shelf. Perfect for a small bathroom or hallway.',
      price: 4669,
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_145-Rosehip_Perspective.png',
      category: 'Mirrors',
      variants: [
        { name: 'New White', image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_101-New-White.png', color: 'New White' },
        { name: 'White', image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_01-White.png', color: 'White' },
        { name: 'Black', image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_05-Black.png', color: 'Black' },
        { name: 'Nordic', image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mrror_09-Nordic.png', color: 'Nordic' },
        { name: 'Anthracite', image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_04-Anthracite.png', color: 'Anthracite' },
        { name: 'Monarch', image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_135-Monarch.png', color: 'Monarch' },
        { name: 'Mushroom', image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_137-Mushroom.png', color: 'Mushroom' },
        { name: 'Vanilla', image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_150-Vanilla.png', color: 'Vanilla' }
      ]
    },
    {
      id: 'makeup-dressing-table',
      name: 'Makeup Dressing Table',
      description: 'Wall-mounted dressing table with one small drawer and two small drawers, perfect for creating a dedicated beauty space.',
      price: 7822,
      image: '/Montana/Makeup-dressing-Table/5714322673006_Montana_Selection_MAKEUP_Monarch_Suspended_Perspective.png',
      category: 'Tables',
      variants: [
        { name: 'New White', image: '/Montana/Makeup-dressing-Table/5714322672993_Montana_Selection_MAKEUP_New_White_Suspended_Perspective.png', color: 'New White' },
        { name: 'Nordic', image: '/Montana/Makeup-dressing-Table/5714322672979_Montana_Selection_MAKEUP_Nordic_Suspended_Perspective.png', color: 'Nordic' },
        { name: 'Vanilla', image: '/Montana/Makeup-dressing-Table/5714322673150_Montana_Selection_MAKEUP_Vanilla_Suspended_Perspective.png', color: 'Vanilla' },
        { name: 'Monarch', image: '/Montana/Makeup-dressing-Table/5714322673006_Montana_Selection_MAKEUP_Monarch_Suspended_Perspective.png', color: 'Monarch' },
        { name: 'Anthracite', image: '/Montana/Makeup-dressing-Table/5714322672955_Montana_Selection_MAKEUP_Anthracite_Suspended_Perspective.png', color: 'Anthracite' },
        { name: 'Mushroom', image: '/Montana/Makeup-dressing-Table/5714322673020_Montana_Selection_MAKEUP_Mushroom_Suspended_Perspective.png', color: 'Mushroom' }
      ]
    },
    {
      id: 'show-module',
      name: 'Show Module 1112',
      description: '1112 (SHOW) is an open bookcase perfect as a bookshelf for the living room, storage for the hallway or children\'s room, or kitchen shelves. Montana\'s classic storage favorite with 4 open compartments.',
      price: 6804,
      image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Mushroom_Suspended_Perspective.png',
      category: 'Storage',
      variants: [
        { name: 'New White', image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_NewWhite_Legs_Snow_Perspective-1.png', color: 'New White' },
        { name: 'Nordic', image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Nordic_Suspended_Perspective.png', color: 'Nordic' },
        { name: 'Vanilla', image: '/Montana/SHOW-Module(1112)/Montana_Selection_SHOW_Vanilla_Suspended_Perspective.png', color: 'Vanilla' },
        { name: 'Monarch', image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Monarch_Suspended_Perspective.png', color: 'Monarch' },
        { name: 'Anthracite', image: '/Montana/SHOW-Module(1112)/Montana_Selection_SHOW_Anthracite_Suspended_Perspective.png', color: 'Anthracite' },
        { name: 'Mushroom', image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Mushroom_Suspended_Perspective.png', color: 'Mushroom' }
      ]
    },
    {
      id: 'compile-module',
      name: 'Compile Module',
      description: 'Versatile storage solution that combines open shelving with closed compartments. Perfect for organizing and displaying your belongings while maintaining a clean appearance.',
      price: 8912,
      image: '/Montana/Compile-module/Montana_Selection_COMPILE_Monarch_Wall_Perspective.png',
      category: 'Storage',
      variants: [
        { name: 'New White', image: '/Montana/Compile-module/Montana_Selection_COMPILE_NewWhite_Wall_Perspective.jpg', color: 'New White' },
        { name: 'Nordic', image: '/Montana/Compile-module/Montana_Selection_Compile_Nordic_Wall_Perspective.jpg', color: 'Nordic' },
        { name: 'Vanilla', image: '/Montana/Compile-module/Montana_Selection_COMPILE_Vanilla_Wall_perspective.png', color: 'Vanilla' },
        { name: 'Monarch', image: '/Montana/Compile-module/Montana_Selection_COMPILE_Monarch_Wall_Perspective.png', color: 'Monarch' },
        { name: 'Anthracite', image: '/Montana/Compile-module/Montana_Selection_COMPILE_Anthracite_Wall_Perspective.jpg', color: 'Anthracite' },
        { name: 'Mushroom', image: '/Montana/Compile-module/Montana_Selection_COMPILE_Mushroom_Wall_Perspective.jpg', color: 'Mushroom' }
      ]
    },
    {
      id: 'drift-nightstand',
      name: 'Drift Nightstand',
      description: 'DRIFT is a cute little bedside table that will keep all the small items you need close at hand while you fall asleep. DRIFT has two drawers and is perfect for storing your favorite book, phone or a cup of coffee.',
      price: 7939,
      image: '/Montana/Drift-Bedside-Table/Montana_Selection_DRIFT_Mushroom_Suspended_Perspective.png',
      category: 'Storage',
      variants: [
        { name: 'New White', image: '/Montana/Drift-Bedside-Table/Montana_Selection_DRIFT_NewWhite_Suspended_Perspective.png', color: 'New White' },
        { name: 'Nordic', image: '/Montana/Drift-Bedside-Table/Montana_Selection_DRIFT_Nordic_Suspended_Perspective.jpg', color: 'Nordic' },
        { name: 'Vanilla', image: '/Montana/Drift-Bedside-Table/Montana_Selection_DRIFT_Vanilla_Suspended_Perspective.jpg', color: 'Vanilla' },
        { name: 'Monarch', image: '/Montana/Drift-Bedside-Table/Montana_Selection_DRIFT_Monarch_Suspended_Perspective.png', color: 'Monarch' },
        { name: 'Anthracite', image: '/Montana/Drift-Bedside-Table/Montana_Selection_DRIFT_Anthracite_Suspended_Perspective.jpg', color: 'Anthracite' },
        { name: 'Mushroom', image: '/Montana/Drift-Bedside-Table/Montana_Selection_DRIFT_Mushroom_Suspended_Perspective.png', color: 'Mushroom' }
      ]
    },
    {
      id: 'monterey-desk',
      name: 'Monterey Desk',
      description: 'Sophisticated workspace solution that combines elegant design with practical functionality. Perfect for home offices, studies, or creative spaces with ample workspace.',
      price: 14250,
      image: '/Montana/Monterey-Desk/Montana_Monterey_H72_Parsley_Perspective.png',
      category: 'Tables',
      variants: [
        { name: 'New White', image: '/Montana/Monterey-Desk/Montana_Monterey_H72_NewWhite_Perspective.png', color: 'New White' },
        { name: 'Anthracite', image: '/Montana/Monterey-Desk/Montana_Monterey_H72_Anthracite_Perspective.png', color: 'Anthracite' },
        { name: 'Black', image: '/Montana/Monterey-Desk/Montana_Monterey_H72_Black_Perspective.png', color: 'Black' },
        { name: 'Parsley', image: '/Montana/Monterey-Desk/Montana_Monterey_H72_Parsley_Perspective.png', color: 'Parsley' }
      ]
    },
    {
      id: 'line-bench',
      name: 'Line Storage',
      description: 'Classic storage and display solution ideal for the living room or as a sideboard in the hallway or bedroom. Consists of three open shelves and one cabinet without internal shelves.',
      price: 12511,
      image: '/Montana/Line-Bench/Montana_Selection_LINE_Mushroom_Suspended_Perspective.png',
      category: 'Storage',
      variants: [
        { name: 'New White', image: '/Montana/Line-Bench/Montana_Selection_LINE_NewWhite_Suspended_Perspective.png', color: 'New White' },
        { name: 'Nordic', image: '/Montana/Line-Bench/Montana_Selection_LINE_Nordic_Suspended_Perspective.png', color: 'Nordic' },
        { name: 'Vanilla', image: '/Montana/Line-Bench/Montana_Selection_LINE_Vanilla_Suspended_Perspective.png', color: 'Vanilla' },
        { name: 'Monarch', image: '/Montana/Line-Bench/Montana_Selection_LINE_Monarch_Suspended_Perspective.png', color: 'Monarch' },
        { name: 'Anthracite', image: '/Montana/Line-Bench/Montana_Selection_LINE_Anthracite_Suspended_Perspective.png', color: 'Anthracite' },
        { name: 'Mushroom', image: '/Montana/Line-Bench/Montana_Selection_LINE_Mushroom_Suspended_Perspective.png', color: 'Mushroom' }
      ]
    },
    {
      id: 'pair-sideboard',
      name: 'Pair Sideboard',
      description: 'Elegant storage solution that combines sophisticated design with practical functionality. Perfect for dining rooms, living rooms, or hallways with combination of open and closed storage.',
      price: 19489,
      image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Mushroom_Suspended_Perspective.png',
      category: 'Storage',
      variants: [
        { name: 'New White', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_NewWhite_Suspended_Perspective.jpg', color: 'New White' },
        { name: 'Nordic', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Nordic_Suspended_Perspective.jpg', color: 'Nordic' },
        { name: 'Vanilla', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Vanilla_Suspended_Perspective.png', color: 'Vanilla' },
        { name: 'Monarch', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Monarch_Suspended_Perspective.png', color: 'Monarch' },
        { name: 'Anthracite', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Anthracite_Suspended_Perspective.jpg', color: 'Anthracite' },
        { name: 'Mushroom', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Mushroom_Suspended_Perspective.png', color: 'Mushroom' }
      ]
    },
    {
      id: 'unlock-key-cabinet',
      name: 'Unlock Key Cabinet',
      description: 'Smart solution for secure key storage and organization. Wall-mounted cabinet with clean, minimalist design that keeps keys organized and accessible.',
      price: 6484,
      image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Acacia_Perspective.png',
      category: 'Storage',
      variants: [
        { name: 'New White', image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_NewWhite_Suspended_Perspective.png', color: 'New White' },
        { name: 'Nordic', image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Nordic_Suspended_Perspective.jpg', color: 'Nordic' },
        { name: 'Vanilla', image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Vanilla_Suspended_Perspective.jpg', color: 'Vanilla' },
        { name: 'Monarch', image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Monarch_Suspended_Perspective.png', color: 'Monarch' },
        { name: 'Anthracite', image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Anthracite_Suspended_Perspective.png', color: 'Anthracite' },
        { name: 'Mushroom', image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Mushroom_Suspended_Perspective.png', color: 'Mushroom' },
        { name: 'Acacia', image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Acacia_Perspective.png', color: 'Acacia' }
      ]
    },
    {
      id: 'save-sideboard',
      name: 'Save Sideboard',
      description: 'Sophisticated sideboard that combines elegant storage with timeless design. Perfect for dining rooms, living rooms, or hallways.',
      price: 22370,
      image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Monarch_Suspended_Perspective.png',
      category: 'Storage',
      variants: [
        { name: 'New White', image: '/Montana/Save-sideboard/Montana_Selection_SAVE_NewWhite_Suspended_Perspective.png', color: 'New White' },
        { name: 'Nordic', image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Nordic_Suspended_Perspective.jpg', color: 'Nordic' },
        { name: 'Vanilla', image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Vanilla_Suspended_Perspective.png', color: 'Vanilla' },
        { name: 'Monarch', image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Monarch_Suspended_Perspective.png', color: 'Monarch' },
        { name: 'Anthracite', image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Anthracite_Suspended_Perspective.png', color: 'Anthracite' },
        { name: 'Mushroom', image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Mushroom_Suspended_Perspective.jpg', color: 'Mushroom' }
      ]
    },
    {
      id: 'perfume-cabinet',
      name: 'Parfum Cabinet',
      description: 'Small wall-mounted cabinet with glass door, glass shelf and mirrored back panel. Perfect for displaying perfume bottles.',
      price: 5739,
      image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_142_Amber_Perspective.png',
      category: 'Storage',
      variants: [
        { name: 'New White', image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_New_White_Perspective.jpg', color: 'New White' },
        { name: 'Nordic', image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_Nordic_Perspective.jpg', color: 'Nordic' },
        { name: 'Vanilla', image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_Vanilla_Perspective.png', color: 'Vanilla' },
        { name: 'Monarch', image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_Monarch_Perspective.jpg', color: 'Monarch' },
        { name: 'Anthracite', image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_Anthracite_Perspective.png', color: 'Anthracite' },
        { name: 'Mushroom', image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_Mushroom_Perspective.jpg', color: 'Mushroom' },
        { name: 'Amber', image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_142_Amber_Perspective.png', color: 'Amber' },
        { name: 'Parsley', image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_152_Parsley_Perspective.png', color: 'Parsley' },
        { name: 'Masala', image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_155_Masala_Perspective.png', color: 'Masala' }
      ]
    }
  ];

  const filteredProducts = products.filter(product => 
    filterBy === 'all' || product.category === filterBy
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
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
          src="/Montana/Line-Bench/lifestyle/Montana_Home19_20_BCStudio_HomeOffice_LINE_Turmeric_COUPLE_Shadow_Detail_W.jpg"
          alt="Montana Collection"
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
              <h1 className="text-4xl md:text-6xl font-serif text-white">
                Montana
              </h1>
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
            <h2 className="text-3xl font-serif text-stone-800 mb-4">
              Montana Collection
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Discover our modular storage systems, mirrors, and furniture designed to adapt to your life.
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
                <option value="Storage">Storage</option>
                <option value="Mirrors">Mirrors</option>
                <option value="Tables">Tables</option>
                <option value="Shelving">Shelving</option>
                <option value="Accessories">Accessories</option>
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
                href={`/montana/${product.id}`}
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
                          // Define color mappings for different variants
                          const getVariantColor = (variantName: string, productId: string) => {
                            const colorMap: { [key: string]: string } = {
                              // Common colors across products
                              'White': '#FFFFFF',
                              'New White': '#FAFAFA',
                              'Black': '#000000',
                              'Nordic': '#E8E8E8',
                              'Anthracite': '#3A3A3A',
                              'Monarch': '#4A5D8A',
                              'Mushroom': '#B8A082',
                              'Vanilla': '#F5F5DC',
                              'Snow': '#FFFAFA',
                              'Parsley': '#7C8471',
                              'Rosehip': '#D4A574',
                              'Flint': '#8B8680',
                              'Brass': '#B5A642',
                              // MB126 Legs specific colors
                              'Chrome': '#C0C0C0',
                              // Perfume cabinet colors
                              'Amber': '#FFBF00',
                              'Masala': '#8B4513',
                              // Panton Wire colors
                              'Pine': '#4A5D4A',
                            };
                            return colorMap[variantName] || '#D1D5DB';
                          };

                          const backgroundColor = getVariantColor(variant.name, product.id);
                          
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
                        {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''}
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
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-stone-800 text-white hover:bg-stone-700'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-stone-800 text-white'
                        : 'bg-gray-100 text-stone-600 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-stone-800 text-white hover:bg-stone-700'
                }`}
              >
                Next
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* About Montana Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif text-stone-800 mb-6">
              About Montana
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Montana Furniture has been creating modular storage solutions since 1982. 
              Founded in Denmark, the company revolutionized furniture design with its innovative modular system.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              With over 40 colors and endless configuration possibilities, Montana furniture adapts to your changing needs 
              and personal style, making it a sustainable choice for modern living.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">40+ colors available</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Modular and customizable</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Sustainable production</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Danish design heritage</span>
              </div>
            </div>
          </div>
          <div className="relative h-96">
            <Image
              src="/Montana/Read-bookshelf/lifestyle/Montana_Home20_21_READ_Parsley_H-scaled.jpg"
              alt="Montana Design Detail"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-stone-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-serif mb-6">
            Create Your Perfect Storage Solution
          </h2>
          <p className="text-xl text-stone-300 mb-8 leading-relaxed">
            Discover the endless possibilities of Montana modular furniture and create 
            storage solutions that grow with your needs.
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
