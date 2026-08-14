import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectSection } from './ProjectSection';
import { mockProject } from '#lib/mockData';

const meta: Meta<typeof ProjectSection> = {
  title: 'Components/Portfolio/ProjectSection',
  component: ProjectSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Project Section to display on the webpage',
      },
    },
  },

  args: {
    projects: mockProject,
  },

  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    projects: {
      control: false,
      description: 'Array of Project Data',
    },

    renderAction: {
      control: false,
      description: 'Action to be rendered in Next.js',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ProjectSection
      {...args}
      renderAction={(props) => (
        <a
          className="text-fs-300 hover:text-primary hover:cursor-pointer"
          href={props.href}
        >
          {props.label}
        </a>
      )}
    />
  ),
};
