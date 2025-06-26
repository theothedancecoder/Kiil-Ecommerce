"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/lib/languageContext";

interface ProductVariant {
  name: string;
  image: string;
  color: string;
}

interface ProductVariantDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    variants: ProductVariant[];
  };
}

const ProductVariantDialog = ({ isOpen, onClose, product }: ProductVariantDialogProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeImageView = () => {
    setSelectedImage(null);
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-['Montserrat', 'Helvetica', 'Verdana'] text-[#212529] mb-4">
            {product.name} - {t('montana.variants.title')}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.variants.map((variant, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div 
                className="relative h-48 cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleImageClick(variant.image)}
              >
                <Image
                  src={variant.image}
                  alt={`${product.name} in ${variant.color}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-['Montserrat', 'Helvetica', 'Verdana'] text-[#212529] mb-2">
                  {variant.color}
                </h3>
              </div>
            </div>
          ))}
        </div>
        </DialogContent>
      </Dialog>

      {/* Full-size Image Dialog */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={closeImageView}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage}
                alt="Full size product view"
                fill
                className="object-contain"
                priority
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ProductVariantDialog;
