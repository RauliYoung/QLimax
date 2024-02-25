import React, {useState} from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import customTheme from '../../../../themes/theme';

interface SignInProps {
  onSignUp: () => void;
  onSignIn: (data: {email: string; password: string}) => void;
}

const SignIn: React.FC<SignInProps> = ({onSignUp, onSignIn}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(formData);
  };

  const bg = useColorModeValue('qlimax.bg-yellow', 'qlimax.bg-pink');
  const inputsBg = useColorModeValue('qlimax.bg-pink', 'qlimax.bg-yellow');
  const buttonBg = useColorModeValue('qlimax.bg-blue', 'qlimax.bg-blue');
  const textColor = useColorModeValue('qlimax.bg-yellow', 'qlimax.bg-yellow');
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        bg={bg}
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
        <form onSubmit={handleSubmit}>
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
                bg={inputsBg}
                _hover={{borderColor: 'black'}}
                color='black'
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
                bg={inputsBg}
                _hover={{borderColor: 'black'}}
                color='black'
              />
            </FormControl>
            <Button
              color={textColor}
              _hover={{bg: '#677589'}}
              type="submit"
              bg={buttonBg}
              border="solid 2px black"
            >
              Sign In
            </Button>
            <Button
              bg={buttonBg}
              size="xs"
              color={textColor}
              _hover={{bg: '#677589'}}
              onClick={onSignUp}
              border="solid 2px black"
            >
              Create Account
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default SignIn;
