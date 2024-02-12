import React, {useState} from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
} from '@chakra-ui/react';
import customTheme from '../../../../themes/theme';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      background={`url(${customTheme.bgImage})`}
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Box
        bg={customTheme.colors.gray[300]}
        border={`1px solid ${customTheme.colors.black}`}
        borderRadius="8px"
        padding="20px"
      >
        <Text
          textAlign="center"
          fontSize="2xl"
          color="black"
          marginBottom="20px"
        >
          Sign In
        </Text>
        <form>
          <VStack spacing="20px">
            <FormControl>
              <FormLabel textAlign="center">Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                borderColor="black"
                _hover={{borderColor: 'black'}}
              />
            </FormControl>
            <FormControl>
              <FormLabel textAlign="center">Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                borderColor="black"
                _hover={{borderColor: 'black'}}
              />
            </FormControl>
            <Button
              bg="#475569"
              color="white"
              _hover={{bg: '#677589'}}
              onClick={() => {
                console.log('logging in');
              }}
            >
              Sign In
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default SignIn;
