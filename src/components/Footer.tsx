import { Compass, Globe, Sparkles, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onSelectCollection: (col: string) => void;
  setActiveSection: (section: string) => void;
  onPageChange?: (page: 'home' | 'shop') => void;
}

export default function Footer({ onSelectCollection, setActiveSection, onPageChange }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleCollectionLink = (name: string) => {
    if (onPageChange) onPageChange('shop');
    onSelectCollection(name);
    setTimeout(() => {
      const el = document.getElementById('catalog-start');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleHeritageLink = () => {
    if (onPageChange) onPageChange('shop');
    setActiveSection('story');
    setTimeout(() => {
      const el = document.getElementById('story');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleQuizLink = () => {
    if (onPageChange) onPageChange('shop');
    setActiveSection('concierge');
    setTimeout(() => {
      const el = document.getElementById('concierge');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-brand-wine text-brand-pink/90 border-t border-brand-gold/25 pt-20 pb-12 px-6 sm:px-12 lg:px-20 overflow-hidden relative">
      
      {/* Editorial Decorative border lines */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-brand-pink-dark/20">
          
          {/* Column 1: Brand Signature (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="space-y-1">
              <h4 className="font-serif text-[24px] tracking-[0.18em] uppercase text-white">
                Maison Élise
              </h4>
              <span className="text-[9px] uppercase tracking-[0.35em] text-brand-gold block font-mono">
                Haute Parfumerie & Cosmétique
              </span>
            </div>
            <p className="font-sans text-[11.5px] text-brand-pink/65 leading-relaxed font-light tracking-wide max-w-sm">
              Maison Élise is an elite international skincare and fragrance maison. Our formulas represent the pinnacle of molecular plant extraction and traditional slow-macerated sillage. Hand-sealed in Paris, France.
            </p>
            <div className="flex items-center gap-1.5 pt-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-brand-gold">
                Laboratoires Paris 75001 • Open
              </span>
            </div>
          </div>

          {/* Column 2: The Collections (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="font-serif text-[13px] uppercase tracking-[0.25em] text-white">
              The Collections
            </h5>
            <ul className="space-y-2.5 font-sans text-[12px] font-light text-brand-pink/70">
              <li>
                <button
                  onClick={() => handleCollectionLink('La Collection Privée')}
                  className="hover:text-white hover:underline decoration-brand-gold underline-offset-4 transition-colors"
                >
                  La Collection Privée
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCollectionLink('L’Élixir de Jeunesse')}
                  className="hover:text-white hover:underline decoration-brand-gold underline-offset-4 transition-colors"
                >
                  L’Élixir de Jeunesse
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCollectionLink('Le Rituel Purifiant')}
                  className="hover:text-white hover:underline decoration-brand-gold underline-offset-4 transition-colors"
                >
                  Le Rituel Purifiant
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Brand Heritage (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="font-serif text-[13px] uppercase tracking-[0.25em] text-white">
              The House
            </h5>
            <ul className="space-y-2.5 font-sans text-[12px] font-light text-brand-pink/70">
              <li>
                <button
                  onClick={handleHeritageLink}
                  className="hover:text-white hover:underline decoration-brand-gold underline-offset-4 transition-colors"
                >
                  Our Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={handleQuizLink}
                  className="hover:text-white hover:underline decoration-brand-gold underline-offset-4 transition-colors"
                >
                  Virtual Skin Concierge
                </button>
              </li>
              <li>
                <span className="opacity-45 cursor-not-allowed">Private Consultation (Soon)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="font-serif text-[13px] uppercase tracking-[0.25em] text-white">
              Client Care
            </h5>
            <ul className="space-y-2.5 font-sans text-[12px] font-light text-brand-pink/70">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Atelier Shipping & Exchanges</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Scent Replacement Policy</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Confidentiality Agreement</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Boutiques (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="font-serif text-[13px] uppercase tracking-[0.25em] text-white">
              Boutiques
            </h5>
            <ul className="space-y-2.5 font-sans text-[11.5px] font-light text-brand-pink/65">
              <li>
                <strong>Paris Atelier:</strong> <br />
                18 Rue du Faubourg Saint-Honoré
              </li>
              <li>
                <strong>London Townhouse:</strong> <br />
                42 Bruton Place, Mayfair
              </li>
              <li>
                <strong>Tokyo Salon:</strong> <br />
                Ginza Block G, Chuo-ku
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: License and Switchers */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-brand-pink/50 uppercase tracking-widest">
          
          {/* Trademark details */}
          <div className="text-center md:text-left space-y-1">
            <p>© {currentYear} Maison Élise Internatinal. All Rights Reserved.</p>
            <p className="text-[9px] text-brand-gold font-light tracking-[0.15em]">
              Formulated in Paris • Sealed in Provence • Distributed globally
            </p>
          </div>

          {/* Core Language/Currency Indicators (Luxury feel) */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="flex items-center gap-1.5">
              <Globe size={11} className="text-brand-gold" />
              <span>International (EN)</span>
            </span>
            <span>|</span>
            <span>Currency: USD ($)</span>
            <span>|</span>
            <span>Secure TLS 1.3 Encryption</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
