import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Lock, ShieldCheck, Truck, CreditCard, AlertCircle, HelpCircle, 
  Loader2, Check, ArrowRight, User, Mail, Phone, MapPin, Globe, ShoppingBag
} from 'lucide-react';
import { CartItem, Product } from '../types';

interface CheckoutFormProps {
  cart: CartItem[];
  subtotal: number;
  wrappingCost: number;
  onClose: () => void;
  onComplete: (billingInfo: any) => void;
}

interface FormErrors {
  email?: string;
  phone?: string;
  name?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  cardName?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

export default function CheckoutForm({
  cart,
  subtotal,
  wrappingCost,
  onClose,
  onComplete
}: CheckoutFormProps) {
  // Steps within checkout: 'details' | 'shipping_method' | 'payment' | 'processing'
  const [step, setStep] = useState<'details' | 'shipping_method' | 'payment' | 'processing'>('details');
  
  // Form values
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');
  
  // Shipping choice
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'whiteGlove'>('standard');
  const shippingCosts = {
    standard: subtotal >= 150 ? 0 : 15,
    express: 25,
    whiteGlove: 45
  };
  
  // Payment option
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'applepay' | 'googlepay'>('card');
  
  // Card details
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  
  // UI States
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [processingStatus, setProcessingStatus] = useState('Initializing secure gateway...');
  const [cardBrand, setCardBrand] = useState<'visa' | 'mastercard' | 'amex' | 'discover' | null>(null);

  // Auto-format card number
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Detect Brand
    if (value.startsWith('4')) {
      setCardBrand('visa');
    } else if (value.startsWith('51') || value.startsWith('52') || value.startsWith('53') || value.startsWith('54') || value.startsWith('55')) {
      setCardBrand('mastercard');
    } else if (value.startsWith('34') || value.startsWith('37')) {
      setCardBrand('amex');
    } else if (value.startsWith('6')) {
      setCardBrand('discover');
    } else {
      setCardBrand(null);
    }

    // Truncate to max digits
    const maxDigits = cardBrand === 'amex' ? 15 : 16;
    value = value.slice(0, maxDigits);

    // Apply spaces
    let formatted = '';
    if (cardBrand === 'amex') {
      // Amex format: 4-6-5
      for (let i = 0; i < value.length; i++) {
        if (i === 4 || i === 10) formatted += ' ';
        formatted += value[i];
      }
    } else {
      // General format: 4-4-4-4
      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += value[i];
      }
    }
    setCardNumber(formatted);
  };

  // Auto-format Expiration Date (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setCardExpiry(value);
  };

  // Auto-format CVV (3-4 digits)
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLen = cardBrand === 'amex' ? 4 : 3;
    const value = e.target.value.replace(/\D/g, '').slice(0, maxLen);
    setCardCvv(value);
  };

  // Real-time fields validation
  useEffect(() => {
    const newErrors: FormErrors = {};

    // Step 1 validation
    if (touched.email) {
      if (!email) {
        newErrors.email = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = 'Please provide a valid email address';
      }
    }

    if (touched.phone) {
      if (!phone) {
        newErrors.phone = 'Phone number is required';
      } else if (phone.replace(/\D/g, '').length < 7) {
        newErrors.phone = 'Please enter a valid contact number';
      }
    }

    if (touched.name) {
      if (!name) {
        newErrors.name = 'Full name is required';
      } else if (name.trim().length < 3) {
        newErrors.name = 'Name must be at least 3 characters';
      }
    }

    if (touched.address && !address) {
      newErrors.address = 'Delivery address is required';
    }

    if (touched.city && !city) {
      newErrors.city = 'City is required';
    }

    if (touched.postalCode) {
      if (!postalCode) {
        newErrors.postalCode = 'Postal code is required';
      } else if (postalCode.trim().length < 3) {
        newErrors.postalCode = 'Please enter a valid postal code';
      }
    }

    // Step 3 (Payment) validation
    if (paymentMethod === 'card') {
      if (touched.cardName) {
        if (!cardName) {
          newErrors.cardName = 'Cardholder name is required';
        } else if (cardName.trim().split(' ').length < 2) {
          newErrors.cardName = 'Please enter first and last name';
        }
      }

      if (touched.cardNumber) {
        const rawCard = cardNumber.replace(/\s/g, '');
        const expectedLen = cardBrand === 'amex' ? 15 : 16;
        if (!rawCard) {
          newErrors.cardNumber = 'Card number is required';
        } else if (rawCard.length !== expectedLen) {
          newErrors.cardNumber = `Card number must be ${expectedLen} digits`;
        }
      }

      if (touched.cardExpiry) {
        if (!cardExpiry) {
          newErrors.cardExpiry = 'Expiry is required';
        } else if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
          newErrors.cardExpiry = 'Must be in MM/YY format';
        } else {
          const [monthStr, yearStr] = cardExpiry.split('/');
          const month = parseInt(monthStr, 10);
          const year = parseInt('20' + yearStr, 10);
          const now = new Date();
          const curMonth = now.getMonth() + 1;
          const curYear = now.getFullYear();

          if (month < 1 || month > 12) {
            newErrors.cardExpiry = 'Invalid month (01-12)';
          } else if (year < curYear || (year === curYear && month < curMonth)) {
            newErrors.cardExpiry = 'Card has expired';
          }
        }
      }

      if (touched.cardCvv) {
        const expectedCvvLen = cardBrand === 'amex' ? 4 : 3;
        if (!cardCvv) {
          newErrors.cardCvv = 'CVV is required';
        } else if (cardCvv.length !== expectedCvvLen) {
          newErrors.cardCvv = `Must be ${expectedCvvLen} digits`;
        }
      }
    }

    setErrors(newErrors);
  }, [email, phone, name, address, city, postalCode, cardName, cardNumber, cardExpiry, cardCvv, touched, paymentMethod, cardBrand]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleGoToShippingMethod = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate all fields in step 1
    const fieldsToValidate = ['email', 'phone', 'name', 'address', 'city', 'postalCode'];
    const newTouched: Record<string, boolean> = {};
    fieldsToValidate.forEach(f => {
      newTouched[f] = true;
    });
    setTouched(prev => ({ ...prev, ...newTouched }));

    // Check if any error exists for these fields
    const hasErrors = fieldsToValidate.some(f => {
      if (f === 'email' && (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return true;
      if (f === 'phone' && (!phone || phone.replace(/\D/g, '').length < 7)) return true;
      if (f === 'name' && (!name || name.trim().length < 3)) return true;
      if (f === 'address' && !address) return true;
      if (f === 'city' && !city) return true;
      if (f === 'postalCode' && (!postalCode || postalCode.trim().length < 3)) return true;
      return false;
    });

    if (!hasErrors) {
      setStep('shipping_method');
    }
  };

  const handleGoToPayment = () => {
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'card') {
      const fieldsToValidate = ['cardName', 'cardNumber', 'cardExpiry', 'cardCvv'];
      const newTouched: Record<string, boolean> = {};
      fieldsToValidate.forEach(f => {
        newTouched[f] = true;
      });
      setTouched(prev => ({ ...prev, ...newTouched }));

      const rawCard = cardNumber.replace(/\s/g, '');
      const expectedLen = cardBrand === 'amex' ? 15 : 16;
      const expectedCvvLen = cardBrand === 'amex' ? 4 : 3;

      const hasCardErrors = 
        !cardName || cardName.trim().split(' ').length < 2 ||
        !rawCard || rawCard.length !== expectedLen ||
        !cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry) ||
        !cardCvv || cardCvv.length !== expectedCvvLen;

      if (hasCardErrors) {
        return;
      }
    }

    // All clear - execute luxury checkout loader
    setStep('processing');
    
    // Step-by-step loading simulation for true authentic high-end feel
    const stages = [
      { text: 'Verifying luxury merchant credentials...', delay: 600 },
      { text: 'Encrypting transaction token (AES-256)...', delay: 1300 },
      { text: 'Securing your signature sillage archive...', delay: 2000 },
      { text: 'Finalizing authorization with card issuer...', delay: 2700 }
    ];

    stages.forEach((stage) => {
      setTimeout(() => {
        setProcessingStatus(stage.text);
      }, stage.delay);
    });

    // Complete Checkout
    setTimeout(() => {
      onComplete({
        email,
        name,
        address,
        city,
        postalCode,
        country,
        shippingMethod,
        shippingCost: shippingCosts[shippingMethod],
        paymentMethod,
        cardLast4: paymentMethod === 'card' ? cardNumber.slice(-4) : null
      });
    }, 3400);
  };

  const currentShippingCost = shippingCosts[shippingMethod];
  const total = subtotal + currentShippingCost + wrappingCost;

  return (
    <div className="flex flex-col h-full bg-brand-ivory text-brand-wine">
      
      {/* Checkout Steps Header */}
      <div className="px-6 py-4 bg-white border-b border-brand-pink/20 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand-wine/55">
            Maison Élise Atelier Checkout
          </span>
          <div className="flex items-center gap-1.5 text-brand-pink-dark">
            <Lock size={11} className="stroke-[2.5]" />
            <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">256-Bit SSL Encrypted</span>
          </div>
        </div>
        
        {/* Progress Timeline */}
        <div className="grid grid-cols-3 gap-1 relative">
          {[
            { key: 'details', label: '1. Delivery' },
            { key: 'shipping_method', label: '2. Shipping' },
            { key: 'payment', label: '3. Payment' }
          ].map((item, idx) => {
            const isActive = step === item.key || (step === 'processing' && item.key === 'payment');
            const isCompleted = 
              (step === 'shipping_method' && idx === 0) || 
              (step === 'payment' && idx <= 1) || 
              (step === 'processing');
              
            return (
              <div key={item.key} className="flex flex-col gap-1.5">
                <div className={`h-1 rounded-full transition-all duration-500 ${
                  isCompleted ? 'bg-brand-pink-dark' : isActive ? 'bg-brand-gold' : 'bg-brand-light-gray'
                }`} />
                <span className={`text-[10px] font-mono uppercase tracking-widest text-center ${
                  isActive ? 'text-brand-wine font-semibold' : 'text-brand-wine/50'
                }`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: CUSTOMER & ADDRESS DETAILS */}
          {step === 'details' && (
            <motion.div
              key="details-form"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="p-6 space-y-6"
            >
              <div>
                <h4 className="font-serif text-[17px] text-brand-wine uppercase tracking-wider mb-1">
                  1. Contact & Delivery Info
                </h4>
                <p className="font-sans text-[11px] text-brand-wine/60 leading-normal">
                  All parcels are dispatched in discreet premium outer packaging to safeguard your sillage.
                </p>
              </div>

              <form onSubmit={handleGoToShippingMethod} className="space-y-4">
                
                {/* Email & Phone */}
                <div className="bg-white border border-brand-pink-dark/10 rounded-[16px] p-4 space-y-4 shadow-2xs">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-brand-gold block border-b border-brand-pink/15 pb-1.5">
                    Customer Information
                  </span>
                  
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-wine/60 mb-1 flex items-center gap-1.5">
                      <Mail size={10} className="text-brand-wine/50" /> Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. cecile@elise-atelier.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => handleBlur('email')}
                      className={`w-full bg-brand-light-gray/30 border ${
                        errors.email ? 'border-red-500' : 'border-brand-pink-dark/15'
                      } rounded-lg py-2.5 px-3 text-xs font-sans text-brand-wine focus:outline-hidden focus:border-brand-pink-dark/40`}
                    />
                    {errors.email && (
                      <p className="text-[9px] text-red-500 mt-1 flex items-center gap-1 font-mono">
                        <AlertCircle size={9} /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-wine/60 mb-1 flex items-center gap-1.5">
                      <Phone size={10} className="text-brand-wine/50" /> Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 019-2834"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      className={`w-full bg-brand-light-gray/30 border ${
                        errors.phone ? 'border-red-500' : 'border-brand-pink-dark/15'
                      } rounded-lg py-2.5 px-3 text-xs font-sans text-brand-wine focus:outline-hidden focus:border-brand-pink-dark/40`}
                    />
                    {errors.phone && (
                      <p className="text-[9px] text-red-500 mt-1 flex items-center gap-1 font-mono">
                        <AlertCircle size={9} /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Shipping Destination */}
                <div className="bg-white border border-brand-pink-dark/10 rounded-[16px] p-4 space-y-4 shadow-2xs">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-brand-gold block border-b border-brand-pink/15 pb-1.5">
                    Shipping Destination
                  </span>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-wine/60 mb-1 flex items-center gap-1.5">
                      <User size={10} className="text-brand-wine/50" /> Full Recipient Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Countess Beatrice de Valois"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => handleBlur('name')}
                      className={`w-full bg-brand-light-gray/30 border ${
                        errors.name ? 'border-red-500' : 'border-brand-pink-dark/15'
                      } rounded-lg py-2.5 px-3 text-xs font-sans text-brand-wine focus:outline-hidden focus:border-brand-pink-dark/40`}
                    />
                    {errors.name && (
                      <p className="text-[9px] text-red-500 mt-1 flex items-center gap-1 font-mono">
                        <AlertCircle size={9} /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-wine/60 mb-1 flex items-center gap-1.5">
                      <MapPin size={10} className="text-brand-wine/50" /> Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 74 Avenue des Champs-Élysées, Apt 4B"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onBlur={() => handleBlur('address')}
                      className={`w-full bg-brand-light-gray/30 border ${
                        errors.address ? 'border-red-500' : 'border-brand-pink-dark/15'
                      } rounded-lg py-2.5 px-3 text-xs font-sans text-brand-wine focus:outline-hidden focus:border-brand-pink-dark/40`}
                    />
                    {errors.address && (
                      <p className="text-[9px] text-red-500 mt-1 flex items-center gap-1 font-mono">
                        <AlertCircle size={9} /> {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-wine/60 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Paris"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onBlur={() => handleBlur('city')}
                        className={`w-full bg-brand-light-gray/30 border ${
                          errors.city ? 'border-red-500' : 'border-brand-pink-dark/15'
                        } rounded-lg py-2.5 px-3 text-xs font-sans text-brand-wine focus:outline-hidden focus:border-brand-pink-dark/40`}
                      />
                      {errors.city && (
                        <p className="text-[9px] text-red-500 mt-1 flex items-center gap-1 font-mono">
                          <AlertCircle size={9} /> {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-wine/60 mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 75008"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        onBlur={() => handleBlur('postalCode')}
                        className={`w-full bg-brand-light-gray/30 border ${
                          errors.postalCode ? 'border-red-500' : 'border-brand-pink-dark/15'
                        } rounded-lg py-2.5 px-3 text-xs font-sans text-brand-wine focus:outline-hidden focus:border-brand-pink-dark/40`}
                      />
                      {errors.postalCode && (
                        <p className="text-[9px] text-red-500 mt-1 flex items-center gap-1 font-mono">
                          <AlertCircle size={9} /> {errors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-wine/60 mb-1 flex items-center gap-1.5">
                      <Globe size={10} className="text-brand-wine/50" /> Country *
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-brand-light-gray/30 border border-brand-pink-dark/15 rounded-lg py-2.5 px-3 text-xs font-sans text-brand-wine focus:outline-hidden focus:border-brand-pink-dark/40 cursor-pointer"
                    >
                      <option value="France">France</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Japan">Japan</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Monaco">Monaco</option>
                      <option value="Italy">Italy</option>
                    </select>
                  </div>
                </div>

                {/* Next button */}
                <button
                  type="submit"
                  className="w-full bg-brand-wine hover:bg-brand-wine-light text-white text-[11px] font-mono uppercase tracking-[0.25em] py-4 rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer mt-4"
                >
                  <span>Select Courier Method</span>
                  <ArrowRight size={12} />
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 2: SHIPPING COURIERS */}
          {step === 'shipping_method' && (
            <motion.div
              key="shipping-method-form"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="p-6 space-y-6"
            >
              <div>
                <h4 className="font-serif text-[17px] text-brand-wine uppercase tracking-wider mb-1">
                  2. Select Delivery Mode
                </h4>
                <p className="font-sans text-[11px] text-brand-wine/60 leading-normal">
                  Choose the ideal transit experience for your Maison Élise acquisition.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'standard',
                    title: 'Standard Carbon-Neutral Courier',
                    desc: 'Delivered in 3-5 business days. Pure organic protection.',
                    cost: shippingCosts.standard,
                    badge: shippingCosts.standard === 0 ? 'Complimentary' : `$${shippingCosts.standard}.00`
                  },
                  {
                    id: 'express',
                    title: 'Parisian Express Air Courier',
                    desc: 'Delivered in 1-2 business days via luxury air courier.',
                    cost: shippingCosts.express,
                    badge: `$${shippingCosts.express}.00`
                  },
                  {
                    id: 'whiteGlove',
                    title: 'White-Glove Elite Signature Hand-Delivery',
                    desc: 'Next business day. Hand-delivered in a chilled velvet-lined box with a presentation tray.',
                    cost: shippingCosts.whiteGlove,
                    badge: `$${shippingCosts.whiteGlove}.00`
                  }
                ].map((option) => {
                  const isSelected = shippingMethod === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setShippingMethod(option.id as any)}
                      className={`w-full text-left p-4 rounded-[16px] border transition-all duration-300 flex justify-between items-start gap-3 ${
                        isSelected
                          ? 'border-brand-pink-dark bg-brand-pink/25 shadow-xs'
                          : 'border-brand-pink-dark/10 bg-white hover:border-brand-pink-dark/25'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Truck size={14} className={isSelected ? 'text-brand-pink-dark' : 'text-brand-wine/50'} />
                          <span className="font-serif text-[13px] font-semibold text-brand-wine leading-tight">
                            {option.title}
                          </span>
                        </div>
                        <p className="font-sans text-[10.5px] text-brand-wine/60 leading-normal font-light">
                          {option.desc}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-mono text-[11px] font-semibold text-brand-wine uppercase">
                          {option.badge}
                        </span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'bg-brand-pink-dark border-brand-pink-dark text-white' : 'border-brand-pink-dark/20'
                        }`}>
                          {isSelected && <Check size={8} className="stroke-[3]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Secure Delivery Assurance */}
              <div className="bg-white border border-brand-pink-dark/10 rounded-[16px] p-4 flex gap-3.5 items-start">
                <ShieldCheck className="text-brand-gold shrink-0 mt-0.5" size={18} />
                <div>
                  <h5 className="font-serif text-[12px] font-semibold text-brand-wine">Guaranteed & Insured Transit</h5>
                  <p className="font-sans text-[10px] text-brand-wine/60 leading-relaxed font-light">
                    Every formulation is sealed in temper-evident botanical wraps. Full shipping values are insured at zero extra charge to you.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setStep('details')}
                  className="w-1/3 border border-brand-pink-dark/20 hover:bg-brand-pink/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-brand-wine py-4 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleGoToPayment}
                  className="w-2/3 bg-brand-wine hover:bg-brand-wine-light text-white rounded-full text-[10px] font-mono uppercase tracking-[0.2em] py-4 transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: SECURE PAYMENT GATEWAY */}
          {step === 'payment' && (
            <motion.div
              key="payment-form"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="p-6 space-y-6"
            >
              <div>
                <h4 className="font-serif text-[17px] text-brand-wine uppercase tracking-wider mb-1">
                  3. Secure Payment Gateway
                </h4>
                <p className="font-sans text-[11px] text-brand-wine/60 leading-normal">
                  Fully integrated 256-bit encrypted checkout. Tap or select your payment credential.
                </p>
              </div>

              {/* Payment Methods Selection Tabs */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'card', label: 'Card', icon: <CreditCard size={13} /> },
                  { id: 'paypal', label: 'PayPal', icon: '💎' },
                  { id: 'applepay', label: 'Apple Pay', icon: '' },
                  { id: 'googlepay', label: 'Google Pay', icon: 'G' }
                ].map((pm) => {
                  const isSel = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`py-3 px-1 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isSel
                          ? 'border-brand-pink-dark bg-brand-pink/30 text-brand-wine font-semibold shadow-2xs'
                          : 'border-brand-pink-dark/10 bg-white hover:border-brand-pink-dark/25 text-brand-wine/60'
                      }`}
                    >
                      <div className="text-[14px]">{pm.icon}</div>
                      <span className="font-mono text-[9px] uppercase tracking-wider">{pm.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Payment Details Forms */}
              <div className="bg-white border border-brand-pink-dark/10 rounded-[20px] p-5 shadow-xs space-y-4">
                
                {paymentMethod === 'card' && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="flex justify-between items-center border-b border-brand-pink/15 pb-2">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-brand-gold">
                        Credit / Debit Card Form
                      </span>
                      <div className="flex items-center gap-1">
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase transition-all ${
                          cardBrand === 'visa' ? 'bg-brand-pink-dark text-white border-transparent' : 'text-brand-wine/20 border-brand-pink-dark/10'
                        }`}>Visa</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase transition-all ${
                          cardBrand === 'mastercard' ? 'bg-brand-gold text-white border-transparent' : 'text-brand-wine/20 border-brand-pink-dark/10'
                        }`}>MC</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase transition-all ${
                          cardBrand === 'amex' ? 'bg-brand-pink-dark text-white border-transparent' : 'text-brand-wine/20 border-brand-pink-dark/10'
                        }`}>Amex</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-wine/60 mb-1">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lady Beatrice de Valois"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        onBlur={() => handleBlur('cardName')}
                        className={`w-full bg-brand-light-gray/25 border ${
                          errors.cardName ? 'border-red-500' : 'border-brand-pink-dark/15'
                        } rounded-lg py-2.5 px-3 text-xs font-sans text-brand-wine focus:outline-hidden focus:border-brand-pink-dark/40`}
                      />
                      {errors.cardName && (
                        <p className="text-[9px] text-red-500 mt-1 flex items-center gap-1 font-mono">
                          <AlertCircle size={9} /> {errors.cardName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-wine/60 mb-1 flex justify-between">
                        <span>Card Number *</span>
                        {cardBrand && (
                          <span className="text-brand-gold font-mono uppercase text-[8px] tracking-widest font-bold">
                            {cardBrand} detected
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder={cardBrand === 'amex' ? "xxxx xxxxxx xxxxx" : "xxxx xxxx xxxx xxxx"}
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          onBlur={() => handleBlur('cardNumber')}
                          className={`w-full bg-brand-light-gray/25 border ${
                            errors.cardNumber ? 'border-red-500' : 'border-brand-pink-dark/15'
                          } rounded-lg py-2.5 px-3 pr-10 text-xs font-mono text-brand-wine focus:outline-hidden focus:border-brand-pink-dark/40`}
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-brand-wine/30">
                          <CreditCard size={14} />
                        </span>
                      </div>
                      {errors.cardNumber && (
                        <p className="text-[9px] text-red-500 mt-1 flex items-center gap-1 font-mono">
                          <AlertCircle size={9} /> {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-wine/60 mb-1">
                          Expiration (MM/YY) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          onBlur={() => handleBlur('cardExpiry')}
                          className={`w-full bg-brand-light-gray/25 border ${
                            errors.cardExpiry ? 'border-red-500' : 'border-brand-pink-dark/15'
                          } rounded-lg py-2.5 px-3 text-xs font-mono text-brand-wine focus:outline-hidden focus:border-brand-pink-dark/40`}
                        />
                        {errors.cardExpiry && (
                          <p className="text-[9px] text-red-500 mt-1 flex items-center gap-1 font-mono">
                            <AlertCircle size={9} /> {errors.cardExpiry}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-wine/60 mb-1 flex items-center justify-between">
                          <span>CVV *</span>
                          <span className="group relative cursor-help">
                            <HelpCircle size={10} className="text-brand-wine/40 hover:text-brand-wine/80" />
                            <span className="pointer-events-none absolute bottom-full right-0 mb-1 w-44 bg-brand-wine text-white text-[9px] font-sans p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity leading-tight z-10 shadow-lg">
                              The 3 digits on the back of your card (or 4 on front of Amex).
                            </span>
                          </span>
                        </label>
                        <input
                          type="password"
                          required
                          placeholder={cardBrand === 'amex' ? "1234" : "123"}
                          value={cardCvv}
                          onChange={handleCvvChange}
                          onBlur={() => handleBlur('cardCvv')}
                          className={`w-full bg-brand-light-gray/25 border ${
                            errors.cardCvv ? 'border-red-500' : 'border-brand-pink-dark/15'
                          } rounded-lg py-2.5 px-3 text-xs font-mono text-brand-wine focus:outline-hidden focus:border-brand-pink-dark/40`}
                        />
                        {errors.cardCvv && (
                          <p className="text-[9px] text-red-500 mt-1 flex items-center gap-1 font-mono">
                            <AlertCircle size={9} /> {errors.cardCvv}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="save-card"
                        checked={saveInfo}
                        onChange={(e) => setSaveInfo(e.target.checked)}
                        className="rounded border-brand-pink-dark/20 text-brand-pink-dark focus:ring-brand-pink-dark"
                      />
                      <label htmlFor="save-card" className="text-[10px] text-brand-wine/65 font-sans cursor-pointer select-none">
                        Save this card securely in my Maison Élise profile
                      </label>
                    </div>
                  </form>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="py-6 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-brand-pink/15 flex items-center justify-center mx-auto text-xl font-bold text-brand-pink-dark">
                      P
                    </div>
                    <div>
                      <h5 className="font-serif text-[13px] font-semibold text-brand-wine">Pay with PayPal</h5>
                      <p className="font-sans text-[10.5px] text-brand-wine/60 leading-relaxed max-w-xs mx-auto mt-1">
                        We will redirect you to the PayPal login portal to complete your secure purchase. No credit card details are stored with us.
                      </p>
                    </div>
                    <div className="bg-brand-light-gray/40 p-3 rounded-lg inline-block text-[10px] font-mono text-brand-wine/65 border border-brand-pink-dark/10">
                      Standard luxury checkout redirects applied
                    </div>
                  </div>
                )}

                {paymentMethod === 'applepay' && (
                  <div className="py-6 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mx-auto text-white text-xl">
                      
                    </div>
                    <div>
                      <h5 className="font-serif text-[13px] font-semibold text-brand-wine">Apple Pay Protocol</h5>
                      <p className="font-sans text-[10.5px] text-brand-wine/60 leading-relaxed max-w-xs mx-auto mt-1">
                        Express verification with Apple FaceID or TouchID. All payment details are masked using virtual merchant account tokens.
                      </p>
                    </div>
                    <div className="bg-brand-light-gray/40 p-3 rounded-lg inline-block text-[10px] font-mono text-brand-wine/65 border border-brand-pink-dark/10">
                      Eligible with macOS and iOS devices
                    </div>
                  </div>
                )}

                {paymentMethod === 'googlepay' && (
                  <div className="py-6 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-brand-light-gray flex items-center justify-center mx-auto text-lg font-bold text-gray-700">
                      G
                    </div>
                    <div>
                      <h5 className="font-serif text-[13px] font-semibold text-brand-wine">Google Pay Integration</h5>
                      <p className="font-sans text-[10.5px] text-brand-wine/60 leading-relaxed max-w-xs mx-auto mt-1">
                        Utilize your saved Google Account credentials for instantaneous and safe shipping confirmation and billing.
                      </p>
                    </div>
                    <div className="bg-brand-light-gray/40 p-3 rounded-lg inline-block text-[10px] font-mono text-brand-wine/65 border border-brand-pink-dark/10">
                      Standard Chrome Secure Enclave active
                    </div>
                  </div>
                )}

              </div>

              {/* Secure payment logos and SSL */}
              <div className="border border-brand-pink-dark/10 bg-brand-light-gray/40 rounded-[16px] p-4 text-center space-y-2">
                <div className="flex justify-center items-center gap-1.5 text-brand-pink-dark">
                  <ShieldCheck size={14} />
                  <span className="font-serif text-[11px] font-bold text-brand-wine tracking-wide">
                    Atelier Security Guarantee
                  </span>
                </div>
                <p className="font-sans text-[10px] text-brand-wine/55 leading-relaxed max-w-[320px] mx-auto">
                  Maison Élise holds certified PCI-DSS Level 1 compliance. All sessions are protected with active TLS 1.3 protocol.
                </p>
                <div className="flex justify-center items-center gap-3 opacity-60 text-[10px] font-mono text-brand-wine/80">
                  <span>PCI-DSS</span>
                  <span>•</span>
                  <span>TLS 1.3</span>
                  <span>•</span>
                  <span>SCA Ready</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setStep('shipping_method')}
                  className="w-1/3 border border-brand-pink-dark/20 hover:bg-brand-pink/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-brand-wine py-4 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handlePaymentSubmit}
                  className="w-2/3 bg-brand-wine hover:bg-brand-wine-light text-white rounded-full text-[10px] font-mono uppercase tracking-[0.2em] py-4 transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  <span>Pay Now (${total}.00)</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: LOADING / PROCESSING SECURE PAYMENT */}
          {step === 'processing' && (
            <motion.div
              key="processing-payment"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 h-full flex flex-col items-center justify-center text-center space-y-6 my-12"
            >
              <div className="relative">
                <Loader2 className="animate-spin text-brand-gold w-16 h-16 stroke-[1.5]" />
                <div className="absolute inset-0 flex items-center justify-center text-[20px]">
                  🔒
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand-pink-dark animate-pulse">
                  Secure Connection Established
                </span>
                <h4 className="font-serif text-[18px] text-brand-wine tracking-wide">
                  Processing Your Transaction
                </h4>
                <p className="font-sans text-[12px] text-brand-wine/75 font-light leading-relaxed max-w-xs mx-auto">
                  {processingStatus}
                </p>
              </div>

              <div className="bg-brand-pink/25 border border-brand-pink-dark/10 rounded-xl p-3.5 max-w-[260px] mx-auto font-mono text-[9px] text-brand-wine/60 uppercase tracking-wider">
                Do not refresh or close this view
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Cart Summary Side-Rail (Sticky at the bottom of the checkout drawer) */}
      {step !== 'processing' && (
        <div className="p-6 border-t border-brand-pink/20 bg-white space-y-2.5 shrink-0">
          <div className="flex justify-between text-[11px] text-brand-wine/70 font-light">
            <span>Atelier Luxury Subtotal</span>
            <span className="font-mono">${subtotal}.00</span>
          </div>
          {wrappingCost > 0 && (
            <div className="flex justify-between text-[11px] text-brand-wine/70 font-light">
              <span>Signature Wrapping Box</span>
              <span className="font-mono">+${wrappingCost}.00</span>
            </div>
          )}
          <div className="flex justify-between text-[11px] text-brand-wine/70 font-light">
            <span>Premium Courier Transit</span>
            <span className="font-mono">
              {currentShippingCost === 0 ? (
                <span className="text-brand-gold uppercase text-[10px] font-semibold tracking-wider">
                  Complimentary
                </span>
              ) : (
                `+$${currentShippingCost}.00`
              )}
            </span>
          </div>
          <div className="h-[1px] bg-brand-pink/15 pt-1" />
          <div className="flex justify-between items-end text-brand-wine">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-brand-wine/45 block">
                Estimated Debit Total
              </span>
              <span className="font-mono text-[16px] sm:text-[18px] font-semibold">
                ${total}.00
              </span>
            </div>
            <span className="text-[9px] font-mono text-brand-wine/40 uppercase">Tax included</span>
          </div>
        </div>
      )}

    </div>
  );
}
