import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactFormSection } from './ContactFormSection';
import { mockFormAction } from '#lib/mockData';
import { expect, userEvent } from 'storybook/test';

const meta: Meta<typeof ContactFormSection> = {
  title: 'Components/Portfolio/ContactFormSection',
  component: ContactFormSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Contact Me Form Section',
      },
    },
  },

  args: {
    action: mockFormAction,
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <ContactFormSection {...args} />,
  play: async ({ canvas }) => {
    const name = canvas.getByLabelText(/name/i);
    const email = canvas.getByLabelText(/email/i);
    const subject = canvas.getByLabelText(/subject/i);
    const message = canvas.getByLabelText(/message/i);
    const submit = canvas.getByRole('button', {
      name: /send a message/i,
    });

    await expect(name).toBeInTheDocument();
    await expect(email).toBeInTheDocument();
    await expect(subject).toBeInTheDocument();
    await expect(message).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();
  },
};

export const FilledForm: Story = {
  render: (args) => <ContactFormSection {...args} />,
  play: async ({ canvas, userEvent }) => {
    const name = canvas.getByLabelText(/name/i);
    const email = canvas.getByLabelText(/email/i);
    const subject = canvas.getByLabelText(/subject/i);
    const message = canvas.getByLabelText(/message/i);
    const submit = canvas.getByRole('button', {
      name: /send a message/i,
    });

    await userEvent.type(name, 'John Doe');
    await userEvent.type(email, 'johndoe@mail.com');
    await userEvent.type(subject, 'Interesting for a full time position');
    await userEvent.type(
      message,
      'We would like you to join our full time position as a fullstack engineer',
    );

    await userEvent.click(submit);

    await expect(mockFormAction).toHaveBeenCalledWith({
      email: 'johndoe@mail.com',
      message:
        'We would like you to join our full time position as a fullstack engineer',
      name: 'John Doe',
      subject: 'Interesting for a full time position',
    });
  },
};
