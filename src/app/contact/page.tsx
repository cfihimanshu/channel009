"use client";

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16">
      
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-serif font-black text-4xl md:text-5xl mb-6">Get in Touch</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Have a news tip, feedback, or want to advertise with us? We&apos;d love to hear from you. Reach out to the appropriate department below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-xl p-8 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 text-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl mb-2">Headquarters</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            123 News Avenue, Media District<br />
            New York, NY 10001
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-xl p-8 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 text-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl mb-2">Phone Numbers</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Main: +1 (555) 123-4567<br />
            News Desk: +1 (555) 987-6543
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-xl p-8 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 text-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl mb-2">Email Addresses</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Tips: tips@newspulse.com<br />
            Support: help@newspulse.com
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl rounded-2xl p-8 md:p-10">
          <h2 className="font-serif font-bold text-3xl mb-6">Send us a Message</h2>
          
          {isSuccess && (
            <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-md mb-6 font-medium">
              Thank you for your message. Our team will get back to you shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Your Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Subject</label>
              <input 
                type="text" 
                required
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                placeholder="News Tip / Advertising Inquiry"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Message</label>
              <textarea 
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all resize-none"
                placeholder="Tell us more..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-brand-red hover:bg-brand-darkRed text-white font-bold rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : (
                <>Send Message <Send className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>

        {/* Map Placeholder */}
        <div className="h-[400px] lg:h-full min-h-[500px] w-full bg-gray-200 dark:bg-gray-800 rounded-2xl relative overflow-hidden flex items-center justify-center border border-gray-300 dark:border-gray-700">
          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg relative z-10 max-w-xs">
            <MapPin className="w-10 h-10 text-brand-red mx-auto mb-3" />
            <h4 className="font-serif font-bold text-lg mb-1">NewsPulse HQ</h4>
            <p className="text-sm text-gray-500">Interactive Map Integration Placeholder</p>
          </div>
          {/* Decorative lines for fake map */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

      </div>
    </div>
  );
}
