import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { PRODUCTS } from './data';
import { Product, CartItem, ProductCategory } from './types';

import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import CategoryIndex from './components/CategoryIndex';
import CategoryPage from './components/CategoryPage';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState<'home' | 'shop'>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Scroll to top on first render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Page level change handler
  const handlePageChange = (page: 'home' | 'shop') => {
    setCurrentPage(page);
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to Bag Handler
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  // Buy Now Handler (Immediate cart addition and drawer opening)
  const handleBuyNow = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Remove from Bag Handler
  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Update Quantity Handler
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  // Clear Bag Handler
  const handleClearCart = () => {
    setCart([]);
  };

  // Toggle Favorite Wishlist Handler
  const handleToggleFavorite = (productId: string) => {
    setFavorites((prevFavs) =>
      prevFavs.includes(productId) ? prevFavs.filter((id) => id !== productId) : [...prevFavs, productId]
    );
  };

  return (
    <div className="bg-brand-ivory min-h-screen text-brand-wine relative font-sans select-text">
      
      {/* Premium Header / Navigation */}
      <Navbar
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        favoritesCount={favorites.length}
        setActiveSection={() => {}}
        activeSection="all"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div
            key="landing-page-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LandingPage
              onShopClick={() => handlePageChange('shop')}
            />
          </motion.div>
        ) : (
          <motion.div
            key="shop-page-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pt-32 pb-24 px-6 sm:px-12 lg:px-20 min-h-screen"
          >
            <div className="max-w-7xl mx-auto">
              <AnimatePresence mode="wait">
                {selectedCategory === null ? (
                  <motion.div
                    key="category-index-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CategoryIndex
                      onSelectCategory={setSelectedCategory}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={`category-page-${selectedCategory}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CategoryPage
                      category={selectedCategory}
                      products={PRODUCTS.filter((p) => p.category === selectedCategory)}
                      favorites={favorites}
                      onToggleFavorite={handleToggleFavorite}
                      onAddToCart={handleAddToCart}
                      onBuyNow={handleBuyNow}
                      onViewDetails={setSelectedProduct}
                      onBack={() => setSelectedCategory(null)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Symmetrical Premium Footer */}
      <Footer
        onSelectCollection={() => handlePageChange('shop')}
        setActiveSection={() => handlePageChange('shop')}
        onPageChange={handlePageChange}
      />

      {/* PRODUCT DETAILS MODAL DRAWER */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      {/* SHOPPING CART DRAWER PANEL */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
