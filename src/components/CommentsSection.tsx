"use client";

import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

interface Comment {
  id: number;
  name: string;
  content: string;
  createdAt: string;
}

export function CommentsSection({ articleId }: { articleId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (articleId) {
      fetchComments();
    }
  }, [articleId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?articleId=${articleId}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error("Failed to fetch comments", err);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, content, articleId }),
      });

      if (res.ok) {
        setName('');
        setContent('');
        fetchComments(); // Refresh list
      } else {
        alert("Failed to post comment. Please try again.");
      }
    } catch (err) {
      alert("Error posting comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-12">
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare className="w-6 h-6 text-brand-red" />
        <h3 className="font-serif font-bold text-3xl">Comments ({comments.length})</h3>
      </div>

      <div className="space-y-6 mb-10">
        {fetching ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-5 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-sm uppercase">
                  {comment.name.substring(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{comment.name}</p>
                  <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4 className="text-xl font-bold mb-6">Leave a Reply</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-brand-red outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Comment *</label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-brand-red outline-none resize-y"
              placeholder="What are your thoughts on this?"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 bg-brand-red text-white font-bold rounded-lg hover:bg-brand-darkRed transition-colors disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </div>
    </div>
  );
}
