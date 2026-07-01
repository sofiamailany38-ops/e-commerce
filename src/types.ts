export interface OlfactoryNotes {
  top: string;
  heart: string;
  base: string;
}

export type ProductCategory =
  | 'perfumes'
  | 'daily-moisturizers'
  | 'night-creams'
  | 'day-creams'
  | 'facial-cleansers'
  | 'body-cleansers'
  | 'gentle-cleansers'
  | 'facial-scrubs'
  | 'face-masks';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  emoji: string;
  price: number;
  volume: string;
  concentration: string;
  description: string;
  ingredients: string[];
  olfactoryNotes?: OlfactoryNotes;
  skinConcerns?: string[];
  applicationRitual: string;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  collection: string;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  location: string;
  verified: boolean;
  skinProfile?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    value: string;
  }[];
}
