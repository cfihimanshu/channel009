import { NextResponse } from 'next/server';
import { syncDb, Admin, Category } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await syncDb();
    
    // Create default admin if not exists
    const adminCount = await Admin.count();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await Admin.create({
        username: 'admin',
        email: 'admin@channel009.com',
        password: hashedPassword
      });
      console.log('Default admin created: admin@channel009.com / admin123');
    }

    // Create default categories if none exist
    const catCount = await Category.count();
    if (catCount === 0) {
      const categories = ['India', 'World', 'Politics', 'Business', 'Technology', 'Sports', 'Entertainment', 'Health', 'Science'];
      for (const cat of categories) {
        await Category.create({ name: cat, slug: cat.toLowerCase() });
      }
    }

    return NextResponse.json({ message: 'Database initialized successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
