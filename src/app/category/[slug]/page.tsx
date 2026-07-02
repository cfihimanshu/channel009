import React from 'react';
import { articles } from '@/data/articles';
import { NewsCard } from '@/components/NewsCard';
import { Sidebar } from '@/components/Sidebar';


export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  const categoryArticles = articles.filter(a => a.category.toLowerCase() === params.slug.toLowerCase());

  if (categoryArticles.length === 0 && params.slug !== 'all') {
    // We could return notFound() here, but for mock sake we'll just show empty state
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Category Banner */}
      <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 sm:p-12 text-center border-t-4 border-brand-red">
        <h1 className="font-serif font-black text-4xl sm:text-5xl mb-4">{categoryName} News</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Get the latest updates, deep dives, and breaking stories from the world of {categoryName}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content */}
        <div className="lg:col-span-8">
          
          {/* Filter Bar */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 mb-8">
            <span className="text-sm text-gray-500 font-medium">Showing {categoryArticles.length} results</span>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="text-gray-400">Sort by:</span>
              <select className="bg-transparent border-none outline-none cursor-pointer text-foreground focus:ring-0">
                <option>Latest</option>
                <option>Popular</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>

          {categoryArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {categoryArticles.map(article => (
                <NewsCard key={article.id} article={article} variant="medium" />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-gray-500">
              <p>No articles found for this category.</p>
            </div>
          )}

          {/* Pagination Mock */}
          {categoryArticles.length > 0 && (
            <div className="mt-12 flex justify-center gap-2">
              <button className="px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors disabled:opacity-50">
                Previous
              </button>
              <button className="px-4 py-2 bg-brand-red text-white rounded-md text-sm font-medium hover:bg-brand-darkRed transition-colors">
                1
              </button>
              <button className="px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                2
              </button>
              <button className="px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                Next
              </button>
            </div>
          )}

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </div>

      </div>
    </div>
  );
}
