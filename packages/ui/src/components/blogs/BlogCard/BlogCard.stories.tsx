import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlogCard } from './BlogCard';
import { mockBlogCard } from '#lib/mockData';
import { expect } from 'storybook/test';

const meta: Meta<typeof BlogCard> = {
  title: 'Components/Blogs/BlogCard',
  component: BlogCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Blog Card to render blogs on blog site`,
      },
    },
  },

  args: {
    name: mockBlogCard.name,
    excerpt: mockBlogCard.excerpt,
    publishedAt: mockBlogCard.publishedAt,
    focus: mockBlogCard.focus,
    category: mockBlogCard.category,
    media: {
      src: mockBlogCard.imageUrl,
      alt: mockBlogCard.imageAlt,
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    name: {
      control: 'text',
      description: 'Blog Title',
    },

    excerpt: {
      control: 'text',
      description: 'Blog Summary',
    },

    publishedAt: {
      control: 'text',
      description: 'Blog published Date',
    },

    focus: {
      control: 'text',
      description: `Blog's focused language`,
    },

    category: {
      control: 'text',
      description: 'Blog category',
    },

    media: {
      control: false,
      description: 'Blog Cover Image URL & alternative text',
    },

    renderMedia: {
      control: false,
      description: 'Image component to be rendered in Next.js',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <BlogCard
      {...args}
      renderMedia={({ src, alt }) => (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="min-w-full mx-auto"
        />
      )}
    />
  ),
  play: async ({ canvas }) => {
    const name = canvas.getByText(/how js works/i);
    const focus = canvas.getByText(/javascript/i);
    const date = canvas.getByText(/aug 19, 2026/i);
    const img = canvas.getByRole('img');
    const category = canvas.getByText(/frontend/i);
    const excerpt = canvas.getByText(/Lorem ipsum/i);

    await expect(name).toBeInTheDocument();
    await expect(focus).toBeInTheDocument();
    await expect(date).toBeInTheDocument();
    await expect(img).toBeInTheDocument();
    await expect(category).toBeInTheDocument();
    await expect(excerpt).toBeInTheDocument();
    await expect(img).toHaveAttribute(
      'src',
      expect.stringContaining('cdn.sanity.io'),
    );
    await expect(img).toHaveAttribute('alt', 'asdf');
  },
};
