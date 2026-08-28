import {
  Html,
  Body,
  Tailwind,
  Container,
  Section,
  Head,
  Preview,
  Link,
  Text,
} from 'react-email';
import { Logo } from './Logo';
import { Website } from './Website';

type SignUpVerificationProps = { text: string; url: string };

const SignUpVerification = ({ text, url }: SignUpVerificationProps) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: '#2d93ad',
            },
          },
        },
      }}
    >
      <Html>
        <Head>
          <title>Sign Up Verification Email</title>
        </Head>

        <Body>
          <Preview>Verify your email!</Preview>

          <Container>
            <Logo />

            <Section className="flex gap-x-2 items-center">
              <Text>{text}</Text>
              <Link
                href={url}
                className="underline underline-offset-4 decoration-wavy decoration-brand text-black font-semibold"
              >
                Click this to verify your email!
              </Link>
            </Section>

            <Website />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default SignUpVerification;
