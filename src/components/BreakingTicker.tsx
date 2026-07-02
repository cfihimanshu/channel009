import React from 'react';
import Link from 'next/link';
import { Article } from '@/lib/models';

export async function BreakingTicker() {
  let breakingNews: any[] = [];
  try {
    const records = await Article.findAll({
      where: { status: 'published', isBreaking: true },
      order: [['createdAt', 'DESC']],
      limit: 10
    });
    breakingNews = records.map((r: any) => r.get({ plain: true }));
  } catch (err) {
    console.error(err);
  }



  if (breakingNews.length === 0) return null;

  return (
    <div className="bg-brand-red text-white flex items-center h-10 overflow-hidden text-sm mt-1.5 mb-2">
      <div className="bg-brand-darkRed font-bold px-4 h-full flex items-center whitespace-nowrap z-10 shrink-0 tracking-wider">
        BREAKING NEWS
      </div>
      <div className="flex-1 overflow-hidden relative h-full">
        <div className="animate-marquee whitespace-nowrap h-full flex items-center absolute">
          {breakingNews.map((news, i) => (
            <React.Fragment key={news.id}>
              <Link href={`/article/${news.slug}`} className="hover:underline mx-4">
                {news.title}
              </Link>
              {i < breakingNews.length - 1 && <span className="text-white/50 mx-2">•</span>}
            </React.Fragment>
          ))}
          {/* Duplicate for seamless loop */}
          {breakingNews.map((news) => (
            <React.Fragment key={`dup-${news.id}`}>
              <span className="text-white/50 mx-2">•</span>
              <Link href={`/article/${news.slug}`} className="hover:underline mx-4">
                {news.title}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
