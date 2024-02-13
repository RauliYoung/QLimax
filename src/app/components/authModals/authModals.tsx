import React, {useState} from 'react';
import {Flex} from '@chakra-ui/react';
import SignIn from './signin';
import SignUp from './signup';
import {UserContext} from '@/app/contexts/usercontext';
import {useContext} from 'react';
import {useRouter} from 'next/navigation';
import {useToast} from '@chakra-ui/react';

interface UserData {
  email: string;
  password: string;
}

export default function AuthModals() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const {setUser} = useContext(UserContext);
  const toast = useToast();
  const router = useRouter();

  const toggleForms = () => {
    setShowSignIn(!showSignIn);
    setShowSignUp(!showSignUp);
  };

  const handleSignIn = async (data: UserData) => {
    const response = await fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const {token} = await response.json();
      setUser({token});
      toast({
        title: 'Welcome',
        description: 'You are now logged in',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
      localStorage.setItem('QLimaxToken', token);
      setTimeout(() => {
        // TODO: redirect somewhere
        router.push('/');
      }, 3000);
    } else {
      const {error} = await response.json();
      console.error(error);
    }
  };

  const handleSignUp = async (data: UserData) => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      handleSignIn(data);
      toast({
        title: 'Hello newcomer!',
        description: 'You are now signed up and logged in',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
      setTimeout(() => {
        // TODO: redirect somewhere
        router.push('/');
      }, 3000);
    } else {
      const errorData = await response.json();
      console.error(errorData.message);
    }
  };

  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      {showSignIn && <SignIn onSignUp={toggleForms} onSignIn={handleSignIn} />}
      {showSignUp && <SignUp onSignUp={handleSignUp} />}
    </Flex>
  );
}
