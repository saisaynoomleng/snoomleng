import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignUpForm } from './SingUpForm';
import { mockFormAction } from '#lib/mockData';

const meta: Meta<typeof SignUpForm> = {
  title: 'Components/Admin/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Admin Dashboard: Sign Up Form',
      },
    },
  },

  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <SignUpForm {...args} />,
};
