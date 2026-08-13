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
    body: mockHero.body,
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Hero Section Title',
    },

    position: {
      control: false,
      description: 'My current positions in strings of array',
    },

    media: {
      control: false,
      description: 'Image URL and Image Alternative Text for the Hero image',
    },

    body: {
      control: false,
      description: 'Hero text content in Portable Text Component Blocks',
    },

    actions: {
      control: false,
      description: 'Call to action links in Hero Section',
    },

    renderAction: {
      control: false,
      description: 'React Elements to be renders in Next.js',
    },

    renderMedia: {
      control: false,
      description: 'React Elements to be renders in Next.js',
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Hero
      {...args}
      renderMedia={(props) => (
        <img src={props.src} alt={props.alt} className="saturate-100" />
      )}
      renderAction={(props) => <a href={props.href}>{props.label}</a>}
    />
  ),
  play: async ({ canvas }) => {
    const title = canvas.getByText(mockHero.title);
    const image = canvas.getByRole('img');
    const links = canvas.getAllByRole('link');

    await expect(title).toBeInTheDocument();
    await expect(image).toBeInTheDocument();
    await expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('cdn.sanity.io'),
    );
    await expect(image).toHaveAttribute('alt');
    await expect(links).toHaveLength(2);
  },
};
