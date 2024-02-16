'use client';
import {Flex, Heading, Grid, Text, Card, CardBody} from '@chakra-ui/react';
import testData from '../../testData/testPosts.json';
import Auth from './components/authModals/authModals';
import {useContext} from 'react';
import {UserContext} from './contexts/usercontext';

interface Post {
  title: string;
  header: string;
  body: string;
}
export default function Home() {
  const {user} = useContext(UserContext);
  return (
    <>
      {!user ? (
        <Auth />
      ) : (
        <Flex as="main" direction="column">
          <Flex
            as="section"
            direction="column"
            p="1rem"
            justifyContent="center"
            alignItems="center"
          >
            <Heading as="h1" fontSize="64px">
              Our top blogs
            </Heading>
          </Flex>
          <Flex maxW="100%" justifyContent="center">
            <Grid
              as="section"
              gridTemplateColumns="repeat(3, 1fr)"
              justifyContent="center"
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
                ))}
            </Grid>
          </Flex>
        </Flex>
      )}
    </>
  );
}
