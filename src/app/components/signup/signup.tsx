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

const SignUp: React.FC = () => {
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
          Sign Up
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
            <FormControl>
              <FormLabel textAlign="center">Confirm password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                borderColor="black"
                _hover={{borderColor: 'black'}}
              />
            </FormControl>
            <Button
              bg={'#475569'}
              color="white"
              _hover={{bg: '#677589'}}
              onClick={() => {
                if (formData.password !== formData.confirmPassword) {
                  alert("Passwords don't match");
                  return;
                }
                console.log('Form submitted:', formData);
              }}
            >
              Sign Up
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
