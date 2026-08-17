'use server';

import { env } from '@/lib/env/server';
import {
  ActionResponse,
  ContactFormSchema,
  InputContactFormSchema,
  OutputContactFormSchema,
} from '@snoomleng/utils';

export const handleContactForm = async (
  data: InputContactFormSchema,
): Promise<ActionResponse<OutputContactFormSchema>> => {
  try {
    const rawData = ContactFormSchema.safeParse(data);

    if (!rawData.success) {
      const error = rawData.error.issues[0];

      return {
        success: false,
        message: error.message,
        field: error.path.join('.') as keyof InputContactFormSchema,
      };
    }

    const response = await fetch(`${env.API_URL}/api/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rawData.data),
    });

    if (!response.ok) {
      console.log(response.statusText);
      return {
        success: false,
        message: 'Something went wrong!',
      };
    }

    const responseData = await response.json();

    return {
      success: true,
      message: responseData.message,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};
