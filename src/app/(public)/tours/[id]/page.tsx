'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { getTourDetail, MOCK_TOUR_DETAILS } from '@/lib/api/mock/mockTourDetails';
import { MOCK_TOURS } from '@/lib/api/mock/mockTours';
import { Clock, Users, Globe, Star, Check, X, MapPin, Calendar, Play, Phone, ChevronLeft, Minus, Plus } from 'lucide-react';

interface TourDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TourDetailPage({ params }: TourDetailPageProps) {
  const { id } = use(params);
  const [guestCount, setGuestCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Try to get detailed tour data, fallback to basic tour data
  let tour = getTourDetail(id);

  if (!tour) {
    // Fallback to basic tour data with default details
    const basicTour = MOCK_TOURS.find(t => t.id === id);
    if (!basicTour) {
      notFound();
    }
    // Convert basic tour to detail format with defaults
    tour = {
      ...basicTour,
      language: 'English',
      highlights: [
        'Expert local guide throughout the tour',
        'Comfortable transportation',
        'Authentic cultural experiences',
        'Small group size for personalized attention',
      ],
      itinerary: Array.from({ length: basicTour.duration }, (_, i) => ({
        day: i + 1,
        title: `Day ${i + 1} Activities`,
        subtitle: 'Explore and discover',
        description: 'Detailed itinerary coming soon. Contact us for more information about this tour day.',
      })),
      included: [
        'Accommodation',
        'Daily breakfast',
        'Airport transfers',
        'English-speaking guide',
        'Entrance fees',
      ],
      excluded: [
        'International flights',
        'Travel insurance',
        'Personal expenses',
      ],
      reviews: [],
    };
  }

  const totalPrice = tour.price * guestCount;
  const discountedPrice = tour.discountPercent
    ? Math.round(tour.price * (1 - tour.discountPercent / 100))
    : tour.price;
  const totalDiscountedPrice = discountedPrice * guestCount;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 150;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative w-full h-[60vh] min-h-[500px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url("${tour.images[0]}")`,
        }}
      >
        {/* Back Button */}
        <Link
          href="/tours"
          className="absolute top-6 left-6 flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to Tours</span>
        </Link>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div className="max-w-4xl flex flex-col gap-4 items-center">
            {tour.featured && (
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Featured Tour
              </span>
            )}
            <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
              {tour.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-white text-sm md:text-base font-medium mt-2">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{tour.duration} Days / {tour.duration - 1} Nights</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{tour.destination}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{tour.rating} ({tour.reviewsCount} Reviews)</span>
              </div>
            </div>
            <button className="mt-6 flex items-center justify-center gap-2 h-12 px-6 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full transition-all">
              <Play className="w-5 h-5" />
              <span className="font-bold">Watch Video</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-10 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column - Content */}
          <div className="flex-1 w-full lg:w-2/3">
            {/* Sticky Navigation Tabs */}
            <div className="sticky top-0 z-40 bg-gray-50 pb-4 pt-2 -mx-4 px-4 lg:mx-0 lg:px-0">
              <div className="flex border-b border-gray-200 gap-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 min-w-max transition-colors ${
                      activeTab === tab.id
                        ? 'border-b-blue-600 text-blue-600'
                        : 'border-b-transparent text-gray-500 hover:text-blue-600'
                    }`}
                  >
                    <span className="text-sm font-bold tracking-wide">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div id="overview" className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 scroll-mt-32">
              <Card className="p-4">
                <Clock className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Duration</p>
                <p className="text-gray-900 text-lg font-bold">{tour.duration} Days</p>
              </Card>
              <Card className="p-4">
                <Users className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Group Size</p>
                <p className="text-gray-900 text-lg font-bold">Max {tour.maxGroupSize}</p>
              </Card>
              <Card className="p-4">
                <Globe className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Language</p>
                <p className="text-gray-900 text-lg font-bold">{tour.language}</p>
              </Card>
              <Card className="p-4">
                <Star className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Rating</p>
                <p className="text-gray-900 text-lg font-bold">{tour.rating}/5</p>
              </Card>
            </div>

            {/* Description Section */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Experience {tour.destination}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {tour.description}
              </p>

              <h4 className="text-lg font-bold mb-4 mt-8">Highlights</h4>
              <ul className="grid md:grid-cols-2 gap-3">
                {tour.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary Section */}
            <section id="itinerary" className="mb-12 scroll-mt-32">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Itinerary</h3>
              <Accordion type="single" collapsible defaultValue="day-1" className="space-y-4">
                {tour.itinerary.map((day) => (
                  <AccordionItem
                    key={day.day}
                    value={`day-${day.day}`}
                    className="bg-white rounded-xl border border-gray-100 overflow-hidden"
                  >
                    <AccordionTrigger className="px-5 py-4 hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                          {String(day.day).padStart(2, '0')}
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-lg text-gray-900">{day.title}</h4>
                          <p className="text-sm text-gray-500">{day.subtitle}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed pt-4">
                        {day.description}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="mb-12 scroll-mt-32">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Photo Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {tour.images.map((image, index) => (
                  <div
                    key={index}
                    className={`rounded-xl overflow-hidden relative group ${
                      index === 0 ? 'col-span-2 row-span-2 h-80' : 'h-40'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${tour.title} - Image ${index + 1}`}
                      className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                    />
                    {index === tour.images.length - 1 && tour.images.length > 3 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-white font-bold text-sm">View All Photos</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Included/Excluded Section */}
            <section className="mb-12 grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h4 className="font-bold text-lg mb-4 text-green-600">What&apos;s Included</h4>
                <ul className="space-y-3">
                  {tour.included.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-6">
                <h4 className="font-bold text-lg mb-4 text-red-500">What&apos;s Excluded</h4>
                <ul className="space-y-3">
                  {tour.excluded.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-gray-600">
                      <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="scroll-mt-32">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Traveler Reviews</h3>
              {tour.reviews.length > 0 ? (
                <div className="grid gap-6">
                  {tour.reviews.map((review) => (
                    <Card key={review.id} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-bold text-gray-900">{review.userName}</p>
                            <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'fill-yellow-400' : 'fill-gray-200 text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 italic">&ldquo;{review.comment}&rdquo;</p>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
                </Card>
              )}
            </section>
          </div>

          {/* Right Column - Booking Card */}
          <aside className="w-full lg:w-1/3 relative">
            <div className="sticky top-24">
              <Card className="p-6 shadow-xl">
                <div className="flex items-end justify-between border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Starting from</p>
                    <div className="flex items-baseline gap-2">
                      {tour.discountPercent ? (
                        <>
                          <span className="text-3xl font-bold text-blue-600">${discountedPrice}</span>
                          <span className="text-lg text-gray-400 line-through">${tour.price}</span>
                        </>
                      ) : (
                        <span className="text-3xl font-bold text-blue-600">${tour.price}</span>
                      )}
                      <span className="text-gray-500 text-sm">/ person</span>
                    </div>
                  </div>
                  {tour.discountPercent && (
                    <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                      {tour.discountPercent}% OFF
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-4 mt-6">
                  {/* Date Selector */}
                  <div>
                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">
                      Select Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full h-12 pl-4 pr-10 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:ring-blue-600 focus:border-blue-600"
                      />
                      <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Guest Counter */}
                  <div>
                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">
                      Guests
                    </label>
                    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg h-12 px-4">
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        className="w-8 h-8 rounded-lg hover:bg-gray-200 flex items-center justify-center text-blue-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-gray-900">{guestCount} {guestCount === 1 ? 'Adult' : 'Adults'}</span>
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.min(tour.maxGroupSize, guestCount + 1))}
                        className="w-8 h-8 rounded-lg hover:bg-gray-200 flex items-center justify-center text-blue-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="bg-blue-50 p-4 rounded-lg mt-2">
                    <div className="flex justify-between text-sm mb-2 text-gray-900">
                      <span>${discountedPrice} x {guestCount} {guestCount === 1 ? 'Adult' : 'Adults'}</span>
                      <span className="font-bold">${totalDiscountedPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2 text-gray-900">
                      <span>Service Fee</span>
                      <span className="font-bold">$0</span>
                    </div>
                    <div className="border-t border-blue-100 my-2 pt-2 flex justify-between text-base font-bold text-blue-600">
                      <span>Total</span>
                      <span>${totalDiscountedPrice}</span>
                    </div>
                  </div>

                  <Button className="w-full h-12 flex items-center justify-center gap-2">
                    Book Now
                    <ChevronLeft className="w-4 h-4 rotate-180" />
                  </Button>
                </div>

                <p className="text-center text-xs text-gray-500 mt-4">
                  Free cancellation up to 48 hours before the trip.
                </p>
              </Card>

              {/* Help Card */}
              <Card className="mt-6 p-6">
                <h5 className="font-bold text-sm mb-4">Need Help?</h5>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Call us 24/7</p>
                    <p className="font-bold text-gray-900">+1 (555) 123-4567</p>
                  </div>
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </div>

      {/* Map Section Placeholder */}
      <div className="w-full h-[400px] mt-10 bg-gray-200 relative overflow-hidden">
        <img
          src={tour.images[0]}
          alt={`Map view of ${tour.destination}`}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="bg-white text-gray-900 px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform">
            <MapPin className="w-5 h-5 text-blue-600" />
            View on Map
          </button>
        </div>
      </div>
    </div>
  );
}
