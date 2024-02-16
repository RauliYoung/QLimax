"use client";
import React, {useState} from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider,
  Button,
  Textarea,
  IconButton,
  Flex,
  Tag,
  Stack,
} from '@chakra-ui/react';
import {BsHeartFill} from 'react-icons/bs';

type Comment = {
  id: number;
  user: string;
  text: string;
};

const BlogPostPage: React.FC = () => {
  const date = new Date().toLocaleDateString('fi-FI');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  // comment functions just for funsies and to show to ilkka
  // TODO: replace with actual comment functionality and backend connection

  const handleCommentSubmit = () => {
    setIsSubmitting(true);
    const newComment: Comment = {
      id: comments.length + 1,
      user: 'Username',
      text: comment,
    };
    setTimeout (() => {
    setComments([...comments, newComment]);
    setIsSubmitting(false);
    setComment('');
    }
    , 1000);
  };

  return (
    <Container py={10}>
      <VStack spacing={8} alignItems="flex-start">
        <Heading>BLOGPOST</Heading>
        <Flex alignItems="center" justifyContent="space-between">
          <h1>Blog Post Title</h1>
          <Stack alignItems="flex-end">
            <Tag colorScheme="blue">sometag</Tag>
            <Tag colorScheme="blue">someothertag</Tag>
          </Stack>
        </Flex>
        <p>Posted on: {date}</p>
        <p>Author: Fahey Schmidt</p>
        <Divider />
        <Text>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Text>
        <Divider />
        <Flex alignItems="center" justifyContent="space-between" w="full">
          <Heading size="md">Comments</Heading>
          <IconButton aria-label="like" icon={<BsHeartFill />} />
        </Flex>
        <Box w="full">
          <Textarea
            placeholder="Write a comment..."
            mb={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            colorScheme="blue"
            isLoading={isSubmitting}
            loadingText="Submitting"
            spinnerPlacement="start"
            onClick={handleCommentSubmit}
            aria-label="submit comment"
          >
            Submit
          </Button>
        </Box>
        <VStack spacing={4} alignItems="flex-start" w="full">
          {comments.map((comment) => (
            <Box key={comment.id}>
              <Text fontWeight="bold">{comment.user}</Text>
              <Text>{comment.text}</Text>
              <Divider />
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default BlogPostPage;
