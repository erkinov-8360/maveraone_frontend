'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Search, CalendarDays, Calendar, Users, Star, StarHalf, ShieldCheck, HeadphonesIcon, Hotel, ChevronDown } from 'lucide-react';
import { MOCK_TOURS } from '@/lib/api/mock/mockTours';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'John Doe',
    trip: 'Bali Trip',
    initials: 'JD',
    bgColor: 'bg-blue-100',
    textColor: 'text-[#137fec]',
    rating: 5,
    comment: 'Maveraone made our honeymoon unforgettable! The booking process was seamless, and the hotel recommendations were spot on. Highly recommended!',
  },
  {
    id: 2,
    name: 'Emma Smith',
    trip: 'Japan Tour',
    initials: 'ES',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
    rating: 5,
    comment: 'I was nervous about traveling solo, but the support team was there 24/7. The group tour to Kyoto was organized perfectly. I made friends for life.',
  },
  {
    id: 3,
    name: 'Michael Ross',
    trip: 'Swiss Alps',
    initials: 'MR',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    rating: 4.5,
    comment: 'Great prices and amazing destinations. The Swiss Alps package was a dream come true. Will definitely book my next summer vacation here.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and direct bank transfers. All transactions are secured with industry-standard encryption.',
  },
  {
    question: 'Can I cancel or modify my booking?',
    answer: 'Yes, modifications can be made up to 14 days before your trip. Cancellations made 30 days in advance are eligible for a full refund. Please check specific tour policies as they may vary.',
  },
  {
    question: 'Is travel insurance included?',
    answer: 'Basic travel insurance is included in some premium packages. For standard bookings, we highly recommend purchasing comprehensive travel insurance separately to cover medical emergencies and trip interruptions.',
  },
  {
    question: 'Do you offer group discounts?',
    answer: 'Yes! We offer special rates for groups of 10 or more. Please contact our support team with your group details to get a customized quote.',
  },
];

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
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex gap-1 text-yellow-500">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-current" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-current" />}
    </div>
  );
}

