'use client';

import { handleSignIn } from '@/actions/auth/handleSignIn';
import { Bounded, SignInForm } from '@snoomleng/ui';

const SignInPage = () => {
  return (
    <Bounded
      centered={false}
      size="full"
      className="flex flex-col justify-center items-center"
    >
      <SignInForm action={handleSignIn} />
    </Bounded>
  );
};

export default SignInPage;
