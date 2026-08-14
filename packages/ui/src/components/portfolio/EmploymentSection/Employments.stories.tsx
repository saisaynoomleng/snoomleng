import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmploymentSection } from './EmploymentSection';
import { mockEmployments } from '#lib/mockData';

const meta: Meta<typeof EmploymentSection> = {
  title: 'Components/Portfolio/EmploymentSection',
  component: EmploymentSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Employment Section',
      },
    },
  },

  args: {
    employments: mockEmployments,
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    employments: {
      control: false,
      description: 'Array of Employement Data',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
