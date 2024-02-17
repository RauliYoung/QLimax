'use client';
import {Flex, Heading, Grid} from '@chakra-ui/react';
import testData from '../../testData/testPosts.json';
import Auth from './components/authModals/authModals';
import {useContext} from 'react';
import {UserContext} from './contexts/usercontext';
import BlogPostPreview from './components/blogpost/blogPostPreview';
import {Post} from '../../types';

export default function Home() {
  const {user} = useContext(UserContext);
  return (
    <>
      {!user ? (
        <Auth />
      ) : (
        <Flex as="main" direction="column" pb="1rem">
          <Flex
            as="section"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading as="h1" fontSize="64px" pb="1rem">
              Our top blogs
            </Heading>
          </Flex>
          <Flex maxW="100%" justifyContent="center">
            <Grid
              as="section"
              gridTemplateColumns="repeat(3, 1fr)"
              justifyContent="center"
              gap="1rem"
              m="auto"
            >
              {testData.map((post: Post) => (
                <BlogPostPreview post={post} />
              ))}
            </Grid>
          </Flex>
        </Flex>
      )}
    </>
  );
}
