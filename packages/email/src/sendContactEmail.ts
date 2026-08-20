import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { render } from 'react-email';
import ContactEmail from './emails/ContactEmail';

const ses = new SESClient({
  region: 'us-east-1',
});

export const sendContactEmail = async ({ email }: { email: string }) => {
  const html = await render(ContactEmail());

  try {
    await ses.send(
      new SendEmailCommand({
        Source: 'contact@snoomleng.com',
        Destination: {
          ToAddresses: ['contact@snoomleng.com', 'saileng9723@gmail.com'],
        },
        ReplyToAddresses: [email],

        Message: {
          Subject: {
            Data: `Contact Reached!`,
          },
          Body: {
            Html: {
              Data: html,
            },
          },
        },
      }),
    );
  } catch (error) {
    console.error('SES error', error);
    throw error;
  }
};
