import React from 'react';
import { Bounded } from '../Bounded';
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from '@portabletext/react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type PortableTextRendererProps = {
  value: PortableTextBlock[];
  className?: string;
};

export const PortableTextRenderer = ({
  value,
  className,
}: PortableTextRendererProps): React.JSX.Element => {
  return (
    <Bounded
      as="div"
      size="full"
      padding="none"
      className={twMerge(clsx('prose', className))}
    >
      <PortableText value={value} components={component} />
    </Bounded>
  );
};

const component: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-fs-400 leading-relaxed">{children}</p>
    ),

    h1: ({ children }) => (
      <h1 className="text-fs-600 md:text-fs-700">{children}</h1>
    ),

    h2: ({ children }) => (
      <h2 className="text-fs-500 md:text-fs-600">{children}</h2>
    ),

    h3: ({ children }) => (
      <h3 className="text-fs-400 md:text-fs-500">{children}</h3>
    ),

    h4: ({ children }) => (
      <h4 className="text-fs-400 md:text-fs-500">{children}</h4>
    ),

    h5: ({ children }) => (
      <h5 className="text-fs-300 md:text-fs-400">{children}</h5>
    ),

    h6: ({ children }) => (
      <h6 className="text-fs-300 md:text-fs-400">{children}</h6>
    ),

    blockquote: ({ children }) => (
      <blockquote className="ml-2 border-l border-border pl-4 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    highlight: ({ children }) => (
      <span className="bg-primary text-background font-semibold border-y-sidebar-primary-foreground px-1">
        {children}
      </span>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined;

      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noindex nofollow' : undefined}
          className="underline underline-offset-4 decoration-primary"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc marker:text-primary">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal marker:text-primary">{children}</ol>
    ),
  },
};
