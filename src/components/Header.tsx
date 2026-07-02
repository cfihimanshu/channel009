"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, Search, Menu, X, Tv, ChevronDown, TrendingUp, CloudSun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_CATEGORIES = ["India", "World", "Politics", "Business", "Technology", "Sports", "Entertainment"];

export function Header({ categories = [] }: { categories?: { id: number; name: string; slug: string }[] }) {
  // Use DB categories if available, else fallback
  const catNames = categories.length > 0 ? categories.map(c => c.name) : DEFAULT_CATEGORIES;
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [weather, setWeather] = useState<{ temp: number; city: string } | null>(null);
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const isHindi = document.cookie.includes('googtrans=/en/hi') || document.cookie.includes('googtrans=/auto/hi');
      if (isHindi) setLanguage('HI');
    }

    const fetchWeather = async (lat: number, lon: number, cityName: string) => {
      try {
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const weatherData = await weatherRes.json();
        
        let displayCity = cityName;
        if (cityName === 'Detecting...') {
          try {
            const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
            const geoData = await geoRes.json();
            displayCity = geoData.locality || geoData.city || geoData.principalSubdivision || 'Local Area';
          } catch (e) {
            displayCity = 'Your Location';
          }
        }
        
        if (weatherData.current_weather) {
          setWeather({ temp: Math.round(weatherData.current_weather.temperature), city: displayCity });
        }
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude, 'Detecting...');
        },
        (error) => {
          // Fallback to New Delhi if location is denied or fails
          fetchWeather(28.6139, 77.2090, 'New Delhi');
        },
        { timeout: 10000 }
      );
    } else {
      fetchWeather(28.6139, 77.2090, 'New Delhi');
    }

    if (typeof window !== 'undefined' && !document.getElementById('google-translate-script')) {
      const translateDiv = document.createElement('div');
      translateDiv.id = 'google_translate_element';
      translateDiv.style.display = 'none';
      document.body.appendChild(translateDiv);

      const addScript = document.createElement('script');
      addScript.id = 'google-translate-script';
      addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(addScript);

      (window as any).googleTranslateElementInit = function () {
        if ((window as any).google && (window as any).google.translate) {
          new (window as any).google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'hi,en',
            autoDisplay: false
          }, 'google_translate_element');
        }
      };
    }
  }, []);

  const handleLanguageChange = (lang: 'EN' | 'HI') => {
    setLanguage(lang);
    if (lang === 'HI') {
      document.cookie = "googtrans=/en/hi; path=/; domain=" + window.location.hostname;
      document.cookie = "googtrans=/en/hi; path=/";
    } else {
      document.cookie = "googtrans=/en/en; path=/; domain=" + window.location.hostname;
      document.cookie = "googtrans=/en/en; path=/";
      // Clear cookie to force English
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    window.location.reload();
  };

  return (
    <>
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      {/* Top Bar for News Channel feel */}
      <div className="hidden md:flex bg-white dark:bg-background text-black dark:text-gray-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8 justify-between items-center w-full border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 font-medium">
            <CloudSun className="w-4 h-4 text-yellow-500" /> 
            {weather ? `${weather.city} ${weather.temp}°C` : 'Loading weather...'}
          </span>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <span className="font-medium">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 font-medium">
          <Link href="/about" className="hover:text-brand-red transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-brand-red transition-colors">Contact</Link>
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-sm overflow-hidden p-0.5 ml-2">
            <button 
              onClick={() => handleLanguageChange('EN')}
              className={`px-3 py-1 rounded-sm transition-colors ${language === 'EN' ? 'bg-white dark:bg-gray-600 shadow-sm text-brand-red' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              English
            </button>
            <button 
              onClick={() => handleLanguageChange('HI')}
              className={`px-3 py-1 rounded-sm transition-colors ${language === 'HI' ? 'bg-white dark:bg-gray-600 shadow-sm text-brand-red' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center py-2">
              <Image src="/logo.png" alt="NewsPulse Logo" width={240} height={80} className="object-contain h-14 md:h-16 w-auto" priority />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
            <Link href="/" className="px-2 py-2 text-sm font-medium hover:text-brand-red transition-colors">Home</Link>
            {catNames.slice(0, 5).map(category => (
              <Link 
                key={category} 
                href={`/category/${category.toLowerCase()}`}
                className="px-2 py-2 text-sm font-medium hover:text-brand-red transition-colors whitespace-nowrap"
              >
                {category}
              </Link>
            ))}
            
            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button className="flex items-center gap-1 px-2 py-2 text-sm font-medium hover:text-brand-red transition-colors">
                Categories <ChevronDown className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 w-48 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg shadow-xl py-2 z-50"
                  >
                    {catNames.slice(5).map(category => (
                      <Link 
                        key={category} 
                        href={`/category/${category.toLowerCase()}`}
                        className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-brand-red transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/live" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-950/30 text-brand-red border border-red-200 dark:border-red-900 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
              </span>
              Live TV
            </Link>

            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.form 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="absolute right-full mr-2 overflow-hidden"
                    action="/search"
                  >
                    <input 
                      type="text" 
                      name="q"
                      placeholder="Search..." 
                      className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-1.5 px-4 text-sm focus:ring-2 focus:ring-brand-red outline-none"
                    />
                  </motion.form>
                )}
              </AnimatePresence>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

    </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[100] md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-64 bg-background z-[101] shadow-xl flex flex-col md:hidden"
            >
              <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
                <span className="font-serif font-bold text-xl">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 pb-4">
                  <Link 
                    href="/live" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 justify-center w-full py-2 bg-brand-red text-white rounded-md font-semibold uppercase tracking-wider text-sm"
                  >
                    <Tv className="w-4 h-4" />
                    Watch Live TV
                  </Link>
                </div>
                <nav className="flex flex-col space-y-1 px-2">
                  <Link 
                    href="/" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Home
                  </Link>
                  {catNames.map(category => (
                    <Link 
                      key={category} 
                      href={`/category/${category.toLowerCase()}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-3 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {category}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
