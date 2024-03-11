export interface Post {
  id: string;
  slug: string;
  content?: string;
  title: string;
  header: string;
  body: string;
  preview: string;
  rating: number;
  tags: {tag: string; color: string}[];
  timeToRead: number;
  comments: Comment[];
}
