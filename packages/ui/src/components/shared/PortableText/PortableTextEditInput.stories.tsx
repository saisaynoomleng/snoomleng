import type { Meta, StoryObj } from '@storybook/react-vite';
import { PortableTextEditInput } from './PortableTextEditInput';

const meta: Meta<typeof PortableTextEditInput> = {
  title: 'Components/Shared/PortableText/PortableTextEditInput',
  component: PortableTextEditInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Portable Text Editor',
      },
    },
  },

  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
