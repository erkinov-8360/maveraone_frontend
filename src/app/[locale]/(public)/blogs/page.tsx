'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search, ChevronRight, ChevronLeft, Mail, Globe } from 'lucide-react';
import { useTranslations } from '@/context/TranslationsContext';

// Mock blog data
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Ultimate Guide to Samarkand's Hidden Courtyards",
    slug: 'samarkand-hidden-courtyards',
    excerpt: 'Beyond the Registan lies a network of ancient neighborhoods and secret gardens. Join us as we explore the quiet corners that tourists often miss.',
    category: 'Destinations',
    date: 'Oct 24, 2023',
    readTime: '8 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaM5v_BpI9FiwTBzxNiSaJlSF5Zz7ngspTsdr3bFwpwuiem2wXtzojuFvwi9gS8OYytnDtAMG1Ld6JSdJ4cfooKcPn81-rL_9gfM-4q4vocrBTdnREkpdXJW5q5GUm1Qk_DxkWmiwuoyqPQikp62V-absnBJaUxS1_BZkElqJmwt1hgYg6rOitVCwgAqTQCowFElkDYmOYK-HfkKTIxmJaxnVSD0xyd93Kj678l0pXfRc4O6Lg1sRuDz_o6jPbn8x6EJ50pH6YdxZ0',
    featured: true,
  },
  {
    id: 2,
    title: 'A Culinary Journey: 5 Dishes You Must Try',
    slug: 'uzbek-culinary-journey',
    excerpt: 'From Plov to Samsa, discover the flavors that define Uzbek hospitality and tradition.',
    category: 'Culinary',
    date: 'Oct 20, 2023',
    readTime: '6 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApYp8FQr1YRVbl5wGPrMuhpCoq_kZeGwKNmHKur1yCnw4n7H-GxMBQi_-qBrYvdoGNpwQOuSoRZDr5lPt7PVX0-Dn8eK9n35Pip1g23Y6wRMNehCEDTEpQtora6kIuHeeLZp0uzyf5e-FI_SItaW0eezrrRGWRgM6cULTn7voG9Kca5brbKmX8X9A_De3axxJZhj8weVR74QsezEm-h0YEWUrS3ijHCJ01BYw_lYoI5XLCMsgY1q5TbXgZ9oxO4ib2L5u359PQk5uU',
  },
  {
    id: 3,
    title: "Hiking the Chimgan Mountains: A Beginner's Guide",
    slug: 'chimgan-mountains-guide',
    excerpt: 'Trails, seasons, and equipment guides for outdoor enthusiasts looking for fresh air.',
    category: 'Adventure',
    date: 'Oct 18, 2023',
    readTime: '10 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIyRzbaEQHSflFMZfX6noa6jbigGoN_T8_9QNP3KNZ5AXNzOWHpGfj9deb8vwLHfG0-BlsxBT6ZqA6lT8PExxTJIEmNoGZqCJivGH1XE9BFZMGqMddZbnvvMQFw1t4c7Om9QR8nMXIDTqJV8oRa9JAtUx2WXoJQ5lUTWwscNvQkDfatU-v1fOf3oBWuhXs0R9TLR9MwgYZcwjIWAI29xYdLfgabIbH428XVmfFr6k9WkIEPyYp9-ywGXkCON_3lVYxJXiajI29Uwh0',
  },
  {
    id: 4,
    title: 'The Art of Silk Weaving in Margilan',
    slug: 'silk-weaving-margilan',
    excerpt: 'Visit the famous Yodgorlik factory to witness centuries-old silk production methods.',
    category: 'Culture',
    date: 'Oct 15, 2023',
    readTime: '7 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMZj7rPQq94hMYsKjXoyPReFK4vPvuSEIfDxmtGeX_yDcYkXLWdLeTmD4kWwFpYzix6yAWHeHw7oZ13HWz7uRlACTZmD3865Ul5-bPrRpODVBLu8fnYEIQxU0K5N46zEhmJenphG9X6kObUGqHX16a9xitVPogVhM_iLRJSh166mVM4LyN_8kOtU1U2ffXrpE0HO5Y9YC8D0O6z9v4dc59vx3AczhjueKNj9wGhVQ89X7vm8ZWT1GZRHv2psTS5EuWIkZgeQT96XRZ',
  },
  {
    id: 5,
    title: 'Visa Guide for 2024 Travelers',
    slug: 'visa-guide-2024',
    excerpt: 'Everything you need to know about the e-visa process and visa-free entry requirements.',
    category: 'Travel Tips',
    date: 'Oct 12, 2023',
    readTime: '5 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrnQtwqqiwle1MDVUHgegUu4-XxE4zX65Ulny62d2WvYsu4GdR6oauVYIAjM2VAvbvzUD-aPDDbc1dEiA7c5v0__kUK_8tP2NKte3DDnfgjSbvbXP9xp5uNtaFblxiAhE1gQrtpAPbBCHqdp69MeacrbJ8smgNl2XdYLFrqhl-HwxA59Ng7mZM6Xplw10n3HMNjwehBFpJh_M6zlxdRzIZk1kzzgrxkg_5y9gHoK_7n6C3jSNnqhxK5ng6bmgZ0nRnP4Vf0sf0P1NM',
  },
  {
    id: 6,
    title: 'Exploring the Ancient City of Bukhara',
    slug: 'exploring-bukhara',
    excerpt: 'A journey through time in one of Central Asia\'s most historic cities.',
    category: 'Destinations',
    date: 'Oct 10, 2023',
    readTime: '9 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPGA0Hjm1kYtddOeSiRR4WJVWs0naD5ID9Rg3DkYO5ug9nQTfduRFIR6VOjHwWgExopmERdyJK6oIJDWUalR7TDDnkfb4HPN6U99UvdU_9C7Htw7av3Xu33X_nA_zJAV98B5H42wAuoqWHBLKMN31f5Im3I88qre7vgkwu966jzmYnnzK2qWQQ-kBqTikRa7tiNX1oVzS0wz0SCEWb6hwVloWfftDbl8cIGrcCTjmIwF42SGguq6Gp37wcKX_Dm3xA5OAHbtMzwsl1',
  },
];

