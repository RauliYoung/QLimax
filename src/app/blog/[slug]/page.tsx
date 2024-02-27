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
} from '@chakra-ui/react';
import {BsHeartFill} from 'react-icons/bs';
import parse from 'html-react-parser';
import {useQuery} from '@apollo/client';

export default function BlogPostPage({params}: {params: {slug: string}}) {

  const {loading, error, data} = useQuery(FETCH_POST, {
    variables: {slug: params.slug},
  });
  if (loading)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  if (error) return <Container>{error.message}</Container>;

  const {title, content, tags, timeToRead} = data.postBySlug;
  return (
    <Container bg="white" p={4} borderRadius="md" boxShadow="md">
      <VStack spacing={4} align="start">
        <Heading>{title}</Heading>
        <Flex align="center">
          <Text fontSize="sm" color="gray.500">
            {timeToRead} min read
          </Text>
          <IconButton
            aria-label="Like post"
            icon={<BsHeartFill />}
            colorScheme="red"
            size="sm"
          />
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
    </Container>
  );
}





  
 

