'use client'
import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider,
  Button,
  Textarea,
} from '@chakra-ui/react';
import {useState} from 'react';

const BlogPostPage = () => {

  const date = new Date().toLocaleDateString( 'fi-FI');
  const [isSubmitting]= useState(false);

  return (
    <Container py={8}>
      <VStack spacing={8} alignItems="flex-start">
        <Heading>BLOGPOST</Heading>
        <Text>
          <h2>Blog Post Title</h2>
          <p>Posted on: {date}</p>
          <p>Author: Fahey Schmidt</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </Text>
        <Divider />
        <Heading size="md">Comments</Heading>
        <Box w="full">
          <Textarea placeholder="Write a comment..." mb={4} />
          <Button colorScheme="blue"  isLoading={isSubmitting} loadingText='Submitting' spinnerPlacement='start'>Submit</Button>
        </Box>
        <VStack spacing={4} alignItems="flex-start" w="full">
          <Text fontWeight="bold">Noemy.Blick</Text>
          <Text>comments Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</Text>
          <Divider />
          <Text fontWeight="bold">Vito_Altenwerth28</Text>
          <Text>Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</Text>
        </VStack>
      </VStack>
    </Container>
  );
};

export default BlogPostPage;
