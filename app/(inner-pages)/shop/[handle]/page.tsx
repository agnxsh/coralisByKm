
import { fetchProducts } from '@/app/_utils/fetchProducts';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';


export default async function ProductDetailPage({ params }: {params: any}) {
  const { handle } = await params;
  const products = await fetchProducts();
  const product = products.find(p => p.handle === handle);

  if (!product) {
    notFound();
  }

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

  // Check if product is available
  const isAvailable = product.variants.edges.length > 0 && 
    product.variants.edges[0].node.availableForSale;

  // Get the product image
  const imageUrl = product.images.edges.length > 0 
    ? product.images.edges[0].node.url 
    : '/product-placeholder.jpg';

  // Check if product is on sale (for display purposes)
  const isOnSale = product.title.toLowerCase().includes('cream');
  const discountPrice = isOnSale ? (parseFloat(product.priceRange.minVariantPrice.amount) * 1.07).toString() : '';

  return (
    <main className="bg-white pt-28 pb-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 mb-8">
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-gray-700">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product image */}
          <div className="bg-[#f8f8f8]">
            <div className="relative aspect-square">
              <Image
                src={imageUrl}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-12"
                priority
              />
            </div>
          </div>
          
          {/* Product details */}
          <div className="flex flex-col py-6">
            <h1 className="text-2xl font-medium text-gray-900 mb-2">{product.title}</h1>
            
            {/* Price */}
            <div className="flex items-center mb-4">
              {isOnSale ? (
                <>
                  <span className="text-gray-400 line-through text-lg mr-2">
                    {formatPrice(
                      discountPrice,
                      product.priceRange.minVariantPrice.currencyCode
                    )}
                  </span>
                  <span className="text-xl font-medium text-gray-900">
                    {formatPrice(
                      product.priceRange.minVariantPrice.amount,
                      product.priceRange.minVariantPrice.currencyCode
                    )}
                  </span>
                </>
              ) : (
                <span className="text-xl font-medium text-gray-900">
                  {formatPrice(
                    product.priceRange.minVariantPrice.amount,
                    product.priceRange.minVariantPrice.currencyCode
                  )}
                </span>
              )}
            </div>
            
            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">4 reviews</span>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
            
            {/* Add to cart */}
            <div className="flex flex-col space-y-4 mb-8">
              {/* Quantity selector */}
              <div className="flex border border-gray-300 w-32">
                <button className="flex-1 py-2 px-4 text-center text-gray-500 hover:bg-gray-100">-</button>
                <div className="flex-1 py-2 px-4 text-center border-x border-gray-300">1</div>
                <button className="flex-1 py-2 px-4 text-center text-gray-500 hover:bg-gray-100">+</button>
              </div>
              
              {/* Add to cart button */}
              <button 
                className="bg-black text-white py-3 px-6 font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                disabled={!isAvailable}
              >
                {isAvailable ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
            
            {/* Additional info */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center">
                <span className="w-24 text-sm text-gray-500">SKU:</span>
                <span className="text-sm">PRD-{product.id.substring(0, 8)}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm text-gray-500">Category:</span>
                <span className="text-sm">Skincare</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm text-gray-500">Tags:</span>
                <span className="text-sm">Beauty, Skin, Care</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related products section */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-medium text-gray-900 mb-8 text-center">Related Products</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((relatedProduct) => (
              <Link href={`/shop/${relatedProduct.handle}`} key={relatedProduct.id} className="group">
                <div className="flex flex-col h-full">
                  {/* Product image */}
                  <div className="relative bg-[#f8f8f8] aspect-square mb-4">
                    <Image
                      src={
                        relatedProduct.images.edges.length > 0 
                          ? relatedProduct.images.edges[0].node.url 
                          : '/product-placeholder.jpg'
                      }
                      alt={relatedProduct.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-contain p-6"
                    />
                  </div>
                  
                  {/* Product details */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-sm text-gray-600 mb-1">{relatedProduct.title}</h3>
                    <div className="flex items-center mb-2">
                      {/* Star rating */}
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="mt-auto">
                      <span className="font-medium">
                        {formatPrice(
                          relatedProduct.priceRange.minVariantPrice.amount,
                          relatedProduct.priceRange.minVariantPrice.currencyCode
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}