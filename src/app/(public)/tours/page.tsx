import Link from 'next/link';
import { MOCK_TOURS } from '@/lib/api/mock/mockTours';
import { Card } from '@/components/ui/Card';

export default function ToursPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Tours</h1>
        <p className="text-gray-600">
          Discover amazing adventures around the world
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TOURS.map((tour) => (
          <Link key={tour.id} href={`/tours/${tour.id}`}>
            <Card className="overflow-hidden p-0 h-full hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              <div className="relative overflow-hidden">
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                {tour.featured && (
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600 uppercase">
                    {tour.destination}
                  </span>
                  <span className="text-sm text-gray-600">
                    {tour.duration} days
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {tour.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {tour.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold">{tour.rating}</span>
                    <span className="text-gray-500 text-sm">
                      ({tour.reviewsCount})
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    ${tour.price}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
