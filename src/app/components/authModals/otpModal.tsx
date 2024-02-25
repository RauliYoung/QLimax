import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  PinInput,
  PinInputField,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, {useState} from 'react';

interface OTPModalProps {
  onVerify: () => void;
}

const OTPModal = ({onVerify}: OTPModalProps) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verificationStarted, setVerificationStarted] = useState(false);
  const toast = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (otp: any) => {
    setOtp(otp);
  };

  const generateAndSendOTP = async () => {
    const response = await fetch('/api/mailer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'generate',
        to: email,
      }),
    });

    if (response.ok) {
      setOtpSent(true);
    }
  };

  const verifyOTP = async () => {
    const response = await fetch('/api/mailer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'verify',
        to: email,
        otp: otp,
      }),
    });

    if (response.ok) {
      toast({
        title: 'Code verified!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setVerificationStarted(false);
      onVerify();
    } else {
      toast({
        title: 'Invalid Code! Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack
      spacing={4}
      p={5}
      borderRadius="md"
      boxShadow="lg"
      bg="white"
      maxW="md"
      mx="auto"
      mt={10}
    >
      {!otpSent ? (
        <FormControl as="form" onSubmit={(e) => e.preventDefault()}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Your Email"
          />
          <Button
            colorScheme="green"
            width="100%"
            mt={4}
            onClick={generateAndSendOTP}
          >
            Send Code
          </Button>
        </FormControl>
      ) : (
        <VStack spacing={4} width="100%">
          <Box>
            <PinInput onChange={handleOtpChange} autoFocus>
              {Array(5)
                .fill('')
                .map((_, index) => (
                  <PinInputField key={index} onChange={handleOtpChange} />
                ))}
            </PinInput>
          </Box>
          <Box>
            <Button colorScheme="green" onClick={verifyOTP}>
              Verify Code
            </Button>
          </Box>
        </VStack>
      )}
    </VStack>
  );
};

export default OTPModal;
