'use client';
import {
  Flex,
  Heading,
  Text,
  Card,
  CardBody,
  CardHeader,
} from '@chakra-ui/react';
import testData from '../../testData/testPosts.json';
import {BlogPostComponent} from './components/blogpost/blogpost';

interface Post {
  title: string;
  header: string;
  body: string;
}
export default function Home() {
  return (
    <>

    <BlogPostComponent />
    </>
   
  );
}
