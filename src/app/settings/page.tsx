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
  Grid,
} from '@chakra-ui/react';

const SettingsPage = () => {
  return (
    <Grid
      w="80vh"
      height="80vh"
      bg="qlimax.bg-pink"
      border="solid 1px black"
      m="auto"
      gridTemplateRows="minmax(50px, auto)"
    >
      <Box border="solid 1px black">email</Box>
      <Box border="solid 1px black">password</Box>
      <Box border="solid 1px black">User delete</Box>
      <Box border="solid 1px black">eat shit</Box>
      <Box border="solid 1px black">sug min kuk</Box>
    </Grid>
  );
};
export default SettingsPage;
