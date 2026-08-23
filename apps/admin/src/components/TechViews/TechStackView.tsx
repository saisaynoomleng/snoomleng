import Link from 'next/link';
import React from 'react';

type TechStackViewProps =
  | {
      view: 'grid';
      name: string;
      slug: string;
      type: string;
      icon: React.ElementType;
    }
  | {
      view: 'list';
      name: string;
      slug: string;
      type: string;
    };
