import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import SignIn from './signin';
import SignUp from './signup';

export default function Auth() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);



  const handleSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const handleSignInData = (data:any) => {
    console.log(data);
  };

  const handleSignUpData = (data:any) => {
   console.log(data); 
  };

  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      {showSignIn && <SignIn onSignUp={handleSignUp} onSignIn={handleSignInData} />}
      {showSignUp && <SignUp onSignUp={handleSignUpData} />}
    </Flex>
  );
}
