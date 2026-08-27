'use client';

import { authClient } from '@/lib/auth-client';
import { Bounded, SignInForm, toast } from '@snoomleng/ui';
import { SignInFormInputSchema } from '@snoomleng/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const SignInPage = (): React.JSX.Element => {
  const router = useRouter();

  const onSubmit = async (data: SignInFormInputSchema) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push('/');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <Bounded
      centered={false}
      size="full"
      className="flex flex-col gap-y-2 justify-center items-center h-dvh"
    >
      <SignInForm onSubmit={onSubmit} />
      <Link href="/sign-up" className="link-url ">
        Not a member yet?
      </Link>
    </Bounded>
  );
};

export default SignInPage;
