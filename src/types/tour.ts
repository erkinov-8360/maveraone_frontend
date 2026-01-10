export interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number; // in days
  maxGroupSize: number;
  difficulty: 'easy' | 'moderate' | 'difficult';
  rating: number;
  reviewsCount: number;
  images: string[];
  destination: string;
  startDates: Date[];
  featured: boolean;
}

export interface ItineraryDay {
  day: number;
  title: string;
  subtitle: string;
  description: string;
}

export interface TourReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface TourCoordinates {
  latitude: number;
  longitude: number;
}

export interface TourDetail extends Tour {
  highlights: string[];
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
  reviews: TourReview[];
  language: string;
  discountPercent?: number;
  coordinates?: TourCoordinates;
}
