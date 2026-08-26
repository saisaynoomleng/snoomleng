'use server';

import { signIn } from '@/lib/auth-server';
import {
  ActionResponse,
  SignInFormInputSchema,
  SignInFormOutputSchema,
  SignInFormSchema,
} from '@snoomleng/utils';

export const handleSignIn = async (
  data: SignInFormInputSchema,
): Promise<ActionResponse<SignInFormOutputSchema>> => {
  try {
    const result = SignInFormSchema.safeParse(data);

    if (!result.success) {
      const e = result.error.issues[0];
      return {
        success: false,
        message: e.message,
        field: e.path.join('.') as keyof SignInFormOutputSchema,
      };
    }

    const { email, password } = result.data;

    const { data: signInData, error } = await signIn.email({
      email,
      password,
      rememberMe: true,
      callbackURL: '/',
    });

    if (error) {
      console.error(error);
      return {
        success: false,
        message: 'error',
      };
    }

    return {
      success: true,
      message: 'Successful log in!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};
