'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MOCK_TOURS } from '@/lib/api/mock/mockTours';
import { MapPin, Clock, Star, ChevronLeft, ChevronRight, Search, SlidersHorizontal, Grid3X3, List, ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function ToursPage() {
  const [destination, setDestination] = useState('all');
  const [duration, setDuration] = useState('any');
  const [activityType, setActivityType] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort tours
  let filteredTours = [...MOCK_TOURS];

  // Apply duration filter
  if (duration !== 'any') {
    if (duration === '1-3') {
      filteredTours = filteredTours.filter(t => t.duration >= 1 && t.duration <= 3);
    } else if (duration === '4-7') {
      filteredTours = filteredTours.filter(t => t.duration >= 4 && t.duration <= 7);
    } else if (duration === '14+') {
      filteredTours = filteredTours.filter(t => t.duration >= 14);
    }
  }

  // Apply difficulty filter (using as activity type)
  if (activityType !== 'all') {
    filteredTours = filteredTours.filter(t => t.difficulty === activityType);
  }

  // Apply sorting
  if (sortBy === 'price-low') {
    filteredTours.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredTours.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredTours.sort((a, b) => b.rating - a.rating);
  }

  const toursPerPage = 6;
  const totalPages = Math.ceil(filteredTours.length / toursPerPage);
  const startIndex = (currentPage - 1) * toursPerPage;
  const displayedTours = filteredTours.slice(startIndex, startIndex + toursPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="relative w-full h-[500px] flex flex-col justify-end pb-24 md:pb-32 overflow-hidden rounded-b-[40px] shadow-sm">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8VGOzJQTtYgXA6sdTGLXxIQ2whH_R51Z5siduEUXETluBZF32limWtHK9DtMkGBT7rJ6f2QN3gwGHMKhAIhJvXEfYLi7khPf7c1ZPkF1X9VJ0E8Zb27j9eoTep8aJxMUhVqmETh1sF0__maWN0lzU22gvYEe-1CyxeL7okmGpVeue6BZjEpzAgj2w8mjXbG1RTWTP5f--YVdSwVzTick9P8qfRPpQ4z4gZ0rV3UyMOsMEzeKFhx4K6RcNayfFjWThFP5jRvMU_1XH')`,
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-10">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-4 text-white/80 text-sm font-medium"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Tours</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl"
          >
            Explore Our Tours
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-white/90 max-w-2xl font-light"
          >
            Discover unforgettable journeys curated just for you. From mountain peaks to city streets, find your perfect adventure.
          </motion.p>
        </div>
      </header>

      {/* Filter & Sort Bar (Floating) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-20 -mt-16 px-6 md:px-10 mb-12"
      >
        <div className="max-w-[1280px] mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex flex-col xl:flex-row gap-6 items-end">
            {/* Filter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {/* Destination */}
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-gray-700">Destination</span>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 z-10 pointer-events-none" />
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger className="w-full h-12 pl-12 pr-10 bg-gray-50 border-transparent rounded-2xl focus:border-blue-600 focus:ring-blue-600 text-sm font-medium text-gray-800">
                      <SelectValue placeholder="All Destinations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Destinations</SelectItem>
                      <SelectItem value="samarkand">Samarkand</SelectItem>
                      <SelectItem value="bukhara">Bukhara</SelectItem>
                      <SelectItem value="tashkent">Tashkent</SelectItem>
                      <SelectItem value="khiva">Khiva</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </label>

              {/* Duration */}
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-gray-700">Duration</span>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 z-10 pointer-events-none" />
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="w-full h-12 pl-12 pr-10 bg-gray-50 border-transparent rounded-2xl focus:border-blue-600 focus:ring-blue-600 text-sm font-medium text-gray-800">
                      <SelectValue placeholder="Any Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Duration</SelectItem>
                      <SelectItem value="1-3">1-3 Days</SelectItem>
                      <SelectItem value="4-7">4-7 Days</SelectItem>
                      <SelectItem value="14+">2 Weeks+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </label>

              {/* Activity Type */}
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-gray-700">Difficulty</span>
                <div className="relative">
                  <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 z-10 pointer-events-none" />
                  <Select value={activityType} onValueChange={setActivityType}>
                    <SelectTrigger className="w-full h-12 pl-12 pr-10 bg-gray-50 border-transparent rounded-2xl focus:border-blue-600 focus:ring-blue-600 text-sm font-medium text-gray-800">
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="difficult">Difficult</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </label>

              {/* Sort By */}
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-gray-700">Sort By</span>
                <div className="relative">
                  <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 z-10 pointer-events-none" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full h-12 pl-12 pr-10 bg-gray-50 border-transparent rounded-2xl focus:border-blue-600 focus:ring-blue-600 text-sm font-medium text-gray-800">
                      <SelectValue placeholder="Recommended" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </label>
            </div>

            {/* Search Button */}
            <div className="w-full xl:w-auto mt-4 xl:mt-0">
              <button className="w-full xl:w-auto h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all">
                <Search className="w-5 h-5" />
                <span>Find Tours</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <main className="w-full max-w-[1280px] mx-auto px-6 md:px-10 pb-20">
        {/* Results Count */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            Showing {filteredTours.length} Tours
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white border-gray-200 text-blue-600'
                  : 'bg-transparent border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === 'list'
                  ? 'bg-white border-gray-200 text-blue-600'
                  : 'bg-transparent border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Tours Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayedTours.map((tour, index) => (
            <motion.div
              key={tour.id}
              variants={scaleUpVariants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/tours/${tour.id}`}>
                <article className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={tour.images[0]}
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{tour.rating}</span>
                    </div>
                    {/* Featured Badge */}
                    {tour.featured && (
                      <div className="absolute bottom-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        Best Seller
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>{tour.destination}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                        <Clock className="w-4 h-4" />
                        <span>{tour.duration} Days</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tour.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                      {tour.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Starting from</p>
                        <p className="text-xl font-bold text-blue-600">${tour.price}</p>
                      </div>
                      <span className="bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-900 font-bold py-2.5 px-5 rounded-xl transition-colors text-sm">
                        View Details
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center mt-16 gap-2"
          >
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
