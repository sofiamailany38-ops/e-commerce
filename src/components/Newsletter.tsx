import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Check, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-24 bg-white px-6 sm:px-12 lg:px-20 relative">
      
      {/* Decorative hairline outer frame */}
      <div className="absolute inset-x-6 sm:inset-x-12 lg:inset-x-20 top-0 bottom-0 border-l border-r border-brand-pink-dark/10 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Editorial Subhead */}
        <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-brand-gold mb-3.5 block">
          L’Élite Privée
        </span>

        {/* Title */}
        <h3 className="font-serif text-[30px] sm:text-[42px] text-brand-wine tracking-tight mb-4">
          Join the Circle of Sillage
        </h3>
        
        <div className="w-16 h-[1px] bg-brand-pink-dark/50 mb-6" />

        {/* Informational description */}
        <p className="font-sans text-[13px] sm:text-[14px] text-brand-wine/75 max-w-lg leading-relaxed tracking-wide font-light mb-10">
          Subscribe to receive private invitations to our seasonal extrait maceration releases, bespoke skincare formulations, and exclusive masterclasses.
        </p>

        {/* Subscription Input Form */}
        <div className="w-full max-w-md bg-brand-ivory border border-brand-pink-dark/15 rounded-[24px] p-2.5 shadow-xs">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2"
              >
                <div className="flex-1 flex items-center px-4 gap-2.5">
                  <Mail size={16} className="text-brand-wine/45" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent text-[12.5px] font-sans text-brand-wine focus:outline-none w-full py-3 placeholder-brand-wine/40"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-brand-wine hover:bg-brand-wine-light text-white font-mono text-[10.5px] uppercase tracking-widest py-3 px-7 rounded-[18px] transition-all duration-300 flex items-center justify-center gap-2 shrink-0 active:scale-97 cursor-pointer"
                >
                  <span>Request Entry</span>
                  <ArrowRight size={12} />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-3 px-4 flex items-center justify-center gap-2.5 text-[12px] font-mono text-brand-wine"
              >
                <div className="w-6 h-6 rounded-full bg-brand-gold text-white flex items-center justify-center">
                  <Check size={12} className="stroke-[3]" />
                </div>
                <span>Your invitation request has been archived. Bienvenue.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Privacy Promise label */}
        <p className="text-[9.5px] font-mono text-brand-wine/45 uppercase tracking-[0.18em] leading-normal mt-5 max-w-xs text-center">
          We respect your peace. Received quarterly. Fully confidential.
        </p>

      </div>
    </section>
  );
}
