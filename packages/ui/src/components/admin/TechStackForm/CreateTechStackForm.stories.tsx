import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreateTechStackForm } from './CreateTechStackForm';
import { mockFormAction } from '#lib/mockData';
import { expect } from 'storybook/test';

const meta: Meta<typeof CreateTechStackForm> = {
  title: 'Components/Admin/CreateTechStackForm',
  component: CreateTechStackForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Admin Dashboard: Create Tech Stack Form',
      },
    },
  },

  args: {
    action: mockFormAction,
  },
  argTypes: {
    action: {
      control: false,
      description: 'Action to be rendered in Next.js',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledForm: Story = {
  render: (args) => <CreateTechStackForm {...args} />,
  play: async ({ canvas, userEvent }) => {
    const name = canvas.getByLabelText(/name/i);
    const slug = canvas.getByLabelText(/slug/i);
    const generate = canvas.getByRole('button', {
      name: /generate/i,
    });
    const type = canvas.getByLabelText(/tech type/i);
    const iconText = canvas.getByLabelText(/icon text/i);
    const submit = canvas.getByRole('button', {
      name: /create/i,
    });

    await expect(name).toBeInTheDocument();
    await expect(slug).toBeInTheDocument();
    await expect(generate).toBeInTheDocument();
    await expect(type).toBeInTheDocument();

    await userEvent.type(name, 'Go Lang');
    await userEvent.click(generate);
    await userEvent.type(iconText, 'golang');
    await userEvent.selectOptions(type, 'backend');
    await userEvent.click(submit);

    await expect(mockFormAction).toHaveBeenCalledWith({
      name: 'Go Lang',
      slug: 'go-lang',
      iconText: 'golang',
      type: 'backend',
    });
  },
};
