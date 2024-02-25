import React, {useState, useContext} from 'react';
import {Flex, Modal, useToast} from '@chakra-ui/react';
import SignIn from './signin';
import SignUp from './signup';
import {UserContext} from '@/app/contexts/usercontext';
import {useRouter} from 'next/navigation';
import {useMutation} from '@apollo/client';
import {CREATE_USER} from '../../lib/constants';
import {SIGN_IN} from '../../lib/constants';
import OTPModal from './otpModal';

export default function AuthModals() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const {setUser} = useContext(UserContext);
  const {user} = useContext(UserContext);
  const toast = useToast();
  const router = useRouter();
  const [isOTPRequired, setIsOTPRequired] = useState(false);
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useMutation(SIGN_IN);
  const onClose = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };
  const [userData, setUserData] = useState({email: '', password: ''});

  interface UserData {
    email: string;
    password: string;
  }

  const handleSignIn = async (userData: UserData) => {
    try {
      const {data} = await signIn({
        variables: {
          email: userData.email,
          password: userData.password,
        },
      });

      if (data.signIn) {
        const {token, id} = data.signIn;

        setUser({token, id});
        toast({
          title: 'Signed in successfully',
          description: 'You are now signed in.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });

        router.push('/');
        onClose();
      }
    } catch (e) {
      toast({
        title: 'Error signing in',
        description: 'Unable to sign in. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  const handleSignUp = async (userData: UserData) => {
    setUserData(userData);
    try {
      const {data} = await createUser({
        variables: {
          input: userData,
        },
      });

      if (data.createUser) {
        toast({
          title: 'Account created successfully',
          description: 'Welcome to QLIMAX!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
      }
      setIsOTPRequired(true);
    } catch (e) {
      toast({
        title: 'Error creating account',
        description: 'Unable to create account. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  const handleOTPVerification = async () => {
    handleSignIn(userData);
    setIsOTPRequired(false);
  };
  const toggleForms = () => {
    setShowSignIn(!showSignIn);
    setShowSignUp(!showSignUp);
  };

  return (
    <Modal isOpen={true} onClose={() => {}}>
      <Flex direction="column" justifyContent="center" alignItems="center">
        {isOTPRequired ? (
          <OTPModal onVerify={handleOTPVerification} />
        ) : (
          <>
            {showSignIn && (
              <SignIn onSignUp={toggleForms} onSignIn={handleSignIn} />
            )}
            {showSignUp && <SignUp onSignUp={handleSignUp} />}
          </>
        )}
      </Flex>
    </Modal>
  );
}
