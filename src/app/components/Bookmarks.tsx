'use client';
import React, {useEffect, useState, useContext, ChangeEvent} from 'react';
import {useQuery, useApolloClient} from '@apollo/client';
import {FETCH_USER, FETCH_POST_BY_ID} from '@/app/lib/constants';
import {UserContext} from '@/app/contexts/usercontext';
import {Spinner} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';
import {Box, Input, Text, VStack, Divider, IconButton} from '@chakra-ui/react';
import {FiBookOpen} from 'react-icons/fi';

interface Post {
  title: string;
  content: string;
  tags: {tag: string; color: string}[];
  slug: string;
  timeToRead: number;
}

interface User {
  id: string;
  bookmarks: string[];
}

interface QueryData {
  user: User;
}

export const UsersBookmarks: React.FC = () => {
  const {user} = useContext(UserContext);
  const router = useRouter();
  const client = useApolloClient();
  const {loading, error, data} = useQuery<QueryData>(FETCH_USER, {
    variables: {id: user?.id},
    skip: !user?.id,
  });

  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [fetchingPosts, setFetchingPosts] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [originalPosts, setOriginalPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (data?.user?.bookmarks?.length) {
        setFetchingPosts(true);
        try {
          const postsPromises = data.user.bookmarks.map((bookmarkId) =>
            client.query({
              query: FETCH_POST_BY_ID,
              variables: {id: bookmarkId},
            }),
          );
          const results = await Promise.all(postsPromises);
          const posts = results.map((result) => result.data.post);
          setBookmarkedPosts(posts);
          setOriginalPosts(posts);
        } catch (err) {
          console.error(err);
        } finally {
          setFetchingPosts(false);
        }
      }
    };

    fetchPosts();
  }, [data, client]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    if (!newSearchTerm.trim()) {
      setBookmarkedPosts(originalPosts);
      return;
    }
    const newResults = originalPosts.filter((post) =>
      post.title.toLowerCase().includes(newSearchTerm.toLowerCase()),
    );
    setBookmarkedPosts(newResults);
  };

  const handleBoxClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };
  if (loading || fetchingPosts)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
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
  if (error) return <p>Error :(</p>;

  // TODO: style more if time permits and soul desires

  return (
    <Box
      display="flex"
      flexDirection="column"
      bg="white"
      p={8}
      borderRadius="8"
      mt={2}
      mx="auto"
      boxShadow="sm"
      maxW="xl"
      minW="lg"
      maxH="xl"
    >
      <Box textAlign="center" mb={6}>
        <Text fontSize="4xl" fontWeight="bold" mb={2} color="black">
          Your Bookmarks
        </Text>
        <Text fontSize="smaller" color="black">
          You've saved these posts for later.
        </Text>
      </Box>
      <Box mb={6}>
        <Input
          placeholder="Search"
          size="lg"
          onChange={handleSearch}
          bg="gray.100"
        />
      </Box>
      <Divider mb={6} />
      <VStack
        spacing={4}
        align="stretch"
        overflowY="auto"
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none', 
          'scrollbar-width': 'none'
        }}
      >
        {bookmarkedPosts.map((post) => (
          <Box
            key={post.slug}
            p={4}
            display="flex"
            flexDirection="row"
            alignItems="center"
            bg="gray.100"
            borderRadius="md"
            boxShadow="md"
            _hover={{bg: 'gray.200'}}
          >
            <Box flex="1" pr={4}>
              <Text fontSize="xl" fontWeight="bold" isTruncated color="black">
                {post.title}
              </Text>
              <Text fontSize="small">Read time {post.timeToRead} min</Text>
            </Box>
            <Box>
              {post.tags.map((tag, index) => (
                <Text
                  key={index}
                  fontSize="x-small"
                  color={tag.color}
                  bg="transparent"
                  p={1}
                  borderRadius="md"
                >
                  {tag.tag}
                </Text>
              ))}
            </Box>
            <IconButton
              aria-label={`Bookmark ${post.title}`}
              icon={<FiBookOpen />}
              size="lg"
              variant="ghost"
              onClick={() => handleBoxClick(post.slug)}
            />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
