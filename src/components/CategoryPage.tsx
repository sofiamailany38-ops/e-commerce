import { motion } from 'motion/react';
import { ArrowLeft, ShoppingBag, Heart, Star, Zap, Eye } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { CATEGORY_DETAILS } from './CategoryIndex';

interface CategoryPageProps {
  category: ProductCategory;
  products: Product[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  onBack: () => void;
}

export default function CategoryPage({
  category,
  products,
  favorites,
  onToggleFavorite,
  onAddToCart,
  onBuyNow,
  onViewDetails,
  onBack
}: CategoryPageProps) {
  const details = CATEGORY_DETAILS.find((c) => c.id === category) || {
    name: category,
    emoji: '✨',
    tagline: 'Exclusive Haute Formulations',
    description: 'A dedicated collection crafted with unmatched precision.'
  };

  return (
    <div className="w-full">
      {/* Back Button and Navigation Path */}
      <div className="max-w-7xl mx-auto mb-12">
        <button
          onClick={onBack}
          className="group flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-[0.2em] text-brand-wine/60 hover:text-brand-wine transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Category Index</span>
        </button>
      </div>

      {/* Elegant Header Area */}
      <div className="text-center mb-16 flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-mono mb-2 block select-none">
          Maison Élise Archives
        </span>
        <h2 className="font-serif text-[36px] sm:text-[48px] text-brand-wine tracking-tight mb-4">
          {details.emoji} {details.name}
        </h2>
        <div className="w-20 h-[1px] bg-brand-pink-dark/50 mb-6" />
        <p className="text-brand-gold text-[11px] sm:text-[13px] uppercase tracking-[0.25em] font-mono mb-4 font-semibold">
          {details.tagline}
        </p>
        <p className="font-sans text-[13.5px] text-brand-wine/70 font-light leading-relaxed max-w-2xl">
          {details.description}
        </p>
      </div>

      {/* Responsive Grid containing exactly 5 exclusive products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 max-w-7xl mx-auto">
        {products.map((product, idx) => {
          const isFavorite = favorites.includes(product.id);
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative bg-white border border-brand-pink-dark/15 rounded-[28px] p-8 flex flex-col justify-between hover:border-brand-gold/40 hover:shadow-xl transition-all duration-500 min-h-[580px]"
            >
              {/* Symmetrical fine gold border corner details */}
              <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[1px] h-6 bg-brand-gold/25 group-hover:h-8 transition-all duration-500" />
                <div className="absolute top-0 right-0 h-[1px] w-6 bg-brand-gold/25 group-hover:w-8 transition-all duration-500" />
              </div>

              {/* Top Row: Brand Label and Wishlist button */}
              <div className="flex justify-between items-start z-10 mb-4">
                <div>
                  {product.badge ? (
                    <span className="bg-brand-pink text-brand-wine text-[9px] font-mono font-medium uppercase tracking-widest px-3 py-1.5 rounded-full border border-brand-pink-dark/15">
                      {product.badge}
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono text-brand-wine/45 uppercase tracking-widest">
                      Maison Élise • Exclusive
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className={`p-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                    isFavorite
                      ? 'bg-brand-pink border-brand-pink-dark/35 text-brand-wine'
                      : 'bg-brand-ivory border-brand-pink-dark/10 text-brand-wine/40 hover:text-brand-wine hover:border-brand-pink-dark/30'
                  }`}
                  aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={14} className={isFavorite ? 'fill-brand-wine stroke-brand-wine' : 'stroke-[1.5]'} />
                </button>
              </div>

              {/* Emoji Placeholder Container (Visual Centerpiece) */}
              <div
                onClick={() => onViewDetails(product)}
                className="cursor-pointer relative my-6 flex-1 flex items-center justify-center group/graphic"
              >
                {/* Soft glow */}
                <div className="absolute w-28 h-28 rounded-full bg-brand-pink/55 blur-lg scale-90 group-hover/graphic:scale-110 transition-all duration-500" />
                <div className="absolute w-24 h-24 rounded-full border border-brand-gold/20 flex items-center justify-center transition-all duration-700 group-hover/graphic:rotate-45" />
                <div className="absolute w-28 h-28 rounded-full border border-brand-pink-dark/10 scale-90 group-hover/graphic:scale-100 transition-all duration-500" />

                {/* Huge Core Emoji */}
                <div className="relative text-[60px] sm:text-[68px] transform group-hover/graphic:scale-115 transition-transform duration-500 select-none">
                  {product.emoji}
                </div>

                {/* Quick View trigger */}
                <div className="absolute bottom-1 bg-brand-wine/90 backdrop-blur-xs text-white py-2 px-4 rounded-full text-[9px] uppercase tracking-widest opacity-0 group-hover/graphic:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/graphic:translate-y-0 flex items-center gap-1.5">
                  <Eye size={10} />
                  <span>Discover Formula</span>
                </div>
              </div>

              {/* Product Info Section */}
              <div className="pt-4 border-t border-brand-pink/15">
                {/* Rating & Reviews */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-brand-gold">
                    <Star size={11} className="fill-brand-gold" />
                  </div>
                  <span className="text-[10.5px] font-mono text-brand-wine/85">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-[9.5px] font-mono text-brand-wine/45">
                    ({product.reviewsCount} verified reviews)
                  </span>
                </div>

                {/* Name */}
                <h4
                  onClick={() => onViewDetails(product)}
                  className="cursor-pointer font-serif text-[20px] sm:text-[22px] text-brand-wine tracking-wide hover:text-brand-gold transition-colors duration-300 truncate mb-1"
                >
                  {product.name}
                </h4>

                {/* Size and Concentration */}
                <div className="text-[10px] font-mono text-brand-gold uppercase tracking-wider mb-3.5 flex items-center justify-between">
                  <span>{product.concentration || 'Concentrated'}</span>
                  <span className="text-brand-wine/50 font-light">{product.volume}</span>
                </div>

                {/* Short Description */}
                <p className="font-sans text-[12px] sm:text-[13px] text-brand-wine/65 leading-relaxed font-light tracking-wide mb-5 line-clamp-3 min-h-[54px]">
                  {product.description}
                </p>

                {/* Key Active Elements highlight */}
                <div className="bg-brand-pink/10 rounded-xl p-2.5 mb-5 font-mono text-[9.5px] text-brand-wine/65 tracking-wider">
                  <span className="text-brand-wine/50 font-bold">Atelier Composition:</span>{' '}
                  {product.ingredients.slice(0, 3).join(' • ')}
                </div>
              </div>

              {/* Lower Section: Price, and Interactive Buttons */}
              <div className="pt-4 border-t border-brand-pink/10 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-brand-wine/45 block leading-none mb-1">Volume Value</span>
                    <span className="font-mono text-[16px] sm:text-[18px] text-brand-wine font-medium">
                      ${product.price}.00
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-widest">
                    {product.volume}
                  </span>
                </div>

                {/* CTA Buttons: Add to Cart and Buy Now side-by-side */}
                <div className="grid grid-cols-2 gap-3 mt-1">
                  {/* Add to Cart */}
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-white hover:bg-brand-pink/20 text-brand-wine border border-brand-wine/30 rounded-full py-3 transition-all duration-300 text-[10px] uppercase tracking-widest font-mono flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag size={12} />
                    <span>Add To Cart</span>
                  </button>

                  {/* Buy Now */}
                  <button
                    onClick={() => onBuyNow(product)}
                    className="w-full bg-brand-wine hover:bg-brand-wine-light text-white rounded-full py-3 transition-all duration-300 text-[10px] uppercase tracking-widest font-mono flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer font-semibold"
                  >
                    <Zap size={12} className="fill-current" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
