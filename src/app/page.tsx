'use client';
import {Flex, Heading, Grid, Box, Spinner} from '@chakra-ui/react';
import BlogPostPreview from './components/blogpost/blogPostPreview';
import {Post} from '../../types';
import Link from 'next/link';
import {FETCH_POSTS} from './lib/constants';
import {useQuery} from '@apollo/client';

export default function Home() {
  const {loading, data} = useQuery(FETCH_POSTS);

  const results: Post[] = data?.posts;

  const loaingSpinner = (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="50vh"
      width="100%"
    >
      <Spinner
        size="xl"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="plum"
      />
    </Box>
  );

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
              <Flex>{loading ? loaingSpinner : null}</Flex>
            ) : (
              results.map((post: Post, index: number) => (
                <Link key={index} href={`/blog/${post.slug}`}>
                  <BlogPostPreview post={post} index={index} />
                </Link>
              ))
            )}
          </Grid>
        </Flex>
      </Flex>
    </>
  );
}
