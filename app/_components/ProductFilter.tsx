'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

// Filter categories with options
const filterOptions = {
  categories: ['All', 'New Arrivals', 'Best Sellers', 'Accessories', 'Apparel'],
  price: ['All', 'Under $50', '$50 - $100', '$100 - $200', 'Over $200'],
  colors: ['All', 'Black', 'White', 'Blue', 'Green', 'Red', 'Gold', 'Silver'],
};

export default function ProductFilter() {
  const [activeFilters, setActiveFilters] = useState({
    categories: 'All',
    price: 'All',
    colors: 'All',
  });

  // Handle filter changes
  const handleFilterChange = (category: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  return (
    <motion.div 
      className="card p-8 sticky top-32 border-sky-blue-100/30 bg-white/90 backdrop-blur-md"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-medium text-foreground mb-8 border-b border-sky-blue-100/50 pb-3">Filters</h2>
      
      {/* Categories Filter */}
      <div className="mb-8">
        <h3 className="text-md font-medium text-foreground/80 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M4 7V4h16v3"></path>
            <path d="M9 20h6"></path>
            <path d="M12 4v16"></path>
          </svg>
          Categories
        </h3>
        <div className="space-y-1">
          {filterOptions.categories.map((category) => (
            <FilterItem 
              key={category}
              label={category}
              isActive={activeFilters.categories === category}
              onClick={() => handleFilterChange('categories', category)}
            />
          ))}
        </div>
      </div>
      
      {/* Price Filter */}
      <div className="mb-8">
        <h3 className="text-md font-medium text-foreground/80 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          Price Range
        </h3>
        <div className="space-y-1">
          {filterOptions.price.map((range) => (
            <FilterItem 
              key={range}
              label={range}
              isActive={activeFilters.price === range}
              onClick={() => handleFilterChange('price', range)}
            />
          ))}
        </div>
      </div>
      
      {/* Colors Filter */}
      <div className="mb-9">
        <h3 className="text-md font-medium text-foreground/80 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <circle cx="13.5" cy="6.5" r="4.5"></circle>
            <circle cx="6.5" cy="17.5" r="4.5"></circle>
            <circle cx="17.5" cy="17.5" r="4.5"></circle>
          </svg>
          Colors
        </h3>
        <div className="flex flex-wrap gap-3">
          {filterOptions.colors.map((color) => (
            <ColorItem 
              key={color}
              color={color}
              isActive={activeFilters.colors === color}
              onClick={() => handleFilterChange('colors', color)}
            />
          ))}
        </div>
      </div>
      
      {/* Apply Filters Button */}
      <button 
        className="w-full h-12 rounded-full bg-primary text-primary-foreground font-medium
        shadow-lg transition-all hover:bg-primary/90 flex items-center justify-center"
      >
        Apply Filters
      </button>
      
      {/* Reset Filters Button */}
      <button 
        className="mt-3 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
        onClick={() => setActiveFilters({
          categories: 'All',
          price: 'All',
          colors: 'All',
        })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
          <path d="M3 3v5h5"></path>
        </svg>
        Reset All Filters
      </button>
    </motion.div>
  );
}

// Filter Item Component
interface FilterItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterItem({ label, isActive, onClick }: FilterItemProps) {
  return (
    <button
      className={`w-full text-left py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center ${
        isActive 
          ? 'bg-primary/10 text-primary font-medium' 
          : 'hover:bg-sky-blue-50 text-foreground/70'
      }`}
      onClick={onClick}
    >
      {isActive && (
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mr-2 h-2 w-2 rounded-full bg-primary" 
        />
      )}
      {label}
    </button>
  );
}

// Color Item Component
interface ColorItemProps {
  color: string;
  isActive: boolean;
  onClick: () => void;
}

function ColorItem({ color, isActive, onClick }: ColorItemProps) {
  // Skip rendering color swatch for "All"
  if (color === 'All') {
    return (
      <button
        className={`py-1.5 px-4 rounded-full border transition-all duration-200 ${
          isActive 
            ? 'bg-primary/10 text-primary border-primary font-medium' 
            : 'border-foreground/10 text-foreground/70 hover:border-foreground/30'
        }`}
        onClick={onClick}
      >
        All
      </button>
    );
  }
  
  // Get appropriate background color based on color name
  const getColorClass = (colorName: string) => {
    const colorMap: Record<string, string> = {
      Black: 'bg-black',
      White: 'bg-white border border-gray-200',
      Blue: 'bg-sky-blue-500',
      Green: 'bg-emerald-500',
      Red: 'bg-red-500',
      Gold: 'bg-amber-400',
      Silver: 'bg-gray-300',
    };
    
    return colorMap[colorName] || 'bg-gray-200';
  };
  
  return (
    <button
      className={`relative h-9 w-9 rounded-full transition-all duration-200 ${getColorClass(color)} shadow-sm hover:shadow`}
      onClick={onClick}
      aria-label={color}
      title={color}
    >
      {isActive && (
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 border-2 border-primary rounded-full"
        />
      )}
    </button>
  );
} 