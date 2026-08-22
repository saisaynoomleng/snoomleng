import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditTechStackForm } from './EditTechStackForm';
import { mockFormAction } from '#lib/mockData';
import { expect } from 'storybook/test';

const meta: Meta<typeof EditTechStackForm> = {
  title: 'Components/Admin/EditTechStackForm',
  component: EditTechStackForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Admin Dashboard: Edit Tech Stack Form',
      },
    },
  },

  args: {
    action: mockFormAction,
    tech: {
      name: 'Go Lang',
      slug: 'go-lang',
      iconText: 'golang',
      type: 'backend',
    },
  },
  argTypes: {
    action: {
      control: false,
      description: 'Action to be rendered in Next.js',
    },

    tech: {
      control: false,
      description: 'Tech Stack Data Shape',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <EditTechStackForm {...args} />,
  play: async ({ canvas, userEvent }) => {
    const name = canvas.getByLabelText(/name/i);
    const slug = canvas.getByLabelText(/slug/i);
    const generate = canvas.getByRole('button', {
      name: /generate/i,
    });
    const type = canvas.getByLabelText(/tech type/i);
    const iconText = canvas.getByLabelText(/icon text/i);
    const submit = canvas.getByRole('button', {
      name: /edit/i,
    });

    await expect(name).toBeInTheDocument();
    await expect(slug).toBeInTheDocument();
    await expect(generate).toBeInTheDocument();
    await expect(type).toBeInTheDocument();

    await userEvent.clear(name);
    await userEvent.clear(slug);
    await userEvent.clear(iconText);
    await userEvent.selectOptions(type, 'frontend');

    await userEvent.type(name, 'Linux');
    await userEvent.click(generate);
    await userEvent.type(iconText, 'linux');
    await userEvent.selectOptions(type, 'devops');
    await userEvent.click(submit);

    await expect(mockFormAction).toHaveBeenCalledWith({
      name: 'Linux',
      slug: 'linux',
      iconText: 'linux',
      type: 'devops',
    });
  },
};
