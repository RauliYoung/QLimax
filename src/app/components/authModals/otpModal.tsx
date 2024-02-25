import {
  Box,
  Button,
  FormControl,
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
  const [verificationStarted,setVerificationStarted] = useState(false);
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
      padding={5}
      borderRadius="md"
      boxShadow="lg"
      bg="white"
      maxW="md"
      mx="auto"
      mt={10}
    >
      {!otpSent ? (
        <Box
          as="form"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <FormControl isRequired>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Your Email"
              style={{width: '100%', padding: '10px', borderRadius: '5px'}}
            />
          </FormControl>
          <Button
            colorScheme="green"
            width="100%"
            mt={4}
            onClick={generateAndSendOTP}
          >
            Send Code
          </Button>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          width="100%"
        >
          <PinInput onChange={handleOtpChange} autoFocus>
            {Array(5)
              .fill('')
              .map((_, index) => (
                <PinInputField key={index} onChange={handleOtpChange} />
              ))}
          </PinInput>
          <Box ml={4}>
            <Button colorScheme="green" onClick={verifyOTP}>
              Verify Code
            </Button>
          </Box>
        </Box>
      )}
    </VStack>
  );
};

export default OTPModal;
