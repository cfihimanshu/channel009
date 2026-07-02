import React from 'react';
import { PlayCircle, Tv, Users, MessageCircle } from 'lucide-react';
import { articles } from '@/data/articles';
import Link from 'next/link';
import Image from 'next/image';

export default function LivePage() {
  const videoClips = articles.slice(10, 18);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-12">
      
      {/* Live Player Section */}
      <div className="bg-gray-950 text-white rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          
          {/* Main Video Area */}
          <div className="lg:col-span-3">
            <div className="relative aspect-video bg-black flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-800">
              {/* Fake Video Player UI */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-sm text-sm font-bold animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full"></span> LIVE
                  </div>
                  <div className="flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1 rounded-sm text-xs font-semibold">
                    <Users className="w-3 h-3" /> 24,592 watching
                  </div>
                </div>
                <div className="flex justify-center items-center h-full group cursor-pointer">
                  <div className="w-20 h-20 bg-brand-red/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-10 h-10 text-white ml-1" />
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <h1 className="font-serif font-bold text-2xl md:text-3xl max-w-2xl drop-shadow-md">
                    Global Markets Plunge Amidst Unprecedented Tech Sector Sell-off
                  </h1>
                </div>
              </div>
              
              {/* Fake thumbnail/background */}
              <div className="absolute inset-0 opacity-40">
                <Image 
                  src="https://picsum.photos/seed/live/1200/675"
                  alt="Live News Broadcast"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Live Chat / Sidebar */}
          <div className="lg:col-span-1 bg-gray-900 flex flex-col h-[400px] lg:h-auto">
            <div className="p-4 border-b border-gray-800 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Live Chat</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="text-sm"><span className="font-bold text-blue-400">User492:</span> What time is the press conference?</div>
              <div className="text-sm"><span className="font-bold text-green-400">AnnaSmith:</span> Unbelievable drop today.</div>
              <div className="text-sm"><span className="font-bold text-purple-400">TraderJoe:</span> Buy the dip!</div>
              <div className="text-sm"><span className="font-bold text-yellow-400">NewsJunkie:</span> They said it would start at 2 PM EST.</div>
              <div className="text-sm"><span className="font-bold text-red-400">Admin:</span> Please keep chat respectful.</div>
              <div className="text-sm"><span className="font-bold text-blue-400">MikeT:</span> Watching from London, very worrying news.</div>
            </div>
            <div className="p-4 border-t border-gray-800">
              <input 
                type="text" 
                placeholder="Say something..." 
                className="w-full bg-gray-800 border-none rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red outline-none text-white"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Video Clips Grid */}
      <section>
        <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
          <Tv className="w-8 h-8 text-brand-red" />
          <h2 className="font-serif font-black text-3xl">Latest Video Clips</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videoClips.map(clip => (
            <div key={clip.id} className="group cursor-pointer">
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                <Image 
                  src={clip.image} 
                  alt={clip.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                  {Math.floor(Math.random() * 5 + 1)}:{Math.floor(Math.random() * 50 + 10)}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center shadow-lg">
                    <PlayCircle className="w-5 h-5 text-white ml-0.5" />
                  </div>
                </div>
              </div>
              <Link href={`/article/${clip.slug}`} className="block group-hover:text-brand-red transition-colors">
                <h4 className="font-bold text-sm leading-snug line-clamp-2">{clip.title}</h4>
              </Link>
              <div className="text-xs text-gray-500 mt-1">{clip.publishedAt}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
