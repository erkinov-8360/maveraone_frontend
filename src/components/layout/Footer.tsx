'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslations } from '@/context/TranslationsContext';

export function Footer() {
  const { t } = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#f0f2f4] pt-10 pb-5">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl flex flex-col gap-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <h4 className="text-[#111418] text-base font-bold">{t('footer.company')}</h4>
            <Link href="/about" className="text-[#617589] text-sm hover:text-[#137fec]">{t('footer.aboutUs')}</Link>
            <Link href="/careers" className="text-[#617589] text-sm hover:text-[#137fec]">{t('footer.careers')}</Link>
            <Link href="/blog" className="text-[#617589] text-sm hover:text-[#137fec]">{t('footer.blog')}</Link>
            <Link href="/press" className="text-[#617589] text-sm hover:text-[#137fec]">{t('footer.press')}</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[#111418] text-base font-bold">{t('footer.support')}</h4>
            <Link href="/help" className="text-[#617589] text-sm hover:text-[#137fec]">{t('footer.helpCenter')}</Link>
            <Link href="/safety" className="text-[#617589] text-sm hover:text-[#137fec]">{t('footer.safety')}</Link>
            <Link href="/cancellation" className="text-[#617589] text-sm hover:text-[#137fec]">{t('footer.cancellation')}</Link>
            <Link href="/report" className="text-[#617589] text-sm hover:text-[#137fec]">{t('footer.reportFraud')}</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[#111418] text-base font-bold">{t('footer.destinations')}</h4>
            <Link href="/destinations/japan" className="text-[#617589] text-sm hover:text-[#137fec]">{t('footer.japan')}</Link>
            <Link href="/destinations/greece" className="text-[#617589] text-sm hover:text-[#137fec]">{t('footer.greece')}</Link>
            <Link href="/destinations/indonesia" className="text-[#617589] text-sm hover:text-[#137fec]">{t('footer.indonesia')}</Link>
            <Link href="/destinations/switzerland" className="text-[#617589] text-sm hover:text-[#137fec]">{t('footer.switzerland')}</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[#111418] text-base font-bold">{t('footer.contact')}</h4>
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
          <p className="text-[#617589] text-sm">{t('footer.copyright').replace('{year}', currentYear.toString())}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[#617589] text-sm hover:text-[#137fec]">{t('footer.privacyPolicy')}</Link>
            <Link href="/terms" className="text-[#617589] text-sm hover:text-[#137fec]">{t('footer.termsOfService')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
