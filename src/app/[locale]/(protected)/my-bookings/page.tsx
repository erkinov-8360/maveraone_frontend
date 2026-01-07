'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';

export default function MyBookingsPage() {
  const bookings: any[] = [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">My Bookings</h1>
        <p className="mt-2 text-gray-600">
          View and manage your tour bookings
        </p>
      </div>

      {bookings.length === 0 ? (
        <Card className="text-center py-16">
          <div className="max-w-md mx-auto">
            <svg
              className="mx-auto h-24 w-24 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No bookings yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start planning your next adventure by browsing our amazing tours
            </p>
            <Link href={ROUTES.TOURS}>
              <Button size="lg">
                Explore Tours
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <p>Booking details</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
