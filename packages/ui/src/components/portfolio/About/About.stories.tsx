import type { Meta, StoryObj } from '@storybook/react-vite';
import { About } from './About';
import { mockAbout } from '#lib/mockData';

const meta: Meta<typeof About> = {
  title: 'Components/Portfolio/About',
  component: About,
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
    workflows: mockAbout.workflows,
    body: mockAbout.body,
    location: 'Cleveland, OH',
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

    workflows: {
      control: false,
      description: 'How I think and work',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <About {...args} />,
};
