import { NextResponse } from 'next/server';
import { Article, Category } from '@/lib/models';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const categoryId = formData.get('categoryId') as string;
    const status = formData.get('status') as string || 'published';
    const image = formData.get('image') as File | null;
    let videoUrl = formData.get('videoUrl') as string;
    const videoFile = formData.get('videoFile') as File | null;
    
    const isFeatured = formData.get('isFeatured') === 'true';
    const isBreaking = formData.get('isBreaking') === 'true';
    const isTrending = formData.get('isTrending') === 'true';
    
    let imageUrl = '';
    
    // File upload logic for Images
    if (image && image.name) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const fileName = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      
      imageUrl = `/uploads/${fileName}`;
    }

    // File upload logic for Video
    if (videoFile && videoFile.name) {
      const bytes = await videoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const fileName = `${Date.now()}-${videoFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      
      videoUrl = `/uploads/${fileName}`;
    }

    // Append video URL or Video File to content
    let finalContent = content;
    if (videoUrl) {
      if (videoUrl.startsWith('/uploads/')) {
        // Uploaded video file - use HTML5 video tag with sound enabled and controls
        finalContent = `<div class="video-embed mb-6"><video width="100%" controls preload="metadata" style="max-height: 500px; background: #000; border-radius: 8px;"><source src="${videoUrl}">Your browser does not support the video tag.</video></div>` + finalContent;
      } else {
        // Embedded URL (YouTube, etc)
        finalContent = `<div class="video-embed mb-6"><iframe width="100%" height="400" src="${videoUrl}" frameborder="0" allowfullscreen></iframe></div>` + finalContent;
      }
    }

    const article = await Article.create({
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now(),
      content: finalContent,
      imageUrl: imageUrl || null,
      videoUrl: videoUrl || null,
      CategoryId: parseInt(categoryId),
      status: status,
      author: 'Admin',
      isFeatured,
      isBreaking,
      isTrending
    });

    return NextResponse.json({ success: true, article });
  } catch (error: any) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const articles = await Article.findAll({
      include: [{ model: Category, as: 'category' }],
      order: [['createdAt', 'DESC']]
    });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
