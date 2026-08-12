import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bounded } from './Bounded';
import { expect } from 'storybook/test';

const meta: Meta<typeof Bounded> = {
  title: 'Components/Shared/Bounded',
  component: Bounded,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Component wrapper',
      },
    },
  },

  args: {
    as: 'section',
    size: 'md',
    padding: 'sm',
    spacing: 'none',
    centered: true,
  },
  argTypes: {
    as: {
      control: false,
      description: 'Determine the type of the wrapper, default to SECTION',
    },

    size: {
      control: 'radio',
      options: ['sm', 'md', 'full'],
      table: {
        type: {
          summary: 'Determine the maximum width of the wrapper',
          detail: `
            sm: 'max-w-4xl',
            md: 'max-w-7xl',
            full: 'max-w-none',
          `,
        },
      },
    },

    padding: {
      control: 'radio',
      options: ['none', 'sm', 'md', 'lg'],
      table: {
        type: {
          summary: 'Determine the padding of the wrapper',
          detail: `
            none: '',
            sm: 'px-4 md:px-6 lg:px-8 py-4',
            md: 'px-6 md:px-8 lg:px-10 py-6',
            lg: 'px-8 md:px-10 lg:px-12 py-8',
          `,
        },
      },
    },

    spacing: {
      control: 'radio',
      options: ['none', 'sm', 'md', 'lg'],
      table: {
        type: {
          summary: 'Determine the space between the children of the wrapper',
          detail: `
            none: '',
            sm: 'space-y-4 md:space-y-6 lg:space-y-8',
            md: 'space-y-6 md:space-y-8 lg:space-y-10',
            lg: 'space-y-8 md:space-y-10 lg:space-y-12',
          `,
        },
      },
    },

    centered: {
      control: 'boolean',
      description:
        'Determine whehter the wrapper needs to be centered depending on the screen width',
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    children: {
      control: false,
      description: 'React Node',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Bounded {...args}>
      <h2>Heading 2</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium
        laboriosam ipsam quia libero voluptas placeat optio eligendi recusandae
        consectetur consequuntur!
      </p>
    </Bounded>
  ),
  play: async ({ canvas }) => {
    const heading = canvas.getByRole('heading');
    const p = canvas.getByRole('paragraph');
    const bounded = p.parentElement;

    await expect(heading).toBeInTheDocument();
    await expect(p).toBeInTheDocument();
    await expect(bounded?.tagName).toBe('SECTION');
  },
};

export const Main: Story = {
  render: (args) => (
    <Bounded {...args} as="main" spacing="sm">
      <h2>Heading 2</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium
        laboriosam ipsam quia libero voluptas placeat optio eligendi recusandae
        consectetur consequuntur!
      </p>
    </Bounded>
  ),
  play: async ({ canvas }) => {
    const heading = canvas.getByRole('heading');
    const bounded = heading.parentElement;

    await expect(heading).toBeInTheDocument();
    await expect(bounded?.tagName).toBe('MAIN');
  },
};
