import { Tour } from '@/types/tour';

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md transition-shadow duration-300 overflow-hidden group cursor-pointer">
      <div className="overflow-hidden relative">
        <img
          src={tour.images[0]}
          alt={tour.title}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium z-10 shadow-sm">
          {tour.duration} days
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#F5B546] uppercase tracking-wider">
            {tour.destination}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 text-sm">★</span>
            <span className="font-medium text-sm">{tour.rating}</span>
            <span className="text-gray-400 text-xs">
              ({tour.reviewsCount})
            </span>
          </div>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2  transition-colors">
          {tour.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-light">
          {tour.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-500 font-light">From</span>
          <span className="text-2xl font-medium text-gray-900">
            ${tour.price}
          </span>
        </div>
      </div>
    </div>
  );
}
