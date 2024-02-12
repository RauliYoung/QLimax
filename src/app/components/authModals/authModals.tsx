import React, {useState} from 'react';
import {Flex} from '@chakra-ui/react';
import SignIn from './signin';
import SignUp from './signup';
import {UserContext} from '@/app/contexts/usercontext';
import {useContext} from 'react';
import { useRouter } from 'next/navigation';

interface UserData {
  email: string;
  password: string;
}

export default function AuthModals() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const {setUser} = useContext(UserContext);
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
      setUser({token})
      router.push('/'); 
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
