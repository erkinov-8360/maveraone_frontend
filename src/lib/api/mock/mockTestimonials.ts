export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  avatar: string;
}

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sardor Rahimov',
    location: 'Tashkent, Uzbekistan',
    rating: 5.0,
    title: 'Amazing Experience',
    comment: 'Our trip to Samarkand was absolutely incredible! The tour guides were knowledgeable and friendly, and every detail was perfectly organized. I highly recommend MaveraOne for anyone wanting to explore Uzbekistan.',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '2',
    name: 'Elena Petrova',
    location: 'Moscow, Russia',
    rating: 5.0,
    title: 'Unforgettable Journey',
    comment: 'The Grand Silk Road Circuit exceeded all my expectations. From the stunning architecture of Bukhara to the hospitality of our guides, everything was perfect. This was truly the trip of a lifetime!',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '3',
    name: 'John Smith',
    location: 'London, United Kingdom',
    rating: 5.0,
    title: 'Professional Service',
    comment: 'MaveraOne provided exceptional service from start to finish. The accommodations were comfortable, the food was delicious, and our guide made the history come alive. I can\'t wait to return!',
    avatar: 'https://i.pravatar.cc/150?img=33',
  },
  {
    id: '4',
    name: 'Yuki Tanaka',
    location: 'Tokyo, Japan',
    rating: 5.0,
    title: 'Cultural Immersion',
    comment: 'The Fergana Valley tour was a wonderful cultural experience. We learned so much about traditional crafts and met amazing local artisans. The silk workshops were my favorite part!',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
  {
    id: '5',
    name: 'Maria Garcia',
    location: 'Barcelona, Spain',
    rating: 5.0,
    title: 'Hidden Gem',
    comment: 'Khiva was like stepping back in time! The ancient city walls and beautiful minarets were breathtaking. Our guide was patient with all our questions and made the experience very special.',
    avatar: 'https://i.pravatar.cc/150?img=23',
  },
  {
    id: '6',
    name: 'Ahmed Hassan',
    location: 'Dubai, UAE',
    rating: 5.0,
    title: 'Excellent Organization',
    comment: 'Everything was perfectly organized from airport pickup to hotel check-out. The attention to detail and customer service were outstanding. Thank you MaveraOne for a memorable vacation!',
    avatar: 'https://i.pravatar.cc/150?img=51',
  },
];
