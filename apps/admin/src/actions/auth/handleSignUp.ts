'use server';

import { signUp } from '@/lib/auth-server';
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

    const { data: singUpData, error } = await signUp.email({
      name,
      email,
      password,
      callbackURL: '/',
    });

    if (error) {
      console.error(error);
      return {
        success: false,
        message: 'erorr',
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
