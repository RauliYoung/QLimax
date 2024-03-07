import {Heading, Text, Card, Flex, CardBody} from '@chakra-ui/react';
import {Post} from '../../../../types/index';
import React from 'react';

interface BlogPostPreviewProps {
  post: Post;
}

function removeTags(str: any) {
  if (str === null || str === '') return false;
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, '');
}
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  const truncated = text.substr(0, maxLength);

  const lastSpaceIndex = truncated.lastIndexOf(' ');
  const lastDotIndex = truncated.lastIndexOf('.');

  const lastIndex = Math.max(lastSpaceIndex, lastDotIndex);

  const truncatedAtSpaceOrDot =
    lastIndex > 0 ? truncated.substring(0, lastIndex) : truncated;

  return truncatedAtSpaceOrDot;
};
const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({post}) => {
  const preview = post.content;
  const strippedPreview = removeTags(preview);
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
        <Heading as="h3" fontSize="24px" textDecoration="underline" mb="10px">
          Preview
        </Heading>
        <Text as="p" fontSize="15px">
          {truncateText(strippedPreview, 220)}
        </Text>
      </CardBody>
    </Card>
  );
};

export default BlogPostPreview;
