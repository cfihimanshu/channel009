"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ManageArticles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/articles')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          setArticles([]);
          console.error("API returned non-array data:", data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles(articles.filter((a) => a.id !== id));
      } else {
        alert("Failed to delete article");
      }
    } catch(err) {
      alert("Error deleting article");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Articles</h1>
        <Link 
          href="/boss/articles/new" 
          className="bg-brand-red hover:bg-brand-darkRed text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
        >
          + Add New Article
        </Link>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading articles...</div>
      ) : articles.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 text-center rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-gray-500 dark:text-gray-400">No articles found. Start publishing!</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Image</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Title</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Category</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    {article.imageUrl ? (
                      <div className="relative w-16 h-12 rounded overflow-hidden">
                        <Image src={article.imageUrl} alt={article.title} fill className="object-cover" />
                      </div>
                    ) : article.videoUrl ? (
                      <div className="relative w-16 h-12 rounded overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80" alt="Video" fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs text-gray-400">No Img</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white line-clamp-2">{article.title}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    {article.category?.name || 'Uncategorized'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-semibold">
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium" onClick={() => alert("Edit feature coming soon!")}>Edit</button>
                    <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
