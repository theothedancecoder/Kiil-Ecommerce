"use client";

import { useLanguage } from "@/lib/languageContext";
import Link from "next/link";

const OutdoorSidebar = () => {
  const { t } = useLanguage();

  const categories = [
    {
      title: "SHOP ALL OUTDOOR",
      href: "/utendors",
      main: true
    },
    {
      title: "OUTDOOR FURNITURE",
      href: "/utendors/furniture",
      main: true
    },
    {
      title: "All Outdoor Furniture",
      href: "/utendors/furniture/all"
    },
    {
      title: "Outdoor Seating Sets",
      href: "/utendors/furniture/seating-sets"
    },
    {
      title: "Outdoor Furniture Collections",
      href: "/utendors/furniture/collections"
    },
    {
      title: "Dining Sets",
      href: "/utendors/furniture/dining-sets"
    },
    {
      title: "Chaise Lounges",
      href: "/utendors/furniture/chaise-lounges"
    },
    {
      title: "Sofas & Seating",
      href: "/utendors/furniture/sofas-seating"
    },
    {
      title: "Outdoor Furniture Cover",
      href: "/utendors/furniture/covers"
    },
    {
      title: "Dining Tables",
      href: "/utendors/furniture/dining-tables"
    },
    {
      title: "Stools",
      href: "/utendors/furniture/stools"
    },
    {
      title: "OUTDOOR CUSHIONS & PILLOWS",
      href: "/utendors/cushions-pillows",
      main: true,
      addLineAbove: true
    },
    {
      title: "Cushions",
      href: "/utendors/cushions-pillows/cushions"
    },
    {
      title: "Pillows",
      href: "/utendors/cushions-pillows/pillows"
    },
    {
      title: "OUTDOOR UMBRELLAS AND STANDS",
      href: "/utendors/umbrellas-stands",
      main: true,
      addLineAbove: true
    }
  ];

  return (
    <aside className="w-64 pr-8">
      <nav className="space-y-2">
        {categories.map((category, index) => (
          <div key={index}>
            {/* Add horizontal line before "OUTDOOR CUSHIONS & PILLOWS" */}
            {category.addLineAbove && (
              <hr className="my-3 border-gray-300" />
            )}
            <Link
              href={category.href}
              className={`block py-2 hover:text-accent transition-colors ${
                category.main 
                  ? "text-[14px] font-semibold font-['Montserrat',Verdana,Helvetica,sans-serif]" 
                  : "text-sm text-muted-foreground pl-4"
              }`}
            >
              {t(`outdoor.categories.${category.title.toLowerCase().replace(/\s+/g, "-")}`) || category.title}
            </Link>
            {/* Add horizontal lines after "SHOP ALL OUTDOOR" and "OUTDOOR FURNITURE" */}
            {(index === 0 || index === 1) && (
              <hr className="my-3 border-gray-300" />
            )}
            {/* Add horizontal line after "OUTDOOR CUSHIONS & PILLOWS" */}
            {category.title === "OUTDOOR CUSHIONS & PILLOWS" && (
              <hr className="my-3 border-gray-300" />
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default OutdoorSidebar;
