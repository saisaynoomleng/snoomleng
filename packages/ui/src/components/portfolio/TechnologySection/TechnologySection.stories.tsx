import type { Meta, StoryObj } from '@storybook/react-vite';
import { TechnologySection } from './TechnologySection';
import { mockTechs } from '#lib/mockData';

const meta: Meta<typeof TechnologySection> = {
  title: 'Components/Portfolio/TechnologySection',
  component: TechnologySection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Technology Stacks Section',
      },
    },
  },

  args: {
    techs: mockTechs,
  },
  argTypes: {
    techs: {
      control: false,
      table: {
        type: {
          summary: 'Array of Technologies data',
          detail: `
            _id: string;
            icon: string;
            name: string;
          `,
        },
      },
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <TechnologySection {...args} />,
};
