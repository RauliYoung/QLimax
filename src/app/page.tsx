'use client';
import {
  Flex,
  Heading,
  Text,
  Card,
  CardBody,
  CardHeader,
  Grid,
} from '@chakra-ui/react';
import testData from '../../testData/testPosts.json';
import mongoConnect from '../../api/db';
interface Post {
  title: string;
  header: string;
  body: string;
}
export default function Home() {
  return (
    <Flex as="main" direction="column">
      <Flex
        as="section"
        direction="column"
        p="1rem"
        justifyContent="center"
        alignItems="center"
      >
        <Heading as="h1">Hello world, is an old message</Heading>
        <Text as="p">
          This is a paragraph, and it is the child of a flex container with
          direction column
        </Text>
        <Text as="p">
          Whereas disregard and contempt for human rights have resulted
        </Text>
      </Flex>
      <Flex maxW="100%" justifyContent="center">
        <Grid
          as="section"
          gridTemplateColumns="repeat(3, 1fr)"
          maxW="990px"
          gap="1rem"
          m="auto"
        >
          {testData
            .map((post: Post) => ({
              title: post.title,
              header: post.header,
              body: post.body,
            }))
            .map((post: Post) => (
              <Card w="330px" h="400px" bg="#fff">
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
            ))}
        </Grid>
      </Flex>
    </Flex>
  );
}
