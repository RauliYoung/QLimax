'use client';
import React, {useEffect, useState, useContext} from 'react';
import {useQuery, useApolloClient} from '@apollo/client';
import {FETCH_USER, FETCH_POST_BY_ID} from '@/app/lib/constants';
import {UserContext} from '@/app/contexts/usercontext';
import {Box, Button, Flex, Spinner} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';

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

const UsersBookmarks: React.FC = () => {
  const {user} = useContext(UserContext);
  const router = useRouter();
  const client = useApolloClient();
  const {loading, error, data} = useQuery<QueryData>(FETCH_USER, {
    variables: {id: user?.id},
    skip: !user?.id,
  });

  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [fetchingPosts, setFetchingPosts] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (
        data &&
        data.user &&
        data.user.bookmarks &&
        data.user.bookmarks.length > 0
      ) {
        setFetchingPosts(true);
        const postsPromises = data.user.bookmarks.map((bookmarkId) =>
          client.query({
            query: FETCH_POST_BY_ID,
            variables: {id: bookmarkId},
          }),
        );

        Promise.all(postsPromises)
          .then((results) => {
            const posts = results.map((result) => result.data.post);
            setBookmarkedPosts(posts);
          })
          .catch((err) => console.error(err))
          .finally(() => setFetchingPosts(false));
      }
    };

    fetchPosts();
  }, [data, client]);

  const handleBoxClick = (slug:string) => {
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
      alignItems="center"
      bg="white"
      p={40}
      borderRadius={8}
      mt={19}
      mx="auto"
      boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
    >
      <Flex justifyContent="center" alignItems="center" mb={4}>
        <h1>Bookmarks</h1>
      </Flex>
      {bookmarkedPosts.map((post, index) => (
        <Button
          key={index}
          onClick={() => handleBoxClick(post.slug)}
          variant="button"
          size="lg"
          my={2}
       >
          {post.title}
        </Button>
      ))}
    </Box>
  );
};


export default UsersBookmarks;
