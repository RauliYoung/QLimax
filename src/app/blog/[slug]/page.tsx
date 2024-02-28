'use client';
import { FETCH_POST } from '@/app/lib/constants';
import {
  Heading,
  Text,
  VStack,
  Divider,
  IconButton,
  Flex,
  Tag,
  Stack,
  Container,
  Spinner,
  Tooltip,
  Box,
} from '@chakra-ui/react';
import { BsBookmarkFill, BsHeartFill } from 'react-icons/bs';
import parse from 'html-react-parser';
import { useQuery } from '@apollo/client';
import { CommentSection } from '@/app/components/blog/CommentSection';
import { LIKE_POST, ADD_BOOKMARK } from '@/app/lib/constants';
import { useMutation } from '@apollo/client';
import { UserContext } from '@/app/contexts/usercontext';
import { useContext, useState } from 'react';
import { useToast } from '@chakra-ui/react';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [likePost] = useMutation(LIKE_POST);
  const [addBookmark] = useMutation(ADD_BOOKMARK);
  const { user } = useContext(UserContext);
  const toast = useToast();

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const { loading, error, data } = useQuery(FETCH_POST, {
    variables: { slug: params.slug },
  });
  if (loading)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  const handleLike = async () => {
    try {
      await likePost({ variables: { postId: data.postBySlug.id } });
      setLiked(true);
    } catch (error) {
      console.error(error);
    }
    toast({
      title: 'Post liked',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSaveToBookmarks = async () => {
    try {
      await addBookmark({
        variables: { userId: user?.id, postId: data.postBySlug.id },
      });
      setBookmarked(true);
    } catch (error) {
      console.error(error);
    }
    toast({
      title: 'Post saved to bookmarks',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  if (error) return <Container>{error.message}</Container>;

  const { title, content, tags, timeToRead, id } = data.postBySlug;
  return (
    <Container bg="white" p={4} borderRadius="md" boxShadow="md">
      <VStack spacing={4} align="start">
        <Heading>{title}</Heading>
        <Flex align="center">
          <Text fontSize="sm" color="gray.500">
            {timeToRead} min read
          </Text>
        </Flex>
        <Stack direction="row" spacing={2}>
          {tags.map((tag: any) => (
            <Tag key={tag.tag} color={tag.color}>
              {tag.tag}
            </Tag>
          ))}
        </Stack>
        <Divider />
        <Text>{parse(content)}</Text>
      </VStack>
      <Box w="100%" pt="10" pb="10" display="flex" justifyContent="flex-end">
        <Tooltip label={liked ? 'You like this': 'Like post'} aria-label="Like post">
          <IconButton
            onClick={() => {
              handleLike();
            }}
            aria-label='like post' icon={<BsHeartFill />}
            colorScheme={liked ? 'gray' : 'red'}
            size="sm"
            alignSelf="flex-end"
            mr="2"
            isDisabled={liked}
          />
        </Tooltip>
        <Tooltip label={bookmarked ? 'Saved to bookmarks' : 'Save to bookmarks'} aria-label="Save to bookmarks">
          <IconButton
            onClick={() => {
              handleSaveToBookmarks();
            }}
            icon={<BsBookmarkFill />}
            colorScheme={bookmarked ? 'gray' : 'blue'}
            size="sm"
            alignSelf="flex-end"
            aria-label="Save to favorites"
            isDisabled={bookmarked}
          />
        </Tooltip>
      </Box>
      <CommentSection postId={id} authorId={id} />
    </Container>
  );
}
