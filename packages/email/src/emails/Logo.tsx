import { Img, Section } from 'react-email';

export const Logo = () => {
  return (
    <Section className="bg-bg mobile:px-2 px-6 py-4 ">
      <Img
        src="https://cdn.sanity.io/images/h5ref3kt/production/e90d6b7323a5de9639c61f76c589fa9f550a4e6d-740x591.png"
        alt="snoomleng logo"
        width={100}
        className="mx-auto"
      />
    </Section>
  );
};
