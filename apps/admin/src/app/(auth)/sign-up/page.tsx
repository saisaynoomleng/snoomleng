'use client';

import { handleSignUp } from '@/actions/auth/handleSignUp';
import { Bounded, SignUpForm } from '@snoomleng/ui';

const SignUp = () => {
  return (
    <Bounded
      className="flex justify-center items-center"
      size="full"
      centered={false}
    >
      <SignUpForm action={handleSignUp} />
    </Bounded>
  );
};

export default SignUp;
