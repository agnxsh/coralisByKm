import ProductCard from '@/app/_components/ProductCard';
import { fetchProducts } from '@/app/_utils/fetchProducts';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default async function ShopPage() {
  const products = await fetchProducts();

  // For display purposes, let's create featured and bestsellers sections
  // const featuredProducts = products.slice(0, 3);
  const bestsellers = products.slice(0, 5);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gray-100 mb-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="py-16">
            <h1 className="text-4xl md:text-5xl font-medium text-gray-900 leading-tight mb-4">
              Beachwear<br />for the whole family
            </h1>
            <p className="text-gray-600 mb-8 max-w-md">
              Rediscover the joy of beachwear with our collection of stylish and comfortable clothing.
            </p>
            <p className="text-gray-800 font-medium mb-6">Starting at $7.99</p>
            <Button className="">
              Shop Now
            </Button>
          </div>
          <div className="relative h-[300px] md:h-[500px]">
            <div className="absolute right-0 top-0 w-full h-full flex justify-center items-center">
              {/* This would be a product image on leaf background */}
              <div className="relative w-full h-full">
                <Image src="/model1.png" alt="Hero Banner" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Summer Collection */}
          <div className="bg-gray-100 p-6 flex flex-col relative justify-between overflow-hidden">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-1">Summer Collection</h3>
              <p className="text-gray-600 mb-4">Starting at $7.99</p>
            </div>
            <a href="#" className="text-gray-800 font-medium hover:text-gray-600 inline-flex items-center mt-4">
              Shop Now
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
            <div className="absolute flex-grow h-full w-full top-0 left-1/2">
              <Image src="/model5.png" alt="Summer Collection" fill className="object-cover" />
            </div>
          </div>

          {/* What's New? */}
          <div className="bg-[#e8eddf] p-6 flex flex-col relative justify-between overflow-hidden">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-1">What&apos;s New?</h3>
              <p className="text-gray-600 mb-4">Get the glow</p>
            </div>
            <a href="#" className="text-gray-800 font-medium hover:text-gray-600 inline-flex items-center mt-4">
              Discover Now
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
            <div className="absolute flex-grow h-full w-full top-0 left-1/2">
              <Image src="/model2.png" alt="Summer Collection" fill className="object-cover" />
            </div>
          </div>

          {/* Buy 1 Get 1 */}
          <div className="bg-[#f5eee1] p-6 flex flex-col relative justify-between overflow-hidden">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-1">Buy 1 Get 1</h3>
              <p className="text-gray-600 mb-4">Starting at $7.99</p>
            </div>
            <div className="flex-grow relative h-[220px]">
              {/* Product image would go here */}
            </div>
            <a href="#" className="text-gray-800 font-medium hover:text-gray-600 inline-flex items-center mt-4">
              Discover Now
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
            <div className="absolute flex-grow h-full w-full top-0 left-1/2">
              <Image src="/model3.png" alt="Summer Collection" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium text-gray-900">Our Bestsellers</h2>
          <a href="#" className="text-gray-600 hover:text-gray-900 inline-flex items-center">
            Shop All Products
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Under $25 Section */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium text-gray-900">Under $25</h2>
          <a href="#" className="text-gray-600 hover:text-gray-900 inline-flex items-center">
            Shop All Products
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}