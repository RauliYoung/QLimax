'use client';
import { BlogPostComponent } from '../components/blogpost/blogpost';
import {useContext} from 'react';
import {UserContext} from '@/app/contexts/usercontext';

export default function BlogPost() {
  const {user} = useContext(UserContext);
  if (!user) return null;
  return <BlogPostComponent />

}
