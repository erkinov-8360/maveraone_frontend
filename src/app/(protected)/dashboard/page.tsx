'use client';

import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { MOCK_TOURS } from '@/lib/api/mock/mockTours';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Ready for your next adventure?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Upcoming Bookings
          </h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
          <p className="text-sm text-gray-600 mt-1">No upcoming trips</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Completed Tours
          </h3>
          <p className="text-3xl font-bold text-green-600">0</p>
          <p className="text-sm text-gray-600 mt-1">Start exploring!</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Total Spent
          </h3>
          <p className="text-3xl font-bold text-gray-900">$0</p>
          <p className="text-sm text-gray-600 mt-1">Book your first tour</p>
        </Card>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Featured Tours</h2>
        <Link href={ROUTES.TOURS}>
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_TOURS.filter(tour => tour.featured).slice(0, 3).map((tour) => (
          <Card key={tour.id} className="overflow-hidden p-0">
            <img
              src={tour.images[0]}
              alt={tour.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-600 uppercase">
                  {tour.destination}
                </span>
                <span className="text-sm text-gray-600">
                  {tour.duration} days
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {tour.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {tour.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="font-semibold">{tour.rating}</span>
                </div>
                <span className="text-xl font-bold text-blue-600">
                  ${tour.price}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
