import {Heading, Text, Card, Flex, CardBody} from '@chakra-ui/react';
import {Post} from '../../../../types/index';

interface BlogPostPreviewProps {
  post: Post;
}

const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({post}) => {
  return (
    <Card w="330px" h="400px">
      <CardBody overflow="auto">
        <Heading as="h2" fontSize={'28px'}>
          {post.title}
        </Heading>
        <Text
          m="0.5rem 0 0.5rem 0"
          as="p"
          fontSize="15px"
          fontWeight="bold"
          color="#d14f4"
        >
          {post.header}
        </Text>
        <Flex direction="column" mb="0.5rem">
          <Text as="p" fontSize="14px" color="#fff">
            Time to read {post.timeToRead}min
          </Text>
          <Text as="p" fontSize="14px" color="#fff">
            Rating: {post.rating}
          </Text>
        </Flex>
        <Text as="p" fontSize="15px">
          {post.preview}
        </Text>
      </CardBody>
    </Card>
  );
};

export default BlogPostPreview;
