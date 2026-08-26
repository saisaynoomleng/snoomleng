'use client';

import { Bounded } from '../Bounded';
import { schema } from './PortableText.schema';

import { EditorProvider, PortableTextEditable } from '@portabletext/editor';
import type { PortableTextBlock } from '@portabletext/editor';
import { NodePlugin, EventListenerPlugin } from '@portabletext/editor/plugins';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { nodes } from './PortableText.render';
import { PortableTextToolbar } from './PortableText.toolbar';
import { useEffect, useState } from 'react';

const PORTABLE_TEXT_INPUT_CLASSES =
  'h-8 w-full min-w-0 border-2 border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40';

type PortableTextEditInputProps = {
  value?: PortableTextBlock[];
  onChange: (value: PortableTextBlock[]) => void;
};

export const PortableTextEditInput = ({
  value,
  onChange,
}: PortableTextEditInputProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Bounded
      className="overflow-hidden"
      size="full"
      centered={false}
      padding="none"
    >
      <EditorProvider
        initialConfig={{
          schemaDefinition: schema,
          initialValue: value ?? [],
        }}
      >
        <EventListenerPlugin
          on={(e) => {
            if (e.type === 'mutation') {
              onChange(e.value as PortableTextBlock[]);
            }
          }}
        />
        <NodePlugin nodes={nodes} />

        <PortableTextToolbar />
        <PortableTextEditable
          className={twMerge(
            clsx(PORTABLE_TEXT_INPUT_CLASSES, 'min-h-50 overflow-y-auto'),
          )}
        />
      </EditorProvider>
    </Bounded>
  );
};
