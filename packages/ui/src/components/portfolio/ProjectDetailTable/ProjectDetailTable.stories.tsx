import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectDetailTable } from './ProjectDetailTable';
import { mockProjectDetailTable } from '#lib/mockData';
import { expect } from 'storybook/test';

const meta: Meta<typeof ProjectDetailTable> = {
  title: 'Components/Portfolio/ProjectDetailTable',
  component: ProjectDetailTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Project Detail Table to be previewed in Project Detail Page',
      },
    },
  },

  args: {
    name: mockProjectDetailTable.name,
    startedAt: mockProjectDetailTable.startedAt,
    endedAt: mockProjectDetailTable.endedAt,
    type: mockProjectDetailTable.type,
  },

  argTypes: {
    name: {
      control: 'text',
      description: 'Project name',
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    startedAt: {
      control: 'text',
      description: 'Project Started date',
    },

    endedAt: {
      control: 'text',
      description: 'Project Ended Date',
    },

    type: {
      control: 'text',
      description: 'Project Type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <ProjectDetailTable {...args} />,
  play: async ({ canvas }) => {
    const name = canvas.getByText(/snoomleng/i);
    const type = canvas.getByText(/portfolio/i);
    const startedAt = canvas.getByText(/Aug 07, 2026/i);
    const endedAt = canvas.getByText(/Aug 19, 2026/i);

    await expect(name).toBeInTheDocument();
    await expect(type).toBeInTheDocument();
    await expect(startedAt).toBeInTheDocument();
    await expect(endedAt).toBeInTheDocument();
  },
};
