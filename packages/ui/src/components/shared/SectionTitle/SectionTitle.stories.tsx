import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionTitle } from './SectionTitle';
import { expect } from 'storybook/test';

const meta: Meta<typeof SectionTitle> = {
  title: 'Components/Shared/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Title for each section on the webpage',
      },
    },
  },

  args: {
    as: 'h2',
    label: 'About me',
    size: 'sm',
  },

  argTypes: {
    as: {
      control: 'radio',
      options: ['h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Any heading tag from h2 to h6, default to h2',
    },

    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        type: {
          summary: 'Predefined font-sizes for the title, default to sm',
          detail: `
            sm: 'text-fs-500 md:text-fs-600 lg:text-fs-700',
            md: 'text-fs-600 md:text-fs-700 lg:text-fs-800',
            lg: 'text-fs-700 md:text-fs-800 lg:text-fs-900',
          `,
        },
      },
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    label: {
      control: 'text',
      description: 'Title text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <SectionTitle {...args} size="md" />,
  play: async ({ canvas }) => {
    const heading = canvas.getByRole('heading');

    await expect(heading).toBeInTheDocument();
    await expect(heading).toHaveTextContent('About me');
    await expect(heading?.tagName).toBe('H2');
  },
};

export const H5: Story = {
  render: (args) => <SectionTitle {...args} as="h5" />,
  play: async ({ canvas }) => {
    const heading = canvas.getByRole('heading');

    await expect(heading).toBeInTheDocument();
    await expect(heading).toHaveTextContent('About me');
    await expect(heading?.tagName).toBe('H5');
  },
};
