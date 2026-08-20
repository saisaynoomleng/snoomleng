import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  PortableTextBlock,
  PortableTextRenderer,
} from './PortableTextRenderer';
import { mockPortableText } from '#lib/mockData';

const meta: Meta<typeof PortableTextRenderer> = {
  title: 'Components/PortableText/Renderer',
  component: PortableTextRenderer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Render Portable Text Blocks',
      },
    },
  },

  args: {
    value: mockPortableText.body as PortableTextBlock[],
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    resolveImageUrl: {
      control: false,
      description: 'Resolve Sanity Image URL in Next.js',
    },

    value: {
      control: false,
      description: "Array of Portable Text Blocks' values to render",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <PortableTextRenderer {...args} />,
};
