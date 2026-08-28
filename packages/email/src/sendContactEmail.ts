import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { render } from 'react-email';
import ContactEmail from './emails/ContactEmail';

const ses = (region: string, accessKeyId: string, secretAccessKey: string) =>
  new SESClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

type SendContactEmailProps = {
  email: string;
  aws: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  };
};

export const sendContactEmail = async ({
  email,
  aws,
}: SendContactEmailProps) => {
  const html = await render(ContactEmail());

  try {
    const client = ses(aws.region, aws.accessKeyId, aws.secretAccessKey);

    await client.send(
      new SendEmailCommand({
        Source: 'noreply@snoomleng.com',
        Destination: {
          ToAddresses: [email],
        },

        Message: {
          Subject: {
            Data: `Thank you for contacting Me!`,
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
