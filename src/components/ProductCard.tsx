import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  key?: string;
}

export default function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
  isFavorite,
  onToggleFavorite
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white border border-brand-pink-dark/15 rounded-[24px] p-6 flex flex-col justify-between h-[510px] sm:h-[530px] transition-all duration-500 hover:border-brand-gold/50 hover:shadow-[0_12px_24px_-10px_rgba(60,8,17,0.06)] overflow-hidden"
    >
      {/* Decorative Gold Corner Accent on Hover */}
      <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[1px] h-6 bg-brand-gold/30 group-hover:h-8 transition-all duration-500" />
        <div className="absolute top-0 right-0 h-[1px] w-6 bg-brand-gold/30 group-hover:w-8 transition-all duration-500" />
      </div>

      {/* Top Banner Area (Badge and Favorite toggle) */}
      <div className="flex justify-between items-start z-10">
        <div>
          {product.badge ? (
            <span className="bg-brand-pink text-brand-wine text-[9px] font-mono font-medium uppercase tracking-widest px-3 py-1.5 rounded-full border border-brand-pink-dark/15">
              {product.badge}
            </span>
          ) : (
            <span className="text-[9px] font-mono text-brand-wine/45 uppercase tracking-widest">
              {product.category}
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`p-2.5 rounded-full border transition-all duration-300 ${
            isFavorite
              ? 'bg-brand-pink border-brand-pink-dark/30 text-brand-wine'
              : 'bg-brand-ivory border-brand-pink-dark/10 text-brand-wine/45 hover:text-brand-wine hover:border-brand-pink-dark/30'
          }`}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={14} className={isFavorite ? 'fill-brand-wine stroke-brand-wine' : 'stroke-[1.5]'} />
        </button>
      </div>

      {/* Abstract Elegant Product Image (Centered Emoji Graphic Container) */}
      <div
        onClick={() => onViewDetails(product)}
        className="cursor-pointer relative my-4 flex-1 flex items-center justify-center group/graphic"
      >
        {/* Soft Pink Ambient Radial Glow */}
        <div className="absolute w-28 h-28 rounded-full bg-brand-pink/50 blur-lg scale-90 group-hover/graphic:scale-110 transition-all duration-500" />
        
        {/* Fine gold border circular frame */}
        <div className="absolute w-24 h-24 rounded-full border border-brand-gold/20 flex items-center justify-center transition-all duration-700 group-hover/graphic:rotate-45" />
        <div className="absolute w-28 h-28 rounded-full border border-brand-pink-dark/15 scale-90 group-hover/graphic:scale-100 transition-all duration-500" />

        {/* Floating Core Emoji */}
        <div className="relative text-[48px] sm:text-[54px] transform group-hover/graphic:scale-115 transition-transform duration-500 select-none">
          {product.emoji}
        </div>

        {/* Quick View Button Overlay */}
        <div className="absolute bottom-1 bg-brand-wine/90 backdrop-blur-xs text-white py-2 px-4 rounded-full text-[9px] uppercase tracking-widest opacity-0 group-hover/graphic:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/graphic:translate-y-0 flex items-center gap-1.5">
          <Eye size={10} />
          <span>Quick View</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-2 border-t border-brand-pink/20">
        
        {/* Rating and Reviews Count */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-brand-gold">
            <Star size={11} className="fill-brand-gold" />
          </div>
          <span className="text-[10px] font-mono text-brand-wine/80">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[9px] font-mono text-brand-wine/45">
            ({product.reviewsCount} reviews)
          </span>
        </div>

        {/* Product Title */}
        <h4
          onClick={() => onViewDetails(product)}
          className="cursor-pointer font-serif text-[18px] sm:text-[20px] text-brand-wine tracking-wide hover:text-brand-gold transition-colors duration-300 truncate"
        >
          {product.name}
        </h4>

        {/* Volume & Concentration (Mono Font) */}
        <div className="text-[10px] font-mono text-brand-gold uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>{product.concentration}</span>
          <span className="text-brand-wine/45 font-light">{product.volume}</span>
        </div>

        {/* Subtitle / Tagline */}
        <p className="font-sans text-[11px] sm:text-[12px] text-brand-wine/65 leading-normal font-light tracking-wide line-clamp-2 h-8 mb-4">
          {product.tagline}
        </p>

        {/* Ingredient/Olfactory Highlights (Ultra luxury touch) */}
        <div className="bg-brand-pink/15 rounded-lg p-2 mb-4 font-mono text-[9px] text-brand-wine/60 tracking-wider">
          {product.category === 'perfumes' && product.olfactoryNotes ? (
            <div className="truncate">
              <span className="text-brand-wine/45 font-semibold">Notes:</span> {product.olfactoryNotes.top} • {product.olfactoryNotes.heart}
            </div>
          ) : (
            <div className="truncate">
              <span className="text-brand-wine/45 font-semibold">Active:</span> {product.ingredients.slice(1, 4).join(', ')}
            </div>
          )}
        </div>
      </div>

      {/* Product Footer (Price and Add to Bag) */}
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-brand-pink/10">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-brand-wine/45 block leading-none">Price</span>
          <span className="font-mono text-[14px] sm:text-[16px] text-brand-wine font-medium">
            ${product.price}.00
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="bg-brand-wine hover:bg-brand-wine-light text-white rounded-full py-2.5 px-4.5 sm:px-5 transition-all duration-300 text-[10px] uppercase tracking-widest font-mono flex items-center gap-1.5 shadow-sm active:scale-95"
        >
          <ShoppingBag size={11} />
          <span>Add</span>
        </button>
      </div>
    </motion.div>
  );
}
