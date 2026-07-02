import { NextResponse } from 'next/server';
import { Comment } from '@/lib/models';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('articleId');

    if (!articleId) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    const comments = await Comment.findAll({
      where: { ArticleId: articleId },
      order: [['createdAt', 'DESC']],
    });

    return NextResponse.json(comments);
  } catch (error: any) {
    console.error('Fetch comments error:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, content, articleId } = body;

    if (!name || !content || !articleId) {
      return NextResponse.json({ error: 'Name, content, and articleId are required' }, { status: 400 });
    }

    const comment = await Comment.create({
      name,
      content,
      ArticleId: articleId,
    });

    return NextResponse.json({ success: true, comment });
  } catch (error: any) {
    console.error('Post comment error:', error);
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}
