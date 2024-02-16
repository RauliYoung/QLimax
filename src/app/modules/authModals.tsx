import React, {useState, useContext} from 'react';
import {Flex, useToast} from '@chakra-ui/react';
import {UserContext} from '@/app/contexts/usercontext';
import {useRouter} from 'next/navigation';
import {useMutation} from '@apollo/client';
import {SIGN_IN} from '../lib/constants';
import SignIn from '../components/authModals/signin';
import SignUp from '../components/authModals/signup';
import { CREATE_USER } from '../lib/constants';

export default function AuthModals() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const {setUser} = useContext(UserContext);
  const toast = useToast();
  const router = useRouter();

  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useMutation(SIGN_IN);

  interface UserData {
    email: string;
    password: string;
  }

  const handleSignIn = async (userData:UserData) => {
    try {
      const {data} = await signIn({
        variables: {
          email: userData.email,
          password: userData.password,
        },
      });

      if (data.signIn) {
        setUser({token: data.signIn});
        localStorage.setItem('QLimaxToken', data.signIn);
        toast({
          title: 'Signed in successfully',
          description: 'You are now signed in.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position:"bottom-left"
        });
        router.push('/');
      }
    } catch (e) {
      toast({
        title: 'Error signing in',
        description: 'Unable to sign in. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:"bottom-left"
      });
    }
  }

  const handleSignUp = async (userData:UserData) => {
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
          position:"bottom-left"
        });

        router.push('/');
        handleSignIn(userData);
      }
    } catch (e) {
      toast({
        title: 'Error creating account',
        description: 'Unable to create account. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:"bottom-left"
      });
    }
  };
  const toggleForms = () => {
    setShowSignIn(!showSignIn);
    setShowSignUp(!showSignUp);
  };

  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      {showSignIn && <SignIn onSignUp={toggleForms} onSignIn={handleSignIn} />}
      {showSignUp && <SignUp onSignUp={handleSignUp} />}
    </Flex>
  );
}
