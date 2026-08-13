import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero, type CTA } from './Hero';
import { mockHero } from '#lib/mockData';
import { expect } from 'storybook/test';

const meta: Meta<typeof Hero> = {
  title: 'Components/Portfolio/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Hero Section',
      },
    },
  },

  args: {
    title: mockHero.title,
    position: mockHero.position,
    media: {
      src: mockHero.imageUrl,
      alt: mockHero.imageAlt,
    },
    actions: mockHero.actions,
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Hero
      {...args}
      renderMedia={(props) => (
        <img src={props.src} alt={props.alt} className="saturate-0" />
      )}
      renderAction={(props) => <a href={props.href}>{props.label}</a>}
    />
  ),
  play: async ({ canvas }) => {
    const title = canvas.getByText(mockHero.title);
    const image = canvas.getByRole('img');

    await expect(title).toBeInTheDocument();
    await expect(image).toBeInTheDocument();
    await expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('cdn.sanity.io'),
    );
    await expect(image).toHaveAttribute('alt');
  },
};
