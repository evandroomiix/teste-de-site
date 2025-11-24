import { ContentType, Tutorial, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Content', count: 12 },
  { id: 'dev', name: 'Development', count: 5 },
  { id: 'design', name: 'Design', count: 3 },
  { id: 'productivity', name: 'Productivity', count: 2 },
  { id: 'ai', name: 'Artificial Intelligence', count: 2 },
];

export const TUTORIALS: Tutorial[] = [
  {
    id: '1',
    title: 'Mastering React Hooks',
    excerpt: 'A comprehensive guide to using useState, useEffect, and custom hooks in modern React applications.',
    content: `
# Mastering React Hooks

React Hooks have revolutionized how we write React components. Before hooks, stateful logic was confined to class components.

## The useState Hook

\`useState\` is the most basic hook. It lets you add React state to function components.

\`\`\`tsx
const [count, setCount] = useState(0);
\`\`\`

## The useEffect Hook

\`useEffect\` lets you perform side effects in function components. It serves the same purpose as \`componentDidMount\`, \`componentDidUpdate\`, and \`componentWillUnmount\` in React classes, but unified into a single API.

## Custom Hooks

Building your own hooks lets you extract component logic into reusable functions.
    `,
    type: ContentType.ARTICLE,
    tags: ['dev', 'react', 'javascript'],
    thumbnailUrl: 'https://picsum.photos/seed/react/600/400',
    author: 'Sarah Dev',
    date: '2023-10-15',
  },
  {
    id: '2',
    title: 'Introduction to Python for Data Science',
    excerpt: 'Learn the basics of Python, Pandas, and NumPy for analyzing large datasets.',
    content: 'Python is the leading language for data science. This video tutorial covers setting up your environment, basic syntax, and introducing the Pandas library for data manipulation.',
    type: ContentType.VIDEO,
    tags: ['dev', 'python', 'data-science'],
    thumbnailUrl: 'https://picsum.photos/seed/python/600/400',
    author: 'Mike Py',
    date: '2023-11-02',
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc?si=J4xX8yM9g3qWz5n_', // Mock embed
  },
  {
    id: '3',
    title: 'Minimalist UI Design Principles',
    excerpt: 'How to create stunning user interfaces using negative space and typography.',
    content: `
# Minimalist UI Design

Minimalism is not just about using less; it's about making what you use count.

1. **Negative Space**: Don't fear whitespace. It guides the eye.
2. **Typography**: Use font weights to establish hierarchy.
3. **Color**: Stick to a strict palette.
    `,
    type: ContentType.IMAGE,
    tags: ['design', 'ui', 'ux'],
    thumbnailUrl: 'https://picsum.photos/seed/design/600/400',
    author: 'Jessica Art',
    date: '2023-09-20',
  },
  {
    id: '4',
    title: 'Company Handbook 2024',
    excerpt: 'The official internal documentation for company policies and procedures.',
    content: 'This document contains all the necessary information regarding remote work policies, holiday calendars, and code of conduct.',
    type: ContentType.DOCUMENT,
    tags: ['productivity', 'internal'],
    thumbnailUrl: 'https://picsum.photos/seed/doc/600/400',
    author: 'HR Dept',
    date: '2024-01-10',
  },
  {
    id: '5',
    title: 'Generative AI Explained',
    excerpt: 'Understanding LLMs, diffusion models, and the future of AI.',
    content: 'Generative AI refers to deep-learning models that can generate high-quality text, images, and other content based on the data they were trained on.',
    type: ContentType.ARTICLE,
    tags: ['ai', 'tech'],
    thumbnailUrl: 'https://picsum.photos/seed/ai/600/400',
    author: 'Alex Bot',
    date: '2024-02-05',
  },
  {
    id: '6',
    title: 'Advanced TypeScript Patterns',
    excerpt: 'Deep dive into generics, utility types, and type inference.',
    content: 'TypeScript is a powerful tool. Learn how to use mapped types and conditional types to create robust APIs.',
    type: ContentType.ARTICLE,
    tags: ['dev', 'typescript'],
    thumbnailUrl: 'https://picsum.photos/seed/ts/600/400',
    author: 'Code Master',
    date: '2024-03-12',
  }
];