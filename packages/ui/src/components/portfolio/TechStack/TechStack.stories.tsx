import type { Meta, StoryObj } from '@storybook/react-vite';
import { TechStack } from './TechStack';
import { mockTechs } from '#lib/mockData';

const meta: Meta<typeof TechStack> = {
  title: 'Components/Portfolio/TechStack',
  component: TechStack,
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
          summary: 'My tech stack Data Shape',
          detail: `
            _id: string;
            icon: string;
            name: string;
          `,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <TechStack {...args} />,
};
