import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ProductCategory } from '../types';

interface CategoryIndexProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CATEGORY_DETAILS = [
  {
    id: 'perfumes' as ProductCategory,
    name: 'Perfumes',
    emoji: '🌸',
    tagline: 'Symphonies of rare extraits and slow-macerated floral absolutes',
    description: 'An elite curation of haute perfumery. Meticulously distilled from precious botanical extracts and aged to unlock hypnotic, multi-layered trails.',
    count: '5 Exclusive Essences'
  },
  {
    id: 'daily-moisturizers' as ProductCategory,
    name: 'Daily Moisturizers',
    emoji: '🧴',
    tagline: 'Weightless cell-plumping emulsions for continuous hydration',
    description: 'Mimicking the soft, light-reflective surface of natural silk. Formulated with protective botanical lipids and advanced moisture magnets.',
    count: '5 Premium Formulations'
  },
  {
    id: 'night-creams' as ProductCategory,
    name: 'Night Creams',
    emoji: '🌙',
    tagline: 'Deep overnight cellular repair and dermal replenishment',
    description: 'Decadent nighttime treatments designed to activate skin renewal under the moonlight, restoring absolute vitality and bouncy volume.',
    count: '5 Active Treatments'
  },
  {
    id: 'day-creams' as ProductCategory,
    name: 'Day Creams',
    emoji: '☀️',
    tagline: 'Antioxidant shielding and defense against urban daytime stress',
    description: 'Luminous daily veils engineered with advanced environmental barriers to defend, refresh, and illuminate your skin throughout the day.',
    count: '5 Protecting Elixirs'
  },
  {
    id: 'facial-cleansers' as ProductCategory,
    name: 'Facial Cleansers',
    emoji: '🫧',
    tagline: 'Oxygenating milk and crystal foam purification',
    description: 'Effortlessly dissolving atmospheric micro-pollutants and impurities while fully protecting the skin’s sacred natural moisture barrier.',
    count: '5 Pure Formulas'
  },
  {
    id: 'body-cleansers' as ProductCategory,
    name: 'Body Cleansers',
    emoji: '🛁',
    tagline: 'Luxury lipid-replenishing body wash and aromatic bath nectar',
    description: 'Turning your daily bathing into an indulgent spa ritual. Rich in skin-softening oils and delicate, comforting aromatherapy notes.',
    count: '5 Soaking Oils'
  },
  {
    id: 'gentle-cleansers' as ProductCategory,
    name: 'Gentle Cleansers',
    emoji: '🌿',
    tagline: 'Calming chamomile and soothing probiotic waters',
    description: 'Ultra-pure, soap-free cleansing formulas crafted for highly reactive or sensitive skin. Calm redness and preserve physiological pH.',
    count: '5 Hypoallergenic Washes'
  },
  {
    id: 'facial-scrubs' as ProductCategory,
    name: 'Facial Scrubs',
    emoji: '🍃',
    tagline: 'Micro-fine rose quartz and botanical enzyme polishing',
    description: 'Ultra-gentle physical and chemical exfoliation. Sweeps away dull surface cells to instantly reveal a glass-like complexion.',
    count: '5 Refined Polishes'
  },
  {
    id: 'face-masks' as ProductCategory,
    name: 'Face Masks',
    emoji: '💆',
    tagline: 'Intensive botanical clay and royal jelly recovery',
    description: 'Decadent concentrated treatments to saturate, detoxify, and intensely glow. Ideal for instant weekly skin transformations.',
    count: '5 Intensive Masks'
  }
];

export default function CategoryIndex({ onSelectCategory }: CategoryIndexProps) {
  return (
    <div className="w-full">
      {/* Symmetrical Title Block */}
      <div className="text-center mb-16 flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-mono mb-2 block">
          L'Index de Beauté
        </span>
        <h3 className="font-serif text-[32px] sm:text-[44px] text-brand-wine tracking-tight mb-4">
          The Category Index
        </h3>
        <div className="w-16 h-[1px] bg-brand-pink-dark/50 mb-6" />
        <p className="font-sans text-[13.5px] text-brand-wine/75 font-light tracking-wide max-w-lg leading-relaxed">
          Navigate our meticulously organized collections. Each card opens an exclusive page featuring exactly five luxurious Maison Élise formulas.
        </p>
      </div>

      {/* Clean vertical list of categories with generous spacing */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {CATEGORY_DETAILS.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: Math.min(idx * 0.05, 0.3) }}
            onClick={() => {
              onSelectCategory(cat.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative bg-white border border-brand-pink-dark/10 rounded-[24px] p-8 sm:p-10 transition-all duration-500 hover:border-brand-gold/40 hover:shadow-lg cursor-pointer overflow-hidden flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8"
            id={`category-card-${cat.id}`}
          >
            {/* Soft pink glow background on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Left Column: Emoji Placeholder */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-pink/30 flex items-center justify-center text-3xl sm:text-4xl shadow-xs border border-brand-pink-dark/5 select-none shrink-0 group-hover:scale-105 transition-transform duration-500">
              <span>{cat.emoji}</span>
            </div>

            {/* Center Column: Text Content */}
            <div className="flex-1 text-left">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                <h4 className="font-serif text-[20px] sm:text-[24px] text-brand-wine group-hover:text-brand-wine/90 transition-colors">
                  {cat.emoji} {cat.name}
                </h4>
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gold font-medium">
                  {cat.count}
                </span>
              </div>
              <p className="text-brand-gold text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-mono mb-2 font-medium">
                {cat.tagline}
              </p>
              <p className="font-sans text-[13px] text-brand-wine/70 font-light leading-relaxed max-w-2xl">
                {cat.description}
              </p>
            </div>

            {/* Right Column: Arrow Indicator */}
            <div className="self-end sm:self-center shrink-0">
              <div className="w-11 h-11 rounded-full border border-brand-pink-dark/15 flex items-center justify-center text-brand-wine group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
