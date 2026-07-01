import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../data';
import { Star, ArrowLeft, ArrowRight, Quote, ShieldCheck } from 'lucide-react';

export default function Reviews() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((activeIdx + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setActiveIdx((activeIdx - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const currentReview = REVIEWS[activeIdx];

  return (
    <section className="py-24 bg-white px-6 sm:px-12 lg:px-20 relative border-b border-brand-pink/20">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-mono mb-2 block">
            La Critique
          </span>
          <h3 className="font-serif text-[28px] sm:text-[40px] text-brand-wine tracking-tight mb-4">
            Voices of Exclusivity
          </h3>
          <div className="w-16 h-[1px] bg-brand-pink-dark/50" />
        </div>

        {/* Carousel Outer Wrapper */}
        <div className="relative min-h-[380px] sm:min-h-[320px] bg-brand-pink/15 rounded-[32px] p-8 sm:p-12 lg:p-16 border border-brand-pink-dark/10 flex flex-col justify-between">
          
          {/* Accent Gold Quote Icon */}
          <Quote size={54} className="text-brand-gold opacity-15 absolute top-10 right-12 stroke-[1]" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 flex-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Rating and Verification */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex text-brand-gold">
                    {[...Array(currentReview.rating)].map((_, i) => (
                      <Star key={i} size={13} className="fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-brand-gold uppercase tracking-[0.2em] flex items-center gap-1">
                    <ShieldCheck size={11} className="text-brand-gold fill-brand-gold/10" />
                    <span>Verified Collector</span>
                  </span>
                </div>

                {/* Review Title */}
                <h4 className="font-serif text-[20px] sm:text-[24px] text-brand-wine tracking-wide">
                  "{currentReview.title}"
                </h4>

                {/* Review Narrative Content */}
                <p className="font-serif italic text-[14px] sm:text-[16px] text-brand-wine/85 leading-relaxed tracking-wide font-light max-w-4xl">
                  {currentReview.content}
                </p>
              </div>

              {/* Reviewer Details Footer */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pt-6 border-t border-brand-pink/20">
                <div>
                  <h5 className="font-serif text-[15px] text-brand-wine font-semibold">
                    {currentReview.author}
                  </h5>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[10.5px] font-mono text-brand-wine/50 tracking-wider">
                    <span>{currentReview.location}</span>
                    <span>•</span>
                    <span>{currentReview.date}</span>
                  </div>
                </div>

                {/* Optional Skin/Usage Profile tag */}
                {currentReview.skinProfile && (
                  <span className="self-start sm:self-auto bg-white text-brand-wine font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-brand-pink-dark/15 shadow-xs">
                    Profile: {currentReview.skinProfile}
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Pagination Controls */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 bg-white border border-brand-pink-dark/15 text-brand-wine hover:text-brand-gold hover:border-brand-gold/55 rounded-full transition-all duration-300 active:scale-95 shadow-sm"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-white border border-brand-pink-dark/15 text-brand-wine hover:text-brand-gold hover:border-brand-gold/55 rounded-full transition-all duration-300 active:scale-95 shadow-sm"
              aria-label="Next testimonial"
            >
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

        {/* Indicators Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIdx === idx ? 'w-6 bg-brand-gold' : 'w-1.5 bg-brand-pink-dark/20'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
