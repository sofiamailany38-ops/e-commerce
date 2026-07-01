import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  favoritesCount: number;
  setActiveSection: (section: string) => void;
  activeSection: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentPage: 'home' | 'shop';
  onPageChange: (page: 'home' | 'shop') => void;
}

export default function Navbar({
  cart,
  setIsCartOpen,
  favoritesCount,
  currentPage,
  onPageChange
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Home & Shop page level links
  const pageItems = [
    { label: 'Home', id: 'home' as const },
    { label: 'Shop', id: 'shop' as const }
  ];

  const handleNavClick = (pageId: 'home' | 'shop') => {
    onPageChange(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Main Luxury Navigation Bar */}
      <nav
        className={`w-full transition-all duration-500 border-b border-brand-pink/20 ${
          isScrolled
            ? 'bg-brand-ivory/95 backdrop-blur-md py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-center">
          
          {/* Left Action Elements: Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {pageItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-[12px] uppercase tracking-[0.2em] transition-colors relative pb-1 font-medium cursor-pointer ${
                    isActive ? 'text-brand-wine font-semibold' : 'text-brand-wine/75 hover:text-brand-wine'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activePageLine"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-gold"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-wine p-1 focus:outline-none cursor-pointer"
              aria-label="Menu"
            >
              <Menu size={20} className="stroke-[1.5]" />
            </button>
          </div>

          {/* Centered Brand Signature Typography */}
          <div className="text-center flex flex-col items-center">
            <button
              onClick={() => {
                onPageChange('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="focus:outline-none group cursor-pointer"
            >
              <h1 className="font-serif text-[20px] sm:text-[28px] text-brand-wine tracking-[0.18em] uppercase transition-all duration-300 select-none">
                Maison Élise
              </h1>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.4em] text-brand-gold block font-mono -mt-1 group-hover:tracking-[0.5em] transition-all duration-500">
                Haute Parfumerie & Cosmétique
              </span>
            </button>
          </div>

          {/* Right Action Elements: Wishlist, Bag */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* Wishlist Icon */}
            <button
              onClick={() => {
                onPageChange('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-brand-wine hover:text-brand-gold transition-colors p-1 relative cursor-pointer"
              aria-label="Favorites"
            >
              <Heart size={18} className={`stroke-[1.5] ${favoritesCount > 0 ? 'fill-brand-wine stroke-brand-wine' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-brand-pink-dark text-brand-wine font-mono text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon with elegant micro-badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-brand-wine hover:text-brand-gold transition-colors p-1 relative flex items-center gap-1.5 cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingBag size={18} className="stroke-[1.5]" />
              <span className="hidden sm:inline-block text-[11px] tracking-[0.1em] uppercase font-mono text-brand-wine/80">Bag</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-wine text-white font-mono text-[8px] font-semibold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-brand-ivory border-b border-brand-pink/30 shadow-md py-6 px-8 flex flex-col space-y-4 lg:hidden"
          >
            {pageItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleNavClick(item.id);
                  }}
                  className={`text-[14px] uppercase tracking-[0.25em] text-left py-2 border-b border-brand-pink/15 transition-colors cursor-pointer ${
                    isActive ? 'text-brand-wine font-bold text-brand-gold' : 'text-brand-wine/80'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {item.label}
                    <ArrowRight size={14} className="opacity-45" />
                  </span>
                </button>
              );
            })}
            
            <div className="pt-4 flex justify-between items-center text-[11px] text-brand-wine/60 tracking-[0.15em] uppercase font-mono">
              <span>Maison Élise - International</span>
              <span>EN | USD</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
