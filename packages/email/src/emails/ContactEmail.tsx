import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from 'react-email';

const ContactEmail = () => {
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
          <title>snoomleng contact email</title>
        </Head>

        <Body className="bg-bg-2 m-0 font-sans">
          <Preview>Thank you for contacting me!</Preview>

          <Container className="mobile:mt-0 mx-auto mt-8 w-full max-w-[640px]">
            <Section className="bg-bg mobile:px-2 px-6 py-4 ">
              <Img
                src="https://cdn.sanity.io/images/h5ref3kt/production/e90d6b7323a5de9639c61f76c589fa9f550a4e6d-740x591.png"
                alt="snoomleng logo"
                width={100}
                className="mx-auto"
              />
            </Section>

            <Section>
              <Text>Hello,</Text>
              <Text>
                Thanks for getting in touch! I&apos;ve received your message and
                will review it as soon as possible. I&apos;ll get back to you
                shortly with a response.
              </Text>
              <Text>Best,</Text>
              <Text>Sai Say Noom Leng</Text>
            </Section>

            <Section>
              <Text>
                Check out my website{' '}
                <Link
                  href="https://snoomleng.com"
                  target="_blank"
                  className="underline underline-offset-4 decoration-wavy decoration-brand text-black font-semibold"
                >
                  snoomleng.com
                </Link>
              </Text>
              <Text>
                Check out my blogs{' '}
                <Link
                  href="https://blog.snoomleng.com"
                  target="_blank"
                  rel="noreferrer noindex"
                  className="underline underline-offset-4 decoration-wavy decoration-brand text-black font-semibold"
                >
                  blog.snoomleng.com
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default ContactEmail;
