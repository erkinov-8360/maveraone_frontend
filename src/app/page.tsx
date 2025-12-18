import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ROUTES } from '@/config/routes';
import { MOCK_TOURS } from '@/lib/api/mock/mockTours';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Explore amazing tours around the world with expert guides
            </p>
            <div className="flex gap-4 justify-center">
              <Link href={ROUTES.TOURS}>
                <Button size="lg" variant="secondary">
                  Explore Tours
                </Button>
              </Link>
              <Link href={ROUTES.REGISTER}>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose MaveraOne Tours?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <div className="mb-4 flex justify-center">
                  <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Best Destinations</h3>
                <p className="text-gray-600">
                  Carefully curated tours to the world&apos;s most stunning locations
                </p>
              </Card>

              <Card className="text-center">
                <div className="mb-4 flex justify-center">
                  <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Guides</h3>
                <p className="text-gray-600">
                  Professional local guides with years of experience
                </p>
              </Card>

              <Card className="text-center">
                <div className="mb-4 flex justify-center">
                  <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
                <p className="text-gray-600">
                  Your safety is our priority with comprehensive insurance
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Tours */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Tours</h2>
              <Link href={ROUTES.TOURS}>
                <Button variant="outline">View All Tours</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_TOURS.filter(tour => tour.featured).map((tour) => (
                <Card key={tour.id} className="overflow-hidden p-0 hover:shadow-xl transition-shadow">
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
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of travelers who have discovered amazing experiences
            </p>
            <Link href={ROUTES.REGISTER}>
              <Button size="lg" variant="secondary">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
