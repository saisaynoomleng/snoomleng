import type { Meta, StoryObj } from '@storybook/react-vite';
import { AboutSection } from './AboutSection';
import { mockAbout } from '#lib/mockData';

const meta: Meta<typeof AboutSection> = {
  title: 'Components/Portfolio/AboutSection',
  component: AboutSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'About Section',
      },
    },
  },

  args: {
    body: mockAbout.body,
    location: 'Cleveland, OH',
    mode: mockAbout.mode,
    status: true,
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    location: {
      control: 'text',
      description: 'My current location',
    },

    body: {
      control: false,
      description: 'Summary of about me in Portable Text Blocks',
    },

    status: {
      control: 'boolean',
      description: 'Determine whether available for hiring',
    },

    mode: {
      control: false,
      description: 'Array of strings',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <AboutSection {...args} />,
};
