export interface Hotel {
  HOTEL: string;
  CITY: string;
  LOCATION: string;
  RATING: number;
  PRICE: number;
  ORIGINAL_PRICE: number;
  'WEBSITE LINK': string;
  'IMAGE LINK': string;
  similarity_score?: number;
}

export interface SearchParams {
  city: string;
  budget: number;
  rating: number;
  luxury: 'BUDGET' | 'MID RANGE' | 'LUXURY';
  wifi: boolean;
  pool: boolean;
  parking: boolean;
  family_friendly: boolean;
}

export type LuxuryCategory = 'BUDGET' | 'MID RANGE' | 'LUXURY';
