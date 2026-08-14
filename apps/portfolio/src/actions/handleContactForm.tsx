'use server';

import {
  ActionResponse,
  InputContactFormSchema,
  OutputContactFormSchema,
} from '@snoomleng/utils';

export const handleContactForm = async (
  data: InputContactFormSchema,
): Promise<ActionResponse<OutputContactFormSchema>> => {
  try {
    return {
      success: true,
      message: 'Message Sent!',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};
