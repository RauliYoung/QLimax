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
import {fetchData} from '@/app/lib/fetchTestData';
import {CommentSection} from '@/app/components/blog/CommentSection';

import {BsHeartFill} from 'react-icons/bs';

import {Post} from '../../../../types';

export async function generateStaticParams() {
  const posts = fetchData();

  return posts.map((post) => ({
    slug: post.id,
  }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`

// export default function Page({ params }) {
//   const { slug } = params
//   // ...
// }

const BlogPostPage: React.FC = () => {
  const date = new Date().toLocaleDateString('fi-FI');
  const comments = [ { id: '1', user: 'user1', text: 'comment1' }, { id: '2', user: 'user2', text: 'comment2' } ];
  const postId = '1';

  return (
    <Container py={10} bg="whitesmoke" maxW="container.lg">
      <VStack spacing={8} alignItems="flex-start">
        <Heading>BLOGPOST</Heading>
        <Flex alignItems="center" justifyContent="space-between">
          <h1>Blog Post Title</h1>
          <Stack alignItems="flex-end">
            <Tag>sometag</Tag>
            <Tag>someothertag</Tag>
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
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, officia excepteur ex fugiat reprehenderit enim
            labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation
            amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud
            nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim
            nulla est proident. Nostrud officia pariatur ut officia. Sit irure
            elit esse ea nulla sunt ex occaecat reprehenderit commodo officia
            dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident
            adipisicing id nulla nisi laboris ex in Lorem sunt duis officia
            eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt
            velit enim. Voluptate laboris sint cupidatat ullamco ut ea
            consectetur et est culpa et culpa duis.
          </p>
        </Text>
        <Divider />
        <Flex alignItems="center" justifyContent="space-between" w="full">
          <Heading size="md">Comments</Heading>
          <IconButton aria-label="like" icon={<BsHeartFill />} />
        </Flex>
        <Divider />
        <Box w="container.md" alignSelf="center">
          <CommentSection comments={comments} postId={postId} />
        </Box>
      </VStack>
    </Container>
  );
};

export default BlogPostPage;
