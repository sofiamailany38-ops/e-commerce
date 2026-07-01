import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onExploreClick: () => void;
  onConciergeClick: () => void;
}

export default function Hero({ onExploreClick, onConciergeClick }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-brand-pink via-brand-ivory to-white pt-28 sm:pt-36 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden flex items-center justify-center">
      
      {/* Editorial Decorative Background Elements (No photos, purely elegant vectors and graphics) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        {/* Subtle circular geometry referring to planetary orbits / solar orbits */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full border border-brand-gold/15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[550px] sm:h-[550px] rounded-full border border-brand-pink-dark/25" />
        
        {/* Elegant structural grid lines of Parisian architecture */}
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-brand-pink-dark/10 hidden md:block" />
        <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-brand-pink-dark/10 hidden md:block" />
        <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-brand-pink-dark/10 hidden md:block" />
        <div className="absolute bottom-1/4 left-0 right-0 h-[1px] bg-brand-pink-dark/10 hidden md:block" />
      </div>

      {/* Floating abstract luxury organic shapes (emojis inside majestic containers) */}
      <div className="absolute left-[8%] top-[25%] hidden lg:block z-10">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-full bg-brand-ivory border border-brand-gold/30 shadow-md flex items-center justify-center text-2xl relative group"
        >
          <span>🌸</span>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[9px] uppercase tracking-widest text-brand-wine font-mono">
            Jasmine
          </div>
        </motion.div>
      </div>

      <div className="absolute right-[10%] top-[20%] hidden lg:block z-10">
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 rounded-full bg-brand-ivory border border-brand-pink-dark/30 shadow-md flex items-center justify-center text-3xl relative group"
        >
          <span>🌹</span>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[9px] uppercase tracking-widest text-brand-wine font-mono">
            Damask Rose
          </div>
        </motion.div>
      </div>

      <div className="absolute right-[12%] bottom-[15%] hidden lg:block z-10">
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-14 h-14 rounded-full bg-brand-ivory border border-brand-gold/30 shadow-md flex items-center justify-center text-xl relative group"
        >
          <span>🧴</span>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[9px] uppercase tracking-widest text-brand-wine font-mono">
            Satin Silk
          </div>
        </motion.div>
      </div>

      <div className="absolute left-[12%] bottom-[20%] hidden lg:block z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-full bg-brand-ivory border border-brand-pink-dark/30 shadow-md flex items-center justify-center text-2xl relative group"
        >
          <span>🍃</span>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[9px] uppercase tracking-widest text-brand-wine font-mono">
            Botanicals
          </div>
        </motion.div>
      </div>

      {/* Hero content container */}
      <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        
        {/* French poetry label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="h-[1px] w-8 bg-brand-gold" />
          <span className="text-[10px] sm:text-[11px] font-mono text-brand-gold uppercase tracking-[0.35em] font-medium">
            L’Éveil de la Beauté Eternelle
          </span>
          <div className="h-[1px] w-8 bg-brand-gold" />
        </motion.div>

        {/* Elegant Display Title */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-[38px] sm:text-[54px] lg:text-[72px] leading-[1.1] text-brand-wine tracking-tight mb-8"
        >
          Symphonies of Rose <br />
          <span className="italic font-normal text-brand-gold">and Sacred Wood</span>
        </motion.h2>

        {/* Brand Editorial Concept Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-sans text-brand-wine/80 text-[14px] sm:text-[17px] leading-relaxed max-w-2xl tracking-[0.02em] font-light mb-12"
        >
          Step into Maison Élise, a sanctuary of pure Parisian scent extraction and cell-nourishing skincare rituals. Handcrafted absolutes and plant ceramides blended to inspire timeless confidence, timeless sillage, and a soft velvet radiance.
        </motion.p>

        {/* Luxurious Editorial Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md"
        >
          <button
            onClick={onExploreClick}
            className="group w-full sm:w-auto bg-brand-wine text-white text-[12px] uppercase tracking-[0.25em] py-4.5 px-10 rounded-full hover:bg-brand-wine-light transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 active:scale-98"
          >
            <span>Explore The Collection</span>
            <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
          
          <button
            onClick={onConciergeClick}
            className="group w-full sm:w-auto bg-white/70 backdrop-blur-sm text-brand-wine border border-brand-pink-dark/40 text-[12px] uppercase tracking-[0.25em] py-4.5 px-10 rounded-full hover:bg-brand-pink/50 transition-all duration-300 flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Virtual Skin Concierge</span>
          </button>
        </motion.div>

        {/* Minimalist Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="mt-20 flex flex-col items-center gap-2 cursor-pointer"
          onClick={onExploreClick}
        >
          <span className="text-[9px] uppercase tracking-[0.25em] text-brand-wine/60 font-mono">
            Scroll down to enter
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-wine to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
