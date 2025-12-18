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
