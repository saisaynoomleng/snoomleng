import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { render } from 'react-email';
import SignUpVerification from './emails/SignUpVerification';

type sendSignUpEmailProps = {
  text: string;
  email: string;
  url: string;
  aws: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  };
};

const ses = (region: string, accessKeyId: string, secretAccessKey: string) =>
  new SESClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

export const sendSignUpEmail = async ({
  text,
  email,
  url,
  aws,
}: sendSignUpEmailProps) => {
  const html = await render(SignUpVerification({ text, url }));

  try {
    const client = ses(aws.region, aws.accessKeyId, aws.secretAccessKey);

    await client.send(
      new SendEmailCommand({
        Source: 'noreply@snoomleng.com',
        Destination: {
          ToAddresses: ['saileng9723@gmail.com'],
        },
        ReplyToAddresses: [email],

        Message: {
          Subject: {
            Data: `Verify Your Email!`,
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
