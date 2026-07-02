"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BossSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/boss' },
    { name: 'Manage Articles', href: '/boss/articles' },
    { name: 'Categories', href: '/boss/categories' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white border-r border-gray-800 hidden md:block">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-2xl font-black text-brand-red tracking-tight">
          CHANNEL009<br/>
          <span className="text-sm text-gray-400 font-medium tracking-normal">Admin Portal</span>
        </h2>
      </div>
      <nav className="mt-6 px-4 flex flex-col space-y-2">
        {navItems.map(item => {
          // Highlight if pathname is exactly href OR if pathname starts with href/ (for subpages like /boss/articles/new)
          const isActive = pathname === item.href || (item.href !== '/boss' && pathname.startsWith(item.href + '/'));
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive 
                  ? 'bg-gray-800 text-white shadow-sm' 
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
        <Link 
          href="/" 
          className="mt-8 text-gray-500 hover:text-gray-300 px-4 py-3 font-medium transition-colors"
        >
          ← Back to Live Site
        </Link>
      </nav>
    </aside>
  );
}
