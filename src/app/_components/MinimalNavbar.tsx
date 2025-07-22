import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MinimalNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed w-full z-50 flex justify-center items-center py-7">
      <div className="flex gap-14">
        {['Home', 'About', 'Store', 'Account'].map((item) => {
          const href = `/${item.toLowerCase()}`;
          const isActive = pathname === href;
          
          return (
            <Link 
              key={item}
              href={href}
              className={`
                font-montserrat text-[16px] tracking-[0.05em] transition-all duration-300 hover:bg-foreground/10 px-4 py-2 rounded-full
                ${isActive ? 'text-[#2E3F3C]' : 'text-[#2E3F3C]/80 hover:text-[#2E3F3C]'}
              `}
            >
              {item}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}