const TRENDING_POSTS = [
  {
    title: 'Exploring the Ancient City of Bukhara',
    date: 'Oct 20, 2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPGA0Hjm1kYtddOeSiRR4WJVWs0naD5ID9Rg3DkYO5ug9nQTfduRFIR6VOjHwWgExopmERdyJK6oIJDWUalR7TDDnkfb4HPN6U99UvdU_9C7Htw7av3Xu33X_nA_zJAV98B5H42wAuoqWHBLKMN31f5Im3I88qre7vgkwu966jzmYnnzK2qWQQ-kBqTikRa7tiNX1oVzS0wz0SCEWb6hwVloWfftDbl8cIGrcCTjmIwF42SGguq6Gp37wcKX_Dm3xA5OAHbtMzwsl1',
  },
  {
    title: 'Best Time to Visit Uzbekistan',
    date: 'Sep 15, 2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_DlyLflzAt2aGFcO_K4rM4ccIK2O_NVkww-QSlb42M-gkMgjbspmCoa_jwxgSP8Pu3IBuaDhXp7Tx67V-ze3ktqGB5BgaW_TLJ8eZlYaIUZzaOgl2WhCWV59S9u4v2ogaK0QKePOqpM-m7EqjzkzSQVpPlN4n_U21iUQiJ_NAPIsVTiGghATtj4Y-RwhJMunN1HGYv0TTJlep1mqVyLEirDT9BruIE_3xTGAqVIY613rJOIDR4DIaM8P2pg8u8hE815pYCpFa067J',
  },
  {
    title: 'Tea Culture: More Than Just a Drink',
    date: 'Aug 05, 2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2o11AtJTSOgIlbSJakP3idOS5yGza6k1e4xcglUnuryxdNxYm0jDDRasSxsGmlU-zWohQQSomJFsGYf1upxKuHwdRQ8tmOf6tDxGOi1-Lpj_kN3Uke53DiyaOXwwc4pKNCNpwBqPU0zzr-4SvoF-f9yENFDNCtJFp26epzkma8aK2BCUYXuyBHX0OhrXTarqjtDCCrskaw_HpjkYD9KVjVWeevSEDoZYNxSE31ArUjfehopFz4Dy7AZc6aRQuM-llWIHXa2_et9aT',
  },
];

const CATEGORIES = [
  { name: 'Destinations', count: 12 },
  { name: 'Food & Drink', count: 8 },
  { name: 'Travel Tips', count: 5 },
  { name: 'Culture & History', count: 15 },
];

const TAGS = ['#SilkRoad', '#Architecture', '#SoloTravel', '#Budget', '#Photography', '#Nature', '#History'];

