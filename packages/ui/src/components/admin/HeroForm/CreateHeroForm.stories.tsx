import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreateHeroForm } from './CreateHeroForm';
import { mockFormAction } from '#lib/mockData';

const meta: Meta<typeof CreateHeroForm> = {
  title: 'Components/Admin/CreateHeroForm',
  component: CreateHeroForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Admin Dashboard: Create Hero Form',
      },
    },
  },

  args: {
    action: mockFormAction,
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
