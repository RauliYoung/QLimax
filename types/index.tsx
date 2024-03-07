export interface Post {
  id: string;
  slug: string;
  content?: string;
  title: string;
  likes?: number;
  header: string;
  body: string;
  preview: string;
  rating: number;
  timeToRead: string;
}
