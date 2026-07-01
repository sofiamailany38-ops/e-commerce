import { motion } from 'motion/react';
import { COLLECTIONS } from '../data';
import { ArrowRight } from 'lucide-react';

interface CollectionsProps {
  onSelectCollection: (collectionName: string) => void;
  selectedCollection: string | null;
}

export default function Collections({ onSelectCollection, selectedCollection }: CollectionsProps) {
  return (
    <section id="collections" className="py-24 bg-brand-ivory px-6 sm:px-12 lg:px-20 border-t border-b border-brand-pink/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-mono mb-2 block">
            Les Curations
          </span>
          <h3 className="font-serif text-[28px] sm:text-[40px] text-brand-wine tracking-tight mb-4">
            The Featured Collections
          </h3>
          <div className="w-16 h-[1px] bg-brand-pink-dark/50 mb-6" />
          <p className="font-sans text-[14px] text-brand-wine/75 max-w-xl leading-relaxed tracking-wide font-light">
            Indulge in our exquisite lines, each curated around a core therapeutic philosophy, sensory profile, and skin science.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTIONS.map((col, idx) => {
            const isSelected = selectedCollection === col.name;
            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                onClick={() => {
                  onSelectCollection(col.name);
                  const el = document.getElementById('catalog-start');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`cursor-pointer group relative bg-white border rounded-[20px] p-8 lg:p-10 flex flex-col justify-between h-[360px] sm:h-[380px] transition-all duration-500 shadow-sm ${
                  isSelected
                    ? 'border-brand-gold ring-1 ring-brand-gold bg-brand-pink/10'
                    : 'border-brand-pink-dark/15 hover:border-brand-gold/65 hover:shadow-md'
                }`}
              >
                {/* Gold Highlight Line */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-brand-gold/30 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Collection Signature Icon */}
                  <div className="w-14 h-14 rounded-full bg-brand-pink flex items-center justify-center text-2xl mb-8 border border-brand-pink-dark/15 group-hover:scale-105 transition-transform duration-500">
                    <span>{col.emoji}</span>
                  </div>

                  {/* Title & Description */}
                  <h4 className="font-serif text-[22px] text-brand-wine tracking-wide mb-3 group-hover:text-brand-gold transition-colors duration-300">
                    {col.name}
                  </h4>
                  <p className="font-sans text-[12px] sm:text-[13px] text-brand-wine/70 leading-relaxed font-light tracking-wide">
                    {col.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-6 border-t border-brand-pink/25">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-wine/65 group-hover:text-brand-wine transition-colors duration-300">
                    {isSelected ? 'Viewing products' : 'Explore this ritual'}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-brand-pink flex items-center justify-center text-brand-wine group-hover:bg-brand-wine group-hover:text-white transition-all duration-300">
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clear Filter Option if selected */}
        {selectedCollection && (
          <div className="text-center mt-10">
            <button
              onClick={() => onSelectCollection('')}
              className="font-mono text-[11px] text-brand-gold hover:text-brand-wine border-b border-brand-gold hover:border-brand-wine uppercase tracking-[0.2em] pb-1 transition-all duration-300"
            >
              Show all collections
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
