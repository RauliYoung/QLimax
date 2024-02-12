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
import SignUp from './signup';
import SignIn from './signin';

interface Post {
  title: string;
  header: string;
  body: string;
}
export default function Home() {
  return (
    <SignUp />
    // <SignIn />
    // <Flex as='main' direction='column'>
    //   <Flex
    //     as='section'
    //     direction='column'
    //     p='1rem'
    //     justifyContent='center'
    //     alignItems='center'
    //   >
    //     <Heading as='h1'>Hello world, is an old message</Heading>
    //     <Text as='p'>
    //       This is a paragraph, and it is the child of a flex container with
    //       direction column
    //     </Text>
    //     <Text as='p'>
    //       Whereas disregard and contempt for human rights have resulted
    //     </Text>
    //   </Flex>
    //   <Flex maxW='100%' justifyContent='center'>
    //     <Flex
    //       as='section'
    //       wrap='wrap'
    //       justifyContent='center'
    //       maxW='798px'
    //       gap='1rem'
    //       m='auto'
    //     >
    //       {testData
    //         .map((post: Post) => ({
    //           title: post.title,
    //           header: post.header,
    //           body: post.body,
    //         }))
    //         .map((post: Post) => (
    //           <Card w='250px' h='300px'>
    //             <CardBody overflow='auto'>
    //               <Heading as='h2' fontSize={'28px'}>
    //                 {post.title}
    //               </Heading>
    //               <Text as='p' fontSize='15px'>
    //                 {post.header}
    //               </Text>
    //               <Text as='p' fontSize='15px'>
    //                 {post.body}
    //               </Text>
    //             </CardBody>
    //           </Card>
    //         ))}
    //     </Flex>
    //   </Flex>
    // </Flex>
  );
}
