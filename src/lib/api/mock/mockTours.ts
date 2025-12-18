import { Tour } from '@/types/tour';

export const MOCK_TOURS: Tour[] = [
  {
    id: '1',
    title: 'Northern Lights Adventure',
    description: 'Experience the magical aurora borealis in Iceland with expert guides. This 7-day journey takes you through stunning landscapes and the best viewing spots.',
    price: 2999,
    duration: 7,
    maxGroupSize: 15,
    difficulty: 'moderate',
    rating: 4.8,
    reviewsCount: 124,
    images: [
      'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800',
    ],
    destination: 'Iceland',
    startDates: [
      new Date('2025-01-15'),
      new Date('2025-02-10'),
      new Date('2025-03-05'),
    ],
    featured: true,
  },
  {
    id: '2',
    title: 'Safari in Tanzania',
    description: 'Witness the great migration and encounter Africa\'s majestic wildlife in their natural habitat.',
    price: 4500,
    duration: 10,
    maxGroupSize: 12,
    difficulty: 'easy',
    rating: 4.9,
    reviewsCount: 87,
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    ],
    destination: 'Tanzania',
    startDates: [
      new Date('2025-02-01'),
      new Date('2025-03-15'),
      new Date('2025-04-20'),
    ],
    featured: true,
  },
  {
    id: '3',
    title: 'Machu Picchu Trek',
    description: 'Hike the ancient Inca Trail to the legendary Machu Picchu citadel.',
    price: 1899,
    duration: 5,
    maxGroupSize: 20,
    difficulty: 'difficult',
    rating: 4.7,
    reviewsCount: 203,
    images: [
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800',
    ],
    destination: 'Peru',
    startDates: [
      new Date('2025-03-10'),
      new Date('2025-04-15'),
      new Date('2025-05-20'),
    ],
    featured: false,
  },
];
