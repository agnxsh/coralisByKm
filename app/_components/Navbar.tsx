'use client';

import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  // const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Free shipping banner */}
      {/* <div className="z-50 w-full py-1 text-center text-xs font-medium text-gray-800 fixed top-0 left-0 right-0">
        FREE SHIPPING ON ALL U.S. ORDERS $50+
      </div> */}
      
      <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Search */}
            <div className="w-1/4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type and hit enter"
                  className="w-full border border-gray-200 rounded pl-8 py-2 text-sm focus:outline-none focus:border-gray-300"
                />
                <Search className='absolute left-2 top-2.5 text-gray-400 h-5 w-5' />
              </div>
            </div>
            
            {/* Logo */}
            <div className="text-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 uppercase tracking-wider">
                CORALIS
              </Link>
            </div>
            
            {/* User tools */}
            <div className="w-1/4 flex justify-end">
              <Button variant='link' onClick={() => router.push('/account')} className="hover:text-gray-500">
                <User className='h-10 w-10' />
              </Button>
              <Button variant='link' className="hover:text-gray-500 relative">
                <ShoppingCart className='h-10 w-10' />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Button>
            </div>
          </div>
          
          {/* Main navigation */}
          <nav className="flex justify-center space-x-8 py-3">
            {['Home', 'Shop'].map((item) => {
              const href = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
              const isActive = pathname === href;
              
              return (
                <Link 
                  key={item}
                  href={href}
                  className={`
                    font-medium text-sm uppercase tracking-wider pb-3 border-b-2
                    ${isActive ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-800'}
                  `}
                >
                  {item}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
} 