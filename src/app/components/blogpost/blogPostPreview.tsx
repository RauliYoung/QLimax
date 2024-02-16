import {Heading, Text, Card, CardBody} from '@chakra-ui/react';
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
        <Text as="p" fontSize="15px">
          {post.header}
        </Text>
        <Text as="p" fontSize="15px">
          {post.body}
        </Text>
      </CardBody>
    </Card>
  );
};

export default BlogPostPreview;
