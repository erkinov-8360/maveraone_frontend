import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-4">MaveraOne Tours</h3>
            <p className="text-sm text-gray-600">
              Discover and book amazing tours around the world with expert guides.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/tours" className="hover:text-blue-600">Tours</Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-blue-600">Destinations</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/faq" className="hover:text-blue-600">FAQ</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">Facebook</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">Instagram</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">Twitter</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          &copy; {currentYear} MaveraOne Tours. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
