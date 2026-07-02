import React from 'react';
import { Article, Category } from '@/lib/models';

export const dynamic = 'force-dynamic';

export default async function BossDashboard() {
  let articleCount = 0;
  let categoryCount = 0;

  try {
    articleCount = await Article.count();
    categoryCount = await Category.count();
  } catch (err) {
    console.error("Failed to fetch dashboard stats:", err);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 font-medium">Total Articles</h3>
          <p className="text-3xl font-bold mt-2 text-brand-red">{articleCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 font-medium">Active Categories</h3>
          <p className="text-3xl font-bold mt-2 text-blue-500">{categoryCount}</p>
        </div>
      </div>

      <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-brand-red mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Welcome to Channel009 Boss Panel</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your database is successfully connected. You can now manage news articles, categories, and settings from this dashboard.
        </p>
        <a href="/boss/articles" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-red hover:bg-brand-darkRed transition-colors">
          Add New Article
        </a>
      </div>
    </div>
  );
}