export default function BlogsPage() {
  const { t } = useTranslations();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const postsPerPage = 4;
  const regularPosts = BLOG_POSTS.filter(post => !post.featured);
  const featuredPost = BLOG_POSTS.find(post => post.featured);
  const totalPages = Math.ceil(regularPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const displayedPosts = regularPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjjkfUcnT2OiWH_FhzEEeJecdJ3LQjprWMdgruV5xcDVMleucZ7Y_0UagwDmoc_pQ1EkJQwAxHkHj-1wWScWGhFsHo7Rholm1rhTeFRQ4Dzxs6oa3iyVGgud2fLmUTarwrz0xVbGaMpPugPZ5aUNuB9R76br2iIECMYUkuxEISXLAyTLFdQaOEWPaQydi6P7gBe4R0VUmFx-r9hdC-r87n7ZXGBaLweyZS7YU-fBiiZ8FFSbGq839R9sEoula9u8jaGBamVkkBG0HU')`,
          }}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

        {/* Transparent Navbar */}
        <nav className="absolute top-0 left-0 w-full z-50 border-b border-white/10 bg-gradient-to-b from-black/50 to-transparent">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-lg text-white">
                <Globe className="w-5 h-5" />
              </div>
              <Link href="/">
                <h2 className="text-xl font-bold tracking-tight">Maveraone</h2>
              </Link>
            </div>
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="/destinations" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                Destinations
              </Link>
              <Link href="/blogs" className="text-white text-sm font-bold border-b-2 border-blue-600 pb-0.5">
                Blog
              </Link>
              <Link href="/about" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                About Us
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="flex items-center gap-2 h-10 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition-all"
              >
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col gap-4 mt-16">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mx-auto border border-white/10">
            The Travel Journal
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
            Discover the Unseen
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Stories, authentic guides, and essential tips for your next adventure in the heart of the Silk Road.
          </p>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column: Blog Posts */}
          <main className="w-full lg:w-2/3 flex flex-col gap-12">
            {/* Featured Post */}
            {featuredPost && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group relative flex flex-col gap-4"
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl shadow-sm">
                  <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide shadow-lg">
                    Featured
                  </div>
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  <Link
                    href={`/blogs/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline mt-1"
                  >
                    Read Full Story <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            )}

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
              {displayedPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex flex-col gap-3"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-sm mb-2">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-blue-600 text-xs font-bold uppercase tracking-wide">
                    {post.category}
                  </span>
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20">
                  {currentPage}
                </button>

                {currentPage + 1 <= totalPages && (
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    {currentPage + 1}
                  </button>
                )}

                {currentPage + 2 <= totalPages && (
                  <button
                    onClick={() => setCurrentPage(currentPage + 2)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    {currentPage + 2}
                  </button>
                )}

                {currentPage + 2 < totalPages && (
                  <span className="text-gray-500 px-2">...</span>
                )}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </main>

          {/* Right Column: Sidebar */}
          <aside className="w-full lg:w-1/3 flex flex-col gap-8">
            {/* Search Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h5 className="text-lg font-bold mb-4 text-gray-900">Search</h5>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-lg bg-gray-50 border-transparent focus:border-blue-600 focus:ring-2 focus:ring-blue-600/50 text-gray-900 placeholder-gray-400 transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h5 className="text-lg font-bold mb-4 text-gray-900">Categories</h5>
              <ul className="flex flex-col gap-1">
                {CATEGORIES.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={`/blogs?category=${category.name.toLowerCase()}`}
                      className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-colors group"
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="bg-gray-100 text-xs font-bold px-2 py-1 rounded text-gray-500 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                        {category.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trending Posts Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h5 className="text-lg font-bold mb-4 text-gray-900">Trending Now</h5>
              <div className="flex flex-col gap-4">
                {TRENDING_POSTS.map((post, index) => (
                  <Link key={index} href="#" className="flex gap-4 group">
                    <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-xs text-gray-500 font-medium mb-1">{post.date}</span>
                      <h6 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h6>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h5 className="text-lg font-bold mb-4 text-gray-900">Popular Tags</h5>
              <div className="flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blogs?tag=${tag}`}
                    className="px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="w-full bg-white border-t border-gray-100 py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Join Our Newsletter</h2>
            <p className="text-gray-600 mb-6">
              Get travel tips, exclusive guides, and hidden gems of Uzbekistan delivered straight to your inbox. No spam, we promise.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 h-12 px-5 rounded-lg bg-gray-50 border-transparent focus:border-blue-600 focus:ring-2 focus:ring-blue-600/50 text-gray-900 placeholder-gray-400"
              />
              <button
                type="button"
                className="h-12 px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-600/30"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="w-full bg-gray-50 py-8 border-t border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-gray-900">
            <div className="w-6 h-6 flex items-center justify-center bg-blue-600 rounded-md text-white">
              <Globe className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold">Maveraone</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 Maveraone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}