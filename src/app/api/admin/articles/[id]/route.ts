import { NextResponse } from 'next/server';
import { Article } from '@/lib/models';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const article = await Article.findByPk(params.id);
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    await article.destroy();
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
