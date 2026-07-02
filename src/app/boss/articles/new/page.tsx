"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// ReactQuill needs to be dynamically imported because it relies on the browser's document object
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function AddNewArticle() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [content, setContent] = useState('');
  const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');

  // Placement states
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [isTrending, setIsTrending] = useState(false);

  // New Category states
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);

  const handleModeSwitch = (mode: 'visual' | 'code') => {
    // We let ReactQuill handle visual mode natively. If users want complex CSS, they should stay in Code mode.
    setEditorMode(mode);
  };

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (data.length > 0) setCategoryId(data[0].id.toString());
      });
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (status: 'published' | 'draft') => {
    if (!title || !categoryId || !content) {
      alert("Please fill in Title, Category, and Content.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('categoryId', categoryId);
    formData.append('content', content);
    formData.append('videoUrl', videoUrl);
    formData.append('status', status);
    formData.append('isFeatured', isFeatured.toString());
    formData.append('isBreaking', isBreaking.toString());
    formData.append('isTrending', isTrending.toString());
    if (image) {
      formData.append('image', image);
    }
    if (videoFile) {
      formData.append('videoFile', videoFile);
    }

    try {
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (status === 'draft') {
          // Keep them on the page or redirect to preview
          if (confirm("Draft saved! Do you want to preview it now?")) {
             window.open(`/article/${data.article.slug}`, '_blank');
          }
          router.push('/boss/articles');
        } else {
          router.push('/boss/articles');
        }
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to upload article');
      }
    } catch (err) {
      alert('An error occurred while publishing.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    setAddingCategory(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName }),
      });
      if (res.ok) {
        const data = await res.json();
        setCategories([...categories, data.category]);
        setCategoryId(data.category.id.toString());
        setNewCategoryName('');
        setShowAddCategory(false);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to add category");
      }
    } catch(err) {
      alert("Error adding category");
    } finally {
      setAddingCategory(false);
    }
  };

  // ReactQuill modules configuration for Rich Text formatting
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <div className="max-w-[1200px] mx-auto pb-20 font-sans text-gray-800 dark:text-gray-200">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-normal">Add Post</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Editor Area (Left 3 columns) */}
        <div className="lg:col-span-3 space-y-4">
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-400 rounded-sm shadow-inner"
            placeholder="Add title"
          />

          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm shadow-sm">
            {/* WordPress-style Toolbar Top row */}
            <div className="flex justify-between items-end bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 pt-2 px-2">
              <div className="flex gap-2 pb-2">
                <button type="button" className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-sm text-sm hover:bg-gray-100 text-gray-700 shadow-sm">
                  <span className="text-orange-500 font-bold">📷</span> Add Media
                </button>
              </div>
              <div className="flex">
                <button 
                  type="button" 
                  onClick={() => handleModeSwitch('visual')}
                  className={`px-4 py-1.5 text-sm border border-b-0 border-gray-300 dark:border-gray-600 rounded-t-sm ${editorMode === 'visual' ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 hover:text-gray-800'}`}
                >
                  Visual
                </button>
                <button 
                  type="button" 
                  onClick={() => handleModeSwitch('code')}
                  className={`px-4 py-1.5 text-sm border border-l-0 border-b-0 border-gray-300 dark:border-gray-600 rounded-t-sm ${editorMode === 'code' ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 hover:text-gray-800'}`}
                >
                  Code
                </button>
              </div>
            </div>

            {/* Editor Container */}
            <div className="min-h-[500px] flex flex-col">
              {editorMode === 'visual' ? (
                <div className="flex-1 flex flex-col [&_.ql-container]:flex-1 [&_.ql-editor]:min-h-[450px] [&_.ql-editor]:text-base [&_.ql-toolbar]:border-x-0 [&_.ql-toolbar]:border-t-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-300 [&_.ql-container]:border-none">
                  {(content.toLowerCase().includes('<html') || content.toLowerCase().includes('<style>')) ? (
                    <div className="flex-1 flex items-center justify-center p-8 text-center bg-gray-50 dark:bg-gray-900 min-h-[450px]">
                      <div>
                        <div className="text-4xl mb-4">⚠️</div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Visual Editor Disabled</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                          This document contains custom HTML or CSS (<code>&lt;style&gt;</code>, <code>&lt;html&gt;</code>). 
                          The Visual Editor has been disabled for this document to prevent your custom code from being automatically stripped and deleted.
                          <br /><br />
                          Please click the <strong>"Code"</strong> tab to edit this document.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <ReactQuill 
                      theme="snow" 
                      value={content} 
                      onChange={setContent} 
                      modules={modules}
                    />
                  )}
                </div>
              ) : (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 min-h-[450px]">
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-full p-4 font-mono text-xs bg-gray-50 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-600 outline-none resize-none"
                    placeholder="<html>&#10;  <head>&#10;    <style> body { background: #f4f4f4; } </style>&#10;  </head>&#10;  <body>&#10;    Write code here...&#10;  </body>&#10;</html>"
                  />
                  <div className="w-full h-full bg-white relative">
                    <div className="absolute top-0 left-0 bg-gray-800 text-white text-[10px] uppercase font-bold px-2 py-1 z-10 opacity-50">Live HTML/CSS Preview</div>
                    <iframe 
                      srcDoc={content}
                      className="w-full h-full border-none"
                      title="Live Preview"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Word Count Footer */}
            <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs text-gray-600 border-t border-gray-300 dark:border-gray-600">
              Word count: {content.replace(/<[^>]*>?/gm, '').split(/\s+/).filter(w => w.length > 0).length}
            </div>
          </div>
        </div>

        {/* Sidebar Controls (Right 1 column) */}
        <div className="lg:col-span-1 space-y-5">
          
          {/* Publish Box */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm shadow-sm">
            <div className="px-3 py-2 border-b border-gray-300 dark:border-gray-600 font-semibold text-sm">
              Publish
            </div>
            <div className="p-3 space-y-3 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
              <div className="flex justify-between">
                <button type="button" onClick={() => handleSubmit('draft')} disabled={loading} className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-sm text-sm text-gray-700 hover:bg-gray-200 disabled:opacity-50">
                  Save Draft
                </button>
                <button type="button" onClick={() => handleSubmit('draft')} disabled={loading} className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-sm text-sm text-gray-700 hover:bg-gray-200 disabled:opacity-50">
                  Preview
                </button>
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <span className="font-bold">Status:</span> Draft
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <span className="font-bold">Visibility:</span> Public
              </div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 flex justify-end border-t border-gray-200 dark:border-gray-600">
              <button 
                type="button"
                onClick={() => handleSubmit('published')} 
                disabled={loading} 
                className="px-4 py-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-sm font-bold rounded-sm shadow-sm disabled:opacity-50 transition-colors"
              >
                {loading ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>

          {/* Categories Box */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm shadow-sm">
            <div className="px-3 py-2 border-b border-gray-300 dark:border-gray-600 font-semibold text-sm flex justify-between">
              <span>Categories</span>
              <span className="text-gray-400 text-xs">▼</span>
            </div>
            <div className="p-0">
              <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 px-3 py-2 text-xs text-gray-500">
                <span className="font-semibold text-gray-800 dark:text-gray-200 border-b-2 border-transparent">All Categories</span>
                <span className="text-[#2271b1] cursor-pointer">Most Used</span>
              </div>
              <ul className="h-48 overflow-y-auto p-3 space-y-1.5 bg-white dark:bg-gray-800">
                {categories.map((cat) => (
                  <li key={cat.id} className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="category"
                      id={`cat-${cat.id}`}
                      checked={categoryId === cat.id.toString()}
                      onChange={() => setCategoryId(cat.id.toString())}
                      className="cursor-pointer mt-0.5"
                    />
                    <label htmlFor={`cat-${cat.id}`} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">{cat.name}</label>
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                {!showAddCategory ? (
                  <button type="button" onClick={() => setShowAddCategory(true)} className="text-sm text-[#2271b1] underline hover:text-blue-800">
                    + Add New Category
                  </button>
                ) : (
                  <div className="mt-2 space-y-2">
                    <input 
                      type="text" 
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="New category name"
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-sm"
                    />
                    <div className="flex gap-2">
                      <button type="button" onClick={handleAddCategory} disabled={addingCategory} className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-sm text-xs font-medium hover:bg-gray-200">
                        Add
                      </button>
                      <button type="button" onClick={() => setShowAddCategory(false)} className="text-xs text-red-600 underline">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Placements Box */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm shadow-sm">
            <div className="px-3 py-2 border-b border-gray-300 dark:border-gray-600 font-semibold text-sm flex justify-between">
              <span>Homepage Placement</span>
              <span className="text-gray-400 text-xs">▼</span>
            </div>
            <div className="p-3 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
                Top Story (Hero Section)
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                <input type="checkbox" checked={isBreaking} onChange={e => setIsBreaking(e.target.checked)} />
                Breaking News (Red Ticker)
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                <input type="checkbox" checked={isTrending} onChange={e => setIsTrending(e.target.checked)} />
                Trending Now (Sidebar)
              </label>
            </div>
          </div>

          {/* Featured Image & Video Box */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm shadow-sm">
            <div className="px-3 py-2 border-b border-gray-300 dark:border-gray-600 font-semibold text-sm flex justify-between">
              <span>Featured Image / Video</span>
              <span className="text-gray-400 text-xs">▼</span>
            </div>
            <div className="p-4 space-y-5">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Video Embed Link:</label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 focus:border-blue-400 outline-none rounded-sm shadow-inner mb-3"
                  placeholder="e.g. YouTube / Vimeo URL"
                />
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Or Upload Video File:</label>
                <div className="text-[#2271b1] text-sm underline cursor-pointer hover:text-blue-800">
                  <label className="cursor-pointer">
                    {videoFile ? videoFile.name : 'Select video file (MP4)'}
                    <input type="file" className="hidden" accept="video/*" onChange={(e) => e.target.files && setVideoFile(e.target.files[0])} />
                  </label>
                </div>
                {videoFile && (
                  <button type="button" onClick={() => setVideoFile(null)} className="text-xs text-red-600 mt-1 block hover:underline">Remove Video</button>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Cover Image:</label>
                {preview ? (
                  <div className="relative group border border-gray-200 p-1 rounded-sm">
                    <img src={preview} alt="Preview" className="w-full h-auto" />
                    <button type="button" onClick={() => {setImage(null); setPreview('');}} className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-sm shadow-sm hover:bg-red-700">Remove</button>
                  </div>
                ) : (
                  <div className="text-[#2271b1] text-sm underline cursor-pointer hover:text-blue-800">
                    <label className="cursor-pointer">
                      Set featured image
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
