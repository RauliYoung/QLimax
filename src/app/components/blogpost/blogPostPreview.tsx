import {Heading, Text, Card, Flex, CardBody} from '@chakra-ui/react';
import {Post} from '../../../../types/index';
import {motion, AnimatePresence} from 'framer-motion';
import React from 'react';

interface BlogPostPreviewProps {
  post: Post;
  index: number;
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

  return truncatedAtSpaceOrDot + '.....';
};

const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({post, index}) => {
  const preview = post.content;
  const strippedPreview = removeTags(preview);
  const slideInDelay = index * 0.2;
  return (
    <AnimatePresence>
      <motion.div
        initial={{opacity: 0, x: '100%'}}
        animate={{opacity: 1, x: '0%'}}
        exit={{opacity: 0, x: '-100%'}}
        transition={{duration: 1, delay: slideInDelay}}
      >
        <Card
          maxW="330px"
          h="400px"
          bg="rgba(241, 125, 177, 0.8)"
          sx={{transition: 'transform 2s, opacity 2s'}}
          transform="translateX(0%)"
        >
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
                Likes: {post.likes}
              </Text>
            </Flex>
            <Heading
              as="h3"
              fontSize="24px"
              textDecoration="underline"
              mb="5px"
            >
              Preview
            </Heading>
            <Text as="p" fontSize="15px">
              {truncateText(strippedPreview, 150)}
            </Text>
          </CardBody>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogPostPreview;
