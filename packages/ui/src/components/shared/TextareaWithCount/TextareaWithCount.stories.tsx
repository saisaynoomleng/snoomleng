import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextareaWithCount } from './TextareaWithCount';
import { expect } from 'storybook/test';

const meta: Meta<typeof TextareaWithCount> = {
  title: 'Components/Shared/TextareaWithCount',
  component: TextareaWithCount,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Textarea with input text count',
      },
    },
  },

  args: {
    maxLength: 20,
    label: 'Message',
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <TextareaWithCount {...args} />,
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByLabelText(/message/i);
    const char = canvas.getByTestId('char');

    await expect(textarea).toBeInTheDocument();
    await expect(char).toBeInTheDocument();

    await userEvent.type(textarea, 'test textarea input.');

    const max = canvas.getByTestId('max');

    await expect(max).toBeInTheDocument();

    await expect(textarea).toHaveAttribute('maxLength', '20');
  },
};
