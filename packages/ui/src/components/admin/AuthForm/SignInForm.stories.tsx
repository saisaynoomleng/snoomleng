import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignInForm } from './SingInForm';

const meta: Meta<typeof SignInForm> = {
  title: 'Components/Admin/SignInForm',
  component: SignInForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Admin Dashboard: Sign In Form',
      },
    },
  },

  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
