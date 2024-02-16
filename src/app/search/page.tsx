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
} from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import testData from '../../../testData/testPosts.json';

type BlogPost = {
  title: string;
  header: string;
  body: string;
};

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<BlogPost[]>([]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    const newResults = testData.filter((post: BlogPost) =>
      post.title.toLowerCase().includes(newSearchTerm.toLowerCase()),
    );
    setResults(newResults);
  };

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
            <Box key={index} bg="plum"  p={4} borderRadius="md">
              <Heading color="black" size="md">{result.title}</Heading>
              <Text color="black">{result.header}</Text>
              <Text color="black">{result.body}</Text>
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default SearchPage;
