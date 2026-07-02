import React from 'react';
import Image from 'next/image';

const team = [
  { name: 'Sarah Jenkins', role: 'Editor-in-Chief', image: 'https://i.pravatar.cc/300?u=sarah' },
  { name: 'David Chen', role: 'Managing Editor', image: 'https://i.pravatar.cc/300?u=david' },
  { name: 'Amara Singh', role: 'Head of Digital', image: 'https://i.pravatar.cc/300?u=amara' },
  { name: 'Michael Ross', role: 'Senior Political Correspondent', image: 'https://i.pravatar.cc/300?u=michael' },
  { name: 'Elena Rodriguez', role: 'Tech & Science Lead', image: 'https://i.pravatar.cc/300?u=elena' },
  { name: 'James Wilson', role: 'Sports Director', image: 'https://i.pravatar.cc/300?u=james' },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-24">
      
      {/* Mission Section */}
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="font-serif font-black text-5xl md:text-6xl mb-6">Unbiased Truth. <br/><span className="text-brand-red">Unmatched Coverage.</span></h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          NewsPulse was founded on a simple but powerful premise: to provide fast, accurate, and deeply investigated news to a global audience. In an era of misinformation, we stand as a beacon of journalistic integrity, delivering stories that matter without fear or favor.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <h3 className="font-serif font-bold text-xl mb-3">Integrity</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">We are committed to truthful reporting and transparent editorial processes.</p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border-b-4 border-brand-red shadow-md">
            <h3 className="font-serif font-bold text-xl mb-3">Speed</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Breaking news delivered to your screen the moment it happens, verified and accurate.</p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <h3 className="font-serif font-bold text-xl mb-3">Impact</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Focusing on stories that drive change and give voice to the voiceless.</p>
          </div>
        </div>
      </section>

      {/* History/Timeline Section */}
      <section className="max-w-5xl mx-auto bg-gray-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full mix-blend-multiply filter blur-[100px] opacity-30"></div>
        <div className="relative z-10">
          <h2 className="font-serif font-bold text-4xl mb-12 text-center">Our Journey</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-600 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-950 bg-brand-red text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-gray-800 bg-gray-900 shadow">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-brand-red">2010</div>
                </div>
                <h4 className="font-serif font-bold text-lg mb-2">The Foundation</h4>
                <p className="text-sm text-gray-400">NewsPulse is established as a small digital newsroom covering local politics.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-950 bg-brand-red text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-gray-800 bg-gray-900 shadow">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-brand-red">2015</div>
                </div>
                <h4 className="font-serif font-bold text-lg mb-2">Going Global</h4>
                <p className="text-sm text-gray-400">Expanded our coverage to include international news, opening bureaus in London and Tokyo.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-950 bg-brand-red text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-gray-800 bg-gray-900 shadow">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-brand-red">2020</div>
                </div>
                <h4 className="font-serif font-bold text-lg mb-2">Digital Revolution</h4>
                <p className="text-sm text-gray-400">Launched our award-winning mobile app and live video streaming platform.</p>
              </div>
            </div>
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-950 bg-brand-red text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-gray-800 bg-gray-900 shadow">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-brand-red">Today</div>
                </div>
                <h4 className="font-serif font-bold text-lg mb-2">Leading the Era</h4>
                <p className="text-sm text-gray-400">Reaching over 50 million monthly readers with cutting-edge, interactive journalism.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="font-serif font-bold text-4xl mb-4">Meet the Leadership</h2>
          <p className="text-gray-600 dark:text-gray-400">The experienced journalists and editors guiding our newsroom.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map(member => (
            <div key={member.name} className="group text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg border-4 border-transparent group-hover:border-brand-red transition-all duration-300">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif font-bold text-xl mb-1">{member.name}</h3>
              <p className="text-brand-red font-medium text-sm uppercase tracking-wider">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
