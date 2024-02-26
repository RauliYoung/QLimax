import React, {useState, useContext} from 'react';
import {Flex, Modal, useToast} from '@chakra-ui/react';
import SignIn from './signin';
import SignUp from './signup';
import {UserContext} from '@/app/contexts/usercontext';
import {useRouter} from 'next/navigation';
import {useMutation} from '@apollo/client';
import {CREATE_USER} from '../../lib/constants';
import {SIGN_IN} from '../../lib/constants';
import {UPDATE_USER} from '../../lib/constants';
import OTPModal from './otpModal';

export default function AuthModals() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const {setUser} = useContext(UserContext);
  const [updateUser] = useMutation(UPDATE_USER);
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
    setIsOTPRequired(true);
  };

  const handleOTPVerification = async () => {
    try {
      const createUserResponse = await createUser({
        variables: {
          input: userData,
        },
      });

      if (createUserResponse.data.createUser) {
        const userId = createUserResponse.data.createUser.id;

        await updateUser({
          variables: {
            input: {
              id: userId,
              isValidated: true,
            },
          },
        });

        toast({
          title: 'Account created and verified successfully!',
          description: 'Welcome!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
        await handleSignIn(userData);
        setIsOTPRequired(false);
      }
    } catch (e) {
      toast({
        title: 'Error verifying Code',
        description:
          'Unable to verify Code and create account. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
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
