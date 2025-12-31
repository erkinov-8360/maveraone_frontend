import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-10 border-t border-[#f0f2f4] pt-10 pb-5 px-4 md:px-10 lg:px-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <h4 className="text-[#111418] text-base font-bold">Company</h4>
          <Link href="/about" className="text-[#617589] text-sm hover:text-[#137fec]">About Us</Link>
          <Link href="/careers" className="text-[#617589] text-sm hover:text-[#137fec]">Careers</Link>
          <Link href="/blog" className="text-[#617589] text-sm hover:text-[#137fec]">Blog</Link>
          <Link href="/press" className="text-[#617589] text-sm hover:text-[#137fec]">Press</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-[#111418] text-base font-bold">Support</h4>
          <Link href="/help" className="text-[#617589] text-sm hover:text-[#137fec]">Help Center</Link>
          <Link href="/safety" className="text-[#617589] text-sm hover:text-[#137fec]">Safety</Link>
          <Link href="/cancellation" className="text-[#617589] text-sm hover:text-[#137fec]">Cancellation</Link>
          <Link href="/report" className="text-[#617589] text-sm hover:text-[#137fec]">Report Fraud</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-[#111418] text-base font-bold">Destinations</h4>
          <Link href="/destinations/japan" className="text-[#617589] text-sm hover:text-[#137fec]">Japan</Link>
          <Link href="/destinations/greece" className="text-[#617589] text-sm hover:text-[#137fec]">Greece</Link>
          <Link href="/destinations/indonesia" className="text-[#617589] text-sm hover:text-[#137fec]">Indonesia</Link>
          <Link href="/destinations/switzerland" className="text-[#617589] text-sm hover:text-[#137fec]">Switzerland</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-[#111418] text-base font-bold">Contact</h4>
          <div className="flex gap-4 text-[#617589]">
            <a href="mailto:contact@maveraone.com" className="hover:text-[#137fec]">
              <Mail className="w-5 h-5" />
            </a>
            <a href="tel:+1234567890" className="hover:text-[#137fec]">
              <Phone className="w-5 h-5" />
            </a>
            <a href="/contact" className="hover:text-[#137fec]">
              <MapPin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-5 border-t border-[#f0f2f4]">
        <p className="text-[#617589] text-sm">&copy; {currentYear} Maveraone. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-[#617589] text-sm hover:text-[#137fec]">Privacy Policy</Link>
          <Link href="/terms" className="text-[#617589] text-sm hover:text-[#137fec]">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
