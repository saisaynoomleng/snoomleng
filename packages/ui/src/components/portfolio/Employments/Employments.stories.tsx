import type { Meta, StoryObj } from '@storybook/react-vite';
import { Employments } from './Employments';
import { mockEmployments } from '#lib/mockData';

const meta: Meta<typeof Employments> = {
  title: 'Components/Portfolio/Employments',
  component: Employments,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Employment Histories Section',
      },
    },
  },

  args: {
    employments: mockEmployments,
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
