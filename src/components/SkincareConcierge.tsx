import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RefreshCw, ShoppingBag, Eye, Heart, Compass } from 'lucide-react';
import { QUIZ_QUESTIONS, PRODUCTS } from '../data';
import { Product } from '../types';

interface SkincareConciergeProps {
  onAddToCart: (p: Product) => void;
  onViewProduct: (p: Product) => void;
}

export default function SkincareConcierge({ onAddToCart, onViewProduct }: SkincareConciergeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<{ product: Product; reason: string }[]>([]);

  const handleSelectOption = (questionId: number, value: string) => {
    const updatedAnswers = { ...answers, [questionId]: value };
    setAnswers(updatedAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generatePrescription(updatedAnswers);
    }
  };

  const generatePrescription = (finalAnswers: Record<number, string>) => {
    const skinType = finalAnswers[1]; // dry, combination, aging, normal
    const concern = finalAnswers[2]; // radiance, anti-aging, cleansing, hydration
    const olfactory = finalAnswers[3]; // rose, sandalwood, jasmine, lavender
    const environment = finalAnswers[4]; // indoor, urban, temperate

    const matchedList: { product: Product; reason: string }[] = [];

    // Rule-based matching from real products
    if (skinType === 'dry' || concern === 'hydration') {
      const p = PRODUCTS.find((x) => x.id === 'creme-de-soie');
      if (p) matchedList.push({ product: p, reason: 'To deeply infuse structural hydration and reinforce your dry/sensitive lipid barrier with hydrolyzed silk proteins.' });
    }
    
    if (skinType === 'aging' || concern === 'anti-aging') {
      const p = PRODUCTS.find((x) => x.id === 'elixir-reparateur');
      if (p) matchedList.push({ product: p, reason: 'To trigger overnight cellular repair and combat environmental aging utilizing cold-pressed prickly pear lipids.' });
    }

    if (concern === 'cleansing' || skinType === 'combination') {
      const p = PRODUCTS.find((x) => x.id === 'lait-de-rose');
      if (p) matchedList.push({ product: p, reason: 'To dissolve daily urban micro-impurities without disrupting your skin’s sacred natural mantle.' });
    }

    if (olfactory === 'rose') {
      const p = PRODUCTS.find((x) => x.id === 'rose-eternelle');
      if (p) matchedList.push({ product: p, reason: 'Your soul seeks the majestic trail of organic Damascus Rose, providing deep floral comfort and velvet sillage.' });
    } else if (olfactory === 'sandalwood') {
      const p = PRODUCTS.find((x) => x.id === 'santal-precieux');
      if (p) matchedList.push({ product: p, reason: 'To envelope you in a warm, comforting cache of genuine Indian Sandalwood and Guatemalan cardamom.' });
    } else if (olfactory === 'jasmine') {
      const p = PRODUCTS.find((x) => x.id === 'or-jasmin');
      if (p) matchedList.push({ product: p, reason: 'Perfect match for warm solar vibes, celebrating deep, intoxicating absolutes of absolute Jasmine Sambac.' });
    }

    // Default fallbacks to ensure 3 recommendations
    if (matchedList.length < 3) {
      const backupIds = ['serum-infini', 'baume-corps', 'creme-de-soie'];
      for (const id of backupIds) {
        if (!matchedList.some((m) => m.product.id === id)) {
          const bp = PRODUCTS.find((x) => x.id === id);
          if (bp) {
            matchedList.push({
              product: bp,
              reason: 'Selected as a fundamental ritual pillar to optimize your overall dermal firmness and seal moisture matrices.'
            });
          }
        }
        if (matchedList.length >= 3) break;
      }
    }

    setRecommendedProducts(matchedList.slice(0, 3));
    setIsCompleted(true);
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
    setRecommendedProducts([]);
  };

  const handleAddAllToCart = () => {
    recommendedProducts.forEach((rec) => {
      onAddToCart(rec.product);
    });
  };

  return (
    <section id="concierge" className="py-24 bg-brand-pink/20 px-6 sm:px-12 lg:px-20 border-t border-b border-brand-pink-dark/10 relative overflow-hidden">
      
      {/* Background Decorative Circles */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-white/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-pink-dark/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-mono mb-2 block">
            Atelier Diagnostic
          </span>
          <h3 className="font-serif text-[28px] sm:text-[40px] text-brand-wine tracking-tight mb-4">
            Virtual Skin & Fragrance Concierge
          </h3>
          <div className="w-16 h-[1px] bg-brand-pink-dark/50 mb-6" />
          <p className="font-sans text-[14px] text-brand-wine/75 max-w-xl leading-relaxed tracking-wide font-light">
            Embark on our sensory evaluation. Unveil a personalized dermal ritual and olfactory expression tailored to your environment and soul.
          </p>
        </div>

        {/* Quiz Interface Board */}
        <div className="bg-white border border-brand-pink-dark/15 rounded-[32px] p-8 sm:p-12 shadow-[0_12px_40px_-20px_rgba(60,8,17,0.06)] min-h-[400px] flex flex-col justify-between relative">
          
          {/* Progress lines */}
          {!isCompleted && (
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-pink flex rounded-t-[32px] overflow-hidden">
              {QUIZ_QUESTIONS.map((q, idx) => (
                <div
                  key={q.id}
                  className={`h-full flex-1 transition-all duration-500 ${
                    idx <= currentStep ? 'bg-brand-gold' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isCompleted ? (
              /* ACTIVE QUIZ STEP */
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8 flex-1 flex flex-col justify-between"
              >
                <div>
                  {/* Step counter */}
                  <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-brand-gold block mb-3">
                    Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
                  </span>

                  {/* Question Title */}
                  <h4 className="font-serif text-[22px] sm:text-[26px] text-brand-wine leading-tight tracking-wide mb-8">
                    {QUIZ_QUESTIONS[currentStep].question}
                  </h4>

                  {/* Options List */}
                  <div className="grid grid-cols-1 gap-3">
                    {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentStep].id, option.value)}
                        className="group w-full text-left bg-brand-ivory hover:bg-brand-pink/35 border border-brand-pink-dark/10 hover:border-brand-gold/60 rounded-[16px] p-5 transition-all duration-300 flex justify-between items-center text-[13px] text-brand-wine/85"
                      >
                        <span className="font-sans font-light tracking-wide group-hover:font-medium transition-all">
                          {option.text}
                        </span>
                        <div className="w-5 h-5 rounded-full border border-brand-pink-dark/20 group-hover:border-brand-gold flex items-center justify-center bg-white group-hover:bg-brand-pink transition-colors">
                          <div className="w-2 h-2 rounded-full bg-brand-wine scale-0 group-hover:scale-100 transition-transform" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Back Button */}
                {currentStep > 0 && (
                  <div className="pt-6">
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand-wine/50 hover:text-brand-wine border-b border-transparent hover:border-brand-wine/50 pb-0.5 transition-all"
                    >
                      Return to previous question
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              /* COMPLETED PRESCRIPTION SCREEN */
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8 flex-1"
              >
                {/* Header of results */}
                <div className="text-center pb-4 border-b border-brand-pink/25">
                  <div className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center text-lg mx-auto mb-3">
                    <Sparkles size={16} className="text-brand-gold" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-brand-gold block">
                    Your Personalized Prescription
                  </span>
                  <h4 className="font-serif text-[24px] sm:text-[28px] text-brand-wine tracking-wide">
                    Le Rituel Sur Mesure
                  </h4>
                </div>

                {/* Recommended Products Stack */}
                <div className="space-y-5">
                  {recommendedProducts.map((rec, idx) => (
                    <div
                      key={rec.product.id}
                      className="bg-brand-ivory border border-brand-pink-dark/10 rounded-[20px] p-5 flex flex-col sm:flex-row gap-5 hover:border-brand-gold/40 transition-all duration-300"
                    >
                      {/* Product Emoji Graphic */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[14px] bg-white border border-brand-pink-dark/10 flex items-center justify-center text-3xl shrink-0 select-none shadow-sm">
                        {rec.product.emoji}
                      </div>

                      {/* Information & Reason */}
                      <div className="flex-1 space-y-1.5 text-left">
                        <div className="flex justify-between items-baseline gap-2 flex-wrap">
                          <h5 className="font-serif text-[16px] text-brand-wine font-semibold">
                            {rec.product.name}
                          </h5>
                          <span className="font-mono text-[10px] text-brand-gold uppercase tracking-wider">
                            {rec.product.concentration} • ${rec.product.price}
                          </span>
                        </div>
                        <p className="font-sans text-[11.5px] text-brand-wine/65 leading-relaxed italic font-light tracking-wide">
                          {rec.product.tagline}
                        </p>
                        <p className="font-sans text-[12px] text-brand-wine/80 leading-relaxed font-light pl-3 border-l border-brand-gold/45">
                          <strong className="font-mono text-[9px] uppercase tracking-wider text-brand-gold block">Why recommended:</strong>
                          {rec.reason}
                        </p>
                        
                        {/* Quick Interactive Actions */}
                        <div className="flex gap-4 pt-1.5 font-mono text-[9.5px] uppercase tracking-wider">
                          <button
                            onClick={() => onViewProduct(rec.product)}
                            className="text-brand-wine hover:text-brand-gold flex items-center gap-1 transition-colors"
                          >
                            <Compass size={11} />
                            <span>View details</span>
                          </button>
                          <button
                            onClick={() => onAddToCart(rec.product)}
                            className="text-brand-gold hover:text-brand-wine flex items-center gap-1 transition-colors font-medium"
                          >
                            <ShoppingBag size={11} />
                            <span>Add to Bag</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overall Action options */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-brand-pink/20">
                  <button
                    onClick={handleResetQuiz}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-wine/50 hover:text-brand-wine flex items-center gap-1.5 py-2 transition-colors order-2 sm:order-1"
                  >
                    <RefreshCw size={11} />
                    <span>Retake Evaluation</span>
                  </button>

                  <button
                    onClick={handleAddAllToCart}
                    className="w-full sm:w-auto bg-brand-wine hover:bg-brand-wine-light text-white text-[11px] font-mono uppercase tracking-[0.25em] py-4 px-8 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 order-1 sm:order-2 active:scale-98"
                  >
                    <ShoppingBag size={13} />
                    <span>Add Complete Ritual to Bag</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
