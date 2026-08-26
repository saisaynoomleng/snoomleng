'use server';

import { env } from '@/lib/env/server';
import {
  ActionResponse,
  SignUpFormInputSchema,
  SignUpFormOutputSchema,
  SignUpFormSchema,
} from '@snoomleng/utils';

export const handleSignUp = async (
  data: SignUpFormInputSchema,
): Promise<ActionResponse<SignUpFormInputSchema>> => {
  try {
    const result = SignUpFormSchema.safeParse(data);

    if (!result.success) {
      const e = result.error.issues[0];

      return {
        success: false,
        message: e.message,
        field: e.path.join('.') as keyof SignUpFormOutputSchema,
      };
    }

    const { name, email, password } = result.data;

    const response = await fetch(`${env.API_URL}/api/auth/sign-up/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'http://localhost:3002',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      console.error('error', await response.text());
      return {
        success: false,
        message: 'Something went wrong',
      };
    }

    return {
      success: true,
      message: 'Sign Up successful!',
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};
