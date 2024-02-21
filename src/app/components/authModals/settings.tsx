import React, {useContext, useState} from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  useColorModeValue,
  Flex,
  useStepContext,
} from '@chakra-ui/react';
import customTheme from '../../../../themes/theme';
import {useMutation} from '@apollo/client';
import {UPDATE_USER} from '@/app/lib/constants';
import {UserContext} from '@/app/contexts/usercontext';
import bcrypt from 'bcrypt';

interface SettingsModalProps {
  onPasswordChange: (newPassword: string) => void;
}

// const SettingsPage: React.FC<SettingsModalProps> = ({onPasswordChange})

const SettingsPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const [newEmail, setNewEmail] = useState('');
  const [confirmEmailPassword, setConfirmEmailPassword] = useState('');

  const {user} = useContext(UserContext);

  const [updateUser] = useMutation(UPDATE_USER);

  const handlePasswordChange = () => {
    console.log('USERUSERABUSER');
    console.log(user);
    if (newPassword !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    updateUser({
      variables: {
        input: {
          id: '65d32e49d392ead3709b82c1',
          password: newPassword,
        },
      },
    })
      .then(() => {
        console.log('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch((error) => {
        console.error('Error changing password:', error);
      });
  };

  const handleEmailChange = () => {
    console.log('ASDASD');

    updateUser({
      variables: {
        input: {
          id: '65d32e49d392ead3709b82c1',
          email: newEmail,
        },
      },
    })
      .then(() => {
        console.log('Email changed successfully');
      })
      .catch((error) => {
        console.error('Error changing email:', error);
      });
  };

  const handleUserDelete = () => {};

  const handleBackButton = () => {
    console.log('save button pressed');
  };

  const bg = useColorModeValue('qlimax.bg-yellow', 'qlimax.bg-pink');
  const inputsBg = useColorModeValue('qlimax.bg-pink', 'qlimax.bg-yellow');
  const buttonBg = useColorModeValue('qlimax.bg-blue', 'qlimax.bg-blue');
  const textColor = useColorModeValue('qlimax.bg-yellow', 'qlimax.bg-yellow');

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      aria-label="MainBox"
    >
      <Box
        bg={bg}
        border={`1px solid ${customTheme.colors.black}`}
        borderRadius="8px"
        padding="20px"
        width={'20rem'}
        textAlign="center"
      >
        <Text
          textAlign="center"
          fontSize="2xl"
          color="black"
          marginBottom="20px"
        >
          Settings
        </Text>
        <Flex flexDirection="column" alignItems="center">
          <VStack spacing="20px">
            <Flex>
              <Button
                textAlign="center"
                color="black"
                _hover={{bg: '#677589'}}
                onClick={handlePasswordChange}
                bg={inputsBg}
                minW={'10rem'}
                border={`1px solid ${customTheme.colors.black}`}
                borderRadius="8px"
              >
                Change Password
              </Button>
            </Flex>
            <Flex display="flex" flexDirection="column" id="PasswordSettings">
              <Input
                backgroundColor="white"
                textColor="black"
                placeholder="Enter your password"
                type="password"
                _placeholder={{color: 'grey'}}
                borderColor={'gray'}
                _hover={{borderColor: 'grey'}}
                onChange={(e) => setCurrentPassword(e.target.value)}
              ></Input>
              <Input
                backgroundColor="white"
                textColor="black"
                placeholder="New password"
                type="password"
                marginTop="2%"
                _placeholder={{color: 'grey'}}
                borderColor={'gray'}
                _hover={{borderColor: 'grey'}}
                onChange={(e) => setNewPassword(e.target.value)}
              ></Input>
              <Input
                backgroundColor="white"
                textColor="black"
                placeholder="Confirm new password"
                type="password"
                marginTop="2%"
                _placeholder={{color: 'grey'}}
                borderColor={'gray'}
                _hover={{borderColor: 'grey'}}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Input>
            </Flex>
            <Flex>
              <Button
                textAlign="center"
                color="black"
                _hover={{bg: '#677589'}}
                onClick={handleEmailChange}
                bg={inputsBg}
                minW={'10rem'}
                border={`1px solid ${customTheme.colors.black}`}
                borderRadius="8px"
              >
                Change Email
              </Button>
            </Flex>
            <Flex display="flex" flexDirection="column" id="EmailSettings">
              <Input
                backgroundColor="white"
                textColor="black"
                placeholder="Enter new email"
                type="email"
                _placeholder={{color: 'grey'}}
                borderColor={'gray'}
                _hover={{borderColor: 'grey'}}
                onChange={(e) => setNewEmail(e.target.value)}
              ></Input>
              <Input
                backgroundColor="white"
                textColor="black"
                placeholder="Confirm with password"
                type="password"
                marginTop="2%"
                _placeholder={{color: 'grey'}}
                borderColor={'gray'}
                _hover={{borderColor: 'grey'}}
                onChange={(e) => setConfirmEmailPassword(e.target.value)}
              ></Input>
            </Flex>
            <Flex>
              <Button
                textAlign="center"
                color="black"
                _hover={{bg: '#677589'}}
                onClick={handleUserDelete}
                bg={inputsBg}
                minW={'10rem'}
                border={`1px solid ${customTheme.colors.black}`}
                borderRadius="8px"
              >
                Delete User
              </Button>
            </Flex>
            <Flex display="flex" flexDirection="column" id="DeleteUserSettings">
              <Input
                backgroundColor="white"
                textColor="black"
                placeholder="Confirm with password"
                type="password"
                _placeholder={{color: 'grey'}}
                borderColor={'gray'}
                _hover={{borderColor: 'grey'}}
              ></Input>
            </Flex>
            <Button
              color={textColor}
              _hover={{bg: '#677589'}}
              onClick={handleBackButton}
              bg={buttonBg}
              border="solid 2px black"
              id="BackButton"
            >
              Back
            </Button>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default SettingsPage;
