import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectDisplayCard } from './ProjectDisplayCard';
import { mockProjectCards } from '#lib/mockData';
import { expect } from 'storybook/test';
import { ProjectDisplayCardSkeleton } from './ProjectDisplayCardSkeleton';

const meta: Meta<typeof ProjectDisplayCard> = {
  title: 'Components/Portfolio/ProjectDisplayCard',
  component: ProjectDisplayCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      descritption: {
        component: 'Display Project',
      },
    },
  },

  args: {
    media: {
      src: mockProjectCards[3]?.imageUrl as string,
      alt: mockProjectCards[3]?.imageAlt as string,
    },
    name: mockProjectCards[3]?.name as string,
    type: mockProjectCards[3]?.type as string,
  },

  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    media: {
      control: false,
      table: {
        type: {
          summary: 'Image URL and Alternative Text',
          detail: `
            src: string;
            alt: string;
          `,
        },
      },
    },

    renderMedia: {
      control: false,
      description: 'Media to be rendered in Next.js',
    },

    name: {
      control: 'text',
      description: 'Project name',
    },

    type: {
      control: 'text',
      description: 'Project Type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ProjectDisplayCard
      {...args}
      renderMedia={(props) => (
        <img src={props.src} alt={props.alt} className="w-100" />
      )}
    />
  ),
  play: async ({ canvas }) => {
    const img = canvas.getByRole('img');
    const name = canvas.getByText(/haru commerce/i);
    const type = canvas.getByText(/e commerce/);

    await expect(img).toHaveAttribute(
      'src',
      expect.stringContaining('cdn.sanity.io'),
    );
    await expect(name).toBeInTheDocument();
    await expect(type).toBeInTheDocument();
  },
};

export const Loading = () => <ProjectDisplayCardSkeleton />;
