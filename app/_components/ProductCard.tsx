'use client';

import { Product } from '@/app/_utils/fetchProducts';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format price with currency
  const formatPrice = (amount: string, currency: string) => {
    const numAmount = parseFloat(amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numAmount);
  };

  // Get the first image from the product
  const imageUrl = product.images.edges.length > 0 
    ? product.images.edges[0].node.url 
    : '/product-placeholder.jpg';
  
  // Check if product is available
  const isAvailable = product.variants.edges.length > 0 && 
    product.variants.edges[0].node.availableForSale;

  // Check if product is on sale (for display purposes, would need actual data)
  const isOnSale = product.title.toLowerCase().includes('cream');
  const salePercentage = isOnSale ? '-7%' : '';

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/shop/${product.handle}`}>
        <div className="flex flex-col h-full">
          {/* Product image */}
          <div className="relative bg-[#f8f8f8] aspect-square mb-4">
            {/* Sale badge */}
            {isOnSale && (
              <div className="absolute top-2 left-2 bg-green-700 text-white text-xs px-2 py-1 z-10">
                {salePercentage}
              </div>
            )}
            
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
              className="object-contain p-6"
              priority
            />
          </div>
          
          {/* Product details */}
          <div className="flex flex-col flex-grow">
            <h3 className="text-sm text-gray-600 mb-1">{product.title}</h3>
            <div className="flex items-center mb-2">
              {/* Star Rating (for display only) */}
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center">
                {isOnSale ? (
                  <>
                    <span className="text-gray-400 line-through text-sm mr-2">
                      {formatPrice(
                        (parseFloat(product.priceRange.minVariantPrice.amount) * 1.07).toString(),
                        product.priceRange.minVariantPrice.currencyCode
                      )}
                    </span>
                    <span className="font-medium">
                      {formatPrice(
                        product.priceRange.minVariantPrice.amount,
                        product.priceRange.minVariantPrice.currencyCode
                      )}
                    </span>
                  </>
                ) : (
                  <span className="font-medium">
                    {formatPrice(
                      product.priceRange.minVariantPrice.amount,
                      product.priceRange.minVariantPrice.currencyCode
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 