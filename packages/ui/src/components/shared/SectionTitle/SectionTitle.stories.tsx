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
  },

  argTypes: {
    as: {
      control: 'radio',
      options: ['h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Any heading tag from h2 to h6, default to h2',
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
  render: (args) => <SectionTitle {...args} />,
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
