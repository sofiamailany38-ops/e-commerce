import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export default function BrandStory() {
  return (
    <section id="story" className="py-24 bg-white px-6 sm:px-12 lg:px-20 overflow-hidden relative">
      
      {/* Background Decorative Crest Outline */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-5 flex items-center justify-center">
        <div className="w-80 h-80 rounded-full border-4 border-brand-wine flex items-center justify-center">
          <div className="w-64 h-64 rounded-full border border-dashed border-brand-wine flex items-center justify-center">
            <span className="font-serif text-[120px] italic text-brand-wine">E</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Column: Stylized Quotation / Visual Accent (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-gold">
              Notre Philosophie
            </span>
            <h3 className="font-serif text-[32px] sm:text-[42px] leading-tight text-brand-wine tracking-tight">
              A Scent is a Silent <br />
              <span className="italic font-normal text-brand-gold">State of Grace</span>
            </h3>
          </div>

          <div className="w-12 h-[1px] bg-brand-pink-dark/50" />

          {/* Large Quote Container */}
          <div className="relative bg-brand-pink/20 rounded-[24px] p-8 border border-brand-pink-dark/10">
            <Quote size={28} className="text-brand-gold opacity-50 absolute -top-3 -left-1" />
            <p className="font-serif text-[15px] sm:text-[16px] italic text-brand-wine/90 leading-relaxed tracking-wide pt-2">
              "We do not synthesize; we reveal. True beauty resides in slow extraction, in the patience of the bloom, and in the profound respect of the dermis. Maison Élise is an oath of purity, sensory poetry, and absolute skin restoration."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-[1px] w-5 bg-brand-gold" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-wine/70">
                Élise de Beaumont, Founder
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative / Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-brand-gold">
              The Heritage of Slow-Extraction
            </h4>
            <p className="font-sans text-[13px] sm:text-[14px] text-brand-wine/80 leading-relaxed font-light tracking-wide">
              Founded in Paris with a private laboratory tucked away on Rue du Faubourg Saint-Honoré, Maison Élise was born from a desire to return cosmetic formulation to its absolute zenith. Dissatisfied with synthetic fillers and hurried industrial productions, we established our botanical gardens in the high-altitude hills of Provence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-4">
            
            {/* Fact 1 */}
            <div className="space-y-2 border-l border-brand-pink-dark/20 pl-4">
              <h5 className="font-serif text-[18px] text-brand-wine tracking-wide">
                100% Active Solutes
              </h5>
              <p className="font-sans text-[11.5px] text-brand-wine/70 leading-relaxed font-light">
                We completely replace standard tap-water fillers in skincare with certified centifolia rose distillate and cold-pressed botanical nectars.
              </p>
            </div>

            {/* Fact 2 */}
            <div className="space-y-2 border-l border-brand-pink-dark/20 pl-4">
              <h5 className="font-serif text-[18px] text-brand-wine tracking-wide">
                Slow Maceration
              </h5>
              <p className="font-sans text-[11.5px] text-brand-wine/70 leading-relaxed font-light">
                Our signature extraits de parfum macerate inside temperature-controlled oak casks for exactly ninety days, achieving maximum molecular sillage.
              </p>
            </div>

            {/* Fact 3 */}
            <div className="space-y-2 border-l border-brand-pink-dark/20 pl-4">
              <h5 className="font-serif text-[18px] text-brand-wine tracking-wide">
                Clean Botanical Science
              </h5>
              <p className="font-sans text-[11.5px] text-brand-wine/70 leading-relaxed font-light">
                No silicones, parabens, synthetic colorants, or petroleum derivatives. Formulated with skin-matching squalane and plant ceramides.
              </p>
            </div>

            {/* Fact 4 */}
            <div className="space-y-2 border-l border-brand-pink-dark/20 pl-4">
              <h5 className="font-serif text-[18px] text-brand-wine tracking-wide">
                Ethical Sourcing
              </h5>
              <p className="font-sans text-[11.5px] text-brand-wine/70 leading-relaxed font-light">
                Every blossom of Damascus Rose, Sambac Jasmine, and Indian Sandalwood is fair-trade harvested and fully traceable from seed to vial.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
