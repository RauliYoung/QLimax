import React, {useState} from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Modal,
} from '@chakra-ui/react';
import customTheme from '../../../../themes/theme';

interface SignUpProps {
  onSignUp: (data: {email: string; password: string}) => void;
}

const SignUp: React.FC<SignUpProps> = ({onSignUp}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    const {confirmPassword, ...dataToSend} = formData;
    onSignUp(dataToSend);
  };

  return (
    <Modal isOpen={true} onClose={() => {}}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
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
                bg="#475569"
                color="white"
                _hover={{bg: '#677589'}}
                type="submit"
              >
                Sign Up
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignUp;
