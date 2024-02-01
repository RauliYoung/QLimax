'use client';
import {
  Flex,
  Heading,
  Text,
  Card,
  CardBody,
  CardHeader,
} from '@chakra-ui/react';
import testData from '../../testData/testPosts.json';
import { Textarea } from '@chakra-ui/react'
import Switch from './components/ui/theme-toggle/toggle';


interface Post {
  title: string;
  header: string;
  body: string;
}
export default function Home() {
  return (
  <Flex direction="column" align="center" justify="center" minH="100vh" p={10}>
  <Heading as="h1" size="2xl" mb="10">
    Welcome to my blog
  </Heading>
  <Card maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
    <CardHeader>Card Title</CardHeader>
    <CardBody>
      <Text>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </Text>
    </CardBody>
  </Card>
  <Switch id="theme-toggle" />
  </Flex>

  );
}
