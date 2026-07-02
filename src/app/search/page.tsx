"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { articles } from '@/data/articles';
import { NewsCard } from '@/components/NewsCard';
import { Search as SearchIcon } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(articles);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    let filtered = articles;
    if (query) {
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
        a.category.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (filter !== 'All') {
      filtered = filtered.filter(a => a.category === filter);
    }
    setResults(filtered);
  }, [query, filter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const categories = ['All', ...Array.from(new Set(articles.map(a => a.category)))];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      
      <div className="text-center mb-10">
        <h1 className="font-serif font-black text-4xl mb-6">Search NewsPulse</h1>
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, topic, or category..." 
            className="w-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full py-4 px-6 pl-14 text-lg focus:outline-none focus:border-brand-red transition-colors shadow-sm"
          />
          <SearchIcon className="w-6 h-6 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-red text-white px-6 py-2.5 rounded-full font-bold hover:bg-brand-darkRed transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 mb-8">
        <p className="text-gray-600 dark:text-gray-400 font-medium mb-4 sm:mb-0">
          Showing {results.length} results {initialQuery && <span>for <span className="text-foreground font-bold">&quot;{initialQuery}&quot;</span></span>}
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                filter === cat 
                  ? 'bg-brand-red text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map(article => (
            <NewsCard key={article.id} article={article} variant="medium" />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <SearchIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="font-serif font-bold text-2xl mb-2">No results found</h3>
          <p className="text-gray-500">We couldn&apos;t find any articles matching your search criteria. Try adjusting your keywords or filters.</p>
        </div>
      )}

    </div>
  );
}
