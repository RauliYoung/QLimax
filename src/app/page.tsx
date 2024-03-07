'use client';
import {Flex, Heading, Grid} from '@chakra-ui/react';
import BlogPostPreview from './components/blogpost/blogPostPreview';
import {Post} from '../../types';
import Link from 'next/link';
import {FETCH_POSTS} from './lib/constants';
import {useQuery} from '@apollo/client';

export default function Home() {
  const {loading, error, data} = useQuery(FETCH_POSTS);

  const results: Post[] = data?.posts;

  return (
    <>
      <Flex as="main" direction="column" pb="1rem">
        <Flex
          as="section"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading as="h1" fontSize={{base: '42px', lg: '64px'}} pb="1rem">
            Our top blogs
          </Heading>
        </Flex>
        <Flex maxW="100%" justifyContent="center">
          <Grid
            as="section"
            gridTemplateColumns={{base: '1fr', lg: 'repeat(3, 1fr)'}}
            justifyContent="center"
            gap="1rem"
            m="auto"
          >
            {!results ? (
              <Flex>
                <Heading as="h2" fontSize={{base: '24px', lg: '32px'}}>
                  Loading...
                </Heading>
              </Flex>
            ) : (
              results.map((post: Post, index: number) => (
                <Link key={index} href={`/blog/${post.slug}`}>
                  <BlogPostPreview post={post} />
                </Link>
              ))
            )}
          </Grid>
        </Flex>
      </Flex>
    </>
  );
}
