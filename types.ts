export enum ContentType {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT'
}

export interface Tutorial {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or HTML content
  type: ContentType;
  tags: string[];
  thumbnailUrl: string;
  author: string;
  date: string;
  videoUrl?: string; // For video type
  docUrl?: string; // For pdf/doc type
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}