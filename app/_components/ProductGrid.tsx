'use client'
import { Product } from '@/app/_utils/fetchProducts'
import { motion } from 'motion/react'
import Image from 'next/image'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative"
        >
          {/* Decorative background shapes */}
          <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-sky-blue-100 to-drover-100 opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500"></div>
          
          {/* Card content */}
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-sky-blue-100/30">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-drover-400 to-drover-300 rotate-45 transform origin-top-right"></div>
            </div>
            
            {/* Image container */}
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={product.images.edges[0]?.node.url || '/placeholder.jpg'}
                alt={product.images.edges[0]?.node.altText || product.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Floating shape */}
              <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-sky-blue-300/30 backdrop-blur-sm group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-500"></div>
              <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-drover-300/30 backdrop-blur-sm group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-500"></div>
            </div>
            
            {/* Content */}
            <div className="p-6 relative">
              <div className="h-1 w-10 bg-drover-400 rounded-full mb-3"></div>
              <h2 className="text-xl font-semibold text-sky-blue-800 mb-2 group-hover:text-sky-blue-600 transition-colors">{product.title}</h2>
              <p className="text-sky-blue-700 text-sm mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-sky-blue-700 to-drover-700 bg-clip-text text-transparent">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: product.priceRange.minVariantPrice.currencyCode,
                  }).format(parseFloat(product.priceRange.minVariantPrice.amount))}
                </span>
                
                <span className={`px-4 py-1 rounded-full text-sm ${
                  product.variants.edges[0]?.node.availableForSale
                    ? 'bg-drover-100 text-drover-800'
                    : 'bg-sky-blue-100 text-sky-blue-800'
                }`}>
                  {product.variants.edges[0]?.node.availableForSale ? 'In Stock' : 'Sold Out'}
                </span>
              </div>
              
              {/* Buy button (visible on hover) */}
              <div className="mt-4 overflow-hidden h-0 group-hover:h-10 transition-all duration-300">
                <button className="w-full py-2 px-4 bg-gradient-to-r from-sky-blue-600 to-sky-blue-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 