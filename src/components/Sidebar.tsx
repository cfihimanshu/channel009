"use client";

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { NewsCard } from './NewsCard';

export function Sidebar({ trendingArticles = [], mostReadArticles = [] }: { trendingArticles?: any[], mostReadArticles?: any[] }) {
  const displayMostRead = mostReadArticles;
  const displayTrending = trendingArticles;

  return (
    <aside className="w-full space-y-10">
      
      {/* Trending Now */}
      <div>
        <div className="flex items-center gap-2 mb-6 border-b-2 border-black dark:border-white pb-2">
          <div className="w-3 h-3 bg-brand-red rounded-full"></div>
          <h3 className="font-serif font-bold text-xl uppercase tracking-wider text-foreground">Trending Now</h3>
        </div>
        <div className="space-y-4">
          {displayTrending.map((topic, index) => {
            const isArticle = typeof topic === 'object';
            const title = isArticle ? topic.title : topic;
            const link = isArticle ? `/article/${topic.slug}` : `/search?q=${topic.toLowerCase()}`;
            
            return (
              <Link 
                key={isArticle ? topic.id : topic} 
                href={link}
                className="flex items-center gap-4 group"
              >
                <span className="text-3xl font-serif font-black text-gray-200 dark:text-gray-800 group-hover:text-brand-red transition-colors shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-brand-red transition-colors line-clamp-2">
                  {title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Ad Placeholder */}
      <div className="bg-gray-100 dark:bg-gray-800 w-full h-[250px] flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg">
        <span className="text-gray-400 text-sm font-medium uppercase tracking-widest">Advertisement</span>
      </div>

      {/* Most Read */}
      <div>
        <div className="flex items-center gap-2 mb-6 border-b-2 border-black dark:border-white pb-2">
          <div className="w-3 h-3 bg-brand-blue rounded-full"></div>
          <h3 className="font-serif font-bold text-xl uppercase tracking-wider text-foreground">Most Read</h3>
        </div>
        <div className="space-y-6">
          {displayMostRead.map((article: any) => (
            <NewsCard key={article.id} article={article} variant="list" />
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-brand-red text-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-center mb-4">
          <Mail className="w-8 h-8 opacity-80" />
        </div>
        <h4 className="text-center font-serif font-bold text-xl mb-2">Get Daily Updates</h4>
        <p className="text-center text-sm text-red-100 mb-6">
          The best of NewsPulse delivered straight to your inbox.
        </p>
        <form className="space-y-3">
          <input 
            type="email" 
            placeholder="Your Email Address" 
            className="w-full bg-white text-gray-900 rounded-md py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <button 
            type="submit" 
            className="w-full bg-gray-900 hover:bg-black text-white rounded-md py-2.5 font-bold uppercase tracking-wider text-sm transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>

    </aside>
  );
}
