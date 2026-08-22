import type { Meta } from '@storybook/react-vite';
import { AdminDashboardSkeleton } from './AdminDashboardSkeleton';

const meta: Meta<typeof AdminDashboardSkeleton> = {
  title: 'Components/Admin/Skeleton/AdminDashboard',
  component: AdminDashboardSkeleton,
};

export default meta;

export const Loading = {
  render: () => <AdminDashboardSkeleton />,
};
