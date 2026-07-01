import { ShieldCheck, Compass, Sparkles, Heart, HelpCircle, Leaf, Truck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Benefits() {
  const benefitList = [
    {
      icon: <Leaf className="text-brand-gold stroke-[1.2]" size={28} />,
      title: 'Purity of Solutes',
      description: 'Replacing standard water with 100% active flower distillates, organic squalane, and cell-matching ceramides.'
    },
    {
      icon: <Sparkles className="text-brand-gold stroke-[1.2]" size={28} />,
      title: '90-Day Maceration',
      description: 'Slow-batch perfume maceration inside temperature-regulated French oak barrels to curate unforgettable sillage.'
    },
    {
      icon: <Compass className="text-brand-gold stroke-[1.2]" size={28} />,
      title: 'Atelier Sourcing',
      description: 'Fully traceable, fair-trade Damascus Rose and Mysore Sandalwood nectars sourced directly from ethical cooperatives.'
    },
    {
      icon: <Truck className="text-brand-gold stroke-[1.2]" size={28} />,
      title: 'Ecoluxe Shipments',
      description: 'Carbon-neutral international courier deliveries with FSC-certified recyclable boxes and plant-based ink wraps.'
    }
  ];

  return (
    <section className="py-20 bg-brand-ivory px-6 sm:px-12 lg:px-20 border-b border-brand-pink/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Subtle grid of promises */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {benefitList.map((ben, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start group"
            >
              {/* Icon Frame */}
              <div className="w-14 h-14 rounded-full bg-white border border-brand-pink-dark/10 flex items-center justify-center shadow-xs transition-transform duration-500 group-hover:scale-105 group-hover:border-brand-gold/45">
                {ben.icon}
              </div>

              {/* Title & Narrative */}
              <div className="space-y-2">
                <h4 className="font-serif text-[18px] text-brand-wine tracking-wide font-semibold">
                  {ben.title}
                </h4>
                <p className="font-sans text-[12px] text-brand-wine/70 leading-relaxed font-light tracking-wide">
                  {ben.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