export default function HomePage() {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState('');
  const [email, setEmail] = useState('');

  return (
    <>
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        {/* Hero Section */}
        <div
          className="relative w-full min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%), url('/images/main-bg.jpg')`,
          }}
        >
          <Navbar />

          <div className="flex flex-col items-center justify-center flex-1 px-4 md:px-10 pb-10 z-10 w-full max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-6 text-center max-w-[800px]">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-white text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-[-0.033em] drop-shadow-lg"
              >
                Discover the World&apos;s Hidden Gems
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="text-white/90 text-lg md:text-xl font-medium leading-relaxed drop-shadow-md max-w-2xl mx-auto"
              >
                Curated tours and exclusive deals for the modern explorer. Start your journey with Maveraone.
              </motion.h2>
            </div>

            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              className="w-full max-w-[1024px] mt-10 z-10"
            >
              <div className="flex flex-col lg:flex-row w-full bg-white rounded-full p-2 shadow-2xl gap-2 lg:gap-0">
                <div className="flex w-full items-center px-4 lg:px-6 border-b lg:border-b-0 lg:border-r border-[#f0f2f4]">
                  <Search className="w-5 h-5 text-[#617589]" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Where do you want to go?"
                    className="w-full h-12 px-3 text-[#111418] placeholder:text-[#617589] bg-transparent border-none focus:ring-0 focus:outline-none text-sm font-medium"
                  />
                </div>
                <div className="flex w-full items-center px-4 lg:px-6 border-b lg:border-b-0 lg:border-r border-[#f0f2f4]">
                  <CalendarDays className="w-5 h-5 text-[#617589]" />
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Start Date"
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = 'text';
                    }}
                    className="w-full h-12 px-3 text-[#111418] placeholder:text-[#617589] bg-transparent border-none focus:ring-0 focus:outline-none text-sm font-medium"
                  />
                </div>
                <div className="flex w-full items-center px-4 lg:px-6 border-b lg:border-b-0 lg:border-r border-[#f0f2f4]">
                  <Calendar className="w-5 h-5 text-[#617589]" />
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="End Date"
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = 'text';
                    }}
                    className="w-full h-12 px-3 text-[#111418] placeholder:text-[#617589] bg-transparent border-none focus:ring-0 focus:outline-none text-sm font-medium"
                  />
                </div>
                <div className="flex w-full items-center px-4 lg:px-6">
                  <Users className="w-5 h-5 text-[#617589]" />
                  <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    placeholder="Guests"
                    className="w-full h-12 px-3 text-[#111418] placeholder:text-[#617589] bg-transparent border-none focus:ring-0 focus:outline-none text-sm font-medium"
                  />
                </div>
                <button className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-full bg-[#137fec] text-white text-sm font-bold h-12 px-6 hover:bg-blue-600 transition-colors">
                  Search
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 justify-center py-12">
          <div className="flex flex-col w-full max-w-[1200px] flex-1 px-4 md:px-10 lg:px-20">

            {/* Top Trending Destinations */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUpVariants}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col w-full mb-16"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em]">Top Trending Destinations</h2>
                <Link href="/tours" className="text-[#137fec] text-sm font-bold hover:underline">View all</Link>
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {MOCK_TOURS.filter(tour => tour.featured).slice(0, 4).map((tour, index) => (
                  <Link key={tour.id} href={`/tours/${tour.id}`}>
                    <motion.div
                      variants={scaleUpVariants}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                      className="flex flex-col gap-3 group cursor-pointer"
                    >
                      <div
                        className="w-full aspect-[4/5] rounded-3xl bg-cover bg-center overflow-hidden relative shadow-md"
                        style={{ backgroundImage: `url("${tour.images[0]}")` }}
                      >
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-xs font-bold text-[#111418]">{tour.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[#111418] text-lg font-bold leading-tight group-hover:text-[#137fec] transition-colors">{tour.title}</h3>
                        <p className="text-[#617589] text-sm font-normal">{tour.duration} Days &bull; From ${tour.price.toLocaleString()}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUpVariants}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col w-full mb-16"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-[#111418] text-[28px] font-bold leading-tight tracking-[-0.015em]">What Travelers Say</h2>
                  <p className="text-[#617589] text-sm mt-1">Trusted by thousands of happy explorers</p>
                </div>
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {TESTIMONIALS.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    variants={fadeUpVariants}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.15 }}
                    className="flex flex-col gap-4 p-6 rounded-3xl bg-white shadow-sm border border-[#e5e7eb] hover:shadow-md transition-shadow"
                  >
                    <StarRating rating={testimonial.rating} />
                    <p className="text-[#111418] text-base leading-relaxed">&ldquo;{testimonial.comment}&rdquo;</p>
                    <div className="flex items-center gap-3 mt-auto pt-4">
                      <div className={`w-10 h-10 rounded-full ${testimonial.bgColor} flex items-center justify-center ${testimonial.textColor} font-bold text-sm`}>
                        {testimonial.initials}
                      </div>
                      <div>
                        <p className="text-[#111418] text-sm font-bold">{testimonial.name}</p>
                        <p className="text-[#617589] text-xs">{testimonial.trip}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUpVariants}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col w-full mb-20 max-w-[900px] mx-auto"
            >
              <div className="text-center mb-10">
                <h2 className="text-[#111418] text-[28px] font-bold leading-tight">Frequently Asked Questions</h2>
                <p className="text-[#617589] mt-2">Everything you need to know about booking with Maveraone</p>
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
                className="flex flex-col gap-4"
              >
                {FAQ_ITEMS.map((item, index) => (
                  <motion.details
                    key={index}
                    variants={fadeUpVariants}
                    transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
                    className="group bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none bg-white hover:bg-gray-50 transition-colors select-none">
                      <h3 className="text-[#111418] text-lg font-bold">{item.question}</h3>
                      <ChevronDown className="w-5 h-5 text-[#617589] transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-6 text-[#617589] leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.details>
                ))}
              </motion.div>
            </motion.div>

            {/* Features Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUpVariants}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full bg-[#f6f7f8] rounded-3xl p-8 md:p-12 mb-16"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="flex flex-col md:flex-row gap-8 md:gap-12 justify-between items-start"
              >
                <motion.div
                  variants={scaleUpVariants}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex flex-col gap-3 max-w-xs"
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#137fec] mb-2 shadow-sm">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h3 className="text-[#111418] text-xl font-bold">Best Price Guarantee</h3>
                  <p className="text-[#617589] text-sm leading-relaxed">We ensure you get the most competitive prices for your tours and stays, matched with quality.</p>
                </motion.div>
                <motion.div
                  variants={scaleUpVariants}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                  className="flex flex-col gap-3 max-w-xs"
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#137fec] mb-2 shadow-sm">
                    <HeadphonesIcon className="w-7 h-7" />
                  </div>
                  <h3 className="text-[#111418] text-xl font-bold">24/7 Support</h3>
                  <p className="text-[#617589] text-sm leading-relaxed">Our travel experts are available around the clock to assist you with any questions or issues.</p>
                </motion.div>
                <motion.div
                  variants={scaleUpVariants}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                  className="flex flex-col gap-3 max-w-xs"
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#137fec] mb-2 shadow-sm">
                    <Hotel className="w-7 h-7" />
                  </div>
                  <h3 className="text-[#111418] text-xl font-bold">Handpicked Hotels</h3>
                  <p className="text-[#617589] text-sm leading-relaxed">We strictly vet all our accommodation partners to ensure comfort, safety, and unique experiences.</p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Newsletter Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleUpVariants}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="w-full flex flex-col md:flex-row bg-[#137fec] rounded-3xl overflow-hidden mb-20 shadow-xl"
            >
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                  className="flex flex-col gap-2"
                >
                  <h2 className="text-white text-3xl font-bold leading-tight">Get Travel Updates</h2>
                  <p className="text-white/80 text-base">Sign up to our newsletter for travel tips, personalized itineraries, and exclusive vacation deals.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
                  className="flex w-full max-w-md gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 h-12 rounded-full px-4 text-[#111418] bg-white border-2 border-white focus:ring-0 focus:outline-none"
                  />
                  <button className="h-12 px-6 bg-[#101922] text-white font-bold rounded-full hover:bg-black/80 transition-colors">
                    Subscribe
                  </button>
                </motion.div>
              </div>
              <div
                className="hidden md:block w-1/3 bg-cover bg-center"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDZzI_Km2exvm3UMYWWta-gKpiRDLUK1Lafd43YukwFJy03MJaaBpbKuWTcFwTZ5UTH7TTDnqdc_2SJhG-UBw5cjYEOMUP5ThQrmiYhIEiCfK_-X4ivloEWXq1O0PY58vm79B3qBt6KnnoUK82c0_-rjQ5l-SeRva6i251_rReLfuPc43r8xOYftckr31e-PgUsKbGHQUDZBhGEFIpxUdqSqTeYMgQK3JGc0zTyE6cX4xhiKI3laHad-hvegPrgBUTKgBqPEM2YyTf_")`,
                }}
              />
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
