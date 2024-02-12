import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import SignIn from './signin';
import SignUp from './signup';

interface UserData {
  email: string;
  password: string;
}

export default function AuthModals() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleForms = () => {
    setShowSignIn(!showSignIn);
    setShowSignUp(!showSignUp);
  };

  const handleSignIn = async (data: UserData) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      console.error(result.error);
    } else {
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
