"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User } from 'lucide-react';
import { Article } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface NewsCardProps {
  article: Article;
  variant?: 'large' | 'medium' | 'small' | 'list';
  className?: string;
}

export function NewsCard({ article, variant = 'medium', className }: NewsCardProps) {
  
  if (variant === 'large') {
    return (
      <motion.div 
        whileHover={{ y: -5 }}
        className={cn("group relative rounded-xl overflow-hidden shadow-md dark:shadow-none bg-white dark:bg-gray-900 border border-transparent dark:border-gray-800 transition-all", className)}
      >
        <Link href={`/article/${article.slug}`} className="absolute inset-0 z-10">
          <span className="sr-only">Read {article.title}</span>
        </Link>
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image 
            src={article.image} 
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm shadow-sm">
              {article.category}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <h2 className="text-white font-serif text-2xl md:text-3xl font-bold leading-tight mb-3 group-hover:text-red-300 transition-colors">
              {article.title}
            </h2>
            <div className="flex items-center text-gray-300 text-xs font-medium space-x-4">
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {article.author.name}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.publishedAt}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'list') {
    return (
      <motion.div 
        whileHover={{ x: 5 }}
        className={cn("group flex gap-4 bg-transparent", className)}
      >
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden shrink-0">
          <Image 
            src={article.image} 
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col justify-center flex-1 py-1">
          <Link href={`/category/${article.category.toLowerCase()}`} className="text-brand-red text-xs font-bold uppercase tracking-wider mb-1">
            {article.category}
          </Link>
          <Link href={`/article/${article.slug}`} className="group-hover:text-brand-red transition-colors">
            <h3 className="font-serif font-bold text-base sm:text-lg leading-snug line-clamp-2 mb-2 text-foreground">
              {article.title}
            </h3>
          </Link>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs font-medium space-x-3 mt-auto">
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Medium and Small variants
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={cn(
        "group flex flex-col rounded-xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all",
        className
      )}
    >
      <div className={cn("relative w-full overflow-hidden", variant === 'small' ? 'aspect-[4/3]' : 'aspect-[16/10]')}>
        <Image 
          src={article.image} 
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 z-20">
          <Link href={`/category/${article.category.toLowerCase()}`} className="bg-brand-red text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-sm hover:bg-brand-darkRed transition-colors">
            {article.category}
          </Link>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/article/${article.slug}`} className="group-hover:text-brand-red transition-colors mb-2">
          <h3 className={cn("font-serif font-bold leading-snug text-foreground", variant === 'small' ? 'text-base line-clamp-2' : 'text-lg md:text-xl line-clamp-3')}>
            {article.title}
          </h3>
        </Link>
        {variant === 'medium' && (
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
            {article.excerpt}
          </p>
        )}
        <div className="mt-auto pt-3 flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs font-medium border-t border-gray-100 dark:border-gray-800">
          <span>{article.publishedAt}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
        </div>
      </div>
    </motion.div>
  );
}
