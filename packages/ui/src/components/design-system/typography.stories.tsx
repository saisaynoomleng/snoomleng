import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from './typography';

const meta: Meta<typeof Typography> = {
  title: 'DesignSystem/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Typography />,
};
