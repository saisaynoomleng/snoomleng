import type { Meta, StoryObj } from '@storybook/react-vite';
import { Projects } from './Projects';
import { mockProject } from '#lib/mockData';

const meta: Meta<typeof Projects> = {
  title: 'Components/Portfolio/Projects',
  component: Projects,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        components: 'Project Section to display on the webpage',
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Projects
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
