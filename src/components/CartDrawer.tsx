import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, Check, Sparkles, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Product } from '../types';
import CheckoutForm from './CheckoutForm';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

const DELUXE_SAMPLES = [
  { id: 'sample-rose', name: 'Rose Éternelle Extrait (2 ml)', category: 'Fragrance' },
  { id: 'sample-santal', name: 'Santal Précieux Extrait (2 ml)', category: 'Fragrance' },
  { id: 'sample-creme', name: 'Crème de Soie Daily Hydration (5 ml)', category: 'Skincare' }
];

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [selectedSample, setSelectedSample] = useState<string | null>(null);
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [selectedShippingCost, setSelectedShippingCost] = useState<number | null>(null);
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  });

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingThreshold = 150;
  const defaultShippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 15;
  const shippingCost = selectedShippingCost !== null ? selectedShippingCost : defaultShippingCost;
  const wrappingCost = giftWrapping ? 8 : 0;
  const total = subtotal + shippingCost + wrappingCost;

  const handleCheckoutComplete = (details: any) => {
    setShippingDetails({
      name: details.name,
      email: details.email,
      address: details.address,
      city: details.city,
      postalCode: details.postalCode
    });
    setSelectedShippingCost(details.shippingCost);
    setCheckoutStep('success');
  };

  const handleOrderCompletion = () => {
    onClearCart();
    setSelectedSample(null);
    setGiftWrapping(false);
    setCheckoutStep('cart');
    setSelectedShippingCost(null);
    setShippingDetails({ name: '', email: '', address: '', city: '', postalCode: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-brand-wine/40 backdrop-blur-xs"
      />

      {/* Slide-out Drawer Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className={`relative w-full ${checkoutStep === 'checkout' ? 'max-w-lg md:max-w-2xl' : 'max-w-md md:max-w-lg'} bg-brand-ivory border-l border-brand-pink-dark/15 h-full z-10 flex flex-col justify-between shadow-2xl transition-all duration-300`}
      >
        {checkoutStep === 'checkout' ? (
          <CheckoutForm
            cart={cart}
            subtotal={subtotal}
            wrappingCost={wrappingCost}
            onClose={onClose}
            onComplete={handleCheckoutComplete}
          />
        ) : (
          <>
            {/* Header */}
            <div className="p-6 border-b border-brand-pink/20 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-brand-wine" />
            <h3 className="font-serif text-[18px] sm:text-[20px] text-brand-wine uppercase tracking-[0.15em]">
              Your Shopping Bag
            </h3>
            {cart.length > 0 && (
              <span className="font-mono text-[10px] text-brand-gold bg-brand-pink px-2 py-0.5 rounded-full border border-brand-pink-dark/10">
                {cart.reduce((s, i) => s + i.quantity, 0)} Items
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-brand-wine/60 hover:text-brand-wine hover:bg-brand-pink/20 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Dynamic Content Panel */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: CART OVERVIEW */}
            {checkoutStep === 'cart' && (
              <motion.div
                key="step-cart"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {cart.length === 0 ? (
                  <div className="text-center py-24 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-brand-pink flex items-center justify-center text-2xl mb-4 border border-brand-pink-dark/10">
                      <span>🏺</span>
                    </div>
                    <h4 className="font-serif text-[18px] text-brand-wine mb-2">Your bag is empty</h4>
                    <p className="font-sans text-[12px] text-brand-wine/60 max-w-[240px] leading-relaxed mb-6">
                      Explore our collections to choose your perfect scent and skin rituals.
                    </p>
                    <button
                      onClick={onClose}
                      className="font-mono text-[10px] bg-brand-wine text-white uppercase tracking-[0.2em] py-3.5 px-8 rounded-full hover:bg-brand-wine-light transition-colors"
                    >
                      Return to Gallery
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Cart Items List */}
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="bg-white border border-brand-pink-dark/10 rounded-[16px] p-4 flex gap-4 transition-all hover:border-brand-pink-dark/25"
                        >
                          {/* Centered Emoji Product image placeholder */}
                          <div className="w-18 h-18 rounded-[12px] bg-brand-pink/30 border border-brand-pink-dark/10 flex items-center justify-center text-[28px] shrink-0 select-none">
                            {item.product.emoji}
                          </div>

                          {/* Item Info */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-serif text-[14px] sm:text-[15px] text-brand-wine font-semibold leading-tight">
                                  {item.product.name}
                                </h4>
                                <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider block">
                                  {item.product.concentration} • {item.product.volume}
                                </span>
                              </div>
                              <button
                                onClick={() => onRemoveItem(item.product.id)}
                                className="text-brand-wine/40 hover:text-brand-wine transition-colors p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 size={13} className="stroke-[1.5]" />
                              </button>
                            </div>

                            {/* Quantity Adjuster and Price */}
                            <div className="flex justify-between items-center mt-3">
                              <div className="flex items-center border border-brand-pink-dark/15 rounded-md bg-brand-ivory scale-90 origin-left">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                  className="p-1 px-2.5 text-brand-wine/60 hover:text-brand-wine transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="font-mono text-[11px] font-medium px-1 text-brand-wine">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="p-1 px-2.5 text-brand-wine/60 hover:text-brand-wine transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>
                              <span className="font-mono text-[13px] text-brand-wine font-medium">
                                ${item.product.price * item.quantity}.00
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Bar Threshold */}
                    <div className="bg-brand-pink/25 rounded-[12px] p-3 border border-brand-pink-dark/10 text-center">
                      {subtotal < shippingThreshold ? (
                        <p className="font-sans text-[11px] text-brand-wine leading-normal font-light">
                          You are only <strong className="font-mono font-bold">${shippingThreshold - subtotal}</strong> away from{' '}
                          <strong className="text-brand-gold uppercase tracking-wider">Complimentary Shipping</strong>
                        </p>
                      ) : (
                        <p className="font-sans text-[11px] text-brand-wine leading-normal font-light flex items-center justify-center gap-1.5">
                          <Check size={11} className="text-brand-gold stroke-[3]" />
                          Your order qualifies for <strong>Complimentary Shipping</strong>
                        </p>
                      )}
                    </div>

                    {/* SELECT COMPLIMENTARY SAMPLE (Ultra-luxury touch) */}
                    <div className="border-t border-b border-brand-pink/20 py-5 space-y-3">
                      <div className="flex items-center gap-1.5">
                        <Gift size={13} className="text-brand-gold" />
                        <h4 className="font-serif text-[13px] sm:text-[14px] text-brand-wine tracking-wide">
                          Select Your Complimentary Sample
                        </h4>
                      </div>
                      <p className="font-sans text-[10.5px] text-brand-wine/60 leading-normal font-light">
                        Maison Élise is pleased to offer you a deluxe discovery sample of your choice with every order.
                      </p>
                      <div className="grid grid-cols-1 gap-2 pt-1.5">
                        {DELUXE_SAMPLES.map((sample) => {
                          const isPicked = selectedSample === sample.id;
                          return (
                            <button
                              key={sample.id}
                              onClick={() => setSelectedSample(isPicked ? null : sample.id)}
                              className={`text-left p-3 rounded-[12px] border text-[11.5px] transition-all duration-300 flex justify-between items-center ${
                                isPicked
                                  ? 'border-brand-gold bg-brand-pink/35 text-brand-wine'
                                  : 'border-brand-pink-dark/10 bg-white hover:border-brand-pink-dark/25 text-brand-wine/70'
                              }`}
                            >
                              <div>
                                <span className="font-mono text-[8px] uppercase tracking-widest text-brand-gold block">
                                  {sample.category}
                                </span>
                                <span className="font-sans">{sample.name}</span>
                              </div>
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isPicked
                                    ? 'bg-brand-gold border-brand-gold text-white'
                                    : 'border-brand-pink-dark/25'
                                }`}
                              >
                                {isPicked && <Check size={8} className="stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* SIGNATURE ATELIER GIFT WRAPPING */}
                    <div className="bg-white border border-brand-pink-dark/10 rounded-[16px] p-4 flex items-center justify-between">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center text-lg select-none">
                          🎁
                        </div>
                        <div>
                          <h4 className="font-serif text-[13px] text-brand-wine">Atelier Gift Wrapping</h4>
                          <p className="font-sans text-[10px] text-brand-wine/60 font-light leading-normal">
                            Signature baby pink box, cream silk ribbon +$8
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setGiftWrapping(!giftWrapping)}
                        className={`text-[10px] font-mono uppercase tracking-widest py-1.5 px-3 rounded-full border transition-all ${
                          giftWrapping
                            ? 'bg-brand-wine border-brand-wine text-white'
                            : 'border-brand-pink-dark/25 text-brand-wine/75 hover:bg-brand-pink/15'
                        }`}
                      >
                        {giftWrapping ? 'Added' : 'Add'}
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* STEP 3: ORDER SUCCESS SCREEN */}
            {checkoutStep === 'success' && (
              <motion.div
                key="step-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16 flex flex-col items-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-brand-pink border border-brand-gold/30 flex items-center justify-center text-4xl animate-bounce">
                  <span>🕊️</span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand-gold block">
                    Merci Infiniment
                  </span>
                  <h4 className="font-serif text-[24px] sm:text-[28px] text-brand-wine tracking-wide">
                    Your Sillage Awaits
                  </h4>
                  <p className="font-sans text-[12px] text-brand-wine/75 font-light leading-relaxed max-w-xs mx-auto">
                    Your order has been recorded into our archives. A dispatch dossier will be sent to{' '}
                    <strong className="text-brand-wine font-semibold">{shippingDetails.email}</strong> shortly.
                  </p>
                </div>

                <div className="bg-white border border-brand-pink-dark/10 rounded-[20px] p-6 w-full text-left space-y-3 font-mono text-[11px] text-brand-wine/75">
                  <div className="flex justify-between border-b border-brand-pink/10 pb-2">
                    <span className="text-brand-wine/40 uppercase">Recipient</span>
                    <span className="font-semibold">{shippingDetails.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-pink/10 pb-2">
                    <span className="text-brand-wine/40 uppercase">Dossier #</span>
                    <span>ME-2026-{(Math.floor(Math.random() * 90000) + 10000)}</span>
                  </div>
                  {selectedSample && (
                    <div className="flex justify-between border-b border-brand-pink/10 pb-2">
                      <span className="text-brand-wine/40 uppercase">Deluxe Mini</span>
                      <span className="text-brand-gold uppercase text-[9px] tracking-wider">
                        {DELUXE_SAMPLES.find((s) => s.id === selectedSample)?.name.split(' (')[0]}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1 text-[12px] font-bold text-brand-wine">
                    <span className="uppercase">Total debited</span>
                    <span>${total}.00</span>
                  </div>
                </div>

                <button
                  onClick={handleOrderCompletion}
                  className="w-full bg-brand-wine hover:bg-brand-wine-light text-white text-[11px] font-mono uppercase tracking-[0.2em] py-4.5 rounded-full transition-colors shadow-md"
                >
                  Continue Browsing
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cart Pricing Summary Footer (Shown only on Step 1) */}
        {cart.length > 0 && checkoutStep === 'cart' && (
          <div className="p-6 border-t border-brand-pink/20 bg-white space-y-4">
            <div className="space-y-2.5">
              <div className="flex justify-between text-[11px] sm:text-[12px] text-brand-wine/70 font-light">
                <span>Value of Selected Essence</span>
                <span className="font-mono">${subtotal}.00</span>
              </div>
              
              <div className="flex justify-between text-[11px] sm:text-[12px] text-brand-wine/70 font-light">
                <span>Atelier Wrapping & Sealed Pack</span>
                <span className="font-mono">{giftWrapping ? '+$8.00' : 'Complimentary'}</span>
              </div>

              <div className="flex justify-between text-[11px] sm:text-[12px] text-brand-wine/70 font-light">
                <span>Parisian Air Courier Shipping</span>
                <span className="font-mono">
                  {shippingCost === 0 ? (
                    <span className="text-brand-gold uppercase text-[10px] font-semibold tracking-wider">
                      Complimentary
                    </span>
                  ) : (
                    `+$${shippingCost}.00`
                  )}
                </span>
              </div>

              {selectedSample && (
                <div className="flex justify-between text-[11px] text-brand-gold font-light">
                  <span>Selected Premium Sample</span>
                  <span className="uppercase text-[9px] tracking-wider font-semibold font-mono">Complimentary</span>
                </div>
              )}

              <div className="h-[1px] bg-brand-pink/15 pt-1" />

              <div className="flex justify-between items-end text-brand-wine">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-wine/45 block">
                    Total order
                  </span>
                  <span className="font-mono text-[18px] sm:text-[20px] font-semibold">
                    ${total}.00
                  </span>
                </div>
                <span className="text-[9px] font-mono text-brand-wine/40 uppercase">Tax included</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => setCheckoutStep('checkout')}
              className="w-full bg-brand-wine hover:bg-brand-wine-light text-white text-[11px] font-mono uppercase tracking-[0.25em] py-4.5 rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Proceed to Secure Checkout</span>
            </button>
          </div>
        )}
          </>
        )}
      </motion.div>
    </div>
  );
}
