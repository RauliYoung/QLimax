'use client';
import {FETCH_POST} from '@/app/lib/constants';
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
  Button,
} from '@chakra-ui/react';
import {BsBookmarkFill, BsHeartFill} from 'react-icons/bs';
import parse from 'html-react-parser';
import {useQuery} from '@apollo/client';
import {CommentSection} from '@/app/components/blog/CommentSection';
import {LIKE_POST, ADD_BOOKMARK} from '@/app/lib/constants';
import {useMutation} from '@apollo/client';
import {UserContext} from '@/app/contexts/usercontext';
import {useContext, useState} from 'react';
import {useToast} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';

export default function BlogPostPage({params}: {params: {slug: string}}) {
  const [likePost] = useMutation(LIKE_POST);
  const [addBookmark] = useMutation(ADD_BOOKMARK);
  const {user} = useContext(UserContext);
  const toast = useToast();
  const router = useRouter();

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const {loading, error, data} = useQuery(FETCH_POST, {
    variables: {slug: params.slug},
  });
  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <Spinner
          size="xl"
          thickness="4px"
          speed="0.65s"
          emptyColor="plum"
          color="#27AAE1"
        />
      </Box>
    );

  const handleLike = async () => {
    try {
      await likePost({variables: {postId: data.postBySlug.id}});
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
        variables: {userId: user?.id, postId: data.postBySlug.id},
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

  const getTrimmedContent = (content: string, limit = 1000) => {
    return content.length > limit
      ? content.substring(0, limit) + '...'
      : content;
  };

  if (error) return <Container>{error.message}</Container>;

  const {title, content, tags, timeToRead, id, likes} = data.postBySlug;
  return (
    <Container bg="white" p={4} borderRadius="md" boxShadow="md" maxW="container.lg">
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
        <Box
          style={
            user
              ? {}
              : {
                }
          }
        >
          <Text>
            {user ? parse(content) : parse(getTrimmedContent(content))}
          </Text>
        </Box>
        <Text>
          {!user && (
            <Button
              onClick={() => router.push('/auth')}
              size="sm"
              color="plum"
              _hover={{bg: 'plum', color: 'white'}}
            >
              <Text>Login to read more</Text>
            </Button>
          )}
        </Text>
      </VStack>
      <Box w="100%" pt="10" pb="10" display="flex" justifyContent="flex-end">
        <Text fontSize="sm" color="gray.500" alignSelf="flex-end" mr="2">
          {likes} likes
        </Text>
        {user && (
          <Tooltip
            label={liked ? 'You like this' : 'Like post'}
            aria-label="Like post"
          >
            <IconButton
              onClick={() => {
                handleLike();
              }}
              aria-label="like post"
              icon={<BsHeartFill />}
              colorScheme={liked ? 'gray' : 'red'}
              size="sm"
              alignSelf="flex-end"
              mr="2"
              isDisabled={liked}
            />
          </Tooltip>
        )}
        {user && (
          <Tooltip
            label={bookmarked ? 'Saved to bookmarks' : 'Save to bookmarks'}
            aria-label="Save to bookmarks"
          >
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
        )}
      </Box>
      {user && <CommentSection postId={id} authorId={id} />}
    </Container>
  );
}
