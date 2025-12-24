'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/config/routes';
import { MOCK_TOURS } from '@/lib/api/mock/mockTours';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { DatePicker } from '@/components/ui/DatePicker';
import { TourCard } from '@/components/tour/TourCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { MOCK_TESTIMONIALS } from '@/lib/api/mock/mockTestimonials';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function HomePage() {
  const [departureCity, setDepartureCity] = useState<string>('');
  const [destinationCity, setDestinationCity] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: "url('/images/main-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Content */}
          <div className="relative container mx-auto px-4 text-center">
            {/* Circular Badge */}
            {/* <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-2 border-white/50 mb-8 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-white text-xs font-light tracking-widest mb-1">INTRO PRICE</div>
                <div className="text-white text-3xl font-bold">$</div>
                <div className="text-white text-xs font-light tracking-widest mt-1">LIMITED OFFER</div>
              </div>
            </div> */}


            {/* Large Hero Text */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-medium mb-8 tracking-tight leading-none">
                 Discover Your Next Destination
            </h1>

            {/* Feature badges at bottom */}
            

            {/* Search Form - Positioned at bottom */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4">
              <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-5">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {/* Departure Location */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Jo&apos;nash joyi
                    </label>
                    <Select value={departureCity} onValueChange={setDepartureCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toshkent">Toshkent</SelectItem>
                        <SelectItem value="samarqand">Samarqand</SelectItem>
                        <SelectItem value="buxoro">Buxoro</SelectItem>
                        <SelectItem value="andijon">Andijon</SelectItem>
                        <SelectItem value="fargona">Farg&apos;ona</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Borish joyi
                    </label>
                    <Select value={destinationCity} onValueChange={setDestinationCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="istanbul">Istanbul</SelectItem>
                        <SelectItem value="dubai">Dubay</SelectItem>
                        <SelectItem value="paris">Parij</SelectItem>
                        <SelectItem value="london">London</SelectItem>
                        <SelectItem value="rome">Rim</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Boshlanish sanasi
                    </label>
                    <DatePicker date={startDate} onDateChange={setStartDate} />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Tugash sanasi
                    </label>
                    <DatePicker date={endDate} onDateChange={setEndDate} />
                  </div>

                  {/* Search Button */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5 invisible">
                      Button
                    </label>
                    <Button
                      size="lg"
                      className="w-full bg-[#F5B546] hover:bg-[#e5a536] text-white transition-all duration-300 h-11"
                    >
                      Qidirish
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {/* <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-light text-center mb-4 tracking-tight">
              Why Choose Us
            </h2>
            <p className="text-center text-gray-500 mb-16 font-light">
              Unforgettable experiences tailored just for you
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <div className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#F5B546]/10 flex items-center justify-center group-hover:bg-[#F5B546]/20 transition-colors">
                    <svg className="h-8 w-8 text-[#F5B546]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-3">Best Destinations</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Carefully curated tours to the world&apos;s most stunning locations
                </p>
              </div>

              <div className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#F5B546]/10 flex items-center justify-center group-hover:bg-[#F5B546]/20 transition-colors">
                    <svg className="h-8 w-8 text-[#F5B546]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-3">Expert Guides</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Professional local guides with years of experience
                </p>
              </div>

              <div className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#F5B546]/10 flex items-center justify-center group-hover:bg-[#F5B546]/20 transition-colors">
                    <svg className="h-8 w-8 text-[#F5B546]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-3">Safe & Secure</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Your safety is our priority with comprehensive insurance
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Featured Tours */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-light mb-2 tracking-tight">Featured Tours</h2>
                <p className="text-gray-500 font-light">Discover our most popular destinations</p>
              </div>
              <Link href={ROUTES.TOURS}>
                <Button variant="outline" className="border-gray-300 hover:border-[#F5B546] hover:text-[#F5B546] transition-colors">
                  View All Tours
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MOCK_TOURS.filter(tour => tour.featured).map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">
                What&apos;s Our <span className="text-[#F5B546]">User</span> Says
              </h2>
              <p className="text-gray-500 font-light max-w-2xl mx-auto">
                MaveraOne, a tour operator specializing in dream destinations, offers a variety of benefits for travelers.
              </p>
            </div>

            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              speed={800}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="!pb-2"
            >
              {MOCK_TESTIMONIALS.map((testimonial) => (
                <SwiperSlide key={testimonial.id} className="h-auto">
                  <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                    <h3 className="text-lg font-medium mb-3">{testimonial.title}</h3>
                    <p className="text-gray-600 font-light mb-6 line-clamp-4 flex-grow">
                      {testimonial.comment}
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 font-light">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 font-light">
                Everything you need to know about our tours
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg">
                  What is included in the tour price?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 font-light">
                  Our tour prices include accommodation, guided tours, transportation between destinations,
                  entrance fees to attractions, and some meals as specified in the itinerary. International
                  flights, travel insurance, and personal expenses are not included.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg">
                  How do I book a tour?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 font-light">
                  You can book a tour directly through our website by selecting your preferred tour and date,
                  then following the booking process. Alternatively, you can contact our customer service team
                  who will be happy to assist you with your booking.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg">
                  What is your cancellation policy?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 font-light">
                  Cancellations made 30+ days before departure receive a full refund minus a 10% administrative fee.
                  Cancellations 15-29 days before departure receive a 50% refund. Cancellations made less than 15 days
                  before departure are non-refundable. We recommend purchasing travel insurance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg">
                  Do I need a visa to visit Uzbekistan?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 font-light">
                  Visa requirements vary by nationality. Citizens of many countries can now visit Uzbekistan
                  visa-free for up to 30 days. Please check with your local Uzbek embassy or consulate for
                  specific requirements based on your nationality.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg">
                  What is the best time to visit Uzbekistan?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 font-light">
                  The best time to visit Uzbekistan is during spring (April-May) and autumn (September-October)
                  when temperatures are pleasant and comfortable for sightseeing. Summer can be very hot, while
                  winter can be cold, especially in the northern regions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg">
                  Are your tours suitable for solo travelers?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 font-light">
                  Absolutely! Many of our guests are solo travelers. Our group tours are a great way to meet
                  like-minded people while exploring Uzbekistan. We can also arrange private tours if you prefer
                  a more personalized experience.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg">
                  What should I pack for my tour?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 font-light">
                  We recommend comfortable walking shoes, lightweight clothing for summer or warm layers for winter,
                  sun protection (hat, sunglasses, sunscreen), a reusable water bottle, and modest clothing for
                  visiting religious sites. A detailed packing list will be sent with your booking confirmation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left text-lg">
                  How large are your tour groups?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 font-light">
                  Our group sizes vary by tour but typically range from 10-20 people. We keep our groups small
                  to ensure a more intimate experience and allow for better interaction with your guide and
                  fellow travelers.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
