import { Section, Text, Link } from 'react-email';

export const Website = () => {
  return (
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
  );
};
