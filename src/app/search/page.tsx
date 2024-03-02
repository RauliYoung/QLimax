'use client';
import React, {useState, ChangeEvent} from 'react';
import {
  Box,
  Input,
  IconButton,
  Stack,
  Heading,
  Text,
  Container,
  Divider,
  Center,
  Spinner,
  Tag,
} from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import {FETCH_POSTS} from '@/app/lib/constants';
import {useQuery} from '@apollo/client';
import parse from 'html-react-parser';
import {useRouter} from 'next/navigation';

type BlogPost = {
  title: string;
  content: string;
  tags: {tag: string; color: string}[];
  slug: string;
  timeToRead: number;
};
interface TagType {
  tag: string;
  color: string;
}

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<BlogPost[]>([]);
  const {loading, error, data} = useQuery(FETCH_POSTS);
  const router = useRouter();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    if (!newSearchTerm) {
      setResults([]);
      return;
    }
    const newResults = data.posts.filter((post: BlogPost) =>
      post.title.toLowerCase().includes(newSearchTerm.toLowerCase()),
    );
    setResults(newResults.slice(0, 5));
  };

  const handleBoxClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  if (loading)
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
          emptyColor="plum"
          color="#27AAE1"
        />
      </Box>
    );

  return (
    <Container py={10} maxW="container.md">
      <Box p={4}>
        <Stack spacing={4}>
          <Heading alignSelf="center">Search the Qlimax</Heading>
          <Box display="flex">
            <Input
              placeholder="Search for qlimax"
              aria-label="Search input"
              value={searchTerm}
              onChange={handleSearch}
              size="lg"
              bg="whitesmoke"
              color="black"
            />
            <IconButton
              colorScheme="blue"
              aria-label="Search"
              icon={<SearchIcon />}
              ml={2}
            />
          </Box>
          <Center h="40px">
            <Divider orientation="vertical" />
          </Center>
          {results.map((result, index) => (
            <Box
              key={index}
              bg="plum"
              p={4}
              borderRadius="md"
              onClick={() => handleBoxClick(result.slug)}
              _hover={{cursor: 'pointer', boxShadow: 'lg', transform: 'scale(1.005)', transition: 'all 0.2s ease-in-out'}}
            >
              <Heading color="black" size="md">
                {result.title}
              </Heading>
              <Text color="black">
                {parse(result.content.substring(0, 1000))}
              </Text>
              <Box>
                {result.tags.map((tag: TagType, index: number) => (
                  <Tag key={index} color={tag.color} bg="white">
                    {tag.tag}
                  </Tag>
                ))}
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default SearchPage;
