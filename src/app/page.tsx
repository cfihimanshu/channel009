import React from 'react';
import { Article, Category } from '@/lib/models';
import { NewsCard } from '@/components/NewsCard';
import { Sidebar } from '@/components/Sidebar';
import { PlayCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

function mapDbToCardProps(dbArt: any) {
  return {
    id: `db-${dbArt.id}`,
    title: dbArt.title,
    excerpt: dbArt.excerpt || dbArt.content.substring(0, 120).replace(/<[^>]+>/g, '') + '...',
    image: dbArt.imageUrl || (dbArt.videoUrl ? 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80' : 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80'),
    category: dbArt.category?.name || 'News',
    publishedAt: new Date(dbArt.createdAt).toLocaleDateString(),
    author: { name: dbArt.author || 'Admin', avatar: 'https://i.pravatar.cc/150' },
    readTime: '5 min read',
    isFeatured: dbArt.isFeatured,
    isBreaking: dbArt.isBreaking,
    isTrending: dbArt.isTrending,
    slug: dbArt.slug || dbArt.id.toString()
  };
}

export default async function Home() {
  let dbArticles: any[] = [];
  try {
    const records = await Article.findAll({
      where: { status: 'published' },
      include: [{ model: Category, as: 'category' }],
      order: [['createdAt', 'DESC']]
    });
    dbArticles = records.map((record: any) => mapDbToCardProps(record.get({ plain: true })));
  } catch (err) {
    console.error("DB Fetch Error:", err);
  }

  const articles = dbArticles;

  const dbFeatured = articles.filter(a => a.isFeatured);
  const otherFeatured = articles.filter(a => !a.isFeatured);
  
  // Always guarantee 4 articles for the top section
  const featuredArticles = [...dbFeatured, ...otherFeatured].slice(0, 4);

  const dbBreaking = articles.filter(a => a.isBreaking);
  const breakingNews = dbBreaking.length > 0
    ? dbBreaking.slice(0, 5)
    : articles.slice(0, 5);

  const trendingNews = articles.filter(a => a.isTrending).length > 0
    ? articles.filter(a => a.isTrending).slice(0, 5)
    : articles.slice(10, 15);

  const latestNews = articles.slice(0, 10);
  
  const sportsNews = articles.filter(a => a.category === 'Sports' || a.category === 'खेल').slice(0, 3);
  const techNews = articles.filter(a => a.category === 'Technology' || a.category === 'तकनीक').slice(0, 3);
  
  const videoNews = articles.filter(a => a.videoUrl).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 h-full">
          {featuredArticles[0] && <NewsCard article={featuredArticles[0]} variant="large" className="h-full min-h-[400px] md:min-h-[500px]" />}
        </div>
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="border-b-2 border-black dark:border-white pb-2 mb-2">
            <h3 className="font-serif font-bold text-xl uppercase tracking-wider">Top Stories</h3>
          </div>
          {featuredArticles.slice(1, 4).map((article: any) => (
            <NewsCard key={article.id} article={article} variant="list" />
          ))}
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-8 space-y-16">
          
          <section>
            <div className="flex items-center justify-between border-b-2 border-black dark:border-white pb-2 mb-8">
              <h2 className="font-serif font-bold text-3xl">Latest News</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestNews.map((article: any) => (
                <NewsCard key={article.id} article={article} variant="medium" />
              ))}
            </div>
          </section>

          {videoNews.length > 0 && (
            <section className="bg-gray-950 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <PlayCircle className="w-8 h-8 text-brand-red" />
                  <h2 className="font-serif font-bold text-3xl">Watch Now</h2>
                </div>
                <Link href="/live" className="text-sm font-semibold hover:text-brand-red transition-colors">
                  View All Videos →
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                {videoNews.slice(0, 2).map((article: any) => (
                  <Link href="/live" key={article.id} className="group relative rounded-xl overflow-hidden aspect-[16/9] block">
                    <Image 
                      src={article.image} 
                      alt={article.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-brand-red/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <PlayCircle className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <h3 className="font-serif font-bold text-lg line-clamp-2">{article.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Category Previews */}
          {sportsNews.length > 0 && (
            <section>
              <div className="flex items-center justify-between border-b-2 border-black dark:border-white pb-2 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h2 className="font-serif font-bold text-2xl uppercase tracking-wider">Top in Sports</h2>
                </div>
                <Link href="/category/sports" className="text-sm font-bold text-brand-red hover:underline">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {sportsNews.map((article: any) => (
                  <NewsCard key={article.id} article={article} variant="small" />
                ))}
              </div>
            </section>
          )}

          {techNews.length > 0 && (
            <section>
              <div className="flex items-center justify-between border-b-2 border-black dark:border-white pb-2 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h2 className="font-serif font-bold text-2xl uppercase tracking-wider">Top in Technology</h2>
                </div>
                <Link href="/category/technology" className="text-sm font-bold text-brand-red hover:underline">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {techNews.map((article: any) => (
                  <NewsCard key={article.id} article={article} variant="small" />
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <Sidebar trendingArticles={trendingNews} mostReadArticles={articles.slice(2, 7)} />
          </div>
        </div>

      </div>
    </div>
  );
}
