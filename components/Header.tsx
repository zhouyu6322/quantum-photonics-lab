'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLangContext } from '@/lib/lang-context';
import { t } from '@/lib/translations';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, toggle } = useLangContext();

  const navLinks = [
    { href: '/',             label: t.nav.home[lang] },
    { href: '/about',        label: t.nav.about[lang] },
    { href: '/team',         label: t.nav.team[lang] },
    { href: '/research',     label: t.nav.research[lang] },
    { href: '/publications', label: t.nav.publications[lang] },
    { href: '/news',         label: t.nav.news[lang] },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-12 w-12 flex-shrink-0">
              <Image
                src="/images/hit-logo.png"
                alt="哈尔滨工业大学"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-gray-900 text-sm leading-tight">
                {t.header.institution[lang]}
              </span>
              <span className="font-semibold text-blue-600 text-xs">
                {t.header.group[lang]}
              </span>
            </div>
            <span className="sm:hidden font-semibold text-gray-900 text-base">
              {t.header.groupMobile[lang]}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
            {/* Language Toggle */}
            <button
              onClick={toggle}
              className="text-sm px-3 py-1 rounded-lg border border-gray-300 hover:border-blue-400 transition-colors flex items-center gap-1"
            >
              <span className={lang === 'zh' ? 'font-bold text-blue-600' : 'text-gray-400'}>中文</span>
              <span className="text-gray-300">/</span>
              <span className={lang === 'en' ? 'font-bold text-blue-600' : 'text-gray-400'}>English</span>
            </button>
          </div>

          {/* Mobile: lang toggle + menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className="text-xs px-2 py-1 rounded border border-gray-300 flex items-center gap-0.5"
            >
              <span className={lang === 'zh' ? 'font-bold text-blue-600' : 'text-gray-400'}>中</span>
              <span className="text-gray-300">/</span>
              <span className={lang === 'en' ? 'font-bold text-blue-600' : 'text-gray-400'}>EN</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
