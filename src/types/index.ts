export interface Author {
  name: string;
  avatar?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: Author;
  image: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}
