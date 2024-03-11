import React, {useContext, useState} from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  useColorModeValue,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import customTheme from '../../../../themes/theme';
import {useMutation} from '@apollo/client';
import {UPDATE_USER, DELETE_USER, CONFIRM_PASSWORD} from '@/app/lib/constants';
import {UserContext} from '@/app/contexts/usercontext';
import {useToast} from '@chakra-ui/react';
import {ConfirmationModal} from '../modals/confirmationModal';

interface SettingsModalProps {
  onPasswordChange: (newPassword: string) => void;
}

// const SettingsPage: React.FC<SettingsModalProps> = ({onPasswordChange})
const SettingsPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const toast = useToast();

  const [newEmail, setNewEmail] = useState('');
  const [confirmEmailPassword, setConfirmEmailPassword] = useState('');

  const {user} = useContext(UserContext);

  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [confirmPass] = useMutation(CONFIRM_PASSWORD);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
      return;
    }

    confirmPass({
      variables: {
        id: user?.id,
        password: currentPassword,
      },
    }).then(() => {
      updateUser({
        variables: {
          input: {
            id: user?.id,
            password: newPassword,
          },
        },
      })
        .then(() => {
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          toast({
            title: 'Password changed successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
          });
        })
        .catch((error) => {
          toast({
            title: 'Error changing password',
            description: 'Unable to change password. Error: {$error.message}',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
          });
        });
    });
  };

  const handleEmailChange = () => {
    console.log('ASDASD');

    updateUser({
      variables: {
        input: {
          id: user?.id,
          email: newEmail,
        },
      },
    })
      .then(() => {
        toast({
          title: 'Email changed successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
      })
      .catch((error) => {
        toast({
          title: 'Error changing email',
          description: 'Unable to change email. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
      });
  };
  const handleUserDelete = () => {
    deleteUser({
      variables: {
        deleteUserId: user?.id,
      },
    })
      .then(() => {
        toast({
          title: 'User deleted successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
    window.location.href = '/';
  };

  const handleBackButton = () => {
    window.location.href = '/';
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
            <ConfirmationModal
              isOpen={isOpen}
              onClose={onClose}
              message="Are you sure you want to delete your account?"
              onConfirm={handleUserDelete}
            />
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
