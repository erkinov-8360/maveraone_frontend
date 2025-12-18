export interface Booking {
  id: string;
  userId: string;
  tourId: string;
  startDate: Date;
  participants: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}
