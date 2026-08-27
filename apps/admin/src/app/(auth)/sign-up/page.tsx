'use client';

import { authClient } from '@/lib/auth-client';
import { Bounded, SignUpForm, toast } from '@snoomleng/ui';
import { SignUpFormInputSchema } from '@snoomleng/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const SignUpPage = (): React.JSX.Element => {
  const router = useRouter();

  const onSubmit = async (data: SignUpFormInputSchema) => {
    await authClient.signUp.email(
      {
        name: data.name,
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
      className="flex flex-col justify-center items-center h-dvh"
    >
      <SignUpForm onSubmit={onSubmit} />
      <Link href="/sign-in" className="link-url">
        Already a member?
      </Link>
    </Bounded>
  );
};

export default SignUpPage;
