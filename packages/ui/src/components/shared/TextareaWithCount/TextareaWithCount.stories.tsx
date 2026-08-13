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
  argTypes: {
    maxLength: {
      control: 'number',
      description: 'Determine the textarea maximum input length',
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    label: {
      control: 'text',
      description: 'Label for the textarea',
    },

    errorMessage: {
      control: 'text',
      description: 'Error message to display on the UI',
    },
  },
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
