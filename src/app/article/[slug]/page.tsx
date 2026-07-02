import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Share2, Link as LinkIcon } from 'lucide-react';
import { NewsCard } from '@/components/NewsCard';
import { Article, Category } from '@/lib/models';
import { CommentsSection } from '@/components/CommentsSection';

export const dynamic = 'force-dynamic';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  let dbArticle = null;
  try {
    const record = await Article.findOne({
      where: { slug: params.slug },
      include: [{ model: Category, as: 'category' }]
    });
    if (record) {
      dbArticle = record.get({ plain: true });
    }
  } catch (err) {
    console.error("DB Fetch Error:", err);
  }

  let article: any = null;

  if (dbArticle) {
    article = {
      id: dbArticle.id,
      slug: dbArticle.slug,
      title: dbArticle.title,
      excerpt: dbArticle.excerpt || '',
      content: dbArticle.content,
      image: dbArticle.imageUrl || (dbArticle.videoUrl ? 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80' : 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80'),
      category: dbArticle.category?.name || 'News',
      publishedAt: new Date(dbArticle.createdAt).toLocaleDateString(),
      author: { name: dbArticle.author || 'Admin', avatar: 'https://i.pravatar.cc/150' },
      readTime: '5 min read',
      tags: [dbArticle.category?.name || 'News']
    };
  }

  if (!article) {
    notFound();
  }

  let relatedArticles: any[] = [];
  try {
    const relatedRecords = await Article.findAll({
      where: { CategoryId: dbArticle?.CategoryId },
      include: [{ model: Category, as: 'category' }],
      limit: 3
    });
    relatedArticles = relatedRecords
      .map((r: any) => {
        const plain = r.get({ plain: true });
        return {
          id: plain.id,
          title: plain.title,
          slug: plain.slug,
          image: plain.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80',
          category: plain.category?.name || 'News',
          publishedAt: new Date(plain.createdAt).toLocaleDateString(),
        };
      })
      .filter((r: any) => r.id !== article.id)
      .slice(0, 3);
  } catch (err) {
    console.error(err);
  }

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      
      {/* Article Header */}
      <header className="max-w-4xl mx-auto mb-8 text-center">
        <Link href={`/category/${article.category.toLowerCase()}`} className="inline-block bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm shadow-sm mb-6 hover:bg-brand-darkRed transition-colors">
          {article.category}
        </Link>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black leading-tight mb-6">
          {article.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-serif mb-8">
          {article.excerpt}
        </p>

        {/* Meta info & Share */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-y border-gray-200 dark:border-gray-800 py-4 gap-4">
          <div className="flex items-center gap-4">
            <div className="text-left">
              <div className="flex items-center text-xs text-gray-500 gap-2">
                <span>{article.publishedAt}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-500 mr-2 flex items-center gap-1">
              <Share2 className="w-4 h-4" /> Share
            </span>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white dark:bg-gray-800 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-400 hover:text-white dark:bg-gray-800 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-700 hover:text-white dark:bg-gray-800 transition-colors">
              <span className="w-4 h-4 text-xs font-bold flex items-center justify-center">in</span>
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
              <LinkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <figure className="max-w-5xl mx-auto mb-12">
        <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-xl">
          <Image 
            src={article.image} 
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

      </figure>

      {/* Article Body */}
      <div className="max-w-3xl mx-auto w-full">
        {article.content && article.content.toLowerCase().includes('<html') ? (
          <iframe 
            srcDoc={article.content} 
            className="w-full min-h-[800px] border-none"
            title={article.title}
            onLoad={(e) => {
              const iframe = e.target as HTMLIFrameElement;
              if (iframe.contentWindow?.document.body) {
                iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
              }
            }}
          />
        ) : (
          <div 
            className="prose prose-lg dark:prose-invert prose-p:font-sans prose-headings:font-serif prose-a:text-brand-red hover:prose-a:text-brand-darkRed w-full max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}

        {/* Tags */}
        <div className="mt-12 flex items-center gap-2 flex-wrap">
          <span className="font-bold text-sm mr-2">Tags:</span>
          {article.tags.map(tag => (
            <Link key={tag} href={`/search?q=${tag.toLowerCase()}`} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm font-medium rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {tag}
            </Link>
          ))}
        </div>


        
        {/* Comments Section */}
        {typeof article.id === 'number' ? (
          <CommentsSection articleId={article.id} />
        ) : (
          <div className="mt-12 text-center text-gray-500 italic p-8 bg-gray-50 dark:bg-gray-900 rounded-xl">
            Comments are disabled for mock articles.
          </div>
        )}
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="max-w-7xl mx-auto mt-20">
          <div className="flex items-center gap-2 mb-8 border-b-2 border-black dark:border-white pb-2">
            <div className="w-3 h-3 bg-brand-red rounded-full"></div>
            <h3 className="font-serif font-bold text-2xl uppercase tracking-wider">Related Articles</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedArticles.map(rel => (
              <NewsCard key={rel.id} article={rel} variant="small" />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
