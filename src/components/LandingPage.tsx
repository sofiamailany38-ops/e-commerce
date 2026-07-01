import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onShopClick: () => void;
}

export default function LandingPage({ onShopClick }: LandingPageProps) {
  return (
    <div className="relative min-h-screen bg-white text-brand-wine overflow-hidden flex flex-col justify-between pt-24 pb-12">
      {/* Luxury Editorial Background Geometry */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        {/* Subtle geometric frames reflecting Parisian luxury salons */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full border border-brand-pink/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] rounded-full border border-brand-pink-dark/10" />
        
        {/* Fine architectural vertical lines */}
        <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-brand-pink-dark/5 hidden md:block" />
        <div className="absolute right-1/3 top-0 bottom-0 w-[1px] bg-brand-pink-dark/5 hidden md:block" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl mx-auto px-6 flex flex-col items-center justify-center z-10 text-center py-12">
        {/* Luxury French Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="h-[1px] w-6 bg-brand-gold" />
          <span className="text-[9px] sm:text-[10px] font-mono text-brand-gold uppercase tracking-[0.4em] font-medium">
            L'Art du Soin et du Parfum
          </span>
          <div className="h-[1px] w-6 bg-brand-gold" />
        </motion.div>

        {/* Beautiful Minimalist Three-Rose SVG Illustration Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative mb-10 w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center"
        >
          {/* Subtle slow rotating ring behind roses */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-brand-pink-dark/10 pointer-events-none"
          />
          
          <svg
            className="w-full h-full select-none"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ROSE 1: Top Center Rose (Detailed fine line-art) */}
            <g transform="translate(100, 75) scale(0.65)" className="stroke-brand-gold fill-pink-100/50">
              {/* Center spiral of rose */}
              <path
                d="M 0 0 C 3 -10, 15 -10, 15 5 C 15 20, -15 20, -15 -5 C -15 -30, 25 -30, 25 10 C 25 40, -30 40, -30 -15 C -30 -50, 40 -50, 40 15 M 10 -5 C 2 -5, 0 5, 5 10"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Outer petal curves */}
              <path
                d="M -30 -15 C -45 5, -30 35, 0 42 C 30 35, 45 5, 40 -15 C 35 -35, -5 -40, -25 -25"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M -15 20 C -25 35, 0 45, 15 35"
                strokeWidth="1"
                strokeLinecap="round"
              />
              {/* Rose Stem */}
              <path
                d="M 0 42 Q -5 65, 5 85"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Delicate Leaves */}
              <path
                d="M -2.5 55 Q -18 52, -12 42 Q -2 50, -2.5 55 Z"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M 1 65 Q 16 65, 12 75 Q 3 70, 1 65 Z"
                strokeWidth="1"
                fill="none"
              />
            </g>

            {/* ROSE 2: Bottom Left Rose (Slightly rotated) */}
            <g transform="translate(68, 125) rotate(-28) scale(0.65)" className="stroke-brand-gold fill-pink-100/50">
              {/* Center spiral */}
              <path
                d="M 0 0 C 3 -10, 15 -10, 15 5 C 15 20, -15 20, -15 -5 C -15 -30, 25 -30, 25 10 C 25 40, -30 40, -30 -15 C -30 -50, 40 -50, 40 15 M 10 -5 C 2 -5, 0 5, 5 10"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M -30 -15 C -45 5, -30 35, 0 42 C 30 35, 45 5, 40 -15 C 35 -35, -5 -40, -25 -25"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M -15 20 C -25 35, 0 45, 15 35"
                strokeWidth="1"
                strokeLinecap="round"
              />
              {/* Stem */}
              <path
                d="M 0 42 Q 10 65, 32 80"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Leaf */}
              <path
                d="M 4 52 Q -10 45, -5 35 Q 4 44, 4 52 Z"
                strokeWidth="1"
                fill="none"
              />
            </g>

            {/* ROSE 3: Bottom Right Rose (Slightly rotated) */}
            <g transform="translate(132, 125) rotate(28) scale(0.65)" className="stroke-brand-gold fill-pink-100/50">
              {/* Center spiral */}
              <path
                d="M 0 0 C 3 -10, 15 -10, 15 5 C 15 20, -15 20, -15 -5 C -15 -30, 25 -30, 25 10 C 25 40, -30 40, -30 -15 C -30 -50, 40 -50, 40 15 M 10 -5 C 2 -5, 0 5, 5 10"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M -30 -15 C -45 5, -30 35, 0 42 C 30 35, 45 5, 40 -15 C 35 -35, -5 -40, -25 -25"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M -15 20 C -25 35, 0 45, 15 35"
                strokeWidth="1"
                strokeLinecap="round"
              />
              {/* Stem */}
              <path
                d="M 0 42 Q -10 65, -32 80"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Leaf */}
              <path
                d="M -4 52 Q 10 45, 5 35 Q -4 44, -4 52 Z"
                strokeWidth="1"
                fill="none"
              />
            </g>

            {/* Delicate Connecting Crest Ribbon or Ring Arc */}
            <path
              d="M 50 148 Q 100 162, 150 148"
              stroke="#F472B6"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            
            <defs>
              <linearGradient id="roseGradient" x1="0" y1="0" x2="200" y2="200">
                <stop offset="0%" stopColor="#FF1493" />
                <stop offset="100%" stopColor="#6ECFFF" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Maison Élise Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-[38px] sm:text-[54px] md:text-[64px] text-brand-wine tracking-[0.22em] uppercase leading-none mb-4 select-none"
        >
          Maison Élise
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-brand-gold text-[11px] sm:text-[13px] uppercase tracking-[0.45em] font-mono mb-8"
        >
          Luxury Skincare & Fragrance
        </motion.p>

        {/* Premium Brand Introduction Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-sans text-[13.5px] sm:text-[15px] text-brand-wine/75 font-light tracking-wide leading-relaxed max-w-xl mb-12"
        >
          Maison Élise is a sanctuary of sensory refinement, where the pure science of dermatological wellness meets the high art of Parisian perfumery. Every formulation is a hand-distilled masterpiece, designed to awaken the skin's innate vitality and drape the senses in timeless, delicate poetry.
        </motion.p>

        {/* "Shop Collection" Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button
            onClick={onShopClick}
            className="group relative bg-brand-wine hover:bg-brand-gold hover:text-white text-white text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.3em] py-4.5 px-10 sm:px-12 rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Shop Collection</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
