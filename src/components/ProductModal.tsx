import { X, ShoppingBag, Star, RefreshCw, Compass, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      
      {/* Backdrop with elegant blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-brand-wine/45 backdrop-blur-md"
      />

      {/* Modal Card Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative bg-brand-ivory border border-brand-gold/25 rounded-[32px] shadow-2xl max-w-4xl w-full max-h-[90vh] md:max-h-[85vh] overflow-y-auto flex flex-col md:flex-row z-10"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2.5 bg-white border border-brand-pink-dark/15 text-brand-wine hover:text-brand-gold hover:border-brand-gold/40 rounded-full transition-all duration-300"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Left Side: Editorial Presentation (Large Emoji & Decorative Seals) */}
        <div className="w-full md:w-[42%] bg-brand-pink/35 p-8 md:p-12 flex flex-col justify-between items-center relative border-b md:border-b-0 md:border-r border-brand-pink-dark/15 min-h-[300px] md:min-h-0">
          
          {/* Decorative Parisian Frame */}
          <div className="absolute inset-4 border border-brand-pink-dark/10 pointer-events-none rounded-[20px]" />
          <div className="absolute inset-5 border border-brand-gold/10 pointer-events-none rounded-[16px]" />

          <div className="w-full text-center z-10">
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-brand-gold">
              Maison Élise Paris
            </span>
          </div>

          {/* Large Emoji Centerpiece */}
          <div className="relative my-auto flex items-center justify-center z-10">
            <div className="absolute w-44 h-44 rounded-full bg-white/60 blur-xl scale-95" />
            <div className="absolute w-36 h-36 rounded-full border border-brand-gold/20 animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-40 h-40 rounded-full border border-brand-pink-dark/15" />
            <div className="relative text-[84px] sm:text-[96px] select-none hover:scale-105 transition-transform duration-500">
              {product.emoji}
            </div>
          </div>

          {/* Technical Specs Footer */}
          <div className="text-center z-10 w-full">
            <div className="text-[11px] font-mono text-brand-wine uppercase tracking-[0.2em] mb-1">
              {product.volume}
            </div>
            <div className="text-[10px] font-mono text-brand-gold uppercase tracking-[0.15em]">
              Made in France ℮ Batch #75001
            </div>
          </div>
        </div>

        {/* Right Side: Product Details & Luxury Descriptions */}
        <div className="w-full md:w-[58%] p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Category Banner */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand-gold font-medium">
                {product.category}
              </span>
              <span className="text-[8px] text-brand-pink-dark/50">•</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand-wine/70">
                {product.concentration}
              </span>
            </div>

            {/* Title & Tagline */}
            <h3 className="font-serif text-[28px] sm:text-[36px] text-brand-wine leading-tight tracking-wide mb-3">
              {product.name}
            </h3>
            <p className="font-sans text-[13px] sm:text-[14px] text-brand-gold italic leading-relaxed tracking-wide mb-6">
              {product.tagline}
            </p>

            {/* Rating Stars and Count */}
            <div className="flex items-center gap-1.5 mb-6 pb-4 border-b border-brand-pink/25">
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-brand-gold" />
                ))}
              </div>
              <span className="text-[11px] font-mono text-brand-wine font-medium">
                {product.rating.toFixed(1)} / 5.0
              </span>
              <span className="text-[10px] font-mono text-brand-wine/45">
                (Verified Luxury Review Circle: {product.reviewsCount} buyers)
              </span>
            </div>

            {/* Deep Description */}
            <p className="font-sans text-[12px] sm:text-[13px] text-brand-wine/80 leading-relaxed font-light tracking-wide mb-6">
              {product.description}
            </p>

            {/* Conditional Content: Olfactory Pyramid or Skincare Active Ingredients */}
            {product.category === 'perfumes' && product.olfactoryNotes ? (
              <div className="mb-6 bg-white border border-brand-pink-dark/10 rounded-[16px] p-5">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-gold mb-3.5 border-b border-brand-pink/25 pb-1.5">
                  Olfactory Symphony
                </h4>
                <div className="space-y-3">
                  <div className="flex text-[11px] justify-between">
                    <span className="font-mono text-brand-wine/40 uppercase tracking-widest text-[9px]">Top notes</span>
                    <span className="font-sans text-brand-wine font-light text-right">{product.olfactoryNotes.top}</span>
                  </div>
                  <div className="flex text-[11px] justify-between border-t border-brand-pink/10 pt-2">
                    <span className="font-mono text-brand-wine/40 uppercase tracking-widest text-[9px]">Heart notes</span>
                    <span className="font-sans text-brand-wine font-medium text-right text-brand-wine">{product.olfactoryNotes.heart}</span>
                  </div>
                  <div className="flex text-[11px] justify-between border-t border-brand-pink/10 pt-2">
                    <span className="font-mono text-brand-wine/40 uppercase tracking-widest text-[9px]">Base notes</span>
                    <span className="font-sans text-brand-wine font-light text-right">{product.olfactoryNotes.base}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6 bg-white border border-brand-pink-dark/10 rounded-[16px] p-5">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-gold mb-3 border-b border-brand-pink/25 pb-1.5">
                  Cellular Botanical Actives
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.slice(0, 6).map((ing, idx) => (
                    <span
                      key={idx}
                      className="bg-brand-pink/30 text-brand-wine/85 font-mono text-[9px] uppercase tracking-wider px-2.5 py-1.2 rounded-md border border-brand-pink-dark/10"
                    >
                      {ing.replace(/ \(Water\)| \(Evening Primrose\)| Seed Oil| Fruit Oil/g, '')}
                    </span>
                  ))}
                  <span className="font-mono text-[9px] text-brand-wine/45 self-center ml-1">
                    + {product.ingredients.length - 6} more premium molecules
                  </span>
                </div>
              </div>
            )}

            {/* Application Ritual (High End feature) */}
            <div className="mb-8 border-l-2 border-brand-gold/40 pl-4 py-1">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-gold mb-1.5 flex items-center gap-1.5">
                <Compass size={11} className="text-brand-gold" />
                <span>The Application Ritual</span>
              </h4>
              <p className="font-sans text-[11px] sm:text-[12px] text-brand-wine/70 leading-relaxed font-light tracking-wide italic">
                {product.applicationRitual}
              </p>
            </div>
          </div>

          {/* Footer Action area: Price and Add to Bag */}
          <div className="flex items-center justify-between gap-6 pt-4 border-t border-brand-pink/20">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-brand-wine/45 block leading-none">Total Essence Price</span>
              <span className="font-mono text-[22px] sm:text-[24px] text-brand-wine font-medium">
                ${product.price}.00
              </span>
            </div>

            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="bg-brand-wine hover:bg-brand-wine-light text-white rounded-full py-4 px-8 transition-all duration-300 text-[11px] uppercase tracking-[0.25em] font-mono flex items-center justify-center gap-3 shadow-md flex-1 active:scale-98"
            >
              <ShoppingBag size={13} />
              <span>Add to Shopping Bag</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
