import React from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import customTheme from '../../../../themes/theme';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({onClose}) => {
  const bg = useColorModeValue('qlimax.bg-yellow', 'qlimax.bg-pink');
  const inputsBg = useColorModeValue('qlimax.bg-pink', 'qlimax.bg-yellow');
  const buttonBg = useColorModeValue('qlimax.bg-blue', 'qlimax.bg-blue');
  const textColor = useColorModeValue('qlimax.bg-yellow', 'qlimax.bg-yellow');

  const handlePasswordChange = () => {
    const passwordSettings = document.getElementById('PasswordSettings');
    if (passwordSettings) {
      const computedStyle = window.getComputedStyle(passwordSettings);
      const isHidden = computedStyle.getPropertyValue('display') === 'none';
      passwordSettings.style.display = isHidden ? 'flex' : 'none';
    }
  };

  const handleEmailChange = () => {
    const emailSettings = document.getElementById('EmailSettings');
    if (emailSettings) {
      const computedStyle = window.getComputedStyle(emailSettings);
      const isHidden = computedStyle.getPropertyValue('display') === 'none';
      emailSettings.style.display = isHidden ? 'flex' : 'none';
    }
  };

  const handleUserDelete = () => {
    const deleteUserSettings = document.getElementById('DeleteUserSettings');
    if (deleteUserSettings) {
      const computedStyle = window.getComputedStyle(deleteUserSettings);
      const isHidden = computedStyle.getPropertyValue('display') === 'none';
      deleteUserSettings.style.display = isHidden ? 'flex' : 'none';
    }
  };

  const handleSaveButton = () => {
    console.log('save button pressed');
  };

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
              ></Input>
              <Input
                backgroundColor="white"
                textColor="black"
                placeholder="New password"
                type="password"
                marginTop="2%"
              ></Input>
              <Input
                backgroundColor="white"
                textColor="black"
                placeholder="Confirm new password"
                type="password"
                marginTop="2%"
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
              ></Input>
              <Input
                backgroundColor="white"
                textColor="black"
                placeholder="Confirm with password"
                type="password"
                marginTop="2%"
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
              ></Input>
            </Flex>
            <Button
              color={textColor}
              _hover={{bg: '#677589'}}
              onClick={handleSaveButton}
              bg={buttonBg}
              border="solid 2px black"
            >
              Save Settings
            </Button>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default SettingsModal;
