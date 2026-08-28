'use server';

import { sendSignUpEmail } from '@snoomleng/email';
import { User } from 'better-auth/types';
import env from './env';

type SendVerificationEmailProps = {
  user: User;
  url: string;
};

export const sendVerificationEmail = async ({
  user,
  url,
}: SendVerificationEmailProps) => {
  const text = 'You have signed up to admin.snoomleng.com!';

  try {
    void sendSignUpEmail({
      text,
      email: user.email,
      url,
      aws: {
        region: env.AWS_REGION,
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });
  } catch (error) {
    console.error('Failed to send verification email error', error);
  }
};
