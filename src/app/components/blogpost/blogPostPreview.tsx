import {Heading, Text, Card, Flex, CardBody} from '@chakra-ui/react';
import {Post} from '../../../../types/index';

interface BlogPostPreviewProps {
  post: Post;
}

const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({post}) => {
  return (
    <Card maxW="330px" h="400px" bg="rgba(241, 125, 177, 0.8)">
      <CardBody overflow="auto">
        <Heading as="h2" fontSize={'28px'}>
          {post.title}
        </Heading>
        <Text
          m="0.5rem 0 0.5rem 0"
          as="p"
          fontSize={{base: '16px', lg: '18px'}}
          fontWeight="bold"
          color="#d14f4"
        >
          {post.header}
        </Text>
        <Flex direction="column" mb="0.5rem">
          <Text
            as="p"
            fontSize={{base: '16px', lg: '18px'}}
            color="#qlimax.bg-blue"
          >
            Time to read {post.timeToRead}min
          </Text>
          <Text
            as="p"
            fontSize={{base: '16px', lg: '18px'}}
            color="#qlimax.bg-blue"
          >
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
