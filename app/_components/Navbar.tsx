'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-2 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
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
              <button className="p-2 hover:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <Link href="/cart" className="p-2 hover:text-gray-500 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>
          
          {/* Main navigation */}
          <nav className="flex justify-center space-x-8 py-3">
            {['Home', 'Shop', 'Blog'].map((item) => {
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
                  {item} {item === 'Home' || item === 'Shop' ? '•' : ''}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
} 