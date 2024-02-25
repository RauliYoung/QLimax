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
  useColorModeValue,
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

  const bg = useColorModeValue('qlimax.bg-yellow', 'qlimax.bg-pink');
  const inputsBg = useColorModeValue('qlimax.bg-pink', 'qlimax.bg-yellow');
  const buttonBg = useColorModeValue('qlimax.bg-blue', 'qlimax.bg-blue');
  const textColor = useColorModeValue('qlimax.bg-yellow', 'qlimax.bg-yellow');

  return (
    <Modal isOpen={true} onClose={() => {}}>
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
                  bg={inputsBg}
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
                  _hover={{borderColor: 'black'}}
                  bg={inputsBg}
                  color='black'
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
                  bg={inputsBg}
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
