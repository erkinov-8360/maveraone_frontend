'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  PiggyBank,
  HeadphonesIcon,
  Mail,
  Phone,
  MapPin,
  Send,
  Leaf,
  Handshake,
  Map
} from 'lucide-react';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const slideInLeftVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const slideInRightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function AboutPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center">
        {/* Background Image with Overlay */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-50 z-10" />
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBwxxCAeflRi21zCJEJiFcoTPJU3QiRYe36ipzpOyHUhxfw46con2Ps8TXF3Xxih3MD9aT_65Di3JPc8mkHWKOB2Yfein2HeHpU9K6YFqK7wAucQ3dq-gvRc9nQkbnUGMO2tAuwHpwTy-kYabDlmA7ehkikKBIjGQDc6PtXiQjvVu-8M1MIBW8zllAlaGa-8w1jumnC5tzRl7u7EnGqSLBMh94EvILkO1XJCi7-Bz-VVyWo9F3Nnkfi96LYBPKN9rWtnX0qq36ZrOtW")`,
            }}
          />
        </motion.div>
        <div className="relative z-20 container mx-auto px-6 pt-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto flex flex-col gap-6 items-center"
          >
            <motion.span
              variants={fadeUpVariants}
              transition={{ duration: 0.6 }}
              className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 text-white text-xs font-bold uppercase tracking-wider"
            >
              Established 2010
            </motion.span>
            <motion.h1
              variants={fadeUpVariants}
              transition={{ duration: 0.6 }}
              className="text-white text-4xl md:text-6xl font-black leading-[1.1] tracking-tight"
            >
              Crafting Unforgettable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600">
                Journeys
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUpVariants}
              transition={{ duration: 0.6 }}
              className="text-white/90 text-lg md:text-xl font-medium max-w-2xl leading-relaxed"
            >
              We don&apos;t just plan trips; we curate experiences that linger in your memory long after you&apos;ve returned home.
            </motion.p>
            <motion.div
              variants={fadeUpVariants}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mt-4"
            >
              <a
                href="#story"
                className="flex items-center justify-center rounded-full h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold transition-all shadow-lg shadow-blue-600/30"
              >
                Our Story
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center rounded-full h-12 px-8 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-base font-bold transition-all"
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section (Zig) */}
      <section className="py-20 px-6" id="story">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={slideInLeftVariants}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-purple-400 rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition duration-500" />
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkUNz2LFjJoZiWRjN9X4yJgyGhfR2TW0vFZARUPSKLImPY9Bpid6ZD9D3_pstOs168DgV0FWdWRZ24dZGwRcJNBagdlTfDvLn8Tn13nlThrD-T2DNfeVqQSePc-CLRtL7DhtuXvbsI6zpt-p7jmgcati2rk5yIwRjffATufQ3bWyDfvGOWbN0Th0Xrj44lBBCxaCIZiAs_Wf8qxpbwswW6EtFBxiHeEBmDEl3L31OfyeVE-6sdD9BinP2z7R70v2EMMHzT00OsIfTv")`,
                  }}
                />
              </div>
            </motion.div>
            {/* Content Right */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={slideInRightVariants}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-blue-600 font-bold text-sm uppercase tracking-wider">Who We Are</h3>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  From a Backpack to a <br />Global Community
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Maveraone was born from a simple passion: to see the world not just as tourists, but as travelers. What started as a small group of friends exploring hidden gems has grown into a community dedicated to authentic experiences.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We believe that the best stories are found in the pages of your passport. Our team of expert explorers has traversed continents to find the most unique, sustainable, and breathtaking destinations for you.
              </p>
              <div className="pt-2">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-4">
                    <img
                      alt="Team member 1"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPWBq6V55ux6H3TyYJ0ptPdEcI0RLGSeylMTvgF-mlwYAqRN4Bn0FtnkjbSKb0DexbRZ1-x3Cj8iwCGTqfN-Jgza5m_vqf0AZREXj1udoKNeeD2LL4jfuNJw83-GNLZWahRXMDzGP7tyA8OvPZmg0dPUcwb1rPomqLWODaROj2DaHGWzvO89xbcY_VVvyTPD3qVUiQWMoVs-LzsLc3ou5Tip43E0hgBvQH-dNs0bCoQ5UiuYWBK5-_snk6C41K5J3tN-XzaWDXzuOc"
                    />
                    <img
                      alt="Team member 2"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI9Z7eYt5m8GCp6CuakPPymsDzYashkjyAQQVzKlie4fUrvTJle05FOQryuvpcTHnSYc-BEI6mHRcjrny8LutKG_uz1EAxUEtwXMdprFK_Iqnojo1yLtZ3WieG7UdJ2mzrnWavawvo-jVeNwiVrsuDXxA2Ol-3bVbiS78CxYqiLl2ZutzSejeY6kK27DQSSRyDBwBdDwMXsAfbbzpLMgPuu8_W4IuV7U-_5RTrXTP-5r1nBVysHpKarXNetpyHLv9VbU9Ra3g8OXF3"
                    />
                    <img
                      alt="Team member 3"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1y5JWB8wjfHLZ7wWatAPkd1fxhB_vmyQacRMQt6AP0NsVx9NdRAaFOSp5rSNdLXhQ0BBMqiw85rtukme26ruJKMibpP0LgCAKRLXrZCunGUOmJtkHxcbOhqAJe6n_nxZrgtpoDw8PlfKw-O4qoOqHgDCI9ct6Q4UX51ND7X8cxQ9SsAQ0d7fvwLA_SCei_UvY9qUvNyeCp0FFyXCOyjK4P2yXAYhcQYAYm5t3g1vJyJSX2bxA5mKxZOzBcYvSJAYl7w7XcHp9-et9"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Join 10,000+ Happy Travelers</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section (Zag) */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content Left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={slideInLeftVariants}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex flex-col gap-6 order-2 md:order-1"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-blue-600 font-bold text-sm uppercase tracking-wider">Our Mission</h3>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Travel with Purpose &amp; <br />Sustainability
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our mission is to provide sustainable and immersive travel experiences that respect local cultures and environments. We believe that travel should leave a positive impact on both the traveler and the destination.
              </p>
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-start gap-3">
                  <Leaf className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Eco-Friendly Tours</h4>
                    <p className="text-sm text-gray-500">Carbon offset programs for every flight booked.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Handshake className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Local Partnerships</h4>
                    <p className="text-sm text-gray-500">We work directly with local communities to ensure fair wages.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Image Right */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={slideInRightVariants}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className="order-1 md:order-2 relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-tl from-green-400 to-blue-500 rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition duration-500" />
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBKgZfjtw0RjkZaK-WKqCUuuj5Eh4VwtVCkMA8vWq91zfYM9vED3rQWezjcvzpgF5kLTx1o6cuLSFMT-shXWFRpBY_zhTGvk1JdcrtUDkVXqItwWeN7tSC5RgMcVQtBXLZYF0r2MPTxlBDcZJIPd1Du_61UsjLz5vaAgBy4anl6tdllG8D_h63GKgfC6tOhFDL7VC6uWtvjrCodJ-wgFsiLOaz-qDVLxmQYRxv-uNB3yIp_DadGPmWrBRBX6YIrdeAxOEbGtT_HFZlA")`,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us (Feature Grid) */}
      <section className="py-24 px-6">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariants}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Why Choose Maveraone?</h2>
            <p className="text-gray-600">
              We go beyond the guidebooks to offer you a unique travel experience that is safe, affordable, and unforgettable.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Card 1 */}
            <motion.div
              variants={scaleUpVariants}
              transition={{ duration: 0.5 }}
              className="group flex flex-col gap-4 p-8 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Guides</h3>
                <p className="text-gray-500 leading-relaxed">
                  Local experts with deep knowledge of the destination, ensuring you see the hidden gems.
                </p>
              </div>
            </motion.div>
            {/* Card 2 */}
            <motion.div
              variants={scaleUpVariants}
              transition={{ duration: 0.5 }}
              className="group flex flex-col gap-4 p-8 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <PiggyBank className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Best Price Guarantee</h3>
                <p className="text-gray-500 leading-relaxed">
                  We match any competitor&apos;s price for the same tour. Luxury travel at fair prices.
                </p>
              </div>
            </motion.div>
            {/* Card 3 */}
            <motion.div
              variants={scaleUpVariants}
              transition={{ duration: 0.5 }}
              className="group flex flex-col gap-4 p-8 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <HeadphonesIcon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-500 leading-relaxed">
                  We are here for you around the clock, wherever you are. Travel with peace of mind.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-200" id="contact">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariants}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">Get In Touch</h3>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">We&apos;d Love to Hear From You</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Have a question about a trip? Want to partner with us? Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </motion.div>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Contact Info & Map */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={slideInLeftVariants}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="w-full lg:w-1/3 flex flex-col gap-6"
            >
              {/* Info Cards */}
              <div className="flex flex-col gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Email Us</h4>
                    <a className="text-gray-500 text-sm hover:text-blue-600 transition-colors" href="mailto:hello@maveraone.com">
                      hello@maveraone.com
                    </a>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Call Us</h4>
                    <a className="text-gray-500 text-sm hover:text-blue-600 transition-colors" href="tel:+15551234567">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Visit HQ</h4>
                    <p className="text-gray-500 text-sm">
                      123 Adventure Lane,<br />San Francisco, CA 94107
                    </p>
                  </div>
                </div>
              </div>
              {/* Map Image */}
              <div className="bg-gray-200 rounded-2xl h-64 w-full overflow-hidden relative shadow-inner">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsX9mPy-C8HTJztvIRhaHNPZreF49ekAttA0AbPzl3vHvCTz-M2wWRQ5inwpwdnd7ZRe5Z5UQIi_x_h5hZLlPEemwo1ny8rqpw3sk142X5LdSem-BgtuvyNs-MjJRpKGCWCI1jxhPlAnaTg6HpS_sGWVgTmb8Neajt6dBeIIf5iq34LWmT7dFEo0kJ5dmWmvCWLT87QjEO8TRIjr56DQ_4VNsGTqKK3FDrOaQ3ws6wrAcMPBOIY0em_wE3NfNqNuLWp6s9Tj-f54xb")`,
                  }}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                    <Map className="w-4 h-4 text-blue-600" />
                    View on Google Maps
                  </button>
                </div>
              </div>
            </motion.div>
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={slideInRightVariants}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className="w-full lg:w-2/3 bg-white rounded-2xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                      id="firstName"
                      name="firstName"
                      placeholder="Jane"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    id="email"
                    name="email"
                    placeholder="jane@example.com"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700" htmlFor="subject">
                    Subject
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all cursor-pointer"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  >
                    <option>General Inquiry</option>
                    <option>Booking Assistance</option>
                    <option>Partnership Opportunity</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400 resize-none"
                    id="message"
                    name="message"
                    placeholder="How can we help you plan your next adventure?"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button
                  className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-600/20 flex items-center justify-center gap-2"
                  type="submit"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
